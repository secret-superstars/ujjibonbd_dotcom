lucide.createIcons();

document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('[data-animate]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        
        if (entry.target.classList.contains('stats-card')) {
          initializeProgressRings();
        }
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(element => observer.observe(element));
  
  initializeCurriculum();

  initializeFeedbackCarousel();
});

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

function initializeProgressRings() {
  const progressRings = document.querySelectorAll('.stat-progress');
  
  progressRings.forEach(ring => {
    const value = parseInt(ring.dataset.value);
    const circle = ring.querySelector('.progress-ring-circle-value');
    const radius = circle.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;
    
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = circumference;
    
    const offset = circumference - (value / 100 * circumference);
    circle.style.strokeDashoffset = offset;
  });
}

function initializeCurriculum() {
  const headers = document.querySelectorAll('.curriculum-header');
  
  headers.forEach(header => {
    header.addEventListener('click', () => {
      const content = document.getElementById(header.dataset.toggle);
      const isActive = header.classList.contains('active');
    
      document.querySelectorAll('.curriculum-header').forEach(h => h.classList.remove('active'));
      document.querySelectorAll('.curriculum-content').forEach(c => c.classList.remove('active'));

      if (!isActive) {
        header.classList.add('active');
        content.classList.add('active');
      }
    });
  });
}

function initializeFeedbackCarousel() {
  const slides = document.querySelectorAll('.feedback-slide');
  const dots = document.querySelectorAll('.dot');
  let currentSlide = 0;
  
  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[index].classList.add('active');
    dots[index].classList.add('active');
  }
  
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }
  
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentSlide = index;
      showSlide(currentSlide);
    });
  });
  
  setInterval(nextSlide, 5000);
}

document.querySelector('.enroll-button').addEventListener('click', () => {
  alert('Thank you for your interest! Enrollment process will begin shortly.');
});

document.querySelectorAll('.payment-option').forEach(option => {
  option.addEventListener('click', () => {
    document.querySelectorAll('.payment-option').forEach(opt => {
      opt.style.borderColor = '#e5e7eb';
      opt.style.transform = 'translateX(0)';
    });
    option.style.borderColor = '#2563eb';
    option.style.transform = 'translateX(8px)';
  });
});

window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  const scrolled = window.pageYOffset;
  hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
});
//last updated 23 march 11.45pm
/*lucide.createIcons();

document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('[data-animate]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        
        if (entry.target.classList.contains('stats-card')) {
          initializeProgressRings();
        }
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(element => observer.observe(element));
  
  initializeCurriculum();

  initializeFeedbackCarousel();
});

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

function initializeProgressRings() {
  const progressRings = document.querySelectorAll('.stat-progress');
  
  progressRings.forEach(ring => {
    const value = parseInt(ring.dataset.value);
    const circle = ring.querySelector('.progress-ring-circle-value');
    const radius = circle.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;
    
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = circumference;
    
    const offset = circumference - (value / 100 * circumference);
    circle.style.strokeDashoffset = offset;
  });
}

function initializeCurriculum() {
  const headers = document.querySelectorAll('.curriculum-header');
  
  headers.forEach(header => {
    header.addEventListener('click', () => {
      const content = document.getElementById(header.dataset.toggle);
      const isActive = header.classList.contains('active');
    
      document.querySelectorAll('.curriculum-header').forEach(h => h.classList.remove('active'));
      document.querySelectorAll('.curriculum-content').forEach(c => c.classList.remove('active'));

      if (!isActive) {
        header.classList.add('active');
        content.classList.add('active');
      }
    });
  });
}

function initializeFeedbackCarousel() {
  const slides = document.querySelectorAll('.feedback-slide');
  const dots = document.querySelectorAll('.dot');
  let currentSlide = 0;
  
  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[index].classList.add('active');
    dots[index].classList.add('active');
  }
  
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }
  
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentSlide = index;
      showSlide(currentSlide);
    });
  });
  
  setInterval(nextSlide, 5000);
}

document.querySelector('.enroll-button').addEventListener('click', () => {
  alert('Thank you for your interest! Enrollment process will begin shortly.');
});

document.querySelectorAll('.payment-option').forEach(option => {
  option.addEventListener('click', () => {
    document.querySelectorAll('.payment-option').forEach(opt => {
      opt.style.borderColor = '#e5e7eb';
      opt.style.transform = 'translateX(0)';
    });
    option.style.borderColor = '#2563eb';
    option.style.transform = 'translateX(8px)';
  });
});

window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  const scrolled = window.pageYOffset;
  hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
}); */