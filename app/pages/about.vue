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
// Галерея к периоду создания федерации (2011)
const galleryImages2011 = [
  { src: '/gallery-6.webp', alt: 'Ранние годы федерации' },
  { src: '/gallery-7.webp', alt: 'Первые команды' },
  { src: '/gallery-8.webp', alt: 'Тренировки' },
  { src: '/gallery-9.webp', alt: 'Матч' },
  { src: '/gallery-10.webp', alt: 'Игроки' },
]
// Галерея к периоду 2012–2016
const galleryImages2012 = [
  { src: '/gallery-11.webp', alt: 'Первые соревнования' },
  { src: '/gallery-12.webp', alt: 'Клубы федерации' },
  { src: '/gallery-13.webp', alt: 'Матч чемпионата' },
  { src: '/gallery-14.webp', alt: 'Игроки на поле' },
  { src: '/kutaisi-lions.jpg', alt: 'Kutaisi Lions — команда из Кутаиси' },
]
// Галерея к сезону 2020
const galleryImages2020 = [
  { src: '/champ-2020-45.jpg', alt: 'Сезон 2020 — Rustavi Steelers' },
  { src: '/champ-2020-46.jpg', alt: 'Сезон 2020 — матч чемпионата' },
  { src: '/champ-2020-47.jpg', alt: 'Сезон 2020 — финал' },
  { src: '/champ-2020-48.jpg', alt: 'Сезон 2020 — чемпионы Steelers' },
]
// Галерея к flag football / сборной
const galleryImagesFlag = [
  { src: '/flag-football-1.jpg', alt: 'Flag football — сборная Грузии' },
  { src: '/flag-football-2.jpg', alt: 'Flag football — матч' },
  { src: '/flag-football-3.jpg', alt: 'Flag football — команда' },
  { src: '/flag-football-4.jpg', alt: 'Flag football — турнир' },
]
// Галерея к Black Sea Bowl (2025)
const galleryImagesBSB = [
  { src: '/black-sea-bowl-1.jpg', alt: 'Black Sea Bowl 2025 — турнир в Тбилиси' },
  { src: '/black-sea-bowl-2.jpg', alt: 'Black Sea Bowl 2025 — матч' },
  { src: '/black-sea-bowl-3.jpg', alt: 'Black Sea Bowl 2025 — сборная Грузии' },
  { src: '/black-sea-bowl-4.jpg', alt: 'Black Sea Bowl 2025 — команды' },
  { src: '/black-sea-bowl-5.jpg', alt: 'Black Sea Bowl 2025 — финал' },
]
// Галерея к первому чемпионату мира (2024)
const galleryImages2024 = [
  { src: '/flag-football-5.jpg', alt: 'Чемпионат мира 2024 — сборная Грузии' },
  { src: '/flag-football-6.jpg', alt: 'Чемпионат мира 2024 — Финляндия' },
  { src: '/flag-football-7.jpg', alt: 'Чемпионат мира 2024 — матч' },
  { src: '/flag-football-8.jpg', alt: 'Чемпионат мира 2024 — команда' },
]

// Контент страницы на текущем языке (ka/ru/en)
const c = useAboutContent()
// Коды флагов стран Black Sea Bowl 2026 — порядок совпадает с c.bsb2026.countries
const flagCodes = ['ge', 'ua', 'am', 'bg', 'pl', 'kz', 'cm', 'us']

// Год-метка «как счёт на поле»: извлекаем год из начала заголовка (реактивно, без DOM-хаков)
function yearOf(h: string): string | null {
  const m = h.match(/^\s*(20\d\d(?:[–-]20\d\d)?)\s*—/)
  return m ? m[1] : null
}
// Заголовок без год-префикса «2011 — » / «2012–2016 — » (разметка grad-gold сохраняется)
function stripYear(h: string): string {
  return yearOf(h) ? h.replace(/^[^—]*—\s*/, '') : h
}

onMounted(() => {
  // Начальное скрытие включаем только при живом JS — без него весь текст виден (SEO/fallback)
  document.documentElement.classList.add('about-reveal')

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
      { threshold: 0, rootMargin: '-8% 0px -8% 0px' },
    )
    els.forEach(el => io.observe(el))
  }
  else {
    els.forEach(el => el.classList.add('in'))
  }

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // ===== Кино-интро: прокрутка проявляет лого из-под чёрных кино-полос,
  // увеличивает и растворяет. Показываем при каждой загрузке/обновлении страницы;
  // при prefers-reduced-motion — пропуск.
  const cine = document.querySelector<HTMLElement>('.cine')
  if (cine) {
    if (reduce) {
      cine.classList.add('is-skipped')
    }
    else {
      const overlay = cine.querySelector<HTMLElement>('.cine__overlay')
      const bg = cine.querySelector<HTMLElement>('.cine__bg')
      const logo = cine.querySelector<HTMLElement>('.cine__logo')
      const glow = cine.querySelector<HTMLElement>('.cine__glow')
      const barTop = cine.querySelector<HTMLElement>('.cine__bar--top')
      const barBot = cine.querySelector<HTMLElement>('.cine__bar--bottom')
      const hint = cine.querySelector<HTMLElement>('.cine__hint')
      const onCine = () => {
        const dist = window.innerHeight * 1.4 // сколько скролла занимает интро
        const t = Math.min(Math.max(window.scrollY / dist, 0), 1)
        // лого: сразу видно (чуть притушено) → УВЕЛИЧИВАЕТСЯ (зум) → растворяется,
        // сквозь него проявляется контент под оверлеем
        let o = 1
        if (t < 0.1) o = 0.6 + (t / 0.1) * 0.4
        else if (t > 0.5) o = Math.max(0, 1 - (t - 0.5) / 0.42)
        if (logo) {
          logo.style.opacity = String(o)
          logo.style.transform = `scale(${(0.9 + t * 2.6).toFixed(3)})` // зум до ~3.5
        }
        if (glow) glow.style.opacity = String(Math.max(0, o) * 0.85)
        // чёрный фон гаснет → текст проявляется сквозь зумящееся лого
        if (bg) bg.style.opacity = String(t < 0.38 ? 1 : Math.max(0, 1 - (t - 0.38) / 0.62))
        // кино-полосы раскрываются
        const barH = Math.max(0, 22 * (1 - Math.min(t / 0.5, 1)))
        if (barTop) barTop.style.height = `${barH}%`
        if (barBot) barBot.style.height = `${barH}%`
        // подсказка scroll гаснет
        if (hint) hint.style.opacity = String(Math.max(0, 1 - t / 0.12))
        // к концу оверлей отключаем, чтобы не мешал
        if (overlay) overlay.style.visibility = t >= 1 ? 'hidden' : 'visible'
      }
      window.addEventListener('scroll', onCine, { passive: true })
      window.addEventListener('resize', onCine, { passive: true })
      onCine()
      onBeforeUnmount(() => {
        window.removeEventListener('scroll', onCine)
        window.removeEventListener('resize', onCine)
      })
    }
  }

  // Шапка плавно уходит в тень при скролле — относительно собственного положения
  // (надёжно при наличии кино-интро сверху)
  const hero = document.querySelector<HTMLElement>('.about-hero')
  if (hero && !reduce) {
    const docTop = (el: HTMLElement | null) => {
      let y = 0
      let n: HTMLElement | null = el
      while (n) { y += n.offsetTop; n = n.offsetParent as HTMLElement | null }
      return y
    }
    let heroTop = docTop(hero)
    const onScroll = () => {
      const past = Math.max(0, window.scrollY - heroTop)
      const p = Math.min(past / 560, 1)
      hero.style.opacity = String(1 - p)
      hero.style.transform = `translateY(${(-past * 0.16).toFixed(1)}px)`
    }
    const onResize = () => { heroTop = docTop(hero); onScroll() }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })
    onScroll()
    onBeforeUnmount(() => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    })
  }
})
</script>

<template>
  <main class="about">
    <!-- Кино-интро: лого под чёрными кино-полосами + «scroll»; по скроллу
         раскрывается, увеличивается и растворяется. Один раз за сессию (JS). -->
    <div class="cine" aria-hidden="true">
      <div class="cine__runway" />
      <div class="cine__overlay">
        <div class="cine__bg" />
        <div class="cine__bar cine__bar--top" />
        <div class="cine__bar cine__bar--bottom" />
        <div class="cine__glow" />
        <img src="/logo-aff.webp" alt="" class="cine__logo">
        <div class="cine__hint"><span>Scroll</span><i /></div>
      </div>
    </div>

    <!-- Шапка раздела: текст выезжает слева, логотип — справа, встают рядом -->
    <header class="about-hero">
      <div class="about-hero__text">
        <h1>{{ c.heroTitle }}</h1>
        <p class="lead">{{ c.heroLead }}</p>
        <p>{{ c.heroP2 }}</p>
      </div>
      <figure class="about-hero__crest">
        <img src="/logo-aff.webp" alt="American Football Federation of Georgia" class="about-hero__logo">
      </figure>
    </header>

    <article class="prose">
      <section>
        <span class="yard-year" aria-hidden="true">2010</span>
        <h2 v-html="c.s2010.h2" />
        <p v-for="(p, i) in c.s2010.p" :key="i">{{ p }}</p>
      </section>

      <!-- Галерея раздела: coverflow-карусель (десктоп — перетаскивание,
           телефон — свайпы) -->
      <figure class="gallery">
        <PhotoCarousel :images="galleryImages" />
      </figure>

      <section>
        <span class="yard-year" aria-hidden="true">{{ yearOf(c.s2011.h2) }}</span>
        <h2 v-html="stripYear(c.s2011.h2)" />
        <p v-for="(p, i) in c.s2011.p" :key="i" v-html="p" />
      </section>

      <figure class="gallery">
        <PhotoCarousel :images="galleryImages2011" />
      </figure>

      <section>
        <span class="yard-year" aria-hidden="true">{{ yearOf(c.s2012.h2) }}</span>
        <h2 v-html="stripYear(c.s2012.h2)" />
        <p v-for="(p, i) in c.s2012.p" :key="i" v-html="p" />
      </section>

      <figure class="gallery">
        <PhotoCarousel :images="galleryImages2012" />
      </figure>

      <section>
        <span class="yard-year" aria-hidden="true">{{ yearOf(c.s2017.h2) }}</span>
        <h2 v-html="stripYear(c.s2017.h2)" />
        <p v-html="c.s2017.p1" />
        <p v-html="c.s2017.p2" />

        <div class="match match--logos">
          <span class="match__club">
            <img src="/logo-crusaders.png" alt="Tbilisi Crusaders" class="match__logo">
          </span>
          <span class="match__score">18 : 12</span>
          <span class="match__club">
            <img src="/logo-rustavi.png" alt="Rustavi Steelers" class="match__logo">
          </span>
        </div>

        <p v-html="c.s2017.pWin" />
      </section>

      <figure class="photo photo--img">
        <img src="/champ-2017.jpg" alt="2017 · первые чемпионы — Tbilisi Crusaders" loading="lazy">
      </figure>

      <section>
        <span class="yard-year" aria-hidden="true">{{ yearOf(c.s2018.h2) }}</span>
        <h2 v-html="stripYear(c.s2018.h2)" />
        <p v-html="c.s2018.p1" />

        <div class="match match--logos">
          <span class="match__club">
            <img src="/logo-rustavi.png" alt="Rustavi Steelers" class="match__logo">
          </span>
          <span class="match__score">24 : 18</span>
          <span class="match__club">
            <img src="/logo-crusaders.png" alt="Tbilisi Crusaders" class="match__logo">
          </span>
        </div>

        <p v-html="c.s2018.p2" />
      </section>

      <figure class="photo photo--img">
        <img src="/champ-2018.jpg" alt="2018 · первые чемпионы — Rustavi Steelers" loading="lazy">
      </figure>

      <section>
        <span class="yard-year" aria-hidden="true">{{ yearOf(c.s2019.h2) }}</span>
        <h2 v-html="stripYear(c.s2019.h2)" />
        <p>{{ c.s2019.intro }}</p>
        <ul>
          <li v-for="(team, i) in c.s2019.teams" :key="i">{{ team }}</li>
        </ul>

        <h3>{{ c.s2019.sokhumiH3 }}</h3>
        <p v-html="c.s2019.sokhumiP" />

        <div class="match match--logos">
          <span class="match__club">
            <img src="/logo-crusaders.png" alt="Tbilisi Crusaders" class="match__logo">
          </span>
          <span class="match__score">37 : 8</span>
          <span class="match__club match__club--plain">
            <img src="/logo-sokhumi.png" alt="Sokhumi Warriors" class="match__logo">
          </span>
        </div>

        <p>{{ c.s2019.sokhumiNote }}</p>

        <figure class="photo photo--img">
          <img src="/sokhumi-2019.jpg" alt="Sokhumi Warriors" loading="lazy">
        </figure>

        <h3>{{ c.s2019.westernH3 }}</h3>
        <p v-html="c.s2019.westernP" />

        <figure class="team-crest">
          <img src="/logo-westernbad.png" alt="Western Bad Boys" class="team-crest__img">
        </figure>
        <figure class="photo photo--img">
          <img src="/zugdidi-2019.jpg" alt="Western Bad Boys — команда из Зугдиди" loading="lazy">
        </figure>

        <h3>{{ c.s2019.steelersH3 }}</h3>
        <p>{{ c.s2019.steelersIntro }}</p>

        <div class="match match--logos">
          <span class="match__club">
            <img src="/logo-rustavi.png" alt="Rustavi Steelers" class="match__logo">
          </span>
          <span class="match__score">12 : 10</span>
          <span class="match__club">
            <img src="/logo-crusaders.png" alt="Tbilisi Crusaders" class="match__logo">
          </span>
        </div>

        <p>{{ c.s2019.champsLabel }}</p>
        <ul class="champs">
          <li><b>2017</b> — Tbilisi Crusaders</li>
          <li><b>2018</b> — Rustavi Steelers</li>
          <li><b>2019</b> — Rustavi Steelers</li>
        </ul>
      </section>

      <figure class="photo photo--img">
        <img src="/rustavi-champ-2019.jpg" alt="Rustavi Steelers — чемпионы 2019" loading="lazy">
      </figure>

      <section>
        <span class="yard-year" aria-hidden="true">{{ yearOf(c.s2020.h2) }}</span>
        <h2 v-html="stripYear(c.s2020.h2)" />
        <p v-html="c.s2020.p1" />

        <div class="match match--logos">
          <span class="match__club">
            <img src="/logo-rustavi.png" alt="Rustavi Steelers" class="match__logo">
          </span>
          <span class="match__score">12 : 6</span>
          <span class="match__club">
            <img src="/logo-crusaders.png" alt="Tbilisi Crusaders" class="match__logo">
          </span>
        </div>

        <figure class="gallery">
          <PhotoCarousel :images="galleryImages2020" />
        </figure>

        <p v-html="c.s2020.p2" />
      </section>

      <section>
        <span class="yard-year" aria-hidden="true">{{ yearOf(c.s2021.h2) }}</span>
        <h2 v-html="stripYear(c.s2021.h2)" />
        <p v-html="c.s2021.p1" />
        <p v-html="c.s2021.p2" />
      </section>

      <section>
        <h2 v-html="c.flag.h2" />
        <p v-html="c.flag.p1" />
        <p v-html="c.flag.p2" />
      </section>

      <figure class="gallery">
        <PhotoCarousel :images="galleryImagesFlag" />
      </figure>

      <section>
        <span class="yard-year" aria-hidden="true">{{ yearOf(c.s2024.h2) }}</span>
        <h2 v-html="stripYear(c.s2024.h2)" />
        <p v-html="c.s2024.p1" />

        <figure class="gallery">
          <PhotoCarousel :images="galleryImages2024" />
        </figure>
      </section>

      <section>
        <span class="yard-year" aria-hidden="true">{{ yearOf(c.bsb2025.h2) }}</span>
        <h2 v-html="stripYear(c.bsb2025.h2)" />
        <p v-html="c.bsb2025.p1" />

        <div class="match">
          <span class="match__team">
            <img src="/flag-georgia.webp" alt="Грузия" class="match__flag">
            Georgia
          </span>
          <span class="match__score">28 : 27</span>
          <span class="match__team">
            Poland
            <img src="/flag-poland.webp" alt="Польша" class="match__flag">
          </span>
        </div>

        <p>{{ c.bsb2025.p2 }}</p>

        <figure class="gallery">
          <PhotoCarousel :images="galleryImagesBSB" />
        </figure>
      </section>

      <section>
        <span class="yard-year" aria-hidden="true">{{ yearOf(c.bsb2026.h2) }}</span>
        <h2 v-html="stripYear(c.bsb2026.h2)" />
        <p>{{ c.bsb2026.p1 }}</p>
        <ul class="flags">
          <li v-for="(country, i) in c.bsb2026.countries" :key="i">
            <img :src="`/flags/${flagCodes[i]}.svg`" alt="" class="flag-ico"> {{ country }}
          </li>
        </ul>
        <p>{{ c.bsb2026.p2 }}</p>
      </section>

      <section class="highlight">
        <span class="yard-year" aria-hidden="true">{{ yearOf(c.tackle.h2) }}</span>
        <h2 v-html="stripYear(c.tackle.h2)" />
        <p v-html="c.tackle.p1" />
        <p v-html="c.tackle.p2" />
        <ul class="flags flags--lvl2">
          <li v-for="(country, i) in c.tackle.lvl2" :key="i">
            <img :src="`/flags/${['es', 'gb'][i]}.svg`" alt="" class="flag-ico"> {{ country }}
          </li>
        </ul>
        <p>{{ c.tackle.p3 }}</p>

        <div class="fixtures">
          <div class="fixture">
            <span class="fixture__date">{{ c.fixtures.date1 }}</span>
            <span class="fixture__teams">{{ c.fixtures.teams1 }}</span>
            <span class="fixture__place">{{ c.fixtures.place1 }}</span>
          </div>
          <div class="fixture">
            <span class="fixture__date">{{ c.fixtures.date2 }}</span>
            <span class="fixture__teams">{{ c.fixtures.teams2 }}</span>
            <span class="fixture__place">{{ c.fixtures.place2 }}</span>
          </div>
        </div>
      </section>

      <section class="finale">
        <h2 v-html="c.finale.h2" />
        <p v-html="c.finale.p1" />
        <p>{{ c.finale.intro }}</p>
        <ul class="teams-grid">
          <li>
            <span class="team-card__badge"><img src="/team-crusaders.jpg" alt="Tbilisi Crusaders"></span>
            <span class="team-card__name">Tbilisi Crusaders</span>
          </li>
          <li>
            <span class="team-card__badge"><img src="/team-rustavi.jpg" alt="Rustavi Steelers"></span>
            <span class="team-card__name">Rustavi Steelers</span>
          </li>
          <li>
            <span class="team-card__badge team-card__badge--fit"><img src="/team-kutaisi.png" alt="Kutaisi Lions"></span>
            <span class="team-card__name">Kutaisi Lions</span>
          </li>
          <li>
            <span class="team-card__badge"><img src="/team-afc.jpg" alt="AFC Tbilisi"></span>
            <span class="team-card__name">AFC Tbilisi</span>
          </li>
          <li>
            <span class="team-card__badge"><img src="/team-eagles.jpg" alt="Tbilisi Eagles"></span>
            <span class="team-card__name">Tbilisi Eagles</span>
          </li>
          <li>
            <span class="team-card__badge"><img src="/team-sokhumi.jpg" alt="Sokhumi Warriors"></span>
            <span class="team-card__name">Sokhumi Warriors</span>
          </li>
          <li>
            <span class="team-card__badge"><img src="/team-western.jpg" alt="Western Bad Boys"></span>
            <span class="team-card__name">Western Bad Boys</span>
          </li>
        </ul>
        <p v-html="c.finale.p2" />
        <p v-html="c.finale.p3" />
        <p v-html="c.finale.p4" />
        <p class="finale__path">{{ c.finale.path }}</p>
      </section>
    </article>
  </main>
</template>

<style scoped>
.about {
  position: relative;
  color: rgba(255, 255, 255, 0.82);
  /* верхний отступ перенесён в .about-hero — чтобы кино-интро начиналось от
     самого верха; боковой/нижний остаются */
  padding: 0 clamp(20px, 6vw, 48px) 120px;
  background: transparent;
}

/* ===== Шапка раздела: заголовок + вводный текст на фоне грузинского флага ===== */
.about-hero {
  position: relative;
  max-width: 1040px;
  margin: 0 auto 88px;
  padding-top: clamp(120px, 14vh, 180px);
  display: grid;
  grid-template-columns: 1.12fr 0.88fr;
  align-items: center;
  gap: clamp(20px, 4vw, 56px);
}
.about-hero__text { position: relative; }
/* Герб федерации — самостоятельный знак с золотым ореолом (не иллюстрация к тексту) */
.about-hero__crest {
  position: relative;
  margin: 0;
  justify-self: end;
  display: flex;
  align-items: center;
  justify-content: center;
}
/* Ореол за эмблемой + вечное «дыхание» свечения */
.about-hero__crest::before {
  content: "";
  position: absolute;
  inset: -20% -14%;
  z-index: 0;
  border-radius: 50%;
  background: radial-gradient(circle at 50% 46%,
    rgba(230, 200, 102, 0.34),
    rgba(201, 168, 76, 0.12) 42%,
    transparent 68%);
  filter: blur(16px);
  animation: crestBreath 6.5s ease-in-out infinite;
  pointer-events: none;
}
/* Логотип — яркий золотой объект, с мягким свечением */
.about-hero__logo {
  position: relative;
  z-index: 1;
  display: block;
  width: 100%;
  max-width: 380px;
  height: auto;
  filter: brightness(1.12) drop-shadow(0 0 30px rgba(230, 200, 102, 0.28));
}
@keyframes crestBreath {
  0%, 100% { opacity: 0.72; transform: scale(0.97); }
  50% { opacity: 1; transform: scale(1.05); }
}

/* ===== Кино-интро: лого увеличивается (зум) и растворяется, сквозь него
   проявляется контент. Раннвей даёт скролл, оверлей фиксирован поверх контента. */
.cine { position: relative; z-index: 2; }
.cine.is-skipped { display: none; }
.cine__runway { height: 140vh; } /* запас прокрутки под интро */
.cine__overlay {
  position: fixed;
  inset: 0;
  z-index: 40; /* поверх контента, под навбаром */
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  pointer-events: none;
}
/* Чёрный фон сцены — JS гасит его, открывая контент сквозь зум */
.cine__bg { position: absolute; inset: 0; z-index: 0; background: #000; }
/* Чёрные кино-полосы сверху/снизу — JS раскрывает их высоту к нулю */
.cine__bar {
  position: absolute;
  left: 0;
  right: 0;
  height: 22%;
  background: #000;
  z-index: 3;
  pointer-events: none;
}
.cine__bar--top { top: 0; box-shadow: 0 16px 34px rgba(0, 0, 0, 0.9); }
.cine__bar--bottom { bottom: 0; box-shadow: 0 -16px 34px rgba(0, 0, 0, 0.9); }
/* Золотой ореол за лого */
.cine__glow {
  position: absolute;
  z-index: 1;
  width: min(92vw, 620px);
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle,
    rgba(230, 200, 102, 0.3),
    rgba(201, 168, 76, 0.08) 45%,
    transparent 68%);
  filter: blur(26px);
  opacity: 0;
  pointer-events: none;
}
.cine__logo {
  position: relative;
  z-index: 2;
  width: min(72vw, 460px);
  height: auto;
  opacity: 0.6;
  transform: scale(0.9);
  transform-origin: center;
  filter: brightness(1.12) drop-shadow(0 0 34px rgba(230, 200, 102, 0.4));
  will-change: opacity, transform;
}
.cine__hint {
  position: absolute;
  bottom: 7vh;
  z-index: 4;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  color: rgba(255, 255, 255, 0.72);
  font-family: 'Oswald', sans-serif;
  font-size: 0.72rem;
  letter-spacing: 0.4em;
  text-indent: 0.4em;
  text-transform: uppercase;
}
.cine__hint i {
  width: 16px;
  height: 16px;
  border-right: 2px solid rgba(230, 200, 102, 0.85);
  border-bottom: 2px solid rgba(230, 200, 102, 0.85);
  transform: rotate(45deg);
  animation: cineChev 1.6s ease-in-out infinite;
}
@keyframes cineChev {
  0%, 100% { transform: translateY(0) rotate(45deg); opacity: 0.5; }
  50% { transform: translateY(5px) rotate(45deg); opacity: 1; }
}
@media (prefers-reduced-motion: reduce) { .cine__hint i { animation: none; } }
.about-hero h1 {
  margin: 0 0 24px;
  font-family: 'Oswald', 'Noto Serif Georgian', sans-serif;
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
    opacity 1s ease,
    transform 1s cubic-bezier(0.2, 0.75, 0.25, 1);
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
  font-family: 'Teko', 'Oswald', 'Noto Serif Georgian', sans-serif;
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
  font-family: 'Oswald', 'Noto Serif Georgian', sans-serif;
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
/* Подзаголовки глав — читаются как названия подразделов: капс, золотой градиент,
   акцентная метка слева (отличается от h2, у которого черта сверху) */
.prose h3 {
  position: relative;
  width: fit-content;
  margin: 40px 0 16px;
  font-family: 'Oswald', 'Noto Serif Georgian', sans-serif;
  font-weight: 600;
  font-size: clamp(1.12rem, 2.4vw, 1.5rem);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  line-height: 1.12;
  background: linear-gradient(90deg, #fff6d4 0%, #e6c866 55%, #c9a84c 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
/* Золотистый градиентный акцент для отдельных слов в заголовках/тексте.
   :deep — слова приходят из v-html и не несут scoped-атрибута компонента */
.prose :deep(.grad-gold) {
  background: linear-gradient(90deg, #fff6d4 0%, #e6c866 55%, #c9a84c 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
/* Красный акцент «Bowl» — в цвет логотипа Black Sea Bowl */
.prose :deep(.bsb-red) { color: #e21a2c; }
/* Лого турнира рядом с заголовком */
.prose h2 :deep(.h2-logo) {
  height: 2.2em;
  width: auto;
  vertical-align: middle;
  margin-left: 0.5em;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.5));
}
.prose p {
  margin: 0 0 16px;
  font-size: 1rem;
  line-height: 1.72;
}
/* strong тоже приходит из v-html — нужен :deep */
.prose :deep(strong) { color: #fff; font-weight: 600; }
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
.prose ul.flags {
  display: grid;
  grid-template-columns: repeat(2, auto);
  gap: 10px 48px;
  width: fit-content;
  margin: 18px auto 22px;
  justify-content: center;
}
.prose ul.flags li {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 4px 0;
}
.flag-ico {
  flex-shrink: 0;
  width: 34px;
  height: 23px;
  object-fit: cover;
  border-radius: 3px;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.22), 0 2px 6px rgba(0, 0, 0, 0.4);
}
.prose ul.teams-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
  margin: 22px 0 26px;
}
.prose ul.teams-grid li {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  padding: 6px;
  background: none;
  border: none;
  color: #fff;
  font-weight: 500;
}
.team-card__badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 128px;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  overflow: hidden;
}
.team-card__badge img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
/* Лого, которое нельзя кадрировать (выходит за круг) — показываем целиком */
.team-card__badge--fit {
  overflow: visible;
  border-radius: 0;
}
.team-card__badge--fit img {
  object-fit: contain;
}
.team-card__name {
  text-align: center;
  font-family: 'Oswald', 'Noto Serif Georgian', sans-serif;
  font-weight: 600;
  font-size: 1.05rem;
  line-height: 1.2;
  letter-spacing: 0.02em;
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
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  color: #fff;
  font-size: 0.98rem;
}
.match__team:first-child { justify-content: flex-end; text-align: right; }
.match__team:last-child { justify-content: flex-start; text-align: left; }
.match__flag {
  flex-shrink: 0;
  width: 36px;
  height: auto;
  border-radius: 3px;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.28), 0 2px 7px rgba(0, 0, 0, 0.45);
}

/* ===== Табло-счёт: два больших лого и крупный ярд-счёт между ними.
   Без панели и без «кружков» — лого на прозрачном фоне, под ним мягкая белая
   подложка (растворяется по краям), чтобы тёмные части лого читались. ===== */
.match--logos {
  background: none;
  border: none;
  padding: 0;
  gap: clamp(12px, 3vw, 40px);
  margin: 32px 0;
}
.match--logos .match__club {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.match--logos .match__club:first-child { justify-self: end; }
.match--logos .match__club:last-child { justify-self: start; }
/* Мягкая белая подложка под лого — без резких границ */
.match--logos .match__club::before {
  content: "";
  position: absolute;
  inset: -4%;
  z-index: 0;
  border-radius: 50%;
  background: radial-gradient(ellipse 52% 52% at 50% 50%,
    rgba(255, 255, 255, 0.95) 42%,
    rgba(255, 255, 255, 0.55) 62%,
    transparent 80%);
  filter: blur(5px);
  pointer-events: none;
}
/* Лого, которому белая подложка не нужна (уже контрастное на тёмном) */
.match__club--plain::before { display: none; }
.match__logo {
  position: relative;
  z-index: 1;
  width: clamp(120px, 30vw, 184px);
  height: clamp(120px, 30vw, 184px);
  object-fit: contain;
}
/* Счёт как цифры на табло в американском футболе — крупные градиентные, статичные */
.match--logos .match__score {
  font-family: 'Teko', 'Oswald', 'Noto Serif Georgian', sans-serif;
  font-weight: 700;
  font-size: clamp(3rem, 10vw, 5rem);
  line-height: 0.9;
  letter-spacing: 0.02em;
  filter: drop-shadow(0 3px 10px rgba(0, 0, 0, 0.6));
}

.match__score {
  font-family: 'Oswald', 'Noto Serif Georgian', sans-serif;
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
  font-family: 'Oswald', 'Noto Serif Georgian', sans-serif;
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

/* Эмблема команды (без матча/счёта) — по центру, без подложки */
.team-crest {
  margin: 28px 0 10px;
  display: flex;
  justify-content: center;
}
.team-crest__img {
  width: clamp(104px, 24vw, 148px);
  height: auto;
  filter: drop-shadow(0 8px 22px rgba(0, 0, 0, 0.6));
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
  font-family: 'Oswald', 'Noto Serif Georgian', sans-serif;
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
  /* На мобилке сначала идёт текст — герб из шапки убираем, лого покажем ниже
     отдельной «заставкой» при скролле */
  .about-hero__crest { display: none; }
  .about-reveal .about-hero__text,
  .about-reveal .prose > section,
  .about-reveal .prose > figure {
    transform: translateY(34px) scale(1);
  }
  .prose::before { left: -4px; }
  /* Отодвигаем текст и год-метки от оси-таймлайна, чтобы не липли к линии */
  .prose section { padding-left: 24px; }

  /* Кино-интро на телефоне — лого чуть меньше */
  .cine__logo { width: min(80vw, 360px); }
  .cine__bar { height: 18%; }
}

/* Уважаем системную настройку «меньше движения» — показываем сразу, без анимации */
@media (prefers-reduced-motion: reduce) {
  .about-reveal .about-hero__text,
  .about-reveal .about-hero__logo,
  .about-reveal .prose > section,
  .about-reveal .prose > figure {
    opacity: 1 !important;
    transform: none !important;
    filter: none !important;
    transition: none !important;
  }
  .about-hero__crest::before { animation: none; }
}

@media (max-width: 560px) {
  .match { grid-template-columns: 1fr; gap: 6px; text-align: center; }
  .match__team:first-child,
  .match__team:last-child { text-align: center; justify-content: center; }
  /* Табло держим в ряд (лого — счёт — лого), два больших лого и счёт по центру */
  .match--logos {
    grid-template-columns: 1fr auto 1fr;
    gap: clamp(2px, 1vw, 8px);
  }
  .match--logos .match__logo { width: clamp(92px, 27vw, 118px); height: clamp(92px, 27vw, 118px); }
  .match--logos .match__score { font-size: clamp(2.4rem, 13vw, 3.2rem); }
  .prose ul.flags { grid-template-columns: 1fr; }
  .about-hero { padding: 28px 22px; }
}
</style>
