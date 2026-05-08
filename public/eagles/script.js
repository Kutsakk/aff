document.addEventListener('DOMContentLoaded', () => {

    // ---- LOADER ----
    const loader = document.getElementById('loader');
    const site = document.getElementById('site');

    if (loader && site) {
        setTimeout(() => {
            loader.classList.add('fade-out');
            site.classList.remove('hidden');

            setTimeout(() => {
                loader.style.display = 'none';
            }, 800);

        }, 3000);
    }

    // ---- PARTICLES ----
    const particlesContainer = document.getElementById('particles');

    if (particlesContainer) {
        for (let i = 0; i < 40; i++) {
            const p = document.createElement('div');

            p.classList.add('particle');
            p.style.left = Math.random() * 100 + '%';
            p.style.top = 60 + Math.random() * 40 + '%';
            p.style.animationDelay = Math.random() * 4 + 's';
            p.style.animationDuration = 3 + Math.random() * 3 + 's';
            p.style.width = 1 + Math.random() * 3 + 'px';
            p.style.height = p.style.width;

            particlesContainer.appendChild(p);
        }
    }

    // ---- NAVBAR ----
    const navbar = document.getElementById('navbar');

    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('visible', window.scrollY > 100);
        });
    }

    // ---- SCROLL ANIMATIONS ----
    const observer = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }

        });

    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll(
        '.section-title, .section-line, .section-subtitle, .player-card, .team-photo-wrapper, .federation-logo-wrapper, .timeline-item, .youtube-card'
    ).forEach((el) => {

        observer.observe(el);

    });

    // ---- MODAL ----
    const modal = document.getElementById('player-modal');
    const modalName = document.getElementById('modal-name');
    const modalMainImg = document.getElementById('modal-main-img');
    const modalThumbs = document.getElementById('modal-thumbs');
    const modalBio = document.getElementById('modal-bio');
    const modalAchievements = document.getElementById('modal-achievements');
    const photoCurrent = document.getElementById('photo-current');
    const photoTotal = document.getElementById('photo-total');

    let currentPhotos = [];
    let currentPhotoIndex = 0;

    function isSectionLabel(text) {

        const trimmed = text.trim();

        return !/[0-9]/.test(trimmed) && trimmed.length <= 35;

    }

    function openModal(card) {

        if (!window.PLAYERS_DATA) {
            console.error('PLAYERS_DATA not found');
            return;
        }

        const playerKey = card.dataset.player;
        const player = PLAYERS_DATA[playerKey];

        if (!player) {
            console.error('Player not found');
            return;
        }

        const name = player.name;

        const photos = Array.isArray(player.photos) && player.photos.length
            ? player.photos
            : ['photo/eagles.jpg'];

        const achievements = Array.isArray(player.achievements)
            ? player.achievements
            : [];

        currentPhotos = photos;
        currentPhotoIndex = 0;

        modalName.textContent = name;
        modalBio.textContent = player.bio || '';

        modalMainImg.src = photos[0];
        modalMainImg.alt = name;

        photoCurrent.textContent = '1';
        photoTotal.textContent = photos.length;

        modalThumbs.innerHTML = '';

        photos.forEach((src, i) => {

            const img = document.createElement('img');

            img.src = src;
            img.alt = name;

            img.addEventListener('error', () => {
                img.src = 'photo/eagles.jpg';
            });

            if (i === 0) {
                img.classList.add('active');
            }

            img.addEventListener('click', () => goToPhoto(i));

            modalThumbs.appendChild(img);

        });

        modalAchievements.innerHTML = '';

        achievements.forEach((text) => {

            const li = document.createElement('li');

            li.textContent = text.trim();

            if (isSectionLabel(text)) {
                li.classList.add('section-label');
            }

            modalAchievements.appendChild(li);

        });

        modal.classList.add('active');
        document.body.classList.add('modal-open');

    }

    function closeModal() {

        modal.classList.remove('active');
        document.body.classList.remove('modal-open');

    }

    function goToPhoto(index) {

        currentPhotoIndex = index;

        modalMainImg.src = currentPhotos[index];
        modalMainImg.alt = modalName.textContent;

        photoCurrent.textContent = index + 1;

        modalThumbs.querySelectorAll('img').forEach((img, i) => {

            img.classList.toggle('active', i === index);

        });

    }

    if (modalMainImg) {

        modalMainImg.addEventListener('error', () => {

            modalMainImg.src = 'photo/eagles.jpg';

        });

    }

    const prevBtn = document.querySelector('.photo-prev');

    if (prevBtn) {

        prevBtn.addEventListener('click', () => {

            const newIndex = currentPhotoIndex <= 0
                ? currentPhotos.length - 1
                : currentPhotoIndex - 1;

            goToPhoto(newIndex);

        });

    }

    const nextBtn = document.querySelector('.photo-next');

    if (nextBtn) {

        nextBtn.addEventListener('click', () => {

            const newIndex = currentPhotoIndex >= currentPhotos.length - 1
                ? 0
                : currentPhotoIndex + 1;

            goToPhoto(newIndex);

        });

    }

    document.querySelectorAll('.player-card').forEach((card) => {

        card.addEventListener('click', () => openModal(card));

    });

    const closeBtn = document.querySelector('.modal-close');

    if (closeBtn) {

        closeBtn.addEventListener('click', closeModal);

    }

    const backdrop = document.querySelector('.modal-backdrop');

    if (backdrop) {

        backdrop.addEventListener('click', closeModal);

    }

    document.addEventListener('keydown', (e) => {

        if (e.key === 'Escape') {
            closeModal();
        }

        if (modal && modal.classList.contains('active')) {

            if (e.key === 'ArrowLeft') {

                const newIndex = currentPhotoIndex <= 0
                    ? currentPhotos.length - 1
                    : currentPhotoIndex - 1;

                goToPhoto(newIndex);

            }

            if (e.key === 'ArrowRight') {

                const newIndex = currentPhotoIndex >= currentPhotos.length - 1
                    ? 0
                    : currentPhotoIndex + 1;

                goToPhoto(newIndex);

            }

        }

    });

    // ---- CARD TILT ----
    document.querySelectorAll('.player-card').forEach((card) => {

        card.addEventListener('mousemove', (e) => {

            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / centerY * -4;
            const rotateY = (x - centerX) / centerX * 4;

            card.style.transform =
                `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

        });

        card.addEventListener('mouseleave', () => {

            card.style.transform = '';

        });

    });

    // ---- SMOOTH SCROLL ----
    document.querySelectorAll('a[href^="#"]').forEach((link) => {

        link.addEventListener('click', (e) => {

            e.preventDefault();

            const target =
                document.querySelector(link.getAttribute('href'));

            if (target) {

                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

            }

        });

    });

});