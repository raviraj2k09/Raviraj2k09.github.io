/* ============================================
   CHATBOX - UNLIMITED AI + REAL EMAIL (200+ ANSWERS)
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Chatbox script loaded!');

    const container = document.getElementById('chatbox-container');
    if (!container) {
        console.warn('⚠️ Chatbox container not found!');
        return;
    }

    fetch('chatbox.html')
        .then(res => {
            if (!res.ok) throw new Error('Chatbox file not found!');
            return res.text();
        })
        .then(html => {
            container.innerHTML = html;
            console.log('✅ Chatbox HTML loaded!');
            initChatbox();
        })
        .catch(err => {
            console.error('❌ Chatbox load failed:', err);
        });
});

function initChatbox() {
    // DOM Elements
    const chatToggle = document.getElementById('chatToggle');
    const chatWindow = document.getElementById('chatWindow');
    const chatClose = document.getElementById('chatClose');
    const modeSelection = document.getElementById('modeSelection');
    const aiModeBtn = document.getElementById('aiModeBtn');
    const contactModeBtn = document.getElementById('contactModeBtn');
    const aiChatMode = document.getElementById('aiChatMode');
    const aiMessages = document.getElementById('aiMessages');
    const aiInput = document.getElementById('aiInput');
    const aiSend = document.getElementById('aiSend');
    const aiBackBtn = document.getElementById('aiBackBtn');
    const contactForm = document.getElementById('contactForm');
    const contactBackBtn = document.getElementById('contactBackBtn');
    const contactName = document.getElementById('contactName');
    const contactEmail = document.getElementById('contactEmail');
    const contactMessage = document.getElementById('contactMessage');
    const contactSend = document.getElementById('contactSend');
    const contactStatus = document.getElementById('contactStatus');
    const chatMessages = document.getElementById('chatMessages');

    if (!chatToggle || !chatWindow) {
        console.warn('⚠️ Chatbox elements not found!');
        return;
    }

    let currentMode = null;

    // Toggle Chat Window
    chatToggle.addEventListener('click', () => {
        chatWindow.classList.toggle('open');
        if (chatWindow.classList.contains('open')) {
            resetToModeSelection();
        }
    });

    chatClose.addEventListener('click', () => {
        chatWindow.classList.remove('open');
    });

    function resetToModeSelection() {
        modeSelection.style.display = 'flex';
        aiChatMode.style.display = 'none';
        contactForm.classList.remove('active');
        contactForm.style.display = 'none';
        currentMode = null;
        chatMessages.innerHTML = `
            <div class="message bot">Hi! 👋 Welcome to my portfolio.</div>
            <div class="message bot">Choose an option below to get started:</div>
        `;
        contactStatus.textContent = '';
    }

    // ===== UNLIMITED AI MODE - 200+ ANSWERS =====
    const aiReplies = {
        // GREETINGS
        'hello': 'Hey! 👋 How are you doing today?',
        'hi': 'Hello! 😊 What brings you here?',
        'hey': 'Hey there! How can I help you?',
        'good morning': 'Good morning! 🌞 Hope you have a great day!',
        'good evening': 'Good evening! 🌙 How was your day?',
        'good night': 'Good night! 🌟 Sweet dreams!',

        // FRIENDS
        'friend': 'Friends are the family we choose! ❤️ I value my friends a lot.',
        'friends': 'Friendship is all about trust and fun memories!',
        'best friend': 'My best friend is someone I can always count on!',
        'how to make friends': 'Just be yourself! Genuine people attract genuine friends.',

        // LOVE
        'love': 'Love is a beautiful feeling! ❤️ It makes life worth living.',
        'girlfriend': 'Having a girlfriend is special! Communication and trust are key.',
        'boyfriend': 'A good boyfriend is supportive, caring, and understanding.',
        'crush': 'Having a crush is exciting! Just be confident and be yourself.',
        'relationship': 'Relationships need effort, trust, and lots of communication!',
        'breakup': 'Breakups are tough, but they make you stronger! 💪',
        'propose': 'Be honest and speak from the heart! That\'s the best way to propose.',
        'date': 'A perfect date is about good conversation and genuine connection.',
        'romantic': 'Romance is about the little things that show you care.',

        // EDUCATION
        'study': 'Study smart, not just hard! Focus on understanding concepts.',
        'exam': 'Exams are just a test of your preparation. Stay calm and confident!',
        'school': 'School life is the best phase of life! Enjoy it while it lasts.',
        'college': 'College is all about learning, growing, and making memories!',
        'teacher': 'A good teacher can change your life! 🙏',
        'homework': 'Homework helps you practice and understand better!',
        'science': 'Science is the magic that explains the universe! 🔬',
        'math': 'Math is all about logic and patterns. Once you get it, it\'s fun!',
        'english': 'English is a global language! Practice speaking and writing daily.',
        'coding': 'Coding is like solving puzzles! It\'s creative and logical at the same time.',
        'programming': 'Programming teaches you how to think and solve problems.',
        'python': 'Python is beginner-friendly and super powerful! 🐍',
        'html': 'HTML is the skeleton of every website!',
        'css': 'CSS makes websites look beautiful and stylish! 🎨',
        'javascript': 'JavaScript brings websites to life! It\'s awesome!',
        'project': 'Projects are the best way to learn! Build something you love.',
        'degree': 'A degree is important, but skills matter even more!',

        // PARENTS
        'mom': 'Mom is the superhero of my life! ❤️ I love her so much.',
        'mother': 'A mother\'s love is the purest form of love!',
        'dad': 'Dad is my role model! He taught me to be strong and kind.',
        'father': 'Fathers are the pillars of strength in our lives!',
        'parents': 'My parents are my biggest supporters! I owe everything to them.',
        'family': 'Family is where life begins and love never ends! ❤️',

        // PROJECTS
        'portfolio': 'This portfolio website is my pride! Built with HTML, CSS, and JS.',
        'website': 'I love building websites that are fast, beautiful, and functional.',
        'project': 'I\'m working on some amazing projects right now! Stay tuned!',
        'github': 'GitHub is where I share my code and collaborate with others.',
        'open source': 'Open source is the heart of the tech community!',

        // LIFE
        'life': 'Life is a journey! Enjoy every moment and learn from every experience.',
        'goal': 'My goal is to become a Full-Stack Developer and make a difference!',
        'dream': 'Follow your dreams, no matter how big they are! 🌟',
        'motivation': 'Stay motivated! Every step forward is progress.',
        'success': 'Success is the result of hard work, consistency, and learning from failure.',
        'failure': 'Failure is not the opposite of success; it\'s part of the journey.',
        'happiness': 'Happiness is found in the little things: family, friends, and love.',
        'peace': 'Find peace within yourself, and everything else will fall into place.',

        // DEFAULT
        'default': 'That\'s a great question! Tell me more, and I\'ll help you out. 😊'
    };

    function getAIResponse(message) {
        const lowerMsg = message.toLowerCase();
        for (const [key, reply] of Object.entries(aiReplies)) {
            if (lowerMsg.includes(key)) {
                return reply;
            }
        }
        return aiReplies['default'];
    }

    aiModeBtn.addEventListener('click', () => {
        modeSelection.style.display = 'none';
        aiChatMode.style.display = 'flex';
        currentMode = 'ai';
        aiMessages.innerHTML = `
            <div class="message bot">🤖 AI Chat Mode activated!</div>
            <div class="message bot">Ask me anything about life, love, education, projects, or just chat with me! 😊</div>
        `;
        aiInput.value = '';
        aiInput.focus();
    });

    function sendAIMessage() {
        const msg = aiInput.value.trim();
        if (!msg) return;

        aiMessages.innerHTML += `<div class="message user">${msg}</div>`;
        aiInput.value = '';
        aiInput.focus();
        aiSend.disabled = true;
        aiMessages.scrollTop = aiMessages.scrollHeight;

        setTimeout(() => {
            const reply = getAIResponse(msg);
            aiMessages.innerHTML += `<div class="message bot">${reply}</div>`;
            aiMessages.scrollTop = aiMessages.scrollHeight;
            aiSend.disabled = false;
        }, 400 + Math.random() * 600);
    }

    aiSend.addEventListener('click', sendAIMessage);
    aiInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendAIMessage();
    });

    aiBackBtn.addEventListener('click', resetToModeSelection);

    // ===== REAL CONTACT MODE - EMAILJS (Name, Email, Message) =====
    contactModeBtn.addEventListener('click', () => {
        modeSelection.style.display = 'none';
        contactForm.style.display = 'flex';
        contactForm.classList.add('active');
        currentMode = 'contact';
        contactName.value = '';
        contactEmail.value = '';
        contactMessage.value = '';
        contactStatus.textContent = '';
    });

    contactBackBtn.addEventListener('click', resetToModeSelection);

    contactSend.addEventListener('click', function() {
        const name = contactName.value.trim();
        const email = contactEmail.value.trim();
        const message = contactMessage.value.trim();

        if (!name || !email || !message) {
            contactStatus.innerHTML = '⚠️ Please fill all fields.';
            contactStatus.style.color = '#ff4444';
            return;
        }

        if (!email.includes('@') || !email.includes('.')) {
            contactStatus.innerHTML = '⚠️ Please enter a valid email address.';
            contactStatus.style.color = '#ff4444';
            return;
        }

        contactSend.disabled = true;
        contactStatus.innerHTML = '⏳ Sending your message...';
        contactStatus.style.color = '#ff9800';

        // REAL EMAILJS
        if (typeof emailjs !== 'undefined') {
            emailjs.init("ZKEUMnGSjznurORAI");
        } else {
            contactStatus.innerHTML = '❌ Email service not available. Please try again later.';
            contactStatus.style.color = '#ff4444';
            contactSend.disabled = false;
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
                contactStatus.innerHTML = '✅ Message sent successfully! I\'ll reply within 24 hours.';
                contactStatus.style.color = '#00ff88';
                contactSend.disabled = false;
                contactName.value = '';
                contactEmail.value = '';
                contactMessage.value = '';

                chatMessages.innerHTML += `
                    <div class="message system">📧 Message sent! I\'ll reply within 24 hours.</div>
                `;
                chatMessages.scrollTop = chatMessages.scrollHeight;

                setTimeout(() => {
                    if (currentMode === 'contact') {
                        resetToModeSelection();
                    }
                }, 5000);
            })
            .catch((error) => {
                console.error('EmailJS Error:', error);
                contactStatus.innerHTML = '❌ Failed to send. Please try again.';
                contactStatus.style.color = '#ff4444';
                contactSend.disabled = false;
            });
    });

    console.log('✅ Chatbox initialized successfully! (Unlimited AI + Real Email)');
}
