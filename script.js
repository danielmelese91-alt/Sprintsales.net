// Navbar background transition on scroll
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Form submission handler
const form = document.getElementById('leadForm');
const formMessage = document.getElementById('formMessage');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Animate button state
    const btn = form.querySelector('button');
    const originalText = btn.innerText;
    btn.innerText = 'INITIALIZING...';
    btn.style.opacity = '0.8';
    
    // Simulate an API call
    setTimeout(() => {
        btn.innerText = originalText;
        btn.style.opacity = '1';
        
        // Form hide and show success message
        form.reset();
        formMessage.classList.remove('hidden');
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.classList.add('hidden');
        }, 5000);
    }, 1500);
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
