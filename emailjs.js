/* ============================================================
   EMAILJS - CONTACT FORM (ALAG FILE)
   ============================================================ */

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    initEmailJS();
});

function initEmailJS() {
    // DOM Elements
    const contactSend = document.getElementById('contactSend');
    const contactName = document.getElementById('contactName');
    const contactEmail = document.getElementById('contactEmail');
    const contactMessage = document.getElementById('contactMessage');
    const contactStatus = document.getElementById('contactStatus');
    const chatMessages = document.getElementById('chatMessages');

    // Reset function
    function resetToModeSelection() {
        const modeSelection = document.getElementById('modeSelection');
        const contactForm = document.getElementById('contactForm');
        if (modeSelection) modeSelection.style.display = 'flex';
        if (contactForm) {
            contactForm.classList.remove('active');
            contactForm.style.display = 'none';
        }
        if (chatMessages) {
            chatMessages.innerHTML = `
                <div class="message bot">👋 Arey bhai! Main Ravi — Bihar, Begusarai se hoon. <span class="time">Just now</span></div>
                <div class="message bot">Kya help chahiye? Neeche se option choose karo. <span class="time">Just now</span></div>
            `;
        }
        if (contactStatus) {
            contactStatus.textContent = '';
            contactStatus.style.color = '';
        }
    }

    if (!contactSend) {
        console.warn('⚠️ Contact form elements not found!');
        return;
    }

    contactSend.addEventListener('click', function() {
        const name = contactName.value.trim();
        const email = contactEmail.value.trim();
        const message = contactMessage.value.trim();

        // ---- Validation ----
        if (!name || !email || !message) {
            contactStatus.textContent = '⚠️ Please fill all fields.';
            contactStatus.style.color = '#ef4444';
            return;
        }

        if (!email.includes('@') || !email.includes('.')) {
            contactStatus.textContent = '⚠️ Please enter a valid email address.';
            contactStatus.style.color = '#ef4444';
            return;
        }

        // ---- Loading State ----
        contactSend.disabled = true;
        contactSend.textContent = '⏳ Sending...';
        contactStatus.textContent = '';
        contactStatus.style.color = '';

        // ---- EmailJS ----
        if (typeof emailjs !== 'undefined') {
            emailjs.init("ZKEUMnGSjznurORAI");
        } else {
            contactStatus.textContent = '❌ Email service not available.';
            contactStatus.style.color = '#ef4444';
            contactSend.disabled = false;
            contactSend.textContent = 'Send Message';
            return;
        }

        const templateParams = {
            from_name: name,
            from_email: email,
            message: message,
            time: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
        };

        emailjs.send('service_kc0c1i5', 'template_s53pk7r', templateParams)
            .then(() => {
                contactStatus.textContent = '✅ Message sent successfully! I\'ll reply within 24 hours.';
                contactStatus.style.color = '#4ade80';
                contactSend.disabled = false;
                contactSend.textContent = 'Send Message';
                contactName.value = '';
                contactEmail.value = '';
                contactMessage.value = '';

                if (chatMessages) {
                    chatMessages.innerHTML += `
                        <div class="message system">📧 Message sent! I\'ll reply within 24 hours.</div>
                    `;
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }

                setTimeout(() => {
                    resetToModeSelection();
                }, 5000);
            })
            .catch((error) => {
                console.error('EmailJS Error:', error);
                contactStatus.textContent = '❌ Failed to send. Please try again.';
                contactStatus.style.color = '#ef4444';
                contactSend.disabled = false;
                contactSend.textContent = 'Send Message';
            });
    });

    console.log('✅ EmailJS initialized successfully!');
}
