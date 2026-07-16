// ============================================================
// THEME TOGGLE — DARK / LIGHT / FOCUS (3 MODES)
// ============================================================
const switchEl = document.getElementById('themeSwitch');
const themeLabel = document.getElementById('themeLabel');
let currentTheme = localStorage.getItem('theme') || 'light';

// Theme configurations
const themes = {
    light: {
        label: 'Light',
        icon: '☀️',
        dataAttr: 'light',
        next: 'dark'
    },
    dark: {
        label: 'Dark',
        icon: '🌙',
        dataAttr: 'dark',
        next: 'focus'
    },
    focus: {
        label: 'Focus',
        icon: '🎯',
        dataAttr: 'focus',
        next: 'light'
    }
};

function setTheme(theme) {
    currentTheme = theme;
    const config = themes[theme];
    
    // Apply theme attribute
    document.documentElement.setAttribute('data-theme', config.dataAttr);
    
    // Update switch appearance (3 states)
    switchEl.className = 'switch';
    if (theme === 'dark') switchEl.classList.add('active');
    else if (theme === 'focus') switchEl.classList.add('focus-mode');
    
    // Update label
    themeLabel.textContent = config.label;
    
    // Update switch icons
    const sunIcon = switchEl.querySelector('.sun');
    const moonIcon = switchEl.querySelector('.moon');
    if (theme === 'light') {
        sunIcon.textContent = '☀️';
        moonIcon.textContent = '🌙';
    } else if (theme === 'dark') {
        sunIcon.textContent = '🌙';
        moonIcon.textContent = '🌙';
    } else if (theme === 'focus') {
        sunIcon.textContent = '🎯';
        moonIcon.textContent = '🎯';
    }
    
    // Save preference
    localStorage.setItem('theme', theme);
}

function toggleTheme() {
    const nextTheme = themes[currentTheme].next;
    setTheme(nextTheme);
}

// Event listeners
switchEl.addEventListener('click', toggleTheme);
switchEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleTheme();
    }
});

// Initialize theme
setTheme(currentTheme);

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
// LAST UPDATED
// ============================================================
function updateLastUpdated() {
    const now = new Date();
    const options = {
        timeZone: 'Asia/Kolkata',
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    };
    const lastUpdatedEl = document.getElementById('last-updated');
    if (lastUpdatedEl) {
        lastUpdatedEl.textContent = `📅 Last Updated: ${now.toLocaleString('en-IN', options)}`;
    }
}
updateLastUpdated();

// ============================================================
// INTEREST REVEAL — CLICK TO EXPAND
// ============================================================
function revealInterest(id) {
    const content = document.getElementById(id);
    if (!content) return;
    
    // Close all other hidden contents
    document.querySelectorAll('.hidden-content').forEach(el => {
        if (el.id !== id) {
            el.style.display = 'none';
        }
    });
    
    // Toggle this one
    content.style.display = content.style.display === 'block' ? 'none' : 'block';
}

// ============================================================
// SCROLL TO TOP
// ============================================================
const scrollBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
    if (scrollBtn) {
        scrollBtn.classList.toggle('visible', window.scrollY > 400);
    }
});

if (scrollBtn) {
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ============================================================
// SMOOTH SCROLL FOR NAVIGATION LINKS
// ============================================================
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// ============================================================
// KEYBOARD ACCESSIBILITY — Interest & Milestone Cards
// ============================================================
document.querySelectorAll('.interest-card, .milestone-card').forEach(el => {
    el.setAttribute('role', 'button');
    el.setAttribute('tabindex', '0');
    el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            el.click();
        }
    });
});

// ============================================================
// FOCUS MODE — EXTRA FEATURES (Optional)
// ============================================================
// When focus mode is active, reduce distractions
// This runs on theme change
function applyFocusMode(theme) {
    const isFocus = theme === 'focus';
    const sections = document.querySelectorAll('section:not(#home)');
    const nav = document.querySelector('nav');
    const footer = document.querySelector('footer');
    const scrollBtn = document.getElementById('scrollTopBtn');
    
    if (isFocus) {
        // Fade out non-hero sections
        sections.forEach((section, index) => {
            if (section.id !== 'home') {
                section.style.opacity = '0.3';
                section.style.transition = 'opacity 0.5s ease';
                section.style.pointerEvents = 'none';
            }
        });
        if (nav) nav.style.opacity = '0.5';
        if (footer) footer.style.opacity = '0.3';
        if (scrollBtn) scrollBtn.style.opacity = '0.3';
        
        // Add focus indicator
        document.body.style.background = 'var(--bg)';
    } else {
        // Restore all elements
        sections.forEach(section => {
            section.style.opacity = '1';
            section.style.pointerEvents = 'auto';
        });
        if (nav) nav.style.opacity = '1';
        if (footer) footer.style.opacity = '1';
        if (scrollBtn) scrollBtn.style.opacity = '1';
    }
}

// Override setTheme to apply focus mode
const originalSetTheme = setTheme;
setTheme = function(theme) {
    originalSetTheme(theme);
    applyFocusMode(theme);
};

// Re-initialize with current theme
setTheme(currentTheme);

// ============================================================
// CONSOLE WELCOME (Fun Easter Egg)
// ============================================================
console.log('%c👋 Hey there, fellow developer!', 'font-size: 20px; font-weight: bold; color: #0984e3;');
console.log('%cThanks for checking out my site. Built with ❤️ by Ravi Raj', 'font-size: 14px; color: #555;');
console.log('%c📖 Check out my GitHub: https://github.com/ravirajhere', 'font-size: 14px; color: #0984e3;');

// ============================================================
// PERFORMANCE — DEBOUNCE SCROLL EVENTS
// ============================================================
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        // Any heavy scroll operations here
    }, 100);
});

// ============================================================
// PAGE VISIBILITY — PAUSE UPDATES WHEN TAB IS HIDDEN
// ============================================================
let timeInterval;

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        clearInterval(timeInterval);
    } else {
        updateTime();
        timeInterval = setInterval(updateTime, 1000);
    }
});

// ============================================================
// INITIAL SETUP COMPLETE
// ============================================================
console.log('✅ Ravi Raj Personal Website — Loaded Successfully!');
