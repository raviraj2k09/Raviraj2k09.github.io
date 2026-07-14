// ============================================================
// AUTOBOIOGRAPHY.JS — WEBSITE FUNCTIONALITY ONLY
// (Language Toggle · Navigation · Reading Mode · Copy Link)
// ============================================================

// ---- GLOBAL VARIABLES ----
let currentLang = 'en';
const totalChapters = 12;

// ============================================================
// 1. LANGUAGE TOGGLE
// ============================================================
function switchLang(lang) {
    currentLang = lang;
    const enChapters = document.getElementById('chaptersEn');
    const hiChapters = document.getElementById('chaptersHi');
    const btnEn = document.getElementById('btnEn');
    const btnHi = document.getElementById('btnHi');

    if (lang === 'en') {
        enChapters.style.display = 'block';
        hiChapters.style.display = 'none';
        btnEn.classList.add('active');
        btnHi.classList.remove('active');
        resetChapters('en');
    } else {
        enChapters.style.display = 'none';
        hiChapters.style.display = 'block';
        btnHi.classList.add('active');
        btnEn.classList.remove('active');
        resetChapters('hi');
    }
}

// ============================================================
// 2. RESET CHAPTERS
// ============================================================
function resetChapters(lang) {
    const containerId = lang === 'en' ? 'chaptersEn' : 'chaptersHi';
    const container = document.getElementById(containerId);
    const chapters = container.querySelectorAll('.chapter');
    
    chapters.forEach((ch, index) => {
        if (index === 0) {
            ch.classList.add('active');
        } else {
            ch.classList.remove('active');
        }
    });
    
    updateAllButtons(lang);
    updateProgressInfo(lang);
    updateDots(lang);
}

// ============================================================
// 3. SCROLL TO CHAPTER HEADING
// ============================================================
function scrollToChapterHeading(lang) {
    const containerId = lang === 'en' ? 'chaptersEn' : 'chaptersHi';
    const container = document.getElementById(containerId);
    const chapters = container.querySelectorAll('.chapter');
    
    chapters.forEach((ch) => {
        if (ch.classList.contains('active')) {
            const heading = ch.querySelector('h3');
            if (heading) {
                heading.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
            return;
        }
    });
}

// ============================================================
// 4. NEXT CHAPTER
// ============================================================
function nextChapter(lang) {
    const containerId = lang === 'en' ? 'chaptersEn' : 'chaptersHi';
    const container = document.getElementById(containerId);
    const chapters = container.querySelectorAll('.chapter');
    let currentIndex = -1;

    chapters.forEach((ch, index) => {
        if (ch.classList.contains('active')) {
            currentIndex = index;
        }
    });

    if (currentIndex !== -1 && currentIndex < chapters.length - 1) {
        chapters[currentIndex].classList.remove('active');
        chapters[currentIndex + 1].classList.add('active');
        updateAllButtons(lang);
        updateProgressInfo(lang);
        updateDots(lang);
        
        setTimeout(function() {
            scrollToChapterHeading(lang);
        }, 150);
    }
}

// ============================================================
// 5. PREVIOUS CHAPTER
// ============================================================
function prevChapter(lang) {
    const containerId = lang === 'en' ? 'chaptersEn' : 'chaptersHi';
    const container = document.getElementById(containerId);
    const chapters = container.querySelectorAll('.chapter');
    let currentIndex = -1;

    chapters.forEach((ch, index) => {
        if (ch.classList.contains('active')) {
            currentIndex = index;
        }
    });

    if (currentIndex > 0) {
        chapters[currentIndex].classList.remove('active');
        chapters[currentIndex - 1].classList.add('active');
        updateAllButtons(lang);
        updateProgressInfo(lang);
        updateDots(lang);
        
        setTimeout(function() {
            scrollToChapterHeading(lang);
        }, 150);
    }
}

// ============================================================
// 6. UPDATE BUTTON STATES
// ============================================================
function updateAllButtons(lang) {
    const containerId = lang === 'en' ? 'chaptersEn' : 'chaptersHi';
    const container = document.getElementById(containerId);
    const chapters = container.querySelectorAll('.chapter');
    const total = chapters.length;
    
    chapters.forEach((ch, index) => {
        if (ch.classList.contains('active')) {
            const prevBtn = ch.querySelector('.prev-btn');
            const nextBtn = ch.querySelector('.next-btn');
            
            if (prevBtn) {
                prevBtn.disabled = (index === 0);
            }
            if (nextBtn) {
                nextBtn.disabled = (index === total - 1);
            }
        }
    });
}

// ============================================================
// 7. UPDATE CHAPTER PROGRESS INFO
// ============================================================
function updateProgressInfo(lang) {
    const containerId = lang === 'en' ? 'chaptersEn' : 'chaptersHi';
    const container = document.getElementById(containerId);
    const chapters = container.querySelectorAll('.chapter');
    let currentIndex = -1;
    
    chapters.forEach((ch, index) => {
        if (ch.classList.contains('active')) {
            currentIndex = index;
        }
    });
    
    if (currentIndex !== -1) {
        const chapterNum = currentIndex + 1;
        const percent = Math.round((chapterNum / totalChapters) * 100);
        
        const numDisplay = document.getElementById('chapterNumDisplay');
        const percentDisplay = document.getElementById('chapterPercentDisplay');
        
        if (numDisplay) {
            numDisplay.textContent = `Chapter ${chapterNum} of ${totalChapters}`;
        }
        if (percentDisplay) {
            percentDisplay.textContent = `${percent}% complete`;
        }
    }
}

// ============================================================
// 8. UPDATE PROGRESS DOTS
// ============================================================
function updateDots(lang) {
    const containerId = lang === 'en' ? 'chaptersEn' : 'chaptersHi';
    const container = document.getElementById(containerId);
    const chapters = container.querySelectorAll('.chapter');
    let currentIndex = -1;
    
    chapters.forEach((ch, index) => {
        if (ch.classList.contains('active')) {
            currentIndex = index;
        }
    });
    
    if (currentIndex !== -1) {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
}

// ============================================================
// 9. READING MODE TOGGLE
// ============================================================
function toggleReadingMode() {
    document.body.classList.toggle('reading-mode');
    const btn = document.getElementById('readingModeToggle');
    if (document.body.classList.contains('reading-mode')) {
        btn.innerHTML = '☀️ Normal Mode';
        localStorage.setItem('readingMode', 'enabled');
    } else {
        btn.innerHTML = '📖 Reading Mode';
        localStorage.setItem('readingMode', 'disabled');
    }
}

function loadReadingMode() {
    const savedMode = localStorage.getItem('readingMode');
    if (savedMode === 'enabled') {
        document.body.classList.add('reading-mode');
        const btn = document.getElementById('readingModeToggle');
        if (btn) {
            btn.innerHTML = '☀️ Normal Mode';
        }
    }
}

// ============================================================
// 10. COPY CHAPTER LINK
// ============================================================
function copyChapterLink(chapterNum) {
    const url = window.location.href.split('#')[0] + `#chapter${chapterNum}`;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(() => {
            showCopyFeedback(chapterNum);
        }).catch(() => {
            fallbackCopy(url, chapterNum);
        });
    } else {
        fallbackCopy(url, chapterNum);
    }
}

function fallbackCopy(text, chapterNum) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showCopyFeedback(chapterNum);
}

function showCopyFeedback(chapterNum) {
    const containerId = currentLang === 'en' ? 'chaptersEn' : 'chaptersHi';
    const container = document.getElementById(containerId);
    const chapter = container.querySelector(`.chapter[data-chapter="${chapterNum}"]`);
    
    if (chapter) {
        const btn = chapter.querySelector('.copy-link-btn');
        if (btn) {
            const originalText = btn.innerHTML;
            btn.innerHTML = '✅ Copied!';
            btn.classList.add('copied');
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.classList.remove('copied');
            }, 2000);
        }
    }
    showToast('✅ Link copied!', 'success');
}

// ============================================================
// 11. GOOGLE TRANSLATE
// ============================================================
function openGoogleTranslate() {
    const url = window.location.href;
    window.open('https://translate.google.com/translate?sl=auto&tl=hi&u=' + encodeURIComponent(url), '_blank');
}

// ============================================================
// 12. TOAST NOTIFICATION
// ============================================================
function showToast(message, type = '') {
    const toast = document.getElementById('toast');
    if (!toast) return;
    
    toast.textContent = message;
    toast.className = 'toast';
    if (type) {
        toast.classList.add(type);
    }
    toast.classList.add('show');
    
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ============================================================
// 13. DOWNLOAD MODAL
// ============================================================
function openModal() {
    const modal = document.getElementById('downloadModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('downloadModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

document.addEventListener('click', function(e) {
    const modal = document.getElementById('downloadModal');
    if (modal && modal.classList.contains('active')) {
        if (e.target === modal) {
            closeModal();
        }
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// ============================================================
// 14. HANDLE CHAPTER HASH IN URL
// ============================================================
function handleChapterHash() {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#chapter')) {
        const chapterNum = parseInt(hash.replace('#chapter', ''));
        if (!isNaN(chapterNum) && chapterNum >= 1 && chapterNum <= totalChapters) {
            const containerId = currentLang === 'en' ? 'chaptersEn' : 'chaptersHi';
            const container = document.getElementById(containerId);
            const chapters = container.querySelectorAll('.chapter');
            
            chapters.forEach((ch, index) => {
                if (index === chapterNum - 1) {
                    ch.classList.add('active');
                } else {
                    ch.classList.remove('active');
                }
            });
            
            updateAllButtons(currentLang);
            updateProgressInfo(currentLang);
            updateDots(currentLang);
            
            setTimeout(function() {
                scrollToChapterHeading(currentLang);
            }, 300);
        }
    }
}

// ============================================================
// 15. DOT CLICK NAVIGATION
// ============================================================
function setupDotNavigation() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot) => {
        dot.addEventListener('click', function() {
            const chapterNum = parseInt(this.dataset.dot);
            if (!isNaN(chapterNum)) {
                const containerId = currentLang === 'en' ? 'chaptersEn' : 'chaptersHi';
                const container = document.getElementById(containerId);
                const chapters = container.querySelectorAll('.chapter');
                
                chapters.forEach((ch, index) => {
                    if (index === chapterNum - 1) {
                        ch.classList.add('active');
                    } else {
                        ch.classList.remove('active');
                    }
                });
                
                updateAllButtons(currentLang);
                updateProgressInfo(currentLang);
                updateDots(currentLang);
                
                setTimeout(function() {
                    scrollToChapterHeading(currentLang);
                }, 150);
            }
        });
    });
}

// ============================================================
// 16. INITIALIZATION
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    currentLang = 'en';
    
    document.getElementById('chaptersEn').style.display = 'block';
    document.getElementById('chaptersHi').style.display = 'none';
    
    resetChapters('en');
    loadReadingMode();
    handleChapterHash();
    setupDotNavigation();
});

// ============================================================
// 17. EXPOSE FUNCTIONS TO GLOBAL SCOPE
// ============================================================
window.switchLang = switchLang;
window.nextChapter = nextChapter;
window.prevChapter = prevChapter;
window.copyChapterLink = copyChapterLink;
window.openGoogleTranslate = openGoogleTranslate;
window.toggleReadingMode = toggleReadingMode;
window.openModal = openModal;
window.closeModal = closeModal;
window.showToast = showToast;
