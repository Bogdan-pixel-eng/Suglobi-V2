// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const item = button.parentElement;
        const isActive = item.classList.contains('active');

        document.querySelectorAll('.faq-item').forEach(el => {
            el.classList.remove('active');
        });

        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header background on scroll
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.background = 'rgba(15, 10, 10, 0.98)';
    } else {
        header.style.background = 'rgba(15, 10, 10, 0.92)';
    }
});

// Mobile menu toggle
const mobileBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('nav');

if (mobileBtn && nav) {
    mobileBtn.addEventListener('click', () => {
        if (nav.style.display === 'flex') {
            nav.style.display = 'none';
        } else {
            nav.style.display = 'flex';
            nav.style.position = 'absolute';
            nav.style.top = '64px';
            nav.style.left = '0';
            nav.style.right = '0';
            nav.style.background = 'rgba(15, 10, 10, 0.98)';
            nav.style.flexDirection = 'column';
            nav.style.padding = '20px';
            nav.style.gap = '16px';
            nav.style.alignItems = 'center';
            nav.style.borderBottom = '1px solid rgba(200, 16, 46, 0.3)';
        }
    });
}

// Order form
const orderForm = document.getElementById('orderForm');
if (orderForm) {
    orderForm.addEventListener('submit', function (e) {
        e.preventDefault();
        alert('Дякуємо! Ми надішлемо рецепт найближчим часом.');
        orderForm.reset();
    });
}

// Review form — зберігає лише локально (localStorage), у загальний список не потрапляє
(function () {
    const form = document.getElementById('reviewForm');
    const box = document.getElementById('myReviewBox');
    const thanks = document.getElementById('reviewThanks');
    const KEY = 'arthrofixin_my_review_v1';

    function showMine(data) {
        if (!box || !data) return;
        document.getElementById('myReviewText').textContent = '«' + data.text + '»';
        document.getElementById('myReviewMeta').textContent =
            (data.name || 'Анонім') + (data.city ? ', ' + data.city : '') + ' · щойно';
        box.style.display = 'block';
        if (form) form.style.display = 'none';
        if (thanks) thanks.style.display = 'block';
    }

    // Показати свій відгук, якщо вже лишав у цьому браузері
    try {
        const saved = localStorage.getItem(KEY);
        if (saved) showMine(JSON.parse(saved));
    } catch (e) {}

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = (document.getElementById('rname').value || '').trim();
            const city = (document.getElementById('rcity').value || '').trim();
            const text = (document.getElementById('rtext').value || '').trim();
            if (!name || !text) return;

            const data = { name: name, city: city, text: text, ts: Date.now() };
            try {
                localStorage.setItem(KEY, JSON.stringify(data));
            } catch (err) {}

            showMine(data);
            form.reset();
        });
    }
})();
