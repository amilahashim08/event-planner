// Wedding Event Management App - Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initializeApp();
});

function initializeApp() {
    // Initialize calendar
    initializeCalendar();
    
    // Initialize modals
    initializeModals();
    
    // Initialize image gallery
    initializeImageGallery();
    
    // Initialize tab navigation
    initializeTabNavigation();
    
    // Initialize responsive sidebar
    initializeResponsiveSidebar();
}

// Calendar functionality
function initializeCalendar() {
    const calendarGrid = document.getElementById('calendarGrid');
    const prevBtn = document.getElementById('prevMonth');
    const nextBtn = document.getElementById('nextMonth');
    
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    
    // Event data for the calendar
    const events = {
        '2025-5-1': { type: 'planning', color: '#FAE8FF' },
        '2025-5-10': { type: 'vendor', color: '#EDFFD2' },
        '2025-5-15': { type: 'meeting', color: '#E2EAFF' },
        '2025-5-18': { type: 'dress', color: '#FFDFF3' },
        '2025-5-21': { type: 'wedding', color: '#9B4431' }
    };
    
    function renderCalendar(month, year) {
        calendarGrid.innerHTML = '';
        
        // Calendar headers
        const headers = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        headers.forEach(header => {
            const headerCell = document.createElement('div');
            headerCell.className = 'calendar-header-cell';
            headerCell.textContent = header;
            calendarGrid.appendChild(headerCell);
        });
        
        // Get first day of month and number of days
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysInPrevMonth = new Date(year, month, 0).getDate();
        
        // Add previous month's trailing days
        for (let i = firstDay - 1; i >= 0; i--) {
            const dayCell = document.createElement('div');
            dayCell.className = 'calendar-day other-month';
            dayCell.textContent = daysInPrevMonth - i;
            calendarGrid.appendChild(dayCell);
        }
        
        // Add current month's days
        for (let day = 1; day <= daysInMonth; day++) {
            const dayCell = document.createElement('div');
            dayCell.className = 'calendar-day';
            dayCell.textContent = day;
            
            // Check if day has events
            const eventKey = `${year}-${month + 1}-${day}`;
            if (events[eventKey]) {
                dayCell.classList.add(`event-${events[eventKey].type}`);
                dayCell.style.backgroundColor = events[eventKey].color;
            }
            
            // Highlight today
            const today = new Date();
            if (year === today.getFullYear() && month === today.getMonth() && day === today.getDate()) {
                dayCell.classList.add('today');
            }
            
            // Special styling for wedding day (May 21)
            if (month === 4 && day === 21) { // May is month 4 (0-indexed)
                dayCell.classList.add('event-wedding');
                dayCell.style.backgroundColor = '#9B4431';
                dayCell.style.color = '#FFFFFF';
            }
            
            calendarGrid.appendChild(dayCell);
        }
        
        // Add next month's leading days
        const totalCells = calendarGrid.children.length;
        const remainingCells = 42 - totalCells; // 6 weeks * 7 days
        
        for (let day = 1; day <= remainingCells; day++) {
            const dayCell = document.createElement('div');
            dayCell.className = 'calendar-day other-month';
            dayCell.textContent = day;
            calendarGrid.appendChild(dayCell);
        }
        
        // Update month/year display
        updateCalendarHeader(month, year);
    }
    
    function updateCalendarHeader(month, year) {
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        
        const headerElement = document.querySelector('.calendar-header h5');
        if (headerElement) {
            headerElement.textContent = `${monthNames[month]} ${year}`;
        }
    }
    
    // Event listeners for navigation
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            renderCalendar(currentMonth, currentYear);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            renderCalendar(currentMonth, currentYear);
        });
    }
    
    // Initialize calendar with current month
    renderCalendar(currentMonth, currentYear);
}

// Modal functionality
function initializeModals() {
    const notInvitedBtn = document.getElementById('notInvitedBtn');
    const accessModal = new bootstrap.Modal(document.getElementById('accessModal'));
    const successModal = new bootstrap.Modal(document.getElementById('successModal'));
    const addAccessBtn = document.getElementById('addAccessBtn');
    
    // Open access modal when "Not Invited" button is clicked
    if (notInvitedBtn) {
        notInvitedBtn.addEventListener('click', function() {
            accessModal.show();
        });
    }
    
    // Handle access permission form submission
    if (addAccessBtn) {
        addAccessBtn.addEventListener('click', function() {
            // Get selected permissions
            const selectedPermissions = [];
            const checkboxes = document.querySelectorAll('#accessModal input[type="checkbox"]:checked');
            
            checkboxes.forEach(checkbox => {
                selectedPermissions.push(checkbox.value);
            });
            
            // Simulate API call
            setTimeout(() => {
                accessModal.hide();
                successModal.show();
                
                // Update button text
                if (notInvitedBtn) {
                    notInvitedBtn.textContent = 'Invited';
                    notInvitedBtn.classList.remove('btn-not-invited');
                    notInvitedBtn.classList.add('btn-success');
                }
            }, 500);
        });
    }
    
    // Handle checkbox interactions
    const moduleCheckboxes = document.querySelectorAll('#accessModal input[type="checkbox"]');
    moduleCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            // Add visual feedback
            const moduleItem = this.closest('.module-item');
            if (moduleItem) {
                if (this.checked) {
                    moduleItem.style.backgroundColor = '#f8f9fa';
                } else {
                    moduleItem.style.backgroundColor = 'transparent';
                }
            }
        });
    });
}

// Image gallery functionality
function initializeImageGallery() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('mainImage');
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            if (mainImage) {
                mainImage.src = this.src;
                mainImage.alt = this.alt;
                
                // Add loading effect
                mainImage.style.opacity = '0.5';
                setTimeout(() => {
                    mainImage.style.opacity = '1';
                }, 200);
            }
        });
    });
}

// Tab navigation functionality
function initializeTabNavigation() {
    const tabLinks = document.querySelectorAll('.event-tabs .nav-link');
    
    tabLinks.forEach(link => {
        link.addEventListener('shown.bs.tab', function(e) {
            const targetTab = e.target.getAttribute('data-bs-target');
            
            // Add animation to tab content
            const tabContent = document.querySelector(targetTab);
            if (tabContent) {
                tabContent.style.opacity = '0';
                setTimeout(() => {
                    tabContent.style.opacity = '1';
                }, 100);
            }
            
            // Update URL without refreshing page
            const tabName = targetTab.replace('#', '');
            history.pushState(null, null, `#${tabName}`);
        });
    });
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', function(e) {
        const hash = window.location.hash.replace('#', '');
        if (hash) {
            const tabButton = document.querySelector(`[data-bs-target="#${hash}"]`);
            if (tabButton) {
                const tab = new bootstrap.Tab(tabButton);
                tab.show();
            }
        }
    });
    
    // Initialize tab from URL hash
    const initialHash = window.location.hash.replace('#', '');
    if (initialHash) {
        const tabButton = document.querySelector(`[data-bs-target="#${initialHash}"]`);
        if (tabButton) {
            const tab = new bootstrap.Tab(tabButton);
            tab.show();
        }
    }
}

// Responsive sidebar functionality
function initializeResponsiveSidebar() {
    const sidebarToggle = document.createElement('button');
    sidebarToggle.className = 'btn btn-outline-secondary d-md-none';
    sidebarToggle.innerHTML = '<i class="fas fa-bars"></i>';
    sidebarToggle.style.position = 'fixed';
    sidebarToggle.style.top = '20px';
    sidebarToggle.style.left = '20px';
    sidebarToggle.style.zIndex = '1001';
    
    document.body.appendChild(sidebarToggle);
    
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 999;
        display: none;
    `;
    
    document.body.appendChild(overlay);
    
    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('show');
        overlay.style.display = sidebar.classList.contains('show') ? 'block' : 'none';
    });
    
    overlay.addEventListener('click', function() {
        sidebar.classList.remove('show');
        overlay.style.display = 'none';
    });
    
    // Close sidebar when clicking on nav links on mobile
    const navLinks = document.querySelectorAll('.sidebar .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 768) {
                sidebar.classList.remove('show');
                overlay.style.display = 'none';
            }
        });
    });
}

// Utility functions
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1050;
        min-width: 300px;
    `;
    
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 5000);
}

// Form validation
function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('is-invalid');
            isValid = false;
        } else {
            input.classList.remove('is-invalid');
        }
    });
    
    return isValid;
}

// Search functionality
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const searchableElements = document.querySelectorAll('[data-searchable]');
            
            searchableElements.forEach(element => {
                const text = element.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    element.style.display = '';
                } else {
                    element.style.display = 'none';
                }
            });
        });
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // ESC key to close modals
    if (e.key === 'Escape') {
        const openModals = document.querySelectorAll('.modal.show');
        openModals.forEach(modal => {
            const modalInstance = bootstrap.Modal.getInstance(modal);
            if (modalInstance) {
                modalInstance.hide();
            }
        });
    }
    
    // Ctrl/Cmd + S to save (prevent default)
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        showNotification('Auto-save feature coming soon!', 'info');
    }
});

// Touch gestures for mobile
function initializeTouchGestures() {
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    document.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = touchEndX - touchStartX;
        
        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                // Swipe right - open sidebar
                const sidebar = document.querySelector('.sidebar');
                if (sidebar && !sidebar.classList.contains('show')) {
                    sidebar.classList.add('show');
                }
            } else {
                // Swipe left - close sidebar
                const sidebar = document.querySelector('.sidebar');
                if (sidebar && sidebar.classList.contains('show')) {
                    sidebar.classList.remove('show');
                }
            }
        }
    }
}

// Initialize touch gestures on mobile devices
if ('ontouchstart' in window) {
    initializeTouchGestures();
}

// Performance optimization - Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if IntersectionObserver is supported
if ('IntersectionObserver' in window) {
    initializeLazyLoading();
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeCalendar,
        initializeModals,
        initializeImageGallery,
        formatDate,
        validateForm
    };
}
