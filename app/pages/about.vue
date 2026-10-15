<script setup lang="ts">
// О нас — история как рассказ: зигзаг-таймлайн, текст/фото выезжают при скролле.
useHead({ title: 'О нас — American Football Federation of Georgia' })

// Фото федерации для coverflow-галереи раздела
const galleryImages = [
  { src: '/gallery-1.webp', alt: 'Команда на поле' },
  { src: '/gallery-2.webp', alt: 'Американский футбол в Грузии' },
  { src: '/gallery-3.webp', alt: 'Матч' },
  { src: '/gallery-4.webp', alt: 'Игроки сборной' },
  { src: '/gallery-5.webp', alt: 'Турнир' },
]

onMounted(() => {
  // Начальное скрытие включаем только при живом JS — без него весь текст виден (SEO/fallback)
  document.documentElement.classList.add('about-reveal')

  // Год-метки «как счёт на поле»: год из начала заголовка (или из data-year),
  // крупной меткой; дублирующий год-префикс из самого заголовка убираем
  document.querySelectorAll<HTMLElement>('.prose > section').forEach((sec) => {
    const h2 = sec.querySelector('h2')
    if (!h2) return
    const text = h2.textContent ?? ''
    const m = text.match(/^\s*(20\d\d)/)
    const year = m?.[1] ?? sec.dataset.year
    if (!year) return
    if (m) h2.textContent = text.replace(/^[^—]*—\s*/, '') // убираем «2011 — » / «2012–2016 — »
    const span = document.createElement('span')
    span.className = 'yard-year'
    span.textContent = year
    span.setAttribute('aria-hidden', 'true')
    sec.prepend(span)
  })

  const els = document.querySelectorAll<HTMLElement>(
    '.about-hero, .prose > section, .prose > figure',
  )

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        // Появляется при входе в экран, стирается обратно при выходе — в обе стороны скролла
        for (const e of entries)
          e.target.classList.toggle('in', e.isIntersecting)
      },
      { threshold: 0, rootMargin: '-6% 0px -18% 0px' },
    )
    els.forEach(el => io.observe(el))
  }
  else {
    els.forEach(el => el.classList.add('in'))
  }

  // Шапка плавно уходит в тень при скролле вниз
  const hero = document.querySelector<HTMLElement>('.about-hero')
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (hero && !reduce) {
    const onScroll = () => {
      const p = Math.min(window.scrollY / 560, 1)
      hero.style.opacity = String(1 - p)
      hero.style.transform = `translateY(${(-window.scrollY * 0.16).toFixed(1)}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
  }
})
</script>

<template>
  <main class="about">
    <!-- Шапка раздела: текст выезжает слева, логотип — справа, встают рядом -->
    <header class="about-hero">
      <div class="about-hero__text">
        <span class="kicker">О федерации</span>
        <h1>История американского футбола в Грузии</h1>
        <p class="lead">
          Американский футбол в Грузии — это история не одного клуба и не одного поколения
          игроков. Это история, которая началась с небольшого сообщества энтузиастов,
          постепенно превратилась в национальную спортивную систему, пережила годы роста,
          пандемию и кризис клубного футбола, а затем вышла на международную арену.
        </p>
        <p>
          Сегодня грузинская сборная участвует в международных соревнованиях, в Тбилиси
          приезжают команды из разных стран, а Грузия впервые в своей истории вошла в
          официальный европейский цикл IFAF по tackle football. Но путь к этому занял более
          пятнадцати лет.
        </p>
      </div>
      <img src="/logo-aff.webp" alt="American Football Federation of Georgia" class="about-hero__logo">
    </header>

    <article class="prose">
      <!-- Галерея раздела: coverflow-карусель (десктоп — перетаскивание,
           телефон — свайпы) -->
      <figure class="gallery">
        <PhotoCarousel :images="galleryImages" />
      </figure>

      <section data-year="2010">
        <h2>Первые шаги: до создания федерации</h2>
        <p>
          Одни из первых документально подтверждённых свидетельств существования
          американского футбола в Грузии относятся ещё к 2010 году.
        </p>
        <p>
          4 декабря 2010 года в Тбилиси на искусственном поле Tavartkiladze Educational
          Institution состоялся товарищеский матч по американскому футболу между
          преподавателями английского языка и американскими морскими пехотинцами.
        </p>
        <p>
          Это был ещё не национальный чемпионат и не полноценная грузинская лига, однако
          этот матч показывает, что интерес к американскому футболу в Грузии существовал
          ещё до создания национальной федерации.
        </p>
        <p>
          Американские военнослужащие впоследствии продолжали участвовать в мероприятиях,
          связанных с развитием этого вида спорта. В июне 2014 года на стадионе Merani в
          Тбилиси, например, состоялся матч по flag football между американскими морскими
          пехотинцами и грузинской командой.
        </p>
        <p>
          Именно в этот период постепенно формировалась среда, из которой позже появилась
          организованная грузинская система американского футбола.
        </p>
      </section>

      <figure class="photo">
        <span class="photo__tag">Фото</span>
        <span class="photo__hint">2010–2014 · первые матчи</span>
      </figure>

      <section>
        <h2>2011 — создание Федерации американского футбола Грузии</h2>
        <p>
          Настоящей отправной точкой истории грузинского американского футбола можно
          считать 2011 год.
        </p>
        <p>
          В этом году была создана <strong>American Football Federation of Georgia</strong>.
          Международная федерация IFAF указывает 2011 год как год основания грузинской
          федерации.
        </p>
        <p>
          На раннем этапе движение было совсем небольшим. По сохранившимся материалам, в
          начале существовали всего две команды. Игроки и тренеры должны были получать
          знания и опыт за пределами страны — в Европе и США.
        </p>
        <p>
          Одной из центральных фигур этого периода был <strong>Амиран Кирия</strong>.
          До возвращения в Грузию Кирия несколько лет играл в американский футбол в России.
          Вернувшись на родину, он занялся развитием нового для Грузии вида спорта и стал
          одним из главных людей у истоков федерации.
        </p>
        <p>
          Перед молодой федерацией стояла огромная задача: фактически создать инфраструктуру
          американского футбола практически с нуля — найти игроков, подготовить тренеров и
          судей, сформировать команды и организовать соревнования. Так началась первая
          организованная глава грузинского американского футбола.
        </p>
      </section>

      <figure class="photo photo--portrait-row">
        <span class="photo__tag">Фото</span>
        <span class="photo__hint">Амиран Кирия · у истоков федерации</span>
      </figure>

      <section>
        <h2>2012–2016 — первые соревнования и появление клубов</h2>
        <p>
          В первые годы после создания федерации американский футбол постепенно выходил за
          рамки небольшой группы энтузиастов. Уже в 2012 году грузинские источники называют
          проходившие соревнования <strong>первым чемпионатом Грузии</strong> по
          американскому футболу.
        </p>
        <p>
          Именно этот период сегодня труднее всего восстановить по архивам — сохранилось
          значительно меньше таблиц, составов и результатов, чем по более поздним сезонам.
          Поэтому его правильнее воспринимать как переходный этап: федерация уже существовала,
          команды формировались, проводились национальные соревнования.
        </p>
        <p>
          В это время начали появляться клубы, которые позднее станут важной частью истории
          грузинской лиги. Одним из наиболее известных стал <strong>Tbilisi Crusaders</strong>,
          основанный в 2013 году. Позже появился <strong>Kutaisi Lions</strong> (2015), а в
          2016 году — <strong>AFC Tbilisi</strong>.
        </p>
        <p>
          Американский футбол постепенно начал выходить за пределы столицы. Команды и проекты
          появлялись в Тбилиси, Кутаиси, Рустави, Мцхете, Зугдиди и других местах. Спорт
          переставал быть исключительно тбилисским явлением.
        </p>
      </section>

      <section>
        <h2>2017 — начало современной эры чемпионата</h2>
        <p>
          2017 год стал одним из главных переломных моментов. Именно с этого года начинается
          современная история <strong>Georgian American Football League</strong>, для которой
          сохранилось значительно больше статистики и результатов.
        </p>
        <p>
          Первый сезон проходил с июня по октябрь 2017 года. В чемпионате участвовали
          <strong>Tbilisi Crusaders, Rustavi Steelers, Kutaisi Lions и Mtskheta Iberia</strong>.
          Лучшие команды выходили в плей-офф. Финал состоялся 1 октября 2017 года в Рустави.
        </p>

        <div class="match">
          <span class="match__team">Tbilisi Crusaders</span>
          <span class="match__score">18 : 12</span>
          <span class="match__team">Rustavi Steelers</span>
        </div>

        <p>
          Победу одержали <strong>Tbilisi Crusaders</strong>, став первыми чемпионами
          современной Georgian American Football League. Появилась регулярная национальная
          лига, клубная система и официальный чемпион.
        </p>
      </section>

      <figure class="photo">
        <span class="photo__tag">Фото</span>
        <span class="photo__hint">2017 · первые чемпионы — Tbilisi Crusaders</span>
      </figure>

      <section>
        <h2>2018 — первое чемпионство Rustavi Steelers</h2>
        <p>
          В финале снова встретились <strong>Tbilisi Crusaders</strong> и
          <strong>Rustavi Steelers</strong>. На этот раз победили Steelers.
        </p>

        <div class="match">
          <span class="match__team">Rustavi Steelers</span>
          <span class="match__score">24 : 18</span>
          <span class="match__team">Tbilisi Crusaders</span>
        </div>

        <p>
          Steelers завершили сезон без поражений и впервые стали чемпионами Грузии. Финал
          получился драматичным: Crusaders вели 18:12 в четвёртой четверти, однако Steelers
          заблокировали два панта подряд и набрали решающие очки. Так появилось первое
          настоящее клубное соперничество — <strong>Crusaders против Steelers</strong>.
        </p>
      </section>

      <section>
        <h2>2019 — расширение чемпионата</h2>
        <p>
          Если в 2018 году в чемпионате участвовали четыре команды, то в 2019 году их стало
          шесть, а федерация рассчитывала довести число до восьми. Были представлены команды
          из разных частей страны:
        </p>
        <ul>
          <li>Tbilisi Crusaders</li>
          <li>Rustavi Steelers</li>
          <li>AFC Tbilisi</li>
          <li>Tbilisi Eagles</li>
          <li>Sokhumi Warriors</li>
          <li>Western Bad Boys (Зугдиди)</li>
        </ul>

        <h3>Sokhumi Warriors</h3>
        <p>
          Особое место занимает команда <strong>Sokhumi Warriors</strong>. В 2019 году
          федерация организовала товарищеский матч между Sokhumi Warriors и командой Tbilisi,
          посвящённый 75-летию Жиули Шартавы. Позднее Warriors дошли до полуфинала, где
          встретились с Crusaders.
        </p>

        <div class="match">
          <span class="match__team">Tbilisi Crusaders</span>
          <span class="match__score">37 : 8</span>
          <span class="match__team">Sokhumi Warriors</span>
        </div>

        <p>
          Сам факт существования команды из Сухуми был важен не только со спортивной точки
          зрения. Американский футбол становился площадкой, через которую люди из разных
          частей Грузии оставались частью общей спортивной среды.
        </p>

        <h3>Western Bad Boys</h3>
        <p>
          В чемпионате также участвовала команда <strong>Western Bad Boys из Зугдиди</strong>.
          Хотя её результаты были скромными, участие стало ещё одним свидетельством того, что
          федерация развивала спорт не только в Тбилиси и Рустави, но и в регионах.
        </p>

        <h3>Steelers снова чемпионы</h3>
        <p>Финал 2019 года вновь свёл главных соперников последних лет.</p>

        <div class="match">
          <span class="match__team">Rustavi Steelers</span>
          <span class="match__score">12 : 10</span>
          <span class="match__team">Tbilisi Crusaders</span>
        </div>

        <p>Первые три современных сезона завершились так:</p>
        <ul class="champs">
          <li><b>2017</b> — Tbilisi Crusaders</li>
          <li><b>2018</b> — Rustavi Steelers</li>
          <li><b>2019</b> — Rustavi Steelers</li>
        </ul>
      </section>

      <figure class="photo">
        <span class="photo__tag">Фото</span>
        <span class="photo__hint">2019 · расширение лиги</span>
      </figure>

      <section>
        <h2>2020 — пандемия и третье чемпионство Steelers</h2>
        <p>
          Сезон 2020 года проходил в условиях пандемии COVID-19 и стартовал только в октябре.
          Участвовали четыре команды: Rustavi Steelers, Tbilisi Crusaders, Tbilisi Eagles и
          AFC Tbilisi (последний впоследствии снялся). Несмотря на сложные условия, сезон был
          завершён. В регулярном чемпионате Steelers показали 5–1 и уверенно заняли первое место.
        </p>

        <div class="match">
          <span class="match__team">Rustavi Steelers</span>
          <span class="match__score">12 : 6</span>
          <span class="match__team">Tbilisi Crusaders</span>
        </div>

        <p>
          Steelers стали чемпионами Грузии третий раз подряд и к концу 2020 года были
          доминирующей командой ранней современной эпохи.
        </p>
      </section>

      <section>
        <h2>2021 — перелом и кризис клубного футбола</h2>
        <p>
          Чемпионат 2021 года начался 5 июня. Но затем произошло то, чего раньше почти
          невозможно было представить: 24 июля с турнира снялись <strong>Tbilisi Crusaders</strong>,
          а 26 июля — <strong>Rustavi Steelers</strong>. Две команды, определявшие лицо
          грузинского американского футбола первых четырёх сезонов, одновременно вышли из
          чемпионата. Это стало серьёзным ударом по клубной системе.
        </p>
        <p>
          Период 2017–2019 создавал ощущение постоянного роста: 4 команды → 6 команд → планы
          на 8. Но пандемия и последующие проблемы показали, насколько трудно поддерживать
          полноценный tackle football в небольшой спортивной экосистеме — он требует
          экипировки, шлемов, защиты, большого количества игроков, тренеров, судей и
          инфраструктуры.
        </p>
      </section>

      <section>
        <h2>Поворот к flag football</h2>
        <p>
          Одним из важнейших направлений стал <strong>flag football</strong> — бесконтактная
          разновидность американского футбола. Здесь не требуется тяжёлая защитная экипировка,
          а сам спорт значительно проще организовать. Для страны, где американский футбол ещё
          развивается, это дало возможность быстрее создавать команды, проводить соревнования
          и привлекать новых игроков. Постепенно именно flag football стал одним из главных
          инструментов выхода Грузии на международную арену.
        </p>
      </section>

      <figure class="photo">
        <span class="photo__tag">Фото</span>
        <span class="photo__hint">Flag football · сборная</span>
      </figure>

      <section>
        <h2>2024 — первый чемпионат мира</h2>
        <p>
          В 2024 году произошёл исторический шаг: сборная Грузии впервые приняла участие в
          <strong>чемпионате мира по flag football</strong>. Турнир проходил в Финляндии в
          августе 2024 года. И здесь снова появляется имя <strong>Амирана Кирии</strong> —
          человека, который стоял у истоков федерации ещё в 2011 году, а спустя более десяти
          лет представлял Грузию на мировом уровне. Это стало символом того, насколько далеко
          продвинулся спорт с момента первых двух команд.
        </p>
      </section>

      <section>
        <h2>2025 — Black Sea Bowl</h2>
        <p>
          Грузия начала не только ездить на международные турниры, но и
          <strong>принимать иностранные команды у себя</strong>. В Тбилиси состоялся первый
          международный турнир <strong>Black Sea Bowl</strong>. Участвовали команды из
          нескольких стран, а грузинская сборная дошла до финала.
        </p>

        <div class="match">
          <span class="match__team">🇬🇪 Georgia</span>
          <span class="match__score">28 : 27</span>
          <span class="match__team">Poland 🇵🇱</span>
        </div>

        <p>
          Грузия выиграла турнир. Тбилиси начал превращаться в площадку для международных
          соревнований.
        </p>
      </section>

      <figure class="photo photo--wide">
        <span class="photo__tag">Фото</span>
        <span class="photo__hint">Black Sea Bowl · Тбилиси</span>
      </figure>

      <section>
        <h2>2026 — Black Sea Bowl на новом уровне</h2>
        <p>
          В августе 2026 года в Тбилиси состоялся уже второй Black Sea Bowl. Турнир проходил
          в Olympic Park и собрал команды из восьми стран:
        </p>
        <ul class="flags">
          <li>🇬🇪 Грузия</li>
          <li>🇺🇦 Украина</li>
          <li>🇦🇲 Армения</li>
          <li>🇧🇬 Болгария</li>
          <li>🇵🇱 Польша</li>
          <li>🇰🇿 Казахстан</li>
          <li>🇨🇲 Камерун</li>
          <li>🇺🇸 США</li>
        </ul>
        <p>
          За несколько дней было запланировано около двадцати матчей — совершенно другой
          масштаб по сравнению с первыми годами, когда в стране было всего несколько
          энтузиастов и две команды.
        </p>
      </section>

      <section class="highlight">
        <h2>2026 — исторический выход в международный tackle football</h2>
        <p>
          Главным событием современной истории стал другой шаг. В сентябре 2026 года IFAF
          объявила состав европейского чемпионата. И впервые в истории
          <strong>Грузия вошла в официальный европейский цикл IFAF по tackle football</strong> —
          речь уже не о flag football, а о полноценном контактном американском футболе.
        </p>
        <p>Грузия заявлена в <strong>European Championship Level 2</strong> вместе с:</p>
        <ul>
          <li>🇪🇸 Испанией</li>
          <li>🇬🇧 Great Britain Development Team</li>
        </ul>
        <p>Это официальный международный дебют Грузии в европейском цикле tackle football.</p>

        <div class="fixtures">
          <div class="fixture">
            <span class="fixture__date">11 октября 2026</span>
            <span class="fixture__teams">🇬🇪 Georgia vs Great Britain Development Team</span>
            <span class="fixture__place">Тбилиси</span>
          </div>
          <div class="fixture">
            <span class="fixture__date">24 октября 2026</span>
            <span class="fixture__teams">🇪🇸 Spain vs Georgia 🇬🇪</span>
            <span class="fixture__place">Испания</span>
          </div>
        </div>
      </section>

      <section class="finale">
        <h2>От двух команд до международной сборной</h2>
        <p>
          В 2010 году американский футбол в Тбилиси существовал преимущественно как небольшая
          инициатива, связанная с американскими военнослужащими и отдельными энтузиастами. В
          2011 году появилась федерация — и всего две команды. Игрокам и тренерам приходилось
          учиться за границей.
        </p>
        <p>Затем появились первые грузинские клубы:</p>
        <ul class="teams-grid">
          <li>Tbilisi Crusaders</li>
          <li>Rustavi Steelers</li>
          <li>Kutaisi Lions</li>
          <li>AFC Tbilisi</li>
          <li>Tbilisi Eagles</li>
          <li>Sokhumi Warriors</li>
          <li>Western Bad Boys</li>
        </ul>
        <p>
          В 2017 году появилась современная национальная лига — первыми чемпионами стали
          Crusaders, затем началась эпоха Rustavi Steelers с тремя титулами подряд. В 2019
          чемпионат объединял команды из разных регионов. Потом пришла пандемия, и 2021 год
          стал переломным. Но спорт не исчез — он изменил направление.
        </p>
        <p>
          Flag football дал возможность привлечь новых игроков и вывести Грузию за пределы
          внутреннего чемпионата. В 2024 году — первый чемпионат мира, в 2025 — первый
          Black Sea Bowl и победа в нём, в 2026 — международный турнир с восемью странами и,
          наконец, дебют в европейском tackle football.
        </p>
        <p>
          От двух команд и нескольких энтузиастов до национальной сборной, международных
          турниров и европейского чемпионата прошло примерно пятнадцать лет. И, пожалуй, самое
          символичное во всей этой истории — имя <strong>Амирана Кирии</strong>: человек,
          стоявший у истоков федерации в 2011 году, спустя годы оказался связан и с современной
          сборной.
        </p>
        <p class="finale__path">
          От первых игр в Тбилиси → к созданию федерации → первым клубам → национальному
          чемпионату → эпохе Crusaders и Steelers → кризису после пандемии → развитию flag
          football → мировому чемпионату → международным турнирам в Тбилиси → и, наконец,
          дебюту Грузии в европейском tackle football в 2026 году.
        </p>
      </section>
    </article>
  </main>
</template>

<style scoped>
.about {
  position: relative;
  color: rgba(255, 255, 255, 0.82);
  padding: clamp(120px, 14vh, 180px) clamp(20px, 6vw, 48px) 120px;
  background: transparent;
}

/* ===== Шапка раздела: заголовок + вводный текст на фоне грузинского флага ===== */
.about-hero {
  position: relative;
  max-width: 1040px;
  margin: 0 auto 88px;
  display: grid;
  grid-template-columns: 1.12fr 0.88fr;
  align-items: center;
  gap: clamp(20px, 4vw, 56px);
}
.about-hero__text { position: relative; }
/* Логотип — яркий золотой объект справа, с мягким свечением */
.about-hero__logo {
  display: block;
  width: 100%;
  max-width: 380px;
  height: auto;
  justify-self: end;
  filter: brightness(1.12) drop-shadow(0 0 34px rgba(230, 200, 102, 0.3));
}
.kicker {
  display: inline-block;
  margin-bottom: 18px;
  font-size: 0.78rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--color-gold-light, #e6c866);
}
.about-hero h1 {
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
.lead {
  font-size: clamp(1.05rem, 2vw, 1.3rem);
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.92);
  max-width: 620px;
}

/* ===== Reveal по скроллу: рассказ-зигзаг =====
   Шапка: текст выезжает слева, логотип — справа, встают рядом.
   Главы: текст слева, фото — справа. Скрыто только при живом JS. */
.about-reveal .about-hero__text {
  opacity: 0;
  transform: translateX(-54px);
}
.about-reveal .about-hero__logo {
  opacity: 0;
  transform: translateX(54px);
}
.about-reveal .prose > section {
  opacity: 0;
  transform: translateX(-46px);
}
.about-reveal .prose > figure {
  opacity: 0;
  transform: translateX(46px) scale(0.97);
}
.about-reveal .about-hero__text,
.about-reveal .about-hero__logo,
.about-reveal .prose > section,
.about-reveal .prose > figure {
  transition:
    opacity 1.4s ease,
    transform 1.7s cubic-bezier(0.2, 0.75, 0.25, 1);
  will-change: opacity, transform;
}
.about-hero.in .about-hero__text,
.about-hero.in .about-hero__logo,
.about-reveal .prose > section.in,
.about-reveal .prose > figure.in {
  opacity: 1;
  transform: none;
}

/* ===== Текст ===== */
.prose {
  position: relative;
  max-width: 880px;
  margin: 0 auto;
}
/* Ось истории — боковая линия поля с ярдовыми насечками, вынесена левее текста */
.prose::before {
  content: "";
  position: absolute;
  left: -40px;
  top: 8px;
  bottom: 8px;
  width: 16px;
  pointer-events: none;
  background:
    linear-gradient(180deg, rgba(240, 226, 170, 0.6) 0, rgba(240, 226, 170, 0.6) 100%) left / 3px 100% no-repeat,
    repeating-linear-gradient(180deg, rgba(240, 226, 170, 0.34) 0 2px, transparent 2px 34px);
  -webkit-mask: linear-gradient(180deg, transparent, #000 7%, #000 93%, transparent);
  mask: linear-gradient(180deg, transparent, #000 7%, #000 93%, transparent);
}
.prose section {
  position: relative;
  margin: 92px 0;
  padding-left: 4px;
}
/* Год главы — крупная «табло»-цифра, как счёт на поле.
   :deep — элемент создаётся из JS и не несёт scoped-атрибута */
:deep(.yard-year) {
  display: block;
  margin-bottom: 4px;
  font-family: 'Teko', 'Oswald', sans-serif;
  font-weight: 700;
  font-size: clamp(2.4rem, 5.5vw, 3.8rem);
  line-height: 0.85;
  letter-spacing: 0.03em;
  background: linear-gradient(180deg, #fff6d4, #e6c866 55%, #c9a84c);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.6));
  pointer-events: none;
}
/* У глав с годом-меткой убираем дублирующую золотую чёрточку над заголовком */
:deep(.yard-year + h2)::before { display: none; }
.prose h2 {
  margin: 0 0 18px;
  font-family: 'Oswald', sans-serif;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.01em;
  font-size: clamp(1.4rem, 3vw, 2rem);
  color: #fff;
}
.prose h2::before {
  content: "";
  display: block;
  width: 48px;
  height: 3px;
  margin-bottom: 16px;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--color-gold-light, #e6c866), transparent);
}
.prose h3 {
  margin: 30px 0 12px;
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--color-gold-light, #e6c866);
}
.prose p {
  margin: 0 0 16px;
  font-size: 1rem;
  line-height: 1.72;
}
.prose strong { color: #fff; font-weight: 600; }
.prose ul {
  margin: 0 0 18px;
  padding-left: 22px;
  line-height: 1.8;
}
.prose ul.champs,
.prose ul.flags,
.prose ul.teams-grid { list-style: none; padding: 0; }
.prose ul.champs li,
.prose ul.flags li { padding: 4px 0; }
.prose ul.champs b { color: var(--color-gold-light, #e6c866); margin-right: 8px; }
.prose ul.flags { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2px 20px; }
.prose ul.teams-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 10px;
  margin: 10px 0 20px;
}
.prose ul.teams-grid li {
  padding: 12px 16px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(201, 168, 76, 0.2);
  color: #fff;
  font-weight: 500;
}

/* ===== Результат матча ===== */
.match {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 16px;
  margin: 22px 0;
  padding: 18px 22px;
  border-radius: 14px;
  background:
    radial-gradient(120% 140% at 50% 0%, rgba(201, 168, 76, 0.08), transparent 70%),
    rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(201, 168, 76, 0.28);
}
.match__team {
  font-weight: 600;
  color: #fff;
  font-size: 0.98rem;
}
.match__team:first-child { text-align: right; }
.match__team:last-child { text-align: left; }
.match__score {
  font-family: 'Oswald', sans-serif;
  font-weight: 700;
  font-size: 1.5rem;
  white-space: nowrap;
  background: linear-gradient(180deg, #fff6d4, #e6c866, #c9a84c);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

/* ===== Фикстуры европейского дебюта ===== */
.fixtures { display: flex; flex-direction: column; gap: 12px; margin-top: 20px; }
.fixture {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 6px 16px;
  padding: 16px 20px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-left: 3px solid var(--color-gold, #c9a84c);
}
.fixture__date {
  font-family: 'Oswald', sans-serif;
  font-weight: 600;
  color: var(--color-gold-light, #e6c866);
  letter-spacing: 0.04em;
}
.fixture__teams { flex: 1; min-width: 200px; color: #fff; font-weight: 500; }
.fixture__place { font-size: 0.85rem; color: rgba(255, 255, 255, 0.5); }

/* ===== Акцентные секции ===== */
.highlight {
  padding: 28px clamp(20px, 4vw, 36px);
  border-radius: 20px;
  background:
    radial-gradient(130% 100% at 0% 0%, rgba(201, 168, 76, 0.1), transparent 55%),
    rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(201, 168, 76, 0.3);
}
.finale__path {
  margin-top: 24px;
  padding: 20px 22px;
  border-radius: 14px;
  background: rgba(201, 168, 76, 0.06);
  border: 1px solid rgba(201, 168, 76, 0.22);
  font-weight: 500;
  color: #fff;
  line-height: 1.8;
}

/* Галерея-карусель раздела */
.gallery {
  margin: 64px 0 80px;
  padding: 0;
}

/* ===== Заглушки под фото ===== */
.photo {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 72px 0;
  aspect-ratio: 16 / 9;
  border-radius: 20px;
  background:
    repeating-linear-gradient(45deg, rgba(201, 168, 76, 0.04) 0 14px, transparent 14px 28px),
    radial-gradient(120% 140% at 50% 0%, rgba(201, 168, 76, 0.08), transparent 65%),
    rgba(255, 255, 255, 0.02);
  border: 1.5px dashed rgba(201, 168, 76, 0.45);
  box-shadow: 0 40px 80px -40px rgba(0, 0, 0, 0.85), inset 0 1px 0 rgba(255, 255, 255, 0.05);
}
.photo--wide { aspect-ratio: 21 / 9; }
.photo--portrait-row { aspect-ratio: 2 / 1; }
/* Реальное фото — без рамки, края затемнены (боковая и верх/низ виньетка) */
.photo--img {
  position: relative;
  padding: 0;
  overflow: hidden;
  border: none;
  background: #000;
  box-shadow: none;
}
.photo--img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.photo--img::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(90deg, #000 0%, rgba(0, 0, 0, 0.35) 12%, transparent 30%, transparent 70%, rgba(0, 0, 0, 0.35) 88%, #000 100%),
    linear-gradient(180deg, rgba(0, 0, 0, 0.55) 0%, transparent 20%, transparent 78%, rgba(0, 0, 0, 0.6) 100%);
}
.photo__tag {
  font-family: 'Oswald', sans-serif;
  font-size: 0.8rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--color-gold-light, #e6c866);
}
.photo__hint {
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.4);
}

/* На телефоне зигзаг схлопывается: всё всплывает СНИЗУ (без боковых выездов) */
@media (max-width: 760px) {
  .about-hero {
    grid-template-columns: 1fr;
    gap: 24px;
    text-align: left;
  }
  .about-hero__logo {
    order: -1; /* логотип сверху, как эмблема */
    max-width: 220px;
    justify-self: start;
  }
  .about-reveal .about-hero__text,
  .about-reveal .about-hero__logo,
  .about-reveal .prose > section,
  .about-reveal .prose > figure {
    transform: translateY(34px) scale(1);
  }
  .prose::before { left: -14px; }
  .prose section { padding-left: 2px; }
}

/* Уважаем системную настройку «меньше движения» — показываем сразу, без анимации */
@media (prefers-reduced-motion: reduce) {
  .about-reveal .about-hero__text,
  .about-reveal .about-hero__logo,
  .about-reveal .prose > section,
  .about-reveal .prose > figure {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}

@media (max-width: 560px) {
  .match { grid-template-columns: 1fr; gap: 6px; text-align: center; }
  .match__team:first-child,
  .match__team:last-child { text-align: center; }
  .prose ul.flags { grid-template-columns: 1fr; }
  .about-hero { padding: 28px 22px; }
}
</style>
