// Приём заявки на курс переподготовки / сертификации тренеров:
// 1) базовая валидация, 2) запись в Supabase, 3) уведомление в Telegram.
// Секреты берём из runtimeConfig (env NUXT_*), на клиент они не попадают.

interface CoachBody {
  name?: string
  lastName?: string
  phone?: string
  email?: string
  education?: string
  question?: string
}

// Ключ уровня образования → человекочитаемая подпись для Telegram
const EDUCATION_LABEL: Record<string, string> = {
  higher: 'Высшее законченное (есть диплом)',
  college: 'Среднее профессиональное (колледж, техникум)',
  school: 'Только школьное (9 или 11 классов)',
}

function clean(v: unknown, max = 500): string {
  return String(v ?? '').trim().slice(0, max)
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default defineEventHandler(async (event) => {
  const cfg = useRuntimeConfig(event)
  const body = await readBody<CoachBody>(event)

  const name = clean(body?.name, 80)
  const lastName = clean(body?.lastName, 80)
  const phone = clean(body?.phone, 40)
  const email = clean(body?.email, 120)
  const education = clean(body?.education, 20)
  const question = clean(body?.question, 1000)

  // Минимальная валидация: имя, корректный телефон и e-mail обязательны
  if (name.length < 2 || phone.replace(/\D/g, '').length < 5 || !EMAIL_RE.test(email)) {
    throw createError({ statusCode: 400, statusMessage: 'Укажите имя, корректный телефон и e-mail' })
  }

  const eduLabel = EDUCATION_LABEL[education] ?? (education || '—')
  const createdAt = new Date().toISOString()

  // 1) Запись в Supabase (PostgREST), если настроен
  if (cfg.supabaseUrl && cfg.supabaseServiceKey) {
    try {
      await $fetch(`${cfg.supabaseUrl}/rest/v1/coach_applications`, {
        method: 'POST',
        headers: {
          apikey: cfg.supabaseServiceKey as string,
          Authorization: `Bearer ${cfg.supabaseServiceKey}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
        },
        body: [{
          name,
          last_name: lastName,
          phone,
          email,
          education,
          question,
          created_at: createdAt,
        }],
      })
    } catch (e) {
      console.error('[coach] supabase insert failed', e)
      // не роняем заявку из-за БД — Telegram важнее для оперативной связи
    }
  }

  // 2) Уведомление в Telegram
  if (cfg.telegramBotToken && cfg.telegramChatId) {
    const lines = [
      '🎓 <b>Новая заявка — Переподготовка тренеров</b>',
      '',
      `<b>Имя:</b> ${escapeHtml(name)} ${escapeHtml(lastName)}`.trim(),
      `<b>Телефон:</b> ${escapeHtml(phone)}`,
      `<b>E-mail:</b> ${escapeHtml(email)}`,
      `<b>Образование:</b> ${escapeHtml(eduLabel)}`,
      question ? `<b>Сообщение:</b> ${escapeHtml(question)}` : '',
    ].filter(Boolean)

    try {
      await $fetch(`https://api.telegram.org/bot${cfg.telegramBotToken}/sendMessage`, {
        method: 'POST',
        body: {
          chat_id: cfg.telegramChatId,
          text: lines.join('\n'),
          parse_mode: 'HTML',
          disable_web_page_preview: true,
        },
      })
    } catch (e) {
      console.error('[coach] telegram send failed', e)
      throw createError({ statusCode: 502, statusMessage: 'Не удалось отправить заявку, попробуйте позже' })
    }
  }

  return { ok: true }
})
