// Navbar background transition on scroll
const navbar = document.getElementById('navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

if (hamburger && navLinks) {
    const closeMobileMenu = () => {
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
    };

    hamburger.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    const closeWhenClickingOutside = event => {
        const clickedInsideNav = navLinks.contains(event.target);
        const clickedHamburger = hamburger.contains(event.target);

        if (!clickedInsideNav && !clickedHamburger) {
            closeMobileMenu();
        }
    };

    document.addEventListener('click', closeWhenClickingOutside);
    document.addEventListener('pointerdown', closeWhenClickingOutside);
    document.addEventListener('touchstart', closeWhenClickingOutside);
}

// Registration form enhancement. The actual submission is handled by Netlify Forms.
const forms = document.querySelectorAll('form[data-netlify="true"]');

forms.forEach(form => {
    const formMessage = form.querySelector('.form-message');
    const submitButton = form.querySelector('button[type="submit"]');

    const handleLocalPreviewSubmission = e => {
        const btn = form.querySelector('button[type="submit"]');
        const isLocalPreview = ['localhost', '127.0.0.1'].includes(window.location.hostname);

        if (isLocalPreview && form.checkValidity()) {
            e.preventDefault();
            form.reset();
            if (btn) {
                btn.innerText = 'SUBMIT REGISTRATION';
                btn.style.opacity = '1';
            }

            if (formMessage) {
                formMessage.innerText = 'Local preview mode: this form will submit when the site is deployed on Netlify.';
                formMessage.classList.remove('hidden');
            }

            return;
        }
    };

    if (submitButton) {
        submitButton.addEventListener('click', handleLocalPreviewSubmission);
    }

    form.addEventListener('submit', (e) => {
        handleLocalPreviewSubmission(e);

        if (e.defaultPrevented) {
            return;
        }

        const btn = form.querySelector('button[type="submit"]');

        if (btn) {
            btn.innerText = 'SUBMITTING...';
            btn.style.opacity = '0.8';
        }

        if (formMessage) {
            formMessage.innerText = 'Submitting your registration...';
            formMessage.classList.remove('hidden');
        }
    });
});

// Package detail page modal
const applyButtons = document.querySelectorAll('[data-open-apply]');
const applyModal = document.getElementById('applyModal');
const closeModalButtons = document.querySelectorAll('[data-close-modal]');
const selectedPackageInput = document.getElementById('selectedPackage');
const modalTitle = document.getElementById('modalTitle');

applyButtons.forEach(button => {
    button.addEventListener('click', () => {
        const packageName = button.dataset.package || 'Sprintsales package';

        if (selectedPackageInput) {
            selectedPackageInput.value = packageName;
        }

        if (modalTitle) {
            modalTitle.innerText = `Apply for ${packageName}`;
        }

        if (applyModal) {
            applyModal.classList.add('open');
            applyModal.setAttribute('aria-hidden', 'false');
        }
    });
});

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (applyModal) {
            applyModal.classList.remove('open');
            applyModal.setAttribute('aria-hidden', 'true');
        }
    });
});

document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && applyModal) {
        applyModal.classList.remove('open');
        applyModal.setAttribute('aria-hidden', 'true');
    }
});

// Interactive hover effects for timeline
const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.querySelector('.timeline-dot').style.transform = 'scale(1.5)';
    });
    item.addEventListener('mouseleave', () => {
        item.querySelector('.timeline-dot').style.transform = 'scale(1)';
    });
});
