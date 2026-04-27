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
    const submitButton = form.querySelector('button[type="submit"]');

    const handleLocalPreviewSubmission = e => {
        const btn = form.querySelector('button[type="submit"]');
        const formMessage = form.querySelector('.form-message');
        const isLocalPreview = ['localhost', '127.0.0.1'].includes(window.location.hostname);

        if (isLocalPreview && form.checkValidity()) {
            e.preventDefault();
            const originalText = btn?.dataset.originalText || btn?.innerText || 'SUBMIT';
            form.reset();
            if (btn) {
                btn.innerText = originalText;
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
        const formMessage = form.querySelector('.form-message');

        if (form.name === 'package-application') {
            e.preventDefault();

            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            const btn = form.querySelector('button[type="submit"]');
            const isLocalPreview = ['localhost', '127.0.0.1'].includes(window.location.hostname);
            if (btn) {
                btn.innerText = 'FINISHING...';
                btn.style.opacity = '0.8';
            }

            if (isLocalPreview) {
                if (applyModal) {
                    applyModal.classList.remove('open');
                    applyModal.setAttribute('aria-hidden', 'true');
                }
                form.reset();
                showSuccessPopup('Local preview mode: your live site will send this service registration to Netlify Forms.');
                if (btn) {
                    btn.innerText = 'FINISH REGISTRATION';
                    btn.style.opacity = '1';
                }
                return;
            }

            const data = new URLSearchParams(new FormData(form));

            fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: data.toString()
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Form submission failed');
                    }
                })
                .then(() => {
                    if (applyModal) {
                        applyModal.classList.remove('open');
                        applyModal.setAttribute('aria-hidden', 'true');
                    }
                    form.reset();
                    showSuccessPopup('Our team will review your answers in the next few hours and contact you with the next step.');
                })
                .catch(() => {
                    if (formMessage) {
                        formMessage.innerText = 'Something went wrong while submitting. Please try again or contact us directly.';
                        formMessage.classList.remove('hidden');
                    }
                })
                .finally(() => {
                    if (btn) {
                        btn.innerText = 'FINISH REGISTRATION';
                        btn.style.opacity = '1';
                    }
                });
            return;
        }

        handleLocalPreviewSubmission(e);

        if (e.defaultPrevented) {
            return;
        }

        const btn = form.querySelector('button[type="submit"]');

        if (btn) {
            btn.dataset.originalText = btn.innerText;
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

const applicationFormMarkup = selectedPackage => `
    <input type="hidden" name="form-name" value="package-application">
    <input type="hidden" id="selectedPackage" name="selectedPackage" value="${selectedPackage}">
    <p class="hidden"><label>Do not fill this out if you are human: <input name="bot-field"></label></p>
    <div class="application-step" data-application-step="details">
        <div class="form-row">
            <div class="form-group">
                <label for="fullName">Full Name</label>
                <input type="text" id="fullName" name="fullName" required>
            </div>
            <div class="form-group">
                <label for="businessName">Business Name</label>
                <input type="text" id="businessName" name="businessName" required>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label for="businessType">Type of Business</label>
                <select id="businessType" name="businessType" required>
                    <option value="">Select one</option>
                    <option value="Retail">Retail</option>
                    <option value="Service">Service</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Wholesale">Wholesale</option>
                    <option value="Import export">Import export</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <div class="form-group">
                <label for="businessAddress">Business Address</label>
                <input type="text" id="businessAddress" name="businessAddress" required>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label for="phone">Owner Phone Number</label>
                <input type="tel" id="phone" name="phone" required>
            </div>
            <div class="form-group">
                <label for="email">Owner Email Address</label>
                <input type="email" id="email" name="email" required>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label for="employees">Number of Employees</label>
                <select id="employees" name="employees" required>
                    <option value="">Select one</option>
                    <option value="1-5">1-5</option>
                    <option value="6-15">6-15</option>
                    <option value="16-50">16-50</option>
                    <option value="51+">51+</option>
                </select>
            </div>
            <div class="form-group">
                <label for="locations">Physical Locations</label>
                <select id="locations" name="locations" required>
                    <option value="">Select one</option>
                    <option value="One store or office">One store or office</option>
                    <option value="Multiple branches">Multiple branches</option>
                    <option value="Online only">Online only</option>
                    <option value="Warehouse or factory">Warehouse or factory</option>
                </select>
            </div>
        </div>
        <div class="form-group">
            <label for="discoverySource">How did you hear about us?</label>
            <select id="discoverySource" name="discoverySource" required>
                <option value="">Select one</option>
                <option value="From people">From people</option>
                <option value="Search">Search</option>
                <option value="AI recommendation">AI recommendation</option>
                <option value="Social media">Social media</option>
                <option value="Other">Other</option>
            </select>
        </div>
        <div class="form-group">
            <label for="goals">What do you want this system to help you achieve?</label>
            <textarea id="goals" name="goals" rows="4" required></textarea>
        </div>
        <button type="button" class="btn-primary full-width" data-show-agreement>Register - Let's Build</button>
    </div>
    <div class="application-step hidden" data-application-step="agreement">
        <div class="agreement-box">
            <h3>Service Registration Agreement</h3>
            <p>This registration confirms your interest in starting a Sprintsales service package. After submission,
            our team reviews your information, confirms package fit, and contacts you before any payment, final
            timeline, or legal service agreement is activated.</p>
            <p>Project scope, delivery timeline, payment terms, responsibilities, and support conditions are finalized
            only after both sides review and approve the official service agreement.</p>
        </div>
        <label class="consent-row" for="agreementAccepted">
            <input type="checkbox" id="agreementAccepted" name="agreementAccepted" value="Agreed">
            <span>I have read this registration agreement and agree to continue.</span>
        </label>
        <button type="submit" class="btn-primary full-width">Finish Registration</button>
        <button type="button" class="btn-secondary full-width" data-back-to-application>Back to details</button>
    </div>
    <div class="form-message hidden"></div>
`;

applyButtons.forEach(button => {
    button.addEventListener('click', () => {
        const packageName = button.dataset.package || 'Sprintsales package';
        const modalForm = applyModal ? applyModal.querySelector('form[name="package-application"]') : null;

        if (modalForm && !modalForm.querySelector('[data-application-step="details"]')) {
            modalForm.innerHTML = applicationFormMarkup(packageName);
            wireApplicationForm(modalForm);
        }

        const currentPackageInput = document.getElementById('selectedPackage');
        if (currentPackageInput) {
            currentPackageInput.value = packageName;
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

const showSuccessPopup = message => {
    const popup = document.createElement('div');
    popup.className = 'success-popup';
    popup.innerHTML = `
        <div class="success-card glass-card">
            <p class="eyebrow">Registration received</p>
            <h2>We accepted your registration.</h2>
            <p>${message}</p>
            <button type="button" class="btn-primary" data-success-done>Done</button>
        </div>
    `;
    document.body.appendChild(popup);
    popup.querySelector('[data-success-done]').addEventListener('click', () => popup.remove());
};

function wireApplicationForm(form) {
    const detailStep = form.querySelector('[data-application-step="details"]');
    const agreementStep = form.querySelector('[data-application-step="agreement"]');
    const agreementCheckbox = form.querySelector('#agreementAccepted');
    const nextButton = form.querySelector('[data-show-agreement]');
    const backButton = form.querySelector('[data-back-to-application]');

    if (nextButton && detailStep && agreementStep) {
        nextButton.addEventListener('click', () => {
            const detailFields = detailStep.querySelectorAll('input, select, textarea');
            const allValid = Array.from(detailFields).every(field => field.reportValidity());
            if (!allValid) return;
            detailStep.classList.add('hidden');
            agreementStep.classList.remove('hidden');
            if (agreementCheckbox) agreementCheckbox.required = true;
        });
    }

    if (backButton && detailStep && agreementStep) {
        backButton.addEventListener('click', () => {
            agreementStep.classList.add('hidden');
            detailStep.classList.remove('hidden');
            if (agreementCheckbox) agreementCheckbox.required = false;
        });
    }
}

document.querySelectorAll('form[name="package-application"]').forEach(form => {
    if (!form.querySelector('[data-application-step="details"]')) {
        const selected = form.querySelector('[name="selectedPackage"]')?.value || 'Sprintsales package';
        form.innerHTML = applicationFormMarkup(selected);
    }
    wireApplicationForm(form);
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
