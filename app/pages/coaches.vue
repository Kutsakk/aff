<script setup lang="ts">
// Стать тренером — переподготовка и сертификация тренеров.
// Hero с фото молодёжной команды, блоки «почему / преимущества / чему научат /
// для кого» на трёх языках и стеклянная форма заявки (Supabase + Telegram).
const { locale } = useLocale()
useHead({ title: 'Стать тренером — American Football Federation of Georgia' })

type EduId = 'higher' | 'college' | 'school'

const tr = {
  ka: {
    kicker: 'გადამზადება და სერტიფიცირება',
    h1: 'გახდი მწვრთნელი',
    lead: 'თუ თქვენ ხართ თქვენი საქმის პროფესიონალი და გსურთ დამატებით მიიღოთ ტრენერის კვალიფიკაცია — ტრენერების ტრენინგი სწორედ თქვენთვისაა.',
    whyH: 'რატომ უნდა დაესწროთ ტრენერების ტრენინგს?',
    whyP: 'საკუთარ საქმეში წარმატება უამრავი ადამიანისთვის სავსებით საკმარისია, მაგრამ არსებობენ ისეთი პროფესიონალებიც, რომელთაც სურთ უნიკალური გამოცდილება სხვებს გაუზიარონ. ტრენერების ტრენინგის ფარგლებში ჩვენ არსებული უნარების გაღრმავებასა და ახალი უნარ-ჩვევების შეძენაში დაგეხმარებით. პროგრამის ბოლოს თქვენ კიდევ ერთი, ტრენერის პროფესია გექნებათ.',
    benefitsH: 'ტრენინგის უპირატესობები',
    benefits: [
      { t: 'პროგრამის უნიკალურობა', d: 'ბაზარზე ტრენერები სულ უფრო მოთხოვნადი არიან, ქართულ რეალობაში კი არ არსებობს ხანგრძლივი პროგრამა, რომელიც მათ მოამზადებს. თქვენ შეისწავლით აპრობირებულ დასავლურ ტრენინგ-მეთოდებს.' },
      { t: 'პრაქტიკული სამუშაოები', d: 'კურსის განმავლობაში შეისწავლით სხვადასხვა ტიპის ტრენინგისა და სემინარის ჩატარების მეთოდებს, შეიძენთ პრეზენტაციის უნარ-ჩვევებს და თავადვე ჩაატარებთ ტრენინგს „ნამდვილ“ აუდიტორიასთან.' },
    ],
    benefitsNote: 'ჯგუფური სავარჯიშოები და ინდივიდუალური სამუშაოები დაგეხმარებათ, გახდეთ ეფექტური ტრენერი.',
    learnH: 'ტრენინგის მონაწილეები',
    learn: [
      'შეისწავლიან ზრდასრულთა სწავლის თავისებურებებს, ტრენინგის საჭიროებების დადგენისა და ზრდასრულთათვის პროგრამის შემუშავების საფუძვლებს;',
      'დაეუფლებიან მონაწილეებზე ორიენტირებული ტრენინგის მომზადებისა და წარმართვის მრავალფეროვან, ეფექტურ მეთოდებს;',
      'აითვისებენ ტრენინგის შეფასებისა და ანგარიშის წარდგენის ხერხებს.',
    ],
    forH: 'ეს ტრენინგი თქვენთვისაა, თუ:',
    forList: [
      'მუშაობთ არასამთავრობო ან ბიზნეს-სექტორში;',
      'გაქვთ პროფესიული ცოდნა პიროვნული განვითარების, ფინანსების, ადამიანური რესურსების, მენეჯმენტის, PR-ისა და მარკეტინგის, პროექტ-მენეჯმენტის ან გაყიდვების მიმართულებით;',
      'გაქვთ ტრენერობის გამოცდილება და გსურთ დახვეწოთ თქვენი უნარები;',
      'გჯერათ, რომ უწყვეტი განათლების ხელშეწყობა პროფესიონალების მოვალეობაა;',
      'გაინტერესებთ მსოფლიო ტრენდები ტრენინგების კუთხით;',
      'გსურთ გაიცნოთ სხვა ტრენერები.',
    ],
    formTitle: 'დატოვე განაცხადი გადამზადების კურსზე',
    formP: 'შეავსე ფორმა — დაგიკავშირდებით და მოგაწვდით დეტალებს კურსის შესახებ.',
    phName: 'სახელი', phLast: 'გვარი', phPhone: 'ტელეფონი', phEmail: 'ელ. ფოსტა',
    eduLabel: 'განათლების დონე',
    eduPlaceholder: '— აირჩიეთ ვარიანტი —',
    edu: { higher: 'უმაღლესი დასრულებული (დიპლომით)', college: 'საშუალო პროფესიული (კოლეჯი, ტექნიკუმი)', school: 'მხოლოდ სასკოლო (9 ან 11 კლასი)' } as Record<EduId, string>,
    phQuestion: 'შეტყობინება (სურვილისამებრ)',
    submit: 'განაცხადის გაგზავნა', submitting: 'იგზავნება…', submitError: 'ვერ გაიგზავნა — სცადე მოგვიანებით.',
    sentTitle: 'განაცხადი გაიგზავნა!', sentText: 'მადლობა — დაგიკავშირდებით უახლოეს დროს.', sentAgain: 'ახალი განაცხადი',
    note: 'დატოვე კონტაქტები — დაგიკავშირდებით უმოკლეს დროში.',
  },
  ru: {
    kicker: 'Переподготовка и сертификация',
    h1: 'Стать тренером',
    lead: 'Если вы профессионал своего дела и хотите дополнительно получить квалификацию тренера — тренинг тренеров именно для вас.',
    whyH: 'Почему стоит пройти тренинг тренеров?',
    whyP: 'Для многих успеха в своём деле вполне достаточно. Но есть профессионалы, которые хотят делиться уникальным опытом с другими. В рамках тренинга тренеров мы поможем углубить имеющиеся навыки и приобрести новые. В конце программы у вас будет ещё одна профессия — тренер.',
    benefitsH: 'Преимущества тренинга',
    benefits: [
      { t: 'Уникальность программы', d: 'Тренеры всё более востребованы, а в грузинских реалиях нет долгосрочной программы их подготовки. Вы изучите апробированные западные методики обучения.' },
      { t: 'Практическая работа', d: 'За время курса вы изучите методы проведения разных типов тренингов и семинаров, приобретёте навыки презентации и сами проведёте тренинг с «настоящей» аудиторией.' },
    ],
    benefitsNote: 'Групповые упражнения и индивидуальная работа помогут вам стать эффективным тренером.',
    learnH: 'Участники тренинга',
    learn: [
      'изучат особенности обучения взрослых, методы определения потребностей в тренинге и основы разработки программы для взрослых;',
      'освоят разнообразные эффективные методы подготовки и проведения тренинга, ориентированного на участников;',
      'освоят способы оценки тренинга и подготовки отчёта.',
    ],
    forH: 'Этот тренинг для вас, если:',
    forList: [
      'вы работаете в НКО или бизнес-секторе;',
      'у вас есть профессиональные знания в области личностного развития, финансов, HR, менеджмента, PR и маркетинга, проектного управления или продаж;',
      'у вас есть тренерский опыт и вы хотите отточить свои навыки;',
      'вы верите, что содействие непрерывному образованию — долг профессионалов;',
      'вам интересны мировые тренды в сфере тренингов;',
      'вы хотите познакомиться с другими тренерами.',
    ],
    formTitle: 'Оставьте онлайн-заявку на курс переподготовки',
    formP: 'Заполните форму — мы свяжемся с вами и расскажем детали о курсе.',
    phName: 'Имя', phLast: 'Фамилия', phPhone: 'Телефон', phEmail: 'Электронный адрес',
    eduLabel: 'Укажите уровень Вашего образования',
    eduPlaceholder: '— Выберите вариант —',
    edu: { higher: 'Высшее законченное образование (есть диплом)', college: 'Среднее профессиональное (колледж, техникум)', school: 'Только школьное образование (9 или 11 классов)' } as Record<EduId, string>,
    phQuestion: 'Сообщение (по желанию)',
    submit: 'Отправить заявку', submitting: 'Отправка…', submitError: 'Не удалось отправить — попробуйте позже.',
    sentTitle: 'Заявка отправлена!', sentText: 'Спасибо — свяжемся с вами в ближайшее время.', sentAgain: 'Новая заявка',
    note: 'Оставьте контакты — свяжемся с вами в ближайшее время.',
  },
  en: {
    kicker: 'Retraining & certification',
    h1: 'Become a coach',
    lead: 'If you are a professional in your field and want to gain a coaching qualification as well — the train-the-trainer program is exactly for you.',
    whyH: 'Why attend the train-the-trainer program?',
    whyP: 'For many people, success in their own field is enough. But there are professionals who want to share their unique experience with others. Within the train-the-trainer program we help you deepen your existing skills and acquire new ones. By the end of the program you will have one more profession — coach.',
    benefitsH: 'Benefits of the training',
    benefits: [
      { t: 'A unique program', d: 'Coaches are in ever-growing demand, yet in Georgia there is no long-term program to train them. You will study proven Western training methods.' },
      { t: 'Hands-on practice', d: 'During the course you will learn how to run different types of trainings and seminars, gain presentation skills and run a training with a “real” audience yourself.' },
    ],
    benefitsNote: 'Group exercises and individual work will help you become an effective trainer.',
    learnH: 'Training participants will',
    learn: [
      'learn the specifics of adult learning, methods for identifying training needs and the basics of designing a program for adults;',
      'master a variety of effective methods for preparing and running participant-centered training;',
      'learn ways to evaluate training and present a report.',
    ],
    forH: 'This training is for you if you:',
    forList: [
      'work in the non-profit or business sector;',
      'have professional knowledge in personal development, finance, HR, management, PR and marketing, project management or sales;',
      'have coaching experience and want to refine your skills;',
      'believe that supporting lifelong learning is a professional’s duty;',
      'are interested in global trends in training;',
      'want to meet other trainers.',
    ],
    formTitle: 'Apply online for the retraining course',
    formP: 'Fill in the form — we will get in touch and share the course details.',
    phName: 'First name', phLast: 'Last name', phPhone: 'Phone', phEmail: 'Email address',
    eduLabel: 'Your level of education',
    eduPlaceholder: '— Select an option —',
    edu: { higher: 'Completed higher education (degree)', college: 'Vocational / college education', school: 'School only (9 or 11 grades)' } as Record<EduId, string>,
    phQuestion: 'Message (optional)',
    submit: 'Send application', submitting: 'Sending…', submitError: 'Could not send — please try again later.',
    sentTitle: 'Application sent!', sentText: 'Thanks — we will contact you soon.', sentAgain: 'New application',
    note: 'Leave your contacts — we will get back to you shortly.',
  },
} as const

const c = computed(() => tr[locale.value])
const eduIds: EduId[] = ['higher', 'college', 'school']

// Поля формы
const formName = ref('')
const formLast = ref('')
const formPhone = ref('')
const formEmail = ref('')
const formEdu = ref<'' | EduId>('')
const formQuestion = ref('')
const formSent = ref(false)
const formSending = ref(false)
const formError = ref('')

async function submitForm() {
  if (formSending.value) return
  formError.value = ''
  formSending.value = true
  try {
    await $fetch('/api/coach', {
      method: 'POST',
      body: {
        name: formName.value,
        lastName: formLast.value,
        phone: formPhone.value,
        email: formEmail.value,
        education: formEdu.value,
        question: formQuestion.value,
      },
    })
    formSent.value = true
  } catch (e: any) {
    formError.value = e?.data?.statusMessage || e?.statusMessage || c.value.submitError
  } finally {
    formSending.value = false
  }
}
function resetForm() {
  formSent.value = false
  formError.value = ''
  formName.value = ''
  formLast.value = ''
  formPhone.value = ''
  formEmail.value = ''
  formEdu.value = ''
  formQuestion.value = ''
}
</script>

<template>
  <main class="coach">
    <!-- Фон страницы: золото-чёрный абстракт, зафиксирован к вьюпорту -->
    <div class="coach-bg" aria-hidden="true" />

    <!-- Hero с фото молодёжной команды -->
    <header class="hero">
      <div class="hero__text">
        <span class="kicker">{{ c.kicker }}</span>
        <h1>{{ c.h1 }}</h1>
        <p class="lead">{{ c.lead }}</p>
        <a href="#apply" class="hero__cta">{{ c.submit }}</a>
      </div>
    </header>

    <div class="wrap">
      <!-- Почему стоит пройти -->
      <section class="block block--why">
        <h2>{{ c.whyH }}</h2>
        <p class="block__p">{{ c.whyP }}</p>
      </section>

      <!-- Преимущества -->
      <section class="block">
        <h2>{{ c.benefitsH }}</h2>
        <div class="benefits">
          <article v-for="(b, i) in c.benefits" :key="i" class="benefit">
            <span class="benefit__num">{{ i + 1 }}</span>
            <h3>{{ b.t }}</h3>
            <p>{{ b.d }}</p>
          </article>
        </div>
        <p class="block__note">{{ c.benefitsNote }}</p>
      </section>

      <!-- Чему научат + для кого: две колонки -->
      <section class="block cols">
        <div class="cols__card">
          <h2>{{ c.learnH }}</h2>
          <ul class="list list--check">
            <li v-for="(l, i) in c.learn" :key="i">{{ l }}</li>
          </ul>
        </div>
        <div class="cols__card">
          <h2>{{ c.forH }}</h2>
          <ul class="list list--star">
            <li v-for="(l, i) in c.forList" :key="i">{{ l }}</li>
          </ul>
        </div>
      </section>
    </div>

    <!-- Форма заявки -->
    <section id="apply" class="apply">
      <div class="apply__card">
        <span class="apply__glare" aria-hidden="true" />
        <div class="apply__inner">
          <!-- Успешно отправлено -->
          <div v-if="formSent" class="apply__success">
            <span class="apply__check" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 12.5l5 5L20 6.5" />
              </svg>
            </span>
            <h2>{{ c.sentTitle }}</h2>
            <p>{{ c.sentText }}</p>
            <button type="button" class="apply__again" @click="resetForm">{{ c.sentAgain }}</button>
          </div>

          <!-- Форма -->
          <template v-else>
            <h2>{{ c.formTitle }}</h2>
            <p class="apply__p">{{ c.formP }}</p>
            <form class="apply__form" @submit.prevent="submitForm">
              <div class="apply__row">
                <input v-model="formName" type="text" :placeholder="c.phName" :aria-label="c.phName">
                <input v-model="formLast" type="text" :placeholder="c.phLast" :aria-label="c.phLast">
              </div>
              <div class="apply__row">
                <input v-model="formPhone" type="tel" :placeholder="c.phPhone" :aria-label="c.phPhone">
                <input v-model="formEmail" type="email" :placeholder="c.phEmail" :aria-label="c.phEmail">
              </div>
              <label class="apply__field">
                <span>{{ c.eduLabel }}</span>
                <select v-model="formEdu" :aria-label="c.eduLabel" :class="{ 'is-empty': !formEdu }">
                  <option value="" disabled>{{ c.eduPlaceholder }}</option>
                  <option v-for="id in eduIds" :key="id" :value="id">{{ c.edu[id] }}</option>
                </select>
              </label>
              <textarea
                v-model="formQuestion"
                class="apply__question"
                rows="3"
                :placeholder="c.phQuestion"
                :aria-label="c.phQuestion"
              />
              <button type="submit" :disabled="formSending">
                {{ formSending ? c.submitting : c.submit }}
              </button>
              <p v-if="formError" class="apply__error">{{ formError }}</p>
            </form>
            <p class="apply__note">{{ c.note }}</p>
          </template>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.coach {
  position: relative;
  color: rgba(255, 255, 255, 0.82);
  padding: clamp(120px, 14vh, 180px) clamp(20px, 6vw, 48px) 120px;
}

/* Фон страницы — фикс к вьюпорту, центр притушён под текст, золото по краям */
.coach-bg {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: auto;
  height: 100vh;
  height: 100lvh;
  z-index: 0;
  pointer-events: none;
  background:
    linear-gradient(90deg, #000 0%, rgba(0, 0, 0, 0) 7%, rgba(0, 0, 0, 0) 93%, #000 100%),
    radial-gradient(120% 90% at 50% 46%, rgba(0, 0, 0, 0.78) 0%, rgba(0, 0, 0, 0.55) 44%, rgba(0, 0, 0, 0.14) 74%, rgba(0, 0, 0, 0) 100%),
    url('/coaches-bg.webp') center center / cover no-repeat,
    #000;
  filter: brightness(1.12) saturate(1.1);
}
.coach > :not(.coach-bg) { position: relative; z-index: 1; }

/* ===== Hero ===== */
.hero {
  position: relative;
  max-width: 1100px;
  min-height: 340px;
  display: flex;
  align-items: center;
  margin: 0 auto 64px;
  padding: clamp(40px, 7vw, 84px) clamp(24px, 6vw, 56px);
  overflow: hidden;
  border-radius: 28px;
}
/* Фото-слой: растворяется по краям, радиус углов — без шва на фоне */
.hero::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 0;
  background: url('/coaches-huddle.webp') center 32% / cover no-repeat;
  -webkit-mask:
    linear-gradient(90deg, transparent 0%, #000 13%, #000 87%, transparent 100%),
    linear-gradient(180deg, transparent 0%, #000 12%, #000 88%, transparent 100%);
  -webkit-mask-composite: source-in;
  mask:
    linear-gradient(90deg, transparent 0%, #000 13%, #000 87%, transparent 100%),
    linear-gradient(180deg, transparent 0%, #000 12%, #000 88%, transparent 100%);
  mask-composite: intersect;
}
/* Затемнение слева — читаемость текста; справа команда остаётся яркой */
.hero::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(90deg,
    rgba(5, 5, 7, 0.92) 0%,
    rgba(5, 5, 7, 0.78) 34%,
    rgba(5, 5, 7, 0.32) 64%,
    rgba(5, 5, 7, 0.12) 100%);
}
.hero__text {
  position: relative;
  z-index: 2;
  max-width: 560px;
}
.kicker {
  display: inline-block;
  margin-bottom: 16px;
  font-size: 0.76rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--color-gold-light, #e6c866);
}
.hero h1 {
  margin: 0 0 20px;
  font-family: 'Oswald', sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  line-height: 1.12;
  padding-bottom: 0.12em;
  font-size: clamp(2.1rem, 5.2vw, 3.8rem);
  background: linear-gradient(180deg, #fff6d4 0%, #e9c25a 55%, #c9a84c 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.lead { font-size: clamp(1.05rem, 2vw, 1.25rem); line-height: 1.6; color: rgba(255, 255, 255, 0.92); }

.hero__cta {
  display: inline-flex;
  margin-top: 26px;
  padding: 14px 30px;
  border-radius: 999px;
  font-family: 'Oswald', sans-serif;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  text-decoration: none;
  color: #1a1206;
  background: linear-gradient(100deg, #9a7a2e, #e6c866 42%, #fff6d6 50%, #e6c866 58%, #9a7a2e);
  box-shadow: 0 8px 22px rgba(201, 168, 76, 0.4);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.hero__cta:hover { transform: translateY(-2px); box-shadow: 0 12px 28px rgba(201, 168, 76, 0.5); }

/* ===== Контент ===== */
.wrap { max-width: 1000px; margin: 0 auto; }
.block { margin: 0 auto 56px; }
.block h2 {
  margin: 0 0 18px;
  font-family: 'Oswald', sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  font-size: clamp(1.5rem, 3.2vw, 2.3rem);
  line-height: 1.15;
  color: #fff;
}
.block__p { font-size: clamp(1rem, 1.6vw, 1.12rem); line-height: 1.7; color: rgba(255, 255, 255, 0.82); max-width: 820px; }
.block__note {
  margin: 22px 0 0;
  padding-left: 16px;
  border-left: 2px solid rgba(230, 200, 102, 0.6);
  font-size: 1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.72);
  font-style: italic;
}

/* Преимущества — две стеклянные карточки */
.benefits { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
.benefit {
  position: relative;
  padding: 28px 26px 26px;
  border-radius: 20px;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.015) 50%, rgba(255, 255, 255, 0.04) 100%);
  border: 1px solid rgba(230, 200, 102, 0.28);
  -webkit-backdrop-filter: blur(14px) saturate(120%);
  backdrop-filter: blur(14px) saturate(120%);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.16), 0 24px 56px -30px rgba(0, 0, 0, 0.8);
}
.benefit__num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  margin-bottom: 16px;
  border-radius: 50%;
  font-family: 'Oswald', sans-serif;
  font-weight: 700;
  font-size: 1.2rem;
  color: #1a1206;
  background: linear-gradient(145deg, #fff6d6, #e6c866 55%, #c9a84c);
  box-shadow: 0 8px 20px -8px rgba(201, 168, 76, 0.7);
}
.benefit h3 {
  margin: 0 0 10px;
  font-family: 'Oswald', sans-serif;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 1.15rem;
  color: var(--color-gold-light, #e6c866);
}
.benefit p { margin: 0; font-size: 0.96rem; line-height: 1.6; color: rgba(255, 255, 255, 0.78); }

/* Две колонки: чему научат + для кого */
.cols { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; align-items: start; }
.cols__card {
  padding: 30px 28px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.cols__card h2 { font-size: clamp(1.3rem, 2.6vw, 1.8rem); }
.list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 14px; }
.list li {
  position: relative;
  padding-left: 32px;
  font-size: 0.98rem;
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.82);
}
.list li::before {
  position: absolute;
  left: 0;
  top: 1px;
  width: 20px;
  height: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.72rem;
  font-weight: 700;
  border-radius: 50%;
}
.list--check li::before {
  content: "✓";
  color: #1a1206;
  background: linear-gradient(145deg, #e6c866, #c9a84c);
}
.list--star li::before {
  content: "★";
  color: var(--color-gold-light, #e6c866);
  background: rgba(230, 200, 102, 0.12);
  border: 1px solid rgba(230, 200, 102, 0.4);
  font-size: 0.62rem;
}

/* ===== Форма заявки ===== */
.apply { max-width: 720px; margin: 20px auto 0; scroll-margin-top: 90px; }
.apply__card {
  position: relative;
  border-radius: 26px;
  overflow: hidden;
  isolation: isolate;
  background:
    radial-gradient(120% 100% at 50% 0%, rgba(201, 168, 76, 0.1), transparent 60%),
    linear-gradient(145deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.015) 42%, rgba(255, 255, 255, 0.04) 100%);
  -webkit-backdrop-filter: blur(18px) saturate(125%);
  backdrop-filter: blur(18px) saturate(125%);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.22), 0 34px 80px -34px rgba(0, 0, 0, 0.85);
}
/* Плавающий золотисто-белый бордер */
.apply__card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1.5px;
  background: linear-gradient(120deg,
    rgba(255, 246, 212, 0.05) 0%, #e6c866 22%, #fff6e0 38%, #c9a84c 52%, #fff6e0 66%, #e6c866 80%, rgba(255, 246, 212, 0.05) 100%);
  background-size: 300% 300%;
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  mask-composite: exclude;
  animation: applyBorder 9s ease-in-out infinite;
  pointer-events: none;
  z-index: 1;
}
@keyframes applyBorder {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.apply__glare {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background:
    radial-gradient(55% 45% at 22% -6%, rgba(255, 255, 255, 0.18), transparent 70%),
    linear-gradient(116deg, transparent 34%, rgba(255, 255, 255, 0.08) 46%, rgba(255, 255, 255, 0.015) 52%, transparent 60%);
}
.apply__inner { position: relative; z-index: 2; padding: clamp(28px, 4vw, 48px); text-align: center; }
.apply__card h2 {
  margin: 0 0 12px;
  font-family: 'Oswald', sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  font-size: clamp(1.4rem, 3vw, 2.1rem);
  line-height: 1.15;
  color: #fff;
}
.apply__p { margin: 0 auto 26px; max-width: 480px; font-size: 0.95rem; line-height: 1.6; color: rgba(255, 255, 255, 0.78); }
.apply__form { display: flex; flex-direction: column; gap: 12px; max-width: 480px; margin: 0 auto; text-align: left; }
.apply__row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.apply__field { display: flex; flex-direction: column; gap: 5px; }
.apply__field > span {
  font-size: 0.66rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
  padding-left: 2px;
}
.apply__form input,
.apply__form select,
.apply__question {
  width: 100%;
  padding: 13px 16px;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.32);
  border: 1px solid rgba(255, 255, 255, 0.14);
  color: #fff;
  font-size: 0.95rem;
  font-family: inherit;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}
.apply__form input:focus,
.apply__form select:focus,
.apply__question:focus {
  outline: none;
  border-color: rgba(230, 200, 102, 0.6);
  box-shadow: 0 0 0 3px rgba(201, 168, 76, 0.16);
  background: rgba(0, 0, 0, 0.45);
}
.apply__form input::placeholder,
.apply__question::placeholder { color: rgba(255, 255, 255, 0.4); }
.apply__form select { cursor: pointer; }
/* Пустой select (placeholder) — приглушённый, как placeholder у input */
.apply__form select.is-empty { color: rgba(255, 255, 255, 0.4); }
.apply__form select option { color: #fff; background: #14110a; }
.apply__question { resize: vertical; min-height: 72px; line-height: 1.5; }
.apply__form button {
  margin-top: 6px;
  padding: 15px;
  border: none;
  border-radius: 12px;
  font-family: 'Oswald', sans-serif;
  font-weight: 600;
  font-size: 0.98rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #1a1206;
  cursor: pointer;
  background: linear-gradient(100deg, #9a7a2e, #e6c866 42%, #fff6d6 50%, #e6c866 58%, #9a7a2e);
  box-shadow: 0 8px 22px rgba(201, 168, 76, 0.4);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.apply__form button:hover { transform: translateY(-2px); box-shadow: 0 12px 28px rgba(201, 168, 76, 0.5); }
.apply__form button:disabled { opacity: 0.6; cursor: wait; transform: none; }
.apply__error { margin: 10px 0 0; font-size: 0.82rem; color: #ff9b8a; text-align: center; }
.apply__note { margin: 18px 0 0; font-size: 0.78rem; color: rgba(255, 255, 255, 0.35); text-align: center; }

/* Успешно отправлено */
.apply__success { display: flex; flex-direction: column; align-items: center; gap: 14px; padding: 18px 0; animation: applySuccess 0.5s cubic-bezier(0.22, 1, 0.36, 1); }
.apply__check {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  color: #1a1206;
  background: linear-gradient(145deg, #fff6d6, #e6c866 55%, #c9a84c);
  box-shadow: 0 10px 30px -8px rgba(201, 168, 76, 0.7);
  animation: applyCheckPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s both;
}
.apply__success h2 { margin: 0; }
.apply__success p { margin: 0; max-width: 420px; }
.apply__again {
  margin-top: 8px;
  padding: 12px 26px;
  border-radius: 999px;
  border: 1px solid rgba(230, 200, 102, 0.5);
  background: transparent;
  color: var(--color-gold-light, #e6c866);
  font-family: 'Oswald', sans-serif;
  font-weight: 600;
  font-size: 0.86rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
}
.apply__again:hover { background: rgba(230, 200, 102, 0.12); transform: translateY(-2px); }
@keyframes applySuccess { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
@keyframes applyCheckPop { from { opacity: 0; transform: scale(0.4); } to { opacity: 1; transform: scale(1); } }

/* ===== Адаптив ===== */
@media (max-width: 860px) {
  /* Мобильный фон: золото сверху во всю ширину, уходит в чёрноту */
  .coach-bg {
    background:
      linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.1) 30%, rgba(0, 0, 0, 0.72) 62%, #000 100%),
      url('/coaches-bg-mobile.webp') top center / 100% auto no-repeat,
      #000;
    filter: none;
  }
}

@media (max-width: 760px) {
  .benefits { grid-template-columns: 1fr; }
  .cols { grid-template-columns: 1fr; }
  /* ПРОИЗВОДИТЕЛЬНОСТЬ: тяжёлые эффекты тормозят скролл на телефонах */
  .benefit,
  .apply__card {
    -webkit-backdrop-filter: none;
    backdrop-filter: none;
  }
  .benefit { background: rgba(20, 20, 24, 0.72); }
  .apply__card {
    background:
      radial-gradient(120% 100% at 50% 0%, rgba(201, 168, 76, 0.09), transparent 60%),
      rgba(13, 13, 17, 0.82);
  }
  .apply__card::before { animation: none; }
  .apply__row { grid-template-columns: 1fr; }
}

@media (prefers-reduced-motion: reduce) {
  .apply__card::before,
  .apply__success,
  .apply__check { animation: none; }
}
</style>
