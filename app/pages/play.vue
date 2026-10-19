<script setup lang="ts">
// Начать играть — хаб из трёх путей по аудитории (Дети · Студлига · Клубы),
// внутри каждого пути — переключатель формата Flag/Tackle со своим контентом.
// Дети и Студлига помечены как стратегические приоритеты 2026.
// Контент — каркас (рамочные тексты), наполним реальными данными позже.
const { locale } = useLocale()
const route = useRoute()
useHead({ title: 'Начать играть — American Football Federation of Georgia' })

type PathId = 'kids' | 'students' | 'clubs'
type FormatId = 'flag' | 'tackle'

const validPath = (v: unknown): PathId | null =>
  v === 'kids' || v === 'students' || v === 'clubs' ? v : null

const activePath = ref<PathId>(validPath(route.query.path) ?? 'kids')
const activeFormat = ref<FormatId>('flag')

function selectPath(id: PathId) {
  activePath.value = id
  // если у нового пути нет выбранного формата — откатываемся на flag
  if (!tr[locale.value].pathsById[id].formats[activeFormat.value]) activeFormat.value = 'flag'
}
watch(() => route.query.path, (v) => { const p = validPath(v); if (p) activePath.value = p })

const tr = {
  ka: {
    kicker: 'შემოგვიერთდი',
    h1: 'გინდა თამაშის დაწყება?',
    lead: 'ამერიკული ფეხბურთი საქართველოში ღიაა ყველასთვის. აირჩიე შენი გზა და ფორმატი — დანარჩენს მწვრთნელები გასწავლიან ნულიდან.',
    priorityTag: 'პრიორიტეტი 2026',
    chooseFormat: 'აირჩიე ფორმატი',
    flagSub: 'კონტაქტის გარეშე',
    tackleSub: 'სრული კონტაქტი',
    ageLabel: 'ასაკი',
    learnTitle: 'რას გასწავლით',
    needTitle: 'რა გჭირდება',
    faqTitle: 'ხშირი კითხვები',
    joinTitle: 'ჩაეწერე გუნდში',
    joinP: 'დატოვე კონტაქტები — დაგიკავშირდებით და შეგირჩევთ უახლოეს გუნდსა და პროგრამას ასაკისა და დონის მიხედვით.',
    phName: 'სახელი', phPhone: 'ტელეფონი',
    optFlag: 'Flag football', optTackle: 'Tackle', optUndecided: 'ჯერ არ გადამიწყვეტია',
    submit: 'განაცხადის გაგზავნა',
    note: 'ფორმა დროებითია — გაგზავნას მოგვიანებით დავამატებთ.',
    paths: [
      {
        id: 'kids', icon: '🧒', priority: true, badge: 'ბავშვები', title: 'ბავშვთა ფეხბურთი',
        tagline: 'პირველი ნაბიჯი სპორტში — მხიარულად და უსაფრთხოდ',
        formats: {
          flag: {
            age: '6–14 წელი',
            intro: 'უკონტაქტო ფორმატი: წელიდან აღების ნაცვლად იხსნება ლენტი-ფლაგი. უსაფრთხო, მხიარული და სწრაფი — იდეალური პირველი ნაბიჯი. მძიმე აღჭურვილობა არ არის საჭირო.',
            learn: ['სირბილი, მიღება და პასი', 'გუნდური მუშაობა', 'წესები და დისციპლინა', 'კოორდინაცია და სისწრაფე'],
            need: ['სპორტული ფორმა და კროსოვკები', 'სურვილი და ენერგია', 'აღჭურვილობა არ არის საჭირო'],
            cta: 'ბავშვის ჩაწერა',
          },
          tackle: {
            age: '12–14 წელი',
            intro: 'საკონტაქტო ფეხბურთი უფროსი ბავშვებისთვის — რბილი შესვლა თამაშში სრული აღჭურვილობითა და მწვრთნელების კონტროლით. აქცენტი ტექნიკასა და უსაფრთხოებაზე.',
            learn: ['ბლოკისა და დაჭერის საბაზისო ტექნიკა', 'სათამაშო პოზიციები', 'ასაკის შესაბამისი ფიზმომზადება', 'გუნდური თამაში'],
            need: ['საბაზისო ფიზიკური ფორმა', 'მშობლის თანხმობა', 'აღჭურვილობას აძლევს კლუბი'],
            cta: 'ბავშვის ჩაწერა',
          },
        },
      },
      {
        id: 'students', icon: '🎓', priority: true, badge: 'სტუდენტური ლიგა', title: 'სტუდენტური ლიგა',
        tagline: 'ითამაშე შენი უნივერსიტეტისთვის',
        formats: {
          flag: {
            age: 'სტუდენტები',
            intro: 'საუნივერსიტეტთაშორისო flag-ლიგა: უნივერსიტეტების გუნდები, რეგულარული ტურები და სტუდენტური ტურნირები. უკონტაქტო ფორმატი — შეიძლება ნულიდან დაწყება სწავლის პარალელურად.',
            learn: ['თამაშის საფუძვლები და მარშრუტები', 'გუნდური ტაქტიკა', 'ტურნირებზე თამაში', 'სპორტული ნაცნობობები'],
            need: ['სტუდენტის სტატუსი', 'სპორტული ფორმა', 'გამოცდილება სავალდებულო არ არის'],
            cta: 'ლიგაში გაწევრიანება',
          },
          tackle: {
            age: 'სტუდენტები',
            intro: 'საკონტაქტო მიმართულება სტუდენტებისთვის, ვინც მზადაა სრული თამაშისთვის — გზა სტუდენტური გუნდიდან კლუბსა და ნაკრებამდე.',
            learn: ['კონტაქტის ტექნიკა და სქემები', 'პოზიციები და როლები', 'ძალისმიერი მომზადება', 'გზა კლუბში/ნაკრებში'],
            need: ['საბაზისო ფორმა', 'კონტაქტისთვის მზადყოფნა', 'აღჭურვილობას აძლევს კლუბი/ლიგა'],
            cta: 'ლიგაში გაწევრიანება',
          },
        },
      },
      {
        id: 'clubs', icon: '🏈', priority: false, badge: 'უფროსები და კლუბები', title: 'უფროსები · კლუბები',
        tagline: 'გზა კლუბსა და ეროვნულ ნაკრებამდე',
        formats: {
          flag: {
            age: '16+',
            intro: 'უფროსების flag-ფეხბურთი: ვარჯიშები, საკლუბო გუნდები და გზა ეროვნულ flag-ნაკრებამდე, რომელიც უკვე საერთაშორისო ასპარეზზე გამოდის.',
            learn: ['მარშრუტები და ტაქტიკა', 'გუნდური თამაში', 'სათამაშო გამოცდილება', 'გზა flag-ნაკრებში'],
            need: ['სპორტული ფორმა', 'თამაშის სურვილი', 'აღჭურვილობა არ არის საჭირო'],
            cta: 'ვარჯიშზე მოსვლა',
          },
          tackle: {
            age: '15+',
            intro: 'კლასიკური საკონტაქტო ამერიკული ფეხბურთი აღჭურვილობითა და ძალისმიერი ხერხებით. გზა პირველი ვარჯიშიდან საკლუბო გუნდამდე და ეროვნულ ნაკრებამდე.',
            learn: ['ბლოკისა და დაჭერის ტექნიკა', 'სათამაშო სქემები და პოზიციები', 'ძალისმიერი და ფიზიკური მომზადება', 'გზა კლუბსა და ნაკრებში'],
            need: ['ბაზისური ფიზიკური ფორმა', 'კონტაქტისთვის მზადყოფნა', 'აღჭურვილობას აძლევს კლუბი'],
            cta: 'ვარჯიშზე მოსვლა',
          },
        },
      },
    ],
    faq: [
      { q: 'საჭიროა გამოცდილება?', a: 'არა. ვიღებთ ნულიდან და ვასწავლით საფუძვლებიდან — მოთამაშეების უმეტესობა გამოცდილების გარეშე დაიწყო.' },
      { q: 'საშიშია?', a: 'flag — უკონტაქტოა. tackle-ში — სრული აღჭურვილობა და მწვრთნელების კონტროლი.' },
      { q: 'რა ღირს?', a: 'პირობები დამოკიდებულია კლუბსა და პროგრამაზე. მოგვწერეთ — გიამბობთ უახლოეს გუნდზე.' },
      { q: 'სად არის ვარჯიშები?', a: 'გუნდები არის თბილისსა და სხვა ქალაქებში. შეგირჩევთ უახლოესს.' },
    ],
  },
  ru: {
    kicker: 'Присоединяйся',
    h1: 'Хочешь начать играть?',
    lead: 'Американский футбол в Грузии открыт для всех. Выбери свой путь и формат — остальному научат тренеры, с нуля.',
    priorityTag: 'Приоритет 2026',
    chooseFormat: 'Выбери формат',
    flagSub: 'без контакта',
    tackleSub: 'полный контакт',
    ageLabel: 'Возраст',
    learnTitle: 'Чему научим',
    needTitle: 'Что нужно',
    faqTitle: 'Частые вопросы',
    joinTitle: 'Запишись в команду',
    joinP: 'Оставь контакты — мы свяжемся и подберём ближайшую команду и программу под твой возраст и уровень.',
    phName: 'Имя', phPhone: 'Телефон',
    optFlag: 'Flag football', optTackle: 'Tackle', optUndecided: 'Пока не определился',
    submit: 'Отправить заявку',
    note: 'Форма-заглушка — подключим отправку позже.',
    paths: [
      {
        id: 'kids', icon: '🧒', priority: true, badge: 'Дети и подростки', title: 'Детский футбол',
        tagline: 'Первый шаг в спорт — весело и безопасно',
        formats: {
          flag: {
            age: '6–14 лет',
            intro: 'Бесконтактный формат: вместо захвата с пояса срывают ленту-флаг. Безопасно, весело и быстро — идеальное начало. Тяжёлая экипировка не нужна.',
            learn: ['Бег, приём и пас', 'Работа в команде', 'Правила и дисциплину', 'Координацию и скорость'],
            need: ['Спортивная форма и кроссовки', 'Желание и энергию', 'Экипировка не нужна'],
            cta: 'Записать ребёнка',
          },
          tackle: {
            age: '12–14 лет',
            intro: 'Контактный футбол для старших детей — мягкий вход в игру с полной экипировкой и под контролем тренеров. Акцент на технике и безопасности.',
            learn: ['Базовую технику блока и захвата', 'Игровые позиции', 'Физподготовку по возрасту', 'Командную игру'],
            need: ['Базовую физическую форму', 'Согласие родителей', 'Экипировку даёт клуб'],
            cta: 'Записать ребёнка',
          },
        },
      },
      {
        id: 'students', icon: '🎓', priority: true, badge: 'Студенческая лига', title: 'Студенческая лига',
        tagline: 'Играй за свой вуз',
        formats: {
          flag: {
            age: 'студенты вузов',
            intro: 'Межвузовская флаг-лига: команды университетов, регулярные туры и студенческие турниры. Бесконтактный формат — можно начать с нуля параллельно с учёбой.',
            learn: ['Основы игры и маршруты', 'Командную тактику', 'Игру на турнирах', 'Спортивный нетворкинг'],
            need: ['Статус студента', 'Спортивную форму', 'Опыт не обязателен'],
            cta: 'Вступить в лигу',
          },
          tackle: {
            age: 'студенты вузов',
            intro: 'Контактное направление для студентов, готовых к полной игре — путь через студенческую команду в клуб и сборную.',
            learn: ['Технику контакта и схемы', 'Позиции и роли', 'Силовую подготовку', 'Путь в клуб/сборную'],
            need: ['Базовую форму', 'Готовность к контакту', 'Экипировку даёт клуб/лига'],
            cta: 'Вступить в лигу',
          },
        },
      },
      {
        id: 'clubs', icon: '🏈', priority: false, badge: 'Взрослые и клубы', title: 'Взрослые · клубы',
        tagline: 'Путь в клуб и национальную сборную',
        formats: {
          flag: {
            age: '16+',
            intro: 'Взрослый флаг-футбол: тренировки, клубные команды и путь в национальную флаг-сборную, которая уже выступает на международной арене.',
            learn: ['Маршруты и тактику', 'Командную игру', 'Соревновательный опыт', 'Путь в сборную по флагу'],
            need: ['Спортивную форму', 'Желание играть', 'Экипировка не нужна'],
            cta: 'Прийти на тренировку',
          },
          tackle: {
            age: '15+',
            intro: 'Классический контактный американский футбол с экипировкой и силовыми приёмами. Путь от первой тренировки до клубной команды и национальной сборной.',
            learn: ['Технику блока и захвата', 'Игровые схемы и позиции', 'Силовую и физподготовку', 'Путь в клуб и сборную'],
            need: ['Базовую физическую форму', 'Готовность к контакту', 'Экипировку даёт клуб'],
            cta: 'Прийти на тренировку',
          },
        },
      },
    ],
    faq: [
      { q: 'Нужен ли опыт?', a: 'Нет. Мы берём с нуля и учим всему с основ — большинство игроков начинали без опыта.' },
      { q: 'Это опасно?', a: 'Flag — бесконтактный. В tackle — полная экипировка и контроль тренеров.' },
      { q: 'Сколько стоит?', a: 'Условия зависят от клуба и программы. Напишите нам — расскажем про ближайшую команду.' },
      { q: 'Где тренировки?', a: 'Команды есть в Тбилиси и других городах. Подберём ближайшую к вам.' },
    ],
  },
  en: {
    kicker: 'Join us',
    h1: 'Want to start playing?',
    lead: 'American football in Georgia is open to everyone. Choose your path and format — coaches handle the rest, from scratch.',
    priorityTag: 'Priority 2026',
    chooseFormat: 'Choose format',
    flagSub: 'no contact',
    tackleSub: 'full contact',
    ageLabel: 'Age',
    learnTitle: "What you'll learn",
    needTitle: 'What you need',
    faqTitle: 'FAQ',
    joinTitle: 'Join a team',
    joinP: 'Leave your contacts — we will reach out and match you to the nearest team and program for your age and level.',
    phName: 'Name', phPhone: 'Phone',
    optFlag: 'Flag football', optTackle: 'Tackle', optUndecided: 'Not sure yet',
    submit: 'Send application',
    note: 'Placeholder form — submission will be wired up later.',
    paths: [
      {
        id: 'kids', icon: '🧒', priority: true, badge: 'Kids & teens', title: "Kids' football",
        tagline: 'The first step into sport — fun and safe',
        formats: {
          flag: {
            age: 'ages 6–14',
            intro: 'A non-contact format: instead of a tackle, players pull a flag from the belt. Safe, fun and fast — the perfect first step. No heavy gear needed.',
            learn: ['Running, catching and passing', 'Teamwork', 'Rules and discipline', 'Coordination and speed'],
            need: ['Sportswear and sneakers', 'Desire and energy', 'No gear required'],
            cta: 'Enrol your child',
          },
          tackle: {
            age: 'ages 12–14',
            intro: 'Contact football for older kids — a gentle entry into the game with full gear and coach supervision. Focus on technique and safety.',
            learn: ['Basic blocking and tackling', 'Playing positions', 'Age-appropriate conditioning', 'Team play'],
            need: ['Basic physical fitness', 'Parental consent', 'Gear provided by the club'],
            cta: 'Enrol your child',
          },
        },
      },
      {
        id: 'students', icon: '🎓', priority: true, badge: 'Student league', title: 'Student league',
        tagline: 'Play for your university',
        formats: {
          flag: {
            age: 'university students',
            intro: 'An inter-university flag league: university teams, regular rounds and student tournaments. A non-contact format — you can start from scratch alongside your studies.',
            learn: ['Game basics and routes', 'Team tactics', 'Playing in tournaments', 'Sports networking'],
            need: ['Student status', 'Sportswear', 'No experience required'],
            cta: 'Join the league',
          },
          tackle: {
            age: 'university students',
            intro: 'A contact track for students ready for the full game — the path from a student team to a club and the national squad.',
            learn: ['Contact technique and schemes', 'Positions and roles', 'Strength training', 'Path to club/national team'],
            need: ['Basic fitness', 'Readiness for contact', 'Gear provided by club/league'],
            cta: 'Join the league',
          },
        },
      },
      {
        id: 'clubs', icon: '🏈', priority: false, badge: 'Adults & clubs', title: 'Adults · clubs',
        tagline: 'The path to a club and the national team',
        formats: {
          flag: {
            age: '16+',
            intro: 'Adult flag football: trainings, club teams and a path to the national flag squad, which already competes internationally.',
            learn: ['Routes and tactics', 'Team play', 'Competitive experience', 'Path to the flag national team'],
            need: ['Sportswear', 'Desire to play', 'No gear required'],
            cta: 'Come to a training',
          },
          tackle: {
            age: '15+',
            intro: 'Classic contact American football with full gear and physical play. The journey from a first training to a club team and the national squad.',
            learn: ['Blocking and tackling technique', 'Plays and positions', 'Strength and conditioning', 'A path to a club and the national team'],
            need: ['Basic physical fitness', 'Readiness for contact', 'Gear provided by the club'],
            cta: 'Come to a training',
          },
        },
      },
    ],
    faq: [
      { q: 'Do I need experience?', a: 'No. We take you from zero and teach the basics — most players started with no experience.' },
      { q: 'Is it dangerous?', a: 'Flag is non-contact. In tackle — full gear and coach supervision.' },
      { q: 'How much does it cost?', a: 'It depends on the club and program. Write to us — we will tell you about the nearest team.' },
      { q: 'Where are the trainings?', a: 'There are teams in Tbilisi and other cities. We will find the closest one to you.' },
    ],
  },
} as const

// Индекс путей по id — для быстрого доступа (напр. в selectPath)
;(tr as any).ka.pathsById = Object.fromEntries(tr.ka.paths.map(p => [p.id, p]))
;(tr as any).ru.pathsById = Object.fromEntries(tr.ru.paths.map(p => [p.id, p]))
;(tr as any).en.pathsById = Object.fromEntries(tr.en.paths.map(p => [p.id, p]))

const p = computed(() => tr[locale.value])
const paths = computed(() => p.value.paths)
const active = computed(() => paths.value.find(x => x.id === activePath.value)!)
const current = computed(() => active.value.formats[activeFormat.value] ?? active.value.formats.flag)
const faq = computed(() => p.value.faq)
</script>

<template>
  <main class="play">
    <header class="hero">
      <span class="kicker">{{ p.kicker }}</span>
      <h1>{{ p.h1 }}</h1>
      <p class="lead">{{ p.lead }}</p>
    </header>

    <!-- Шаг 1: выбор пути (аудитория). Дети и Студлига — приоритеты. -->
    <div class="selector">
      <button
        v-for="pw in paths"
        :key="pw.id"
        type="button"
        class="pw"
        :class="[`pw--${pw.id}`, { 'is-active': pw.id === activePath, 'pw--priority': pw.priority }]"
        @click="selectPath(pw.id)"
      >
        <span v-if="pw.priority" class="pw__tag">★ {{ p.priorityTag }}</span>
        <span class="pw__icon" aria-hidden="true">{{ pw.icon }}</span>
        <span class="pw__title">{{ pw.title }}</span>
        <span class="pw__badge">{{ pw.badge }}</span>
      </button>
    </div>

    <!-- Шаг 2: детали выбранного пути + переключатель формата -->
    <section class="panel" :class="`panel--${activePath}`">
      <div class="panel__head">
        <h2>{{ active.title }}</h2>
        <p class="panel__tagline">{{ active.tagline }}</p>
      </div>

      <div class="fmt" role="tablist" :aria-label="p.chooseFormat">
        <button
          type="button"
          class="fmt__btn"
          role="tab"
          :aria-selected="activeFormat === 'flag'"
          :class="{ 'is-on': activeFormat === 'flag' }"
          @click="activeFormat = 'flag'"
        >
          Flag <small>{{ p.flagSub }}</small>
        </button>
        <button
          type="button"
          class="fmt__btn"
          role="tab"
          :aria-selected="activeFormat === 'tackle'"
          :class="{ 'is-on': activeFormat === 'tackle' }"
          :disabled="!active.formats.tackle"
          @click="activeFormat = 'tackle'"
        >
          Tackle <small>{{ p.tackleSub }}</small>
        </button>
      </div>

      <div class="panel__meta">
        <span>{{ p.ageLabel }}: {{ current.age }}</span>
      </div>
      <p class="panel__intro">{{ current.intro }}</p>

      <div class="panel__cols">
        <div>
          <h3>{{ p.learnTitle }}</h3>
          <ul>
            <li v-for="i in current.learn" :key="i">{{ i }}</li>
          </ul>
        </div>
        <div>
          <h3>{{ p.needTitle }}</h3>
          <ul>
            <li v-for="i in current.need" :key="i">{{ i }}</li>
          </ul>
        </div>
      </div>

      <a href="#join" class="panel__cta">{{ current.cta }}</a>
    </section>

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

.hero { max-width: 820px; margin: 0 auto 48px; text-align: center; }
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

/* ===== Шаг 1: выбор пути ===== */
.selector {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  max-width: 1000px;
  margin: 0 auto 22px;
}
.pw {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 26px 18px 20px;
  border-radius: 18px;
  cursor: pointer;
  text-align: center;
  color: #fff;
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.2s ease, border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
}
.pw:hover { transform: translateY(-3px); }
.pw__icon { font-size: 2rem; line-height: 1; }
.pw__title {
  font-family: 'Oswald', sans-serif;
  font-weight: 600;
  text-transform: uppercase;
  font-size: clamp(1rem, 2vw, 1.3rem);
  letter-spacing: 0.01em;
}
.pw__badge { font-size: 0.74rem; color: rgba(255, 255, 255, 0.5); }
.pw__tag {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 3px 9px;
  border-radius: 999px;
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #1a1206;
  background: linear-gradient(145deg, #e6c866, #c9a84c);
}
/* Акценты путей */
.pw--kids.is-active { border-color: rgba(230, 200, 102, 0.75); background: radial-gradient(130% 100% at 50% 0%, rgba(201, 168, 76, 0.18), transparent 60%), rgba(255, 255, 255, 0.03); box-shadow: 0 16px 36px -18px rgba(201, 168, 76, 0.6); }
.pw--students.is-active { border-color: rgba(67, 185, 166, 0.75); background: radial-gradient(130% 100% at 50% 0%, rgba(67, 185, 166, 0.18), transparent 60%), rgba(255, 255, 255, 0.03); box-shadow: 0 16px 36px -18px rgba(67, 185, 166, 0.55); }
.pw--clubs.is-active { border-color: rgba(58, 144, 200, 0.75); background: radial-gradient(130% 100% at 50% 0%, rgba(58, 144, 200, 0.18), transparent 60%), rgba(255, 255, 255, 0.03); box-shadow: 0 16px 36px -18px rgba(58, 144, 200, 0.55); }
/* Приоритеты — лёгкая золотая рамка даже в покое */
.pw--priority { border-color: rgba(201, 168, 76, 0.4); }

/* ===== Шаг 2: панель пути ===== */
.panel {
  max-width: 1000px;
  margin: 0 auto;
  padding: clamp(26px, 4vw, 44px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.02);
}
.panel--kids { background: radial-gradient(120% 90% at 0% 0%, rgba(201, 168, 76, 0.12), transparent 55%), rgba(255, 255, 255, 0.02); border-color: rgba(201, 168, 76, 0.3); }
.panel--students { background: radial-gradient(120% 90% at 0% 0%, rgba(67, 185, 166, 0.14), transparent 55%), rgba(255, 255, 255, 0.02); border-color: rgba(67, 185, 166, 0.32); }
.panel--clubs { background: radial-gradient(120% 90% at 0% 0%, rgba(58, 144, 200, 0.14), transparent 55%), rgba(255, 255, 255, 0.02); border-color: rgba(58, 144, 200, 0.32); }

.panel__head { margin-bottom: 20px; }
.panel h2 {
  margin: 0 0 6px;
  font-family: 'Oswald', sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  font-size: clamp(1.7rem, 3.5vw, 2.6rem);
  color: #fff;
}
.panel__tagline { margin: 0; font-size: 0.98rem; color: rgba(255, 255, 255, 0.7); }

/* Переключатель формата */
.fmt {
  display: inline-flex;
  gap: 6px;
  padding: 5px;
  border-radius: 14px;
  background: rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 22px;
}
.fmt__btn {
  display: inline-flex;
  align-items: baseline;
  gap: 7px;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  background: transparent;
  color: rgba(255, 255, 255, 0.68);
  font-family: 'Oswald', sans-serif;
  font-weight: 600;
  font-size: 1rem;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
}
.fmt__btn small { font-size: 0.68rem; font-weight: 500; letter-spacing: 0.02em; opacity: 0.8; text-transform: none; }
.fmt__btn:disabled { opacity: 0.3; cursor: not-allowed; }
.fmt__btn.is-on { color: #1a1206; background: linear-gradient(145deg, #e6c866, #c9a84c); }
.panel--students .fmt__btn.is-on { color: #06201c; background: linear-gradient(145deg, #5fd8c2, #2f9e8c); }
.panel--clubs .fmt__btn.is-on { color: #fff; background: linear-gradient(145deg, #3a90c8, #1c5f92); }

.panel__meta { margin-bottom: 14px; }
.panel__meta span { font-size: 0.82rem; font-weight: 600; color: var(--color-gold-light, #e6c866); }
.panel--students .panel__meta span { color: #5fd8c2; }
.panel--clubs .panel__meta span { color: #7fc0f0; }
.panel__intro { font-size: 1rem; line-height: 1.65; margin: 0 0 24px; max-width: 760px; }
.panel__cols { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 28px; }
.panel__cols h3 {
  margin: 0 0 10px;
  font-size: 0.76rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.45);
}
.panel__cols ul { margin: 0; padding-left: 18px; display: flex; flex-direction: column; gap: 7px; }
.panel__cols li { font-size: 0.92rem; line-height: 1.45; }
.panel__cta {
  display: inline-flex;
  justify-content: center;
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
  transition: transform 0.2s ease;
}
.panel--students .panel__cta { color: #06201c; background: linear-gradient(140deg, #5fd8c2, #2f9e8c); box-shadow: 0 8px 22px rgba(67, 185, 166, 0.45); }
.panel--clubs .panel__cta { color: #fff; background: linear-gradient(140deg, #3a90c8, #1c5f92); box-shadow: 0 8px 22px rgba(28, 95, 146, 0.5); }
.panel__cta:hover { transform: translateY(-2px); }

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

@media (max-width: 680px) {
  .selector { grid-template-columns: 1fr; gap: 10px; }
  .pw { flex-direction: row; align-items: center; justify-content: flex-start; gap: 14px; padding: 14px 16px; text-align: left; }
  .pw__icon { font-size: 1.7rem; order: 0; }
  .pw__title { font-size: 1.05rem; order: 1; }
  .pw__badge { display: none; }
  .pw__tag { order: 2; position: static; margin-left: auto; flex-shrink: 0; white-space: nowrap; font-size: 0.56rem; padding: 3px 9px; }
  .panel__cols { grid-template-columns: 1fr; gap: 18px; }
  .fmt { display: flex; width: 100%; }
  .fmt__btn { flex: 1; justify-content: center; padding: 11px 10px; }
}
</style>
