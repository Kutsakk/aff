<script setup lang="ts">
// Начать играть — два пути: дети (flag football) и старшие (tackle).
const { locale } = useLocale()
useHead({ title: 'Начать играть — American Football Federation of Georgia' })

const tr = {
  ka: {
    kicker: 'შემოგვიერთდი',
    h1: 'გინდა თამაშის დაწყება?',
    lead: 'ამერიკული ფეხბურთი საქართველოში ღიაა ყველასთვის — ბავშვებიდან, ვინც პირველად აიღებს ბურთს, მოზრდილებამდე, ვინც მზადაა სრული კონტაქტისთვის. აირჩიე შენი გზა: გასწავლით ნულიდან.',
    learnTitle: 'რას გასწავლით',
    needTitle: 'რა გჭირდება',
    faqTitle: 'ხშირი კითხვები',
    joinTitle: 'ჩაეწერე გუნდში',
    joinP: 'დატოვე კონტაქტები — დაგიკავშირდებით და შეგირჩევთ უახლოეს გუნდსა და პროგრამას შენი ასაკისა და დონის მიხედვით.',
    phName: 'სახელი',
    phPhone: 'ტელეფონი',
    optFlag: 'Flag football (ბავშვები)',
    optTackle: 'Tackle (უფროსები)',
    optUndecided: 'ჯერ არ გადამიწყვეტია',
    submit: 'განაცხადის გაგზავნა',
    note: 'ფორმა დროებითია — გაგზავნას მოგვიანებით დავამატებთ.',
    kids: {
      badge: 'ბავშვები და მოზარდები', title: 'Flag football', age: '6–14 წელი', format: 'Flag football · კონტაქტის გარეშე',
      intro: 'უკონტაქტო ფორმატი: წელიდან აღების ნაცვლად იხსნება ლენტი-ფლაგი. უსაფრთხო, მხიარული და სწრაფი — იდეალური პირველი ნაბიჯი სპორტში. არანაირი მძიმე აღჭურვილობა.',
      learn: ['სირბილი, მიღება და პასი', 'გუნდური მუშაობა', 'წესები და დისციპლინა', 'კოორდინაცია და სისწრაფე'],
      need: ['სპორტული ფორმა და კროსოვკები', 'სურვილი და ენერგია', 'აღჭურვილობა არ არის საჭირო'],
      cta: 'ბავშვის ჩაწერა',
    },
    teens: {
      badge: 'უფროსები და მოზრდილები', title: 'Tackle football', age: '15 წელი და მეტი', format: 'Tackle · სრული კონტაქტი',
      intro: 'კლასიკური საკონტაქტო ამერიკული ფეხბურთი აღჭურვილობითა და ძალისმიერი ხერხებით. გზა პირველი ვარჯიშიდან საკლუბო გუნდამდე და, შესაძლოა, ეროვნულ ნაკრებამდე.',
      learn: ['ბლოკისა და დაჭერის ტექნიკა', 'სათამაშო სქემები და პოზიციები', 'ძალისმიერი და ფიზიკური მომზადება', 'გზა კლუბსა და ნაკრებში'],
      need: ['ბაზისური ფიზიკური ფორმა', 'კონტაქტისთვის მზადყოფნა', 'აღჭურვილობას აძლევს კლუბი'],
      cta: 'ვარჯიშზე მოსვლა',
    },
    faq: [
      { q: 'საჭიროა გამოცდილება?', a: 'არა. ვიღებთ ნულიდან და ვასწავლით საფუძვლებიდან — მოთამაშეების უმეტესობა გამოცდილების გარეშე დაიწყო.' },
      { q: 'საშიშია?', a: 'ბავშვები თამაშობენ უკონტაქტო flag football-ს. tackle-ში — სრული აღჭურვილობა და მწვრთნელების კონტროლი.' },
      { q: 'რა ღირს?', a: 'პირობები დამოკიდებულია კლუბსა და პროგრამაზე. მოგვწერეთ — გიამბობთ უახლოეს გუნდზე.' },
      { q: 'სად არის ვარჯიშები?', a: 'გუნდები არის თბილისსა და სხვა ქალაქებში. შეგირჩევთ უახლოესს.' },
    ],
  },
  ru: {
    kicker: 'Присоединяйся',
    h1: 'Хочешь начать играть?',
    lead: 'Американский футбол в Грузии открыт для всех — от детей, впервые берущих мяч, до взрослых, готовых к полному контакту. Выбери свой путь: мы научим с нуля.',
    learnTitle: 'Чему научим',
    needTitle: 'Что нужно',
    faqTitle: 'Частые вопросы',
    joinTitle: 'Запишись в команду',
    joinP: 'Оставь контакты — мы свяжемся и подберём ближайшую команду и программу под твой возраст и уровень.',
    phName: 'Имя',
    phPhone: 'Телефон',
    optFlag: 'Flag football (дети)',
    optTackle: 'Tackle (старшие)',
    optUndecided: 'Пока не определился',
    submit: 'Отправить заявку',
    note: 'Форма-заглушка — подключим отправку позже.',
    kids: {
      badge: 'Дети и подростки', title: 'Flag football', age: '6–14 лет', format: 'Flag football · без контакта',
      intro: 'Бесконтактный формат: вместо захвата с пояса срывают ленту-флаг. Безопасно, весело и быстро — идеальный первый шаг в спорт. Никакой тяжёлой экипировки.',
      learn: ['Бег, приём и пас', 'Работа в команде', 'Правила и дисциплину', 'Координацию и скорость'],
      need: ['Спортивная форма и кроссовки', 'Желание и энергию', 'Экипировка не нужна'],
      cta: 'Записать ребёнка',
    },
    teens: {
      badge: 'Старшие и взрослые', title: 'Tackle football', age: '15 лет и старше', format: 'Tackle · полный контакт',
      intro: 'Классический контактный американский футбол с экипировкой и силовыми приёмами. Путь от первой тренировки до клубной команды и, возможно, национальной сборной.',
      learn: ['Технику блока и захвата', 'Игровые схемы и позиции', 'Силовую и физподготовку', 'Путь в клуб и сборную'],
      need: ['Базовая физическая форма', 'Готовность к контакту', 'Экипировку даёт клуб'],
      cta: 'Прийти на тренировку',
    },
    faq: [
      { q: 'Нужен ли опыт?', a: 'Нет. Мы берём с нуля и учим всему с основ — большинство игроков начинали без опыта.' },
      { q: 'Это опасно?', a: 'Дети играют в бесконтактный flag football. В tackle — полная экипировка и контроль тренеров.' },
      { q: 'Сколько стоит?', a: 'Условия зависят от клуба и программы. Напишите нам — расскажем про ближайшую команду.' },
      { q: 'Где тренировки?', a: 'Команды есть в Тбилиси и других городах. Подберём ближайшую к вам.' },
    ],
  },
  en: {
    kicker: 'Join us',
    h1: 'Want to start playing?',
    lead: 'American football in Georgia is open to everyone — from kids picking up a ball for the first time to adults ready for full contact. Choose your path: we teach from scratch.',
    learnTitle: "What you'll learn",
    needTitle: 'What you need',
    faqTitle: 'FAQ',
    joinTitle: 'Join a team',
    joinP: 'Leave your contacts — we will reach out and match you to the nearest team and program for your age and level.',
    phName: 'Name',
    phPhone: 'Phone',
    optFlag: 'Flag football (kids)',
    optTackle: 'Tackle (seniors)',
    optUndecided: 'Not sure yet',
    submit: 'Send application',
    note: 'Placeholder form — submission will be wired up later.',
    kids: {
      badge: 'Kids & teens', title: 'Flag football', age: 'ages 6–14', format: 'Flag football · no contact',
      intro: 'A non-contact format: instead of a tackle, players pull a flag from the belt. Safe, fun and fast — the perfect first step into the sport. No heavy gear needed.',
      learn: ['Running, catching and passing', 'Teamwork', 'Rules and discipline', 'Coordination and speed'],
      need: ['Sportswear and sneakers', 'Desire and energy', 'No gear required'],
      cta: 'Enrol your child',
    },
    teens: {
      badge: 'Seniors & adults', title: 'Tackle football', age: '15 and older', format: 'Tackle · full contact',
      intro: 'Classic contact American football with full gear and physical play. The journey from a first training to a club team and, perhaps, the national squad.',
      learn: ['Blocking and tackling technique', 'Plays and positions', 'Strength and conditioning', 'A path to a club and the national team'],
      need: ['Basic physical fitness', 'Readiness for contact', 'Gear provided by the club'],
      cta: 'Come to a training',
    },
    faq: [
      { q: 'Do I need experience?', a: 'No. We take you from zero and teach the basics — most players started with no experience.' },
      { q: 'Is it dangerous?', a: 'Kids play non-contact flag football. In tackle — full gear and coach supervision.' },
      { q: 'How much does it cost?', a: 'It depends on the club and program. Write to us — we will tell you about the nearest team.' },
      { q: 'Where are the trainings?', a: 'There are teams in Tbilisi and other cities. We will find the closest one to you.' },
    ],
  },
}

const p = computed(() => tr[locale.value])
const kids = computed(() => p.value.kids)
const teens = computed(() => p.value.teens)
const faq = computed(() => p.value.faq)
</script>

<template>
  <main class="play">
    <header class="hero">
      <span class="kicker">{{ p.kicker }}</span>
      <h1>{{ p.h1 }}</h1>
      <p class="lead">{{ p.lead }}</p>
    </header>

    <div class="paths">
      <!-- Дети -->
      <section class="path path--kids">
        <span class="path__badge">{{ kids.badge }}</span>
        <h2>{{ kids.title }}</h2>
        <div class="path__meta">
          <span>{{ kids.age }}</span>
          <span>{{ kids.format }}</span>
        </div>
        <p class="path__intro">{{ kids.intro }}</p>
        <div class="path__cols">
          <div>
            <h3>{{ p.learnTitle }}</h3>
            <ul>
              <li v-for="i in kids.learn" :key="i">{{ i }}</li>
            </ul>
          </div>
          <div>
            <h3>{{ p.needTitle }}</h3>
            <ul>
              <li v-for="i in kids.need" :key="i">{{ i }}</li>
            </ul>
          </div>
        </div>
        <a href="#join" class="path__cta">{{ kids.cta }}</a>
      </section>

      <!-- Старшие -->
      <section class="path path--teens">
        <span class="path__badge">{{ teens.badge }}</span>
        <h2>{{ teens.title }}</h2>
        <div class="path__meta">
          <span>{{ teens.age }}</span>
          <span>{{ teens.format }}</span>
        </div>
        <p class="path__intro">{{ teens.intro }}</p>
        <div class="path__cols">
          <div>
            <h3>{{ p.learnTitle }}</h3>
            <ul>
              <li v-for="i in teens.learn" :key="i">{{ i }}</li>
            </ul>
          </div>
          <div>
            <h3>{{ p.needTitle }}</h3>
            <ul>
              <li v-for="i in teens.need" :key="i">{{ i }}</li>
            </ul>
          </div>
        </div>
        <a href="#join" class="path__cta">{{ teens.cta }}</a>
      </section>
    </div>

    <!-- FAQ -->
    <section class="faq">
      <h2>{{ p.faqTitle }}</h2>
      <div class="faq-grid">
        <div v-for="f in faq" :key="f.q" class="faq-item">
          <b>{{ f.q }}</b>
          <span>{{ f.a }}</span>
        </div>
      </div>
    </section>

    <!-- Запись (заглушка формы) -->
    <section id="join" class="join">
      <div class="join__card">
        <h2>{{ p.joinTitle }}</h2>
        <p>{{ p.joinP }}</p>
        <form class="join__form" @submit.prevent>
          <input type="text" :placeholder="p.phName" :aria-label="p.phName">
          <input type="tel" :placeholder="p.phPhone" :aria-label="p.phPhone">
          <select :aria-label="p.optFlag">
            <option>{{ p.optFlag }}</option>
            <option>{{ p.optTackle }}</option>
            <option>{{ p.optUndecided }}</option>
          </select>
          <button type="submit">{{ p.submit }}</button>
        </form>
        <p class="join__note">{{ p.note }}</p>
      </div>
    </section>
  </main>
</template>

<style scoped>
.play {
  background: transparent;
  color: rgba(255, 255, 255, 0.82);
  padding: clamp(120px, 14vh, 180px) clamp(20px, 6vw, 48px) 120px;
}

.hero { max-width: 820px; margin: 0 auto 56px; text-align: center; }
.kicker {
  display: inline-block;
  margin-bottom: 18px;
  font-size: 0.78rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--color-gold-light, #e6c866);
}
.hero h1 {
  margin: 0 0 24px;
  font-family: 'Oswald', sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  line-height: 1.04;
  font-size: clamp(2.2rem, 5.5vw, 4rem);
  background: linear-gradient(180deg, #fff6d4 0%, #e9c25a 55%, #c9a84c 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.lead { font-size: clamp(1.05rem, 2vw, 1.25rem); line-height: 1.6; color: rgba(255, 255, 255, 0.9); }

/* Два пути */
.paths {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 20px;
  max-width: 1000px;
  margin: 0 auto;
}
.path {
  display: flex;
  flex-direction: column;
  padding: clamp(24px, 3vw, 38px);
  border-radius: 22px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}
.path--kids {
  background: radial-gradient(130% 90% at 0% 0%, rgba(201, 168, 76, 0.14), transparent 55%), rgba(255, 255, 255, 0.02);
  border-color: rgba(201, 168, 76, 0.32);
}
.path--teens {
  background: radial-gradient(130% 90% at 0% 0%, rgba(58, 144, 200, 0.16), transparent 55%), rgba(255, 255, 255, 0.02);
  border-color: rgba(58, 144, 200, 0.35);
}
.path__badge {
  align-self: flex-start;
  padding: 5px 14px;
  border-radius: 999px;
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
  background: rgba(0, 0, 0, 0.3);
}
.path h2 {
  margin: 16px 0 10px;
  font-family: 'Oswald', sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  font-size: clamp(1.8rem, 3.5vw, 2.6rem);
  color: #fff;
}
.path__meta { display: flex; flex-wrap: wrap; gap: 8px 16px; margin-bottom: 16px; }
.path__meta span {
  font-size: 0.82rem;
  color: var(--color-gold-light, #e6c866);
  font-weight: 600;
}
.path--teens .path__meta span { color: #7fc0f0; }
.path__intro { font-size: 0.96rem; line-height: 1.6; margin: 0 0 22px; }
.path__cols { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 26px; }
.path__cols h3 {
  margin: 0 0 10px;
  font-size: 0.78rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.45);
}
.path__cols ul { margin: 0; padding-left: 18px; display: flex; flex-direction: column; gap: 6px; }
.path__cols li { font-size: 0.9rem; line-height: 1.4; }
.path__cta {
  margin-top: auto;
  display: inline-flex;
  justify-content: center;
  padding: 14px 24px;
  border-radius: 999px;
  font-family: 'Oswald', sans-serif;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  text-decoration: none;
  text-align: center;
}
.path--kids .path__cta {
  color: #1a1206;
  background: linear-gradient(100deg, #9a7a2e, #e6c866 42%, #fff6d6 50%, #e6c866 58%, #9a7a2e);
  box-shadow: 0 8px 22px rgba(201, 168, 76, 0.4);
}
.path--teens .path__cta {
  color: #fff;
  background: linear-gradient(140deg, #3a90c8, #1c5f92);
  box-shadow: 0 8px 22px rgba(28, 95, 146, 0.5);
}
.path__cta:hover { filter: brightness(1.08); }

/* FAQ */
.faq { max-width: 1000px; margin: 80px auto 0; }
.faq h2 {
  margin: 0 0 24px;
  font-family: 'Oswald', sans-serif;
  font-weight: 600;
  text-transform: uppercase;
  font-size: clamp(1.4rem, 3vw, 2rem);
  color: #fff;
  text-align: center;
}
.faq-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 14px; }
.faq-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 20px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
.faq-item b { color: var(--color-gold-light, #e6c866); font-size: 0.98rem; }
.faq-item span { font-size: 0.88rem; line-height: 1.55; color: rgba(255, 255, 255, 0.6); }

/* Запись */
.join { max-width: 680px; margin: 80px auto 0; }
.join__card {
  padding: clamp(28px, 4vw, 48px);
  border-radius: 24px;
  text-align: center;
  background: radial-gradient(120% 100% at 50% 0%, rgba(201, 168, 76, 0.1), transparent 60%), rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(201, 168, 76, 0.3);
}
.join__card h2 {
  margin: 0 0 12px;
  font-family: 'Oswald', sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  font-size: clamp(1.6rem, 3.5vw, 2.4rem);
  color: #fff;
}
.join__card > p { margin: 0 auto 26px; max-width: 460px; font-size: 0.95rem; line-height: 1.6; }
.join__form { display: flex; flex-direction: column; gap: 12px; max-width: 380px; margin: 0 auto; }
.join__form input,
.join__form select {
  padding: 13px 16px;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.14);
  color: #fff;
  font-size: 0.95rem;
  font-family: inherit;
}
.join__form input::placeholder { color: rgba(255, 255, 255, 0.4); }
.join__form select { cursor: pointer; }
.join__form button {
  margin-top: 4px;
  padding: 14px;
  border: none;
  border-radius: 12px;
  font-family: 'Oswald', sans-serif;
  font-weight: 600;
  font-size: 0.95rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #1a1206;
  cursor: pointer;
  background: linear-gradient(100deg, #9a7a2e, #e6c866 42%, #fff6d6 50%, #e6c866 58%, #9a7a2e);
  box-shadow: 0 8px 22px rgba(201, 168, 76, 0.4);
  transition: transform 0.2s ease;
}
.join__form button:hover { transform: translateY(-2px); }
.join__note { margin: 18px 0 0; font-size: 0.78rem; color: rgba(255, 255, 255, 0.35); }

@media (max-width: 420px) {
  .path__cols { grid-template-columns: 1fr; }
}
</style>
