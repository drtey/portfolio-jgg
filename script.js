// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// DOM Elements
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
const navLinks = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('section');
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const header = document.querySelector('header');
const revealElements = document.querySelectorAll('.reveal-text, .reveal-up, .reveal-side');

// Initial animations when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Initialize animations
    initAnimations();
    
    // Add active class to visible elements on load
    setTimeout(() => {
        const visibleElements = Array.from(revealElements).filter(elem => {
            const rect = elem.getBoundingClientRect();
            return rect.top < window.innerHeight;
        });
        
        visibleElements.forEach(elem => {
            elem.classList.add('active');
        });
    }, 100);
});

// Custom cursor
document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1
    });
    
    gsap.to(cursorFollower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5
    });
});

// Grow cursor on hover over links and buttons
const growCursor = (e) => {
    cursorFollower.classList.add('cursor-grow');
};

const shrinkCursor = (e) => {
    cursorFollower.classList.remove('cursor-grow');
};

// Add cursor effects to interactive elements
const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-tag, .info-card, .glass-card, .social-link');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', growCursor);
    el.addEventListener('mouseleave', shrinkCursor);
});

// Mobile navigation toggle
burger.addEventListener('click', () => {
    nav.classList.toggle('active');
    burger.classList.toggle('toggle');
});

// Close mobile nav when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        burger.classList.remove('toggle');
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    
    if (scrollPos > 10) {
        header.classList.add('glass-nav');
    } else {
        header.classList.remove('glass-nav');
    }
    
    // Highlight active section in nav
    updateActiveNavLink();
});

// Update active nav link based on scroll position
function updateActiveNavLink() {
    const fromTop = window.scrollY + 100;
    
    navLinks.forEach(link => {
        const section = document.querySelector(link.hash);
        
        if (
            section.offsetTop <= fromTop &&
            section.offsetTop + section.offsetHeight > fromTop
        ) {
            navLinks.forEach(item => item.classList.remove('active'));
            link.classList.add('active');
        }
    });
}

// Initialize scroll animations
function initAnimations() {
    // Reveal animations for elements
    revealElements.forEach(elem => {
        ScrollTrigger.create({
            trigger: elem,
            start: 'top 95%',
            end: 'bottom 5%',
            onEnter: () => elem.classList.add('active')
        });
    });
    
    // Form submission handling (prevent default for demo)
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Animation for successful submission
            const button = form.querySelector('.form-button');
            const originalText = button.textContent;
            
            // Change button text and style temporarily
            button.textContent = 'Message Sent!';
            button.style.backgroundColor = '#28ca41';
            
            // Reset form and button after delay
            setTimeout(() => {
                form.reset();
                button.textContent = originalText;
                button.style.backgroundColor = '';
            }, 3000);
        });
    }
    
    // Skill tags random animation
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        // Random hover effect
        tag.addEventListener('mouseenter', () => {
            gsap.to(tag, {
                y: -5,
                scale: 1.05,
                backgroundColor: 'var(--accent-color)',
                duration: 0.3
            });
        });
        
        tag.addEventListener('mouseleave', () => {
            gsap.to(tag, {
                y: 0,
                scale: 1,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                duration: 0.3
            });
        });
        
        // Initial random animation
        gsap.to(tag, {
            y: '-=3',
            duration: 2 + Math.random(),
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: Math.random() * 2
        });
    });
    
    // Hero section parallax effect
    gsap.to('.hero-visual', {
        y: 100,
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });
    
    // Background glow movement
    gsap.to('.purple-glow', {
        x: '+=50',
        y: '+=20',
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });
}

// Hide cursor when leaving window
document.addEventListener('mouseleave', () => {
    cursor.style.opacity = 0;
    cursorFollower.style.opacity = 0;
});

document.addEventListener('mouseenter', () => {
    cursor.style.opacity = 1;
    cursorFollower.style.opacity = 1;
});