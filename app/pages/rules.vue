<script setup lang="ts">
// Правила американского футбола — досконально, для новичков.
const { locale } = useLocale()
useHead({ title: 'Правила — American Football Federation of Georgia' })

// ===== Редактор фонового фото hero (виден только по /rules?edit) =====
const route = useRoute()
const showPanel = computed(() => 'edit' in route.query)

// Параметры фона: масштаб, сдвиг X/Y, растворение краёв, затемнение слева
// Значения подобраны в редакторе и «запечены» как постоянные.
const HERO_DEFAULTS = { zoom: 77, x: 14, y: 8, fadeX: 43, fadeY: 21, dark: 98, radius: 0 }
const heroEdit = reactive({ ...HERO_DEFAULTS })

// Загрузка из localStorage отключена на время, чтобы применялись запечённые
// значения (у всех и на проде). Вернуть — раскомментировать блок ниже.
// onMounted(() => {
//   try {
//     const saved = localStorage.getItem('aff-rules-hero')
//     if (saved) Object.assign(heroEdit, HERO_DEFAULTS, JSON.parse(saved))
//   }
//   catch { /* приватный режим */ }
// })
watch(heroEdit, () => {
  try { localStorage.setItem('aff-rules-hero', JSON.stringify(heroEdit)) }
  catch { /* приватный режим */ }
}, { deep: true })

// CSS-переменные читаются из ::before/::after фона hero
const heroStyle = computed(() => ({
  '--zoom': heroEdit.zoom,
  '--tx': heroEdit.x,
  '--ty': heroEdit.y,
  '--fadeX': heroEdit.fadeX,
  '--fadeY': heroEdit.fadeY,
  '--dark': heroEdit.dark / 100,
  '--radius': heroEdit.radius,
}))
function resetHero() { Object.assign(heroEdit, HERO_DEFAULTS) }

// ===== Видео «лень читать — смотри видео» (модалка) =====
const videoOpen = ref(false)
function closeVideo() { videoOpen.value = false }
watch(videoOpen, (open) => {
  // блокируем прокрутку фона, пока открыто видео
  try { document.body.style.overflow = open ? 'hidden' : '' } catch { /* noop */ }
})
onMounted(() => {
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape') videoOpen.value = false })
})

// ===== Экипировка: кружки-метки на фото + линия к термину при наведении =====
// Координаты кружков в % от изображения (поза игрока на rules-gear.webp)
const gearPoints = [
  { id: 'helmet', x: 64, y: 13 },
  { id: 'shoulders', x: 42, y: 20 },
  { id: 'jersey', x: 53, y: 42 },
  { id: 'gloves', x: 17, y: 33 },
  { id: 'pants', x: 45, y: 57 },
  { id: 'pads', x: 33, y: 66 },
  { id: 'cleats', x: 14, y: 85 },
]
const gearGridEl = ref<HTMLElement | null>(null)
const activeGear = ref<string | null>(null)
const line = ref<{ x1: number, y1: number, x2: number, y2: number } | null>(null)
const box = reactive({ w: 0, h: 0 })
const dotRefs = new Map<string, HTMLElement>()
function setDotRef(id: string, el: unknown) { if (el) dotRefs.set(id, el as HTMLElement) }
let activeTermEl: HTMLElement | null = null

// Плавная S-кривая от термина к кружку
const linePath = computed(() => {
  if (!line.value) return ''
  const { x1, y1, x2, y2 } = line.value
  const mx = (x1 + x2) / 2
  return `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`
})

function showGear(id: string) {
  const grid = gearGridEl.value
  const dot = dotRefs.get(id)
  if (!grid || !dot) return
  activeGear.value = id
  const term = grid.querySelector<HTMLElement>(`.gear-term[data-gear="${id}"]`)
  if (activeTermEl !== term) {
    activeTermEl?.classList.remove('on')
    activeTermEl = term
    term?.classList.add('on')
  }
  const gr = grid.getBoundingClientRect()
  box.w = gr.width
  box.h = gr.height
  const dr = dot.getBoundingClientRect()
  const x2 = dr.left + dr.width / 2 - gr.left
  const y2 = dr.top + dr.height / 2 - gr.top
  let x1 = x2
  let y1 = y2
  if (term) {
    const tr = term.getBoundingClientRect()
    x1 = tr.right - gr.left
    y1 = tr.top + tr.height / 2 - gr.top
  }
  line.value = { x1, y1, x2, y2 }
}
function hideGear() {
  activeGear.value = null
  line.value = null
  activeTermEl?.classList.remove('on')
  activeTermEl = null
}

onMounted(() => {
  const grid = gearGridEl.value
  if (!grid) return
  grid.addEventListener('mouseover', (e) => {
    const el = (e.target as HTMLElement).closest<HTMLElement>('.gear-term, .gear-dot')
    if (el?.dataset.gear) showGear(el.dataset.gear)
  })
  grid.addEventListener('mouseout', (e) => {
    if ((e.target as HTMLElement).closest('.gear-term, .gear-dot')) hideGear()
  })
})

// Плавное появление текста и картинок при скролле — в обе стороны (как на /about):
// элемент проявляется при входе в экран и прячется обратно при выходе, поэтому
// анимация отыгрывает и вниз, и вверх. Включаем только при живом JS — без него
// весь контент виден сразу (SEO/fallback).
onMounted(() => {
  document.documentElement.classList.add('rules-reveal')
  const els = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries)
          e.target.classList.toggle('in', e.isIntersecting)
      },
      { threshold: 0, rootMargin: '-8% 0px -8% 0px' },
    )
    els.forEach(el => io.observe(el))
    onBeforeUnmount(() => io.disconnect())
  }
  else {
    els.forEach(el => el.classList.add('in'))
  }
})

const tr = {
  ka: {
    h1: 'ამერიკული ფეხბურთის წესები',
    lead: 'ამერიკული ფეხბურთი მხოლოდ ერთი შეხედვით ჩანს რთული. სინამდვილეში ყველაფერი ერთი მარტივი იდეის გარშემო შენდება: ოთხ მცდელობაში ბურთის წინ წაწევა და მოწინააღმდეგის ზონაში შეტანა. ქვემოთ — ყველაფერი თანმიმდევრობით, თამაშის მიზნიდან პოზიციებამდე და ჯარიმებამდე.',
    videoCta: 'გეზარება წაკითხვა? უყურე ვიდეოს',
    goalH: 'თამაშის მიზანი',
    goalP: 'მოედანზე გამოდის ორი გუნდი <strong>11 მოთამაშით</strong>. ის, ვინც ბურთს ფლობს (<strong>შეტევა</strong>), ცდილობს წინ წაწევას და მოწინააღმდეგის საგოლე ზონაში შეტანას — ეს არის <strong>ტაჩდაუნი</strong>. მეორე გუნდი (<strong>დაცვა</strong>) ცდილობს შეაჩეროს. იმარჯვებს ის, ვინც მეტ ქულას დააგროვებს ოთხ პერიოდში.',
    fieldH: 'მოედანი',
    fieldP: 'სათამაშო მოედანი — <strong>100 იარდი</strong> სიგრძეში პლუს ორი საგოლე ზონა <strong>10 იარდით</strong> თითო კიდეზე. მონიშვნა გაკეთებულია ყოველ 5 იარდზე, რომ მსაჯებმა და მოთამაშეებმა პროგრესი დაინახონ. ზონების კიდეებზე დგას <strong>კარი</strong> «П»-ს ფორმის — მათში ურტყამენ ფილდ-გოლებსა და ექსტრაპოინტებს.',
    downsH: 'დაუნების სისტემა — თამაშის გული',
    downsP1: 'შეტევას ეძლევა <strong>4 მცდელობა</strong> (დაუნი), რომ ბურთი წაწიოს მინიმუმ <strong>10 იარდით</strong>. გამოვიდა — გუნდი იღებს ახალ 4 მცდელობას (<strong>first down</strong>) და აგრძელებს შეტევას. ვერ გამოვიდა ოთხ მცდელობაში — ბურთი გადადის მოწინააღმდეგესთან ამ ადგილას.',
    downsP2: 'ამიტომ ხშირად მეოთხე მცდელობაზე გუნდი ბურთს შორს ამოარტყამს (<strong>პანტი</strong>) ან ფილდ-გოლს ურტყამს, რომ მოწინააღმდეგეს ხელსაყრელი პოზიცია არ დაუთმოს.',
    downAttempt: 'მცდელობა', downGoal: 'იარდი = ახალი ათვლა',
    scoreH: 'როგორ გროვდება ქულები',
    flowH: 'თამაშის მსვლელობა',
    flowP: 'მატჩი შედგება <strong>ოთხი მეოთხედისგან</strong>. ყოველი გათამაშება იწყება <strong>სნეპით</strong> — ცენტრი ბურთს ფეხებს შორის აწვდის კვოტერბეკს. შემდეგ გუნდი ან ბურთით გარბის (<strong>გატანა</strong>), ან <strong>პასს</strong> ათამაშებს. გათამაშება ჩერდება, როცა ბურთიანი მოთამაშე მიწაზე წააქციეს, ის მოედნიდან გავიდა ან პასი ვერ დაიჭირეს.',
    offH: 'პოზიციები · <span class="accent-red">შეტევა</span>', defH: 'პოზიციები · <span class="accent-blue">დაცვა</span>',
    specialH: '<span class="accent-mix">სპეციალური გუნდები</span>',
    special: [
      { num: '1', tag: 'K', name: 'კიკერი', body: 'ასრულებს <strong>field goal</strong>-ს (დარტყმა ტაჩდაუნის შემდეგ ან თამაშის მსვლელობისას, რომ მაინც რამდენიმე ქულა აიღოს) და <strong>kickoff</strong>-ს. უნდა შეეძლოს ფეხით ზუსტად და შესანიშნავად დარტყმა.' },
      { num: '2', tag: 'P', name: 'პანტერი', body: 'ურტყამს ბურთს <strong>პანტის</strong> დროს — ეს ხელიდან დარტყმაა. ჩვეულებრივ აკეთებენ მე-4 დაუნზე, როცა საკუთარ საგოლე ზონასთან უფრო ახლოსაა, ვიდრე მოწინააღმდეგის ზონასთან: რომ არ გარისკონ, ბურთს უბრალოდ გადასცემენ ოპონენტებს (თუმცა იმედოვნებენ, რომ შეტევას შეინარჩუნებენ).' },
      { num: '3', tag: 'KR/PR', name: 'დამბრუნებელი', body: '<strong>Kick returner / Punt returner</strong> — სწრაფი მოთამაშეები, რომლებიც ცდილობენ ბურთი რაც შეიძლება შორს დააბრუნონ.' },
    ],
    penH: 'ძირითადი დარღვევები',
    gearH: 'აღჭურვილობა',
    gearP: 'საკონტაქტო (tackle) ფეხბურთში მოთამაშე დაცულია თავიდან ფეხებამდე: <span class="gear-term" data-gear="helmet">ჩაფხუტი</span>, <span class="gear-term" data-gear="shoulders">სამხრეები</span>, <span class="gear-term" data-gear="jersey">ჯერსი</span>, <span class="gear-term" data-gear="gloves">ხელთათმანები</span>, <span class="gear-term" data-gear="pants">ბრიჯები</span>, <span class="gear-term" data-gear="pads">ბარძაყისა და მუხლის დამცავები</span>, <span class="gear-term" data-gear="cleats">ბუცები</span>. ამიტომ სრულფასოვანი tackle მოითხოვს რესურსებსა და მომზადებას — სწორედ ამის გამო დამწყებებს ხშირად უკონტაქტო ფორმატით იწყებენ.',
    compareH: 'Flag თუ Tackle?',
    flagTag: 'Flag football', flagP: 'უკონტაქტო. დაჭერის ნაცვლად მოთამაშეს წელიდან ხსნიან ლენტ-ფლაგს. მძიმე აღჭურვილობის გარეშე, უფრო უსაფრთხო და მარტივი დასაწყებად. იდეალურია ბავშვებისა და დამწყებებისთვის — სწორედ აქედან გავიდა საქართველო საერთაშორისო ასპარეზზე.',
    tackleTag: 'Tackle football', tackleP: 'სრული კონტაქტი ძალისმიერი ხერხებითა და აღჭურვილობით. კლასიკური ამერიკული ფეხბურთი, რომელსაც ტელევიზორში აჩვენებენ. მოითხოვს მომზადებას, გუნდსა და აღჭურვილობას — შემდეგი ნაბიჯი flag-ის შემდეგ.',
    cta: 'გინდა ცდა? დაიწყე თამაში',
    scoring: [
      { name: 'ტაჩდაუნი', pts: '6', desc: 'ბურთი შეტანილია მოწინააღმდეგის საგოლე ზონაში ან დაჭერილია იქ.' },
      { name: 'ექსტრაპოინტი', pts: '1', desc: 'კარში დარტყმა ტაჩდაუნის შემდეგ.' },
      { name: 'Two-point conversion', pts: '2', desc: 'ხელახალი შეტანა საგოლე ზონაში დარტყმის ნაცვლად.' },
      { name: 'ფილდ-გოლი', pts: '3', desc: 'კარში დარტყმა თამაშიდან, ბურთი გადის შტანგებს შორის.' },
      { name: 'სეიფტი', pts: '2', desc: 'ბურთიანი მოთამაშე გაჩერებულია საკუთარ საგოლე ზონაში. ქულები — მოწინააღმდეგეს.' },
    ],
    offense: [
      { num: '1', tag: 'QB', name: 'კვოტერბეკი', body: 'გუნდის ტვინიც და გულიც ერთდროულად. ის მართავს გათამაშებებს, არიგებს პასებს, აწვდის ბურთს მორბენლებს, ზოგჯერ კი თავადაც მირბის წინ. და როცა <strong>QB</strong> თავად არღვევს დაცვას და აკეთებს ტაჩდაუნს — ეს ვააუ-ა! გაქვს სულ რამდენიმე წამი, რომ გადაწყვიტო: გადააგდო, გადასცე თუ თავად გარბოდე. ვერ მოასწარი — <strong>სეკი (sack)</strong>, და რესპექტი უკვე შენ აღარ გეკუთვნის. მაგრამ QB მარტო ყველაფერს ვერ აკეთებს — აქ ჩნდებიან მისი ერთგული დამხმარეები: რანინბეკები (RB) და რესივერები (WR).' },
      { num: '6', tag: 'WR', name: 'რესივერი', body: 'ის, ვინც „იხსნება“, იჭერს პასს და შემდეგ აკეთებს ფორესტ გამპის საყვარელ საქმეს: მირბის, მირბის და კიდევ ერთხელ მირბის. მთავარია <strong>სიჩქარე და მანევრირება</strong>.' },
      { num: '3 · 4', tag: 'RB', name: 'რანინბეკი', body: 'ორი ტიპისაა. <strong>Halfback (HB, №3)</strong> — მოქნილი და სწრაფი, არღვევს ნებისმიერ ღრიჭოს. <strong>Fullback (FB, №4)</strong> — უფრო მასიური და ძლიერი, ხშირად ბლოკავს მოწინააღმდეგეებს, ზოგჯერ კი თავადაც არღვევს დაცვას.' },
      { num: '5', tag: 'TE', name: 'ტაიტ-ენდი', body: 'უნივერსალური ჯარისკაცი. შეუძლია პასის დაჭერა, ბლოკირება და დარტყმაც. ნამდვილი მულტიხელსაწყო ამფუტში.' },
      { num: '2', tag: 'OL', name: 'შეტევის ხაზი', body: '<strong>Offensive Line</strong>. თუმცა შეტევის ხაზი ჰქვია, მათთვის მთავარი კვოტერბეკის დაცვაა. ამ ხაზს ქმნიან გუნდის უდიდესი მოთამაშეები: ხშირად <strong>140+ კგ</strong>, ძლიერები, მძლავრი ხელის მარწუხით.' },
    ],
    defense: [
      { num: '1', tag: 'DL', name: 'დაცვის ხაზი', body: 'თავში დგას <strong>დაცვის ხაზი</strong>. <strong>Defensive Tackles (DT)</strong> — მსხვილი მოთამაშეები ცენტრში: არღვევენ ბლოკებს და აჩერებენ მორბენლებს. <strong>Defensive Ends (DE)</strong> — კიდეებზე, უტევენ კვოტერბეკს, ზოგჯერ ძალიან ეფექტურადაც: სეკი ტაჩდაუნზე ნაკლებად სანახაობრივი არ არის. ოპონენტების მსგავსად, ისინიც ძალიან მასიურები არიან — 130–150 კგ.' },
      { num: '2', tag: 'LB', name: 'ლაინბეკერი', body: '<strong>Middle LB (MLB)</strong> და <strong>Outside LB (OLB)</strong> ან ფარავენ რესივერებს, ან უტევენ კვოტერბეკს. სჭირდებათ კუნთებიც და სირბილთან მეგობრობაც.' },
      { num: '3', tag: 'CB', name: 'კორნერბეკი', body: 'სეკონდარი (მეორე ხაზი) — უკანასკნელი რუბეჟი დაცვის ხაზისა და ლაინბეკერების უკან; ამ მოთამაშეებს ეძახიან დი-ბექებს (<strong>DBs</strong>). კორნერბეკი — ფლანგის დამცველი, ჩვეულებრივ ყველაზე სწრაფი დი-ბექებს შორის. NFL-ის იდეალი: 40 იარდი <strong>4.4 წამში</strong>, წონა 81–86 კგ, სიმაღლე 183 სმ-დან. სიჩქარე და მოქნილობა გადამწყვეტია, მაგრამ მაღალი რესივერების გამო სიმაღლეც სულ უფრო მნიშვნელოვანი ხდება.' },
      { num: '4', tag: 'S', name: 'სეიფტი', body: 'სეიფტებს ეძახიან <strong>დაცვის კვოტერბეკებს</strong>: ისინი ცნობენ შეტევის განლაგებას და ეუბნებიან სეკონდარის, რომელი ფარვა ითამაშონ. ჩვეულებრივ ორნი არიან. <strong>სტრონგ-სეიფტი</strong> — უფრო მსხვილი, ძლიერი და ნელი, თამაშობს ტაიტ-ენდის მხარეს და ხშირად ფარავს TE-ს ან რანინბეკს. <strong>ფრი-სეიფტი (FS)</strong> — უფრო მოძრავი და მსუბუქი, დგას 12–15 იარდში, როგორც უკანასკნელი რუბეჟი გრძელი პასების წინააღმდეგ; საუკეთესოები კითხულობენ კვოტერბეკის თვალებით, საითკენ წავა ბურთი.' },
    ],
    penalties: [
      { name: 'False start', desc: 'შეტევა დაიძრა სნეპამდე. −5 იარდი.' },
      { name: 'Offside', desc: 'დამცველი გათამაშების ხაზს მიღმაა სნეპის მომენტში. −5 იარდი.' },
      { name: 'Holding', desc: 'მოწინააღმდეგის ხელით შეკავება. −10 იარდი.' },
      { name: 'Pass interference', desc: 'პასის მიღებისთვის ხელის შეშლა. ბურთი დარღვევის ადგილას.' },
      { name: 'Facemask', desc: 'ჩაფხუტის ბადეში ჩაჭიდება. −15 იარდი, საშიში.' },
    ],
  },
  ru: {
    h1: 'Правила американского футбола',
    lead: 'Американский футбол выглядит сложно только на первый взгляд. На деле всё строится вокруг одной простой идеи: за четыре попытки продвинуть мяч и занести его в зону соперника. Ниже — всё по порядку, от цели игры до позиций и штрафов.',
    videoCta: 'Лень читать? Смотри видео',
    goalH: 'Цель игры',
    goalP: 'На поле выходят две команды по <strong>11 игроков</strong>. Та, что владеет мячом (<strong>нападение</strong>), пытается продвинуть его вперёд и занести в зачётную зону соперника — это <strong>тачдаун</strong>. Другая команда (<strong>защита</strong>) старается её остановить. Побеждает тот, кто набрал больше очков за четыре периода.',
    fieldH: 'Поле',
    fieldP: 'Игровое поле — <strong>100 ярдов</strong> в длину плюс две зачётные зоны по <strong>10 ярдов</strong> с каждого края. Разметка нанесена каждые 5 ярдов, чтобы судьи и игроки видели прогресс. По краям зон стоят <strong>ворота</strong> в виде буквы «П» — через них бьют филд-голы и экстрапоинты.',
    downsH: 'Система даунов — сердце игры',
    downsP1: 'Нападению даётся <strong>4 попытки</strong> (дауна), чтобы продвинуть мяч минимум на <strong>10 ярдов</strong>. Получилось — команда получает новые 4 попытки (<strong>first down</strong>) и продолжает атаку. Не получилось за четыре попытки — мяч переходит сопернику на этом месте.',
    downsP2: 'Поэтому часто на четвёртой попытке команда выбивает мяч подальше (<strong>пант</strong>) или бьёт филд-гол, чтобы не отдать сопернику выгодную позицию.',
    downAttempt: 'попытка', downGoal: 'ярдов = новый отсчёт',
    scoreH: 'Как набираются очки',
    flowH: 'Ход игры',
    flowP: 'Матч состоит из <strong>четырёх четвертей</strong>. Каждый розыгрыш начинается со <strong>снэпа</strong> — центровой передаёт мяч квотербеку между ног. Дальше команда либо бежит с мячом (<strong>вынос</strong>), либо разыгрывает <strong>пас</strong>. Розыгрыш останавливается, когда игрока с мячом повалили на землю, он вышел за поле или пас не был пойман.',
    offH: 'Позиции · <span class="accent-red">нападение</span>', defH: 'Позиции · <span class="accent-blue">защита</span>',
    specialH: '<span class="accent-mix">Спецкоманды</span>',
    special: [
      { num: '1', tag: 'K', name: 'Kicker', body: 'Выполняет <strong>field goal</strong> (удар после тачдауна или по ходу игры, чтобы набрать хоть какие-то очки) и <strong>kickoff</strong>. Должен отлично и точно бить ногами.' },
      { num: '2', tag: 'P', name: 'Punter', body: 'Выбивает мяч при <strong>панте</strong> — это удар из рук. Обычно его делают на 4-м дауне, когда до своей зачётной зоны ближе, чем до зоны соперника: чтобы не рисковать, мяч просто отдают оппонентам (но надеются сохранить атаку за собой).' },
      { num: '3', tag: 'KR/PR', name: 'Returner', body: '<strong>Kick returner / Punt returner</strong> — быстрые игроки, которые пытаются вернуть мяч как можно дальше.' },
    ],
    penH: 'Основные нарушения',
    gearH: 'Экипировка',
    gearP: 'В контактном (tackle) футболе игрок защищён с головы до ног: <span class="gear-term" data-gear="helmet">шлем</span>, <span class="gear-term" data-gear="shoulders">наплечники</span>, <span class="gear-term" data-gear="jersey">джерси</span>, <span class="gear-term" data-gear="gloves">перчатки</span>, <span class="gear-term" data-gear="pants">бриджи</span>, <span class="gear-term" data-gear="pads">щитки на бёдра и колени</span>, <span class="gear-term" data-gear="cleats">бутсы</span>. Поэтому полноценный tackle требует ресурсов и подготовки — именно из-за этого новичков часто начинают с бесконтактного формата.',
    compareH: 'Flag или Tackle?',
    flagTag: 'Flag football', flagP: 'Бесконтактный. Вместо захвата с игрока срывают ленту-флаг с пояса. Без тяжёлой экипировки, безопаснее и проще начать. Идеален для детей и новичков — и именно с него Грузия вышла на международную арену.',
    tackleTag: 'Tackle football', tackleP: 'Полный контакт с силовыми приёмами и экипировкой. Классический американский футбол, который показывают по ТВ. Требует подготовки, команды и снаряжения — следующий шаг после flag.',
    cta: 'Хочешь попробовать? Начни играть',
    scoring: [
      { name: 'Тачдаун', pts: '6', desc: 'Мяч занесён в зачётную зону соперника или пойман там.' },
      { name: 'Экстрапоинт', pts: '1', desc: 'Удар по воротам сразу после тачдауна.' },
      { name: 'Two-point conversion', pts: '2', desc: 'Повторный занос в зачётную зону вместо удара.' },
      { name: 'Филд-гол', pts: '3', desc: 'Удар по воротам с игры, мяч проходит между штангами.' },
      { name: 'Сэйфти', pts: '2', desc: 'Игрок с мячом остановлен в своей зачётной зоне. Очки — сопернику.' },
    ],
    offense: [
      { num: '1', tag: 'QB', name: 'Квотербек', body: 'Мозг и сердце команды одновременно. Он управляет розыгрышами, отдаёт передачи, отдаёт мяч беговым, иногда даже сам убегает вперёд. И когда <strong>QB</strong> сам пробивает защиту и делает тачдаун — это вау! У тебя есть пара секунд, чтобы решить: бросать, отдать или убегать самому. Не успел — <strong>сэк (sack)</strong>, и респект от пацанов уже не тебе. Но QB не может всё сам — здесь появляются его верные помощники: раннинбеки (RB) и ресиверы (WR).' },
      { num: '6', tag: 'WR', name: 'Ресивер', body: 'Тот, кто «открывается», ловит передачу и дальше делает любимое дело Форреста Гампа: бежит, бежит и ещё раз бежит. Главное — <strong>скорость и манёвренность</strong>.' },
      { num: '3 · 4', tag: 'RB', name: 'Раннинбек', body: 'Бывает двух типов. <strong>Halfback (HB, №3)</strong> — ловкий и быстрый, прорывается через любые щели. <strong>Fullback (FB, №4)</strong> — массивнее и сильнее, часто блокирует соперников, но иногда и сам пробивает оборону.' },
      { num: '5', tag: 'TE', name: 'Тайт-энд', body: 'Универсальный солдат. Может ловить передачу, может блокировать, может выбивать. Настоящий мультитул в амфуте.' },
      { num: '2', tag: 'OL', name: 'Линия нападения', body: '<strong>Offensive Line</strong>. Хоть и называется линией нападения, для них главное — защитить квотербека. Эту линию составляют величайшие игроки команды: часто <strong>140+ кг</strong>, сильные, с мощным хватом.' },
    ],
    defense: [
      { num: '1', tag: 'DL', name: 'Линия защиты', body: 'В начале стоит <strong>линия защиты</strong>. <strong>Defensive Tackles (DT)</strong> — крупные игроки в центре: прорывают блоки и останавливают ранеров. <strong>Defensive Ends (DE)</strong> — крайние, атакуют квотербека, и порой очень ярко: сэк не менее зрелищен, чем тачдаун. Как и их оппоненты, они очень массивны — 130–150 кг.' },
      { num: '2', tag: 'LB', name: 'Лайнбекеры', body: '<strong>Middle LB (MLB)</strong> и <strong>Outside LB (OLB)</strong> либо прикрывают ресиверов, либо атакуют квотербека. Нужны и мышцы, и дружба с бегом.' },
      { num: '3', tag: 'CB', name: 'Корнербек', body: 'Секондари (вторая линия) — последний рубеж за линией и лайнбекерами; этих игроков зовут ди-беками (<strong>DBs</strong>). Корнербек — фланговый защитник, обычно самый быстрый из дибеков. Идеал по меркам НФЛ: 40 ярдов за <strong>4.4 секунды</strong>, вес 81–86 кг, рост от 183 см. Скорость и ловкость критичны, но из-за высоких ресиверов всё важнее и рост.' },
      { num: '4', tag: 'S', name: 'Сейфти', body: 'Сейфти называют <strong>квотербеками защиты</strong>: они распознают построения нападения и подсказывают секондари, какое прикрытие играть. Обычно их двое. <strong>Стронг-сейфти</strong> — крупнее, сильнее и медленнее, играет со стороны тайт-энда и чаще всего опекает TE или раннинбека. <strong>Фри-сейфти (FS)</strong> — подвижнее и легче, стоит в 12–15 ярдах как последний рубеж против длинных передач; лучшие читают по глазам квотербека, куда пойдёт мяч.' },
    ],
    penalties: [
      { name: 'False start', desc: 'Нападение двинулось до снэпа. −5 ярдов.' },
      { name: 'Offside', desc: 'Защитник за линией розыгрыша в момент снэпа. −5 ярдов.' },
      { name: 'Holding', desc: 'Удержание соперника руками. −10 ярдов.' },
      { name: 'Pass interference', desc: 'Помеха приёму паса. Мяч на место нарушения.' },
      { name: 'Facemask', desc: 'Захват за решётку шлема. −15 ярдов, опасно.' },
    ],
  },
  en: {
    h1: 'The rules of American football',
    lead: "American football only looks complex at first glance. In reality it is built around one simple idea: in four attempts, move the ball forward and carry it into the opponent's zone. Below — everything in order, from the goal of the game to positions and penalties.",
    videoCta: 'Too lazy to read? Watch the video',
    goalH: 'The goal of the game',
    goalP: "Two teams of <strong>11 players</strong> take the field. The one with the ball (<strong>offense</strong>) tries to move it forward and carry it into the opponent's end zone — that is a <strong>touchdown</strong>. The other team (<strong>defense</strong>) tries to stop them. Whoever scores more points over four periods wins.",
    fieldH: 'The field',
    fieldP: 'The playing field is <strong>100 yards</strong> long plus two end zones of <strong>10 yards</strong> each. Markings are drawn every 5 yards so referees and players can see progress. At the ends stand the <strong>goalposts</strong> — field goals and extra points are kicked through them.',
    downsH: 'The system of downs — the heart of the game',
    downsP1: 'The offense gets <strong>4 attempts</strong> (downs) to move the ball at least <strong>10 yards</strong>. Succeed — the team gets a new set of 4 attempts (<strong>first down</strong>) and continues. Fail in four — the ball goes to the opponent at that spot.',
    downsP2: 'That is why on fourth down a team often kicks the ball far away (<strong>punt</strong>) or attempts a field goal, so as not to give the opponent a good position.',
    downAttempt: 'down', downGoal: 'yards = new count',
    scoreH: 'How points are scored',
    flowH: 'Flow of the game',
    flowP: 'A match consists of <strong>four quarters</strong>. Each play starts with a <strong>snap</strong> — the center passes the ball between his legs to the quarterback. Then the team either runs with the ball (<strong>a run</strong>) or throws a <strong>pass</strong>. The play stops when the ball carrier is brought to the ground, goes out of bounds, or a pass is not caught.',
    offH: 'Positions · <span class="accent-red">offense</span>', defH: 'Positions · <span class="accent-blue">defense</span>',
    specialH: '<span class="accent-mix">Special teams</span>',
    special: [
      { num: '1', tag: 'K', name: 'Kicker', body: 'Handles the <strong>field goal</strong> (the kick after a touchdown, or during the game to grab at least a few points) and the <strong>kickoff</strong>. Must kick with his feet accurately and very well.' },
      { num: '2', tag: 'P', name: 'Punter', body: 'Kicks the ball on a <strong>punt</strong> — a kick from the hands. Usually done on 4th down, when the team is closer to its own end zone than the opponent\'s: rather than risk it, they simply hand the ball to the opponents (while hoping to keep the attack their way).' },
      { num: '3', tag: 'KR/PR', name: 'Returner', body: '<strong>Kick returner / Punt returner</strong> — fast players trying to return the ball as far as possible.' },
    ],
    penH: 'Common penalties',
    gearH: 'Equipment',
    gearP: 'In contact (tackle) football a player is protected head to toe: <span class="gear-term" data-gear="helmet">helmet</span>, <span class="gear-term" data-gear="shoulders">shoulder pads</span>, <span class="gear-term" data-gear="jersey">jersey</span>, <span class="gear-term" data-gear="gloves">gloves</span>, <span class="gear-term" data-gear="pants">pants</span>, <span class="gear-term" data-gear="pads">thigh and knee pads</span>, <span class="gear-term" data-gear="cleats">cleats</span>. That is why full tackle requires resources and preparation — which is exactly why beginners often start with the non-contact format.',
    compareH: 'Flag or Tackle?',
    flagTag: 'Flag football', flagP: "Non-contact. Instead of a tackle, a flag is pulled from the player's belt. No heavy gear, safer and simpler to start. Ideal for kids and beginners — and it is the format that took Georgia onto the international stage.",
    tackleTag: 'Tackle football', tackleP: 'Full contact with physical play and gear. The classic American football shown on TV. It requires preparation, a team and equipment — the next step after flag.',
    cta: 'Want to try? Start playing',
    scoring: [
      { name: 'Touchdown', pts: '6', desc: "The ball is carried into the opponent's end zone or caught there." },
      { name: 'Extra point', pts: '1', desc: 'A kick at the goal right after a touchdown.' },
      { name: 'Two-point conversion', pts: '2', desc: 'Carrying into the end zone again instead of a kick.' },
      { name: 'Field goal', pts: '3', desc: 'A kick from play, the ball goes between the posts.' },
      { name: 'Safety', pts: '2', desc: 'The ball carrier is stopped in his own end zone. Points go to the opponent.' },
    ],
    offense: [
      { num: '1', tag: 'QB', name: 'Quarterback', body: 'The brain and the heart of the team at once. He runs the plays, throws the passes, hands the ball to the running backs, and sometimes takes off himself. And when the <strong>QB</strong> breaks through the defense for a touchdown — that\'s a wow! You have a couple of seconds to decide: throw, hand off, or run yourself. Too slow — a <strong>sack</strong>, and the respect no longer goes to you. But the QB can\'t do it all alone — that\'s where his loyal helpers come in: the running backs (RB) and receivers (WR).' },
      { num: '6', tag: 'WR', name: 'Receiver', body: 'The one who “gets open”, catches the pass and then does Forrest Gump\'s favourite thing: running, running and running some more. <strong>Speed and agility</strong> are everything.' },
      { num: '3 · 4', tag: 'RB', name: 'Running back', body: 'Comes in two types. The <strong>Halfback (HB, №3)</strong> — nimble and fast, bursts through any gap. The <strong>Fullback (FB, №4)</strong> — bigger and stronger, often blocks opponents but sometimes breaks through the defense himself.' },
      { num: '5', tag: 'TE', name: 'Tight end', body: 'The universal soldier. He can catch a pass, block, or clear the way. A real multitool of the gridiron.' },
      { num: '2', tag: 'OL', name: 'Offensive line', body: 'Though it\'s called the offensive line, their main job is to protect the quarterback. This line is made of the biggest players on the team — often <strong>140+ kg</strong>, strong, with a powerful grip.' },
    ],
    defense: [
      { num: '1', tag: 'DL', name: 'Defensive line', body: 'At the front stands the <strong>defensive line</strong>. <strong>Defensive Tackles (DT)</strong> — big players in the middle: they break through blocks and stop the runners. <strong>Defensive Ends (DE)</strong> — on the edges, rushing the quarterback, sometimes spectacularly: a sack is no less of a show than a touchdown. Like their opponents, they are massive — 130–150 kg.' },
      { num: '2', tag: 'LB', name: 'Linebacker', body: '<strong>Middle LB (MLB)</strong> and <strong>Outside LB (OLB)</strong> either cover receivers or rush the quarterback. You need muscle — and to be good friends with running.' },
      { num: '3', tag: 'CB', name: 'Cornerback', body: 'The secondary (the second line) is the last line of defense, behind the line and the linebackers; these players are called defensive backs (<strong>DBs</strong>). The cornerback is the flank defender, usually the fastest of the DBs. The NFL ideal: 40 yards in <strong>4.4 seconds</strong>, 81–86 kg, at least 183 cm. Speed and agility are vital, but with tall receivers around, height matters more and more.' },
      { num: '4', tag: 'S', name: 'Safety', body: 'Safeties are called the <strong>quarterbacks of the defense</strong>: they read the offense\'s formations and tell the secondary which coverage to play. Usually there are two. The <strong>strong safety</strong> — bigger, stronger and slower, lines up on the tight-end side and most often covers the TE or the running back. The <strong>free safety (FS)</strong> — more mobile and lighter, stands 12–15 yards back as the last line against long passes; the best read the quarterback\'s eyes to see where the ball is going.' },
    ],
    penalties: [
      { name: 'False start', desc: 'The offense moved before the snap. −5 yards.' },
      { name: 'Offside', desc: 'A defender is past the line at the snap. −5 yards.' },
      { name: 'Holding', desc: 'Holding an opponent with the hands. −10 yards.' },
      { name: 'Pass interference', desc: 'Interfering with a pass reception. Ball at the spot of the foul.' },
      { name: 'Facemask', desc: 'Grabbing the helmet facemask. −15 yards, dangerous.' },
    ],
  },
}

const r = computed(() => tr[locale.value])
const scoring = computed(() => r.value.scoring)
const offense = computed(() => r.value.offense)
const defense = computed(() => r.value.defense)
const special = computed(() => r.value.special)
const penalties = computed(() => r.value.penalties)
</script>

<template>
  <main class="rules">
    <!-- Фон страницы (только десктоп): приглушённые золото-чёрные мазки.
         Зафиксирован к вьюпорту и сильно затемнён — не мешает чтению. -->
    <div class="rules-bg-layer" aria-hidden="true" />
    <header class="hero" :style="heroStyle">
      <div class="hero__text">
        <h1>{{ r.h1 }}</h1>
        <p class="lead">{{ r.lead }}</p>
        <button type="button" class="video-cta" @click="videoOpen = true">
          <span class="video-cta__play" aria-hidden="true" />
          {{ r.videoCta }}
        </button>
      </div>
    </header>

    <div class="wrap">
      <!-- Цель -->
      <section class="block block--goal">
        <div class="goal__text reveal reveal--left">
          <h2>{{ r.goalH }}</h2>
          <p v-html="r.goalP" />
        </div>
        <figure class="goal__media reveal reveal--right">
          <img src="/rules-goal.webp" alt="" loading="lazy" decoding="async">
        </figure>
      </section>

      <!-- Поле -->
      <section class="block">
        <h2>{{ r.fieldH }}</h2>
        <p v-html="r.fieldP" />
        <figure class="field-media reveal reveal--up">
          <img src="/rules-field.webp" alt="" loading="lazy" decoding="async">
        </figure>
      </section>

      <!-- Даунс -->
      <section class="block">
        <h2>{{ r.downsH }}</h2>
        <p v-html="r.downsP1" />
        <p v-html="r.downsP2" />
        <div class="downs">
          <div v-for="d in 4" :key="d" class="down">
            <span class="down__n">{{ d }}</span>
            <span class="down__l">{{ r.downAttempt }}</span>
          </div>
          <div class="down down--goal">
            <span class="down__n">10</span>
            <span class="down__l">{{ r.downGoal }}</span>
          </div>
        </div>

        <div class="downs-media">
          <figure class="downs-photo reveal reveal--left">
            <img src="/rules-firstdown.webp" alt="" loading="lazy" decoding="async">
          </figure>
          <figure class="downs-gear reveal reveal--right">
            <img src="/rules-downindi.webp" alt="" loading="lazy" decoding="async">
          </figure>
        </div>
      </section>

      <!-- Очки -->
      <section class="block">
        <h2>{{ r.scoreH }}</h2>
        <div class="score-table">
          <div v-for="s in scoring" :key="s.name" class="score-row">
            <span class="score-pts">{{ s.pts }}</span>
            <div class="score-info">
              <b>{{ s.name }}</b>
              <span>{{ s.desc }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Ход игры -->
      <section class="block">
        <h2>{{ r.flowH }}</h2>
        <p v-html="r.flowP" />
      </section>

      <!-- Позиции нападения -->
      <section class="block">
        <h2 v-html="r.offH" />
        <figure class="offense-media reveal reveal--up">
          <img src="/rules-offense.webp" alt="" loading="lazy" decoding="async">
        </figure>
        <div class="offense-list">
          <article v-for="p in offense" :key="p.tag" class="opos reveal reveal--up">
            <span class="opos__num">{{ p.num }}</span>
            <div class="opos__text">
              <h3 class="opos__title"><span class="opos__tag">{{ p.tag }}</span> {{ p.name }}</h3>
              <p v-html="p.body" />
            </div>
          </article>
        </div>
      </section>

      <!-- Позиции защиты -->
      <section class="block">
        <h2 v-html="r.defH" />
        <figure class="offense-media reveal reveal--up">
          <img src="/rules-defense.webp" alt="" loading="lazy" decoding="async">
        </figure>
        <div class="offense-list">
          <article v-for="p in defense" :key="p.tag" class="opos opos--def reveal reveal--up">
            <span class="opos__num">{{ p.num }}</span>
            <div class="opos__text">
              <h3 class="opos__title"><span class="opos__tag">{{ p.tag }}</span> {{ p.name }}</h3>
              <p v-html="p.body" />
            </div>
          </article>
        </div>
      </section>

      <!-- Спецкоманды -->
      <section class="block">
        <h2 v-html="r.specialH" />
        <figure class="offense-media reveal reveal--up">
          <img src="/rules-special.webp" alt="" loading="lazy" decoding="async">
        </figure>
        <div class="offense-list">
          <article v-for="p in special" :key="p.tag" class="opos opos--special reveal reveal--up">
            <span class="opos__num">{{ p.num }}</span>
            <div class="opos__text">
              <h3 class="opos__title"><span class="opos__tag">{{ p.tag }}</span> {{ p.name }}</h3>
              <p v-html="p.body" />
            </div>
          </article>
        </div>
      </section>

      <!-- Нарушения -->
      <section class="block">
        <h2>{{ r.penH }}</h2>
        <div class="pen-list">
          <div v-for="p in penalties" :key="p.name" class="pen">
            <b>{{ p.name }}</b>
            <span>{{ p.desc }}</span>
          </div>
        </div>
      </section>

      <!-- Экипировка -->
      <section class="block">
        <h2>{{ r.gearH }}</h2>
        <div ref="gearGridEl" class="gear-grid">
          <div class="gear-text reveal reveal--left">
            <p v-html="r.gearP" />
          </div>
          <figure class="gear-fig reveal reveal--right">
            <img src="/rules-gear.webp" alt="" loading="lazy" decoding="async">
            <span
              v-for="g in gearPoints"
              :key="g.id"
              :ref="(el) => setDotRef(g.id, el)"
              class="gear-dot"
              :class="{ on: activeGear === g.id }"
              :data-gear="g.id"
              :style="{ left: g.x + '%', top: g.y + '%' }"
            />
          </figure>
          <svg v-show="line" class="gear-link" :width="box.w" :height="box.h">
            <path v-if="line" :d="linePath" />
            <circle v-if="line" :cx="line.x2" :cy="line.y2" r="6" />
          </svg>
        </div>
      </section>

      <!-- Flag vs Tackle -->
      <section class="block compare">
        <h2>{{ r.compareH }}</h2>
        <div class="compare-grid">
          <div class="compare-card">
            <span class="compare-tag">{{ r.flagTag }}</span>
            <p>{{ r.flagP }}</p>
          </div>
          <div class="compare-card compare-card--tackle">
            <span class="compare-tag">{{ r.tackleTag }}</span>
            <p>{{ r.tackleP }}</p>
          </div>
        </div>
        <NuxtLink to="/play" class="cta">
          {{ r.cta }}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </NuxtLink>
      </section>
    </div>
  </main>

  <!-- Редактор фона hero (только по /rules?edit) -->
  <aside v-if="showPanel" class="hero-editor">
    <h3>Фон hero</h3>
    <label>
      <span>Масштаб <b>{{ heroEdit.zoom }}%</b></span>
      <input v-model.number="heroEdit.zoom" type="range" min="60" max="220" step="1">
    </label>
    <label>
      <span>Сдвиг ← → <b>{{ heroEdit.x }}%</b></span>
      <input v-model.number="heroEdit.x" type="range" min="-50" max="50" step="1">
    </label>
    <label>
      <span>Сдвиг ↑ ↓ <b>{{ heroEdit.y }}%</b></span>
      <input v-model.number="heroEdit.y" type="range" min="-50" max="50" step="1">
    </label>
    <label>
      <span>Растворить бока <b>{{ heroEdit.fadeX }}%</b></span>
      <input v-model.number="heroEdit.fadeX" type="range" min="0" max="48" step="1">
    </label>
    <label>
      <span>Растворить верх/низ <b>{{ heroEdit.fadeY }}%</b></span>
      <input v-model.number="heroEdit.fadeY" type="range" min="0" max="48" step="1">
    </label>
    <label>
      <span>Затемнение слева <b>{{ heroEdit.dark }}%</b></span>
      <input v-model.number="heroEdit.dark" type="range" min="0" max="100" step="1">
    </label>
    <label>
      <span>Радиус углов <b>{{ heroEdit.radius }}px</b></span>
      <input v-model.number="heroEdit.radius" type="range" min="0" max="80" step="1">
    </label>
    <button type="button" @click="resetHero">Сбросить</button>
    <code>{{ heroEdit }}</code>
  </aside>

  <!-- Модалка с обзорным видео («лень читать — смотри видео») -->
  <Teleport to="body">
    <Transition name="vmodal">
      <div v-if="videoOpen" class="video-modal" @click.self="closeVideo">
        <button class="video-modal__close" type="button" aria-label="Закрыть" @click="closeVideo">×</button>
        <div class="video-modal__frame">
          <video src="/rules-intro.mp4" controls autoplay playsinline preload="metadata" />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.rules {
  position: relative;
  background: transparent;
  color: rgba(255, 255, 255, 0.82);
  padding: clamp(120px, 14vh, 180px) clamp(20px, 6vw, 48px) 120px;
  /* выезд reveal-элементов за край не должен давать горизонтальный скролл */
  overflow-x: clip;
}
/* Фон всей страницы — только десктоп. Затемнён, чтобы текст читался. */
.rules-bg-layer { display: none; }
/* Мобилка: вертикальная версия футуристического фона (золото рамкой
   сверху/снизу), центр притушён под текст, края ярче. */
@media (max-width: 900px) {
  .rules-bg-layer {
    display: block;
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    background:
      radial-gradient(72% 56% at 50% 50%,
        rgba(0, 0, 0, 0.6) 0%,
        rgba(0, 0, 0, 0.3) 52%,
        rgba(0, 0, 0, 0) 100%),
      url('/rules-bg-futuro-v.webp') center center / cover no-repeat,
      #000;
    filter: brightness(1.18) saturate(1.12);
  }
  .rules > :not(.rules-bg-layer) {
    position: relative;
    z-index: 1;
  }
}
@media (min-width: 901px) {
  .rules-bg-layer {
    display: block;
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    /* Порядок слоёв сверху вниз: растворение левого/правого края в чёрный,
       растворение верхнего/нижнего края, лёгкое затемнение, само фото.
       Края фото уходят в чистый #000 — швов на кромке экрана не видно.
       Фон тёмный техно (золотые линии + карбон-сетка) — читаемость высокая,
       затемнение слабое, чтобы золотые акценты оставались видны. */
    background:
      linear-gradient(90deg, #000 0%, rgba(0, 0, 0, 0) 5%, rgba(0, 0, 0, 0) 95%, #000 100%),
      linear-gradient(0deg, #000 0%, rgba(0, 0, 0, 0) 4%, rgba(0, 0, 0, 0) 96%, #000 100%),
      radial-gradient(110% 95% at 50% 50%,
        rgba(0, 0, 0, 0.42) 0%,
        rgba(0, 0, 0, 0.26) 48%,
        rgba(0, 0, 0, 0) 100%),
      url('/rules-bg-futuro.webp') center center / cover no-repeat;
    /* края ярче: светлит только золото, чёрные слои остаются чёрными */
    filter: brightness(1.2) saturate(1.14);
  }
  /* Весь контент страницы — над фоновым слоем */
  .rules > :not(.rules-bg-layer) {
    position: relative;
    z-index: 1;
  }
}

/* Hero с фоновым фото: доска слева (под текст) + мяч справа.
   Края фото растворяются в фон по всем сторонам — без швов. */
.hero {
  position: relative;
  max-width: 1100px;
  min-height: 300px;
  display: flex;
  align-items: center;
  margin: 0 auto 56px;
  padding: clamp(48px, 8vw, 96px) clamp(24px, 6vw, 56px);
  overflow: hidden;
}
/* Фото — отдельный блок размером с само изображение (ширина = масштаб,
   высота по пропорциям). Растворение краёв и радиус углов применяются к
   самому фото, поэтому шва по краю нет при любом масштабе. */
.hero::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 0;
  width: calc(var(--zoom, 100) * 1%);
  aspect-ratio: 1600 / 1066;
  transform: translate(calc(-50% + var(--tx, 10) * 1%), calc(-50% + var(--ty, 0) * 1%));
  background: url('/rules-hero.webp') center center / cover no-repeat;
  border-radius: calc(var(--radius, 0) * 1px);
  /* Растворение краёв фото по обеим осям — глубина из редактора */
  -webkit-mask:
    linear-gradient(90deg, transparent 0%, #000 calc(var(--fadeX, 15) * 1%), #000 calc(100% - var(--fadeX, 15) * 1%), transparent 100%),
    linear-gradient(180deg, transparent 0%, #000 calc(var(--fadeY, 14) * 1%), #000 calc(100% - var(--fadeY, 14) * 1%), transparent 100%);
  -webkit-mask-composite: source-in;
  mask:
    linear-gradient(90deg, transparent 0%, #000 calc(var(--fadeX, 15) * 1%), #000 calc(100% - var(--fadeX, 15) * 1%), transparent 100%),
    linear-gradient(180deg, transparent 0%, #000 calc(var(--fadeY, 14) * 1%), #000 calc(100% - var(--fadeY, 14) * 1%), transparent 100%);
  mask-composite: intersect;
}
/* Затемнение слева — читаемость текста на доске; справа мяч остаётся ярким */
.hero::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(90deg,
    rgba(0, 0, 0, var(--dark, 0.82)) 0%,
    rgba(0, 0, 0, calc(var(--dark, 0.82) * 0.67)) 34%,
    rgba(0, 0, 0, 0.18) 62%,
    transparent 100%);
}
.hero__text {
  position: relative;
  z-index: 2;
  max-width: 540px;
}
.hero h1 {
  margin: 0 0 24px;
  font-family: 'Oswald', sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  /* line-height и нижний отступ с запасом: при background-clip:text фон
     обрезается по рамке элемента, и у грузинских букв с нижними выносами
     (ვ, უ, ფ…) хвосты срезались при тесной строке */
  line-height: 1.16;
  padding-bottom: 0.12em;
  font-size: clamp(2rem, 5vw, 3.6rem);
  background: linear-gradient(180deg, #fff6d4 0%, #e9c25a 55%, #c9a84c 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.lead { font-size: clamp(1.05rem, 2vw, 1.25rem); line-height: 1.6; color: rgba(255, 255, 255, 0.9); }

/* Кнопка «лень читать — смотри видео» */
.video-cta {
  display: inline-flex;
  align-items: center;
  gap: 11px;
  margin-top: 22px;
  padding: 11px 22px 11px 14px;
  border-radius: 999px;
  border: 1.5px solid rgba(230, 200, 102, 0.6);
  background: rgba(201, 168, 76, 0.12);
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
  color: var(--color-gold-light, #e6c866);
  font-family: 'Oswald', sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  cursor: pointer;
  transition: transform 0.2s ease, background 0.25s ease, color 0.2s ease, box-shadow 0.25s ease;
}
.video-cta__play {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: linear-gradient(145deg, #e6c866, #c9a84c);
}
.video-cta__play::before {
  content: "";
  width: 0;
  height: 0;
  margin-left: 2px;
  border-left: 8px solid #1a1206;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
}
.video-cta:hover {
  transform: translateY(-2px);
  color: #1a1206;
  background: linear-gradient(145deg, #e6c866, #c9a84c);
  box-shadow: 0 12px 28px -10px rgba(201, 168, 76, 0.7);
}
.video-cta:hover .video-cta__play { background: #1a1206; }
.video-cta:hover .video-cta__play::before { border-left-color: #e6c866; }

/* ===== Модалка с видео ===== */
.video-modal {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(16px, 4vw, 40px);
  background: rgba(0, 0, 0, 0.86);
  -webkit-backdrop-filter: blur(6px);
  backdrop-filter: blur(6px);
}
.video-modal__frame {
  width: min(980px, 100%);
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 40px 90px rgba(0, 0, 0, 0.75);
  border: 1px solid rgba(201, 168, 76, 0.4);
}
.video-modal__frame video {
  width: 100%;
  display: block;
  aspect-ratio: 16 / 9;
  background: #000;
}
.video-modal__close {
  position: absolute;
  top: clamp(12px, 3vw, 24px);
  right: clamp(14px, 3vw, 28px);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 1.6rem;
  line-height: 1;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
}
.video-modal__close:hover { background: rgba(201, 168, 76, 0.3); transform: rotate(90deg); }
.vmodal-enter-active,
.vmodal-leave-active { transition: opacity 0.3s ease; }
.vmodal-enter-from,
.vmodal-leave-to { opacity: 0; }

/* Компактный мобильный блок перенесён в конец scoped-стилей (после базовых
   правил компонентов), иначе базовые правила перебивали его по порядку. */

/* Уважаем «меньше движения» — показываем сразу, без анимации */
@media (prefers-reduced-motion: reduce) {
  .rules-reveal .reveal {
    opacity: 1 !important;
    transform: none !important;
    filter: none !important;
    transition: none !important;
  }
}

.wrap { max-width: 860px; margin: 0 auto; }
.block { margin: 48px 0; }
.block h2 {
  margin: 0 0 18px;
  font-family: 'Oswald', sans-serif;
  font-weight: 600;
  text-transform: uppercase;
  font-size: clamp(1.4rem, 3vw, 2rem);
  color: #fff;
}
.block h2::before {
  content: "";
  display: block;
  width: 48px; height: 3px;
  margin-bottom: 16px;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--color-gold-light, #e6c866), transparent);
}
.block p { margin: 0 0 14px; font-size: 1rem; line-height: 1.72; }
.block strong { color: #fff; font-weight: 600; }

/* Блок «Цель игры»: текст + иллюстрация рядом */
.block--goal {
  display: grid;
  grid-template-columns: 0.85fr 1.2fr;
  gap: clamp(20px, 3vw, 40px);
  align-items: center;
}
.goal__text { min-width: 0; }
.goal__text p { margin-bottom: 0; }
/* Иллюстрация без рамки: края растворяются в фон, зелёный приглушён
   тёплой дуотон-тонировкой под золото/темноту сайта */
.goal__media {
  position: relative;
  margin: 0;
  -webkit-mask:
    linear-gradient(90deg, transparent 0%, #000 15%, #000 85%, transparent 100%),
    linear-gradient(180deg, transparent 0%, #000 13%, #000 87%, transparent 100%);
  -webkit-mask-composite: source-in;
  mask:
    linear-gradient(90deg, transparent 0%, #000 15%, #000 85%, transparent 100%),
    linear-gradient(180deg, transparent 0%, #000 13%, #000 87%, transparent 100%);
  mask-composite: intersect;
}
.goal__media img {
  width: 100%;
  height: auto;
  display: block;
  /* приглушаем кислотный зелёный, добавляем тепло */
  filter: saturate(0.72) brightness(0.9) contrast(1.05) sepia(0.22);
}
/* Тёплая дуотон-тонировка + затемнение по углам поверх картинки */
.goal__media::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(120% 120% at 50% 45%, transparent 40%, rgba(0, 0, 0, 0.55) 100%),
    linear-gradient(135deg, rgba(230, 200, 102, 0.3), rgba(12, 9, 4, 0.25) 55%, rgba(0, 0, 0, 0.45));
  mix-blend-mode: soft-light;
}

/* ===== Reveal по скроллу: текст слева, картинка справа — плавно навстречу.
   Крупный выезд + лёгкое размытие на старте для «кино»-ощущения. ===== */
.rules-reveal .reveal {
  opacity: 0;
  filter: blur(8px);
  transition:
    opacity 1.2s ease,
    transform 1.4s cubic-bezier(0.16, 1, 0.3, 1),
    filter 1.2s ease;
  will-change: opacity, transform, filter;
}
.rules-reveal .reveal--left { transform: translateX(-120px); }
.rules-reveal .reveal--right { transform: translateX(120px) scale(0.9); }
.rules-reveal .reveal--up { transform: translateY(90px) scale(0.96); }
.rules-reveal .reveal.in { opacity: 1; filter: blur(0); transform: none; }

/* Фото поля: края растворены в фон, зелёный приглушён тёплой тонировкой
   (тот же приём, что у иллюстрации «Цель игры») */
.field-media {
  position: relative;
  margin: 26px 0 0;
  -webkit-mask:
    linear-gradient(90deg, transparent 0%, #000 13%, #000 87%, transparent 100%),
    linear-gradient(180deg, transparent 0%, #000 12%, #000 88%, transparent 100%);
  -webkit-mask-composite: source-in;
  mask:
    linear-gradient(90deg, transparent 0%, #000 13%, #000 87%, transparent 100%),
    linear-gradient(180deg, transparent 0%, #000 12%, #000 88%, transparent 100%);
  mask-composite: intersect;
}
.field-media img {
  width: 100%;
  height: auto;
  display: block;
  filter: saturate(0.72) brightness(0.9) contrast(1.05) sepia(0.22);
}
.field-media::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(120% 120% at 50% 45%, transparent 42%, rgba(0, 0, 0, 0.55) 100%),
    linear-gradient(135deg, rgba(230, 200, 102, 0.3), rgba(12, 9, 4, 0.25) 55%, rgba(0, 0, 0, 0.45));
  mix-blend-mode: soft-light;
}

/* Система даунов: фото судьи слева + индикаторы справа */
.downs-media {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(24px, 5vw, 60px);
  align-items: center;
  justify-items: center;
  margin-top: 40px;
}
/* Фото судьи со знаком — растворённые края + тёплый дуотон, как у остальных */
.downs-photo {
  position: relative;
  margin: 0;
  max-width: 320px;
  border-radius: 16px;
  overflow: hidden;
  -webkit-mask: radial-gradient(130% 130% at 50% 50%, #000 58%, transparent 100%);
  mask: radial-gradient(130% 130% at 50% 50%, #000 58%, transparent 100%);
}
.downs-photo img {
  width: 100%;
  height: auto;
  display: block;
  filter: saturate(0.74) brightness(0.92) contrast(1.05) sepia(0.2);
}
.downs-photo::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(120% 120% at 50% 45%, transparent 45%, rgba(0, 0, 0, 0.5) 100%),
    linear-gradient(135deg, rgba(230, 200, 102, 0.28), rgba(12, 9, 4, 0.22) 55%, rgba(0, 0, 0, 0.4));
  mix-blend-mode: soft-light;
}
/* Индикаторы — прозрачный PNG на тёмном фоне, с мягкой тенью и золотым ореолом */
.downs-gear {
  position: relative;
  margin: 0;
  display: flex;
  justify-content: center;
}
.downs-gear::before {
  content: "";
  position: absolute;
  inset: 8% 10%;
  z-index: 0;
  border-radius: 50%;
  background: radial-gradient(circle at 50% 46%, rgba(230, 200, 102, 0.22), transparent 66%);
  filter: blur(20px);
  pointer-events: none;
}
.downs-gear img {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 300px;
  height: auto;
  display: block;
  filter: drop-shadow(0 22px 34px rgba(0, 0, 0, 0.6));
}

/* ===== Позиции · нападение: схема формации + блоки позиций ===== */
.offense-media {
  position: relative;
  margin: 8px 0 44px;
  -webkit-mask:
    linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%),
    linear-gradient(180deg, transparent 0%, #000 6%, #000 94%, transparent 100%);
  -webkit-mask-composite: source-in;
  mask:
    linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%),
    linear-gradient(180deg, transparent 0%, #000 6%, #000 94%, transparent 100%);
  mask-composite: intersect;
}
.offense-media img {
  width: 100%;
  height: auto;
  display: block;
  filter: saturate(0.9) brightness(0.96) contrast(1.03);
}
.offense-media::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(120% 120% at 50% 42%, transparent 55%, rgba(0, 0, 0, 0.42) 100%);
}

.offense-list { display: flex; flex-direction: column; gap: 30px; }
.opos {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 20px;
  align-items: start;
}
/* Номер позиции — красный «кружок» в цвет меток на схеме */
.opos__num {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 46px;
  height: 46px;
  padding: 0 13px;
  border-radius: 999px;
  font-family: 'Oswald', sans-serif;
  font-weight: 700;
  font-size: 1.2rem;
  white-space: nowrap;
  color: #fff;
  background: radial-gradient(circle at 50% 34%, #e8392b, #ad1a12);
  box-shadow: 0 7px 18px -5px rgba(226, 59, 46, 0.65), inset 0 1px 0 rgba(255, 255, 255, 0.32);
}
.opos__title {
  margin: 6px 0 10px;
  display: flex;
  align-items: center;
  gap: 11px;
  font-family: 'Oswald', sans-serif;
  font-weight: 600;
  font-size: clamp(1.12rem, 2.2vw, 1.42rem);
  text-transform: uppercase;
  letter-spacing: 0.01em;
  color: #fff;
}
.opos__tag {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 7px;
  font-size: 0.8em;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: #1a1206;
  background: linear-gradient(145deg, #e6c866, #c9a84c);
}
.opos__text p { margin: 0; font-size: 1rem; line-height: 1.74; color: rgba(255, 255, 255, 0.82); }
.opos__text :deep(strong) { color: #fff; font-weight: 600; }

/* Защита — те же блоки позиций, но в синих цветах */
.opos--def .opos__num {
  background: radial-gradient(circle at 50% 34%, #3fa3e4, #1a5f92);
  box-shadow: 0 7px 18px -5px rgba(58, 144, 200, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.3);
}
.opos--def .opos__tag {
  color: #fff;
  background: linear-gradient(145deg, #3a90c8, #1c5f92);
}
/* Спецкоманды — микс цветов нападения и защиты (красный → синий) */
.opos--special .opos__num {
  background: linear-gradient(140deg, #e8392b 0%, #7b3f9e 52%, #1a5f92 100%);
  box-shadow: 0 7px 18px -5px rgba(123, 63, 158, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.3);
}
.opos--special .opos__tag {
  color: #fff;
  background: linear-gradient(140deg, #d8342b, #4a5fb0 55%, #1c5f92);
}

/* ===== Экипировка: интерактивная схема (фото + кружки + линия к термину) ===== */
.gear-grid {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 0.9fr;
  gap: clamp(18px, 3vw, 40px);
  align-items: center;
  margin-top: 8px;
}
.gear-text p { margin: 0; font-size: 1.02rem; line-height: 1.85; color: rgba(255, 255, 255, 0.82); }
.gear-fig { position: relative; margin: 0; }
.gear-fig img {
  width: 100%;
  height: auto;
  display: block;
  filter: drop-shadow(0 22px 44px rgba(0, 0, 0, 0.55));
}
/* Кружки-метки — закреплены на фото (позиция в %) */
.gear-dot {
  position: absolute;
  width: 20px;
  height: 20px;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  border: 2px solid var(--color-gold-light, #e6c866);
  background: rgba(201, 168, 76, 0.18);
  box-shadow: 0 0 0 4px rgba(230, 200, 102, 0.1), 0 2px 8px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  transition: transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
  z-index: 3;
}
.gear-dot::after {
  content: "";
  position: absolute;
  inset: 4px;
  border-radius: 50%;
  background: var(--color-gold-light, #e6c866);
  opacity: 0.55;
  transition: opacity 0.2s ease;
}
.gear-dot:hover,
.gear-dot.on {
  transform: translate(-50%, -50%) scale(1.35);
  background: rgba(230, 200, 102, 0.4);
  box-shadow: 0 0 0 6px rgba(230, 200, 102, 0.22), 0 0 16px rgba(230, 200, 102, 0.7);
}
.gear-dot.on::after { opacity: 1; }
/* Линия термин → кружок (SVG поверх) */
.gear-link { position: absolute; inset: 0; pointer-events: none; z-index: 4; overflow: visible; }
.gear-link path {
  fill: none;
  stroke: var(--color-gold-light, #e6c866);
  stroke-width: 2;
  stroke-dasharray: 5 4;
  filter: drop-shadow(0 0 4px rgba(230, 200, 102, 0.6));
}
.gear-link circle { fill: var(--color-gold-light, #e6c866); filter: drop-shadow(0 0 5px rgba(230, 200, 102, 0.8)); }

/* На телефоне — колонкой (фото под текстом); наведение недоступно, но метки видны */
@media (max-width: 760px) {
  .gear-grid { grid-template-columns: 1fr; gap: 14px; }
  .gear-fig { max-width: 82%; margin: 6px auto 0; }
}
/* Стили акцентных слов в заголовках (.accent-red / .accent-blue) — в не-scoped
   блоке ниже, т.к. они приходят из v-html */

/* Лёгкий каскад появления блоков позиций */
.rules-reveal .offense-list .opos:nth-child(2) { transition-delay: 0.08s; }
.rules-reveal .offense-list .opos:nth-child(3) { transition-delay: 0.16s; }
.rules-reveal .offense-list .opos:nth-child(4) { transition-delay: 0.24s; }
.rules-reveal .offense-list .opos:nth-child(5) { transition-delay: 0.32s; }

/* Даунс */
.downs { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 22px; }
.down {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  min-width: 92px;
  padding: 16px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
.down--goal {
  flex: 1;
  border-color: rgba(201, 168, 76, 0.4);
  background: rgba(201, 168, 76, 0.07);
}
.down__n {
  font-family: 'Oswald', sans-serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--color-gold-light, #e6c866);
}
.down__l { font-size: 0.75rem; color: rgba(255, 255, 255, 0.55); text-align: center; }

/* Таблица очков */
.score-table { display: flex; flex-direction: column; gap: 8px; }
.score-row {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 14px 18px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.07);
}
.score-pts {
  flex-shrink: 0;
  width: 48px;
  text-align: center;
  font-family: 'Oswald', sans-serif;
  font-size: 1.7rem;
  font-weight: 700;
  background: linear-gradient(180deg, #fff6d4, #e6c866, #c9a84c);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.score-info { display: flex; flex-direction: column; gap: 2px; }
.score-info b { color: #fff; font-size: 1rem; }
.score-info span { font-size: 0.85rem; color: rgba(255, 255, 255, 0.55); }

/* Нарушения */
.pen-list { display: flex; flex-direction: column; gap: 8px; }
.pen {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 4px 14px;
  padding: 13px 18px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.025);
  border-left: 3px solid rgba(220, 90, 70, 0.6);
}
.pen b { color: #fff; font-size: 0.95rem; }
.pen span { font-size: 0.85rem; color: rgba(255, 255, 255, 0.55); }

/* Сравнение */
.compare-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 14px; }
.compare-card {
  padding: 24px;
  border-radius: 16px;
  background: radial-gradient(130% 100% at 0% 0%, rgba(201, 168, 76, 0.1), transparent 55%), rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(201, 168, 76, 0.3);
}
.compare-card--tackle {
  background: radial-gradient(130% 100% at 0% 0%, rgba(58, 144, 200, 0.12), transparent 55%), rgba(255, 255, 255, 0.02);
  border-color: rgba(58, 144, 200, 0.35);
}
.compare-tag {
  display: inline-block;
  margin-bottom: 12px;
  font-family: 'Oswald', sans-serif;
  font-size: 0.95rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #fff;
}
.compare-card p { margin: 0; font-size: 0.92rem; line-height: 1.6; }

.cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 28px;
  padding: 14px 26px;
  border-radius: 999px;
  font-family: 'Oswald', sans-serif;
  font-weight: 600;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: #1a1206;
  text-decoration: none;
  background: linear-gradient(100deg, #9a7a2e, #e6c866 40%, #fff6d6 50%, #e6c866 60%, #9a7a2e);
  box-shadow: 0 8px 24px rgba(201, 168, 76, 0.4);
  transition: transform 0.2s ease;
}
.cta:hover { transform: translateY(-2px); }
.cta svg { width: 16px; height: 16px; }

/* ===== Редактор фона hero (только по ?edit) ===== */
.hero-editor {
  position: fixed;
  right: 16px;
  bottom: 16px;
  z-index: 100;
  width: 270px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px;
  border-radius: 14px;
  background: rgba(12, 12, 14, 0.92);
  border: 1px solid rgba(201, 168, 76, 0.4);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  color: #fff;
  font-family: 'Oswald', sans-serif;
}
.hero-editor h3 {
  margin: 0;
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-gold-light, #e6c866);
}
.hero-editor label { display: flex; flex-direction: column; gap: 5px; }
.hero-editor label span {
  display: flex;
  justify-content: space-between;
  font-size: 0.74rem;
  color: rgba(255, 255, 255, 0.75);
}
.hero-editor label b { color: var(--color-gold-light, #e6c866); font-weight: 600; }
.hero-editor input[type="range"] { width: 100%; accent-color: #c9a84c; cursor: pointer; }
.hero-editor button {
  margin-top: 2px;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid rgba(201, 168, 76, 0.5);
  background: rgba(201, 168, 76, 0.14);
  color: #e6c866;
  font-family: 'Oswald', sans-serif;
  font-size: 0.78rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  cursor: pointer;
}
.hero-editor button:hover { background: rgba(201, 168, 76, 0.26); }
.hero-editor code {
  font-size: 0.64rem;
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.45);
  word-break: break-all;
  font-family: ui-monospace, monospace;
}

/* ===== Компактный адаптив (в конце — перебивает базовые правила) ===== */
@media (max-width: 760px) {
  .rules { padding: clamp(88px, 13vh, 110px) 16px 64px; }

  /* Hero */
  .hero { min-height: 300px; padding: 30px 18px; }
  .hero h1 { font-size: clamp(1.7rem, 7.6vw, 2.2rem); margin-bottom: 14px; }
  .lead { font-size: 0.98rem; line-height: 1.5; }
  /* На телефоне фото (доска + мел + мяч) заполняет весь hero как фон-баннер:
     отменяем «масштаб/сдвиг/растворение» из редактора (они под десктоп) и
     делаем cover с мягкими краями. Мяч справа — позицию чуть правее центра. */
  .hero::before {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    aspect-ratio: auto;
    transform: none;
    background: url('/rules-hero.webp') center center / contain no-repeat;
    -webkit-mask:
      linear-gradient(90deg, transparent 0%, #000 7%, #000 93%, transparent 100%),
      linear-gradient(180deg, transparent 0%, #000 6%, #000 94%, transparent 100%);
    -webkit-mask-composite: source-in;
    mask:
      linear-gradient(90deg, transparent 0%, #000 7%, #000 93%, transparent 100%),
      linear-gradient(180deg, transparent 0%, #000 6%, #000 94%, transparent 100%);
    mask-composite: intersect;
  }
  /* Затемнение умеренное — фото проступает, текст читается за счёт тени ниже */
  .hero::after {
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.74) 0%, rgba(0, 0, 0, 0.5) 42%, rgba(0, 0, 0, 0.46) 66%, rgba(0, 0, 0, 0.78) 100%);
  }
  .hero__text { max-width: none; }
  /* Читаемость поверх фото */
  .hero .lead { text-shadow: 0 2px 10px rgba(0, 0, 0, 0.92), 0 1px 3px rgba(0, 0, 0, 0.9); }
  .video-cta { margin-top: 16px; font-size: 0.8rem; padding: 9px 16px 9px 11px; }

  /* Меньше воздуха, компактнее текст */
  .block { margin: 32px 0; }
  .block h2 { font-size: clamp(1.3rem, 5.6vw, 1.65rem); margin-bottom: 12px; }
  .block h2::before { width: 40px; margin-bottom: 12px; }
  .block p { font-size: 0.92rem; line-height: 1.6; margin-bottom: 10px; }

  /* Позиции — фото на всю ширину, блоки плотнее */
  .offense-media { margin: 4px 0 22px; }
  .offense-list { gap: 20px; }
  .opos { gap: 12px; }
  .opos__num { min-width: 38px; height: 38px; font-size: 1rem; padding: 0 9px; }
  .opos__title { font-size: 1.04rem; margin: 2px 0 6px; gap: 8px; }
  .opos__tag { padding: 2px 8px; }
  .opos__text p { font-size: 0.92rem; line-height: 1.62; }

  /* Цель игры — колонкой */
  .block--goal { grid-template-columns: 1fr; gap: 14px; }
  .goal__text p { margin-bottom: 0; }

  /* Система даунов — судья и индикаторы стоят в один ряд, фото компактнее */
  .downs-media { grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 24px; align-items: center; justify-items: center; }
  .downs-photo { max-width: 100%; }
  .downs-gear img { max-width: 100%; }
  /* На мобиле плитки-цифры (1–4 и 10) убираем — суть объяснена текстом выше;
     оставляем только фото (судья с маркером + индикаторы) */
  .downs { display: none; }

  /* Поле */
  .field-media { margin-top: 16px; }

  /* Очки / нарушения / сравнение */
  .score-row { padding: 11px 14px; gap: 14px; }
  .score-pts { width: 40px; font-size: 1.4rem; }
  .score-info b { font-size: 0.95rem; }
  .pen { padding: 11px 14px; }
  .compare-grid { grid-template-columns: 1fr; gap: 12px; }
  .compare-card { padding: 18px; }
  .cta { margin-top: 20px; padding: 12px 22px; }

  /* Экипировка — колонкой, фото крупнее */
  .gear-grid { grid-template-columns: 1fr; gap: 14px; }
  .gear-fig { max-width: 82%; margin: 6px auto 0; }
  .gear-text p { font-size: 0.92rem; line-height: 1.72; }

  /* reveal — всплытие снизу */
  .rules-reveal .reveal--left,
  .rules-reveal .reveal--right,
  .rules-reveal .reveal--up { transform: translateY(28px) scale(1); }
}
</style>

<!-- Не-scoped: акцентные слова в заголовках приходят из v-html и не несут
     scoped-атрибута, поэтому стилизуются глобально (с префиксом .rules) -->
<style>
.rules .accent-red,
.rules .accent-blue,
.rules .accent-mix {
  display: inline-block;
  padding-bottom: 0.08em;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.rules .accent-red {
  background-image: linear-gradient(180deg, #ffffff 0%, #ffd2cc 30%, #f0554a 62%, #d41e14 100%);
}
.rules .accent-blue {
  background-image: linear-gradient(180deg, #ffffff 0%, #d2e8ff 30%, #4aa3e8 62%, #1668b4 100%);
}
/* Спецкоманды — смесь цвета нападения (красный) и защиты (синий) */
.rules .accent-mix {
  background-image: linear-gradient(100deg, #ff5a4e 0%, #ffd2cc 22%, #ffffff 48%, #cfe6ff 72%, #3a9be8 100%);
}

/* Термины экипировки (приходят из v-html) — всегда подсвечены, ярче при наведении */
.rules .gear-term {
  cursor: pointer;
  color: #e6c866;
  font-weight: 600;
  border-bottom: 1px dashed rgba(230, 200, 102, 0.5);
  transition: color 0.2s ease, background 0.2s ease, border-color 0.2s ease;
}
.rules .gear-term:hover,
.rules .gear-term.on {
  color: #1a1206;
  background: linear-gradient(145deg, #e6c866, #c9a84c);
  border-color: transparent;
  border-radius: 4px;
  padding: 0 4px;
  margin: 0 -4px;
}
</style>
