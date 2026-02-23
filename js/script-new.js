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

    // ============================================
    // ADMIN LOGIN
    // ============================================

    // Inject overlay and label into the page
    document.body.insertAdjacentHTML('beforeend', `
        <div id="adminOverlay">
            <div id="adminLoginBox">
                <input type="text" id="adminUsername" placeholder="Username" autocomplete="off">
                <input type="password" id="adminPassword" placeholder="Password" autocomplete="off">
                <div id="adminLoginError"></div>
                <button id="adminLoginBtn">Login</button>
            </div>
        </div>
        <div id="adminLabel">administrator</div>
    `);

    const adminOverlay = document.getElementById('adminOverlay');
    const adminLabel = document.getElementById('adminLabel');
    const adminLoginBtn = document.getElementById('adminLoginBtn');
    const adminLoginError = document.getElementById('adminLoginError');

    // Restore session if already logged in
    if (sessionStorage.getItem('msaAdmin') === 'true') {
        adminLabel.classList.add('active');
    }

    // MSA held for 5 seconds logic
    const REQUIRED_KEYS = new Set(['m', 's', 'a']);
    const heldKeys = new Set();
    let adminTimer = null;

    document.addEventListener('keydown', function (e) {
        const key = e.key.toLowerCase();
        if (!REQUIRED_KEYS.has(key)) return;
        heldKeys.add(key);

        if (heldKeys.size === 3 && !adminTimer) {
            adminTimer = setTimeout(function () {
                if (heldKeys.size === 3) {
                    adminOverlay.classList.add('active');
                    document.getElementById('adminUsername').focus();
                }
            }, 5000);
        }
    });

    document.addEventListener('keyup', function (e) {
        const key = e.key.toLowerCase();
        if (REQUIRED_KEYS.has(key)) {
            heldKeys.delete(key);
            if (adminTimer) {
                clearTimeout(adminTimer);
                adminTimer = null;
            }
        }
    });

    // Login button handler
    adminLoginBtn.addEventListener('click', function () {
        const password = document.getElementById('adminPassword').value;
        if (password === 'R!CEM$A_JMZ') {
            sessionStorage.setItem('msaAdmin', 'true');
            adminOverlay.classList.remove('active');
            adminLabel.classList.add('active');
            adminLoginError.textContent = '';
            document.getElementById('adminPassword').value = '';
            document.getElementById('adminUsername').value = '';
        } else {
            adminLoginError.textContent = 'Incorrect password.';
            document.getElementById('adminPassword').value = '';
        }
    });

    // Allow pressing Enter to submit
    document.getElementById('adminPassword').addEventListener('keydown', function (e) {
        if (e.key === 'Enter') adminLoginBtn.click();
    });
});
