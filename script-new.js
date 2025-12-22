// Rice MSA Website - Main JavaScript
// Dark Mode Toggle & Mobile Menu Functionality

document.addEventListener('DOMContentLoaded', function() {
    // ============================================
    // DARK MODE TOGGLE
    // ============================================
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // Check for saved theme preference or default to 'light'
    const currentTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', currentTheme);

    // Update toggle state based on current theme
    if (currentTheme === 'dark') {
        darkModeToggle.classList.add('active');
    }

    // Dark mode toggle click handler
    darkModeToggle.addEventListener('click', function() {
        let theme = body.getAttribute('data-theme');

        if (theme === 'light') {
            body.setAttribute('data-theme', 'dark');
            darkModeToggle.classList.add('active');
            localStorage.setItem('theme', 'dark');
        } else {
            body.setAttribute('data-theme', 'light');
            darkModeToggle.classList.remove('active');
            localStorage.setItem('theme', 'light');
        }
    });

    // ============================================
    // MOBILE MENU TOGGLE
    // ============================================
    const menuIcon = document.getElementById('menuIcon');
    const navLinks = document.getElementById('navLinks');

    if (menuIcon && navLinks) {
        menuIcon.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = navLinks.contains(event.target);
            const isClickOnMenuIcon = menuIcon.contains(event.target);

            if (!isClickInsideMenu && !isClickOnMenuIcon && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    }

    // ============================================
    // CONTACT FORM HANDLING
    // ============================================
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

    // ============================================
    // SMOOTH SCROLLING FOR ANCHOR LINKS
    // ============================================
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

    // ============================================
    // KEYBOARD ACCESSIBILITY FOR DARK MODE
    // ============================================
    darkModeToggle.setAttribute('role', 'button');
    darkModeToggle.setAttribute('aria-label', 'Toggle dark mode');
    darkModeToggle.setAttribute('tabindex', '0');

    darkModeToggle.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            darkModeToggle.click();
        }
    });

    // ============================================
    // CONSOLE MESSAGE
    // ============================================
    console.log('%c🌙 Rice MSA Website', 'font-size: 20px; font-weight: bold; color: #93CBF8;');
    console.log('%c✨ Built with Jeju Myeongjo font and love', 'font-size: 12px; color: #666;');
    console.log('%cDark mode is ' + (currentTheme === 'dark' ? 'enabled' : 'disabled'), 'font-size: 12px;');
});
