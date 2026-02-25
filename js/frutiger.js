// ============================================
// FRUTIGER AERO OVERLAY — Easter Egg
// Triggered when username = "Zakariya" on admin login
// ============================================

function activateFrutigerAero() {
    // Load the stylesheet dynamically if not already loaded
    if (!document.getElementById('frutigerStylesheet')) {
        const link = document.createElement('link');
        link.id = 'frutigerStylesheet';
        link.rel = 'stylesheet';
        // Find the path to css/ relative to the current page
        const scriptTag = document.querySelector('script[src*="frutiger.js"]');
        const scriptSrc = scriptTag ? scriptTag.src : '';
        const cssPath = scriptSrc.replace('js/frutiger.js', 'css/frutiger_style.css');
        link.href = cssPath;
        document.head.appendChild(link);
    }

    // Build the overlay HTML
    const overlay = document.createElement('div');
    overlay.id = 'frutigerOverlay';
    overlay.style.cssText = `
        position: fixed;
        inset: 0;
        z-index: 99999;
        overflow: hidden;
        font-family: 'Oxanium', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background: linear-gradient(180deg, #2563a3 0%, #1a4d7a 30%, #0d3d66 60%, #4db8e8 100%);
        opacity: 0;
        transition: opacity 0.8s ease;
    `;

    overlay.innerHTML = `
        <!-- Bubbles -->
        <div class="bubbles-container">
            <div class="bubble"></div>
            <div class="bubble"></div>
            <div class="bubble"></div>
            <div class="bubble"></div>
            <div class="bubble"></div>
            <div class="bubble"></div>
            <div class="bubble"></div>
            <div class="bubble"></div>
        </div>

        <!-- Water canvas -->
        <canvas id="waterCanvas"></canvas>

        <!-- Waves -->
        <div class="wave-container">
            <div class="wave"></div>
            <div class="wave wave2"></div>
            <div class="wave wave3"></div>
        </div>

        <!-- Main content -->
        <div class="main-container">

            <!-- Title -->
            <div class="title-container">
                <div class="main-title">RICE MSA</div>
            </div>

            <!-- Search bar -->
            <div class="search-container">
                <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input class="search-input" type="text" placeholder="Search...">
            </div>

            <!-- Top right icons -->
            <div class="top-right-icons">
                <div class="icon-button" id="frutigerClose" title="Exit (Esc)">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </div>
            </div>

            <!-- Cards row -->
            <div class="cards-row">
                <div class="card">
                    <div class="card-title">EVENTS</div>
                    <div class="card-single-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" style="width:60px;height:60px;filter:drop-shadow(0 0 10px rgba(160,220,255,0.6))">
                            <rect x="3" y="4" width="18" height="18" rx="2"/>
                            <line x1="16" y1="2" x2="16" y2="6"/>
                            <line x1="8" y1="2" x2="8" y2="6"/>
                            <line x1="3" y1="10" x2="21" y2="10"/>
                        </svg>
                    </div>
                </div>
                <div class="card">
                    <div class="card-title">PRAYER TIMES</div>
                    <div class="card-single-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" style="width:60px;height:60px;filter:drop-shadow(0 0 10px rgba(160,220,255,0.6))">
                            <circle cx="12" cy="12" r="9"/>
                            <polyline points="12 7 12 12 15 15"/>
                        </svg>
                    </div>
                </div>
                <div class="card">
                    <div class="card-title">RESOURCES</div>
                    <div class="card-single-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" style="width:60px;height:60px;filter:drop-shadow(0 0 10px rgba(160,220,255,0.6))">
                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                        </svg>
                    </div>
                </div>
                <div class="card">
                    <div class="card-title">ABOUT US</div>
                    <div class="card-single-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" style="width:60px;height:60px;filter:drop-shadow(0 0 10px rgba(160,220,255,0.6))">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                            <circle cx="9" cy="7" r="4"/>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                        </svg>
                    </div>
                </div>
                <div class="card">
                    <div class="card-title">GET CONNECTED</div>
                    <div class="card-single-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" style="width:60px;height:60px;filter:drop-shadow(0 0 10px rgba(160,220,255,0.6))">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.82a16 16 0 0 0 6 6l1.27-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                        </svg>
                    </div>
                </div>
            </div>

            <!-- Dock -->
            <div class="dock">
                <div class="dock-item">
                    <div class="dock-icon">
                        <svg class="globe-icon" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5">
                            <circle cx="12" cy="12" r="10"/>
                            <line x1="2" y1="12" x2="22" y2="12"/>
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                        </svg>
                    </div>
                    <span class="dock-label">HOME</span>
                </div>
                <div class="dock-item">
                    <div class="dock-icon">
                        <svg class="monitor-icon" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5">
                            <rect x="3" y="3" width="18" height="14" rx="2"/>
                            <polyline points="8 21 12 17 16 21"/>
                            <line x1="8" y1="21" x2="16" y2="21"/>
                        </svg>
                    </div>
                    <span class="dock-label">CONTACT</span>
                </div>
                <div class="dock-item">
                    <div class="dock-icon">
                        <svg style="width:70px;height:70px" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                        </svg>
                    </div>
                    <span class="dock-label">DONATE</span>
                </div>
            </div>

        </div>
    `;

    document.body.appendChild(overlay);

    // Load Oxanium font
    if (!document.getElementById('oxaniumFont')) {
        const fontLink = document.createElement('link');
        fontLink.id = 'oxaniumFont';
        fontLink.rel = 'stylesheet';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Oxanium:wght@400;500;600;700&display=swap';
        document.head.appendChild(fontLink);
    }

    // Fade in
    requestAnimationFrame(() => {
        requestAnimationFrame(() => { overlay.style.opacity = '1'; });
    });

    // Water canvas animation
    initWaterCanvas();

    // Close handlers
    document.getElementById('frutigerClose').addEventListener('click', deactivateFrutigerAero);
    document.addEventListener('keydown', frutigerEscapeHandler);
}

function frutigerEscapeHandler(e) {
    if (e.key === 'Escape') deactivateFrutigerAero();
}

function deactivateFrutigerAero() {
    const overlay = document.getElementById('frutigerOverlay');
    if (!overlay) return;
    overlay.style.opacity = '0';
    setTimeout(() => overlay.remove(), 800);
    document.removeEventListener('keydown', frutigerEscapeHandler);
}

function initWaterCanvas() {
    const canvas = document.getElementById('waterCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const ripples = [];

    // Spawn ripples periodically
    setInterval(() => {
        if (!document.getElementById('frutigerOverlay')) return;
        ripples.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: 0,
            maxRadius: 80 + Math.random() * 80,
            opacity: 0.4,
            speed: 0.8 + Math.random() * 0.8,
        });
    }, 600);

    function drawFrame() {
        if (!document.getElementById('frutigerOverlay')) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = ripples.length - 1; i >= 0; i--) {
            const r = ripples[i];
            r.radius += r.speed;
            r.opacity -= 0.005;

            if (r.opacity <= 0 || r.radius > r.maxRadius) {
                ripples.splice(i, 1);
                continue;
            }

            ctx.beginPath();
            ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(160, 220, 255, ${r.opacity})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
        }

        requestAnimationFrame(drawFrame);
    }

    drawFrame();
}
