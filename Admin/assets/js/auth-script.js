// Authentication JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeAuth();
});

function initializeAuth() {
    // Get DOM elements
    const signUpForm = document.getElementById('signUpForm');
    const signInForm = document.getElementById('signInForm');
    const signInLink = document.getElementById('signInLink');
    const backToSignUp = document.getElementById('backToSignUp');
    const signInModal = document.getElementById('signInModal');
    const closeSignIn = document.getElementById('closeSignIn');
    const passwordToggles = document.querySelectorAll('.password-toggle');

    // Initialize event listeners
    initializeEventListeners();
    
    function initializeEventListeners() {
        // Form submissions
        signUpForm?.addEventListener('submit', handleSignUp);
        signInForm?.addEventListener('submit', handleSignIn);
        
        // Modal controls
        signInLink?.addEventListener('click', openSignInModal);
        backToSignUp?.addEventListener('click', closeSignInModal);
        closeSignIn?.addEventListener('click', closeSignInModal);
        
        // Password toggles
        passwordToggles.forEach(toggle => {
            toggle.addEventListener('click', togglePasswordVisibility);
        });
        
        // Close modal on outside click
        signInModal?.addEventListener('click', function(e) {
            if (e.target === signInModal) {
                closeSignInModal();
            }
        });
        
        // Escape key to close modal
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && signInModal?.classList.contains('active')) {
                closeSignInModal();
            }
        });
    }
    
    function handleSignUp(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const userData = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            companyName: formData.get('companyName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword')
        };
        
        // Validate form
        if (!validateSignUpForm(userData)) {
            return;
        }
        
        // Show loading state
        setLoadingState(e.target, true);
        
        // Simulate API call
        setTimeout(() => {
            setLoadingState(e.target, false);
            showSuccess('Account created successfully! Redirecting to dashboard...');
            
            // Store user data (in real app, this would be handled by backend)
            localStorage.setItem('currentUser', JSON.stringify({
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                companyName: userData.companyName
            }));
            
            // Redirect to main app after 2 seconds
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        }, 1500);
    }
    
    function handleSignIn(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const credentials = {
            email: formData.get('email'),
            password: formData.get('password')
        };
        
        // Validate form
        if (!validateSignInForm(credentials)) {
            return;
        }
        
        // Show loading state
        setLoadingState(e.target, true);
        
        // Simulate API call
        setTimeout(() => {
            setLoadingState(e.target, false);
            showSuccess('Welcome back! Redirecting to dashboard...');
            
            // Store user data (in real app, this would be handled by backend)
            localStorage.setItem('currentUser', JSON.stringify({
                firstName: 'John',
                lastName: 'Doe',
                email: credentials.email,
                companyName: 'Sample Company'
            }));
            
            closeSignInModal();
            
            // Redirect to main app after 1 second
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        }, 1500);
    }
    
    function validateSignUpForm(data) {
        // Clear previous errors
        clearErrors();
        
        const errors = [];
        
        // Required field validation
        if (!data.firstName.trim()) errors.push('First name is required');
        if (!data.lastName.trim()) errors.push('Last name is required');
        if (!data.companyName.trim()) errors.push('Company name is required');
        if (!data.email.trim()) errors.push('Email is required');
        if (!data.phone.trim()) errors.push('Phone number is required');
        if (!data.password) errors.push('Password is required');
        if (!data.confirmPassword) errors.push('Confirm password is required');
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (data.email && !emailRegex.test(data.email)) {
            errors.push('Please enter a valid email address');
        }
        
        // Password validation
        if (data.password && data.password.length < 6) {
            errors.push('Password must be at least 6 characters long');
        }
        
        // Password match validation
        if (data.password && data.confirmPassword && data.password !== data.confirmPassword) {
            errors.push('Passwords do not match');
        }
        
        // Phone validation
        const phoneRegex = /^\d{10,}$/;
        if (data.phone && !phoneRegex.test(data.phone.replace(/\D/g, ''))) {
            errors.push('Please enter a valid phone number');
        }
        
        if (errors.length > 0) {
            showError(errors.join('. '));
            return false;
        }
        
        return true;
    }
    
    function validateSignInForm(data) {
        // Clear previous errors
        clearErrors();
        
        const errors = [];
        
        // Required field validation
        if (!data.email.trim()) errors.push('Email is required');
        if (!data.password) errors.push('Password is required');
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (data.email && !emailRegex.test(data.email)) {
            errors.push('Please enter a valid email address');
        }
        
        if (errors.length > 0) {
            showError(errors.join('. '));
            return false;
        }
        
        return true;
    }
    
    function openSignInModal(e) {
        e.preventDefault();
        signInModal?.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeSignInModal(e) {
        if (e) e.preventDefault();
        signInModal?.classList.remove('active');
        document.body.style.overflow = '';
        signInForm?.reset();
        clearErrors();
    }
    
    function togglePasswordVisibility(e) {
        const target = e.currentTarget.dataset.target;
        const passwordInput = document.getElementById(target);
        const icon = e.currentTarget;
        
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    }
    
    function setLoadingState(form, isLoading) {
        const submitBtn = form.querySelector('.sign-up-btn');
        
        if (isLoading) {
            form.classList.add('loading');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Please wait...';
        } else {
            form.classList.remove('loading');
            submitBtn.disabled = false;
            submitBtn.textContent = form.id === 'signUpForm' ? 'Sign Up' : 'Sign In';
        }
    }
    
    function showSuccess(message) {
        // Remove existing messages
        clearMessages();
        
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message show';
        successDiv.textContent = message;
        
        // Insert before the first form
        const firstForm = document.querySelector('.auth-form');
        firstForm.parentNode.insertBefore(successDiv, firstForm);
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }
    
    function showError(message) {
        // Remove existing messages
        clearMessages();
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message show';
        errorDiv.textContent = message;
        
        // Insert before the first form
        const firstForm = document.querySelector('.auth-form');
        firstForm.parentNode.insertBefore(errorDiv, firstForm);
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }
    
    function clearErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.remove());
    }
    
    function clearMessages() {
        const messages = document.querySelectorAll('.success-message, .error-message');
        messages.forEach(msg => msg.remove());
    }
    
    // Auto-fill demo data for testing (remove in production)
    function fillDemoData() {
        if (window.location.search.includes('demo=true')) {
            document.getElementById('firstName').value = 'John';
            document.getElementById('lastName').value = 'Doe';
            document.getElementById('companyName').value = 'Demo Company';
            document.getElementById('email').value = 'john.doe@demo.com';
            document.getElementById('phone').value = '1234567890';
            document.getElementById('password').value = 'demo123';
            document.getElementById('confirmPassword').value = 'demo123';
        }
    }
    
    // Call demo data fill on load (for development)
    fillDemoData();
    
    console.log('Authentication system initialized');
}