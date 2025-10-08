// Theme Management
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.currentTheme = this.getStoredTheme() || this.getSystemPreference();
        this.init();
    }

    init() {
        // Apply initial theme
        this.applyTheme(this.currentTheme);

        // Add event listener for theme toggle
        this.themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!this.getStoredTheme()) {
                this.applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    getSystemPreference() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    getStoredTheme() {
        return localStorage.getItem('easy-trading-theme');
    }

    storeTheme(theme) {
        localStorage.setItem('easy-trading-theme', theme);
    }

    applyTheme(theme) {
        this.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        this.storeTheme(theme);

        // Add smooth transition class after initial load
        if (!document.body.classList.contains('theme-transition')) {
            document.body.classList.add('theme-transition');
        }
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme(newTheme);

        // Add click animation
        this.themeToggle.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.themeToggle.style.transform = '';
        }, 150);
    }
}

// Header Scroll Effects
class HeaderEffects {
    constructor() {
        this.header = document.getElementById('header');
        this.lastScrollY = window.scrollY;
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });
    }

    handleScroll() {
        const currentScrollY = window.scrollY;

        // Add/remove scrolled class for styling
        if (currentScrollY > 50) {
            this.header.classList.add('scrolled');
        } else {
            this.header.classList.remove('scrolled');
        }

        this.lastScrollY = currentScrollY;
    }
}

// Button Interactions
class ButtonEffects {
    constructor() {
        this.buttons = document.querySelectorAll('.nav-btn');
        this.init();
    }

    init() {
        this.buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.handleClick(e.target);
            });

            button.addEventListener('mouseenter', (e) => {
                this.handleHover(e.target, true);
            });

            button.addEventListener('mouseleave', (e) => {
                this.handleHover(e.target, false);
            });
        });
    }

    handleClick(button) {
        // Add click effect
        button.style.transform = 'scale(0.98)';
        setTimeout(() => {
            button.style.transform = '';
        }, 100);

        // Handle button actions
        if (button.id === 'loginBtn') {
            this.handleLogin();
        } else if (button.id === 'signupBtn') {
            this.handleSignup();
        }
    }

    handleHover(button, isEntering) {
        if (isEntering) {
            button.style.transform = 'translateY(-2px)';
        } else {
            button.style.transform = '';
        }
    }

    handleLogin() {
        console.log('Login button clicked - implement your login logic here');
        // Example: redirect to login page or show modal
        // window.location.href = '/login';
    }

    handleSignup() {
        console.log('Sign Up button clicked - redirecting to signup page');
        // Redirect to signup page
        window.location.href = 'signup.html';
    }

    handleGetStarted() {
        console.log('Get Started button clicked - implement your onboarding logic here');
        // Example: scroll to features section or open modal
        // document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
    }

    handleExploreTools() {
        console.log('Explore Tools button clicked - implement your tools navigation logic here');
        // Example: scroll to tools section or redirect to tools page
        // window.location.href = '/tools';
    }

    handleViewDetails() {
        console.log('View Details button clicked - implement your tool details logic here');
        // Example: open modal or redirect to tool details page
        // window.location.href = '/tool-details';
    }

    handleStartUsing() {
        console.log('Start Using button clicked - implement your tool activation logic here');
        // Example: redirect to tool dashboard or show onboarding
        // window.location.href = '/dashboard';
    }

    handleStartLearning() {
        console.log('Start Learning button clicked - implement your learning platform logic here');
        // Example: redirect to academy or show courses
        // window.location.href = '/academy';
    }
}

// Tools Section Interactions
class ToolsInteractions {
    constructor() {
        this.toolButtons = document.querySelectorAll('.tool-btn');
        this.init();
    }

    init() {
        this.toolButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.handleClick(e.target);
            });

            button.addEventListener('mouseenter', (e) => {
                this.handleHover(e.target, true);
            });

            button.addEventListener('mouseleave', (e) => {
                this.handleHover(e.target, false);
            });
        });
    }

    handleClick(button) {
        // Add click effect
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);

        // Handle button actions based on button text
        const buttonText = button.textContent.trim();

        if (buttonText === 'مشاهده جزئیات') {
            this.handleViewDetails();
        } else if (buttonText === 'شروع استفاده') {
            this.handleStartUsing();
        } else if (buttonText === 'شروع یادگیری') {
            this.handleStartLearning();
        }
    }

    handleHover(button, isEntering) {
        if (isEntering) {
            button.style.transform = 'translateY(-2px) scale(1.02)';
        } else {
            button.style.transform = '';
        }
    }

    handleViewDetails() {
        console.log('View Details button clicked - implement your tool details logic here');
        // Example: open modal or redirect to tool details page
        // window.location.href = '/tool-details';
    }

    handleStartUsing() {
        console.log('Start Using button clicked - implement your tool activation logic here');
        // Example: redirect to tool dashboard or show onboarding
        // window.location.href = '/dashboard';
    }

    handleStartLearning() {
        console.log('Start Learning button clicked - implement your learning platform logic here');
        // Example: redirect to academy or show courses
        // window.location.href = '/academy';
    }
}

// Hamburger Menu Interactions
class HamburgerMenu {
    constructor() {
        this.hamburgerMenu = document.getElementById('hamburgerMenu');
        this.hamburgerIcon = document.getElementById('hamburgerIcon');
        this.menuDropdown = document.getElementById('menuDropdown');
        this.isOpen = false;
        this.init();
    }

    init() {
        // Toggle menu on hamburger icon click
        this.hamburgerIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleMenu();
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.hamburgerMenu.contains(e.target)) {
                this.closeMenu();
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeMenu();
            }
        });

        // Handle menu item clicks
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeMenu();

                const itemText = item.textContent.trim();

                // Handle navigation based on menu item text
                if (itemText === 'ارتباط با ما') {
                    window.location.href = 'contact.html';
                } else if (itemText === 'صفحه اصلی') {
                    window.location.href = 'index.html';
                } else if (itemText === 'ابزارها') {
                    window.location.href = 'index.html#tools';
                } else if (itemText === 'تعرفه‌ها') {
                    window.location.href = 'index.html#pricing';
                } else if (itemText === 'قوانین') {
                    window.location.href = 'index.html#rules';
                }

                console.log(`Menu item clicked: ${itemText}`);
            });
        });
    }

    toggleMenu() {
        if (this.isOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    openMenu() {
        this.hamburgerMenu.classList.add('active');
        this.isOpen = true;

        // Add animation to hamburger icon
        this.hamburgerIcon.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.hamburgerIcon.style.transform = '';
        }, 150);
    }

    closeMenu() {
        this.hamburgerMenu.classList.remove('active');
        this.isOpen = false;
    }
}

// Mobile Menu (for future enhancement)
class MobileMenu {
    constructor() {
        this.nav = document.querySelector('.nav');
        this.init();
    }

    init() {
        // Add mobile menu functionality if needed
        if (window.innerWidth <= 768) {
            this.addMobileMenu();
        }

        window.addEventListener('resize', () => {
            if (window.innerWidth <= 768) {
                this.addMobileMenu();
            } else {
                this.removeMobileMenu();
            }
        });
    }

    addMobileMenu() {
        // Implementation for mobile menu if needed
    }

    removeMobileMenu() {
        // Clean up mobile menu
    }
}

// Performance Optimization
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        // Debounce scroll events
        this.debounce = this.debounce.bind(this);

        // Lazy load animations
        this.setupIntersectionObserver();
    }

    debounce(func, wait = 10) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements that should animate in
        document.querySelectorAll('.hero').forEach(el => {
            observer.observe(el);
        });
    }
}

// Hero Section Interactions
class HeroInteractions {
    constructor() {
        this.heroButtons = document.querySelectorAll('.hero-btn');
        this.init();
    }

    init() {
        this.heroButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.handleClick(e.target);
            });

            button.addEventListener('mouseenter', (e) => {
                this.handleHover(e.target, true);
            });

            button.addEventListener('mouseleave', (e) => {
                this.handleHover(e.target, false);
            });
        });
    }

    handleClick(button) {
        // Add click effect
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);

        // Handle button actions
        if (button.classList.contains('primary-btn')) {
            this.handleGetStarted();
        } else if (button.classList.contains('secondary-btn')) {
            this.handleExploreTools();
        }
    }

    handleHover(button, isEntering) {
        if (isEntering) {
            button.style.transform = 'translateY(-3px) scale(1.02)';
        } else {
            button.style.transform = '';
        }
    }

    handleGetStarted() {
        console.log('Get Started button clicked - implement your onboarding logic here');
        // Example: scroll to features section or open modal
        // document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
    }

    handleExploreTools() {
        console.log('Explore Tools button clicked - implement your tools navigation logic here');
        // Example: scroll to tools section or redirect to tools page
        // window.location.href = '/tools';
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize core functionality
    const themeManager = new ThemeManager();
    const headerEffects = new HeaderEffects();
    const buttonEffects = new ButtonEffects();
    const hamburgerMenu = new HamburgerMenu();
    const heroInteractions = new HeroInteractions();
    const toolsInteractions = new ToolsInteractions();
    const mobileMenu = new MobileMenu();
    const performanceOptimizer = new PerformanceOptimizer();

    // Add loading animation
    document.body.classList.add('loaded');

    console.log('Easy Trading header with hamburger menu, hero section, and tools showcase initialized successfully!');
});

// Add CSS for smooth theme transitions
const style = document.createElement('style');
style.textContent = `
    .theme-transition * {
        transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease !important;
    }

    .header.scrolled {
        background: rgba(14, 14, 14, 0.95);
    }

    [data-theme="light"] .header.scrolled {
        background: rgba(255, 255, 255, 0.95);
    }

    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    body.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(style);
