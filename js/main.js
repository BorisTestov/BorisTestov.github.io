/**
 * Main JavaScript for Boris Testov CV Website
 * Handles theme switching, animations, and interactions
 */

// ============================================
// Theme Management
// ============================================

class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.currentTheme = localStorage.getItem('theme') || 'dark';
        this.init();
    }

    init() {
        // Set initial theme
        document.documentElement.setAttribute('data-theme', this.currentTheme);

        // Add event listener
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.currentTheme = newTheme;

        // Update DOM and localStorage
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        // Add rotation animation
        this.themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            this.themeToggle.style.transform = '';
        }, 300);
    }
}

// ============================================
// Navigation Scroll Effect
// ============================================

class NavigationManager {
    constructor() {
        this.nav = document.querySelector('.nav');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('section[id]');
        this.init();
    }

    init() {
        // Add scroll effect to navigation
        window.addEventListener('scroll', () => this.handleScroll());

        // Smooth scroll for navigation links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.smoothScroll(e));
        });

        // Initial check
        this.handleScroll();
    }

    handleScroll() {
        // Add 'scrolled' class when page is scrolled
        if (window.scrollY > 50) {
            this.nav.classList.add('scrolled');
        } else {
            this.nav.classList.remove('scrolled');
        }

        // Highlight active section in navigation
        this.highlightActiveSection();
    }

    highlightActiveSection() {
        const scrollY = window.pageYOffset;

        this.sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                correspondingLink?.classList.add('active');
            } else {
                correspondingLink?.classList.remove('active');
            }
        });
    }

    smoothScroll(e) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
}

// ============================================
// Job Card Expansion
// ============================================

class JobCardManager {
    constructor() {
        this.jobCards = document.querySelectorAll('.job-card');
        this.init();
    }

    init() {
        this.jobCards.forEach(card => {
            card.addEventListener('click', () => this.toggleCard(card));
        });

        // Expand first card by default
        if (this.jobCards.length > 0) {
            this.jobCards[0].classList.add('expanded');
        }
    }

    toggleCard(card) {
        const isExpanded = card.classList.contains('expanded');

        if (isExpanded) {
            card.classList.remove('expanded');
        } else {
            // Optional: Close other cards when opening a new one
            // this.jobCards.forEach(c => c.classList.remove('expanded'));
            card.classList.add('expanded');
        }
    }
}

// ============================================
// Scroll Reveal Animations
// ============================================

class ScrollReveal {
    constructor() {
        this.revealElements = document.querySelectorAll('.reveal');
        this.init();
    }

    init() {
        // Use Intersection Observer for better performance
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Optional: Stop observing after animation
                    // this.observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        this.revealElements.forEach(element => {
            this.observer.observe(element);
        });
    }
}

// ============================================
// Utility Functions
// ============================================

// Update year in footer
function updateYear() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Smooth scroll for all anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Skip empty anchors
            if (href === '#' || href === '#!') return;

            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                const offsetTop = targetElement.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Add loading class removal
function removeLoadingState() {
    document.body.classList.add('loaded');
}

// Handle external links (open in new tab)
function handleExternalLinks() {
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        // Skip links that already have target attribute
        if (!link.hasAttribute('target')) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });
}

// Keyboard accessibility for interactive elements
function initKeyboardAccessibility() {
    // Add keyboard support for expand buttons
    document.querySelectorAll('.expand-btn').forEach(btn => {
        btn.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                btn.click();
            }
        });
    });

    // Add keyboard support for theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                themeToggle.click();
            }
        });
    }
}

// Add print styles helper
function handlePrint() {
    window.addEventListener('beforeprint', () => {
        // Expand all job cards before printing
        document.querySelectorAll('.job-card').forEach(card => {
            card.classList.add('expanded');
        });
    });
}

// Performance: Reduce motion for users who prefer it
function respectReducedMotion() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        document.documentElement.style.setProperty('--transition-speed', '0s');
        document.documentElement.style.setProperty('--transition-base', '0s');
        document.documentElement.style.setProperty('--transition-slow', '0s');
    }
}

// ============================================
// Initialize Everything
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize core features
    new ThemeManager();
    new NavigationManager();
    new JobCardManager();
    new ScrollReveal();

    // Initialize utilities
    updateYear();
    initSmoothScroll();
    handleExternalLinks();
    initKeyboardAccessibility();
    handlePrint();
    respectReducedMotion();

    // Remove loading state
    setTimeout(removeLoadingState, 100);

    // Console easter egg for recruiters
    console.log('%c👋 Hello there!', 'font-size: 20px; font-weight: bold; color: #64ffda;');
    console.log('%cInterested in the code? Check out the source at https://github.com/BorisTestov/BorisTestov.github.io', 'font-size: 12px; color: #8892b0;');
    console.log('%cLet\'s build something great together!', 'font-size: 14px; color: #64ffda;');
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        // Refresh year when page becomes visible again
        updateYear();
    }
});

// Handle window resize with debounce
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Recalculate any layout-dependent features here if needed
    }, 250);
});

// Export for potential use in other scripts
window.CVWebsite = {
    ThemeManager,
    NavigationManager,
    JobCardManager,
    ScrollReveal
};

// ============================================
// Service Worker Registration
// ============================================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registered successfully:', registration.scope);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    });
}
