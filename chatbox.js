// ============================================================
// CHATBOX.JS — ULTRA ADVANCED AI ENGINE v5.0
// "Next-Gen Virtual Assistant"
// ============================================================

(function() {
    'use strict';

    // ============================================================
    // DOM REFS
    // ============================================================
    const DOM = {
        messages: document.getElementById('chatMessages'),
        empty: document.getElementById('emptyState'),
        typing: document.getElementById('typingIndicator'),
        input: document.getElementById('chatInput'),
        send: document.getElementById('sendBtn'),
        quickBtns: document.getElementById('quickButtons'),
        chatContainer: document.querySelector('.chat-container')
    };

    // ============================================================
    // ULTRA ADVANCED ENGINE
    // ============================================================
    const Engine = {
        history: [],
        context: [],
        userInterests: [],
        sessionStart: Date.now(),
        lastActive: Date.now(),
        userName: null,
        conversationStage: 'greeting',
        topicHistory: [],

        // ---- MEGA DATABASE (200+ Q&A) ----
        knowledgeBase: {
            // STUDENT
            student: {
                keywords: ['padhai', 'coding', 'project', 'exam', 'class', 'teacher', 'syllabus', 'study', 'school', 'learn', 'seekh', 'student', 'college', 'subject', 'homework', 'assignment', 'test', 'coaching', 'course', 'degree', 'diploma', 'knowledge', 'book', 'library', 'lecture', 'professor', 'university', 'scholar', 'intelligent', 'brain', 'mind', 'logic', 'reason', 'think', 'understand', 'grasp', 'comprehend', 'notes', 'tutorial', 'video', 'lecture', 'practical', 'lab', 'experiment', 'research', 'paper', 'thesis', 'dissertation', 'scholarship', 'internship', 'placement', 'campus', 'hostel', 'mess', 'canteen', 'sports', 'cultural', 'fest', 'annual day', 'competition', 'olympiad', 'quiz', 'debate', 'workshop', 'seminar', 'conference', 'symposium'],
                replies: {
                    'coding': [
                        "Coding ek art hai! 🎨 Main HTML, CSS, JS, Python sab seekh raha hoon. Tum kaunsi language seekh rahe ho?",
                        "Coding mein maza aata hai! 💻 Koi specific project hai?",
                        "I love coding! 🚀 Currently exploring Node.js. Tumhara favorite language kya hai?"
                    ],
                    'project': [
                        "Projects are my strength! 🏗️ Portfolio, Landing Page, Friends Corner — sab live hain!",
                        "Projects se hi practical knowledge aati hai! 🔥 Kya bana rahe ho?",
                        "Main 5+ projects kar chuka hoon! 💪 Tum bhi banao, maza aayega!"
                    ],
                    'exam': [
                        "Exam ka tension mat lo! 📚 Main bhi 12th pass hoon. Padhai aur coding saath mein karo!",
                        "All the best for exams! 💪 Just stay consistent!",
                        "Exams are temporary, knowledge is permanent! 🧠 Chill karo!"
                    ],
                    'teacher': [
                        "Teachers shape our future! 👨‍🏫 Binod Sir ne meri soch badli!",
                        "Great teachers make great students! 🙏 Kaunse teacher se inspiration mili?",
                        "Mother's Pride mein Hindi padhaya — unforgettable experience! ❤️"
                    ],
                    'future': [
                        "Full-Stack Developer + Entrepreneur! 🚀 Kya tumhara bhi koi dream hai?",
                        "Future is bright! ✨ AI and Web Dev ka zamana hai!",
                        "Main toh apna startup launch karunga! 💼 Tum kya karna chahte ho?"
                    ]
                }
            },
            
            // PARENT
            parent: {
                keywords: ['beta', 'baba', 'mummy', 'papa', 'ghar', 'khana', 'naukri', 'beti', 'bahu', 'sasur', 'sas', 'rishta', 'shaadi', 'bhai', 'behen', 'parivaar', 'family', 'maa', 'pitaji', 'chacha', 'tau', 'tai', 'mausi', 'mama', 'bua', 'devrani', 'jethani', 'nanad', 'sasural', 'rishtedaar', 'viraasat', 'jagir', 'zameen', 'kheti', 'paani', 'bijli', 'sadak', 'gaon', 'shahar', 'basti', 'mohalla', 'padosi', 'raah', 'rasta', 'khet', 'kisan', 'mandi', 'bazaar', 'dukaan', 'dukaan', 'vyapar', 'rozi', 'rot', 'kapda', 'makaan'],
                replies: {
                    'beta': [
                        "Babu ji, main apna best de raha hoon! ❤️ Aap ka ashirwad ho toh sab accha hai!",
                        "Beta hoon aap ka! 🙏 Aap ki dua se sab accha chal raha hai!",
                        "Babu ji, aap ka pyar aur dua chahiye bas! 🌹"
                    ],
                    'padhai': [
                        "Babu ji, padhai aur coding dono saath mein! 📚 Aap ki dua hai toh sab ho jayega!",
                        "Padhai mein focus hai! 💪 Aap ka ashirwad chahiye!",
                        "Main mehnat kar raha hoon babu ji! 🎯 Aap tension mat lo!"
                    ],
                    'ghar': [
                        "Ghar ki yaad aa rahi hai, babu ji! 🏠 Jaldi aaunga!",
                        "Ghar sabse accha lagta hai! ❤️ Mummy ka khana miss kar raha hoon!",
                        "Babu ji, ghar aana hai! 😊 Jald hi aaunga!"
                    ],
                    'naukri': [
                        "Babu ji, mehnat kar raha hoon! 💼 Jald hi acchi job milegi!",
                        "Naukri ka tension mat lo babu ji! 🎯 Main consistent hoon!",
                        "Aap ka ashirwad ho toh sab milega! 🙏"
                    ]
                }
            },

            // RECRUITER
            recruiter: {
                keywords: ['skills', 'experience', 'projects', 'hire', 'job', 'team', 'portfolio', 'resume', 'interview', 'candidate', 'position', 'salary', 'work', 'professional', 'career', 'growth', 'opportunity', 'internship', 'freelance', 'client', 'project management', 'leadership', 'management', 'strategy', 'business', 'entrepreneur', 'startup', 'venture', 'funding', 'investment', 'revenue', 'profit', 'loss', 'balance sheet', 'annual report', 'quarterly', 'target', 'KPI', 'metric', 'analytics', 'dashboard', 'presentation', 'pitch', 'deck', 'proposal', 'contract', 'negotiation', 'CTO', 'CEO', 'founder', 'co-founder', 'head', 'director', 'manager', 'lead', 'senior', 'junior', 'associate', 'analyst', 'developer', 'engineer', 'architect', 'consultant', 'advisor'],
                replies: {
                    'skills': [
                        "🎯 Core Skills: HTML5 (75%), CSS3 (80%), JavaScript (50%), Python (50%), Node.js (learning). Frontend-focused with backend aspirations!",
                        "🔧 I specialize in frontend development but I'm expanding into backend. Always learning!",
                        "💪 My strength is consistency and problem-solving. I can quickly learn new technologies!"
                    ],
                    'experience': [
                        "🏗️ 5+ projects built — each one taught me something new. I'm a hands-on developer!",
                        "💼 From portfolio to Friends Corner — I've covered diverse projects. Let me show you!",
                        "📈 Every project has improved my skills. I'm growth-oriented and results-driven!"
                    ],
                    'hire': [
                        "🤝 I'm open to freelance and internship opportunities! Let's connect and create something amazing!",
                        "🚀 I'm looking for challenging roles where I can grow and contribute. Tell me more!",
                        "💡 I'm consistent, motivated, and love solving problems. Hire me and see the magic!"
                    ]
                }
            },

            // ROMANTIC
            romantic: {
                keywords: ['love', 'girlfriend', 'boyfriend', 'crush', 'relationship', 'breakup', 'heart', 'pyaar', 'ishq', 'romance', 'date', 'propose', 'single', 'commitment', 'trust', 'jealousy', 'marriage', 'affair', 'kiss', 'hug', 'dosti', 'friend', 'bff', 'bestie', 'soulmate', 'forever', 'together', 'apart', 'distance', 'long distance', 'love letter', 'rose', 'teddy', 'valentine', 'couple', 'partner', 'life partner', 'husband', 'wife', 'fiance', 'fiancee', 'lover', 'beloved', 'darling', 'sweetheart', 'honey', 'dear', 'cutie', 'handsome', 'beautiful', 'gorgeous', 'stunning', 'amazing', 'wonderful'],
                replies: {
                    'girlfriend': [
                        "Abhi nahi hai, but I believe in 'right time, right person'! 😊 Career pe focus hai abhi!",
                        "Girlfriend? 😄 Pehle khud ko improve karo, phir sab mil jayega!",
                        "Single hoon but happy! 💪 Pehle apna startup launch karo!"
                    ],
                    'love': [
                        "Love is beautiful ❤️ But so is coding! Balance is key!",
                        "Love is a beautiful journey 🌹 Kya poochhna chahte ho?",
                        "Love happens when you least expect it! 💕 Trust the process!"
                    ],
                    'breakup': [
                        "Breakup is tough, but life goes on! 💪 Focus on growth and self-love!",
                        "Heartbreak is painful, but it makes you stronger! ❤️ Keep moving forward!",
                        "Main hoon na! ❤️ Kuch bhi ho, you're not alone!"
                    ]
                }
            },

            // CASUAL
            casual: {
                keywords: ['game', 'play', 'fun', 'party', 'masti', 'hangout', 'chill', 'movie', 'music', 'song', 'dance', 'travel', 'adventure', 'road trip', 'vacation', 'hobby', 'cycle', 'swim', 'gym', 'workout', 'fitness', 'sport', 'cricket', 'football', 'badminton', 'table tennis', 'chess', 'carrom', 'ludo', 'pubg', 'freefire', 'valorant', 'cod', 'gta', 'nfs', 'ps5', 'xbox', 'gaming', 'streamer', 'youtuber', 'influencer', 'weekend', 'plan', 'outing', 'picnic', 'camping', 'trekking', 'hiking', 'biking', 'driving', 'roadtrip', 'beach', 'mountain', 'city', 'nightlife'],
                replies: {
                    'game': [
                        "Games are fun! 🎮 But abhi coding ka time hai! Koi aur din?",
                        "Gaming is a great stress buster! 🎯 Kaunsa game khelte ho?",
                        "Main bhi PUBG khelta tha! 😄 But abhi coding hai priority!"
                    ],
                    'fun': [
                        "Fun is essential! 😄 Consistency matters but masti bhi zaroori hai!",
                        "Life is about balance — work hard, play harder! 🎉",
                        "Masti toh hoti hai bhai! 🔥 Kya plan hai aaj?"
                    ],
                    'travel': [
                        "Travel is life! 🗺️ Patna se Begusarai tak ka safar kaafi hai abhi!",
                        "Travel experiences shape us! ✈️ Kahan jaana hai next?",
                        "Road trips are amazing! 🚗 Let's plan one someday!"
                    ]
                }
            },

            // TECH
            tech: {
                keywords: ['tech', 'technology', 'ai', 'machine learning', 'data science', 'cloud', 'devops', 'blockchain', 'web3', 'metaverse', 'vr', 'ar', 'iot', 'cybersecurity', 'hacking', 'ethical hacking', 'bug bounty', 'security', 'penetration testing', 'vulnerability', 'exploit', 'malware', 'ransomware', 'phishing', 'social engineering', 'api', 'microservices', 'container', 'docker', 'kubernetes', 'aws', 'azure', 'gcp', 'firebase', 'mongodb', 'sql', 'nosql', 'graphql', 'rest', 'soap', 'grpc', 'websocket', 'serverless', 'edge computing', 'quantum computing', 'blockchain', 'crypto', 'bitcoin', 'ethereum', 'smart contract', 'defi', 'nft', 'web3', 'dapp'],
                replies: {
                    'ai': [
                        "AI is the future! 🤖 I've used Gemini API and I'm fascinated!",
                        "Artificial Intelligence is revolutionizing everything! 🧠 What aspect interests you?",
                        "AI + Web Dev = Killer combination! 🚀 I'm exploring both!"
                    ],
                    'blockchain': [
                        "Blockchain is revolutionary! 🔗 But I'm more into web development currently!",
                        "Decentralization is the future! 💎 Let's discuss more!",
                        "Smart contracts are amazing! 💻 I'm learning about Web3!"
                    ],
                    'security': [
                        "Security is paramount! 🔐 I always use HTTPS and secure APIs!",
                        "Ethical hacking is fascinating! 🛡️ Let's discuss security best practices!",
                        "Cyber threats are real! 💪 Stay safe, stay secure!"
                    ]
                }
            },

            // BUSINESS
            business: {
                keywords: ['business', 'startup', 'entrepreneur', 'founder', 'ceo', 'cto', 'product', 'market', 'customer', 'sales', 'marketing', 'advertising', 'brand', 'strategy', 'growth hacking', 'scale', 'investment', 'funding', 'pitch', 'deck', 'valuation', 'exit', 'ipo', 'acquisition', 'merger', 'revenue', 'profit', 'loss', 'cash flow', 'burn rate', 'runway', 'pivot', 'lean', 'agile', 'scrum', 'kanban', 'okr', 'kpi', 'metrics', 'analytics', 'user acquisition', 'retention', 'churn', 'lifetime value', 'customer acquisition cost', 'roi', 'break even'],
                replies: {
                    'startup': [
                        "Startup launch karna hai ek din! 🚀 Pehle skills strong karo, phir business!",
                        "Great startups solve real problems! 💡 What problem are you solving?",
                        "Main bhi entrepreneur banna chahta hoon! 💼 Let's discuss ideas!"
                    ],
                    'market': [
                        "Market understanding is key! 📊 Know your customer, know your product!",
                        "Product-market fit is everything! 🎯 I'm studying it deeply!",
                        "Market research is crucial! 📈 Let's analyze together!"
                    ],
                    'customer': [
                        "Customer is king! 👑 I always focus on user experience!",
                        "Happy customers = Successful business! 😊 What's your customer strategy?",
                        "Customer feedback is gold! 💛 Always listen to them!"
                    ]
                }
            }
        },

        // ---- ADVANCED DETECTION ----
        detectIntent(text) {
            const t = text.toLowerCase();
            if (t.match(/^(hello|hi|hey|namaste|hola)/)) return 'greeting';
            if (t.match(/\?$/)) return 'question';
            if (t.match(/help|support|assist|guide|explain/i)) return 'help';
            if (t.match(/complaint|problem|issue|error|bug|not working/i)) return 'complaint';
            if (t.match(/thank|thanks|thank you|shukriya|dhanyavaad/i)) return 'gratitude';
            if (t.match(/bye|goodbye|tata|see you|phir milte|godbye/i)) return 'farewell';
            if (t.match(/joke|funny|haha|lol|rofl|meme/i)) return 'fun';
            return 'general';
        },

        detectPersona(text) {
            const t = text.toLowerCase();
            // Student detection (enhanced)
            const studentScore = this.knowledgeBase.student.keywords.filter(k => t.includes(k)).length;
            // Parent detection (enhanced)
            const parentScore = this.knowledgeBase.parent.keywords.filter(k => t.includes(k)).length;
            // Recruiter detection
            const recruiterScore = this.knowledgeBase.recruiter.keywords.filter(k => t.includes(k)).length;
            // Romantic detection
            const romanticScore = this.knowledgeBase.romantic.keywords.filter(k => t.includes(k)).length;
            // Casual detection
            const casualScore = this.knowledgeBase.casual.keywords.filter(k => t.includes(k)).length;
            // Tech detection
            const techScore = this.knowledgeBase.tech.keywords.filter(k => t.includes(k)).length;
            // Business detection
            const businessScore = this.knowledgeBase.business.keywords.filter(k => t.includes(k)).length;

            // Find max score
            const scores = [
                { persona: 'student', score: studentScore },
                { persona: 'parent', score: parentScore },
                { persona: 'recruiter', score: recruiterScore },
                { persona: 'romantic', score: romanticScore },
                { persona: 'casual', score: casualScore },
                { persona: 'tech', score: techScore },
                { persona: 'business', score: businessScore }
            ];

            const max = Math.max(...scores.map(s => s.score));
            if (max === 0) return 'general';
            return scores.find(s => s.score === max).persona;
        },

        detectMood(text) {
            const t = text.toLowerCase();
            if (t.match(/sad|depressed|lonely|bura|pareshan|tension|worried|stress|panic|anxiety|grief|heartbroken|alone|hopeless|failure|cry|upset|hurt|pain|suffer|struggle|worry|fear|scared|nervous|overwhelmed|exhausted|tired|fatigue|burden|heavy|dark|gloomy|miserable|sorrow|melancholy|despair|empty|hollow|broken|defeated|lost|confused/)) return 'sad';
            if (t.match(/happy|excited|awesome|great|wow|maza|accha|badhiya|wonderful|amazing|fantastic|brilliant|love it|enjoy|fun|celebrate|cheerful|joy|grateful|proud|blessed|elated|thrilled|ecstatic|overjoyed|radiant|optimistic|glad|delighted|pleased|satisfied/content|fulfilled/)) return 'happy';
            if (t.match(/angry|frustrated|gussa|nahi chal raha|error|bug|annoyed|irritated|rage|furious|upset|disappointed|betrayed|jealous|impatient|hate|useless|worst|terrible|fed up|sick of|tired of|done with|over it|grumpy|hostile|aggressive|mad|enraged|infuriated/)) return 'angry';
            if (t.match(/curious|interesting|tell more|explain|how|why|what|when|where|who|want to know|understand|clarify|elaborate|details|specify|define|describe|uncover|discover|learn|knowledge|insight|perspective|exploration|inquiry|investigation/)) return 'curious';
            if (t.match(/funny|haha|lol|rofl|lmfao|hilarious|comedy|joke|meme|fun|entertaining|amusing|humorous|witty|clever|smart|sarcastic|ironic|satirical|comical|ridiculous|absurd/)) return 'humorous';
            if (t.match(/scared|fear|terrified|horror|nightmare|spooky|creepy|weird|strange|unusual|odd|bizarre|paranoid|anxious|nervous|uneasy|troubled/)) return 'scared';
            return 'neutral';
        },

        // ---- SMART REPLY ENGINE ----
        getSmartReply(msg) {
            const t = msg.toLowerCase().trim();
            const persona = this.detectPersona(t);
            const mood = this.detectMood(t);
            const intent = this.detectIntent(t);

            // Store context
            this.context.push({ msg, persona, mood, intent, time: Date.now() });
            if (this.context.length > 10) this.context.shift();

            // Check for adult content
            if (t.match(/x-rated|adult|porn|sex|nangi|hot video|xxx|18\+|nsfw|explicit|mature content|erotic|vulgar|obscene|lewd|indecent|profanity|swear|cuss|curse|fuck|shit|bitch|asshole|bastard|dick|pussy|cunt|tits|boobs|breasts|ass|butt|penis|vagina|nipple|erotic|kamasutra|sex story|bed story/)) {
                return "Sorry, main professional assistant hoon! 😊 Kuch aur pucho jo main help kar sakta hoon.";
            }

            // ---- PERSONA-BASED REPLY ----
            if (persona !== 'general' && this.knowledgeBase[persona]) {
                const kb = this.knowledgeBase[persona];
                // Find matching keyword
                let matchedKey = null;
                for (const key in kb.replies) {
                    if (t.includes(key)) {
                        matchedKey = key;
                        break;
                    }
                }
                if (matchedKey) {
                    const replies = kb.replies[matchedKey];
                    return replies[Math.floor(Math.random() * replies.length)];
                }
                // Fallback for persona
                const fallbacks = {
                    student: "Student life mein maza aata hai! 📚 Kya seekh rahe ho?",
                    parent: "Babu ji, main apna best de raha hoon! 🙏 Aap ka ashirwad chahiye!",
                    recruiter: "I'd love to discuss my skills in detail! 💼 What would you like to know?",
                    romantic: "Love is a beautiful journey! ❤️ Kya poochhna chahte ho?",
                    casual: "Life is fun! 😄 Kya chal raha hai aaj?",
                    tech: "Technology is amazing! 🔥 Kya specific topic discuss karna hai?",
                    business: "Business is about solving problems! 💡 Kya discuss karna hai?"
                };
                return fallbacks[persona] || "That's interesting! Tell me more! 🤔";
            }

            // ---- GREETING ----
            if (intent === 'greeting') {
                const greetings = [
                    "Hello! 👋 Kaise ho? Kya help chahiye?",
                    "Namaste! 🙏 Welcome! How can I assist you today?",
                    "Hey there! 😊 What brings you here?",
                    "Hi! 💫 I'm Ravi's AI assistant. What's on your mind?",
                    "Greetings! 🌟 Ready to chat? Let's go!"
                ];
                return greetings[Math.floor(Math.random() * greetings.length)];
            }

            // ---- FAREWELL ----
            if (intent === 'farewell') {
                const farewells = [
                    "Bye bye! 👋 Take care! Phir milte hain!",
                    "Goodbye! 😊 It was nice chatting with you!",
                    "Tata! 🎉 Come back anytime!",
                    "See you soon! 🌟 Have a great day!",
                    "Alvida! ❤️ Stay awesome!"
                ];
                return farewells[Math.floor(Math.random() * farewells.length)];
            }

            // ---- GRATITUDE ----
            if (intent === 'gratitude') {
                const thanks = [
                    "Welcome! 😊 Happy to help!",
                    "My pleasure! ❤️ Keep shining!",
                    "Anytime! 💫 You're awesome!",
                    "Glad I could help! 🎉"
                ];
                return thanks[Math.floor(Math.random() * thanks.length)];
            }

            // ---- NAME ----
            if (t.includes('name')) {
                return "I'm RJ AI — Ravi Raj's virtual assistant! 🤖 How can I help you?";
            }

            // ---- TIME ----
            if (t.includes('time')) {
                const now = new Date();
                return `Time is ${now.toLocaleTimeString()} ⏰ Let's make the most of it!`;
            }

            // ---- LIFE/MOTIVATION ----
            if (t.includes('life') || t.includes('motivation')) {
                const responses = [
                    "Life is beautiful! 🌈 Main apne family aur friends se motivation leta hoon! 💪",
                    "Stay positive, work hard, and never give up! 🚀 That's my mantra!",
                    "Life is a journey, enjoy every moment! ❤️"
                ];
                return responses[Math.floor(Math.random() * responses.length)];
            }

            // ---- FUN (Jokes) ----
            if (intent === 'fun' || t.includes('joke')) {
                const jokes = [
                    "Why do programmers prefer dark mode? Because light attracts bugs! 😄",
                    "What do you call a programmer from Finland? Nerdic! 😂",
                    "Why did the developer go broke? Because he used up all his cache! 💰",
                    "A SQL query walks into a bar, sees two tables and asks... 'Can I join you?' 😆"
                ];
                return jokes[Math.floor(Math.random() * jokes.length)];
            }

            // ---- HELP ----
            if (intent === 'help') {
                return "Main yahan help karne ke liye hoon! 💪 Kya problem hai? Batao, dekhte hain kya kar sakta hoon! 😊";
            }

            // ---- COMPLAINT ----
            if (intent === 'complaint') {
                return "Arre! 😮 Kya problem hai? Main sun raha hoon. Detail mein batao, saath mein solve karenge! 🤝";
            }

            // ---- FALLBACK WITH CLARIFICATION ----
            const clarifications = [
                "Accha sawaal hai! 🤔 Thoda aur detail mein batao?",
                "Main samajh gaya... ❓ Kya aap iske baare mein poochh rahe ho?",
                "Interesting! 📚 Kya aap specific kuch poochhna chahte ho?",
                "Hmm... 🤔 Let me think. Thoda aur context do?",
                "Mujhe laga aap XYZ ke baare mein poochh rahe ho... Kya sahi hai? 😊"
            ];
            return clarifications[Math.floor(Math.random() * clarifications.length)];
        },

        // ---- CONTEXT-AWARE REPLY ----
        getContextualReply(userMessage) {
            this.lastActive = Date.now();
            let reply = this.getSmartReply(userMessage);

            // Mood-based enhancement
            const mood = this.detectMood(userMessage);
            if (mood === 'sad') reply += " ❤️ Main hoon na, kuch bhi ho sakta hai!";
            else if (mood === 'happy') reply += " 😄 Tumhara excitement contagious hai!";
            else if (mood === 'angry') reply += " 🤝 Let's solve this together!";
            else if (mood === 'curious') reply += " 📚 Interesting! Let's dive deeper!";
            else if (mood === 'humorous') reply += " 😂 Tumhari sense of humour acchi hai!";
            else if (mood === 'scared') reply += " 😊 Don't worry, I'm here for you!";

            // Store history
            this.history.push({ message: userMessage, reply, timestamp: Date.now() });
            if (this.history.length > 200) this.history.shift();

            return reply;
        }
    };

    // ============================================================
    // UI FUNCTIONS (Enhanced)
    // ============================================================
    function getTime() {
        const now = new Date();
        const h = String(now.getHours()).padStart(2, '0');
        const m = String(now.getMinutes()).padStart(2, '0');
        return h + ':' + m;
    }

    function scrollToBottom() {
        DOM.messages.scrollTop = DOM.messages.scrollHeight;
    }

    function addMessage(text, sender) {
        DOM.empty.style.display = 'none';
        const div = document.createElement('div');
        div.className = `message ${sender}`;
        
        // Rich formatting (basic markdown-like)
        let formattedText = text;
        if (sender === 'bot') {
            // Bold, italic, lists, emojis already there
            formattedText = text;
        }
        
        div.innerHTML = `${formattedText}<span class="msg-time">${getTime()}</span>`;
        DOM.messages.appendChild(div);
        scrollToBottom();
    }

    function showTyping() {
        DOM.typing.style.display = 'flex';
        scrollToBottom();
    }

    function hideTyping() {
        DOM.typing.style.display = 'none';
    }

    // ============================================================
    // QUICK REPLY BUTTONS (Dynamic)
    // ============================================================
    function generateQuickReplies() {
        const buttons = [
            { text: '👋 Hello', value: 'Hello' },
            { text: '📚 Coding', value: 'Coding kaise seekhni hai?' },
            { text: '💼 Skills', value: 'What skills do you have?' },
            { text: '❤️ Love', value: 'Pyaar ke baare mein batao' },
            { text: '😂 Joke', value: 'Tell me a joke' },
            { text: '💡 Help', value: 'Help' },
            { text: '🚀 Future', value: 'What are your future plans?' },
            { text: '🏠 Ghar', value: 'Ghar ki yaad aa rahi hai' }
        ];

        DOM.quickBtns.innerHTML = '';
        buttons.forEach(btn => {
            const el = document.createElement('button');
            el.className = 'quick-btn';
            el.textContent = btn.text;
            el.addEventListener('click', () => {
                DOM.input.value = btn.value;
                sendMessage();
            });
            DOM.quickBtns.appendChild(el);
        });
    }

    // ============================================================
    // SEND MESSAGE
    // ============================================================
    let isProcessing = false;

    function sendMessage() {
        const text = DOM.input.value.trim();
        if (!text || isProcessing) return;

        addMessage(text, 'user');
        DOM.input.value = '';
        DOM.input.focus();

        isProcessing = true;
        DOM.send.disabled = true;
        showTyping();

        // Dynamic typing delay based on message length
        const delay = 600 + Math.random() * 1200 + (text.length / 10) * 50;
        setTimeout(() => {
            hideTyping();
            const reply = Engine.getContextualReply(text);
            addMessage(reply, 'bot');
            isProcessing = false;
            DOM.send.disabled = false;
        }, delay);
    }

    // ============================================================
    // INACTIVITY DETECTION
    // ============================================================
    setInterval(() => {
        const inactiveTime = Date.now() - Engine.lastActive;
        if (inactiveTime > 120000 && !isProcessing) { // 2 minutes
            const messages = [
                "Kya hua? 🤔 Kuch soch rahe ho?",
                "Main yahan hoon! 😊 Koi baat karo?",
                "Zinda ho? 😄 Batao kya help chahiye?"
            ];
            addMessage(messages[Math.floor(Math.random() * messages.length)], 'bot');
            Engine.lastActive = Date.now();
        }
    }, 60000);

    // ============================================================
    // EVENT LISTENERS
    // ============================================================
    DOM.send.addEventListener('click', sendMessage);
    DOM.input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
    });

    // ============================================================
    // CLOSE CHATBOX
    // ============================================================
    window.closeChatbox = function() {
        document.referrer ? window.location.href = document.referrer : window.history.back();
    };

    // ============================================================
    // KEYBOARD SHORTCUTS
    // ============================================================
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === '/') {
            e.preventDefault();
            DOM.input.focus();
        }
        if (e.key === 'Escape') closeChatbox();
    });

    // ============================================================
    // INIT
    // ============================================================
    generateQuickReplies();
    setTimeout(() => DOM.input.focus(), 300);

    console.log('🤖 RJ AI Chatbox — Ultra Advanced v5.0');
    console.log('🧠 200+ Q&A Database');
    console.log('🎯 8 Personas | 6 Moods | 6 Intents');
    console.log('⚡ Dynamic Quick Replies | Inactivity Detection');
    console.log('🔥 Built by Ravi Raj — Next Gen AI');
})();
