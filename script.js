// ===== YASH PANDYA PORTFOLIO - JAVASCRIPT =====

// === THEME TOGGLE ===
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to 'dark'
const currentTheme = localStorage.getItem('theme') || 'dark';
htmlElement.setAttribute('data-theme', currentTheme);

// Theme toggle function
themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Add rotation animation
    themeToggle.style.transform = 'rotate(360deg) scale(1.1)';
    setTimeout(() => {
        themeToggle.style.transform = '';
    }, 300);
});

// === CUSTOM CURSOR ===
const cursor = document.createElement('div');
const cursorDot = document.createElement('div');
cursor.className = 'custom-cursor';
cursorDot.className = 'custom-cursor-dot';
document.body.appendChild(cursor);
document.body.appendChild(cursorDot);

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let dotX = 0;
let dotY = 0;

// Track mouse position
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Show cursor when mouse moves
    cursor.classList.add('active');
    cursorDot.classList.add('active');
});

// Smooth cursor follow
function animateCursor() {
    // Cursor ring follows with delay
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    
    // Dot follows faster
    dotX += (mouseX - dotX) * 0.25;
    dotY += (mouseY - dotY) * 0.25;
    
    cursor.style.left = cursorX - 10 + 'px';
    cursor.style.top = cursorY - 10 + 'px';
    
    cursorDot.style.left = dotX - 3 + 'px';
    cursorDot.style.top = dotY - 3 + 'px';
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

// Hover effect on interactive elements
const hoverElements = document.querySelectorAll('a, button, .btn, .nav-link, .social-icon, .project-card, input, textarea, .hamburger, .theme-toggle');

hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        cursorDot.classList.add('hover');
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        cursorDot.classList.remove('hover');
    });
});

// Click effect
document.addEventListener('mousedown', () => {
    cursor.classList.add('click');
    cursorDot.classList.add('click');
});

document.addEventListener('mouseup', () => {
    cursor.classList.remove('click');
    cursorDot.classList.remove('click');
});

// Hide cursor when leaving window
document.addEventListener('mouseleave', () => {
    cursor.classList.remove('active');
    cursorDot.classList.remove('active');
});

document.addEventListener('mouseenter', () => {
    cursor.classList.add('active');
    cursorDot.classList.add('active');
});

// === NAVIGATION ===
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('navMenu');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// === ACTIVE NAVIGATION LINK ===
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// === SMOOTH SCROLL ===
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// === SCROLL ANIMATIONS ===
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements that should fade in
const fadeElements = document.querySelectorAll('.detail-item, .cert-card, .timeline-item, .project-card, .skill-category, .contact-item');
fadeElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// === SKILL BARS ANIMATION ===
const skillBars = document.querySelectorAll('.skill-progress');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
            skillObserver.unobserve(bar);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// === CONTACT FORM ===
// FormSubmit handles the submission automatically
// Just add a simple loading state
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // FormSubmit will handle the actual submission
    // The form will redirect after successful submission
});

// === TYPING EFFECT FOR HERO SUBTITLE ===
const subtitle = document.querySelector('.hero-subtitle');
const subtitleText = subtitle.textContent;
subtitle.textContent = '';

let charIndex = 0;
function typeWriter() {
    if (charIndex < subtitleText.length) {
        subtitle.textContent += subtitleText.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 100);
    }
}

// Start typing effect after page load
window.addEventListener('load', () => {
    setTimeout(typeWriter, 1500);
});

// === CURSOR TRAIL EFFECT ===
const coords = { x: 0, y: 0 };

// Create cursor trail circles with sophisticated colors
for (let i = 0; i < 20; i++) {
    const circle = document.createElement('div');
    circle.className = 'circle';
    const colors = ['#D4C5A0', '#C4B594', '#B8A882', '#A89F91'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    circle.style.cssText = `
        position: fixed;
        width: ${10 - i * 0.3}px;
        height: ${10 - i * 0.3}px;
        border-radius: 50%;
        background: ${randomColor};
        pointer-events: none;
        z-index: 9998;
        opacity: 0;
        transition: opacity 0.3s ease;
        box-shadow: 0 0 8px ${randomColor}60;
    `;
    document.body.appendChild(circle);
}

const allCircles = document.querySelectorAll('.circle');

allCircles.forEach((circle, index) => {
    circle.x = 0;
    circle.y = 0;
});

window.addEventListener('mousemove', (e) => {
    coords.x = e.clientX;
    coords.y = e.clientY;
});

function animateCircles() {
    let x = coords.x;
    let y = coords.y;
    
    allCircles.forEach((circle, index) => {
        circle.style.left = x - 5 + 'px';
        circle.style.top = y - 5 + 'px';
        circle.style.opacity = (20 - index) / 20 * 0.5;
        circle.style.transform = `scale(${(20 - index) / 20})`;
        
        circle.x = x;
        circle.y = y;
        
        const nextCircle = allCircles[index + 1] || allCircles[0];
        x += (nextCircle.x - x) * 0.2;
        y += (nextCircle.y - y) * 0.2;
    });
    
    requestAnimationFrame(animateCircles);
}

animateCircles();

// === PARALLAX EFFECT FOR HERO ===
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroText = document.querySelector('.hero-text');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroText && heroImage) {
        heroText.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroImage.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

// === PROJECT CARDS TILT EFFECT ===
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Reduced rotation for subtle effect (divided by 30 instead of 15)
        const rotateX = (y - centerY) / 30;
        const rotateY = (centerX - x) / 30;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.01)`;
        card.style.boxShadow = `${-rotateY * 1}px ${rotateX * 1}px 40px rgba(201, 169, 97, 0.2)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
        card.style.boxShadow = '';
    });
});

// === STATS COUNTER ANIMATION ===
const stats = document.querySelectorAll('.stat-number');

const countUp = (element, target) => {
    const increment = target / 100;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (target === 8 ? '' : '+');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (target === 8 ? '' : '+');
        }
    }, 20);
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const value = parseInt(target.textContent);
            countUp(target, value);
            statsObserver.unobserve(target);
        }
    });
}, { threshold: 0.5 });

stats.forEach(stat => {
    statsObserver.observe(stat);
});

// === GRADIENT ORBS MOUSE FOLLOW ===
const orbs = document.querySelectorAll('.gradient-orb');

document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 60;
        const xOffset = (x - 0.5) * speed;
        const yOffset = (y - 0.5) * speed;
        const rotation = (x - 0.5) * 20;
        
        orb.style.transform = `translate(${xOffset}px, ${yOffset}px) rotate(${rotation}deg)`;
    });
});

// === SCROLL TO TOP BUTTON ===
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 55px;
    height: 55px;
    border-radius: 50%;
    background: linear-gradient(135deg, #C9A961, #A68B5B);
    color: #0B0C10;
    border: none;
    font-size: 26px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.4s ease;
    z-index: 1000;
    box-shadow: 0 8px 25px rgba(201, 169, 97, 0.3);
    font-weight: bold;
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.visibility = 'visible';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopBtn.addEventListener('mouseenter', () => {
    scrollTopBtn.style.transform = 'scale(1.15) translateY(-8px) rotate(360deg)';
    scrollTopBtn.style.boxShadow = '0 15px 40px rgba(201, 169, 97, 0.5)';
});

scrollTopBtn.addEventListener('mouseleave', () => {
    scrollTopBtn.style.transform = 'scale(1) translateY(0) rotate(0deg)';
    scrollTopBtn.style.boxShadow = '0 8px 25px rgba(201, 169, 97, 0.3)';
});

// === LOADING ANIMATION ===
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// === CONSOLE MESSAGE ===
console.log('%c👋 Hello! Welcome to Yash Pandya\'s Portfolio', 'color: #C9A961; font-size: 20px; font-weight: bold;');
console.log('%cLooking for a talented Full Stack Developer? Let\'s connect!', 'color: #8B7E74; font-size: 14px;');
console.log('%c📧 yashpandya742@gmail.com', 'color: #4A5859; font-size: 14px;');

// === SMOOTH REVEAL ON LOAD ===
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1.2s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// === ANIMATED GRID PARTICLES ===
function createGridParticles() {
    const animatedBg = document.querySelector('.animated-bg');
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'grid-particle';
        
        const size = Math.random() * 3 + 1;
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        const duration = Math.random() * 20 + 15;
        const delay = Math.random() * 5;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(212, 197, 160, 0.4);
            border-radius: 50%;
            left: ${startX}%;
            top: ${startY}%;
            pointer-events: none;
            box-shadow: 0 0 10px rgba(212, 197, 160, 0.6);
            animation: floatParticle ${duration}s ease-in-out infinite;
            animation-delay: ${delay}s;
            opacity: 0;
        `;
        
        animatedBg.appendChild(particle);
    }
}

// Add particle animation keyframes
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes floatParticle {
        0% {
            transform: translate(0, 0);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// Initialize particles
createGridParticles();

// === GRID INTERSECTION HIGHLIGHTS ===
function createGridHighlights() {
    const gridOverlay = document.querySelector('.grid-overlay');
    
    setInterval(() => {
        const highlight = document.createElement('div');
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        highlight.style.cssText = `
            position: absolute;
            width: 50px;
            height: 50px;
            left: ${x}%;
            top: ${y}%;
            border: 1px solid rgba(212, 197, 160, 0.3);
            pointer-events: none;
            animation: highlightFade 2s ease-out forwards;
        `;
        
        gridOverlay.appendChild(highlight);
        
        setTimeout(() => {
            highlight.remove();
        }, 2000);
    }, 3000);
}

// Add highlight animation
const highlightStyle = document.createElement('style');
highlightStyle.textContent = `
    @keyframes highlightFade {
        0% {
            opacity: 1;
            transform: scale(0.5);
        }
        100% {
            opacity: 0;
            transform: scale(1.5);
        }
    }
`;
document.head.appendChild(highlightStyle);

// Initialize grid highlights
createGridHighlights();

// === INTERACTIVE HOVER SOUND EFFECT (Visual Feedback) ===
const interactiveElements = document.querySelectorAll('.btn, .social-icon, .project-card, .skill-category, .cert-card');

interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        element.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    });
});

// === SECTION REVEAL WITH STAGGER EFFECT ===
const revealSections = document.querySelectorAll('section');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.1 });

revealSections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    sectionObserver.observe(section);
});

// === MAGNETIC BUTTON EFFECT ===
const magneticButtons = document.querySelectorAll('.btn');

magneticButtons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.05)`;
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0, 0) scale(1)';
    });
});

// === ENHANCED PARALLAX FOR MULTIPLE ELEMENTS ===
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroText = document.querySelector('.hero-text');
    const heroImage = document.querySelector('.hero-image');
    const orbs = document.querySelectorAll('.gradient-orb');
    
    if (heroText && heroImage) {
        heroText.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroImage.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
    
    // Parallax for orbs
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.1;
        orb.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// === TEXT SHIMMER EFFECT ON HOVER ===
const shimmerTexts = document.querySelectorAll('.hero-title, .section-title');

shimmerTexts.forEach(text => {
    text.addEventListener('mouseenter', () => {
        text.style.animation = 'shimmer 1.5s ease-in-out';
    });
    
    text.addEventListener('animationend', () => {
        text.style.animation = '';
    });
});

// Add shimmer keyframe dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes shimmer {
        0% { filter: brightness(1); }
        50% { filter: brightness(1.5); }
        100% { filter: brightness(1); }
    }
`;
document.head.appendChild(style);
