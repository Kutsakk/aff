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
const panelEl = ref<HTMLElement | null>(null)

function selectPath(id: PathId) {
  activePath.value = id
  // если у нового пути нет выбранного формата — откатываемся на flag
  if (!tr[locale.value].pathsById[id].formats[activeFormat.value]) activeFormat.value = 'flag'
}
// Клик по карточке выбора: переключаем путь и плавно доскролливаем к блоку
function choosePath(id: PathId) {
  selectPath(id)
  nextTick(() => panelEl.value?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
}
watch(() => route.query.path, (v) => { const p = validPath(v); if (p) activePath.value = p })

const tr = {
  ka: {
    kicker: 'შემოგვიერთდი',
    h1: 'გინდა თამაშის დაწყება?',
    lead: 'ამერიკული ფეხბურთი საქართველოში ღიაა ყველასთვის. აირჩიე შენი გზა და ფორმატი — დანარჩენს მწვრთნელები გასწავლიან ნულიდან.',
    priorityTag: 'პრიორიტეტი',
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
    note: 'დატოვე კონტაქტები — დაგიკავშირდებით უმოკლეს დროში.',
    phLastName: 'გვარი', phAge: 'ასაკი', phQuestion: 'თუ გაქვს შეკითხვა — მოგვწერე',
    dirLabel: 'მიმართულება', fmtLabel: 'ფორმატი',
    sentTitle: 'განაცხადი გაიგზავნა!', sentText: 'მადლობა — დაგიკავშირდებით უახლოეს დროს.', sentAgain: 'ახალი განაცხადი',
    submitting: 'იგზავნება…', submitError: 'ვერ გაიგზავნა — სცადე მოგვიანებით.',
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
    priorityTag: 'Приоритет',
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
    note: 'Оставь контакты — свяжемся с тобой в ближайшее время.',
    phLastName: 'Фамилия', phAge: 'Возраст', phQuestion: 'Если есть вопрос — напиши',
    dirLabel: 'Направление', fmtLabel: 'Формат',
    sentTitle: 'Заявка отправлена!', sentText: 'Спасибо — свяжемся с тобой в ближайшее время.', sentAgain: 'Новая заявка',
    submitting: 'Отправка…', submitError: 'Не удалось отправить — попробуйте позже.',
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
    priorityTag: 'Priority',
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
    note: 'Leave your contacts — we will get back to you shortly.',
    phLastName: 'Last name', phAge: 'Age', phQuestion: 'If you have a question, write it',
    dirLabel: 'Direction', fmtLabel: 'Format',
    sentTitle: 'Application sent!', sentText: 'Thanks — we will contact you soon.', sentAgain: 'New application',
    submitting: 'Sending…', submitError: 'Could not send — please try again later.',
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

// Фото игроков по пути → { flag, tackle }. Для путей без фото (clubs)
// медиа-зона скрывается, панель становится одноколоночной.
const players: Record<string, { flag: string; tackle: string }> = {
  kids: { flag: '/play-player-flag.webp', tackle: '/play-player-tackle.webp' },
  students: { flag: '/play-students-flag.webp', tackle: '/play-students-tackle.webp' },
  clubs: { flag: '/play-clubs-flag.webp', tackle: '/play-clubs-tackle.webp' },
}
const playerSet = computed(() => players[activePath.value])
// У каких путей есть фото-карточка (фон в селекторе)
const cardPhoto = (id: string) => id === 'kids' || id === 'students' || id === 'clubs'

// Поля формы записи
const formName = ref('')
const formLast = ref('')
const formPhone = ref('')
const formAge = ref('')
const formQuestion = ref('')
const formSent = ref(false)
const formSending = ref(false)
const formError = ref('')
async function submitForm() {
  if (formSending.value) return
  formError.value = ''
  formSending.value = true
  try {
    await $fetch('/api/join', {
      method: 'POST',
      body: {
        name: formName.value,
        lastName: formLast.value,
        phone: formPhone.value,
        age: formAge.value,
        direction: activePath.value,
        format: activeFormat.value,
        question: formQuestion.value,
      },
    })
    formSent.value = true
  } catch (e: any) {
    formError.value = e?.data?.statusMessage || e?.statusMessage || p.value.submitError
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
  formAge.value = ''
  formQuestion.value = ''
}
// Направление/формат в форме синхронизированы с выбором наверху (двусторонне):
// кликнул карточку → отразилось в форме, выбрал в форме → подсветилась карточка
const formPath = computed<PathId>({
  get: () => activePath.value,
  set: (v) => selectPath(v),
})
// Tackle-фото этого пути — сцена с фоном (показываем в рамке-карточке),
// а не вырезанная фигура на прозрачном фоне. Пока сценовых нет.
const framedTackle = computed(() => false)
</script>

<template>
  <main class="play">
    <!-- Фон страницы (только десктоп): золотые крылья на чёрном, края ярче,
         центр притушён под текст. Зафиксирован к вьюпорту. -->
    <div class="play-bg" aria-hidden="true" />
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
        @click="choosePath(pw.id)"
      >
        <span v-if="cardPhoto(pw.id)" class="pw__photo" aria-hidden="true" />
        <span v-if="pw.priority" class="pw__tag">★ {{ p.priorityTag }}</span>
        <span v-if="!cardPhoto(pw.id)" class="pw__icon" aria-hidden="true">{{ pw.icon }}</span>
        <span class="pw__title">{{ pw.title }}</span>
        <span class="pw__badge">{{ pw.badge }}</span>
      </button>
    </div>

    <!-- Шаг 2: детали выбранного пути + переключатель формата.
         Стеклянная панель с бликами: слева контент, справа фото игрока,
         которое плавно сменяется (crossfade) при переключении Flag/Tackle. -->
    <section ref="panelEl" class="panel" :class="[`panel--${activePath}`, { 'panel--has-media': playerSet }]">
      <!-- Блики стекла -->
      <div class="panel__glare" aria-hidden="true" />

      <div class="panel__inner">
        <div class="panel__content">
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
        </div>

        <!-- Фото формата: два слоя, переключаются по activeFormat.
             Источник зависит от выбранного пути (playerSet). -->
        <div v-if="playerSet" class="panel__media" aria-hidden="true">
          <span class="panel__media-glow" />
          <img
            class="panel__player"
            :class="{ 'is-on': activeFormat === 'flag' }"
            :src="playerSet.flag"
            alt=""
            loading="lazy"
          >
          <img
            class="panel__player panel__player--tackle"
            :class="{ 'is-on': activeFormat === 'tackle', 'panel__player--framed': framedTackle }"
            :src="playerSet.tackle"
            alt=""
            loading="lazy"
          >
        </div>
      </div>
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
      <div class="join__card" :class="`join__card--${activePath}`">
        <span class="join__glare" aria-hidden="true" />
        <div class="join__inner">
          <!-- Состояние «успешно отправлено» -->
          <div v-if="formSent" class="join__success">
            <span class="join__check" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 12.5l5 5L20 6.5" />
              </svg>
            </span>
            <h2>{{ p.sentTitle }}</h2>
            <p>{{ p.sentText }}</p>
            <button type="button" class="join__again" @click="resetForm">{{ p.sentAgain }}</button>
          </div>

          <!-- Форма -->
          <template v-else>
            <h2>{{ p.joinTitle }}</h2>
            <p>{{ p.joinP }}</p>
            <form class="join__form" @submit.prevent="submitForm">
              <div class="join__row">
                <input v-model="formName" type="text" :placeholder="p.phName" :aria-label="p.phName">
                <input v-model="formLast" type="text" :placeholder="p.phLastName" :aria-label="p.phLastName">
              </div>
              <div class="join__row">
                <input v-model="formPhone" type="tel" :placeholder="p.phPhone" :aria-label="p.phPhone">
                <input v-model="formAge" type="number" min="5" max="99" :placeholder="p.phAge" :aria-label="p.phAge">
              </div>
              <div class="join__row">
                <label class="join__field">
                  <span>{{ p.dirLabel }}</span>
                  <select v-model="formPath" :aria-label="p.dirLabel">
                    <option v-for="pw in paths" :key="pw.id" :value="pw.id">{{ pw.title }}</option>
                  </select>
                </label>
                <label class="join__field">
                  <span>{{ p.fmtLabel }}</span>
                  <select v-model="activeFormat" :aria-label="p.fmtLabel">
                    <option value="flag">{{ p.optFlag }}</option>
                    <option value="tackle">{{ p.optTackle }}</option>
                  </select>
                </label>
              </div>
              <textarea
                v-model="formQuestion"
                class="join__question"
                rows="3"
                :placeholder="p.phQuestion"
                :aria-label="p.phQuestion"
              />
              <button type="submit" :disabled="formSending">
                {{ formSending ? p.submitting : p.submit }}
              </button>
              <p v-if="formError" class="join__error">{{ formError }}</p>
            </form>
            <p class="join__note">{{ p.note }}</p>
          </template>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.play {
  position: relative;
  background: transparent;
  color: rgba(255, 255, 255, 0.82);
  padding: clamp(120px, 14vh, 180px) clamp(20px, 6vw, 48px) 120px;
}

/* Фон «Играть» — только десктоп. Края растворяются в чёрный (без шва),
   общий центр притушён, золото крыльев по бокам подсвечено. */
.play-bg { display: none; }
/* Мобилка: вертикальная версия крыльев (золото рамкой сверху/снизу),
   центр притушён под текст, края ярче. */
@media (max-width: 900px) {
  .play-bg {
    display: block;
    position: fixed;
    /* высоту фиксируем к большому вьюпорту, чтобы при скрытии адресной
       строки на телефоне фон не «зумился» (cover не пересчитывался) */
    top: 0;
    left: 0;
    right: 0;
    bottom: auto;
    height: 100vh;
    height: 100lvh;
    z-index: 0;
    pointer-events: none;
    background:
      radial-gradient(74% 58% at 50% 50%,
        rgba(0, 0, 0, 0.72) 0%,
        rgba(0, 0, 0, 0.5) 46%,
        rgba(0, 0, 0, 0.12) 76%,
        rgba(0, 0, 0, 0) 100%),
      url('/play-bg-wings-v.webp') center center / cover no-repeat,
      #000;
    filter: brightness(1.18) saturate(1.12);
  }
  .play > :not(.play-bg) {
    position: relative;
    z-index: 1;
  }
}
@media (min-width: 901px) {
  .play-bg {
    display: block;
    position: fixed;
    /* высоту фиксируем к большому вьюпорту, чтобы при скрытии адресной
       строки на телефоне фон не «зумился» (cover не пересчитывался) */
    top: 0;
    left: 0;
    right: 0;
    bottom: auto;
    height: 100vh;
    height: 100lvh;
    z-index: 0;
    pointer-events: none;
    background:
      linear-gradient(90deg, #000 0%, rgba(0, 0, 0, 0) 5%, rgba(0, 0, 0, 0) 95%, #000 100%),
      linear-gradient(0deg, #000 0%, rgba(0, 0, 0, 0) 4%, rgba(0, 0, 0, 0) 96%, #000 100%),
      radial-gradient(115% 100% at 50% 50%,
        rgba(0, 0, 0, 0.72) 0%,
        rgba(0, 0, 0, 0.5) 42%,
        rgba(0, 0, 0, 0.12) 72%,
        rgba(0, 0, 0, 0) 100%),
      url('/play-bg-wings.webp') center center / cover no-repeat;
    /* края ярче: светлит только золото, чёрные слои остаются чёрными */
    filter: brightness(1.2) saturate(1.14);
  }
  /* Весь контент страницы — над фон-слоём */
  .play > :not(.play-bg) {
    position: relative;
    z-index: 1;
  }
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
  justify-content: flex-end;
  gap: 8px;
  min-height: 210px;
  padding: 26px 18px 22px;
  border-radius: 18px;
  overflow: hidden;
  cursor: pointer;
  text-align: center;
  color: #fff;
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.2s ease, border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
}
.pw:hover { transform: translateY(-3px); }
/* контент карточки — над фото-слоем (бейдж позиционируется отдельно) */
.pw > :not(.pw__photo):not(.pw__tag) { position: relative; z-index: 1; }
/* Фото-слой карточки: картинка целиком по центру (contain, уменьшено),
   затемнение снизу под текст. Источник — по пути. */
.pw__photo {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  transition: transform 0.4s ease;
}
.pw--kids .pw__photo {
  background-image:
    linear-gradient(to top, rgba(0, 0, 0, 0.9) 1%, rgba(0, 0, 0, 0.35) 30%, transparent 62%),
    url('/play-detail-bg.webp');
  background-repeat: no-repeat;
  background-position: center, center 42%;
  background-size: auto, auto 108%;
}
.pw--students .pw__photo {
  background-image:
    linear-gradient(to top, rgba(0, 0, 0, 0.9) 1%, rgba(0, 0, 0, 0.35) 30%, transparent 62%),
    url('/play-students-card.webp');
  background-repeat: no-repeat;
  background-position: center, center 42%;
  background-size: auto, auto 112%;
}
.pw--clubs .pw__photo {
  background-image:
    linear-gradient(to top, rgba(0, 0, 0, 0.9) 1%, rgba(0, 0, 0, 0.35) 30%, transparent 62%),
    url('/play-clubs-card.webp');
  background-repeat: no-repeat;
  background-position: center, center 46%;
  background-size: auto, auto 88%;
}
.pw--kids:hover .pw__photo,
.pw--students:hover .pw__photo,
.pw--clubs:hover .pw__photo { transform: scale(1.04); }
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
  bottom: 10px;
  right: 10px;
  z-index: 2;
  padding: 3px 9px;
  border-radius: 999px;
  font-size: 0.56rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #1a1206;
  background: linear-gradient(145deg, #e6c866, #c9a84c);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.45);
}
/* Акценты путей */
.pw--kids.is-active { border-color: rgba(230, 200, 102, 0.75); background: radial-gradient(130% 100% at 50% 0%, rgba(201, 168, 76, 0.18), transparent 60%), rgba(255, 255, 255, 0.03); box-shadow: 0 16px 36px -18px rgba(201, 168, 76, 0.6); }
.pw--students.is-active { border-color: rgba(150, 170, 215, 0.75); background: radial-gradient(130% 100% at 50% 0%, rgba(150, 170, 215, 0.18), transparent 60%), rgba(255, 255, 255, 0.03); box-shadow: 0 16px 36px -18px rgba(150, 170, 215, 0.55); }
.pw--clubs.is-active { border-color: rgba(58, 144, 200, 0.75); background: radial-gradient(130% 100% at 50% 0%, rgba(58, 144, 200, 0.18), transparent 60%), rgba(255, 255, 255, 0.03); box-shadow: 0 16px 36px -18px rgba(58, 144, 200, 0.55); }
/* Приоритеты — лёгкая золотая рамка даже в покое */
.pw--priority { border-color: rgba(201, 168, 76, 0.4); }

/* ===== Шаг 2: панель пути — стеклянная, с бликами ===== */
.panel {
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  scroll-margin-top: 90px;
  border-radius: 24px;
  overflow: hidden;
  isolation: isolate;
  border: 1px solid rgba(255, 255, 255, 0.14);
  /* матовое стекло */
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.015) 38%, rgba(255, 255, 255, 0.045) 100%);
  -webkit-backdrop-filter: blur(16px) saturate(125%);
  backdrop-filter: blur(16px) saturate(125%);
  /* внутренний светлый кант сверху + мягкая тень-глубина */
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.22),
    inset 0 0 0 1px rgba(255, 255, 255, 0.04),
    0 30px 70px -30px rgba(0, 0, 0, 0.8);
  transition: box-shadow 0.4s ease, border-color 0.4s ease;
}
/* Акцентный кант/свечение по выбранному пути */
.panel--kids { border-color: rgba(230, 200, 102, 0.42); box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.22), inset 0 0 0 1px rgba(201, 168, 76, 0.1), 0 30px 70px -30px rgba(0, 0, 0, 0.8), 0 0 60px -24px rgba(201, 168, 76, 0.5); }
.panel--students { border-color: rgba(150, 170, 215, 0.42); box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.22), inset 0 0 0 1px rgba(150, 170, 215, 0.1), 0 30px 70px -30px rgba(0, 0, 0, 0.8), 0 0 60px -24px rgba(150, 170, 215, 0.5); }
.panel--clubs { border-color: rgba(58, 144, 200, 0.42); box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.22), inset 0 0 0 1px rgba(58, 144, 200, 0.1), 0 30px 70px -30px rgba(0, 0, 0, 0.8), 0 0 60px -24px rgba(58, 144, 200, 0.5); }

/* Цветная подложка-градиент поверх стекла по пути */
.panel::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -2;
  pointer-events: none;
  background: radial-gradient(120% 90% at 0% 0%, rgba(201, 168, 76, 0.14), transparent 55%);
}
.panel--students::after { background: radial-gradient(120% 90% at 0% 0%, rgba(150, 170, 215, 0.16), transparent 55%); }
.panel--clubs::after { background: radial-gradient(120% 90% at 0% 0%, rgba(58, 144, 200, 0.16), transparent 55%); }

/* Блик стекла: мягкая засветка сверху-слева + узкая диагональная световая полоса */
.panel__glare {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background:
    radial-gradient(60% 50% at 18% -8%, rgba(255, 255, 255, 0.16), transparent 70%),
    linear-gradient(118deg, transparent 32%, rgba(255, 255, 255, 0.09) 44%, rgba(255, 255, 255, 0.015) 50%, transparent 58%);
}

/* Раскладка: контент слева, фото справа */
.panel__inner {
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  align-items: stretch;
}
.panel--has-media .panel__inner {
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
}
.panel__content { padding: clamp(26px, 4vw, 44px); }

/* Медиа-зона с фото игрока (crossfade по формату) */
.panel__media {
  position: relative;
  min-height: 420px;
  overflow: hidden;
}
.panel__media-glow {
  position: absolute;
  left: 50%;
  top: 56%;
  width: 78%;
  aspect-ratio: 1;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: radial-gradient(circle, rgba(201, 168, 76, 0.32), transparent 66%);
  filter: blur(8px);
  pointer-events: none;
}
.panel--students .panel__media-glow { background: radial-gradient(circle, rgba(150, 170, 215, 0.3), transparent 66%); }
.panel--clubs .panel__media-glow { background: radial-gradient(circle, rgba(58, 144, 200, 0.3), transparent 66%); }
.panel__player {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  /* contain + нижнее выравнивание: оба фото видны целиком (без обрезки)
     и «стоят» на одной нижней линии. Чуть приподняты над низом блока. */
  object-fit: contain;
  object-position: center 90%;
  opacity: 0;
  transform: scale(0.98);
  transition: opacity 0.55s ease, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
  filter: drop-shadow(0 24px 34px rgba(0, 0, 0, 0.55));
  pointer-events: none;
}
.panel__player.is-on {
  opacity: 1;
  transform: scale(1);
}
/* Tackle-фото приподнято — не прижато к самому низу */
.panel__player--tackle { object-position: center 78%; }
/* Студлига и клубы: tackle — одиночная вертикальная фигура, ограничиваем
   высоту, чтобы она не была гигантской по сравнению с широким flag-фото */
.panel--students .panel__player--tackle,
.panel--clubs .panel__player--tackle {
  inset: auto;
  left: 0;
  right: 0;
  bottom: 0;
  height: 58%;
  object-position: center bottom;
}
/* Сценовое tackle-фото (с фоном) — в аккуратной рамке-карточке внутри стекла */
.panel__player--framed {
  inset: auto;
  left: 50%;
  bottom: 7%;
  width: 90%;
  height: 66%;
  object-fit: cover;
  object-position: center;
  border-radius: 16px;
  transform: translateX(-50%) scale(0.98);
  box-shadow:
    0 22px 44px -18px rgba(0, 0, 0, 0.75),
    inset 0 0 0 1px rgba(255, 255, 255, 0.14);
}
.panel__player--framed.is-on { transform: translateX(-50%) scale(1); }

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
  position: relative;
  display: inline-flex;
  gap: 6px;
  padding: 5px;
  border-radius: 14px;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.28));
  border: 1px solid rgba(255, 255, 255, 0.12);
  /* стеклянный блик по верхнему канту контейнера */
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.14), inset 0 -8px 16px -10px rgba(0, 0, 0, 0.6);
  margin-bottom: 22px;
}
.fmt__btn {
  position: relative;
  overflow: hidden;
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
  transition: background 0.2s ease, color 0.2s ease, box-shadow 0.25s ease;
}
.fmt__btn small { font-size: 0.68rem; font-weight: 500; letter-spacing: 0.02em; opacity: 0.8; text-transform: none; }
.fmt__btn:disabled { opacity: 0.3; cursor: not-allowed; }
.fmt__btn.is-on { color: #1a1206; background: linear-gradient(145deg, #e6c866, #c9a84c); box-shadow: 0 6px 16px -6px rgba(201, 168, 76, 0.7); }
/* Глянец на активной кнопке: верхний блик + диагональный отблеск */
.fmt__btn.is-on::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.55) 0%, rgba(255, 255, 255, 0.12) 38%, transparent 56%),
    linear-gradient(118deg, transparent 40%, rgba(255, 255, 255, 0.35) 48%, transparent 56%);
  mix-blend-mode: screen;
}
.panel--students .fmt__btn.is-on { color: #101a2e; background: linear-gradient(145deg, #d2ddf6, #8498c6); box-shadow: 0 6px 16px -6px rgba(150, 170, 215, 0.7); }
.panel--clubs .fmt__btn.is-on { color: #fff; background: linear-gradient(145deg, #3a90c8, #1c5f92); box-shadow: 0 6px 16px -6px rgba(58, 144, 200, 0.7); }

.panel__meta { margin-bottom: 14px; }
.panel__meta span { font-size: 0.82rem; font-weight: 600; color: var(--color-gold-light, #e6c866); }
.panel--students .panel__meta span { color: #bcc9ec; }
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
.panel--students .panel__cta { color: #101a2e; background: linear-gradient(140deg, #d2ddf6, #8498c6); box-shadow: 0 8px 22px rgba(150, 170, 215, 0.45); }
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

/* Запись — стеклянная форма с плавающим золотисто-белым бордером */
.join { max-width: 720px; margin: 80px auto 0; }
.join__card {
  position: relative;
  border-radius: 26px;
  overflow: hidden;
  isolation: isolate;
  /* матовое стекло */
  background:
    radial-gradient(120% 100% at 50% 0%, rgba(201, 168, 76, 0.1), transparent 60%),
    linear-gradient(145deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.015) 42%, rgba(255, 255, 255, 0.04) 100%);
  -webkit-backdrop-filter: blur(18px) saturate(125%);
  backdrop-filter: blur(18px) saturate(125%);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.22),
    0 34px 80px -34px rgba(0, 0, 0, 0.85);
}
/* Плавающий золотисто-белый бордер (анимированный градиент по рамке) */
.join__card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1.5px;
  background: linear-gradient(120deg,
    rgba(255, 246, 212, 0.05) 0%,
    #e6c866 22%,
    #fff6e0 38%,
    #c9a84c 52%,
    #fff6e0 66%,
    #e6c866 80%,
    rgba(255, 246, 212, 0.05) 100%);
  background-size: 300% 300%;
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  mask-composite: exclude;
  animation: joinBorder 9s ease-in-out infinite;
  pointer-events: none;
  z-index: 1;
}
@keyframes joinBorder {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
/* Глянцевые блики с прозрачностью (эффект стекла) */
.join__glare {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background:
    radial-gradient(55% 45% at 22% -6%, rgba(255, 255, 255, 0.18), transparent 70%),
    linear-gradient(116deg, transparent 34%, rgba(255, 255, 255, 0.08) 46%, rgba(255, 255, 255, 0.015) 52%, transparent 60%);
}
.join__inner {
  position: relative;
  z-index: 2;
  padding: clamp(28px, 4vw, 48px);
  text-align: center;
}
.join__card h2 {
  margin: 0 0 12px;
  font-family: 'Oswald', sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  font-size: clamp(1.6rem, 3.5vw, 2.4rem);
  color: #fff;
}
.join__card p { margin: 0 auto 26px; max-width: 460px; font-size: 0.95rem; line-height: 1.6; }
.join__form { display: flex; flex-direction: column; gap: 12px; max-width: 460px; margin: 0 auto; text-align: left; }
.join__row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.join__field { display: flex; flex-direction: column; gap: 5px; }
.join__field > span {
  font-size: 0.66rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.45);
  padding-left: 2px;
}
.join__form input,
.join__form select,
.join__question {
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
.join__form input:focus,
.join__form select:focus,
.join__question:focus {
  outline: none;
  border-color: rgba(230, 200, 102, 0.6);
  box-shadow: 0 0 0 3px rgba(201, 168, 76, 0.16);
  background: rgba(0, 0, 0, 0.45);
}
.join__form input::placeholder,
.join__question::placeholder { color: rgba(255, 255, 255, 0.4); }
.join__form select { cursor: pointer; }
.join__question { resize: vertical; min-height: 72px; line-height: 1.5; }
/* число без стрелок-спиннеров */
.join__form input[type='number'] { -moz-appearance: textfield; appearance: textfield; }
.join__form input[type='number']::-webkit-outer-spin-button,
.join__form input[type='number']::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
.join__form button {
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
.join__form button:hover { transform: translateY(-2px); box-shadow: 0 12px 28px rgba(201, 168, 76, 0.5); }
.join__form button:disabled { opacity: 0.6; cursor: wait; transform: none; }
.join__error { margin: 10px 0 0; font-size: 0.82rem; color: #ff9b8a; text-align: center; }
.join__note { margin: 18px 0 0; font-size: 0.78rem; color: rgba(255, 255, 255, 0.35); text-align: center; }

/* Состояние «успешно отправлено» */
.join__success { display: flex; flex-direction: column; align-items: center; gap: 14px; padding: 18px 0; animation: joinSuccess 0.5s cubic-bezier(0.22, 1, 0.36, 1); }
.join__check {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  color: #1a1206;
  background: linear-gradient(145deg, #fff6d6, #e6c866 55%, #c9a84c);
  box-shadow: 0 10px 30px -8px rgba(201, 168, 76, 0.7);
  animation: joinCheckPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s both;
}
.join__success h2 { margin: 0; }
.join__success p { margin: 0; max-width: 420px; }
.join__again {
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
.join__again:hover { background: rgba(230, 200, 102, 0.12); transform: translateY(-2px); }
@keyframes joinSuccess { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
@keyframes joinCheckPop { from { opacity: 0; transform: scale(0.4); } to { opacity: 1; transform: scale(1); } }

@media (prefers-reduced-motion: reduce) {
  .join__card::before,
  .join__success,
  .join__check { animation: none; }
}

/* Планшет/мобилка: фото уходит за текст как полупрозрачный акцент в углу */
@media (max-width: 900px) {
  .panel__inner,
  .panel--has-media .panel__inner { grid-template-columns: 1fr; }
  /* списки в один столбец — чтобы фото справа не перекрывало текст */
  .panel__cols { grid-template-columns: 1fr; gap: 18px; max-width: 62%; }
  .panel__media {
    position: absolute;
    inset: auto 0 0 auto;
    width: min(66%, 380px);
    height: 82%;
    min-height: 0;
    z-index: 0;
    opacity: 0.62;
    /* фото ярче справа, мягко растворяется влево — под текстом не мешает */
    -webkit-mask-image: linear-gradient(285deg, #000 0%, #000 46%, transparent 86%);
    mask-image: linear-gradient(285deg, #000 0%, #000 46%, transparent 86%);
  }
  .panel__media-glow { display: none; }
  .panel__content { position: relative; z-index: 1; }
}

@media (max-width: 680px) {
  .selector { grid-template-columns: 1fr; gap: 12px; }
  /* Карточки-баннеры: название внизу слева на затемнении, бейдж в углу */
  .pw { align-items: flex-start; justify-content: flex-end; min-height: 130px; padding: 16px; text-align: left; gap: 2px; }
  .pw__icon { font-size: 1.7rem; }
  .pw__title { font-size: 1.2rem; }
  .pw__badge { display: none; }
  .panel__cols { grid-template-columns: 1fr; gap: 18px; max-width: 100%; }
  .join__row { grid-template-columns: 1fr; }
  /* Переключатель формата — на всю ширину, подпись под названием */
  .fmt { display: flex; width: 100%; }
  .fmt__btn { flex: 1; flex-direction: column; align-items: center; justify-content: center; gap: 2px; padding: 9px 6px; }
  .fmt__btn small { font-size: 0.6rem; }
}
</style>
