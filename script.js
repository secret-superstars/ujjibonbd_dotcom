document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        document.querySelector('.loader-container').classList.add('hidden');
    }, 2000);

    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('active');
        } else {
            scrollToTopBtn.classList.remove('active');
        }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    const testimonialTrack = document.querySelector('.testimonial-track');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-testimonial');
    const nextBtn = document.querySelector('.next-testimonial');
    let currentIndex = 0;
    
    function updateSlider() {
        testimonialTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex === 0) ? testimonialCards.length - 1 : currentIndex - 1;
        updateSlider();
    });
    
    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex === testimonialCards.length - 1) ? 0 : currentIndex + 1;
        updateSlider();
    });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentIndex = index;
            updateSlider();
        });
    });
    
    setInterval(function() {
        currentIndex = (currentIndex === testimonialCards.length - 1) ? 0 : currentIndex + 1;
        updateSlider();
    }, 5000);

    const startAssessmentBtn = document.getElementById('start-assessment');
    const assessmentIntro = document.getElementById('assessment-intro');
    const assessmentQuestions = document.getElementById('assessment-questions');
    const assessmentResults = document.getElementById('assessment-results');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const prevQuestionBtn = document.getElementById('prev-question');
    const nextQuestionBtn = document.getElementById('next-question');
    const progressBar = document.querySelector('.progress');
    
    const questions = [
        {
            question: "Which of these activities do you enjoy the most?",
            options: [
                "Solving complex problems and puzzles",
                "Helping and teaching others",
                "Creating art or designing things",
                "Organizing and planning events or projects"
            ]
        },
        {
            question: "In a team setting, which role do you naturally take on?",
            options: [
                "The leader who directs the team",
                "The creative one who generates ideas",
                "The analyst who evaluates options",
                "The supporter who helps everyone work together"
            ]
        },
        {
            question: "Which work environment do you prefer?",
            options: [
                "A structured environment with clear rules",
                "A flexible environment that encourages creativity",
                "A collaborative environment with teamwork",
                "An independent environment where I can work alone"
            ]
        },
        {
            question: "What motivates you the most in your work?",
            options: [
                "Financial rewards and stability",
                "Making a positive impact on others",
                "Recognition for my achievements",
                "Learning new skills and personal growth"
            ]
        },
        {
            question: "Which of these skills do you believe is your strongest?",
            options: [
                "Communication and interpersonal skills",
                "Analytical and problem-solving skills",
                "Creative and artistic skills",
                "Technical and practical skills"
            ]
        },
        {
            question: "How do you prefer to learn new information?",
            options: [
                "Reading and researching on my own",
                "Hands-on practice and experience",
                "Listening to lectures or presentations",
                "Discussing and collaborating with others"
            ]
        },
        {
            question: "When faced with a challenge, what is your first approach?",
            options: [
                "Analyze the problem methodically",
                "Brainstorm creative solutions",
                "Seek advice from others",
                "Take immediate action based on instinct"
            ]
        },
        {
            question: "Which of these values is most important to you in a career?",
            options: [
                "Work-life balance",
                "Making a difference in society",
                "Continuous learning and growth",
                "Status and recognition"
            ]
        },
        {
            question: "How do you handle stress and pressure?",
            options: [
                "Stay organized and prioritize tasks",
                "Take breaks and practice self-care",
                "Talk it through with others",
                "Focus on solving one problem at a time"
            ]
        },
        {
            question: "Which of these career paths sounds most appealing to you?",
            options: [
                "Technology and innovation",
                "Healthcare and wellbeing",
                "Arts, design, and creativity",
                "Business and entrepreneurship"
            ]
        }
    ];
    
    let currentQuestionIndex = 0;
    let userAnswers = [];
    
    startAssessmentBtn.addEventListener('click', function() {
        assessmentIntro.classList.remove('active');
        assessmentQuestions.classList.add('active');
        showQuestion(currentQuestionIndex);
    });
    
    function showQuestion(index) {
        questionText.textContent = questions[index].question;
        optionsContainer.innerHTML = '';
        
        questions[index].options.forEach((option, i) => {
            const optionElement = document.createElement('div');
            optionElement.classList.add('option');
            optionElement.textContent = option;
            
            if (userAnswers[index] === i) {
                optionElement.classList.add('selected');
            }
            
            optionElement.addEventListener('click', function() {
                selectOption(index, i);
            });
            
            optionsContainer.appendChild(optionElement);
        });
        
        const progress = ((index + 1) / questions.length) * 100;
        progressBar.style.width = `${progress}%`;
        
        prevQuestionBtn.disabled = index === 0;
        nextQuestionBtn.disabled = userAnswers[index] === undefined;
        
        if (index === questions.length - 1) {
            nextQuestionBtn.textContent = 'See Results';
        } else {
            nextQuestionBtn.textContent = 'Next';
        }
    }
    
    function selectOption(questionIndex, optionIndex) {
        userAnswers[questionIndex] = optionIndex;
        
        const options = optionsContainer.querySelectorAll('.option');
        options.forEach((option, i) => {
            option.classList.toggle('selected', i === optionIndex);
        });
        
        nextQuestionBtn.disabled = false;
    }
    
    prevQuestionBtn.addEventListener('click', function() {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            showQuestion(currentQuestionIndex);
        }
    });
    
    nextQuestionBtn.addEventListener('click', function() {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            showQuestion(currentQuestionIndex);
        } else {
            showResults();
        }
    });
    
    function showResults() {
        assessmentQuestions.classList.remove('active');
        assessmentResults.classList.add('active');
        
        const careerMatches = calculateCareerMatches(userAnswers);
        
        const careerMatchesList = document.getElementById('career-matches');
        careerMatchesList.innerHTML = '';
        
        careerMatches.forEach(match => {
            const li = document.createElement('li');
            li.innerHTML = `<span>${match.career}</span> <span>${match.score}%</span>`;
            careerMatchesList.appendChild(li);
        });
        
        const resultDescription = document.getElementById('result-description');
        resultDescription.innerHTML = `
            <h4>Your Career Profile</h4>
            <p>Based on your responses, you show a strong preference for ${careerMatches[0].category} careers. 
            Your answers indicate that you value ${getValueBasedOnAnswers(userAnswers)} and excel in 
            ${getSkillsBasedOnAnswers(userAnswers)}.</p>
            <p>Consider exploring careers in ${careerMatches[0].career} and related fields, as they align well with your 
            preferences and strengths. To further develop in this direction, you might want to focus on building skills in 
            ${getRecommendedSkills(careerMatches[0].category)}.</p>
        `;
      
        createResultChart(careerMatches);
        
        document.getElementById('download-results').addEventListener('click', function() {
            alert('Your results have been prepared for download. Check your downloads folder.');
        });
        
        document.getElementById('book-consultation').addEventListener('click', function() {
            document.getElementById('service').value = 'counseling';
            document.querySelector('a[href="#contact"]').click();
        });
    }
    
    function calculateCareerMatches(answers) {

        const categories = [
            { name: "Technology", score: 0, careers: ["Software Development", "Data Analysis", "IT Consulting"] },
            { name: "Creative", score: 0, careers: ["Graphic Design", "Content Creation", "Marketing"] },
            { name: "Business", score: 0, careers: ["Business Management", "Entrepreneurship", "Finance"] },
            { name: "Service", score: 0, careers: ["Healthcare", "Education", "Social Work"] }
        ];
        
        answers.forEach((answer, index) => {
            switch(index) {
                case 0: 
                    if (answer === 0) categories[0].score += 10;
                    if (answer === 1) categories[3].score += 10;
                    if (answer === 2) categories[1].score += 10;
                    if (answer === 3) categories[2].score += 10;
                    break;
                case 1: 
                    if (answer === 0) categories[2].score += 10;
                    if (answer === 1) categories[1].score += 10;
                    if (answer === 2) categories[0].score += 10;
                    if (answer === 3) categories[3].score += 10;
                    break;
                case 2: 
                    if (answer === 0) categories[2].score += 10;
                    if (answer === 1) categories[1].score += 10;
                    if (answer === 2) categories[3].score += 10;
                    if (answer === 3) categories[0].score += 10;
                    break;
                case 3: 
                    if (answer === 0) categories[2].score += 10;
                    if (answer === 1) categories[3].score += 10;
                    if (answer === 2) categories[1].score += 10;
                    if (answer === 3) categories[0].score += 10;
                    break;
                case 4: 
                    if (answer === 0) categories[3].score += 10;
                    if (answer === 1) categories[0].score += 10;
                    if (answer === 2) categories[1].score += 10;
                    if (answer === 3) categories[2].score += 10;
                    break;
                case 5: 
                    if (answer === 0) categories[0].score += 10;
                    if (answer === 1) categories[2].score += 10;
                    if (answer === 2) categories[3].score += 10;
                    if (answer === 3) categories[1].score += 10;
                    break;
                case 6: 
                    if (answer === 0) categories[0].score += 10;
                    if (answer === 1) categories[1].score += 10;
                    if (answer === 2) categories[3].score += 10;
                    if (answer === 3) categories[2].score += 10;
                    break;
                case 7: 
                    if (answer === 0) categories[2].score += 10;
                    if (answer === 1) categories[3].score += 10;
                    if (answer === 2) categories[0].score += 10;
                    if (answer === 3) categories[1].score += 10;
                    break;
                case 8: 
                    if (answer === 0) categories[2].score += 10;
                    if (answer === 1) categories[3].score += 10;
                    if (answer === 2) categories[1].score += 10;
                    if (answer === 3) categories[0].score += 10;
                    break;
                case 9: 
                    if (answer === 0) categories[0].score += 10;
                    if (answer === 1) categories[3].score += 10;
                    if (answer === 2) categories[1].score += 10;
                    if (answer === 3) categories[2].score += 10;
                    break;
            }
        });
        
        categories.sort((a, b) => b.score - a.score);
        
        const matches = [];
        
        categories.forEach(category => {
            const percentage = Math.min(Math.round(category.score), 100);
            
            matches.push({
                career: category.careers[0],
                score: percentage,
                category: category.name
            });
            
            if (category === categories[0]) {
                matches.push({
                    career: category.careers[1],
                    score: Math.max(percentage - 5, 70),
                    category: category.name
                });
            }
        });
        
        matches.sort((a, b) => b.score - a.score);
        
        return matches.slice(0, 5);
    }
    
    function getValueBasedOnAnswers(answers) {
        const valueIndex = answers[7] || 0;
        const values = [
            "work-life balance and stability",
            "making a positive impact on society",
            "continuous learning and professional growth",
            "recognition and career advancement"
        ];
        
        return values[valueIndex];
    }
    
    function getSkillsBasedOnAnswers(answers) {
        const skillIndex = answers[4] || 0;
        const skills = [
            "communication and building relationships",
            "analytical thinking and problem-solving",
            "creativity and innovation",
            "practical implementation and technical expertise"
        ];
        
        return skills[skillIndex];
    }
    
    function getRecommendedSkills(category) {
        const skillsByCategory = {
            "Technology": "programming, data analysis, and staying current with technological trends",
            "Creative": "design software, content creation, and developing your unique style",
            "Business": "leadership, financial analysis, and strategic planning",
            "Service": "empathy, active listening, and specialized knowledge in your field of interest"
        };
        
        return skillsByCategory[category] || "various technical and soft skills relevant to your interests";
    }
    
    function createResultChart(careerMatches) {
        const ctx = document.getElementById('result-chart').getContext('2d');
        
        const labels = careerMatches.map(match => match.career);
        const data = careerMatches.map(match => match.score);
        
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(74, 107, 255, 0.8)');
        gradient.addColorStop(1, 'rgba(74, 107, 255, 0.2)');
        
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Career Match Score (%)',
                    data: data,
                    backgroundColor: gradient,
                    borderColor: 'rgba(74, 107, 255, 1)',
                    borderWidth: 1,
                    borderRadius: 5,
                    barPercentage: 0.6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.parsed.y + '% match';
                            }
                        }
                    }
                }
            }
        });
    }

    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            const emailInput = this.querySelector('input[type="email"]');
            
            submitButton.disabled = true;
            submitButton.textContent = 'Subscribing...';
            
            setTimeout(function() {
                submitButton.textContent = 'Subscribed!';
                
                alert('Thank you for subscribing to our newsletter!');
                
                newsletterForm.reset();
                
                setTimeout(function() {
                    submitButton.disabled = false;
                    submitButton.textContent = originalText;
                }, 3000);
            }, 1500);
        });
    }

    const chatBotToggle = document.querySelector('.chat-bot-toggle');
    const chatBotContainer = document.querySelector('.chat-bot-container');
    const closeChat = document.querySelector('.close-chat');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const sendMessage = document.getElementById('send-message');
    
    chatBotToggle.addEventListener('click', function() {
        chatBotContainer.classList.toggle('active');
    });
    
    closeChat.addEventListener('click', function() {
        chatBotContainer.classList.remove('active');
    });
    
    function addMessage(message, isUser = false) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.classList.add(isUser ? 'user' : 'bot');
        
        const messageContent = document.createElement('div');
        messageContent.classList.add('message-content');
        messageContent.innerHTML = `<p>${message}</p>`;
        
        messageElement.appendChild(messageContent);
        chatMessages.appendChild(messageElement);
        
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function handleUserMessage(message) {
        addMessage(message, true);
    
        const typingIndicator = document.createElement('div');
        typingIndicator.classList.add('message', 'bot', 'typing');
        typingIndicator.innerHTML = '<div class="message-content"><p>Typing...</p></div>';
        chatMessages.appendChild(typingIndicator);
        
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        setTimeout(function() {
            typingIndicator.remove();
            const response = getBotResponse(message);
            addMessage(response);
        }, 1500);
    }
    
    function getBotResponse(message) {
        message = message.toLowerCase();
        
        if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
            return "Hello! How can I assist you with your career questions today?";
        } else if (message.includes('assessment') || message.includes('test')) {
            return "Our career assessment helps identify your strengths and interests. You can take it by clicking on the 'Take Assessment' button in the Assessment section.";
        } else if (message.includes('resume') || message.includes('cv')) {
            return "We offer professional resume building services. Our experts can help you create a standout resume that highlights your skills and experiences effectively.";
        } else if (message.includes('interview')) {
            return "Our interview preparation service includes mock interviews, feedback, and strategies to help you present yourself confidently. Would you like to book a session?";
        } else if (message.includes('counseling') || message.includes('counselling') || message.includes('guidance')) {
            return "Our career counselors provide personalized guidance to help you navigate your career path. You can book a consultation through the Contact section.";
        } else if (message.includes('cost') || message.includes('price') || message.includes('fee')) {
            return "Our service fees vary depending on the specific service and package. Please book a free initial consultation to discuss your needs and get detailed pricing information.";
        } else if (message.includes('thank')) {
            return "You're welcome! Is there anything else I can help you with?";
        } else if (message.includes('developers') || message.includes('developer') || message.includes('coding') || message.includes('faysal')) {
            return "Our team of developers is dedicated to creating innovative solutions for our clients. If you have a project in mind, feel free to reach out to us or mail us at ahmed8faysal@gmail.com.";
        } else {
            return "Thank you for your message. For more specific information about our career counseling services, please book a consultation through the Contact section or mail us at ujjibonofficial@gmail.com.";
        }
    }
    
    sendMessage.addEventListener('click', function() {
        const message = chatInput.value.trim();
        
        if (message !== '') {
            handleUserMessage(message);
            chatInput.value = '';
        }
    });
    
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const message = chatInput.value.trim();
            
            if (message !== '') {
                handleUserMessage(message);
                chatInput.value = '';
            }
        }
    });

    const serviceCards = document.querySelectorAll('.service-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        card.style.transitionDelay = `${index * 0.1}s`;
        
        observer.observe(card);
    });
});

const events = [
    {
      id: '1',
      title: 'Career Accelerator 1.0',
      date: 'Upcoming...',
      time: '2:00 PM',
      location: 'Announce soon...',
      price: 4.50,
      image: 'https://i.postimg.cc/BQcxKZ3z/Career-Peer.png',
      description: 'Bangladesh’s first peer-led AI powered career support program is here to help you unlock job opportunities, gain essential skills, and build confidence for your dream career.',
      category: 'Peer Support'
    },
    { 
      id: '2',
      title: 'Shajgoj presents Opportunities uprising 1.0 ',
      date: '2022-11-80',
      time: '9:30 AM',
      location: 'Plot- E, Agargaon, Dhaka',
      price: 0.00,
      image: 'https://i.postimg.cc/y8Y32VwJ/Event-1.png',
      description: 'Opportunities Uprising 1.0 is a 1 day (hybrid) career event that includes seminars, competitive segments, a tour of the corporate world, fun activities along with teachings and prizes, certificates, foods, and more! This event will provide you with the skills and resources you need to improve your career and make the most of your opportunities. The 1 day event is a great chance to explore career options and learn about the latest trends in the field. With keynote speakers from top companies and organizations, as well as sessions on everything from soft skills to being determined to pursue your passion, there is something for everyone.',
      category: 'Career Development'
    },
    {
      id: '3',
      title: 'Pathway To Prosperity',
      date: '2023-07-15',
      time: '11:00 PM',
      location: 'Yolo Restaurant, Baily Road, Dhaka', 
      price: 0.00,
      image: 'https://i.postimg.cc/26H2FYgQ/480570212-951903947050722-6869787919235667677-n.jpg',
      description: 'Ujjibon as a career counseling & community platform is introducing you to its indelible project in Bangladesh “Pathway To Prosperity” pioneering the significance of acquiring knowledge of career paths in today’s job circuit. It also widens the door of its flagship title “𝗧𝗵𝗲 𝗝𝘂𝗻𝗶𝗼𝗿 𝗖𝗼𝗿𝗽𝗼𝗿𝗮𝘁𝗲𝘀” for every individual across the country to advance with whatever skills they have. The long-term project includes two measures to achieve its objective. The first would include establishing 1-Day hybrid events held at multiple institutions, and the second would involve introducing Junior Corporates.',
      category: 'Professional networking'
    }
  ];
  
  const eventsContainer = document.getElementById('eventsContainer');
  const searchInput = document.getElementById('searchInput');
  const modal = document.getElementById('eventModal');
  const modalContent = modal.querySelector('.modal-content');
  const closeButton = modal.querySelector('.close-button');
  
  function createEventCard(event) {
    const card = document.createElement('div');
    card.className = 'event-card';
    card.style.animationDelay = `${events.indexOf(event) * 0.1}s`;
    
    card.innerHTML = `
      <div class="event-image">
        <img src="${event.image}" alt="${event.title}">
        <div class="event-price">$${event.price}</div>
      </div>
      <div class="event-details">
        <h3 class="event-title">${event.title}</h3>
        <div class="event-info">
          <div class="info-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            <span>${event.date}</span>
          </div>
          <div class="info-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            <span>${event.time}</span>
          </div>
          <div class="info-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            <span>${event.location}</span>
          </div>
        </div>
      </div>
    `;
    
    card.addEventListener('click', () => openModal(event));
    return card;
  }
  
  function openModal(event) {
    const modalBody = modal.querySelector('.modal-body');
    modalBody.innerHTML = `
      <img src="${event.image}" alt="${event.title}" class="modal-image">
      <h2 class="modal-title">${event.title}</h2>
      <p class="modal-description">${event.description}</p>
      <div class="modal-info">
        <div class="info-item">
          <strong>Date:</strong>
          <span>${event.date}</span>
        </div>
        <div class="info-item">
          <strong>Time:</strong>
          <span>${event.time}</span>
        </div>
        <div class="info-item">
          <strong>Location:</strong>
          <span>${event.location}</span>
        </div>
        <div class="info-item">
          <strong>Price:</strong>
          <span>$${event.price}</span>
        </div>
      </div>
      <div class="payment-section">
        <h3>Payment Methods</h3>
        <div class="payment-methods">
          <img src="https://www.mastercard.com/content/dam/public/mastercardcom/na/us/en/homepage/Home/mc-logo-52.svg" alt="Mastercard">
          <img src="https://cdn.visa.com/v2/assets/images/logos/visa/blue/logo.png" alt="Visa">
          <img src="https://logos-world.net/wp-content/uploads/2024/10/Bkash-Logo.png" alt="bKash">
        </div>
        <button class="book-button" onclick="handleBooking()">Book Now</button>
      </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  
  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  function handleBooking() {
    window.open('https://forms.gle/1chaxM6DVSRrJg7MA', '_blank');
  }
  
  function filterEvents(searchTerm) {
    const filteredEvents = events.filter(event =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    eventsContainer.innerHTML = '';
    filteredEvents.forEach(event => {
      eventsContainer.appendChild(createEventCard(event));
    });
  }
  
  searchInput.addEventListener('input', (e) => filterEvents(e.target.value));
  closeButton.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  
  events.forEach(event => {
    eventsContainer.appendChild(createEventCard(event));
  });

function setupCounter(element) {
    let counter = 0
    const setCounter = (count) => {
      counter = count
      element.innerHTML = `count is ${counter}`
    }
    element.addEventListener('click', () => setCounter(counter + 1))
    setCounter(0)
}
  
  document.addEventListener('DOMContentLoaded', () => {
    setupCounter(document.querySelector('#counter'))
  })

  function initPartnerAnimations() {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px'
    };
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
  
    const partnerCards = document.querySelectorAll('.partner-card');
    partnerCards.forEach((card, index) => {
      card.style.transitionDelay = `${index * 0.2}s`;
      observer.observe(card);
    });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    initPartnerAnimations();
  })

  document.addEventListener('DOMContentLoaded', function() {
    function showPopup() {
        const popup = document.getElementById('popup');
        popup.style.display = 'flex';
    }

    function closePopup() {
        const popup = document.getElementById('popup');
        popup.style.display = 'none';
    }

    function goToAIModel() {
        window.location.href = 'https://chatgpt.com/g/g-679a815d5bfc81919b540029fb4632a0-job-assistant-bd-ujjibon'; // Replace with your AI model URL
    }

    setTimeout(showPopup, 12000);

    const closePopupButton = document.getElementById('close-popup');
    if (closePopupButton) {
        closePopupButton.addEventListener('click', closePopup);
    }

    const goToAIButton = document.getElementById('go-to-ai');
    if (goToAIButton) {
        goToAIButton.addEventListener('click', goToAIModel);
    }

    window.addEventListener('resize', function() {
        const displayStyle = window.innerWidth < 480 ? 'block' : 'flex';
        const popup = document.getElementById('popup');
        if (popup.style.display !== 'none') {
            popup.style.display = displayStyle;
        }
    });
});

//last updated 23 march 11.45 PM
/* document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        document.querySelector('.loader-container').classList.add('hidden');
    }, 2000);

    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('active');
        } else {
            scrollToTopBtn.classList.remove('active');
        }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    const testimonialTrack = document.querySelector('.testimonial-track');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-testimonial');
    const nextBtn = document.querySelector('.next-testimonial');
    let currentIndex = 0;
    
    function updateSlider() {
        testimonialTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex === 0) ? testimonialCards.length - 1 : currentIndex - 1;
        updateSlider();
    });
    
    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex === testimonialCards.length - 1) ? 0 : currentIndex + 1;
        updateSlider();
    });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentIndex = index;
            updateSlider();
        });
    });
    
    setInterval(function() {
        currentIndex = (currentIndex === testimonialCards.length - 1) ? 0 : currentIndex + 1;
        updateSlider();
    }, 5000);

    const startAssessmentBtn = document.getElementById('start-assessment');
    const assessmentIntro = document.getElementById('assessment-intro');
    const assessmentQuestions = document.getElementById('assessment-questions');
    const assessmentResults = document.getElementById('assessment-results');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const prevQuestionBtn = document.getElementById('prev-question');
    const nextQuestionBtn = document.getElementById('next-question');
    const progressBar = document.querySelector('.progress');
    
    const questions = [
        {
            question: "Which of these activities do you enjoy the most?",
            options: [
                "Solving complex problems and puzzles",
                "Helping and teaching others",
                "Creating art or designing things",
                "Organizing and planning events or projects"
            ]
        },
        {
            question: "In a team setting, which role do you naturally take on?",
            options: [
                "The leader who directs the team",
                "The creative one who generates ideas",
                "The analyst who evaluates options",
                "The supporter who helps everyone work together"
            ]
        },
        {
            question: "Which work environment do you prefer?",
            options: [
                "A structured environment with clear rules",
                "A flexible environment that encourages creativity",
                "A collaborative environment with teamwork",
                "An independent environment where I can work alone"
            ]
        },
        {
            question: "What motivates you the most in your work?",
            options: [
                "Financial rewards and stability",
                "Making a positive impact on others",
                "Recognition for my achievements",
                "Learning new skills and personal growth"
            ]
        },
        {
            question: "Which of these skills do you believe is your strongest?",
            options: [
                "Communication and interpersonal skills",
                "Analytical and problem-solving skills",
                "Creative and artistic skills",
                "Technical and practical skills"
            ]
        },
        {
            question: "How do you prefer to learn new information?",
            options: [
                "Reading and researching on my own",
                "Hands-on practice and experience",
                "Listening to lectures or presentations",
                "Discussing and collaborating with others"
            ]
        },
        {
            question: "When faced with a challenge, what is your first approach?",
            options: [
                "Analyze the problem methodically",
                "Brainstorm creative solutions",
                "Seek advice from others",
                "Take immediate action based on instinct"
            ]
        },
        {
            question: "Which of these values is most important to you in a career?",
            options: [
                "Work-life balance",
                "Making a difference in society",
                "Continuous learning and growth",
                "Status and recognition"
            ]
        },
        {
            question: "How do you handle stress and pressure?",
            options: [
                "Stay organized and prioritize tasks",
                "Take breaks and practice self-care",
                "Talk it through with others",
                "Focus on solving one problem at a time"
            ]
        },
        {
            question: "Which of these career paths sounds most appealing to you?",
            options: [
                "Technology and innovation",
                "Healthcare and wellbeing",
                "Arts, design, and creativity",
                "Business and entrepreneurship"
            ]
        }
    ];
    
    let currentQuestionIndex = 0;
    let userAnswers = [];
    
    startAssessmentBtn.addEventListener('click', function() {
        assessmentIntro.classList.remove('active');
        assessmentQuestions.classList.add('active');
        showQuestion(currentQuestionIndex);
    });
    
    function showQuestion(index) {
        questionText.textContent = questions[index].question;
        optionsContainer.innerHTML = '';
        
        questions[index].options.forEach((option, i) => {
            const optionElement = document.createElement('div');
            optionElement.classList.add('option');
            optionElement.textContent = option;
            
            if (userAnswers[index] === i) {
                optionElement.classList.add('selected');
            }
            
            optionElement.addEventListener('click', function() {
                selectOption(index, i);
            });
            
            optionsContainer.appendChild(optionElement);
        });
        
        const progress = ((index + 1) / questions.length) * 100;
        progressBar.style.width = `${progress}%`;
        
        prevQuestionBtn.disabled = index === 0;
        nextQuestionBtn.disabled = userAnswers[index] === undefined;
        
        if (index === questions.length - 1) {
            nextQuestionBtn.textContent = 'See Results';
        } else {
            nextQuestionBtn.textContent = 'Next';
        }
    }
    
    function selectOption(questionIndex, optionIndex) {
        userAnswers[questionIndex] = optionIndex;
        
        const options = optionsContainer.querySelectorAll('.option');
        options.forEach((option, i) => {
            option.classList.toggle('selected', i === optionIndex);
        });
        
        nextQuestionBtn.disabled = false;
    }
    
    prevQuestionBtn.addEventListener('click', function() {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            showQuestion(currentQuestionIndex);
        }
    });
    
    nextQuestionBtn.addEventListener('click', function() {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            showQuestion(currentQuestionIndex);
        } else {
            showResults();
        }
    });
    
    function showResults() {
        assessmentQuestions.classList.remove('active');
        assessmentResults.classList.add('active');
        
        const careerMatches = calculateCareerMatches(userAnswers);
        
        const careerMatchesList = document.getElementById('career-matches');
        careerMatchesList.innerHTML = '';
        
        careerMatches.forEach(match => {
            const li = document.createElement('li');
            li.innerHTML = `<span>${match.career}</span> <span>${match.score}%</span>`;
            careerMatchesList.appendChild(li);
        });
        
        const resultDescription = document.getElementById('result-description');
        resultDescription.innerHTML = `
            <h4>Your Career Profile</h4>
            <p>Based on your responses, you show a strong preference for ${careerMatches[0].category} careers. 
            Your answers indicate that you value ${getValueBasedOnAnswers(userAnswers)} and excel in 
            ${getSkillsBasedOnAnswers(userAnswers)}.</p>
            <p>Consider exploring careers in ${careerMatches[0].career} and related fields, as they align well with your 
            preferences and strengths. To further develop in this direction, you might want to focus on building skills in 
            ${getRecommendedSkills(careerMatches[0].category)}.</p>
        `;
      
        createResultChart(careerMatches);
        
        document.getElementById('download-results').addEventListener('click', function() {
            alert('Your results have been prepared for download. Check your downloads folder.');
        });
        
        document.getElementById('book-consultation').addEventListener('click', function() {
            document.getElementById('service').value = 'counseling';
            document.querySelector('a[href="#contact"]').click();
        });
    }
    
    function calculateCareerMatches(answers) {

        const categories = [
            { name: "Technology", score: 0, careers: ["Software Development", "Data Analysis", "IT Consulting"] },
            { name: "Creative", score: 0, careers: ["Graphic Design", "Content Creation", "Marketing"] },
            { name: "Business", score: 0, careers: ["Business Management", "Entrepreneurship", "Finance"] },
            { name: "Service", score: 0, careers: ["Healthcare", "Education", "Social Work"] }
        ];
        
        answers.forEach((answer, index) => {
            switch(index) {
                case 0: 
                    if (answer === 0) categories[0].score += 10;
                    if (answer === 1) categories[3].score += 10;
                    if (answer === 2) categories[1].score += 10;
                    if (answer === 3) categories[2].score += 10;
                    break;
                case 1: 
                    if (answer === 0) categories[2].score += 10;
                    if (answer === 1) categories[1].score += 10;
                    if (answer === 2) categories[0].score += 10;
                    if (answer === 3) categories[3].score += 10;
                    break;
                case 2: 
                    if (answer === 0) categories[2].score += 10;
                    if (answer === 1) categories[1].score += 10;
                    if (answer === 2) categories[3].score += 10;
                    if (answer === 3) categories[0].score += 10;
                    break;
                case 3: 
                    if (answer === 0) categories[2].score += 10;
                    if (answer === 1) categories[3].score += 10;
                    if (answer === 2) categories[1].score += 10;
                    if (answer === 3) categories[0].score += 10;
                    break;
                case 4: 
                    if (answer === 0) categories[3].score += 10;
                    if (answer === 1) categories[0].score += 10;
                    if (answer === 2) categories[1].score += 10;
                    if (answer === 3) categories[2].score += 10;
                    break;
                case 5: 
                    if (answer === 0) categories[0].score += 10;
                    if (answer === 1) categories[2].score += 10;
                    if (answer === 2) categories[3].score += 10;
                    if (answer === 3) categories[1].score += 10;
                    break;
                case 6: 
                    if (answer === 0) categories[0].score += 10;
                    if (answer === 1) categories[1].score += 10;
                    if (answer === 2) categories[3].score += 10;
                    if (answer === 3) categories[2].score += 10;
                    break;
                case 7: 
                    if (answer === 0) categories[2].score += 10;
                    if (answer === 1) categories[3].score += 10;
                    if (answer === 2) categories[0].score += 10;
                    if (answer === 3) categories[1].score += 10;
                    break;
                case 8: 
                    if (answer === 0) categories[2].score += 10;
                    if (answer === 1) categories[3].score += 10;
                    if (answer === 2) categories[1].score += 10;
                    if (answer === 3) categories[0].score += 10;
                    break;
                case 9: 
                    if (answer === 0) categories[0].score += 10;
                    if (answer === 1) categories[3].score += 10;
                    if (answer === 2) categories[1].score += 10;
                    if (answer === 3) categories[2].score += 10;
                    break;
            }
        });
        
        categories.sort((a, b) => b.score - a.score);
        
        const matches = [];
        
        categories.forEach(category => {
            const percentage = Math.min(Math.round(category.score), 100);
            
            matches.push({
                career: category.careers[0],
                score: percentage,
                category: category.name
            });
            
            if (category === categories[0]) {
                matches.push({
                    career: category.careers[1],
                    score: Math.max(percentage - 5, 70),
                    category: category.name
                });
            }
        });
        
        matches.sort((a, b) => b.score - a.score);
        
        return matches.slice(0, 5);
    }
    
    function getValueBasedOnAnswers(answers) {
        const valueIndex = answers[7] || 0;
        const values = [
            "work-life balance and stability",
            "making a positive impact on society",
            "continuous learning and professional growth",
            "recognition and career advancement"
        ];
        
        return values[valueIndex];
    }
    
    function getSkillsBasedOnAnswers(answers) {
        const skillIndex = answers[4] || 0;
        const skills = [
            "communication and building relationships",
            "analytical thinking and problem-solving",
            "creativity and innovation",
            "practical implementation and technical expertise"
        ];
        
        return skills[skillIndex];
    }
    
    function getRecommendedSkills(category) {
        const skillsByCategory = {
            "Technology": "programming, data analysis, and staying current with technological trends",
            "Creative": "design software, content creation, and developing your unique style",
            "Business": "leadership, financial analysis, and strategic planning",
            "Service": "empathy, active listening, and specialized knowledge in your field of interest"
        };
        
        return skillsByCategory[category] || "various technical and soft skills relevant to your interests";
    }
    
    function createResultChart(careerMatches) {
        const ctx = document.getElementById('result-chart').getContext('2d');
        
        const labels = careerMatches.map(match => match.career);
        const data = careerMatches.map(match => match.score);
        
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(74, 107, 255, 0.8)');
        gradient.addColorStop(1, 'rgba(74, 107, 255, 0.2)');
        
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Career Match Score (%)',
                    data: data,
                    backgroundColor: gradient,
                    borderColor: 'rgba(74, 107, 255, 1)',
                    borderWidth: 1,
                    borderRadius: 5,
                    barPercentage: 0.6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.parsed.y + '% match';
                            }
                        }
                    }
                }
            }
        });
    }

    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            const emailInput = this.querySelector('input[type="email"]');
            
            submitButton.disabled = true;
            submitButton.textContent = 'Subscribing...';
            
            setTimeout(function() {
                submitButton.textContent = 'Subscribed!';
                
                alert('Thank you for subscribing to our newsletter!');
                
                newsletterForm.reset();
                
                setTimeout(function() {
                    submitButton.disabled = false;
                    submitButton.textContent = originalText;
                }, 3000);
            }, 1500);
        });
    }

    const chatBotToggle = document.querySelector('.chat-bot-toggle');
    const chatBotContainer = document.querySelector('.chat-bot-container');
    const closeChat = document.querySelector('.close-chat');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const sendMessage = document.getElementById('send-message');
    
    chatBotToggle.addEventListener('click', function() {
        chatBotContainer.classList.toggle('active');
    });
    
    closeChat.addEventListener('click', function() {
        chatBotContainer.classList.remove('active');
    });
    
    function addMessage(message, isUser = false) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.classList.add(isUser ? 'user' : 'bot');
        
        const messageContent = document.createElement('div');
        messageContent.classList.add('message-content');
        messageContent.innerHTML = `<p>${message}</p>`;
        
        messageElement.appendChild(messageContent);
        chatMessages.appendChild(messageElement);
        
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function handleUserMessage(message) {
        addMessage(message, true);
    
        const typingIndicator = document.createElement('div');
        typingIndicator.classList.add('message', 'bot', 'typing');
        typingIndicator.innerHTML = '<div class="message-content"><p>Typing...</p></div>';
        chatMessages.appendChild(typingIndicator);
        
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        setTimeout(function() {
            typingIndicator.remove();
            const response = getBotResponse(message);
            addMessage(response);
        }, 1500);
    }
    
    function getBotResponse(message) {
        message = message.toLowerCase();
        
        if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
            return "Hello! How can I assist you with your career questions today?";
        } else if (message.includes('assessment') || message.includes('test')) {
            return "Our career assessment helps identify your strengths and interests. You can take it by clicking on the 'Take Assessment' button in the Assessment section.";
        } else if (message.includes('resume') || message.includes('cv')) {
            return "We offer professional resume building services. Our experts can help you create a standout resume that highlights your skills and experiences effectively.";
        } else if (message.includes('interview')) {
            return "Our interview preparation service includes mock interviews, feedback, and strategies to help you present yourself confidently. Would you like to book a session?";
        } else if (message.includes('counseling') || message.includes('counselling') || message.includes('guidance')) {
            return "Our career counselors provide personalized guidance to help you navigate your career path. You can book a consultation through the Contact section.";
        } else if (message.includes('cost') || message.includes('price') || message.includes('fee')) {
            return "Our service fees vary depending on the specific service and package. Please book a free initial consultation to discuss your needs and get detailed pricing information.";
        } else if (message.includes('thank')) {
            return "You're welcome! Is there anything else I can help you with?";
        } else if (message.includes('developers') || message.includes('developer') || message.includes('coding') || message.includes('faysal')) {
            return "Our team of developers is dedicated to creating innovative solutions for our clients. If you have a project in mind, feel free to reach out to us or mail us at ahmed8faysal@gmail.com.";
        } else {
            return "Thank you for your message. For more specific information about our career counseling services, please book a consultation through the Contact section or mail us at ujjibonofficial@gmail.com.";
        }
    }
    
    sendMessage.addEventListener('click', function() {
        const message = chatInput.value.trim();
        
        if (message !== '') {
            handleUserMessage(message);
            chatInput.value = '';
        }
    });
    
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const message = chatInput.value.trim();
            
            if (message !== '') {
                handleUserMessage(message);
                chatInput.value = '';
            }
        }
    });

    const serviceCards = document.querySelectorAll('.service-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        card.style.transitionDelay = `${index * 0.1}s`;
        
        observer.observe(card);
    });
});

const events = [
    {
      id: '1',
      title: 'Career Accelerator 1.0',
      date: 'Upcoming',
      time: '2:00 PM',
      location: 'IBA Auditorium, Dhaka University',
      price: 4.50,
      image: 'https://i.postimg.cc/BQcxKZ3z/Career-Peer.png',
      description: 'Bangladesh’s first peer-led AI powered career support program is here to help you unlock job opportunities, gain essential skills, and build confidence for your dream career.',
      category: 'Peer Support'
    },
    { 
      id: '2',
      title: 'Shajgoj presents Opportunities uprising 1.0 ',
      date: '2022-11-80',
      time: '9:30 AM',
      location: 'Plot- E, Agargaon, Dhaka',
      price: 0.00,
      image: 'https://i.postimg.cc/y8Y32VwJ/Event-1.png',
      description: 'Opportunities Uprising 1.0 is a 1 day (hybrid) career event that includes seminars, competitive segments, a tour of the corporate world, fun activities along with teachings and prizes, certificates, foods, and more! This event will provide you with the skills and resources you need to improve your career and make the most of your opportunities. The 1 day event is a great chance to explore career options and learn about the latest trends in the field. With keynote speakers from top companies and organizations, as well as sessions on everything from soft skills to being determined to pursue your passion, there is something for everyone.',
      category: 'Career Development'
    },
    {
      id: '3',
      title: 'Pathway To Prosperity',
      date: '2023-07-15',
      time: '11:00 PM',
      location: 'Yolo Restaurant, Baily Road, Dhaka', 
      price: 0.00,
      image: 'https://i.postimg.cc/26H2FYgQ/480570212-951903947050722-6869787919235667677-n.jpg',
      description: 'Ujjibon as a career counseling & community platform is introducing you to its indelible project in Bangladesh “Pathway To Prosperity” pioneering the significance of acquiring knowledge of career paths in today’s job circuit. It also widens the door of its flagship title “𝗧𝗵𝗲 𝗝𝘂𝗻𝗶𝗼𝗿 𝗖𝗼𝗿𝗽𝗼𝗿𝗮𝘁𝗲𝘀” for every individual across the country to advance with whatever skills they have. The long-term project includes two measures to achieve its objective. The first would include establishing 1-Day hybrid events held at multiple institutions, and the second would involve introducing Junior Corporates.',
      category: 'Professional networking'
    }
  ];
  
  const eventsContainer = document.getElementById('eventsContainer');
  const searchInput = document.getElementById('searchInput');
  const modal = document.getElementById('eventModal');
  const modalContent = modal.querySelector('.modal-content');
  const closeButton = modal.querySelector('.close-button');
  
  function createEventCard(event) {
    const card = document.createElement('div');
    card.className = 'event-card';
    card.style.animationDelay = `${events.indexOf(event) * 0.1}s`;
    
    card.innerHTML = `
      <div class="event-image">
        <img src="${event.image}" alt="${event.title}">
        <div class="event-price">$${event.price}</div>
      </div>
      <div class="event-details">
        <h3 class="event-title">${event.title}</h3>
        <div class="event-info">
          <div class="info-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            <span>${event.date}</span>
          </div>
          <div class="info-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            <span>${event.time}</span>
          </div>
          <div class="info-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            <span>${event.location}</span>
          </div>
        </div>
      </div>
    `;
    
    card.addEventListener('click', () => openModal(event));
    return card;
  }
  
  function openModal(event) {
    const modalBody = modal.querySelector('.modal-body');
    modalBody.innerHTML = `
      <img src="${event.image}" alt="${event.title}" class="modal-image">
      <h2 class="modal-title">${event.title}</h2>
      <p class="modal-description">${event.description}</p>
      <div class="modal-info">
        <div class="info-item">
          <strong>Date:</strong>
          <span>${event.date}</span>
        </div>
        <div class="info-item">
          <strong>Time:</strong>
          <span>${event.time}</span>
        </div>
        <div class="info-item">
          <strong>Location:</strong>
          <span>${event.location}</span>
        </div>
        <div class="info-item">
          <strong>Price:</strong>
          <span>$${event.price}</span>
        </div>
      </div>
      <div class="payment-section">
        <h3>Payment Methods</h3>
        <div class="payment-methods">
          <img src="https://www.mastercard.com/content/dam/public/mastercardcom/na/us/en/homepage/Home/mc-logo-52.svg" alt="Mastercard">
          <img src="https://cdn.visa.com/v2/assets/images/logos/visa/blue/logo.png" alt="Visa">
          <img src="https://logos-world.net/wp-content/uploads/2024/10/Bkash-Logo.png" alt="bKash">
        </div>
        <button class="book-button" onclick="handleBooking()">Book Now</button>
      </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  
  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  function handleBooking() {
    window.open('https://forms.gle/1chaxM6DVSRrJg7MA', '_blank');
  }
  
  function filterEvents(searchTerm) {
    const filteredEvents = events.filter(event =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    eventsContainer.innerHTML = '';
    filteredEvents.forEach(event => {
      eventsContainer.appendChild(createEventCard(event));
    });
  }
  
  searchInput.addEventListener('input', (e) => filterEvents(e.target.value));
  closeButton.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  
  events.forEach(event => {
    eventsContainer.appendChild(createEventCard(event));
  });

function setupCounter(element) {
    let counter = 0
    const setCounter = (count) => {
      counter = count
      element.innerHTML = `count is ${counter}`
    }
    element.addEventListener('click', () => setCounter(counter + 1))
    setCounter(0)
}
  
  document.addEventListener('DOMContentLoaded', () => {
    setupCounter(document.querySelector('#counter'))
  })

  function initPartnerAnimations() {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px'
    };
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
  
    const partnerCards = document.querySelectorAll('.partner-card');
    partnerCards.forEach((card, index) => {
      card.style.transitionDelay = `${index * 0.2}s`;
      observer.observe(card);
    });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    initPartnerAnimations();
  })

function showPopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'flex';
}

function closePopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'none';
}

function goToAIModel() {
    window.location.href = 'https://chatgpt.com/g/g-679a815d5bfc81919b540029fb4632a0-job-assistant-bd-ujjibon'; // Replace with your AI model URL
}

setTimeout(showPopup, 12000);
document.getElementById('close-popup').addEventListener('click', closePopup);
document.getElementById('go-to-ai').addEventListener('click', goToAIModel); */