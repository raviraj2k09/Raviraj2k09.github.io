// ============================================================
// SECURITY.JS - Website Protection Script
// ============================================================

(function() {
    'use strict';
    
    console.log('🔒 Security enabled!');
    
    // ============================================================
    // 1. CONSOLE BLOCK - Koi console par commands nahi run kar sakta
    // ============================================================
    console.log = function() {};
    console.warn = function() {};
    console.error = function() {};
    console.info = function() {};
    console.debug = function() {};
    console.table = function() {};
    console.group = function() {};
    console.groupEnd = function() {};
    
    // ============================================================
    // 2. RIGHT CLICK DISABLE - Koi copy na kar paye
    // ============================================================
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        // Comment karo agar alert nahi dikhana
        // alert('🔒 Right click disabled!');
        return false;
    });
    
    // ============================================================
    // 3. KEYBOARD SHORTCUTS BLOCK - Developer tools open na ho
    // ============================================================
    document.addEventListener('keydown', function(e) {
        // F12
        if (e.key === 'F12') {
            e.preventDefault();
            return false;
        }
        
        // Ctrl+U (View Source)
        if (e.ctrlKey && (e.key === 'u' || e.key === 'U')) {
            e.preventDefault();
            return false;
        }
        
        // Ctrl+Shift+I (Inspect)
        if (e.ctrlKey && e.shiftKey && (e.key === 'i' || e.key === 'I')) {
            e.preventDefault();
            return false;
        }
        
        // Ctrl+Shift+J (Console)
        if (e.ctrlKey && e.shiftKey && (e.key === 'j' || e.key === 'J')) {
            e.preventDefault();
            return false;
        }
        
        // Ctrl+Shift+C (Inspect Element)
        if (e.ctrlKey && e.shiftKey && (e.key === 'c' || e.key === 'C')) {
            e.preventDefault();
            return false;
        }
    });
    
    // ============================================================
    // 4. COPY-PASTE DISABLE - Content copy na ho
    // ============================================================
    document.addEventListener('copy', function(e) {
        e.preventDefault();
        return false;
    });
    
    document.addEventListener('cut', function(e) {
        e.preventDefault();
        return false;
    });
    
    document.addEventListener('paste', function(e) {
        e.preventDefault();
        return false;
    });
    
    // ============================================================
    // 5. SELECTION DISABLE - Text select na kar paye
    // ============================================================
    document.addEventListener('selectstart', function(e) {
        e.preventDefault();
        return false;
    });
    
    // CSS se bhi disable kar sakte ho (optional)
    // document.body.style.userSelect = 'none';
    
    // ============================================================
    // 6. INPUT SANITIZATION - XSS attacks se bachao
    // ============================================================
    function sanitizeInput(value) {
        // HTML tags ko remove karo
        return value.replace(/[<>"'/]/g, '');
    }
    
    // Sab input fields par apply karo
    document.addEventListener('DOMContentLoaded', function() {
        document.querySelectorAll('input, textarea, [contenteditable="true"]').forEach(function(element) {
            element.addEventListener('input', function() {
                this.value = sanitizeInput(this.value);
            });
            
            element.addEventListener('paste', function(e) {
                setTimeout(function() {
                    this.value = sanitizeInput(this.value);
                }.bind(this), 10);
            });
        });
    });
    
    // ============================================================
    // 7. SESSION TIMEOUT - 5 minute idle par auto refresh
    // ============================================================
    var idleTime = 0;
    var idleInterval = setInterval(function() {
        idleTime++;
        if (idleTime > 300) { // 5 minutes (60 seconds * 5)
            alert('⏰ Session expired! Refreshing page...');
            window.location.reload();
        }
    }, 1000); // Har second check karega
    
    // User koi bhi activity kare toh timer reset
    function resetIdleTimer() {
        idleTime = 0;
    }
    
    document.addEventListener('click', resetIdleTimer);
    document.addEventListener('keydown', resetIdleTimer);
    document.addEventListener('scroll', resetIdleTimer);
    document.addEventListener('mousemove', resetIdleTimer);
    document.addEventListener('touchstart', resetIdleTimer);
    
    // ============================================================
    // 8. GRACEFUL ERROR HANDLING - Website crash na ho
    // ============================================================
    window.onerror = function(message, source, lineno, colno, error) {
        console.log('⚠️ Error occurred:', message);
        
        // Agar koi error aata hai toh user ko friendly message dikhao
        // But sirf tab jab page completely blank na ho jaye
        if (document.body) {
            // Agar body empty hai toh fallback dikhao
            if (document.body.innerHTML.trim() === '') {
                document.body.innerHTML = `
                    <div style="text-align:center;padding:50px;font-family:Arial,sans-serif;">
                        <h2 style="color:#ff6b6b;">⚠️ Oops! Something went wrong</h2>
                        <p style="color:#666;margin:20px 0;">Please refresh the page to continue.</p>
                        <button onclick="location.reload()" style="
                            padding:12px 30px;
                            background:#4a6cf7;
                            color:white;
                            border:none;
                            border-radius:8px;
                            font-size:16px;
                            cursor:pointer;
                        ">
                            🔄 Refresh Page
                        </button>
                    </div>
                `;
            }
        }
        
        return true; // Prevent default error
    };
    
    // Unhandled Promise rejections handle karo
    window.addEventListener('unhandledrejection', function(e) {
        e.preventDefault();
        console.log('⚠️ Unhandled Promise rejection:', e.reason);
        return true;
    });
    
    // ============================================================
    // 9. DEVTools DETECTION - Developer tools open hai toh alert
    // ============================================================
    (function detectDevTools() {
        var devtoolsOpen = false;
        var threshold = 160; // Element ka size check
        
        function checkDevTools() {
            var widthDiff = window.outerWidth - window.innerWidth;
            var heightDiff = window.outerHeight - window.innerHeight;
            
            if (widthDiff > threshold || heightDiff > threshold) {
                if (!devtoolsOpen) {
                    devtoolsOpen = true;
                    console.clear();
                    alert('🔒 Developer tools detected! Please close them for security.');
                }
            } else {
                devtoolsOpen = false;
            }
        }
        
        // Har 2 second check karo
        setInterval(checkDevTools, 2000);
        
        // Window resize pe bhi check karo
        window.addEventListener('resize', checkDevTools);
    })();
    
    // ============================================================
    // 10. ANTI-TAMPERING - DOM modifications check
    // ============================================================
    var originalHTML = document.documentElement.outerHTML;
    
    setInterval(function() {
        var currentHTML = document.documentElement.outerHTML;
        // Agar koi important change hua toh notify karo
        if (currentHTML.length !== originalHTML.length) {
            console.log('⚠️ DOM modification detected!');
            // Reset karo (optional)
            // location.reload();
        }
    }, 5000); // Har 5 second check
    
    console.log('✅ All security features loaded!');
    
})();
