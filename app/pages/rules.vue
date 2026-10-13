<script setup lang="ts">
// Правила американского футбола — досконально, для новичков.
const { locale } = useLocale()
useHead({ title: 'Правила — American Football Federation of Georgia' })

const tr = {
  ka: {
    kicker: 'როგორ მუშაობს', h1: 'ამერიკული ფეხბურთის წესები',
    lead: 'ამერიკული ფეხბურთი მხოლოდ ერთი შეხედვით ჩანს რთული. სინამდვილეში ყველაფერი ერთი მარტივი იდეის გარშემო შენდება: ოთხ მცდელობაში ბურთის წინ წაწევა და მოწინააღმდეგის ზონაში შეტანა. ქვემოთ — ყველაფერი თანმიმდევრობით, თამაშის მიზნიდან პოზიციებამდე და ჯარიმებამდე.',
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
    offH: 'პოზიციები · შეტევა', defH: 'პოზიციები · დაცვა',
    specialH: 'სპეციალური გუნდები',
    specialP: 'ცალკე მოთამაშეების ჯგუფი გამოდის დარტყმებზე: <strong>კიკერი</strong> ურტყამს ფილდ-გოლებსა და საწყის დარტყმებს, <strong>პანტერი</strong> ამოარტყამს ბურთს მეოთხე მცდელობაზე, ხოლო <strong>დამბრუნებელი</strong> იღებს დარტყმას და წინ გარბის. სპეციალური გუნდების მომენტები ხშირად ცვლის მატჩის მსვლელობას.',
    penH: 'ძირითადი დარღვევები',
    gearH: 'აღჭურვილობა',
    gearP: 'საკონტაქტო (tackle) ფეხბურთში მოთამაშე დაცულია თავიდან ფეხებამდე: <strong>ჩაფხუტი ბადით</strong>, <strong>სამხრეები</strong>, კაპა, ფარები ბარძაყებსა და მუხლებზე. ამიტომ სრულფასოვანი tackle მოითხოვს რესურსებსა და მომზადებას — სწორედ ამის გამო დამწყებებს ხშირად უკონტაქტო ფორმატით იწყებენ.',
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
      { pos: 'QB', name: 'კვოტერბეკი', desc: 'გამთამაშებელი. იღებს ბურთს, პასავს ან გასცემს გატანაში.' },
      { pos: 'RB', name: 'რანინბეკი', desc: 'ბურთს გარბენით გააქვს, იღებს მოკლე პასებს.' },
      { pos: 'WR', name: 'რესივერი', desc: 'იღებს პასებს, სწრაფი და ტექნიკური.' },
      { pos: 'TE', name: 'ტაიტ-ენდი', desc: 'ჰიბრიდი: ბლოკავს და პასებსაც იღებს.' },
      { pos: 'OL', name: 'შეტევის ხაზი', desc: 'ხუთი მოთამაშე, იცავენ კვოტერბეკს და ხსნიან დერეფნებს.' },
    ],
    defense: [
      { pos: 'DL', name: 'დაცვის ხაზი', desc: 'აწვებიან კვოტერბეკს, აჩერებენ გატანას.' },
      { pos: 'LB', name: 'ლაინბეკერი', desc: 'უნივერსალები ხაზს მიღმა: გატანა, პასი, ბლიცი.' },
      { pos: 'CB', name: 'კორნერბეკი', desc: 'ჰყავთ რესივერები, შლიან პასებს.' },
      { pos: 'S', name: 'სეიფტი', desc: 'დაცვის უკანასკნელი ხაზი, აზღვევენ სიღრმეს.' },
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
    kicker: 'Как это работает', h1: 'Правила американского футбола',
    lead: 'Американский футбол выглядит сложно только на первый взгляд. На деле всё строится вокруг одной простой идеи: за четыре попытки продвинуть мяч и занести его в зону соперника. Ниже — всё по порядку, от цели игры до позиций и штрафов.',
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
    offH: 'Позиции · нападение', defH: 'Позиции · защита',
    specialH: 'Спецкоманды',
    specialP: 'Отдельная группа игроков выходит на удары: <strong>киккер</strong> бьёт филд-голы и начальные удары, <strong>пантёр</strong> выбивает мяч на четвёртой попытке, а <strong>возвращающий</strong> принимает удар и бежит с ним вперёд. Моменты спецкоманд часто меняют ход матча.',
    penH: 'Основные нарушения',
    gearH: 'Экипировка',
    gearP: 'В контактном (tackle) футболе игрок защищён с головы до ног: <strong>шлем с решёткой</strong>, <strong>наплечники</strong>, капа, щитки на бёдра и колени. Поэтому полноценный tackle требует ресурсов и подготовки — именно из-за этого новичков часто начинают с бесконтактного формата.',
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
      { pos: 'QB', name: 'Квотербек', desc: 'Разыгрывающий. Получает мяч, пасует или отдаёт в выносе.' },
      { pos: 'RB', name: 'Раннинбек', desc: 'Выносит мяч бегом, принимает короткие пасы.' },
      { pos: 'WR', name: 'Ресивер', desc: 'Принимает пасы, быстрый и техничный.' },
      { pos: 'TE', name: 'Тайт-энд', desc: 'Гибрид: и блокирует, и принимает пасы.' },
      { pos: 'OL', name: 'Линия нападения', desc: 'Пять игроков, защищают квотербека и открывают коридоры.' },
    ],
    defense: [
      { pos: 'DL', name: 'Линия защиты', desc: 'Давят на квотербека, останавливают вынос.' },
      { pos: 'LB', name: 'Лайнбекер', desc: 'Универсалы за линией: вынос, пас, блиц.' },
      { pos: 'CB', name: 'Корнербек', desc: 'Опекают ресиверов, разбивают пасы.' },
      { pos: 'S', name: 'Сэйфти', desc: 'Последняя линия обороны, страхуют глубину.' },
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
    kicker: 'How it works', h1: 'The rules of American football',
    lead: "American football only looks complex at first glance. In reality it is built around one simple idea: in four attempts, move the ball forward and carry it into the opponent's zone. Below — everything in order, from the goal of the game to positions and penalties.",
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
    offH: 'Positions · offense', defH: 'Positions · defense',
    specialH: 'Special teams',
    specialP: 'A separate group comes on for kicks: the <strong>kicker</strong> hits field goals and kickoffs, the <strong>punter</strong> kicks the ball away on fourth down, and the <strong>returner</strong> receives the kick and runs it back. Special-teams moments often change the course of a match.',
    penH: 'Common penalties',
    gearH: 'Equipment',
    gearP: 'In contact (tackle) football a player is protected head to toe: a <strong>helmet with a facemask</strong>, <strong>shoulder pads</strong>, a mouthguard, thigh and knee pads. That is why full tackle requires resources and preparation — which is exactly why beginners often start with the non-contact format.',
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
      { pos: 'QB', name: 'Quarterback', desc: 'The playmaker. Receives the ball, passes or hands off on a run.' },
      { pos: 'RB', name: 'Running back', desc: 'Runs the ball, catches short passes.' },
      { pos: 'WR', name: 'Wide receiver', desc: 'Catches passes, fast and technical.' },
      { pos: 'TE', name: 'Tight end', desc: 'A hybrid: blocks and catches passes.' },
      { pos: 'OL', name: 'Offensive line', desc: 'Five players who protect the quarterback and open lanes.' },
    ],
    defense: [
      { pos: 'DL', name: 'Defensive line', desc: 'Pressure the quarterback, stop the run.' },
      { pos: 'LB', name: 'Linebacker', desc: 'All-rounders behind the line: run, pass, blitz.' },
      { pos: 'CB', name: 'Cornerback', desc: 'Cover receivers, break up passes.' },
      { pos: 'S', name: 'Safety', desc: 'The last line of defense, covering the deep.' },
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
const penalties = computed(() => r.value.penalties)
</script>

<template>
  <main class="rules">
    <header class="hero">
      <span class="kicker">{{ r.kicker }}</span>
      <h1>{{ r.h1 }}</h1>
      <p class="lead">{{ r.lead }}</p>
    </header>

    <div class="wrap">
      <!-- Цель -->
      <section class="block">
        <h2>{{ r.goalH }}</h2>
        <p v-html="r.goalP" />
      </section>

      <!-- Поле -->
      <section class="block">
        <h2>{{ r.fieldH }}</h2>
        <p v-html="r.fieldP" />
        <!-- Простая схема поля -->
        <div class="field" aria-hidden="true">
          <div class="field__ez field__ez--l">END ZONE</div>
          <div class="field__play">
            <span v-for="n in 9" :key="n" class="field__line" />
            <span class="field__mid">50</span>
          </div>
          <div class="field__ez field__ez--r">END ZONE</div>
        </div>
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
        <h2>{{ r.offH }}</h2>
        <div class="pos-grid">
          <div v-for="p in offense" :key="p.pos" class="pos">
            <span class="pos__tag">{{ p.pos }}</span>
            <b>{{ p.name }}</b>
            <span class="pos__desc">{{ p.desc }}</span>
          </div>
        </div>
      </section>

      <!-- Позиции защиты -->
      <section class="block">
        <h2>{{ r.defH }}</h2>
        <div class="pos-grid">
          <div v-for="p in defense" :key="p.pos" class="pos pos--def">
            <span class="pos__tag">{{ p.pos }}</span>
            <b>{{ p.name }}</b>
            <span class="pos__desc">{{ p.desc }}</span>
          </div>
        </div>
      </section>

      <!-- Спецкоманды -->
      <section class="block">
        <h2>{{ r.specialH }}</h2>
        <p v-html="r.specialP" />
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
        <p v-html="r.gearP" />
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
</template>

<style scoped>
.rules {
  background: transparent;
  color: rgba(255, 255, 255, 0.82);
  padding: clamp(120px, 14vh, 180px) clamp(20px, 6vw, 48px) 120px;
}

.hero { max-width: 820px; margin: 0 auto 56px; }
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
  font-size: clamp(2rem, 5vw, 3.6rem);
  background: linear-gradient(180deg, #fff6d4 0%, #e9c25a 55%, #c9a84c 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.lead { font-size: clamp(1.05rem, 2vw, 1.25rem); line-height: 1.6; color: rgba(255, 255, 255, 0.9); }

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

/* Схема поля */
.field {
  display: flex;
  height: 120px;
  margin-top: 22px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.field__ez {
  display: grid;
  place-items: center;
  width: 64px;
  font-family: 'Oswald', sans-serif;
  font-size: 0.6rem;
  letter-spacing: 0.1em;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  color: rgba(255, 255, 255, 0.8);
  background: linear-gradient(135deg, #1a4a2a, #0f3a1e);
}
.field__ez--r { transform: none; }
.field__play {
  position: relative;
  flex: 1;
  display: flex;
  justify-content: space-around;
  align-items: stretch;
  background: linear-gradient(135deg, #205c33, #16431f);
}
.field__line { width: 1px; background: rgba(255, 255, 255, 0.35); }
.field__mid {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  font-family: 'Oswald', sans-serif;
  font-size: 1.6rem;
  color: rgba(255, 255, 255, 0.4);
}

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

/* Позиции */
.pos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
  gap: 12px;
}
.pos {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 18px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
.pos__tag {
  align-self: flex-start;
  padding: 3px 10px;
  border-radius: 999px;
  font-family: 'Oswald', sans-serif;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: #1a1206;
  background: linear-gradient(145deg, #e6c866, #c9a84c);
}
.pos--def .pos__tag { color: #fff; background: linear-gradient(145deg, #3a90c8, #1c5f92); }
.pos b { color: #fff; font-size: 1rem; }
.pos__desc { font-size: 0.85rem; line-height: 1.5; color: rgba(255, 255, 255, 0.55); }

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
</style>
