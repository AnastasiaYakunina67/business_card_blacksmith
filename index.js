const modal = document.getElementById('modal');
const closeBtn = document.querySelector('.close');
const selectedServiceSpan = document.getElementById('selectedService');
const consultationBtn = document.querySelector('.consultation-btn');
const serviceItems = document.querySelectorAll('.uslugi-item');

function openModal(serviceName = '') {
    if (serviceName) {
        selectedServiceSpan.textContent = serviceName;
    } else {
        selectedServiceSpan.textContent = 'Консультация';
    }
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    document.getElementById('applicationForm').reset();
}

serviceItems.forEach(item => {
    item.addEventListener('click', () => {
        const serviceName = item.getAttribute('data-service');
        openModal(serviceName);
    });
});

if (consultationBtn) {
    consultationBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    });
}

closeBtn.addEventListener('click', closeModal);

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

const form = document.getElementById('applicationForm');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    alert('Спасибо за заявку! Я свяжусь с вами в ближайшее время.');
    closeModal();
});

const burgerMenu = document.querySelector('.burger-menu');
const spisokHeader = document.querySelector('.spisok-header');

if (burgerMenu) {
    burgerMenu.addEventListener('click', () => {
        spisokHeader.classList.toggle('active');
    });
}

const navLinks = document.querySelectorAll('.spisok-header a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            spisokHeader.classList.remove('active');
        }
    });
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.about-card, .uslugi-item, .material-item, .galery-img, .spicok-cont, .but').forEach(el => {
    observer.observe(el);
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        closeModal();
    }
});