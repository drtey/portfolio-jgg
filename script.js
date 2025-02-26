document.addEventListener('DOMContentLoaded', function() {
    // Animations for stack items
    const stackItems = document.querySelectorAll('.stack-item');
    
    stackItems.forEach((item, index) => {
        // Random animation delay for smoother appearance
        const delay = Math.random() * 0.3;
        item.style.opacity = '0';
        item.style.transform = 'translateY(10px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease, background-color 0.3s ease';
        item.style.transitionDelay = `${delay}s`;
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 100);
        
        // Add hover effect
        item.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.backgroundColor = '#333333';
                this.style.transform = 'translateY(-3px)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.backgroundColor = '#232323';
                this.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Rotate active stack item randomly
    const activeStackItems = document.querySelectorAll('.stack-item.active');
    activeStackItems.forEach(item => {
        setInterval(() => {
            // Pick a random item
            const randomIndex = Math.floor(Math.random() * stackItems.length);
            
            // Remove active class from all items
            stackItems.forEach(i => {
                i.classList.remove('active');
                i.style.backgroundColor = '#232323';
            });
            
            // Add active class to random item
            stackItems[randomIndex].classList.add('active');
            stackItems[randomIndex].style.backgroundColor = 'var(--accent-color)';
        }, 3000);
    });
    
    // Project cards hover effects
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Timeline animation
    const timelineEntries = document.querySelectorAll('.timeline-entry');
    
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    function handleScroll() {
        timelineEntries.forEach(entry => {
            if (isInViewport(entry)) {
                entry.style.opacity = '1';
                entry.style.transform = 'translateX(0)';
            }
        });
    }
    
    // Set initial styles for timeline entries
    timelineEntries.forEach(entry => {
        entry.style.opacity = '0';
        entry.style.transform = 'translateX(-20px)';
        entry.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Check items on load
    handleScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Añadir animación al avatar
    const avatar = document.querySelector('.avatar');
    if (avatar) {
        avatar.style.opacity = '0';
        avatar.style.transform = 'scale(0.8)';
        avatar.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            avatar.style.opacity = '1';
            avatar.style.transform = 'scale(1)';
        }, 300);
    }
    
    // Animar enlaces sociales
    const socialLinks = document.querySelectorAll('.social-icons a');
    
    socialLinks.forEach((link, index) => {
        link.style.opacity = '0';
        link.style.transform = 'translateY(10px)';
        link.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        link.style.transitionDelay = `${0.1 * index}s`;
        
        setTimeout(() => {
            link.style.opacity = '1';
            link.style.transform = 'translateY(0)';
        }, 300 + (100 * index));
    });
});