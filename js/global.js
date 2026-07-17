// ============================================================
// GLOBAL.JS — COMMON FUNCTIONS FOR ALL PAGES
// (Theme Toggle, Live Time, Scroll to Top, Keyboard Shortcuts)
// ============================================================

(function() {
    'use strict';

    // ============================================================
    // THEME TOGGLE
    // ============================================================
    const themeSwitch = document.getElementById('themeSwitch');
    const themeLabel = document.getElementById('themeLabel');
    const toast = document.getElementById('toast');
    const html = document.documentElement;

    // Load saved theme
    const currentTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', currentTheme);
    if (themeLabel) {
        themeLabel.textContent = currentTheme === 'dark' ? 'Dark' : 'Light';
    }

    // Toggle click
    if (themeSwitch) {
        themeSwitch.addEventListener('click', function(e) {
            e.stopPropagation();
            const current = html.getAttribute('data-theme');
            const next = current === 'light' ? 'dark' : 'light';
            html.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
            if (themeLabel) {
                themeLabel.textContent = next === 'dark' ? 'Dark' : 'Light';
            }
            showToast(next === 'dark' ? '🌙 Dark Mode' : '☀️ Light Mode');
        });

        // Keyboard support
        themeSwitch.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }

    // ============================================================
    // TOAST FUNCTION
    // ============================================================
    let toastTimer;

    function showToast(message) {
        if (!toast) return;
        clearTimeout(toastTimer);
        toast.textContent = message;
        toast.className = 'toast show';
        toastTimer = setTimeout(function() {
            toast.classList.remove('show');
        }, 2000);
    }

    // ============================================================
    // LIVE TIME — REAL-TIME CLOCK
    // ============================================================
    function updateTime() {
        const now = new Date();
        const options = {
            timeZone: 'Asia/Kolkata',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        };
        const timeStr = now.toLocaleString('en-IN', options);
        const liveTimeEl = document.getElementById('live-time');
        if (liveTimeEl) {
            liveTimeEl.textContent = `⏱️ ${timeStr} IST`;
        }
    }
    updateTime();
    setInterval(updateTime, 1000);

    // ============================================================
    // SCROLL TO TOP
    // ============================================================
    const scrollBtn = document.getElementById('scrollTopBtn');

    if (scrollBtn) {
        window.addEventListener('scroll', function() {
            scrollBtn.classList.toggle('visible', window.scrollY > 400);
        });

        scrollBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ============================================================
    // PAGE VISIBILITY — PAUSE UPDATES WHEN TAB IS HIDDEN
    // ============================================================
    let timeInterval;

    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            clearInterval(timeInterval);
        } else {
            updateTime();
            timeInterval = setInterval(updateTime, 1000);
        }
    });

    // ============================================================
    // KEYBOARD SHORTCUTS — ESCAPE TO CLOSE
    // ============================================================
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (window.closeChatbox) {
                window.closeChatbox();
            }
        }
    });

    // ============================================================
    // RESPONSIVE TOGGLE POSITION
    // ============================================================
    function adjustTogglePosition() {
        const wrapper = document.querySelector('.theme-toggle-wrapper');
        if (!wrapper) return;
        if (window.innerWidth <= 480) {
            wrapper.style.top = '10px';
            wrapper.style.right = '10px';
        } else if (window.innerWidth <= 768) {
            wrapper.style.top = '15px';
            wrapper.style.right = '15px';
        } else {
            wrapper.style.top = '20px';
            wrapper.style.right = '20px';
        }
    }

    adjustTogglePosition();
    window.addEventListener('resize', adjustTogglePosition);

    console.log('✅ Global JS Loaded Successfully!');

})();
// ============================================================
// 💚 RAVI RAJ KI BAARISH — GLOBAL EFFECT
// ============================================================
(function() {
    'use strict';

    // Canvas create karo
    const canvas = document.createElement('canvas');
    canvas.id = 'rain-canvas';
    document.body.prepend(canvas);

    const ctx = canvas.getContext('2d');

    let width, height;
    let raindrops = [];

    class Raindrop {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * -height;
            this.length = Math.random() * 15 + 10;
            this.speed = Math.random() * 8 + 4;
            this.opacity = Math.random() * 0.4 + 0.3;
        }

        fall() {
            this.y += this.speed;
            this.x += this.speed * 0.1;

            if (this.y > height) {
                this.reset();
                this.y = -10;
            }
        }

        draw() {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x + this.speed * 0.3, this.y + this.length);
            ctx.strokeStyle = `rgba(174, 194, 224, ${this.opacity})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
        }
    }

    function initRain() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        raindrops = [];
        const count = Math.floor((width * height) / 8000);
        for (let i = 0; i < count; i++) {
            raindrops.push(new Raindrop());
        }
    }

    function drawRain() {
        ctx.clearRect(0, 0, width, height);

        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, 'rgba(10, 10, 20, 0.3)');
        gradient.addColorStop(1, 'rgba(20, 20, 40, 0.5)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        raindrops.forEach(drop => {
            drop.fall();
            drop.draw();
        });
    }

    function updateRainTheme() {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        canvas.style.opacity = isDark ? '0.7' : '0.4';
    }

    window.addEventListener('resize', function() {
        initRain();
    });

    document.addEventListener('themeChanged', updateRainTheme);

    initRain();
    updateRainTheme();

    let rainInterval = setInterval(drawRain, 30);

    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            clearInterval(rainInterval);
        } else {
            rainInterval = setInterval(drawRain, 30);
        }
    });

    window.addEventListener('beforeunload', function() {
        clearInterval(rainInterval);
    });

    console.log('☔ Ravi Raj Ki Baarish Loaded!');

})();
