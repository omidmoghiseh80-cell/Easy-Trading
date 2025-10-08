// Contact Form Management
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.submitBtn = document.getElementById('submitBtn');
        this.btnText = document.querySelector('.btn-text');
        this.btnLoading = document.getElementById('btnLoading');
        this.btnSuccess = document.getElementById('btnSuccess');
        this.formMessages = document.getElementById('formMessages');

        this.init();
    }

    init() {
        // Add form submit event listener
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });

        // Add input focus effects
        this.addInputFocusEffects();

        // Add form validation on input
        this.addRealTimeValidation();
    }

    addInputFocusEffects() {
        const inputs = document.querySelectorAll('.form-input');

        inputs.forEach(input => {
            input.addEventListener('focus', (e) => {
                e.target.parentElement.classList.add('focused');
            });

            input.addEventListener('blur', (e) => {
                e.target.parentElement.classList.remove('focused');

                // Validate on blur
                this.validateField(e.target);
            });
        });
    }

    addRealTimeValidation() {
        const inputs = document.querySelectorAll('.form-input');

        inputs.forEach(input => {
            input.addEventListener('input', (e) => {
                this.validateField(e.target);
            });
        });
    }

    validateField(field) {
        const fieldName = field.name;
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Clear previous error
        this.clearFieldError(fieldName);

        switch (fieldName) {
            case 'fullName':
                if (value.length < 2) {
                    isValid = false;
                    errorMessage = 'نام کامل باید حداقل ۲ حرف باشد / Full name must be at least 2 characters';
                }
                break;

            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'لطفاً یک ایمیل معتبر وارد کنید / Please enter a valid email address';
                }
                break;

            case 'subject':
                if (!value) {
                    isValid = false;
                    errorMessage = 'لطفاً یک موضوع انتخاب کنید / Please select a subject';
                }
                break;

            case 'message':
                if (value.length < 10) {
                    isValid = false;
                    errorMessage = 'پیام باید حداقل ۱۰ حرف باشد / Message must be at least 10 characters';
                }
                break;
        }

        if (!isValid) {
            this.showFieldError(fieldName, errorMessage);
        }

        return isValid;
    }

    validateForm() {
        const fields = ['fullName', 'email', 'subject', 'message'];
        let isFormValid = true;

        fields.forEach(fieldName => {
            const field = document.getElementById(fieldName);
            if (!this.validateField(field)) {
                isFormValid = false;
            }
        });

        return isFormValid;
    }

    showFieldError(fieldName, message) {
        const errorElement = document.getElementById(`${fieldName}Error`);
        const fieldGroup = errorElement.parentElement;

        errorElement.textContent = message;
        errorElement.style.display = 'block';
        fieldGroup.classList.add('error');
    }

    clearFieldError(fieldName) {
        const errorElement = document.getElementById(`${fieldName}Error`);
        const fieldGroup = errorElement.parentElement;

        errorElement.textContent = '';
        errorElement.style.display = 'none';
        fieldGroup.classList.remove('error');
    }

    clearAllErrors() {
        const errorElements = document.querySelectorAll('.form-error');
        errorElements.forEach(error => {
            error.textContent = '';
            error.style.display = 'none';
            error.parentElement.classList.remove('error');
        });
    }

    async handleSubmit() {
        // Clear previous messages
        this.clearFormMessages();

        // Validate form
        if (!this.validateForm()) {
            this.showFormMessage('لطفاً تمام فیلدهای لازم را به درستی تکمیل کنید / Please fill in all required fields correctly', 'error');
            return;
        }

        // Show loading state
        this.showLoadingState();

        try {
            // Simulate form submission
            await this.simulateSubmission();

            // Show success state
            this.showSuccessState();

            // Scroll to top smoothly
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // Reset form after delay
            setTimeout(() => {
                this.form.reset();
                this.resetButtonState();
                this.clearAllErrors();
            }, 3000);

        } catch (error) {
            // Show error state
            this.showErrorState();
            this.showFormMessage('خطایی در ارسال پیام رخ داد. لطفاً دوباره تلاش کنید / An error occurred while sending the message. Please try again.', 'error');
        }
    }

    simulateSubmission() {
        return new Promise((resolve, reject) => {
            // Simulate network delay
            setTimeout(() => {
                // Simulate 90% success rate
                if (Math.random() > 0.1) {
                    resolve();
                } else {
                    reject(new Error('Network error'));
                }
            }, 2000);
        });
    }

    showLoadingState() {
        this.submitBtn.disabled = true;
        this.btnText.style.display = 'none';
        this.btnLoading.style.display = 'flex';
        this.btnSuccess.style.display = 'none';
    }

    showSuccessState() {
        this.btnText.style.display = 'none';
        this.btnLoading.style.display = 'none';
        this.btnSuccess.style.display = 'flex';

        this.showFormMessage('پیام شما با موفقیت ارسال شد! تیم ما به زودی با شما تماس خواهد گرفت / Your message has been sent successfully! Our team will contact you soon.', 'success');
    }

    showErrorState() {
        this.submitBtn.disabled = false;
        this.btnText.style.display = 'flex';
        this.btnLoading.style.display = 'none';
        this.btnSuccess.style.display = 'none';
    }

    resetButtonState() {
        this.submitBtn.disabled = false;
        this.btnText.style.display = 'flex';
        this.btnLoading.style.display = 'none';
        this.btnSuccess.style.display = 'none';
    }

    showFormMessage(message, type) {
        this.formMessages.textContent = message;
        this.formMessages.className = `form-message ${type}`;
        this.formMessages.style.display = 'block';

        // Fade out message after delay
        setTimeout(() => {
            this.formMessages.style.display = 'none';
        }, 5000);
    }

    clearFormMessages() {
        this.formMessages.textContent = '';
        this.formMessages.className = 'form-messages';
        this.formMessages.style.display = 'none';
    }
}

// Contact Page Animations
class ContactAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }

    init() {
        // Setup intersection observer for animations
        this.setupObserver();

        // Add floating animation to contact icon
        this.addFloatingAnimation();

        // Add form field animations
        this.addFormAnimations();
    }

    setupObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, this.observerOptions);

        // Observe elements
        document.querySelectorAll('.contact-hero, .contact-form-card, .contact-info-panel').forEach(el => {
            observer.observe(el);
        });
    }

    addFloatingAnimation() {
        const contactIcon = document.querySelector('.hero-contact-icon');
        if (contactIcon) {
            let floatDirection = 1;
            setInterval(() => {
                contactIcon.style.transform = `translateY(${floatDirection * 10}px) scale(${1 + floatDirection * 0.05})`;
                floatDirection *= -1;
            }, 2000);
        }
    }

    addFormAnimations() {
        const formGroups = document.querySelectorAll('.form-group');

        formGroups.forEach((group, index) => {
            // Stagger animation delay
            group.style.animationDelay = `${index * 0.1}s`;

            // Add hover effects
            const input = group.querySelector('.form-input');
            if (input) {
                input.addEventListener('mouseenter', () => {
                    group.classList.add('hovered');
                });

                input.addEventListener('mouseleave', () => {
                    group.classList.remove('hovered');
                });
            }
        });
    }
}

// Theme Integration for Contact Page
class ContactThemeManager {
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

// Contact Information Interactions
class ContactInfoInteractions {
    constructor() {
        this.contactItems = document.querySelectorAll('.contact-info-item');
        this.socialLinks = document.querySelectorAll('.contact-social-link');
        this.init();
    }

    init() {
        // Add click effects to contact items
        this.contactItems.forEach(item => {
            item.addEventListener('mouseenter', (e) => {
                this.handleContactItemHover(e.target, true);
            });

            item.addEventListener('mouseleave', (e) => {
                this.handleContactItemHover(e.target, false);
            });

            // Add click functionality
            const link = item.querySelector('a');
            if (link) {
                link.addEventListener('click', (e) => {
                    this.handleContactClick(e);
                });
            }
        });

        // Add social media interactions
        this.socialLinks.forEach(link => {
            link.addEventListener('mouseenter', (e) => {
                this.handleSocialHover(e.target, true);
            });

            link.addEventListener('mouseleave', (e) => {
                this.handleSocialHover(e.target, false);
            });

            link.addEventListener('click', (e) => {
                this.handleSocialClick(e);
            });
        });
    }

    handleContactItemHover(item, isEntering) {
        if (isEntering) {
            item.style.transform = 'translateX(5px)';
        } else {
            item.style.transform = '';
        }
    }

    handleContactClick(e) {
        e.preventDefault();
        const href = e.target.href;
        const type = href.startsWith('mailto:') ? 'email' : 'phone';

        // Add click animation
        e.target.style.transform = 'scale(0.95)';
        setTimeout(() => {
            e.target.style.transform = '';
        }, 150);

        console.log(`${type} link clicked: ${href}`);
        // In a real application, you would handle the actual action here
    }

    handleSocialHover(link, isEntering) {
        if (isEntering) {
            link.style.transform = 'translateY(-3px) scale(1.1)';
        } else {
            link.style.transform = '';
        }
    }

    handleSocialClick(e) {
        e.preventDefault();

        // Add click animation
        e.target.style.transform = 'scale(0.9)';
        setTimeout(() => {
            e.target.style.transform = '';
        }, 150);

        console.log(`Social media link clicked: ${e.target.href}`);
        // In a real application, you would handle the actual social media navigation here
    }
}

// Mobile Responsiveness for Contact Page
class ContactMobileHandler {
    constructor() {
        this.init();
    }

    init() {
        this.handleResize();
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    handleResize() {
        const contactContent = document.querySelector('.contact-content');

        if (window.innerWidth <= 768) {
            contactContent.classList.add('mobile');
        } else {
            contactContent.classList.remove('mobile');
        }
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize contact functionality
    const contactForm = new ContactForm();
    const contactAnimations = new ContactAnimations();
    const contactThemeManager = new ContactThemeManager();
    const contactInfoInteractions = new ContactInfoInteractions();
    const contactMobileHandler = new ContactMobileHandler();

    // Add loading animation
    document.body.classList.add('loaded');

    console.log('Easy Trading contact page initialized successfully!');
});

// Add CSS for smooth theme transitions and animations
const style = document.createElement('style');
style.textContent = `
    /* Contact Form Styles */
    .contact-hero {
        min-height: 40vh;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        overflow: hidden;
    }

    .contact-hero-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
        text-align: center;
        width: 100%;
    }

    .contact-hero-content {
        z-index: 2;
        position: relative;
    }

    .contact-hero-title {
        font-size: 2.5rem;
        font-weight: 700;
        color: var(--contact-hero-title-color, #FFFFFF);
        margin-bottom: 1rem;
        letter-spacing: -0.02em;
    }

    .contact-hero-subtitle {
        font-size: 1.2rem;
        color: var(--contact-hero-subtitle-color, #BEBEBE);
        opacity: 0.9;
        margin-bottom: 2rem;
    }

    .contact-hero-visual {
        margin-top: 2rem;
    }

    .hero-contact-icon {
        width: 80px;
        height: 80px;
        margin: 0 auto;
        background: var(--hero-icon-bg, rgba(0, 86, 59, 0.1));
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--hero-icon-color, #00563B);
        transition: all 0.3s ease;
        position: relative;
    }

    .hero-contact-icon svg {
        width: 40px;
        height: 40px;
    }

    /* Contact Section */
    .contact-section {
        padding: 4rem 2rem;
        min-height: 60vh;
    }

    .contact-container {
        max-width: 1200px;
        margin: 0 auto;
    }

    .contact-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 4rem;
        align-items: start;
    }

    /* Contact Form */
    .contact-form-card {
        background: var(--contact-form-bg, rgba(31, 31, 31, 0.9));
        border-radius: 12px;
        padding: 2.5rem;
        backdrop-filter: blur(10px);
        border: 1px solid var(--contact-form-border, rgba(255, 255, 255, 0.1));
        position: relative;
        overflow: hidden;
    }

    .contact-form-header {
        text-align: center;
        margin-bottom: 2rem;
    }

    .contact-form-title {
        font-size: 1.8rem;
        font-weight: 600;
        color: var(--contact-form-title-color, #FFFFFF);
        margin-bottom: 0.5rem;
    }

    .contact-form-subtitle {
        font-size: 1rem;
        color: var(--contact-form-subtitle-color, #BEBEBE);
        opacity: 0.8;
    }

    .contact-form {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .form-group {
        position: relative;
    }

    .form-label {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.5rem;
        font-size: 0.95rem;
        font-weight: 500;
        color: var(--form-label-color, #FFFFFF);
    }

    .label-icon {
        width: 18px;
        height: 18px;
        color: var(--label-icon-color, #00563B);
        flex-shrink: 0;
    }

    .form-input {
        width: 100%;
        padding: 0.75rem 1rem;
        background: var(--form-input-bg, rgba(255, 255, 255, 0.05));
        border: 2px solid var(--form-input-border, rgba(255, 255, 255, 0.1));
        border-radius: 8px;
        font-family: inherit;
        font-size: 0.95rem;
        color: var(--form-input-color, #FFFFFF);
        transition: all 0.3s ease;
    }

    .form-input:focus {
        outline: none;
        border-color: var(--form-input-focus-border, #00FF9C);
        box-shadow: 0 0 0 3px var(--form-input-focus-shadow, rgba(0, 255, 156, 0.1));
        background: var(--form-input-focus-bg, rgba(255, 255, 255, 0.1));
    }

    .form-textarea {
        resize: vertical;
        min-height: 120px;
        font-family: inherit;
    }

    .form-error {
        display: none;
        font-size: 0.85rem;
        color: var(--form-error-color, #FF6B6B);
        margin-top: 0.25rem;
        padding-left: 0.5rem;
    }

    .form-group.error .form-input {
        border-color: var(--form-error-border, #FF6B6B);
    }

    .form-group.focused .label-icon {
        color: var(--form-focus-icon-color, #00FF9C);
    }

    /* Submit Button */
    .contact-submit-btn {
        background: var(--submit-btn-bg, #00563B);
        color: var(--submit-btn-color, #FFFFFF);
        border: none;
        padding: 1rem 2rem;
        border-radius: 8px;
        font-family: inherit;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        margin-top: 1rem;
        min-height: 50px;
    }

    .contact-submit-btn:hover:not(:disabled) {
        background: var(--submit-btn-hover-bg, #00563B);
        transform: translateY(-2px);
        box-shadow: 0 0 20px var(--submit-btn-hover-shadow, rgba(0, 255, 156, 0.4));
    }

    .contact-submit-btn:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }

    .btn-loading,
    .btn-success {
        display: none;
        align-items: center;
        gap: 0.5rem;
    }

    .loading-spinner {
        width: 16px;
        height: 16px;
        border: 2px solid transparent;
        border-top: 2px solid currentColor;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }

    /* Form Messages */
    .form-messages {
        margin-top: 1rem;
        padding: 1rem;
        border-radius: 8px;
        font-size: 0.9rem;
        display: none;
    }

    .form-message.success {
        background: var(--success-bg, rgba(0, 255, 156, 0.1));
        color: var(--success-color, #00FF9C);
        border: 1px solid var(--success-border, rgba(0, 255, 156, 0.3));
    }

    .form-message.error {
        background: var(--error-bg, rgba(255, 107, 107, 0.1));
        color: var(--error-color, #FF6B6B);
        border: 1px solid var(--error-border, rgba(255, 107, 107, 0.3));
    }

    /* Contact Info Panel */
    .contact-info-panel {
        background: var(--contact-info-bg, rgba(31, 31, 31, 0.9));
        border-radius: 12px;
        padding: 2.5rem;
        backdrop-filter: blur(10px);
        border: 1px solid var(--contact-info-border, rgba(255, 255, 255, 0.1));
        height: fit-content;
        position: sticky;
        top: 120px;
    }

    .contact-info-header {
        margin-bottom: 2rem;
    }

    .contact-info-title {
        font-size: 1.5rem;
        font-weight: 600;
        color: var(--contact-info-title-color, #FFFFFF);
        margin-bottom: 0.5rem;
    }

    .contact-info-subtitle {
        font-size: 0.9rem;
        color: var(--contact-info-subtitle-color, #BEBEBE);
        opacity: 0.8;
    }

    .contact-info-list {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        margin-bottom: 2rem;
    }

    .contact-info-item {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        padding: 1rem;
        border-radius: 8px;
        transition: all 0.3s ease;
        background: var(--contact-item-bg, rgba(255, 255, 255, 0.02));
    }

    .contact-info-item:hover {
        background: var(--contact-item-hover-bg, rgba(0, 255, 156, 0.05));
        transform: translateX(5px);
    }

    .contact-info-icon {
        width: 24px;
        height: 24px;
        color: var(--contact-info-icon-color, #00563B);
        flex-shrink: 0;
        margin-top: 0.1rem;
    }

    .contact-info-icon svg {
        width: 100%;
        height: 100%;
    }

    .contact-info-content {
        flex: 1;
    }

    .contact-info-label {
        font-size: 0.9rem;
        font-weight: 600;
        color: var(--contact-info-label-color, #FFFFFF);
        margin-bottom: 0.25rem;
    }

    .contact-info-value {
        font-size: 0.95rem;
        color: var(--contact-info-value-color, #BEBEBE);
        text-decoration: none;
        display: block;
        line-height: 1.4;
    }

    .contact-info-value:hover {
        color: var(--contact-info-value-hover, #00FF9C);
    }

    /* Contact Social */
    .contact-social {
        padding-top: 1.5rem;
        border-top: 1px solid var(--contact-social-border, rgba(255, 255, 255, 0.1));
    }

    .contact-social-title {
        font-size: 1.1rem;
        font-weight: 600;
        color: var(--contact-social-title-color, #FFFFFF);
        margin-bottom: 1rem;
    }

    .contact-social-links {
        display: flex;
        gap: 0.75rem;
    }

    .contact-social-link {
        width: 40px;
        height: 40px;
        border-radius: 8px;
        background: var(--contact-social-link-bg, rgba(0, 86, 59, 0.1));
        border: 1px solid var(--contact-social-link-border, rgba(0, 86, 59, 0.2));
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--contact-social-link-color, #00563B);
        text-decoration: none;
        transition: all 0.3s ease;
    }

    .contact-social-link:hover {
        background: var(--contact-social-link-hover-bg, #00563B);
        color: var(--contact-social-link-hover-color, #FFFFFF);
        transform: translateY(-3px) scale(1.1);
        box-shadow: 0 0 15px var(--contact-social-link-hover-shadow, rgba(0, 255, 156, 0.4));
    }

    .contact-social-link svg {
        width: 18px;
        height: 18px;
    }

    /* Specific Social Media Colors */
    .contact-social-link.linkedin:hover {
        background: #0077B5;
        border-color: #0077B5;
    }

    .contact-social-link.instagram:hover {
        background: linear-gradient(45deg, #E1306C, #F77737);
        border-color: #E1306C;
    }

    .contact-social-link.telegram:hover {
        background: #0088CC;
        border-color: #0088CC;
    }

    /* Animations */
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

    /* Theme Variables for Contact Page */
    [data-theme="dark"] {
        --contact-hero-title-color: #FFFFFF;
        --contact-hero-subtitle-color: #BEBEBE;
        --hero-icon-bg: rgba(0, 86, 59, 0.1);
        --hero-icon-color: #00563B;
        --contact-form-bg: rgba(31, 31, 31, 0.9);
        --contact-form-border: rgba(255, 255, 255, 0.1);
        --contact-form-title-color: #FFFFFF;
        --contact-form-subtitle-color: #BEBEBE;
        --form-label-color: #FFFFFF;
        --label-icon-color: #00563B;
        --form-input-bg: rgba(255, 255, 255, 0.05);
        --form-input-border: rgba(255, 255, 255, 0.1);
        --form-input-color: #FFFFFF;
        --form-input-focus-border: #00FF9C;
        --form-input-focus-shadow: rgba(0, 255, 156, 0.1);
        --form-input-focus-bg: rgba(255, 255, 255, 0.1);
        --form-focus-icon-color: #00FF9C;
        --form-error-color: #FF6B6B;
        --form-error-border: #FF6B6B;
        --submit-btn-bg: #00563B;
        --submit-btn-color: #FFFFFF;
        --submit-btn-hover-bg: #00563B;
        --submit-btn-hover-shadow: rgba(0, 255, 156, 0.4);
        --success-bg: rgba(0, 255, 156, 0.1);
        --success-color: #00FF9C;
        --success-border: rgba(0, 255, 156, 0.3);
        --error-bg: rgba(255, 107, 107, 0.1);
        --error-color: #FF6B6B;
        --error-border: rgba(255, 107, 107, 0.3);
        --contact-info-bg: rgba(31, 31, 31, 0.9);
        --contact-info-border: rgba(255, 255, 255, 0.1);
        --contact-info-title-color: #FFFFFF;
        --contact-info-subtitle-color: #BEBEBE;
        --contact-item-bg: rgba(255, 255, 255, 0.02);
        --contact-item-hover-bg: rgba(0, 255, 156, 0.05);
        --contact-info-icon-color: #00563B;
        --contact-info-label-color: #FFFFFF;
        --contact-info-value-color: #BEBEBE;
        --contact-info-value-hover: #00FF9C;
        --contact-social-border: rgba(255, 255, 255, 0.1);
        --contact-social-title-color: #FFFFFF;
        --contact-social-link-bg: rgba(0, 86, 59, 0.1);
        --contact-social-link-border: rgba(0, 86, 59, 0.2);
        --contact-social-link-color: #00563B;
        --contact-social-link-hover-bg: #00563B;
        --contact-social-link-hover-color: #FFFFFF;
        --contact-social-link-hover-shadow: rgba(0, 255, 156, 0.4);
    }

    [data-theme="light"] {
        --contact-hero-title-color: #00563B;
        --contact-hero-subtitle-color: #444444;
        --hero-icon-bg: rgba(0, 86, 59, 0.05);
        --hero-icon-color: #00563B;
        --contact-form-bg: rgba(245, 248, 246, 0.9);
        --contact-form-border: rgba(0, 86, 59, 0.1);
        --contact-form-title-color: #00563B;
        --contact-form-subtitle-color: #666666;
        --form-label-color: #00563B;
        --label-icon-color: #00563B;
        --form-input-bg: rgba(0, 86, 59, 0.02);
        --form-input-border: rgba(0, 86, 59, 0.1);
        --form-input-color: #000000;
        --form-input-focus-border: #00563B;
        --form-input-focus-shadow: rgba(0, 86, 59, 0.1);
        --form-input-focus-bg: rgba(245, 248, 246, 0.9);
        --form-focus-icon-color: #00563B;
        --form-error-color: #E74C3C;
        --form-error-border: #E74C3C;
        --submit-btn-bg: #00563B;
        --submit-btn-color: #FFFFFF;
        --submit-btn-hover-bg: #00563B;
        --submit-btn-hover-shadow: rgba(0, 86, 59, 0.3);
        --success-bg: rgba(0, 86, 59, 0.05);
        --success-color: #00563B;
        --success-border: rgba(0, 86, 59, 0.2);
        --error-bg: rgba(228, 76, 60, 0.05);
        --error-color: #E74C3C;
        --error-border: rgba(228, 76, 60, 0.2);
        --contact-info-bg: rgba(245, 248, 246, 0.9);
        --contact-info-border: rgba(0, 86, 59, 0.1);
        --contact-info-title-color: #00563B;
        --contact-info-subtitle-color: #666666;
        --contact-item-bg: rgba(0, 86, 59, 0.02);
        --contact-item-hover-bg: rgba(0, 86, 59, 0.05);
        --contact-info-icon-color: #00563B;
        --contact-info-label-color: #00563B;
        --contact-info-value-color: #444444;
        --contact-info-value-hover: #00563B;
        --contact-social-border: rgba(0, 86, 59, 0.1);
        --contact-social-title-color: #00563B;
        --contact-social-link-bg: rgba(0, 86, 59, 0.05);
        --contact-social-link-border: rgba(0, 86, 59, 0.1);
        --contact-social-link-color: #00563B;
        --contact-social-link-hover-bg: #00563B;
        --contact-social-link-hover-color: #FFFFFF;
        --contact-social-link-hover-shadow: rgba(0, 86, 59, 0.3);
    }

    /* Responsive Design */
    @media (max-width: 768px) {
        .contact-hero {
            min-height: 30vh;
        }

        .contact-hero-container {
            padding: 1.5rem 1rem;
        }

        .contact-hero-title {
            font-size: 2rem;
        }

        .contact-hero-subtitle {
            font-size: 1rem;
        }

        .hero-contact-icon {
            width: 60px;
            height: 60px;
        }

        .hero-contact-icon svg {
            width: 30px;
            height: 30px;
        }

        .contact-section {
            padding: 2rem 1rem;
        }

        .contact-content {
            grid-template-columns: 1fr;
            gap: 2rem;
        }

        .contact-form-card,
        .contact-info-panel {
            padding: 2rem 1.5rem;
        }

        .contact-info-panel {
            position: static;
        }

        .form-input {
            padding: 0.875rem 1rem;
        }

        .contact-submit-btn {
            padding: 1.2rem 2rem;
        }
    }

    @media (max-width: 480px) {
        .contact-hero-title {
            font-size: 1.8rem;
        }

        .contact-hero-subtitle {
            font-size: 0.95rem;
        }

        .contact-form-card,
        .contact-info-panel {
            padding: 1.5rem 1rem;
        }

        .contact-form-title {
            font-size: 1.5rem;
        }

        .form-label {
            font-size: 0.9rem;
        }

        .form-input {
            font-size: 0.9rem;
        }

        .contact-submit-btn {
            font-size: 0.9rem;
            padding: 1rem 1.5rem;
        }

        .contact-info-item {
            padding: 0.75rem;
        }

        .contact-social-links {
            justify-content: center;
        }
    }

    /* Loading animation */
    body.loaded {
        opacity: 1;
    }

    body {
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    /* Additional button styles */
    .secondary-nav-btn {
        background: transparent;
        color: var(--secondary-btn-color, #FFFFFF);
        border: 2px solid var(--secondary-btn-border, #FFFFFF);
        padding: 0.75rem 1.5rem;
        border-radius: 8px;
        font-family: inherit;
        font-size: 0.95rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        text-decoration: none;
        display: inline-block;
    }

    .secondary-nav-btn:hover {
        background: var(--secondary-btn-hover-bg, rgba(0, 255, 156, 0.1));
        color: var(--secondary-btn-hover-color, #00FF9C);
        border-color: var(--secondary-btn-hover-border, #00FF9C);
        transform: translateY(-2px);
    }

    [data-theme="light"] .secondary-nav-btn {
        --secondary-btn-color: #00563B;
        --secondary-btn-border: #00563B;
        --secondary-btn-hover-bg: rgba(0, 86, 59, 0.05);
        --secondary-btn-hover-color: #00563B;
        --secondary-btn-hover-border: #00563B;
    }
`;
document.head.appendChild(style);
