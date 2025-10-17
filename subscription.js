class SubscriptionPage {
    constructor() {
        this.planButtons = document.querySelectorAll('.btn-plan');
        this.cards = document.querySelectorAll('.subscription-card');
        this.paymentModal = new bootstrap.Modal(document.getElementById('paymentModal'));
        this.successModal = new bootstrap.Modal(document.getElementById('successModal'));
        this.selectedPlan = null;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.addCardInteractions();
        this.setupPaymentModal();
    }
    
    setupEventListeners() {
        // Plan button clicks
        this.planButtons.forEach(button => {
            button.addEventListener('click', (e) => this.handlePlanSelection(e));
        });
        
        // Card hover effects
        this.cards.forEach(card => {
            card.addEventListener('mouseenter', () => this.handleCardHover(card));
            card.addEventListener('mouseleave', () => this.handleCardLeave(card));
        });
    }
    
    addCardInteractions() {
        // Add click interaction for entire cards
        this.cards.forEach(card => {
            card.addEventListener('click', (e) => {
                // Don't trigger if clicking the button
                if (!e.target.closest('.btn-plan')) {
                    this.selectCard(card);
                }
            });
        });
    }
    
    handleCardHover(card) {
        // Add subtle scale effect on hover
        if (!card.classList.contains('featured')) {
            card.style.transform = 'translateY(-8px)';
        }
    }
    
    handleCardLeave(card) {
        // Reset transform
        if (!card.classList.contains('featured')) {
            card.style.transform = '';
        }
    }
    
    selectCard(card) {
        // Remove previous selections
        this.cards.forEach(c => c.classList.remove('selected'));
        
        // Add selection to clicked card
        card.classList.add('selected');
        
        // Trigger the plan button
        const button = card.querySelector('.btn-plan');
        if (button) {
            this.handlePlanSelection({ target: button });
        }
    }
    
    async handlePlanSelection(e) {
        const button = e.target;
        const card = button.closest('.subscription-card');
        const planName = card.querySelector('.plan-name').textContent;
        const price = card.querySelector('.price').textContent;
        
        // Store selected plan information
        this.selectedPlan = {
            name: planName,
            price: price,
            events: this.getEventsCount(card)
        };
        
        // Show payment modal instead of redirecting
        this.paymentModal.show();
    }
    
    getEventsCount(card) {
        const eventsText = card.querySelector('.features-text').textContent;
        return eventsText.match(/\d+/)[0];
    }
    
    async selectPlan(planData) {
        // Simulate API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate random success/failure for demo
                if (Math.random() > 0.05) { // 95% success rate
                    resolve({ success: true, planData });
                } else {
                    reject(new Error('Server error'));
                }
            }, 1500);
        });
    }
    
    setLoadingState(button, isLoading) {
        if (isLoading) {
            button.classList.add('loading');
            button.disabled = true;
            button.setAttribute('data-original-text', button.textContent);
            button.textContent = '';
        } else {
            button.classList.remove('loading');
            button.disabled = false;
            button.textContent = button.getAttribute('data-original-text') || 'Continue';
        }
    }
    
    showMessage(message, type = 'info') {
        // Remove existing message
        const existingMessage = document.querySelector('.alert-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create new message
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type === 'error' ? 'danger' : type === 'success' ? 'success' : 'info'} alert-message position-fixed`;
        alertDiv.style.cssText = `
            top: 20px;
            right: 20px;
            z-index: 9999;
            min-width: 300px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        `;
        alertDiv.textContent = message;
        
        // Insert message
        document.body.appendChild(alertDiv);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.style.opacity = '0';
                alertDiv.style.transform = 'translateX(100%)';
                setTimeout(() => alertDiv.remove(), 300);
            }
        }, 5000);
        
        // Add close button
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '&times;';
        closeBtn.className = 'btn-close';
        closeBtn.style.cssText = 'position: absolute; top: 8px; right: 8px; background: none; border: none; font-size: 1.2rem; cursor: pointer;';
        closeBtn.addEventListener('click', () => alertDiv.remove());
        alertDiv.appendChild(closeBtn);
    }
    
    setupPaymentModal() {
        // Payment method radio button handlers
        const paymentMethodRadios = document.querySelectorAll('input[name="paymentMethod"]');
        const cardForm = document.getElementById('cardForm');
        const paypalForm = document.getElementById('paypalForm');
        
        paymentMethodRadios.forEach(radio => {
            radio.addEventListener('change', () => {
                if (radio.value === 'card') {
                    cardForm.style.display = 'block';
                    paypalForm.style.display = 'none';
                } else if (radio.value === 'paypal') {
                    cardForm.style.display = 'none';
                    paypalForm.style.display = 'block';
                }
            });
        });
        
        // Card number formatting
        const cardNumberInput = document.getElementById('cardNumber');
        cardNumberInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
            e.target.value = value;
        });
        
        // Calendar functionality for expiry month
        this.setupCalendar();
        
        // Expiry year validation
        const expiryYearInput = document.getElementById('expiryYear');
        expiryYearInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            e.target.value = value;
        });
        
        // Payment button handlers
        document.getElementById('cardPayButton').addEventListener('click', () => {
            this.processCardPayment();
        });
        
        document.getElementById('paypalPayButton').addEventListener('click', () => {
            this.processPaypalPayment();
        });
        
        // Success modal continue button
        document.getElementById('successContinueBtn').addEventListener('click', () => {
            this.successModal.hide();
            // Redirect to sign in page
            window.location.href = 'signin.html';
        });
    }
    
    async processCardPayment() {
        const cardData = {
            cardNumber: document.getElementById('cardNumber').value,
            expiryMonth: document.getElementById('expiryMonth').value,
            expiryYear: document.getElementById('expiryYear').value,
            country: document.getElementById('country').value,
            zipcode: document.getElementById('zipcode').value
        };
        
        // Validate card data
        if (!this.validateCardData(cardData)) {
            return;
        }
        
        const payButton = document.getElementById('cardPayButton');
        this.setLoadingState(payButton, true);
        
        try {
            // Simulate payment processing
            await this.processPayment({
                method: 'card',
                plan: this.selectedPlan,
                paymentData: cardData
            });
            
            // Hide payment modal and show success modal
            this.paymentModal.hide();
            setTimeout(() => {
                this.successModal.show();
            }, 300);
            
        } catch (error) {
            this.showMessage('Payment failed. Please check your card details and try again.', 'error');
        } finally {
            this.setLoadingState(payButton, false);
        }
    }
    
    async processPaypalPayment() {
        const paypalEmail = document.getElementById('paypalEmail').value;
        
        if (!paypalEmail || !this.isValidEmail(paypalEmail)) {
            this.showMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        const payButton = document.getElementById('paypalPayButton');
        this.setLoadingState(payButton, true);
        
        try {
            // Simulate PayPal payment processing
            await this.processPayment({
                method: 'paypal',
                plan: this.selectedPlan,
                paymentData: { email: paypalEmail }
            });
            
            // Hide payment modal and show success modal
            this.paymentModal.hide();
            setTimeout(() => {
                this.successModal.show();
            }, 300);
            
        } catch (error) {
            this.showMessage('Payment failed. Please try again.', 'error');
        } finally {
            this.setLoadingState(payButton, false);
        }
    }
    
    validateCardData(cardData) {
        if (!cardData.cardNumber || cardData.cardNumber.replace(/\s/g, '').length < 13) {
            this.showMessage('Please enter a valid card number.', 'error');
            return false;
        }
        
        if (!cardData.expiryMonth || cardData.expiryMonth.length !== 2) {
            this.showMessage('Please enter a valid expiry month.', 'error');
            return false;
        }
        
        if (!cardData.expiryYear || cardData.expiryYear.length !== 4) {
            this.showMessage('Please enter a valid expiry year.', 'error');
            return false;
        }
        
        if (!cardData.country || cardData.country.length < 2) {
            this.showMessage('Please enter your country.', 'error');
            return false;
        }
        
        if (!cardData.zipcode || cardData.zipcode.length < 3) {
            this.showMessage('Please enter a valid zipcode.', 'error');
            return false;
        }
        
        return true;
    }
    
    async processPayment(paymentData) {
        // Simulate payment processing
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate random success/failure for demo
                if (Math.random() > 0.1) { // 90% success rate
                    resolve({ success: true, transactionId: 'TXN' + Date.now() });
                } else {
                    reject(new Error('Payment processing failed'));
                }
            }, 2000);
        });
    }
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    setupCalendar() {
        const calendarTrigger = document.querySelector('.calendar-trigger');
        const monthCalendar = document.getElementById('monthCalendar');
        const expiryMonthInput = document.getElementById('expiryMonth');
        const expiryYearInput = document.getElementById('expiryYear');
        const calendarYear = document.getElementById('calendarYear');
        const prevYearBtn = document.getElementById('prevYear');
        const nextYearBtn = document.getElementById('nextYear');
        const monthItems = document.querySelectorAll('.month-item');
        
        let currentYear = new Date().getFullYear();
        calendarYear.textContent = currentYear;
        
        // Show/hide calendar
        calendarTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            const isVisible = monthCalendar.style.display === 'block';
            monthCalendar.style.display = isVisible ? 'none' : 'block';
        });
        
        // Close calendar when clicking outside
        document.addEventListener('click', (e) => {
            if (!monthCalendar.contains(e.target) && !calendarTrigger.contains(e.target)) {
                monthCalendar.style.display = 'none';
            }
        });
        
        // Year navigation
        prevYearBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const minYear = new Date().getFullYear();
            if (currentYear > minYear) {
                currentYear--;
                calendarYear.textContent = currentYear;
            }
        });
        
        nextYearBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const maxYear = new Date().getFullYear() + 20;
            if (currentYear < maxYear) {
                currentYear++;
                calendarYear.textContent = currentYear;
            }
        });
        
        // Month selection
        monthItems.forEach(monthItem => {
            monthItem.addEventListener('click', (e) => {
                e.stopPropagation();
                
                // Remove previous selection
                monthItems.forEach(item => item.classList.remove('selected'));
                
                // Add selection to clicked month
                monthItem.classList.add('selected');
                
                // Update input values
                const selectedMonth = monthItem.dataset.month;
                expiryMonthInput.value = selectedMonth;
                expiryYearInput.value = currentYear.toString();
                
                // Hide calendar
                monthCalendar.style.display = 'none';
            });
        });
        
        // Highlight current month
        const currentMonth = new Date().getMonth() + 1;
        const currentMonthStr = currentMonth.toString().padStart(2, '0');
        monthItems.forEach(monthItem => {
            if (monthItem.dataset.month === currentMonthStr) {
                monthItem.classList.add('current');
            }
        });
    }
    
    // Utility method to highlight featured plan
    highlightFeaturedPlan() {
        const proCard = document.querySelector('.pro-card');
        if (proCard) {
            // Add pulse animation to featured plan
            setInterval(() => {
                proCard.style.boxShadow = '0 12px 35px rgba(184, 92, 79, 0.3)';
                setTimeout(() => {
                    proCard.style.boxShadow = '';
                }, 1000);
            }, 5000);
        }
    }
}

// Initialize the subscription page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const subscriptionPage = new SubscriptionPage();
    
    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Add entrance animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all cards for animation
    document.querySelectorAll('.subscription-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Additional utility functions
function debounce(func, wait) {
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

// Handle window resize for responsive adjustments
window.addEventListener('resize', debounce(() => {
    // Adjust card layouts if needed
    const cards = document.querySelectorAll('.subscription-card');
    cards.forEach(card => {
        if (window.innerWidth <= 991) {
            card.classList.remove('featured');
        } else {
            const proCard = document.querySelector('.pro-card');
            if (proCard && card === proCard) {
                card.classList.add('featured');
            }
        }
    });
}, 250));