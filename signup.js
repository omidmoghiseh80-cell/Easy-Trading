// Signup Form Management
class SignupForm {
    constructor() {
        this.form = document.getElementById('signupForm');
        this.submitBtn = document.getElementById('submitBtn');
        this.btnText = document.querySelector('.btn-text');
        this.btnLoading = document.getElementById('btnLoading');
        this.btnSuccess = document.getElementById('btnSuccess');
        this.formMessages = document.getElementById('formMessages');
        this.passwordToggle = document.getElementById('passwordToggle');
        this.passwordField = document.getElementById('password');
        this.confirmPasswordField = document.getElementById('confirmPassword');

        this.validationRules = {
            fullName: {
                required: true,
                minLength: 2,
                pattern: /^[\u0600-\u06FF\s]+$/, // Persian characters and spaces only
                message: 'نام کامل باید حداقل ۲ حرف باشد و فقط شامل حروف فارسی باشد'
            },
            username: {
                required: true,
                minLength: 3,
                maxLength: 20,
                pattern: /^[a-zA-Z0-9_]+$/,
                message: 'نام کاربری باید ۳-۲۰ کاراکتر و فقط شامل حروف انگلیسی، اعداد و زیرخط باشد'
            },
            phoneNumber: {
                required: true,
                pattern: /^(\+98|0)?9\d{9}$/,
                message: 'شماره تماس باید معتبر باشد (مثال: 09123456789)'
            },
            email: {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'لطفاً یک ایمیل معتبر وارد کنید'
            },
            password: {
                required: true,
                minLength: 8,
                message: 'رمز عبور باید حداقل ۸ کاراکتر باشد'
            },
            confirmPassword: {
                required: true,
                match: 'password',
                message: 'رمز عبور و تأیید آن باید یکسان باشند'
            },
            country: {
                required: true,
                message: 'لطفاً کشور خود را انتخاب کنید'
            },
            termsAccepted: {
                required: true,
                message: 'برای ثبت‌نام باید شرایط و قوانین را بپذیرید'
            }
        };

        this.init();
    }

    init() {
        // Add form submit event listener
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });

        // Add password toggle functionality
        if (this.passwordToggle) {
            this.passwordToggle.addEventListener('click', () => {
                this.togglePasswordVisibility();
            });
        }

        // Add input focus effects
        this.addInputFocusEffects();

        // Add real-time validation
        this.addRealTimeValidation();

        // Add password strength checker
        this.addPasswordStrengthChecker();
    }

    addInputFocusEffects() {
        const inputs = document.querySelectorAll('.form-input');

        inputs.forEach(input => {
            input.addEventListener('focus', (e) => {
                e.target.parentElement.classList.add('focused');
            });

            input.addEventListener('blur', (e) => {
                e.target.parentElement.classList.remove('focused');
                this.validateField(e.target.name);
            });
        });
    }

    addRealTimeValidation() {
        const inputs = document.querySelectorAll('.form-input');

        inputs.forEach(input => {
            input.addEventListener('input', (e) => {
                this.validateField(e.target.name);
            });
        });

        // Add checkbox validation
        const checkbox = document.getElementById('termsAccepted');
        if (checkbox) {
            checkbox.addEventListener('change', () => {
                this.validateField('termsAccepted');
            });
        }
    }

    addPasswordStrengthChecker() {
        if (this.passwordField) {
            this.passwordField.addEventListener('input', (e) => {
                this.checkPasswordStrength(e.target.value);
            });
        }
    }

    togglePasswordVisibility() {
        const isPassword = this.passwordField.type === 'password';
        this.passwordField.type = isPassword ? 'text' : 'password';

        // Toggle eye icon
        const eyeOpen = this.passwordToggle.querySelector('.eye-open');
        const eyeClosed = this.passwordToggle.querySelector('.eye-closed');

        if (isPassword) {
            eyeOpen.style.display = 'none';
            eyeClosed.style.display = 'block';
        } else {
            eyeOpen.style.display = 'block';
            eyeClosed.style.display = 'none';
        }
    }

    checkPasswordStrength(password) {
        const strengthMeter = document.getElementById('strengthFill');
        const strengthText = document.getElementById('strengthText');

        if (!password) {
            strengthMeter.style.width = '0%';
            strengthText.textContent = '';
            return;
        }

        let strength = 0;
        const checks = {
            length: password.length >= 8,
            lowercase: /[a-z]/.test(password),
            uppercase: /[A-Z]/.test(password),
            numbers: /\d/.test(password),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
        };

        strength = Object.values(checks).filter(Boolean).length;

        const strengthPercentages = [0, 20, 40, 60, 80, 100];
        const strengthLabels = ['', 'خیلی ضعیف', 'ضعیف', 'متوسط', 'قوی', 'خیلی قوی'];
        const strengthColors = ['', '#ff6b6b', '#ffa500', '#ffd700', '#32cd32', '#00ff7f'];

        strengthMeter.style.width = `${strengthPercentages[strength]}%`;
        strengthMeter.style.backgroundColor = strengthColors[strength];
        strengthText.textContent = strengthLabels[strength];
        strengthText.style.color = strengthColors[strength];
    }

    validateField(fieldName) {
        const field = document.getElementById(fieldName);
        const feedback = document.getElementById(`${fieldName}Feedback`);
        const value = field ? field.value.trim() : '';

        // Clear previous feedback
        this.clearFieldFeedback(fieldName);

        const rules = this.validationRules[fieldName];
        if (!rules) return true;

        let isValid = true;
        let message = '';

        // Check required
        if (rules.required && !value) {
            isValid = false;
            message = 'این فیلد الزامی است';
        }
        // Check minimum length
        else if (value && rules.minLength && value.length < rules.minLength) {
            isValid = false;
            message = rules.message || `حداقل ${rules.minLength} کاراکتر لازم است`;
        }
        // Check maximum length
        else if (value && rules.maxLength && value.length > rules.maxLength) {
            isValid = false;
            message = rules.message || `حداکثر ${rules.maxLength} کاراکتر مجاز است`;
        }
        // Check pattern
        else if (value && rules.pattern && !rules.pattern.test(value)) {
            isValid = false;
            message = rules.message || 'فرمت وارد شده صحیح نیست';
        }
        // Check password match
        else if (fieldName === 'confirmPassword' && value) {
            const password = document.getElementById('password').value;
            if (value !== password) {
                isValid = false;
                message = 'رمز عبور و تأیید آن باید یکسان باشند';
            }
        }
        // Check terms acceptance
        else if (fieldName === 'termsAccepted') {
            const checkbox = document.getElementById('termsAccepted');
            if (!checkbox.checked) {
                isValid = false;
                message = rules.message;
            }
        }

        if (!isValid) {
            this.showFieldError(fieldName, message);
        } else {
            this.showFieldSuccess(fieldName);
        }

        return isValid;
    }

    validateForm() {
        const fields = Object.keys(this.validationRules);
        let isFormValid = true;

        fields.forEach(fieldName => {
            if (!this.validateField(fieldName)) {
                isFormValid = false;
            }
        });

        return isFormValid;
    }

    showFieldError(fieldName, message) {
        const feedback = document.getElementById(`${fieldName}Feedback`);
        const fieldGroup = feedback?.parentElement;

        if (feedback) {
            feedback.textContent = message;
            feedback.className = 'form-feedback error';
            feedback.style.display = 'block';
        }

        if (fieldGroup) {
            fieldGroup.classList.add('error');
            fieldGroup.classList.remove('success');
        }
    }

    showFieldSuccess(fieldName) {
        const feedback = document.getElementById(`${fieldName}Feedback`);
        const fieldGroup = feedback?.parentElement;

        if (feedback) {
            feedback.textContent = '✓';
            feedback.className = 'form-feedback success';
            feedback.style.display = 'block';
        }

        if (fieldGroup) {
            fieldGroup.classList.add('success');
            fieldGroup.classList.remove('error');
        }
    }

    clearFieldFeedback(fieldName) {
        const feedback = document.getElementById(`${fieldName}Feedback`);
        const fieldGroup = feedback?.parentElement;

        if (feedback) {
            feedback.textContent = '';
            feedback.className = 'form-feedback';
            feedback.style.display = 'none';
        }

        if (fieldGroup) {
            fieldGroup.classList.remove('error', 'success');
        }
    }

    clearAllFeedback() {
        const feedbacks = document.querySelectorAll('.form-feedback');
        feedbacks.forEach(feedback => {
            feedback.textContent = '';
            feedback.className = 'form-feedback';
            feedback.style.display = 'none';
            feedback.parentElement.classList.remove('error', 'success');
        });
    }

    async handleSubmit() {
        // Clear previous messages
        this.clearFormMessages();

        // Validate form
        if (!this.validateForm()) {
            this.showFormMessage('لطفاً تمام فیلدهای لازم را به درستی تکمیل کنید', 'error');
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
                this.clearAllFeedback();
                this.resetPasswordStrength();
            }, 3000);

        } catch (error) {
            // Show error state
            this.showErrorState();
            this.showFormMessage('خطایی در ثبت‌نام رخ داد. لطفاً دوباره تلاش کنید', 'error');
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
            }, 2500);
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

        this.showFormMessage('ثبت‌نام شما با موفقیت انجام شد! به خانواده Easy Trading خوش آمدید.', 'success');
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

    resetPasswordStrength() {
        const strengthFill = document.getElementById('strengthFill');
        const strengthText = document.getElementById('strengthText');

        if (strengthFill) strengthFill.style.width = '0%';
        if (strengthText) strengthText.textContent = '';
    }

    showFormMessage(message, type) {
        this.formMessages.textContent = message;
        this.formMessages.className = `form-message ${type}`;
        this.formMessages.style.display = 'block';

        // Fade out message after delay
        setTimeout(() => {
            this.formMessages.style.display = 'none';
        }, 6000);
    }

    clearFormMessages() {
        this.formMessages.textContent = '';
        this.formMessages.className = 'form-messages';
        this.formMessages.style.display = 'none';
    }
}

// Signup Page Animations
class SignupAnimations {
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

        // Add floating animation to signup icon
        this.addFloatingAnimation();

        // Add form field animations
        this.addFormAnimations();

        // Add benefits animation
        this.addBenefitsAnimation();
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
        document.querySelectorAll('.signup-hero, .signup-form-card, .signup-benefits-panel').forEach(el => {
            observer.observe(el);
        });
    }

    addFloatingAnimation() {
        const signupIcon = document.querySelector('.hero-signup-icon');
        if (signupIcon) {
            let floatDirection = 1;
            setInterval(() => {
                signupIcon.style.transform = `translateY(${floatDirection * 10}px) scale(${1 + floatDirection * 0.05})`;
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

    addBenefitsAnimation() {
        const benefitItems = document.querySelectorAll('.benefit-item');

        benefitItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.2}s`;

            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateX(10px) scale(1.02)';
            });

            item.addEventListener('mouseleave', () => {
                item.style.transform = '';
            });
        });
    }
}

// Theme Integration for Signup Page
class SignupThemeManager {
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

// Signup Benefits Interactions
class SignupBenefitsInteractions {
    constructor() {
        this.benefitItems = document.querySelectorAll('.benefit-item');
        this.init();
    }

    init() {
        this.benefitItems.forEach(item => {
            item.addEventListener('mouseenter', (e) => {
                this.handleBenefitHover(e.target, true);
            });

            item.addEventListener('mouseleave', (e) => {
                this.handleBenefitHover(e.target, false);
            });
        });
    }

    handleBenefitHover(item, isEntering) {
        if (isEntering) {
            item.style.transform = 'translateY(-5px) scale(1.05)';
        } else {
            item.style.transform = '';
        }
    }
}

// Mobile Responsiveness for Signup Page
class SignupMobileHandler {
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
        const signupContent = document.querySelector('.signup-content');

        if (window.innerWidth <= 768) {
            signupContent.classList.add('mobile');
        } else {
            signupContent.classList.remove('mobile');
        }
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize signup functionality
    const signupForm = new SignupForm();
    const signupAnimations = new SignupAnimations();
    const signupThemeManager = new SignupThemeManager();
    const signupBenefitsInteractions = new SignupBenefitsInteractions();
    const signupMobileHandler = new SignupMobileHandler();

    // Add loading animation
    document.body.classList.add('loaded');

    console.log('Easy Trading signup page initialized successfully!');
});

// Add CSS for smooth theme transitions and animations
const style = document.createElement('style');
style.textContent = `
    /* Signup Page Styles */
    .signup-hero {
        min-height: 40vh;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        overflow: hidden;
    }

    .signup-hero-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
        text-align: center;
        width: 100%;
    }

    .signup-hero-content {
        z-index: 2;
        position: relative;
    }

    .signup-hero-title {
        font-size: 2.5rem;
        font-weight: 700;
        color: var(--signup-hero-title-color, #FFFFFF);
        margin-bottom: 1rem;
        letter-spacing: -0.02em;
    }

    .signup-hero-subtitle {
        font-size: 1.2rem;
        color: var(--signup-hero-subtitle-color, #BEBEBE);
        opacity: 0.9;
        margin-bottom: 2rem;
    }

    .signup-hero-visual {
        margin-top: 2rem;
    }

    .hero-signup-icon {
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

    .hero-signup-icon svg {
        width: 40px;
        height: 40px;
    }

    /* Signup Section */
    .signup-section {
        padding: 4rem 2rem;
        min-height: 60vh;
    }

    .signup-container {
        max-width: 1200px;
        margin: 0 auto;
    }

    .signup-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 4rem;
        align-items: start;
    }

    /* Signup Form */
    .signup-form-card {
        background: var(--signup-form-bg, rgba(31, 31, 31, 0.9));
        border-radius: 12px;
        padding: 2.5rem;
        backdrop-filter: blur(10px);
        border: 1px solid var(--signup-form-border, rgba(255, 255, 255, 0.1));
        position: relative;
        overflow: hidden;
    }

    .signup-form-header {
        text-align: center;
        margin-bottom: 2rem;
    }

    .signup-form-title {
        font-size: 1.8rem;
        font-weight: 600;
        color: var(--signup-form-title-color, #FFFFFF);
        margin-bottom: 0.5rem;
    }

    .signup-form-subtitle {
        font-size: 0.9rem;
        color: var(--signup-form-subtitle-color, #BEBEBE);
        opacity: 0.8;
    }

    .signup-form {
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

    .form-feedback {
        display: none;
        font-size: 0.85rem;
        margin-top: 0.25rem;
        padding-left: 0.5rem;
    }

    .form-feedback.success {
        color: var(--success-color, #00FF9C);
    }

    .form-feedback.error {
        color: var(--error-color, #FF6B6B);
    }

    .form-group.error .form-input {
        border-color: var(--form-error-border, #FF6B6B);
    }

    .form-group.success .form-input {
        border-color: var(--form-success-border, #00FF9C);
    }

    .form-group.focused .label-icon {
        color: var(--form-focus-icon-color, #00FF9C);
    }

    .form-hint {
        display: block;
        font-size: 0.8rem;
        color: var(--form-hint-color, #888888);
        margin-top: 0.25rem;
        padding-left: 0.5rem;
    }

    /* Password Input Container */
    .password-input-container {
        position: relative;
    }

    .password-toggle {
        position: absolute;
        left: 1rem;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        color: var(--password-toggle-color, #666666);
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 4px;
        transition: all 0.3s ease;
    }

    .password-toggle:hover {
        color: var(--password-toggle-hover, #00FF9C);
        background: var(--password-toggle-hover-bg, rgba(0, 255, 156, 0.1));
    }

    .eye-icon {
        width: 18px;
        height: 18px;
    }

    .eye-closed {
        display: none;
    }

    /* Password Strength */
    .password-strength {
        margin-top: 0.5rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .strength-meter {
        flex: 1;
        height: 4px;
        background: var(--strength-meter-bg, rgba(255, 255, 255, 0.2));
        border-radius: 2px;
        overflow: hidden;
    }

    .strength-fill {
        height: 100%;
        width: 0%;
        transition: all 0.3s ease;
        border-radius: 2px;
    }

    .strength-text {
        font-size: 0.8rem;
        font-weight: 500;
        min-width: 60px;
    }

    /* Checkbox Group */
    .checkbox-group {
        margin-top: 1rem;
    }

    .checkbox-label {
        display: flex;
        align-items: flex-start;
        gap: 0.75rem;
        cursor: pointer;
        font-size: 0.95rem;
        line-height: 1.4;
    }

    .checkbox-label input[type="checkbox"] {
        display: none;
    }

    .checkbox-custom {
        width: 20px;
        height: 20px;
        border: 2px solid var(--checkbox-border, rgba(255, 255, 255, 0.3));
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        flex-shrink: 0;
        margin-top: 0.1rem;
    }

    .checkbox-label input[type="checkbox"]:checked + .checkbox-custom {
        background: var(--checkbox-checked-bg, #00FF9C);
        border-color: var(--checkbox-checked-border, #00FF9C);
    }

    .checkbox-label input[type="checkbox"]:checked + .checkbox-custom::after {
        content: '✓';
        color: white;
        font-size: 12px;
        font-weight: bold;
    }

    .checkbox-text {
        color: var(--checkbox-text-color, #FFFFFF);
    }

    .terms-link {
        color: var(--terms-link-color, #00FF9C);
        text-decoration: none;
        transition: all 0.3s ease;
    }

    .terms-link:hover {
        color: var(--terms-link-hover, #FFFFFF);
        text-decoration: underline;
    }

    /* Submit Button */
    .signup-submit-btn {
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

    .signup-submit-btn:hover:not(:disabled) {
        background: var(--submit-btn-hover-bg, #00563B);
        transform: translateY(-2px);
        box-shadow: 0 0 20px var(--submit-btn-hover-shadow, rgba(0, 255, 156, 0.4));
    }

    .signup-submit-btn:disabled {
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

    /* Login Link */
    .signup-login-link {
        text-align: center;
        margin-top: 1.5rem;
        padding-top: 1.5rem;
        border-top: 1px solid var(--login-link-border, rgba(255, 255, 255, 0.1));
    }

    .signup-login-link p {
        color: var(--login-link-color, #BEBEBE);
        margin: 0;
        font-size: 0.95rem;
    }

    .login-link {
        color: var(--login-link-color, #00FF9C);
        text-decoration: none;
        font-weight: 600;
        transition: all 0.3s ease;
    }

    .login-link:hover {
        color: var(--login-link-hover, #FFFFFF);
        text-decoration: underline;
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

    /* Signup Benefits Panel */
    .signup-benefits-panel {
        background: var(--signup-benefits-bg, rgba(31, 31, 31, 0.9));
        border-radius: 12px;
        padding: 2.5rem;
        backdrop-filter: blur(10px);
        border: 1px solid var(--signup-benefits-border, rgba(255, 255, 255, 0.1));
        height: fit-content;
        position: sticky;
        top: 120px;
    }

    .benefits-header {
        margin-bottom: 2rem;
    }

    .benefits-title {
        font-size: 1.5rem;
        font-weight: 600;
        color: var(--benefits-title-color, #FFFFFF);
        margin-bottom: 0.5rem;
    }

    .benefits-subtitle {
        font-size: 0.9rem;
        color: var(--benefits-subtitle-color, #BEBEBE);
        opacity: 0.8;
    }

    .benefits-list {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .benefit-item {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        padding: 1rem;
        border-radius: 8px;
        transition: all 0.3s ease;
        background: var(--benefit-item-bg, rgba(255, 255, 255, 0.02));
    }

    .benefit-item:hover {
        background: var(--benefit-item-hover-bg, rgba(0, 255, 156, 0.05));
        transform: translateY(-5px) scale(1.02);
    }

    .benefit-icon {
        width: 24px;
        height: 24px;
        color: var(--benefit-icon-color, #00563B);
        flex-shrink: 0;
        margin-top: 0.1rem;
    }

    .benefit-icon svg {
        width: 100%;
        height: 100%;
    }

    .benefit-content {
        flex: 1;
    }

    .benefit-content h4 {
        font-size: 0.9rem;
        font-weight: 600;
        color: var(--benefit-title-color, #FFFFFF);
        margin-bottom: 0.25rem;
    }

    .benefit-content p {
        font-size: 0.85rem;
        color: var(--benefit-text-color, #BEBEBE);
        line-height: 1.4;
        opacity: 0.9;
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

    /* Theme Variables for Signup Page */
    [data-theme="dark"] {
        --signup-hero-title-color: #FFFFFF;
        --signup-hero-subtitle-color: #BEBEBE;
        --hero-icon-bg: rgba(0, 86, 59, 0.1);
        --hero-icon-color: #00563B;
        --signup-form-bg: rgba(31, 31, 31, 0.9);
        --signup-form-border: rgba(255, 255, 255, 0.1);
        --signup-form-title-color: #FFFFFF;
        --signup-form-subtitle-color: #BEBEBE;
        --form-label-color: #FFFFFF;
        --label-icon-color: #00563B;
        --form-input-bg: rgba(255, 255, 255, 0.05);
        --form-input-border: rgba(255, 255, 255, 0.1);
        --form-input-color: #FFFFFF;
        --form-input-focus-border: #00FF9C;
        --form-input-focus-shadow: rgba(0, 255, 156, 0.1);
        --form-input-focus-bg: rgba(255, 255, 255, 0.1);
        --form-focus-icon-color: #00FF9C;
        --form-hint-color: #888888;
        --password-toggle-color: #666666;
        --password-toggle-hover: #00FF9C;
        --password-toggle-hover-bg: rgba(0, 255, 156, 0.1);
        --checkbox-border: rgba(255, 255, 255, 0.3);
        --checkbox-checked-bg: #00FF9C;
        --checkbox-checked-border: #00FF9C;
        --checkbox-text-color: #FFFFFF;
        --terms-link-color: #00FF9C;
        --terms-link-hover: #FFFFFF;
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
        --login-link-border: rgba(255, 255, 255, 0.1);
        --login-link-color: #00FF9C;
        --login-link-hover: #FFFFFF;
        --signup-benefits-bg: rgba(31, 31, 31, 0.9);
        --signup-benefits-border: rgba(255, 255, 255, 0.1);
        --benefits-title-color: #FFFFFF;
        --benefits-subtitle-color: #BEBEBE;
        --benefit-item-bg: rgba(255, 255, 255, 0.02);
        --benefit-item-hover-bg: rgba(0, 255, 156, 0.05);
        --benefit-icon-color: #00563B;
        --benefit-title-color: #FFFFFF;
        --benefit-text-color: #BEBEBE;
        --strength-meter-bg: rgba(255, 255, 255, 0.2);
    }

    [data-theme="light"] {
        --signup-hero-title-color: #00563B;
        --signup-hero-subtitle-color: #444444;
        --hero-icon-bg: rgba(0, 86, 59, 0.05);
        --hero-icon-color: #00563B;
        --signup-form-bg: rgba(245, 248, 246, 0.9);
        --signup-form-border: rgba(0, 86, 59, 0.1);
        --signup-form-title-color: #00563B;
        --signup-form-subtitle-color: #666666;
        --form-label-color: #00563B;
        --label-icon-color: #00563B;
        --form-input-bg: rgba(0, 86, 59, 0.02);
        --form-input-border: rgba(0, 86, 59, 0.1);
        --form-input-color: #000000;
        --form-input-focus-border: #00563B;
        --form-input-focus-shadow: rgba(0, 86, 59, 0.1);
        --form-input-focus-bg: rgba(245, 248, 246, 0.9);
        --form-focus-icon-color: #00563B;
        --form-hint-color: #666666;
        --password-toggle-color: #666666;
        --password-toggle-hover: #00563B;
        --password-toggle-hover-bg: rgba(0, 86, 59, 0.05);
        --checkbox-border: rgba(0, 86, 59, 0.3);
        --checkbox-checked-bg: #00563B;
        --checkbox-checked-border: #00563B;
        --checkbox-text-color: #00563B;
        --terms-link-color: #00563B;
        --terms-link-hover: #00563B;
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
        --login-link-border: rgba(0, 86, 59, 0.1);
        --login-link-color: #00563B;
        --login-link-hover: #00563B;
        --signup-benefits-bg: rgba(245, 248, 246, 0.9);
        --signup-benefits-border: rgba(0, 86, 59, 0.1);
        --benefits-title-color: #00563B;
        --benefits-subtitle-color: #666666;
        --benefit-item-bg: rgba(0, 86, 59, 0.02);
        --benefit-item-hover-bg: rgba(0, 86, 59, 0.05);
        --benefit-icon-color: #00563B;
        --benefit-title-color: #00563B;
        --benefit-text-color: #444444;
        --strength-meter-bg: rgba(0, 86, 59, 0.2);
    }

    /* Responsive Design */
    @media (max-width: 768px) {
        .signup-hero {
            min-height: 30vh;
        }

        .signup-hero-container {
            padding: 1.5rem 1rem;
        }

        .signup-hero-title {
            font-size: 2rem;
        }

        .signup-hero-subtitle {
            font-size: 1rem;
        }

        .hero-signup-icon {
            width: 60px;
            height: 60px;
        }

        .hero-signup-icon svg {
            width: 30px;
            height: 30px;
        }

        .signup-section {
            padding: 2rem 1rem;
        }

        .signup-content {
            grid-template-columns: 1fr;
            gap: 2rem;
        }

        .signup-form-card,
        .signup-benefits-panel {
            padding: 2rem 1.5rem;
        }

        .signup-benefits-panel {
            position: static;
        }

        .form-input {
            padding: 0.875rem 1rem;
        }

        .signup-submit-btn {
            padding: 1.2rem 2rem;
        }
    }

    @media (max-width: 480px) {
        .signup-hero-title {
            font-size: 1.8rem;
        }

        .signup-hero-subtitle {
            font-size: 0.95rem;
        }

        .signup-form-card,
        .signup-benefits-panel {
            padding: 1.5rem 1rem;
        }

        .signup-form-title {
            font-size: 1.5rem;
        }

        .form-label {
            font-size: 0.9rem;
        }

        .form-input {
            font-size: 0.9rem;
        }

        .signup-submit-btn {
            font-size: 0.9rem;
            padding: 1rem 1.5rem;
        }

        .benefit-item {
            padding: 0.75rem;
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

    /* Brand Link */
    .brand-link {
        text-decoration: none;
        color: inherit;
        transition: all 0.3s ease;
    }

    .brand-link:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(style);
