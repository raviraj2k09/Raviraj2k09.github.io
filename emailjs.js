// ============================================
// EMAILJS.JS — COMPLETE (Aapke HTML ke hisab se)
// ============================================

(function() {
    'use strict';

    // ============================================
    // CONFIGURATION
    // ============================================
    const EMAILJS_CONFIG = {
        publicKey: 'ZKEUMnGSjznurORAI',
        serviceID: 'service_kc0c1i5',
        templateID: 'template_s53pk7r'
    };

    // ============================================
    // INITIALIZE EMAILJS
    // ============================================
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.publicKey);
        console.log('✅ EmailJS initialized!');
    } else {
        console.warn('⚠️ EmailJS library not loaded!');
    }

    // ============================================
    // CONTACT OPTIONS FUNCTIONS
    // ============================================
    window.showContactOptions = function() {
        const modal = document.getElementById('contactOptionsModal');
        if (modal) modal.style.display = 'flex';
    };

    window.closeContactOptions = function() {
        const modal = document.getElementById('contactOptionsModal');
        if (modal) modal.style.display = 'none';
    };

    window.openEmailForm = function() {
        closeContactOptions();
        const modal = document.getElementById('emailFormModal');
        if (modal) modal.style.display = 'flex';
    };

    window.closeEmailForm = function() {
        const modal = document.getElementById('emailFormModal');
        if (modal) modal.style.display = 'none';
    };

    // ============================================
    // FORM SUBMIT HANDLER (Aapke HTML ke hisab se)
    // ============================================
    document.addEventListener('DOMContentLoaded', function() {
        const form = document.getElementById('contactForm');
        const status = document.getElementById('formStatus');

        if (!form) {
            console.warn('⚠️ Contact form not found!');
            return;
        }

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Show loading
            status.style.display = 'block';
            status.innerHTML = '⏳ Sending...';
            status.style.color = '#aaa';

            // Get form data
            const name = document.getElementById('user_name')?.value || '';
            const email = document.getElementById('user_email')?.value || '';
            const message = document.getElementById('user_message')?.value || '';

            // Validate
            if (!name || !email || !message) {
                status.innerHTML = '❌ Please fill all fields!';
                status.style.color = '#ff4444';
                return;
            }

            // EmailJS send
            emailjs.sendForm(
                EMAILJS_CONFIG.serviceID,
                EMAILJS_CONFIG.templateID,
                form,
                EMAILJS_CONFIG.publicKey
            )
            .then(function(response) {
                console.log('✅ Email sent!', response);
                status.innerHTML = '✅ Message sent successfully!';
                status.style.color = '#00ff88';
                form.reset();

                // Close after 3 seconds
                setTimeout(() => {
                    closeEmailForm();
                    status.style.display = 'none';
                }, 3000);
            })
            .catch(function(error) {
                console.error('❌ EmailJS Error:', error);
                status.innerHTML = '❌ Failed to send. Try again later.';
                status.style.color = '#ff4444';
            });
        });
    });

})();
