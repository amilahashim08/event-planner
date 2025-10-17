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

// // Event Management Dashboard JavaScript

class EventDashboard {
    constructor() {
        this.currentDate = new Date();
        this.sidebarCollapsed = false;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.generateCalendar();
        this.initializeMobileHandlers();
    }

    setupEventListeners() {
        // Sidebar toggle functionality
        const sidebarToggle = document.getElementById('sidebarToggle');
        const sidebarToggleMain = document.getElementById('sidebarToggleMain');
        const sidebar = document.getElementById('sidebar');

        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => this.toggleSidebar());
        }

        if (sidebarToggleMain) {
            sidebarToggleMain.addEventListener('click', () => this.toggleMobileSidebar());
        }

        // Navigation link active state
        const navLinks = document.querySelectorAll('.sidebar .nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.setActiveNavLink(link);
            });
        });

        // Calendar navigation
        const prevBtn = document.getElementById('prevMonth');
        const nextBtn = document.getElementById('nextMonth');
        const todayBtn = document.getElementById('todayBtn');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previousMonth());
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextMonth());
        }

        if (todayBtn) {
            todayBtn.addEventListener('click', () => this.goToToday());
        }

        // Logout functionality
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleLogout();
            });
        }

        // Modal functionality
        const addAccessBtn = document.getElementById('addAccessBtn');
        if (addAccessBtn) {
            addAccessBtn.addEventListener('click', () => {
                this.handleAddAccess();
            });
        }

        // Checklist functionality
        const importTemplateBtn = document.getElementById('importTemplateBtn');
        if (importTemplateBtn) {
            importTemplateBtn.addEventListener('click', () => {
                this.showTemplateSelectionModal();
            });
        }

        const selectTemplateBtn = document.getElementById('selectTemplateBtn');
        if (selectTemplateBtn) {
            selectTemplateBtn.addEventListener('click', () => {
                this.handleTemplateSelection();
            });
        }

        const addChecklistBtn = document.getElementById('addChecklistBtn');
        if (addChecklistBtn) {
            addChecklistBtn.addEventListener('click', () => {
                this.showAddChecklistModal();
            });
        }

        const addChecklistSubmitBtn = document.getElementById('addChecklistSubmitBtn');
        if (addChecklistSubmitBtn) {
            addChecklistSubmitBtn.addEventListener('click', () => {
                this.handleAddChecklist();
            });
        }

        const addTaskSubmitBtn = document.getElementById('addTaskSubmitBtn');
        if (addTaskSubmitBtn) {
            addTaskSubmitBtn.addEventListener('click', () => {
                this.handleAddTask();
            });
        }

        // Template options
        const templateOptions = document.querySelectorAll('.template-option');
        templateOptions.forEach(option => {
            option.addEventListener('click', () => {
                this.selectTemplate(option);
            });
        });

        // Add task buttons
        const addTaskBtns = document.querySelectorAll('.add-task-btn');
        addTaskBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.showAddTaskModal(btn.dataset.category);
            });
        });

        // Guest management functionality
        const addGuestBtn = document.getElementById('addGuestBtn');
        if (addGuestBtn) {
            addGuestBtn.addEventListener('click', () => {
                this.showAddGuestModal();
            });
        }

        const addGuestSubmitBtn = document.getElementById('addGuestSubmitBtn');
        if (addGuestSubmitBtn) {
            addGuestSubmitBtn.addEventListener('click', () => {
                this.handleAddGuest();
            });
        }

        const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
        if (confirmDeleteBtn) {
            confirmDeleteBtn.addEventListener('click', () => {
                this.handleDeleteGuest();
            });
        }

        // Tab functionality
        const tabButtons = document.querySelectorAll('#eventTabs .nav-link');
        tabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.handleTabSwitch(e.target);
            });
        });

        // Checklist functionality
        const checkboxes = document.querySelectorAll('.checklist-item input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                this.handleChecklistChange(e.target);
            });
        });

        // Window resize handler
        window.addEventListener('resize', () => this.handleResize());
    }

    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.getElementById('mainContent');
        
        this.sidebarCollapsed = !this.sidebarCollapsed;
        
        if (this.sidebarCollapsed) {
            sidebar.classList.add('collapsed');
        } else {
            sidebar.classList.remove('collapsed');
        }
    }

    toggleMobileSidebar() {
        const sidebar = document.getElementById('sidebar');
        const overlay = this.getOrCreateOverlay();
        
        if (sidebar.classList.contains('show')) {
            sidebar.classList.remove('show');
            overlay.classList.remove('show');
            document.body.style.overflow = '';
        } else {
            sidebar.classList.add('show');
            overlay.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    }

    getOrCreateOverlay() {
        let overlay = document.querySelector('.sidebar-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'sidebar-overlay';
            overlay.addEventListener('click', () => this.toggleMobileSidebar());
            document.body.appendChild(overlay);
        }
        return overlay;
    }

    setActiveNavLink(activeLink) {
        // Remove active class from all nav links
        const navLinks = document.querySelectorAll('.sidebar .nav-link');
        navLinks.forEach(link => link.classList.remove('active'));
        
        // Add active class to clicked link
        activeLink.classList.add('active');
    }

    initializeMobileHandlers() {
        // Close mobile sidebar when clicking outside
        document.addEventListener('click', (e) => {
            const sidebar = document.getElementById('sidebar');
            const sidebarToggle = document.getElementById('sidebarToggleMain');
            
            if (window.innerWidth <= 768 && 
                sidebar.classList.contains('show') && 
                !sidebar.contains(e.target) && 
                !sidebarToggle.contains(e.target)) {
                this.toggleMobileSidebar();
            }
        });

        // Handle swipe gestures for mobile
        this.initializeSwipeGestures();
    }

    initializeSwipeGestures() {
        let startX = 0;
        let endX = 0;

        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        document.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            
            if (Math.abs(diff) > 50) { // Minimum swipe distance
                if (diff > 0 && startX < 50) {
                    // Swipe left from edge - close sidebar
                    const sidebar = document.getElementById('sidebar');
                    if (sidebar.classList.contains('show')) {
                        this.toggleMobileSidebar();
                    }
                } else if (diff < 0 && startX < 50) {
                    // Swipe right from edge - open sidebar
                    const sidebar = document.getElementById('sidebar');
                    if (!sidebar.classList.contains('show')) {
                        this.toggleMobileSidebar();
                    }
                }
            }
        });
    }

    generateCalendar() {
        const calendar = document.getElementById('calendar');
        if (!calendar) return;

        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        
        // Update calendar header
        const calendarHeader = document.querySelector('.calendar-header h5');
        if (calendarHeader) {
            const monthNames = [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ];
            calendarHeader.textContent = `${monthNames[month]} ${year}`;
        }

        // Create calendar grid
        const calendarGrid = document.createElement('div');
        calendarGrid.className = 'calendar-grid';

        // Add day headers
        const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        dayHeaders.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'calendar-header-day';
            dayHeader.textContent = day;
            calendarGrid.appendChild(dayHeader);
        });

        // Get first day of month and number of days
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysInPrevMonth = new Date(year, month, 0).getDate();

        // Add previous month's trailing days
        for (let i = firstDay - 1; i >= 0; i--) {
            const dayElement = this.createDayElement(daysInPrevMonth - i, true);
            calendarGrid.appendChild(dayElement);
        }

        // Add current month's days
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = this.createDayElement(day, false);
            
            // Add highlighting for specific dates (based on the image)
            if (month === 4 && year === 2025) { // May 2025
                if (day === 1) {
                    dayElement.classList.add('highlighted-purple');
                } else if (day === 10) {
                    dayElement.classList.add('highlighted-green');
                } else if (day === 15) {
                    dayElement.classList.add('highlighted-blue');
                } else if (day === 18) {
                    dayElement.classList.add('highlighted-pink');
                } else if (day === 21) {
                    dayElement.classList.add('today');
                }
            }
            
            // Mark today
            const today = new Date();
            if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                dayElement.classList.add('today');
            }
            
            calendarGrid.appendChild(dayElement);
        }

        // Add next month's leading days
        const totalCells = calendarGrid.children.length - 7; // Subtract header row
        const remainingCells = 42 - totalCells; // 6 rows * 7 days - current cells
        for (let day = 1; day <= remainingCells && remainingCells < 7; day++) {
            const dayElement = this.createDayElement(day, true);
            calendarGrid.appendChild(dayElement);
        }

        // Clear existing calendar and add new one
        calendar.innerHTML = '';
        calendar.appendChild(calendarGrid);
    }

    createDayElement(day, isOtherMonth) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;
        
        if (isOtherMonth) {
            dayElement.classList.add('other-month');
        }
        
        dayElement.addEventListener('click', () => {
            this.selectDate(day, isOtherMonth);
        });
        
        return dayElement;
    }

    selectDate(day, isOtherMonth) {
        // Remove previous selection
        const selectedDays = document.querySelectorAll('.calendar-day.selected');
        selectedDays.forEach(day => day.classList.remove('selected'));
        
        // Add selection to clicked day
        event.target.classList.add('selected');
        
        // Here you could emit an event or call a callback
        console.log(`Selected date: ${day}`);
    }

    previousMonth() {
        this.currentDate.setMonth(this.currentDate.getMonth() - 1);
        this.generateCalendar();
    }

    nextMonth() {
        this.currentDate.setMonth(this.currentDate.getMonth() + 1);
        this.generateCalendar();
    }

    goToToday() {
        this.currentDate = new Date();
        this.generateCalendar();
    }

    handleTabSwitch(tabButton) {
        // This is handled by Bootstrap, but you can add custom logic here
        const tabName = tabButton.textContent.trim();
        console.log(`Switched to tab: ${tabName}`);
        
        // You could load different data based on the active tab
        switch(tabName.toLowerCase()) {
            case 'overview':
                this.loadOverviewData();
                break;
            case 'checklist':
                this.loadChecklistData();
                break;
            case 'guest list':
                this.loadGuestListData();
                break;
        }
    }

    loadOverviewData() {
        // Load overview data
        console.log('Loading overview data...');
    }

    loadChecklistData() {
        // Load checklist data
        console.log('Loading checklist data...');
    }

    loadGuestListData() {
        // Load guest list data
        console.log('Loading guest list data...');
    }

    handleChecklistChange(checkbox) {
        const item = checkbox.closest('.checklist-item');
        const text = item.querySelector('.checklist-text');
        
        if (checkbox.checked) {
            text.style.textDecoration = 'line-through';
            text.style.opacity = '0.7';
        } else {
            text.style.textDecoration = 'none';
            text.style.opacity = '1';
        }
        
        // Here you could save the checklist state to localStorage or send to server
        this.saveChecklistState();
    }

    saveChecklistState() {
        const checkboxes = document.querySelectorAll('.checklist-item input[type="checkbox"]');
        const checklistState = Array.from(checkboxes).map(checkbox => ({
            text: checkbox.nextElementSibling.textContent,
            checked: checkbox.checked
        }));
        
        localStorage.setItem('eventChecklistState', JSON.stringify(checklistState));
    }

    loadChecklistState() {
        const savedState = localStorage.getItem('eventChecklistState');
        if (savedState) {
            const checklistState = JSON.parse(savedState);
            const checkboxes = document.querySelectorAll('.checklist-item input[type="checkbox"]');
            
            checkboxes.forEach((checkbox, index) => {
                if (checklistState[index]) {
                    checkbox.checked = checklistState[index].checked;
                    this.handleChecklistChange(checkbox);
                }
            });
        }
    }

    handleLogout() {
        // Show confirmation dialog
        if (confirm('Are you sure you want to logout?')) {
            // Clear any stored data
            localStorage.removeItem('eventChecklistState');
            localStorage.removeItem('userSession');
            
            // Redirect to login page or show logout message
            alert('You have been logged out successfully!');
            
            // In a real application, you would redirect to login page
            // window.location.href = '/login';
        }
    }

    handleAddAccess() {
        // Close the module access modal
        const moduleAccessModal = bootstrap.Modal.getInstance(document.getElementById('moduleAccessModal'));
        if (moduleAccessModal) {
            moduleAccessModal.hide();
        }
        
        // Show success modal after a short delay
        setTimeout(() => {
            const successModal = new bootstrap.Modal(document.getElementById('successModal'));
            successModal.show();
            
            // Add event listener to continue button to change the button state
            const continueBtn = document.querySelector('#successModal button[data-bs-dismiss="modal"]');
            if (continueBtn) {
                continueBtn.addEventListener('click', () => {
                    this.changeInvitationStatus();
                }, { once: true });
            }
        }, 300);
    }

    changeInvitationStatus() {
        const notInvitedBtn = document.getElementById('notInvitedBtn');
        if (notInvitedBtn) {
            notInvitedBtn.className = 'btn btn-success-custom';
            notInvitedBtn.innerHTML = '<i class="fas fa-check me-2"></i>Invited';
            notInvitedBtn.removeAttribute('data-bs-toggle');
            notInvitedBtn.removeAttribute('data-bs-target');
        }
    }

    // Checklist Methods
    showTemplateSelectionModal() {
        const templateModal = new bootstrap.Modal(document.getElementById('templateSelectionModal'));
        templateModal.show();
    }

    selectTemplate(option) {
        // Remove active class from all options
        document.querySelectorAll('.template-option').forEach(opt => {
            opt.classList.remove('active');
        });
        
        // Add active class to selected option
        option.classList.add('active');
    }

    handleTemplateSelection() {
        // Hide template selection modal
        const templateModal = bootstrap.Modal.getInstance(document.getElementById('templateSelectionModal'));
        if (templateModal) {
            templateModal.hide();
        }

        // Show checklist content and hide import template view
        setTimeout(() => {
            document.getElementById('importTemplateView').classList.add('d-none');
            document.getElementById('checklistContentView').classList.remove('d-none');
        }, 300);
    }

    showAddChecklistModal() {
        const addChecklistModal = new bootstrap.Modal(document.getElementById('addChecklistModal'));
        addChecklistModal.show();
    }

    handleAddChecklist() {
        const title = document.getElementById('checklistTitle').value;
        if (title.trim()) {
            // Here you would typically add the new checklist to the accordion
            console.log('Adding new checklist:', title);
            
            // Clear the form
            document.getElementById('checklistTitle').value = '';
            
            // Close modal
            const addChecklistModal = bootstrap.Modal.getInstance(document.getElementById('addChecklistModal'));
            if (addChecklistModal) {
                addChecklistModal.hide();
            }
        }
    }

    showAddTaskModal(category) {
        this.currentTaskCategory = category;
        const addTaskModal = new bootstrap.Modal(document.getElementById('addTaskModal'));
        addTaskModal.show();
    }

    handleAddTask() {
        const taskTitle = document.getElementById('taskTitle').value;
        const dueDate = document.getElementById('taskDueDate').value;
        const assignee = document.getElementById('taskAssignee').value;

        if (taskTitle.trim()) {
            // Here you would typically add the new task to the appropriate category
            console.log('Adding new task:', {
                title: taskTitle,
                dueDate: dueDate,
                assignee: assignee,
                category: this.currentTaskCategory
            });
            
            // Clear the form
            document.getElementById('taskTitle').value = '';
            document.getElementById('taskDueDate').value = '';
            document.getElementById('taskAssignee').value = '';
            
            // Close modal
            const addTaskModal = bootstrap.Modal.getInstance(document.getElementById('addTaskModal'));
            if (addTaskModal) {
                addTaskModal.hide();
            }
        }
    }

    // Guest Management Methods
    showAddGuestModal() {
        const addGuestModal = new bootstrap.Modal(document.getElementById('addGuestModal'));
        addGuestModal.show();
    }

    handleAddGuest() {
        const firstName = document.getElementById('guestFirstName').value;
        const lastName = document.getElementById('guestLastName').value;
        const prefix = document.getElementById('guestPrefix').value;
        const relation = document.getElementById('guestRelation').value;
        const whatsapp = document.getElementById('guestWhatsapp').value;
        const invites = document.getElementById('guestInvites').value;

        if (firstName.trim() && lastName.trim()) {
            // Clear the form
            document.getElementById('guestFirstName').value = '';
            document.getElementById('guestLastName').value = '';
            document.getElementById('guestPrefix').value = '';
            document.getElementById('guestRelation').value = '';
            document.getElementById('guestWhatsapp').value = '';
            document.getElementById('guestInvites').value = '';
            
            // Close add guest modal
            const addGuestModal = bootstrap.Modal.getInstance(document.getElementById('addGuestModal'));
            if (addGuestModal) {
                addGuestModal.hide();
            }

            // Show success modal
            setTimeout(() => {
                document.getElementById('guestSuccessName').textContent = `${firstName} ${lastName}`;
                document.getElementById('guestSuccessAction').textContent = 'added';
                const successModal = new bootstrap.Modal(document.getElementById('guestSuccessModal'));
                successModal.show();
            }, 300);
        }
    }

    handleDeleteGuest() {
        const guestName = this.currentDeleteGuest;
        
        // Close delete confirmation modal
        const deleteModal = bootstrap.Modal.getInstance(document.getElementById('deleteGuestModal'));
        if (deleteModal) {
            deleteModal.hide();
        }

        // Show success modal for deletion
        setTimeout(() => {
            document.getElementById('guestSuccessName').textContent = guestName;
            document.getElementById('guestSuccessAction').textContent = 'deleted';
            const successModal = new bootstrap.Modal(document.getElementById('guestSuccessModal'));
            successModal.show();
        }, 300);
    }

    handleResize() {
        // Handle responsive behavior on window resize
        const sidebar = document.getElementById('sidebar');
        const overlay = document.querySelector('.sidebar-overlay');
        
        if (window.innerWidth > 768) {
            // Desktop view
            sidebar.classList.remove('show');
            if (overlay) {
                overlay.classList.remove('show');
            }
            document.body.style.overflow = '';
        }
    }

    // Utility method to show notifications
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
        notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
        notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }

    // Method to animate elements on scroll
    initializeScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                }
            });
        }, observerOptions);

        // Observe all section cards
        const sectionCards = document.querySelectorAll('.section-card');
        sectionCards.forEach(card => {
            observer.observe(card);
        });
    }
}

// Global functions for onclick handlers
function deleteGuest(guestName) {
    if (window.dashboard) {
        window.dashboard.currentDeleteGuest = guestName;
        document.getElementById('deleteGuestName').textContent = guestName;
        const deleteModal = new bootstrap.Modal(document.getElementById('deleteGuestModal'));
        deleteModal.show();
    }
}

function editGuest(guestName) {
    console.log('Editing guest:', guestName);
    // This would typically open an edit modal with pre-filled data
}

// Initialize the dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.dashboard = new EventDashboard();
    window.dashboard.init();
    
    // Load saved checklist state
    window.dashboard.loadChecklistState();
    
    // Initialize scroll animations
    window.dashboard.initializeScrollAnimations();
    
    // Add some demo interactions
    console.log('Event Management Dashboard loaded successfully!');
});

// Add CSS animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
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
    
    .section-card {
        opacity: 0;
    }
`;
document.head.appendChild(style);

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EventDashboard;
}
