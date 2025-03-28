document.addEventListener('DOMContentLoaded', function() {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');
    const signupForm = document.getElementById('signupForm');
    const loginForm = document.getElementById('loginForm');
    const forgotPassword = document.getElementById('forgotPassword');
    const captchaText = document.getElementById('captchaText');
    const refreshCaptcha = document.getElementById('refreshCaptcha');
    const captchaInput = document.getElementById('captchaInput');

    // Generate CAPTCHA
    function generateCaptcha() {
        const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        let captcha = "";
        for (let i = 0; i < 6; i++) {
            captcha += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        captchaText.textContent = captcha;
        return captcha;
    }

    let currentCaptcha = generateCaptcha();

    // Refresh CAPTCHA
    refreshCaptcha.addEventListener('click', function() {
        currentCaptcha = generateCaptcha();
        captchaInput.value = "";
    });

    // Toggle between sign-in and sign-up forms
    signUpButton.addEventListener('click', () => {
        container.classList.add('right-panel-active');
    });

    signInButton.addEventListener('click', () => {
        container.classList.remove('right-panel-active');
    });

    // Form validation for signup
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        clearAllErrors();

        const name = document.getElementById('signupName').value.trim();
        const email = document.getElementById('signupEmail').value.trim();
        const password = document.getElementById('signupPassword').value.trim();
        let isValid = true;

        // Name validation
        if (name === '') {
            showError('nameError', 'Name is required');
            isValid = false;
        } else if (name.length < 3) {
            showError('nameError', 'Name must be at least 3 characters');
            isValid = false;
        }

        // Email validation
        if (email === '') {
            showError('emailError', 'Email is required');
            isValid = false;
        } else if (!validateEmail(email)) {
            showError('emailError', 'Please enter a valid email');
            isValid = false;
        }

        // Password validation
        if (password === '') {
            showError('passwordError', 'Password is required');
            isValid = false;
        } else if (password.length < 6) {
            showError('passwordError', 'Password must be at least 6 characters');
            isValid = false;
        }

        if (isValid) {
            // Here you would typically send the data to your server
            alert('Sign up successful!');
            signupForm.reset();
            container.classList.remove('right-panel-active');
        }
    });

    // Form validation for login
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        clearAllErrors();

        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value.trim();
        const userCaptcha = captchaInput.value.trim();
        let isValid = true;

        // Email validation
        if (email === '') {
            showError('loginEmailError', 'Email is required');
            isValid = false;
        } else if (!validateEmail(email)) {
            showError('loginEmailError', 'Please enter a valid email');
            isValid = false;
        }

        // Password validation
        if (password === '') {
            showError('loginPasswordError', 'Password is required');
            isValid = false;
        }

        // CAPTCHA validation
        if (userCaptcha === '') {
            showError('captchaError', 'CAPTCHA is required');
            isValid = false;
        } else if (userCaptcha !== currentCaptcha) {
            showError('captchaError', 'CAPTCHA does not match');
            isValid = false;
        }

        if (isValid) {
            // Here you would typically send the data to your server
            alert('Login successful!');
            loginForm.reset();
            currentCaptcha = generateCaptcha();
        }
    });

    // Forgot password functionality
    forgotPassword.addEventListener('click', function(e) {
        e.preventDefault();
        const email = prompt('Please enter your email to reset password:');
        if (email && validateEmail(email)) {
            alert(`Password reset link has been sent to ${email}`);
        } else if (email) {
            alert('Please enter a valid email address');
        }
    });

    // Helper functions
    function showError(id, message) {
        const errorElement = document.getElementById(id);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }

    function clearAllErrors() {
        document.querySelectorAll('.error-message').forEach(el => {
            el.style.display = 'none';
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});