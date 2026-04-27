const navbar = document.getElementById('navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

const isLocalPreview = ['localhost', '127.0.0.1'].includes(window.location.hostname);
const submissionsKey = 'sprintsalesSubmissions';
const heroSlidesKey = 'sprintsalesHeroSlides';
const aboutContentKey = 'sprintsalesAboutContent';
const teamContentKey = 'sprintsalesTeamContent';
const portfolioContentKey = 'sprintsalesPortfolioContent';
const adminCredentialHash = '985ea6da09ca9412c7af3ae6ba0283ab34a63efd34d54275c9db8e1a1d87b48d';

const defaultHeroSlides = [
    {
        title: 'Team sprint',
        subtitle: 'Strategy, build, train, hand over.',
        image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80',
        alt: 'Marketing team planning a client growth system'
    },
    {
        title: 'Digital showroom',
        subtitle: 'Websites that support sales conversations.',
        image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80',
        alt: 'Team reviewing a digital project'
    },
    {
        title: 'Sales visibility',
        subtitle: 'Lead capture and reporting made practical.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
        alt: 'Analytics dashboard for business growth'
    },
    {
        title: 'Client systems',
        subtitle: 'Automation that supports real teams.',
        image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80',
        alt: 'Modern office setup for client work'
    },
    {
        title: 'Portfolio preview',
        subtitle: 'Work samples will live here as we publish them.',
        image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1200&q=80',
        alt: 'Business team discussing a project'
    }
];

const defaultAboutContent = {
    headline: 'We build the sales systems strong businesses need next.',
    intro: 'Sprintsales started from a simple observation: many Ethiopian businesses already have good products, loyal customers, and real ambition, but their digital presence does not yet support the way modern buyers discover, compare, and decide.',
    storyTitle: 'From marketing ideas to operating systems.',
    storyText: 'We are building Sprintsales as a practical growth partner: not just a design agency, not just a social media team, but a team that connects website, social commerce, customer service automation, and training into one working system.',
    portfolioIntro: 'We will use this section to show websites, social commerce setups, automation flows, and before/after examples as projects are approved for public display.'
};

const defaultTeam = [
    {
        name: 'Abel',
        role: 'Co-founder, strategy and systems',
        email: 'abel@sprintsales.net',
        education: 'Business development and digital systems',
        experience: 'Digital strategy, client operations, sales systems',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80',
        bio: 'Abel leads strategy and client systems, turning business goals into practical digital sales infrastructure clients can understand and manage.'
    },
    {
        name: 'Mahlet',
        role: 'Co-founder, customer experience',
        email: 'mahlet@sprintsales.net',
        education: 'Customer experience and brand communication',
        experience: 'Customer experience, brand presentation, team enablement',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
        bio: 'Mahlet leads customer experience and brand presentation, making each system clear, trustworthy, and easy for teams to use after launch.'
    }
];

const defaultPortfolio = [
    {
        title: 'Retail lead capture preview',
        category: 'Digital sales system',
        mediaType: 'image',
        media: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80',
        description: 'A sample space for future public case studies, including the problem, solution, and result.'
    }
];

const escapeHtml = value => String(value || '').replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
}[character]));

const getStoredArray = (key, fallback, limit = 20) => {
    try {
        const stored = JSON.parse(localStorage.getItem(key) || '[]');
        return Array.isArray(stored) && stored.length ? stored.slice(0, limit) : fallback;
    } catch {
        return fallback;
    }
};

const getStoredObject = (key, fallback) => {
    try {
        const stored = JSON.parse(localStorage.getItem(key) || '{}');
        return Object.keys(stored).length ? { ...fallback, ...stored } : fallback;
    } catch {
        return fallback;
    }
};

window.addEventListener('scroll', () => {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

if (hamburger && navLinks) {
    const closeMobileMenu = () => {
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
    };

    hamburger.addEventListener('click', event => {
        event.stopPropagation();
        const isOpen = navLinks.classList.toggle('open');
        hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    ['click', 'pointerdown', 'touchstart'].forEach(eventName => {
        document.addEventListener(eventName, event => {
            if (!navLinks.contains(event.target) && !hamburger.contains(event.target)) {
                closeMobileMenu();
            }
        });
    });
}

const getStoredSlides = () => {
    return getStoredArray(heroSlidesKey, defaultHeroSlides, 5);
};

const renderHeroSlides = () => {
    const showcase = document.querySelector('.hero-showcase');
    if (!showcase) return;

    const slides = getStoredSlides();
    showcase.innerHTML = slides.map((slide, index) => `
        <div class="hero-slide ${index === 0 ? 'is-active' : ''}">
            <img src="${slide.image}" alt="${slide.alt || slide.title || 'Sprintsales work preview'}">
            <div class="hero-slide-caption">
                <span>${slide.title || 'Sprintsales'}</span>
                <strong>${slide.subtitle || 'Digital sales systems for growing businesses.'}</strong>
            </div>
        </div>
    `).join('') + `
        <div class="hero-slide-controls" aria-hidden="true">
            ${slides.map((_, index) => `<span class="${index === 0 ? 'is-active' : ''}"></span>`).join('')}
        </div>
    `;
};

renderHeroSlides();

const renderAboutPageContent = () => {
    const aboutContent = getStoredObject(aboutContentKey, defaultAboutContent);
    const team = getStoredArray(teamContentKey, defaultTeam, 8);
    const portfolio = getStoredArray(portfolioContentKey, defaultPortfolio, 12);

    document.querySelectorAll('[data-about-field]').forEach(element => {
        const key = element.dataset.aboutField;
        if (aboutContent[key]) element.textContent = aboutContent[key];
    });

    const portfolioIntro = document.querySelector('[data-portfolio-intro]');
    if (portfolioIntro) portfolioIntro.textContent = aboutContent.portfolioIntro;

    const teamList = document.querySelector('[data-team-list]');
    if (teamList) {
        teamList.innerHTML = team.map(member => `
            <article class="team-card">
                <img src="${escapeHtml(member.image)}" alt="${escapeHtml(member.name)} profile photo">
                <div>
                    <span>${escapeHtml(member.role)}</span>
                    <h3>${escapeHtml(member.name)}</h3>
                    <p>${escapeHtml(member.bio)}</p>
                    <small><strong>Education:</strong> ${escapeHtml(member.education)}</small>
                    <small><strong>Experience:</strong> ${escapeHtml(member.experience)}</small>
                    ${member.email ? `<a href="mailto:${escapeHtml(member.email)}">${escapeHtml(member.email)}</a>` : ''}
                </div>
            </article>
        `).join('');
    }

    const portfolioList = document.querySelector('[data-portfolio-list]');
    if (portfolioList) {
        portfolioList.innerHTML = portfolio.map(item => `
            <article class="portfolio-card">
                ${item.mediaType === 'video'
                    ? `<video src="${escapeHtml(item.media)}" controls muted playsinline></video>`
                    : `<img src="${escapeHtml(item.media)}" alt="${escapeHtml(item.title)}">`}
                <div>
                    <span>${escapeHtml(item.category)}</span>
                    <h3>${escapeHtml(item.title)}</h3>
                    <p>${escapeHtml(item.description)}</p>
                </div>
            </article>
        `).join('');
    }
};

renderAboutPageContent();

const heroSlides = document.querySelectorAll('.hero-slide');
const heroDots = document.querySelectorAll('.hero-slide-controls span');
let activeHeroSlide = 0;

if (heroSlides.length > 1) {
    setInterval(() => {
        heroSlides[activeHeroSlide].classList.remove('is-active');
        heroDots[activeHeroSlide]?.classList.remove('is-active');
        activeHeroSlide = (activeHeroSlide + 1) % heroSlides.length;
        heroSlides[activeHeroSlide].classList.add('is-active');
        heroDots[activeHeroSlide]?.classList.add('is-active');
    }, 4200);
}

const saveSubmission = (type, form) => {
    const data = Object.fromEntries(new FormData(form).entries());
    const record = {
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        type,
        createdAt: new Date().toISOString(),
        data
    };

    try {
        const existing = JSON.parse(localStorage.getItem(submissionsKey) || '[]');
        existing.unshift(record);
        localStorage.setItem(submissionsKey, JSON.stringify(existing.slice(0, 200)));
    } catch {
        localStorage.setItem(submissionsKey, JSON.stringify([record]));
    }

    return record;
};

const postToNetlify = form => {
    if (isLocalPreview || !form.dataset.netlify) {
        return Promise.resolve();
    }

    const data = new URLSearchParams(new FormData(form));
    return fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: data.toString()
    }).catch(() => undefined);
};

const showSuccessPopup = message => {
    const popup = document.createElement('div');
    popup.className = 'success-popup';
    popup.innerHTML = `
        <div class="success-card glass-card">
            <p class="eyebrow">Request received</p>
            <h2>Done. We have your details.</h2>
            <p>${message}</p>
            <button type="button" class="btn-primary" data-success-done>Done</button>
        </div>
    `;
    document.body.appendChild(popup);
    popup.querySelector('[data-success-done]').addEventListener('click', () => popup.remove());
};

const resetSubmitButton = (button, text) => {
    if (!button) return;
    button.innerText = text;
    button.style.opacity = '1';
};

const handleMeetingSubmission = form => {
    form.addEventListener('submit', event => {
        event.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const button = form.querySelector('button[type="submit"]');
        const originalText = button?.innerText || 'Book meeting';
        const formMessage = form.querySelector('.form-message');

        if (button) {
            button.innerText = 'Sending...';
            button.style.opacity = '0.75';
        }

        saveSubmission('Free meeting', form);
        postToNetlify(form).finally(() => {
            form.reset();
            resetSubmitButton(button, originalText);
            if (formMessage) {
                formMessage.innerText = 'Received. We will confirm your meeting time with you shortly.';
                formMessage.classList.remove('hidden');
            }
            showSuccessPopup('We will review your request, confirm the best available meeting time, and explain how Sprintsales may help your business.');
        });
    });
};

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
        <div class="form-row">
            <div class="form-group">
                <label for="currentChannels">Current online channels</label>
                <select id="currentChannels" name="currentChannels" required>
                    <option value="">Select one</option>
                    <option value="No active online channel">No active online channel</option>
                    <option value="Social media only">Social media only</option>
                    <option value="Website only">Website only</option>
                    <option value="Website and social media">Website and social media</option>
                </select>
            </div>
            <div class="form-group">
                <label for="startTimeline">Preferred start timeline</label>
                <select id="startTimeline" name="startTimeline" required>
                    <option value="">Select one</option>
                    <option value="Immediately">Immediately</option>
                    <option value="Within 2 weeks">Within 2 weeks</option>
                    <option value="Within 1 month">Within 1 month</option>
                    <option value="Still comparing options">Still comparing options</option>
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
            <p>This registration confirms your interest in starting a Sprintsales service package. After submission, our team reviews your information, confirms package fit, and contacts you before any payment, final timeline, or legal service agreement is activated.</p>
            <p>Project scope, delivery timeline, payment terms, responsibilities, and support conditions are finalized only after both sides review and approve the official service agreement.</p>
        </div>
        <label class="consent-row" for="agreementAccepted">
            <input type="checkbox" id="agreementAccepted" name="agreementAccepted" value="Agreed">
            <span>I have read this registration agreement and agree to continue.</span>
        </label>
        <button type="submit" class="btn-primary full-width">Finish registration</button>
        <button type="button" class="btn-secondary full-width" data-back-to-application>Back to details</button>
    </div>
    <div class="form-message hidden"></div>
`;

const applyButtons = document.querySelectorAll('[data-open-apply]');
const applyModal = document.getElementById('applyModal');
const closeModalButtons = document.querySelectorAll('[data-close-modal]');
const modalTitle = document.getElementById('modalTitle');

function wireApplicationForm(form) {
    const detailStep = form.querySelector('[data-application-step="details"]');
    const agreementStep = form.querySelector('[data-application-step="agreement"]');
    const agreementCheckbox = form.querySelector('#agreementAccepted');
    const nextButton = form.querySelector('[data-show-agreement]');
    const backButton = form.querySelector('[data-back-to-application]');

    nextButton?.addEventListener('click', () => {
        const detailFields = detailStep.querySelectorAll('input, select, textarea');
        const allValid = Array.from(detailFields).every(field => field.reportValidity());
        if (!allValid) return;
        detailStep.classList.add('hidden');
        agreementStep.classList.remove('hidden');
        if (agreementCheckbox) agreementCheckbox.required = true;
    });

    backButton?.addEventListener('click', () => {
        agreementStep.classList.add('hidden');
        detailStep.classList.remove('hidden');
        if (agreementCheckbox) agreementCheckbox.required = false;
    });
}

applyButtons.forEach(button => {
    button.addEventListener('click', () => {
        const packageName = button.dataset.package || 'Sprintsales package';
        const modalForm = applyModal?.querySelector('form[name="package-application"]');

        if (modalForm) {
            modalForm.innerHTML = applicationFormMarkup(packageName);
            wireApplicationForm(modalForm);
        }

        if (modalTitle) {
            modalTitle.innerText = `Apply for ${packageName}`;
        }

        applyModal?.classList.add('open');
        applyModal?.setAttribute('aria-hidden', 'false');
    });
});

document.querySelectorAll('form[name="package-application"]').forEach(form => {
    const selected = form.querySelector('[name="selectedPackage"]')?.value || 'Sprintsales package';
    form.innerHTML = applicationFormMarkup(selected);
    wireApplicationForm(form);

    form.addEventListener('submit', event => {
        event.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const button = form.querySelector('button[type="submit"]');
        const originalText = button?.innerText || 'Finish registration';

        if (button) {
            button.innerText = 'Finishing...';
            button.style.opacity = '0.75';
        }

        saveSubmission('Service application', form);
        postToNetlify(form).finally(() => {
            form.reset();
            resetSubmitButton(button, originalText);
            applyModal?.classList.remove('open');
            applyModal?.setAttribute('aria-hidden', 'true');
            showSuccessPopup('Our team will review your answers in the next few hours and contact you with the best next step.');
        });
    });
});

document.querySelectorAll('form[name="meeting-booking"]').forEach(handleMeetingSubmission);

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        applyModal?.classList.remove('open');
        applyModal?.setAttribute('aria-hidden', 'true');
    });
});

document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
        applyModal?.classList.remove('open');
        applyModal?.setAttribute('aria-hidden', 'true');
    }
});

document.querySelectorAll('.timeline-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        const dot = item.querySelector('.timeline-dot');
        if (dot) dot.style.transform = 'scale(1.5)';
    });
    item.addEventListener('mouseleave', () => {
        const dot = item.querySelector('.timeline-dot');
        if (dot) dot.style.transform = 'scale(1)';
    });
});

const adminApp = document.querySelector('[data-admin-app]');

if (adminApp) {
    const authForm = document.getElementById('adminAuthForm');
    const authMessage = document.getElementById('adminAuthMessage');
    const lockScreen = document.querySelector('[data-admin-lock]');
    const slidesForm = document.getElementById('heroSlidesForm');
    const aboutForm = document.getElementById('aboutContentForm');
    const teamForm = document.getElementById('teamContentForm');
    const portfolioForm = document.getElementById('portfolioContentForm');
    const submissionsList = document.getElementById('adminSubmissions');
    const resetSlidesButton = document.querySelector('[data-reset-slides]');
    const resetTeamButton = document.querySelector('[data-reset-team]');
    const resetPortfolioButton = document.querySelector('[data-reset-portfolio]');
    const clearSubmissionsButton = document.querySelector('[data-clear-submissions]');
    let adminUnlocked = false;

    const hashCredential = async credential => {
        if (!crypto?.subtle) {
            let hash = 0;
            for (let index = 0; index < credential.length; index += 1) {
                hash = ((hash << 5) - hash) + credential.charCodeAt(index);
                hash |= 0;
            }
            return `fallback-${hash}`;
        }

        const encoded = new TextEncoder().encode(credential);
        const digest = await crypto.subtle.digest('SHA-256', encoded);
        return Array.from(new Uint8Array(digest)).map(byte => byte.toString(16).padStart(2, '0')).join('');
    };

    const unlockAdmin = () => {
        adminUnlocked = true;
        adminApp.classList.remove('admin-locked');
        lockScreen?.classList.add('hidden');
        renderAllAdmin();
    };

    authForm?.addEventListener('submit', async event => {
        event.preventDefault();
        const email = authForm.adminEmail.value.trim().toLowerCase();
        const passcode = authForm.adminPasscode.value;
        const passHash = await hashCredential(`${email}:${passcode}`);

        if (passHash === adminCredentialHash) {
            unlockAdmin();
        } else if (authMessage) {
            authMessage.innerText = 'Incorrect admin email or password.';
            authMessage.classList.remove('hidden');
        }
    });

    const renderSlideFields = () => {
        const slides = getStoredSlides();
        slidesForm.innerHTML = slides.map((slide, index) => `
            <div class="admin-slide">
                <h3>Hero slide ${index + 1}</h3>
                <label>Title<input name="title-${index}" value="${escapeHtml(slide.title)}"></label>
                <label>Caption<input name="subtitle-${index}" value="${escapeHtml(slide.subtitle)}"></label>
                <label>Image URL<input name="image-${index}" value="${escapeHtml(slide.image)}"></label>
                <label>Upload image<input type="file" accept="image/*" data-file-target="image-${index}"></label>
                <label>Alt text<input name="alt-${index}" value="${escapeHtml(slide.alt)}"></label>
            </div>
        `).join('') + '<button type="submit" class="btn-primary">Save hero slides</button>';
    };

    const renderAboutFields = () => {
        const aboutContent = getStoredObject(aboutContentKey, defaultAboutContent);
        aboutForm.innerHTML = `
            <label>Hero headline<textarea name="headline" rows="2">${escapeHtml(aboutContent.headline)}</textarea></label>
            <label>Hero intro<textarea name="intro" rows="4">${escapeHtml(aboutContent.intro)}</textarea></label>
            <label>Story title<textarea name="storyTitle" rows="2">${escapeHtml(aboutContent.storyTitle)}</textarea></label>
            <label>Story text<textarea name="storyText" rows="5">${escapeHtml(aboutContent.storyText)}</textarea></label>
            <label>Portfolio intro<textarea name="portfolioIntro" rows="3">${escapeHtml(aboutContent.portfolioIntro)}</textarea></label>
            <button type="submit" class="btn-primary">Save About content</button>
        `;
    };

    const renderTeamFields = () => {
        const team = getStoredArray(teamContentKey, defaultTeam, 8);
        teamForm.innerHTML = team.map((member, index) => `
            <div class="admin-slide">
                <h3>Staff profile ${index + 1}</h3>
                <label>Name<input name="name-${index}" value="${escapeHtml(member.name)}"></label>
                <label>Role<input name="role-${index}" value="${escapeHtml(member.role)}"></label>
                <label>Email<input name="email-${index}" value="${escapeHtml(member.email)}"></label>
                <label>Education<input name="education-${index}" value="${escapeHtml(member.education)}"></label>
                <label>Experience<input name="experience-${index}" value="${escapeHtml(member.experience)}"></label>
                <label>Photo URL<input name="image-${index}" value="${escapeHtml(member.image)}"></label>
                <label>Upload photo<input type="file" accept="image/*" data-file-target="image-${index}"></label>
                <label>Bio<textarea name="bio-${index}" rows="4">${escapeHtml(member.bio)}</textarea></label>
            </div>
        `).join('') + '<button type="submit" class="btn-primary">Save team profiles</button>';
    };

    const renderPortfolioFields = () => {
        const portfolio = getStoredArray(portfolioContentKey, defaultPortfolio, 12);
        const rows = [...portfolio, ...Array.from({ length: Math.max(0, 4 - portfolio.length) }, () => ({
            title: '',
            category: '',
            mediaType: 'image',
            media: '',
            description: ''
        }))].slice(0, 8);

        portfolioForm.innerHTML = rows.map((item, index) => `
            <div class="admin-slide">
                <h3>Portfolio item ${index + 1}</h3>
                <label>Title<input name="title-${index}" value="${escapeHtml(item.title)}"></label>
                <label>Category<input name="category-${index}" value="${escapeHtml(item.category)}"></label>
                <label>Media type
                    <select name="mediaType-${index}">
                        <option value="image" ${item.mediaType !== 'video' ? 'selected' : ''}>Image</option>
                        <option value="video" ${item.mediaType === 'video' ? 'selected' : ''}>Video</option>
                    </select>
                </label>
                <label>Image or video URL<input name="media-${index}" value="${escapeHtml(item.media)}"></label>
                <label>Upload image or video<input type="file" accept="image/*,video/*" data-file-target="media-${index}"></label>
                <label>Description<textarea name="description-${index}" rows="4">${escapeHtml(item.description)}</textarea></label>
            </div>
        `).join('') + '<button type="submit" class="btn-primary">Save portfolio</button>';
    };

    const renderSubmissions = () => {
        let submissions = [];
        try {
            submissions = JSON.parse(localStorage.getItem(submissionsKey) || '[]');
        } catch {
            submissions = [];
        }

        if (!submissions.length) {
            submissionsList.innerHTML = '<p class="admin-empty">No local submissions yet. Test the meeting or application forms and they will appear here.</p>';
            return;
        }

        submissionsList.innerHTML = submissions.map(item => `
            <article class="admin-record">
                <div>
                    <span>${item.type}</span>
                    <strong>${item.data.fullName || item.data.businessName || 'New request'}</strong>
                    <small>${new Date(item.createdAt).toLocaleString()}</small>
                </div>
                <dl>
                    ${Object.entries(item.data)
                        .filter(([key, value]) => value && key !== 'form-name' && key !== 'bot-field')
                        .map(([key, value]) => `<dt>${key}</dt><dd>${value}</dd>`)
                        .join('')}
                </dl>
            </article>
        `).join('');
    };

    const renderAllAdmin = () => {
        if (!adminUnlocked) return;
        renderSlideFields();
        renderAboutFields();
        renderTeamFields();
        renderPortfolioFields();
        renderSubmissions();
    };

    slidesForm.addEventListener('submit', event => {
        event.preventDefault();
        const formData = new FormData(slidesForm);
        const nextSlides = Array.from({ length: 5 }, (_, index) => ({
            title: formData.get(`title-${index}`),
            subtitle: formData.get(`subtitle-${index}`),
            image: formData.get(`image-${index}`),
            alt: formData.get(`alt-${index}`)
        })).filter(slide => slide.image);

        localStorage.setItem(heroSlidesKey, JSON.stringify(nextSlides));
        showSuccessPopup('Hero slide content has been saved for this browser preview.');
    });

    adminApp.addEventListener('change', event => {
        const input = event.target;
        if (!input.matches('[data-file-target]') || !input.files?.length) return;

        const file = input.files[0];
        const form = input.closest('form');
        const target = form?.querySelector(`[name="${input.dataset.fileTarget}"]`);
        if (!target) return;

        const reader = new FileReader();
        reader.addEventListener('load', () => {
            target.value = reader.result;
        });
        reader.readAsDataURL(file);
    });

    aboutForm?.addEventListener('submit', event => {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(aboutForm).entries());
        localStorage.setItem(aboutContentKey, JSON.stringify(data));
        showSuccessPopup('About page content has been saved for this browser preview.');
    });

    teamForm?.addEventListener('submit', event => {
        event.preventDefault();
        const data = new FormData(teamForm);
        const nextTeam = Array.from({ length: 8 }, (_, index) => ({
            name: data.get(`name-${index}`),
            role: data.get(`role-${index}`),
            email: data.get(`email-${index}`),
            education: data.get(`education-${index}`),
            experience: data.get(`experience-${index}`),
            image: data.get(`image-${index}`),
            bio: data.get(`bio-${index}`)
        })).filter(member => member.name || member.image || member.bio);

        localStorage.setItem(teamContentKey, JSON.stringify(nextTeam));
        showSuccessPopup('Team profiles have been saved for this browser preview.');
    });

    portfolioForm?.addEventListener('submit', event => {
        event.preventDefault();
        const data = new FormData(portfolioForm);
        const nextPortfolio = Array.from({ length: 8 }, (_, index) => ({
            title: data.get(`title-${index}`),
            category: data.get(`category-${index}`),
            mediaType: data.get(`mediaType-${index}`),
            media: data.get(`media-${index}`),
            description: data.get(`description-${index}`)
        })).filter(item => item.title || item.media || item.description);

        localStorage.setItem(portfolioContentKey, JSON.stringify(nextPortfolio));
        showSuccessPopup('Portfolio items have been saved for this browser preview.');
    });

    resetSlidesButton?.addEventListener('click', () => {
        localStorage.removeItem(heroSlidesKey);
        renderSlideFields();
        showSuccessPopup('Hero slides have been reset to the temporary sample images.');
    });

    resetTeamButton?.addEventListener('click', () => {
        localStorage.removeItem(teamContentKey);
        renderTeamFields();
        showSuccessPopup('Team profiles have been reset.');
    });

    resetPortfolioButton?.addEventListener('click', () => {
        localStorage.removeItem(portfolioContentKey);
        renderPortfolioFields();
        showSuccessPopup('Portfolio items have been reset.');
    });

    clearSubmissionsButton?.addEventListener('click', () => {
        localStorage.removeItem(submissionsKey);
        renderSubmissions();
        showSuccessPopup('Local submission records were cleared.');
    });
}
