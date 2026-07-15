/* ============================================
   SCRIPT.JS — COMPLETE WEBSITE FUNCTIONALITY
   FULLY UPGRADED FOR NEW HTML + CSS
   ============================================ */

(function() {
    'use strict';

    /* ============================================
       CONFIGURATION
       ============================================ */
    const CONFIG = {
        matrix: {
            chars: 'rravirajhere',
            fontSize: 14,
            interval: 35
        },
        typewriter: {
            speed: 15,
            threshold: 0.3
        },
        animation: {
            delay: 5000,
            duration: 1000
        },
        scroll: {
            showButtonAt: 300
        }
    };

    /* ============================================
       DOM CACHE
       ============================================ */
    const DOM = {
        matrixCanvas: document.getElementById('matrix-bg'),
        heroPhoto: document.getElementById('hero-photo'),
        skillBars: document.querySelectorAll('.skill-bar-fill'),
        navLinks: document.querySelectorAll('a[href^="#"]'),
        navItems: document.querySelectorAll('.nav-links a'),
        themeToggle: document.getElementById('theme-toggle'),
        toggleIcon: document.querySelector('.premium-toggle .toggle-icon'),
        toggleTooltip: document.querySelector('.premium-toggle .toggle-tooltip'),
        lastUpdated: document.getElementById('lastUpdated'),
        timeDisplay: document.getElementById('current-date-time'),
        scrollTopBtn: document.getElementById('scrollTopBtn'),
        body: document.body,
        sections: document.querySelectorAll('section[id]')
    };

    /* ============================================
       MATRIX RAIN EFFECT
       ============================================ */
    class MatrixEffect {
        constructor(canvas, chars, fontSize) {
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            this.chars = chars;
            this.fontSize = fontSize;
            this.drops = [];
            this.intervalId = null;
            this.isActive = true;

            this.init();
            this.start();
            this.bindEvents();
        }

        init() {
            this.resizeCanvas();
            const columns = Math.floor(this.canvas.width / this.fontSize);
            this.drops = Array(columns).fill(1);
        }

        resizeCanvas() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }

        draw() {
            if (!this.isActive) return;

            const ctx = this.ctx;
            ctx.fillStyle = 'rgba(15, 15, 26, 0.05)';
            ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

            ctx.fillStyle = '#f472b6';
            ctx.font = `${this.fontSize}px Fira Code`;

            for (let i = 0; i < this.drops.length; i++) {
                const char = this.chars[Math.floor(Math.random() * this.chars.length)];
                const x = i * this.fontSize;
                const y = this.drops[i] * this.fontSize;

                ctx.fillText(char, x, y);

                if (y > this.canvas.height && Math.random() > 0.975) {
                    this.drops[i] = 0;
                }
                this.drops[i]++;
            }
        }

        start() {
            this.intervalId = setInterval(() => this.draw(), CONFIG.matrix.interval);
        }

        stop() {
            if (this.intervalId) {
                clearInterval(this.intervalId);
                this.intervalId = null;
            }
        }

        toggle(active) {
            this.isActive = active;
            if (active) {
                this.start();
            } else {
                this.stop();
            }
        }

        bindEvents() {
            let resizeTimeout;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => {
                    this.resizeCanvas();
                    this.init();
                }, 250);
            });

            document.addEventListener('visibilitychange', () => {
                this.toggle(!document.hidden);
            });
        }

        destroy() {
            this.stop();
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }

    /* ============================================
       TYPEWRITER EFFECT
       ============================================ */
    class TypewriterEffect {
        constructor(elements, speed) {
            this.elements = elements;
            this.speed = speed;
            this.observer = null;
            this.init();
        }

        init() {
            const targets = Array.from(this.elements).filter(el =>
                ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(el.tagName)
            );

            targets.forEach(el => {
                const text = el.textContent.trim();
                if (text) {
                    el.dataset.text = text;
                    el.textContent = '';
                    el.style.opacity = '0';
                }
            });

            this.setupObserver(targets);
        }

        setupObserver(elements) {
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !entry.target.classList.contains('typed')) {
                        entry.target.classList.add('typed');
                        this.typeWriter(entry.target);
                    }
                });
            }, { threshold: CONFIG.typewriter.threshold });

            elements.forEach(el => {
                if (el.dataset.text) {
                    this.observer.observe(el);
                }
            });
        }

        typeWriter(element) {
            const text = element.dataset.text;
            let index = 0;
            element.style.opacity = '1';

            function typing() {
                if (index < text.length) {
                    element.textContent += text.charAt(index);
                    index++;
                    setTimeout(typing, CONFIG.typewriter.speed);
                }
            }

            typing();
        }

        destroy() {
            if (this.observer) {
                this.observer.disconnect();
            }
        }
    }

    /* ============================================
       SKILL BARS ANIMATION
       ============================================ */
    class SkillBars {
        constructor(bars) {
            this.bars = bars;
            this.observer = null;
            this.init();
        }

        init() {
            Array.from(this.bars).forEach(bar => {
                const width = bar.style.width;
                bar.dataset.width = width;
                bar.style.width = '0%';
            });

            this.setupObserver();
        }

        setupObserver() {
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const bar = entry.target;
                        bar.style.width = bar.dataset.width;
                    }
                });
            }, { threshold: 0.5 });

            Array.from(this.bars).forEach(bar => {
                this.observer.observe(bar);
            });
        }

        destroy() {
            if (this.observer) {
                this.observer.disconnect();
            }
        }
    }

    /* ============================================
       SMOOTH SCROLL
       ============================================ */
    class SmoothScroll {
        constructor(links) {
            this.links = links;
            this.init();
        }

        init() {
            Array.from(this.links).forEach(anchor => {
                anchor.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = anchor.getAttribute('href');
                    const target = document.querySelector(targetId);

                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                        history.pushState(null, '', targetId);
                    }
                });
            });
        }

        destroy() {
            Array.from(this.links).forEach(anchor => {
                anchor.removeEventListener('click', () => {});
            });
        }
    }

    /* ============================================
       LIVE DATE TIME
       ============================================ */
    class LiveDateTime {
        constructor(displayElement) {
            this.display = displayElement;
            this.intervalId = null;

            if (this.display) {
                this.start();
            }
        }

        update() {
            try {
                const now = new Date();
                const day = String(now.getDate()).padStart(2, '0');
                const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                ];
                const month = monthNames[now.getMonth()];
                const year = now.getFullYear();
                const hours = String(now.getHours()).padStart(2, '0');
                const minutes = String(now.getMinutes()).padStart(2, '0');
                const seconds = String(now.getSeconds()).padStart(2, '0');

                this.display.textContent = `📅 ${day} ${month} ${year} | 🕐 ${hours}:${minutes}:${seconds}`;
            } catch (error) {
                console.error('Error updating time:', error);
                this.display.textContent = '⏳ Time unavailable';
            }
        }

        start() {
            this.update();
            this.intervalId = setInterval(() => this.update(), 1000);
        }

        stop() {
            if (this.intervalId) {
                clearInterval(this.intervalId);
                this.intervalId = null;
            }
        }

        destroy() {
            this.stop();
        }
    }

    /* ============================================
       LAST UPDATED
       ============================================ */
    function setLastUpdated(element) {
        if (!element) return;

        try {
            const date = new Date(document.lastModified);
            const options = { year: 'numeric', month: 'short', day: 'numeric' };
            element.textContent = date.toLocaleDateString('en-US', options);
        } catch (error) {
            console.error('Error setting last updated:', error);
            element.textContent = 'Today';
        }
    }

    /* ============================================
       PHOTO ANIMATION
       ============================================ */
    function setupPhotoAnimation(photo) {
        if (!photo) return;

        setTimeout(() => {
            photo.classList.add('fly-in-photo');
        }, CONFIG.animation.delay);
    }

    /* ============================================
       ACTIVE NAV LINK ON SCROLL
       ============================================ */
    function updateActiveNav() {
        const sections = DOM.sections;
        const navLinks = DOM.navItems;

        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    /* ============================================
       SCROLL TO TOP — SHOW/HIDE
       ============================================ */
    function handleScrollToTop() {
        const btn = DOM.scrollTopBtn;
        if (!btn) return;

        if (window.scrollY > CONFIG.scroll.showButtonAt) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    /* ============================================
       THEME MANAGER — FULLY UPGRADED
       ============================================ */
    class ThemeManager {
        constructor(button, body, icon, tooltip) {
            this.button = button;
            this.body = body;
            this.icon = icon;
            this.tooltip = tooltip;
            this.isToggling = false;
            this.init();
        }

        init() {
            if (!this.button) {
                console.warn('Theme button not found');
                return;
            }

            // Load saved theme
            const savedTheme = localStorage.getItem('theme');
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

            if (savedTheme === 'light') {
                this.setLightMode();
            } else if (savedTheme === 'dark') {
                this.setDarkMode();
            } else {
                if (prefersDark) {
                    this.setDarkMode();
                } else {
                    this.setLightMode();
                }
            }

            this.button.addEventListener('click', () => {
                if (this.isToggling) return;
                this.isToggling = true;

                if (this.body.classList.contains('light-mode')) {
                    this.setDarkMode();
                } else {
                    this.setLightMode();
                }

                if (this.icon) {
                    this.icon.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
                    this.icon.style.transform = 'rotate(360deg)';
                    setTimeout(() => {
                        this.icon.style.transform = 'rotate(0deg)';
                        this.isToggling = false;
                    }, 600);
                } else {
                    this.isToggling = false;
                }
            });
        }

        setLightMode() {
            this.body.classList.add('light-mode');
            if (this.button) this.button.textContent = '☀️';
            if (this.icon) this.icon.textContent = '☀️';
            if (this.tooltip) this.tooltip.textContent = 'Switch to Dark Mode';
            localStorage.setItem('theme', 'light');
        }

        setDarkMode() {
            this.body.classList.remove('light-mode');
            if (this.button) this.button.textContent = '🌙';
            if (this.icon) this.icon.textContent = '🌙';
            if (this.tooltip) this.tooltip.textContent = 'Switch to Light Mode';
            localStorage.setItem('theme', 'dark');
        }

        destroy() {
            if (this.button) {
                this.button.removeEventListener('click', () => {});
            }
        }
    }

    /* ============================================
       MODAL FUNCTIONS
       ============================================ */

    // === RJ Achieve Modal ===
    function openRJModal() {
        const modal = document.getElementById('rjModal');
        if (modal) modal.classList.add('active');
    }

    function closeRJModal() {
        const modal = document.getElementById('rjModal');
        if (modal) modal.classList.remove('active');
    }

    function openAchieveModal(type) {
        const body = document.getElementById('achieveModalBody');
        if (!body) {
            console.warn('⚠️ achieveModalBody not found!');
            return;
        }

        const content = {
            'experience': {
                title: '💼 Professional Experience',
                sub: 'Coming soon — I\'m currently updating this section.',
                details: ['📌 Available Soon', '🛠️ I\'m working on adding my professional journey here.', '⏳ Please check back later!']
            },
            'memories': {
                title: '📸 Memorable Moments',
                sub: 'Coming soon — I\'m collecting my favorite moments.',
                details: ['📌 Available Soon', '🛠️ This section is under development.', '⏳ Stay tuned for updates!']
            },
            'certificates': {
                title: '🏅 Certifications',
                sub: 'Coming soon — my learning milestones.',
                details: ['📌 Available Soon', '🛠️ I\'m currently adding my certifications.', '⏳ Please check back later!']
            }
        };

        const data = content[type];
        if (!data) {
            body.innerHTML = `<p style="color: var(--text-muted);">❌ Section not found.</p>`;
            return;
        }

        body.innerHTML = `
            <h2>${data.title}</h2>
            <p class="sub">${data.sub}</p>
            ${data.details.map(item => `<div class="detail-item">${item}</div>`).join('')}
        `;
    }

    // === Contact Modal ===
    function showContactOptions() {
        const modal = document.getElementById('contactModal');
        if (modal) modal.classList.add('active');
    }

    function closeContactModal() {
        const modal = document.getElementById('contactModal');
        if (modal) modal.classList.remove('active');
    }

    // === Modal Outside Click Close ===
    document.addEventListener('click', function(e) {
        const rjModal = document.getElementById('rjModal');
        if (rjModal && e.target === rjModal) {
            closeRJModal();
        }

        const contactModal = document.getElementById('contactModal');
        if (contactModal && e.target === contactModal) {
            closeContactModal();
        }
    });

    // === Modal Escape Key Close ===
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeRJModal();
            closeContactModal();
        }
    });

    // === Story Modal ===
    function openStoryModal() {
        const modal = document.getElementById('storyModal');
        if (modal) modal.classList.add('active');
    }

    function closeStoryModal() {
        const modal = document.getElementById('storyModal');
        if (modal) modal.classList.remove('active');
    }

    // === Articles Modal ===
    function openArticlesModal() {
        const modal = document.getElementById('articlesModal');
        if (modal) modal.classList.add('active');
    }

    function closeArticlesModal() {
        const modal = document.getElementById('articlesModal');
        if (modal) modal.classList.remove('active');
    }

    // === Interests Modal ===
    function openInterestsModal() {
        const modal = document.getElementById('interestsModal');
        if (modal) modal.classList.add('active');
    }

    function closeInterestsModal() {
        const modal = document.getElementById('interestsModal');
        if (modal) modal.classList.remove('active');
    }

    // === Projects Modal ===
    function openProjectsModal() {
        const modal = document.getElementById('projectsModal');
        if (modal) modal.classList.add('active');
    }

    function closeProjectsModal() {
        const modal = document.getElementById('projectsModal');
        if (modal) modal.classList.remove('active');
    }

    // === Education Modal ===
    function openEducationModal() {
        const modal = document.getElementById('educationModal');
        if (modal) modal.classList.add('active');
    }

    function closeEducationModal() {
        const modal = document.getElementById('educationModal');
        if (modal) modal.classList.remove('active');
    }

    /* ============================================
       OPEN CHATBOX — LET'S TALK BUTTON
       ============================================ */
    function openChatbox() {
        const container = document.getElementById('chatbox-container');
        if (!container) {
            alert('❌ Chatbox container not found!');
            return;
        }

        if (container.innerHTML.trim() !== '') {
            container.style.display = 'block';
            container.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        fetch('chatbox.html')
            .then(res => {
                if (!res.ok) throw new Error('File not found (404)');
                return res.text();
            })
            .then(html => {
                container.innerHTML = html;
                container.style.display = 'block';
                container.scrollIntoView({ behavior: 'smooth', block: 'center' });
                console.log('✅ Chatbox loaded!');
            })
            .catch(err => {
                console.error('❌ Chatbox load failed:', err);
                alert('❌ Chatbox could not load. Please check console for details.');
                container.innerHTML = `<p style="color:var(--text-muted);text-align:center;padding:20px;">❌ Chatbox could not load.</p>`;
                container.style.display = 'block';
            });
    }

    /* ============================================
       SOCIAL TOGGLE - CLICK KARNE PAR ICONS
       ============================================ */
    function initSocialToggle() {
        const trigger = document.getElementById('triggerBtn');
        const grid = document.getElementById('socialGrid');

        if (trigger && grid) {
            trigger.addEventListener('click', function(e) {
                e.stopPropagation();
                this.classList.toggle('active');
                grid.classList.toggle('show');
            });

            document.addEventListener('click', function(e) {
                if (!trigger.contains(e.target) && !grid.contains(e.target)) {
                    trigger.classList.remove('active');
                    grid.classList.remove('show');
                }
            });

            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    trigger.classList.remove('active');
                    grid.classList.remove('show');
                }
            });
        }
    }

    /* ============================================
       SCROLL EVENT LISTENER — Active Nav + Scroll to Top
       ============================================ */
    function initScrollEvents() {
        let ticking = false;

        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    updateActiveNav();
                    handleScrollToTop();
                    ticking = false;
                });
                ticking = true;
            }
        });

        updateActiveNav();
        handleScrollToTop();

        const btn = DOM.scrollTopBtn;
        if (btn) {
            btn.addEventListener('click', scrollToTop);
        }
    }

    /* ============================================
       INITIALIZATION
       ============================================ */
    document.addEventListener('DOMContentLoaded', function() {
        console.log('🚀 Personal Website v4.0 — Ravi Raj');
        console.log('📅 Loaded:', new Date().toLocaleString());

        // ---- INITIALIZE ALL CLASSES ----
        const matrix = new MatrixEffect(
            DOM.matrixCanvas,
            CONFIG.matrix.chars,
            CONFIG.matrix.fontSize
        );

        const typewriter = new TypewriterEffect(
            document.querySelectorAll('h1, h2, h3, h4, h5, h6'),
            CONFIG.typewriter.speed
        );

        const skillBars = new SkillBars(DOM.skillBars);
        const smoothScroll = new SmoothScroll(DOM.navLinks);
        const liveDateTime = new LiveDateTime(DOM.timeDisplay);

        // ---- THEME MANAGER ----
        const themeManager = new ThemeManager(
            DOM.themeToggle,
            DOM.body,
            DOM.toggleIcon,
            DOM.toggleTooltip
        );

        // ---- SOCIAL TOGGLE ----
        initSocialToggle();

        // ---- SCROLL EVENTS ----
        initScrollEvents();

        // ---- LAST UPDATED ----
        setLastUpdated(DOM.lastUpdated);

        // ---- PHOTO ANIMATION ----
        setupPhotoAnimation(DOM.heroPhoto);

        // ---- CLEANUP ON UNLOAD ----
        window.addEventListener('beforeunload', function() {
            matrix.destroy();
            typewriter.destroy();
            skillBars.destroy();
            smoothScroll.destroy();
            liveDateTime.destroy();
            themeManager.destroy();
        });

        // ---- ERROR HANDLING ----
        window.addEventListener('error', function(e) {
            console.error('Global error caught:', e.message);
        });

        console.log('✅ All systems ready!');
    });

})();
