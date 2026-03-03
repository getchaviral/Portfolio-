// Main JavaScript file - Portfolio initialization and interactions
class PortfolioApp {
    constructor() {
        this.isInitialized = false;
        this.techStack3D = null;
        this.skillsRadar = null;
        this.observers = [];
        this.konamiCode = [];
        this.konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
        
        this.init();
    }
    
    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.onDOMReady());
        } else {
            this.onDOMReady();
        }
    }
    
    onDOMReady() {
        console.log('🚀 Portfolio initializing...');
        
        this.setupEventListeners();
        this.initializeComponents();
        this.setupScrollAnimations();
        this.setupNavigationEffects();
        this.setupTypingAnimation();
        this.setupEasterEgg();
        this.setupPerformanceOptimizations();
        
        this.isInitialized = true;
        console.log('✅ Portfolio initialized successfully!');
    }
    
    initializeComponents() {
        // Initialize particles background
        if (window.ParticleSystem) {
            window.ParticleSystem.init();
        }
        
        // Initialize 3D tech stack with delay to ensure container is ready
        setTimeout(() => {
            if (window.TechStack3D && document.getElementById('tech-stack-container')) {
                try {
                    this.techStack3D = new window.TechStack3D('tech-stack-container');
                    console.log('✅ 3D Tech Stack initialized');
                } catch (error) {
                    console.warn('⚠️ 3D Tech Stack initialization failed:', error);
                }
            }
        }, 200);
        
        // Initialize skills radar with delay
        setTimeout(() => {
            if (window.SkillsRadar && document.getElementById('skills-radar')) {
                try {
                    this.skillsRadar = new window.SkillsRadar('skills-radar');
                    console.log('✅ Skills Radar initialized');
                } catch (error) {
                    console.warn('⚠️ Skills Radar initialization failed:', error);
                }
            }
        }, 400);
    }
    
    setupEventListeners() {
        // Smooth scrolling for navigation
        this.setupSmoothScrolling();
        
        // Window resize handler
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 100);
        });
        
        // Scroll effects
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.handleScroll();
            }, 10);
        }, { passive: true });
        
        // Page visibility change
        document.addEventListener('visibilitychange', () => {
            this.handleVisibilityChange();
        });
    }
    
    setupSmoothScrolling() {
        document.querySelectorAll('nav a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const target = document.getElementById(targetId);
                
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed nav
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Update active nav item
                    this.updateActiveNavItem(targetId);
                }
            });
        });
    }
    
    updateActiveNavItem(activeId) {
        document.querySelectorAll('nav a').forEach(link => {
            link.classList.remove('active');
        });
        
        const activeLink = document.querySelector(`nav a[href="#${activeId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
    
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fadeInUp');
                    
                    // Add staggered animation for multiple elements
                    if (entry.target.classList.contains('project-card')) {
                        const cards = entry.target.parentElement.querySelectorAll('.project-card');
                        cards.forEach((card, index) => {
                            setTimeout(() => {
                                card.style.animationDelay = `${index * 0.2}s`;
                                card.classList.add('animate-fadeInUp');
                            }, index * 100);
                        });
                    }
                    
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe elements for animations
        const animateElements = document.querySelectorAll(
            '.project-card, .contact-item, .section-title, .tech-stack-section > p, .skills-section > p'
        );
        
        animateElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease-out';
            observer.observe(el);
        });
        
        this.observers.push(observer);
    }
    
    setupNavigationEffects() {
        const nav = document.querySelector('nav');
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            // Change nav background based on scroll
            if (currentScrollY > 100) {
                nav.style.background = 'rgba(0, 0, 0, 0.95)';
                nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
            } else {
                nav.style.background = 'rgba(0, 0, 0, 0.8)';
                nav.style.boxShadow = 'none';
            }
            
            // Hide/show nav on scroll
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                nav.style.transform = 'translateY(-100%)';
            } else {
                nav.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        }, { passive: true });
        
        // Update active nav item based on scroll position
        const sections = document.querySelectorAll('section[id]');
        window.addEventListener('scroll', () => {
            const scrollPos = window.scrollY + 150;
            
            sections.forEach(section => {
                if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
                    this.updateActiveNavItem(section.id);
                }
            });
        }, { passive: true });
    }
    
    setupTypingAnimation() {
        const typeWriter = (element, text, speed = 50) => {
            if (!element) return;
            
            let i = 0;
            element.textContent = '';
            element.style.borderRight = '2px solid #00d4ff';
            
            const type = () => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                } else {
                    // Remove cursor after typing
                    setTimeout(() => {
                        element.style.borderRight = 'none';
                    }, 1000);
                }
            };
            
            type();
        };
        
        // Trigger typing animation when hero is visible
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const heroSubtitle = entry.target.querySelector('p');
                    if (heroSubtitle && !heroSubtitle.dataset.typed) {
                        const originalText = heroSubtitle.textContent;
                        setTimeout(() => {
                            typeWriter(heroSubtitle, originalText, 50);
                            heroSubtitle.dataset.typed = 'true';
                        }, 1000);
                    }
                    heroObserver.unobserve(entry.target);
                }
            });
        });
        
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroObserver.observe(heroSection);
            this.observers.push(heroObserver);
        }
    }
    
    setupEasterEgg() {
        document.addEventListener('keydown', (e) => {
            this.konamiCode.push(e.keyCode);
            
            if (this.konamiCode.length > this.konamiSequence.length) {
                this.konamiCode.shift();
            }
            
            if (JSON.stringify(this.konamiCode) === JSON.stringify(this.konamiSequence)) {
                this.triggerEasterEgg();
                this.konamiCode = []; // Reset
            }
        });
    }
    
    triggerEasterEgg() {
        // Add rainbow effect
        document.body.style.animation = 'rainbow 2s infinite';
        
        // Create celebration particles
        this.createCelebrationEffect();
        
        // Show easter egg message
        setTimeout(() => {
            document.body.style.animation = '';
            alert('🎉 Easter egg activated! You found the developer secret!\n\n' +
                  '🏆 Achievement unlocked: "Code Explorer"\n' +
                  '👾 You discovered the Konami Code!\n\n' +
                  'Thanks for exploring my portfolio thoroughly! 🚀');
        }, 2000);
        
        console.log('🎮 Easter egg activated! Konami Code detected!');
    }
    
    createCelebrationEffect() {
        const colors = ['#ff6b6b', '#4ecdc4', '#00d4ff', '#ffbd2e', '#ff6b9d'];
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: fixed;
                    width: 10px;
                    height: 10px;
                    background: ${colors[Math.floor(Math.random() * colors.length)]};
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 10000;
                    left: ${Math.random() * window.innerWidth}px;
                    top: -10px;
                    animation: fall 3s linear forwards;
                `;
                
                document.body.appendChild(particle);
                
                setTimeout(() => {
                    particle.remove();
                }, 3000);
            }, i * 50);
        }
        
        // Add falling animation
        if (!document.getElementById('fall-animation')) {
            const style = document.createElement('style');
            style.id = 'fall-animation';
            style.textContent = `
                @keyframes fall {
                    to {
                        transform: translateY(${window.innerHeight + 20}px) rotate(360deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    setupPerformanceOptimizations() {
        // Lazy load images
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
        this.observers.push(imageObserver);
        
        // Preload critical resources
        this.preloadCriticalResources();
        
        // Optimize scroll performance
        this.optimizeScrollPerformance();
    }
    
    preloadCriticalResources() {
        const criticalResources = [
            'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js'
        ];
        
        criticalResources.forEach(url => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'script';
            link.href = url;
            document.head.appendChild(link);
        });
    }
    
    optimizeScrollPerformance() {
        let ticking = false;
        
        const updateOnScroll = () => {
            // Batch DOM updates
            if (!ticking) {
                requestAnimationFrame(() => {
                    // Perform scroll-based updates here
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', updateOnScroll, { passive: true });
    }
    
    handleResize() {
        // Reinitialize components that need resize handling
        if (window.ParticleSystem) {
            window.ParticleSystem.init();
        }
        
        console.log('🔄 Handling resize...');
    }
    
    handleScroll() {
        // Handle scroll-specific logic
        // This could include progress indicators, parallax effects, etc.
    }
    
    handleVisibilityChange() {
        if (document.hidden) {
            // Pause animations when page is hidden
            console.log('⏸️ Page hidden - pausing animations');
        } else {
            // Resume animations when page is visible
            console.log('▶️ Page visible - resuming animations');
        }
    }
    
    // Public methods for external use
    updateSkill(skillName, value) {
        if (this.skillsRadar && this.skillsRadar.updateSkill) {
            this.skillsRadar.updateSkill(skillName, value);
        }
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4ecdc4' : type === 'error' ? '#ff6b6b' : '#00d4ff'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            animation: slideInRight 0.3s ease, fadeOut 0.3s ease 2.7s forwards;
            font-weight: 600;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
    
    destroy() {
        // Clean up observers
        this.observers.forEach(observer => observer.disconnect());
        
        // Clean up components
        if (this.techStack3D && this.techStack3D.destroy) {
            this.techStack3D.destroy();
        }
        
        if (this.skillsRadar && this.skillsRadar.destroy) {
            this.skillsRadar.destroy();
        }
        
        if (window.ParticleSystem && window.ParticleSystem.destroy) {
            window.ParticleSystem.destroy();
        }
        
        console.log('🧹 Portfolio cleaned up');
    }
}

// Initialize the portfolio app
const portfolioApp = new PortfolioApp();

// Add global utility functions
window.portfolioApp = portfolioApp;

// Add some utility styles for animations
const utilityStyles = document.createElement('style');
utilityStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes fadeOut {
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
    
    .animate-fadeInUp {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    nav a.active {
        color: #ff6b6b !important;
    }
    
    nav a.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(utilityStyles);

// Handle page unload
window.addEventListener('beforeunload', () => {
    portfolioApp.destroy();
});

console.log('📱 Portfolio main script loaded successfully!');