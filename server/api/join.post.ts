// Приём заявки из формы «Запишись в команду»:
// 1) базовая валидация, 2) запись в Supabase, 3) уведомление в Telegram.
// Секреты берём из runtimeConfig (env NUXT_*), на клиент они не попадают.

interface JoinBody {
  name?: string
  lastName?: string
  phone?: string
  age?: string | number
  direction?: string
  format?: string
  question?: string
}

const DIRECTION_LABEL: Record<string, string> = {
  kids: 'Детский футбол',
  students: 'Студенческая лига',
  clubs: 'Взрослые · клубы',
}

function clean(v: unknown, max = 500): string {
  return String(v ?? '').trim().slice(0, max)
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export default defineEventHandler(async (event) => {
  const cfg = useRuntimeConfig(event)
  const body = await readBody<JoinBody>(event)

  const name = clean(body?.name, 80)
  const lastName = clean(body?.lastName, 80)
  const phone = clean(body?.phone, 40)
  const age = clean(body?.age, 10)
  const direction = clean(body?.direction, 20)
  const format = clean(body?.format, 20)
  const question = clean(body?.question, 1000)

  // Минимальная валидация: имя и телефон обязательны
  if (name.length < 2 || phone.replace(/\D/g, '').length < 5) {
    throw createError({ statusCode: 400, statusMessage: 'Укажите имя и корректный телефон' })
  }

  const dirLabel = DIRECTION_LABEL[direction] ?? (direction || '—')
  const fmtLabel = format === 'tackle' ? 'Tackle' : format === 'flag' ? 'Flag' : (format || '—')
  const createdAt = new Date().toISOString()

  // 1) Запись в Supabase (PostgREST), если настроен
  if (cfg.supabaseUrl && cfg.supabaseServiceKey) {
    try {
      await $fetch(`${cfg.supabaseUrl}/rest/v1/applications`, {
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
          age: age || null,
          direction,
          format,
          question,
          created_at: createdAt,
        }],
      })
    } catch (e) {
      console.error('[join] supabase insert failed', e)
      // не роняем заявку из-за БД — Telegram важнее для оперативной связи
    }
  }

  // 2) Уведомление в Telegram
  if (cfg.telegramBotToken && cfg.telegramChatId) {
    const lines = [
      '🏈 <b>Новая заявка — Начать играть</b>',
      '',
      `<b>Имя:</b> ${escapeHtml(name)} ${escapeHtml(lastName)}`.trim(),
      `<b>Телефон:</b> ${escapeHtml(phone)}`,
      age ? `<b>Возраст:</b> ${escapeHtml(age)}` : '',
      `<b>Направление:</b> ${escapeHtml(dirLabel)}`,
      `<b>Формат:</b> ${escapeHtml(fmtLabel)}`,
      question ? `<b>Вопрос:</b> ${escapeHtml(question)}` : '',
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
      console.error('[join] telegram send failed', e)
      throw createError({ statusCode: 502, statusMessage: 'Не удалось отправить заявку, попробуйте позже' })
    }
  }

  return { ok: true }
})
