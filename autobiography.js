// ============================================================
// AUTOBIOGRAPHY.JS — COMPLETE EBOOK GENERATOR
// PROFESSIONAL COVER · ABOUT AUTHOR · ALL 12 CHAPTERS
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
    updateModalChapterName(lang);
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
        updateModalChapterName(lang);
        
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
        updateModalChapterName(lang);
        
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
// 9. UPDATE MODAL CHAPTER NAME
// ============================================================
function updateModalChapterName(lang) {
    const containerId = lang === 'en' ? 'chaptersEn' : 'chaptersHi';
    const container = document.getElementById(containerId);
    const chapters = container.querySelectorAll('.chapter');
    let chapterTitle = '';
    
    chapters.forEach((ch) => {
        if (ch.classList.contains('active')) {
            const h3 = ch.querySelector('h3');
            if (h3) {
                chapterTitle = h3.textContent.trim();
            }
        }
    });
    
    const modalName = document.getElementById('modalChapterName');
    if (modalName && chapterTitle) {
        modalName.textContent = chapterTitle;
    }
}

// ============================================================
// 10. READING MODE TOGGLE
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
// 11. COPY CHAPTER LINK
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
// 12. GOOGLE TRANSLATE
// ============================================================
function openGoogleTranslate() {
    const url = window.location.href;
    window.open('https://translate.google.com/translate?sl=auto&tl=hi&u=' + encodeURIComponent(url), '_blank');
}

// ============================================================
// 13. TOAST NOTIFICATION
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
// 14. DOWNLOAD MODAL
// ============================================================
function openModal() {
    const modal = document.getElementById('downloadModal');
    if (modal) {
        modal.classList.add('active');
        updateModalChapterName(currentLang);
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
// 15. LAZY LOAD PDF LIBRARY
// ============================================================
function loadPDFLibrary() {
    return new Promise((resolve) => {
        if (typeof html2pdf !== 'undefined') {
            resolve();
            return;
        }
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
        script.onload = resolve;
        document.head.appendChild(script);
    });
}

// ============================================================
// 16. MAKE ALL CHAPTERS VISIBLE
// ============================================================
function makeAllChaptersVisible(lang) {
    const containerId = lang === 'en' ? 'chaptersEn' : 'chaptersHi';
    const container = document.getElementById(containerId);
    const chapters = container.querySelectorAll('.chapter');
    
    let activeIndex = -1;
    chapters.forEach((ch, index) => {
        if (ch.classList.contains('active')) {
            activeIndex = index;
        }
        ch.style.display = 'block';
    });
    
    return activeIndex;
}

function restoreChapterVisibility(lang, activeIndex) {
    const containerId = lang === 'en' ? 'chaptersEn' : 'chaptersHi';
    const container = document.getElementById(containerId);
    const chapters = container.querySelectorAll('.chapter');
    
    chapters.forEach((ch, index) => {
        if (index === activeIndex) {
            ch.style.display = 'block';
            ch.classList.add('active');
        } else {
            ch.style.display = 'none';
            ch.classList.remove('active');
        }
    });
}

// ============================================================
// 17. WAIT FOR RENDER
// ============================================================
function waitForRender() {
    return new Promise((resolve) => {
        requestAnimationFrame(() => {
            setTimeout(resolve, 400);
        });
    });
}

// ============================================================
// 18. DOWNLOAD FULL EBOOK PDF
// ============================================================
async function downloadFullPDF() {
    const wrapper = document.querySelector('.autobio-wrapper');
    if (!wrapper) {
        showToast('❌ Error: Content not found', 'error');
        return;
    }
    
    showToast('📄 Loading PDF library...', 'success');
    closeModal();
    
    await loadPDFLibrary();
    
    showToast('📄 Generating ebook...', 'success');
    
    const lang = currentLang;
    const activeIndex = makeAllChaptersVisible(lang);
    
    await waitForRender();
    
    const clone = wrapper.cloneNode(true);
    
    restoreChapterVisibility(lang, activeIndex);
    
    // ---- CLEAN CLONE ----
    const removeSelectors = [
        '.lang-controls', '.download-actions', '.nav-buttons', 
        '.progress-dots', '.chapter-progress-info', '.copy-link-btn',
        '.back-to-top', '.reading-mode-toggle', '.toast', '.modal-overlay'
    ];
    removeSelectors.forEach(selector => {
        clone.querySelectorAll(selector).forEach(el => el.remove());
    });
    
    // Make all chapters visible in clone
    const cloneContainerId = lang === 'en' ? 'chaptersEn' : 'chaptersHi';
    const cloneContainer = clone.querySelector('#' + cloneContainerId);
    if (cloneContainer) {
        const cloneChapters = cloneContainer.querySelectorAll('.chapter');
        cloneChapters.forEach(ch => {
            ch.style.display = 'block';
            ch.classList.add('active');
        });
    }
    
    // Remove photo placeholder hints
    clone.querySelectorAll('.upload-hint').forEach(el => {
        el.textContent = '📸 Photo';
    });
    
    // ---- COVER PAGE ----
    const cover = document.createElement('div');
    cover.style.cssText = `
        text-align: center;
        padding: 80px 40px 70px 40px;
        background: #0a0a0f;
        border-bottom: 3px solid #DAA520;
        margin-bottom: 30px;
        page-break-after: always;
    `;
    cover.innerHTML = `
        <div style="margin-bottom:30px;">
            <span style="color:#DAA520;font-size:20px;letter-spacing:8px;">✦ ✦ ✦</span>
        </div>
        <div style="width:80px;height:3px;background:linear-gradient(90deg,#6c5ce7,#DAA520);margin:0 auto 30px;"></div>
        <div style="font-size:64px;margin-bottom:20px;">📖</div>
        <h1 style="font-size:48px;font-weight:700;font-family:'Space Grotesk',sans-serif;margin:10px 0;background:linear-gradient(135deg,#6c5ce7,#DAA520);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">
            A BOY WHO NEVER THOUGHT
        </h1>
        <p style="font-size:20px;color:#DAA520;font-style:italic;margin:12px 0 8px 0;font-family:'Space Grotesk',sans-serif;">
            "From a small village in Bihar to the world of code"
        </p>
        <div style="width:60px;height:2px;background:#DAA520;margin:20px auto;"></div>
        <p style="font-size:18px;color:rgba(255,255,255,0.6);margin:10px 0 6px 0;font-family:'Space Grotesk',sans-serif;">By</p>
        <p style="font-size:32px;font-weight:700;color:#DAA520;font-family:'Space Grotesk',sans-serif;">RAVI RAJ</p>
        <div style="width:60px;height:2px;background:#DAA520;margin:20px auto;"></div>
        <p style="font-size:18px;color:rgba(255,255,255,0.7);font-style:italic;font-family:'Space Grotesk',sans-serif;">
            "Somewhere Between I Want It & I Got It"
        </p>
        <div style="width:80px;height:3px;background:linear-gradient(90deg,#6c5ce7,#DAA520);margin:30px auto 0;"></div>
        <p style="font-size:16px;color:rgba(255,255,255,0.4);margin-top:20px;font-family:'Space Grotesk',sans-serif;">
            ${new Date().getFullYear()}
        </p>
    `;
    clone.insertBefore(cover, clone.firstChild);
    
    // ---- TITLE PAGE ----
    const titlePage = document.createElement('div');
    titlePage.style.cssText = `
        text-align: center;
        padding: 120px 40px;
        page-break-after: always;
        border-bottom: 1px solid rgba(0,0,0,0.05);
        margin-bottom: 30px;
    `;
    titlePage.innerHTML = `
        <h1 style="font-size:36px;font-weight:700;color:#6c5ce7;font-family:'Space Grotesk',sans-serif;margin-bottom:15px;">My Autobiography</h1>
        <p style="font-size:22px;color:#DAA520;font-family:'Space Grotesk',sans-serif;margin:10px 0;">Ravi Raj</p>
        <p style="font-size:16px;color:#666;font-style:italic;font-family:'Space Grotesk',sans-serif;margin:5px 0;">"A Boy Who Never Thought"</p>
        <p style="font-size:16px;color:#999;font-family:'Space Grotesk',sans-serif;margin:5px 0;">From Begusarai to the World</p>
        <div style="width:40px;height:2px;background:#DAA520;margin:20px auto;"></div>
        <p style="font-size:14px;color:#aaa;font-family:'Space Grotesk',sans-serif;">${new Date().getFullYear()}</p>
    `;
    clone.insertBefore(titlePage, cover.nextSibling);
    
    // ---- TABLE OF CONTENTS ----
    const toc = document.createElement('div');
    toc.style.cssText = `
        padding: 40px 40px 60px 40px;
        page-break-after: always;
        border-bottom: 1px solid rgba(0,0,0,0.05);
        margin-bottom: 30px;
    `;
    let tocHTML = `
        <h2 style="font-size:28px;font-weight:700;color:#6c5ce7;text-align:center;font-family:'Space Grotesk',sans-serif;margin-bottom:30px;">Table of Contents</h2>
        <ul style="list-style:none;padding:0;font-family:'Space Grotesk',sans-serif;font-size:18px;line-height:2.4;max-width:600px;margin:0 auto;">
    `;
    const tocChapters = clone.querySelectorAll('.chapter');
    tocChapters.forEach((ch, idx) => {
        const h3 = ch.querySelector('h3');
        const title = h3 ? h3.textContent.trim() : `Chapter ${idx+1}`;
        const pageNum = idx + 8;
        tocHTML += `
            <li style="border-bottom:1px solid #f0f0f0;padding:6px 0;display:flex;justify-content:space-between;color:#333;">
                <span style="color:#333;">${title}</span>
                <span style="color:#999;">${pageNum}</span>
            </li>
        `;
    });
    tocHTML += `</ul>`;
    toc.innerHTML = tocHTML;
    clone.insertBefore(toc, titlePage.nextSibling);
    
    // ---- ABOUT THE AUTHOR ----
    const about = document.createElement('div');
    about.style.cssText = `
        padding: 40px 40px 50px 40px;
        page-break-after: always;
        border-bottom: 1px solid rgba(0,0,0,0.05);
        margin-bottom: 30px;
        text-align: center;
    `;
    about.innerHTML = `
        <h2 style="font-size:28px;font-weight:700;color:#6c5ce7;font-family:'Space Grotesk',sans-serif;margin-bottom:25px;">About the Author</h2>
        <div style="width:120px;height:120px;border-radius:50%;border:3px solid #DAA520;margin:0 auto 16px;overflow:hidden;box-shadow:0 0 30px rgba(218,165,32,0.15);">
            <img src="Singh_ravirajhere.jpeg" alt="Ravi Raj" style="width:100%;height:100%;object-fit:cover;">
        </div>
        <p style="font-size:22px;font-weight:700;color:#1a1a1a;font-family:'Space Grotesk',sans-serif;margin:4px 0;">Ravi Raj</p>
        <p style="font-size:16px;color:#DAA520;font-family:'Space Grotesk',sans-serif;margin-bottom:12px;">Author · Developer · Dreamer</p>
        <div style="max-width:580px;margin:0 auto;">
            <p style="font-size:15px;line-height:1.8;color:#444;font-family:'Space Grotesk',sans-serif;text-align:justify;">
                Ravi Raj was born on 13 March 2008 in Begusarai, Bihar. A self-taught developer, 
                he discovered coding in 2020 and has since built over 5 projects. He is currently 
                learning JavaScript and dreams of launching his own startup. When not coding, 
                he enjoys reading novels and cycling.
            </p>
        </div>
        <div style="width:40px;height:2px;background:#DAA520;margin:18px auto;"></div>
        <p style="font-size:16px;font-style:italic;color:#6c5ce7;font-family:'Space Grotesk',sans-serif;">
            "Somewhere Between I Want It & I Got It"
        </p>
        <div style="display:flex;justify-content:center;gap:16px;flex-wrap:wrap;margin-top:16px;">
            <span style="background:#f0f0f0;padding:4px 14px;border-radius:20px;font-size:13px;color:#333;font-family:'Space Grotesk',sans-serif;">💻 3+ Years Coding</span>
            <span style="background:#f0f0f0;padding:4px 14px;border-radius:20px;font-size:13px;color:#333;font-family:'Space Grotesk',sans-serif;">🚀 5+ Projects</span>
            <span style="background:#f0f0f0;padding:4px 14px;border-radius:20px;font-size:13px;color:#333;font-family:'Space Grotesk',sans-serif;">📚 Loves Novels</span>
        </div>
    `;
    clone.insertBefore(about, toc.nextSibling);
    
    // ---- OVERVIEW ----
    const overview = document.createElement('div');
    overview.style.cssText = `
        padding: 40px 40px 50px 40px;
        page-break-after: always;
        border-bottom: 1px solid rgba(0,0,0,0.05);
        margin-bottom: 30px;
    `;
    overview.innerHTML = `
        <h2 style="font-size:28px;font-weight:700;color:#6c5ce7;text-align:center;font-family:'Space Grotesk',sans-serif;margin-bottom:20px;">Overview</h2>
        <p style="font-size:16px;line-height:1.9;color:#444;text-align:center;max-width:600px;margin:0 auto;font-family:'Space Grotesk',sans-serif;">
            This autobiography takes you through the journey of Ravi Raj — from his humble beginnings in Begusarai, 
            Bihar, to becoming a passionate coder and dreamer. It covers childhood memories, school days, family, 
            friendships, struggles, and the joy of building something from nothing. A story of a boy who never 
            thought he would, but did.
        </p>
        <div style="width:40px;height:2px;background:#DAA520;margin:24px auto;"></div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;max-width:480px;margin:0 auto;">
            <div style="background:#f9f9f9;padding:14px;border-radius:10px;text-align:center;">
                <span style="font-size:24px;font-weight:700;color:#DAA520;font-family:'Space Grotesk',sans-serif;">12</span>
                <p style="font-size:13px;color:#666;margin:2px 0;font-family:'Space Grotesk',sans-serif;">Chapters</p>
            </div>
            <div style="background:#f9f9f9;padding:14px;border-radius:10px;text-align:center;">
                <span style="font-size:24px;font-weight:700;color:#DAA520;font-family:'Space Grotesk',sans-serif;">2008</span>
                <p style="font-size:13px;color:#666;margin:2px 0;font-family:'Space Grotesk',sans-serif;">Year of Birth</p>
            </div>
            <div style="background:#f9f9f9;padding:14px;border-radius:10px;text-align:center;">
                <span style="font-size:24px;font-weight:700;color:#DAA520;font-family:'Space Grotesk',sans-serif;">3+</span>
                <p style="font-size:13px;color:#666;margin:2px 0;font-family:'Space Grotesk',sans-serif;">Years Coding</p>
            </div>
            <div style="background:#f9f9f9;padding:14px;border-radius:10px;text-align:center;">
                <span style="font-size:24px;font-weight:700;color:#DAA520;font-family:'Space Grotesk',sans-serif;">14</span>
                <p style="font-size:13px;color:#666;margin:2px 0;font-family:'Space Grotesk',sans-serif;">Friends</p>
            </div>
        </div>
    `;
    clone.insertBefore(overview, about.nextSibling);
    
    // ---- LAST PAGE ----
    const lastPage = document.createElement('div');
    lastPage.style.cssText = `
        text-align: center;
        padding: 60px 40px 50px 40px;
        border-top: 2px solid #DAA520;
        margin-top: 30px;
        page-break-before: always;
        background: #fafafa;
    `;
    lastPage.innerHTML = `
        <div style="font-size:48px;margin-bottom:16px;">🌟</div>
        <p style="font-size:22px;font-weight:500;color:#1a1a1a;font-style:italic;font-family:'Space Grotesk',sans-serif;max-width:500px;margin:0 auto;">
            "No regrets in life — that's my biggest achievement."
        </p>
        <p style="font-size:18px;color:#DAA520;margin:16px 0;font-family:'Space Grotesk',sans-serif;">— Ravi Raj</p>
        <div style="width:40px;height:2px;background:#DAA520;margin:20px auto;"></div>
        <p style="font-size:15px;color:#666;font-family:'Space Grotesk',sans-serif;">Thank you for reading</p>
        <p style="font-size:13px;color:#999;margin-top:8px;font-family:'Space Grotesk',sans-serif;">Ravi Raj · March ${new Date().getFullYear()}</p>
        <p style="font-size:13px;color:#aaa;margin-top:4px;font-family:'Space Grotesk',sans-serif;">📖 From Begusarai to the World</p>
    `;
    clone.appendChild(lastPage);
    
    // ---- GENERATE PDF ----
    const opt = {
        margin: [15, 15, 15, 15],
        filename: 'My_Autobiography_Ravi_Raj_Ebook.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
            scale: 2,
            useCORS: true,
            letterRendering: true,
            backgroundColor: '#ffffff',
            logging: false
        },
        jsPDF: { 
            unit: 'mm', 
            format: 'a4', 
            orientation: 'portrait' 
        },
        pagebreak: { mode: ['css', 'legacy'] }
    };
    
    html2pdf().set(opt).from(clone).save().then(() => {
        showToast('✅ Ebook downloaded!', 'success');
    }).catch(() => {
        showToast('❌ Download failed. Please try again.', 'error');
    });
}

// ============================================================
// 19. HANDLE CHAPTER HASH IN URL
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
            updateModalChapterName(currentLang);
            
            setTimeout(function() {
                scrollToChapterHeading(currentLang);
            }, 300);
        }
    }
}

// ============================================================
// 20. DOT CLICK NAVIGATION
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
                updateModalChapterName(currentLang);
                
                setTimeout(function() {
                    scrollToChapterHeading(currentLang);
                }, 150);
            }
        });
    });
}

// ============================================================
// 21. INITIALIZATION
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
// 22. EXPOSE FUNCTIONS TO GLOBAL SCOPE
// ============================================================
window.switchLang = switchLang;
window.nextChapter = nextChapter;
window.prevChapter = prevChapter;
window.copyChapterLink = copyChapterLink;
window.openGoogleTranslate = openGoogleTranslate;
window.toggleReadingMode = toggleReadingMode;
window.openModal = openModal;
window.closeModal = closeModal;
window.downloadFullPDF = downloadFullPDF;
window.showToast = showToast;
