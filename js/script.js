// Main JavaScript for Rice MSA Website
// Handles mobile navigation toggle and form interactions

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuIcon = document.getElementById('menuIcon');
    const navWrapper = document.getElementById('navWrapper');

    if (menuIcon && navWrapper) {
        menuIcon.addEventListener('click', function() {
            navWrapper.classList.toggle('active');
        });
    }

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = {
                topic: document.getElementById('topic').value,
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };

            // Here you would typically send the data to a backend
            // For now, we'll just show an alert
            alert('Thank you for your inquiry! We will get back to you within 24-48 hours.\n\n(Note: Form submission backend not yet implemented)');

            // Reset form
            contactForm.reset();
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});
