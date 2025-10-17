
// Utility functions
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
}

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

// Handle window resize
window.addEventListener('resize', debounce(function() {
    if (window.innerWidth > 768) {
        sidebar.classList.remove('show');
    }
}, 250));

// Handle escape key to close modals/menus
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        profileMenu.classList.remove('show');
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('show');
        }
    }
});

// Events Module Functions
function initializeEventsModule() {
    // Event card click handlers
    const eventCards = document.querySelectorAll('.event-card');
    eventCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't trigger if clicking on action icons
            if (e.target.closest('.event-icons')) return;
            
            const eventType = card.dataset.event;
            const eventTitle = card.querySelector('.event-title').textContent;
            showEventDetail(eventType, eventTitle);
        });
    });

    // Back button handler
    const backBtn = document.querySelector('.back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            showEventsGrid();
        });
    }

    // Tab navigation
    const tabLinks = document.querySelectorAll('.event-tabs .nav-link');
    tabLinks.forEach(link => {
        link.addEventListener('click', () => {
            tabLinks.forEach(tab => tab.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Search functionality for events
    const eventsSearch = document.getElementById('eventsSearch');
    if (eventsSearch) {
        eventsSearch.addEventListener('input', debounce((e) => {
            filterEvents(e.target.value);
        }, 300));
    }

    // Search functionality for guest list
    const guestSearch = document.getElementById('guestSearch');
    if (guestSearch) {
        guestSearch.addEventListener('input', debounce((e) => {
            filterGuestList(e.target.value);
        }, 300));
    }

    // Action button handlers
    document.addEventListener('click', (e) => {
        if (e.target.closest('.delete-btn')) {
            e.preventDefault();
            handleDeleteGuest(e.target.closest('tr'));
        }
        
        if (e.target.closest('.edit-btn')) {
            e.preventDefault();
            handleEditGuest(e.target.closest('tr'));
        }
    });
}

function showEventDetail(eventType, eventTitle) {
    document.getElementById('eventsGrid').style.display = 'none';
    document.getElementById('eventDetail').style.display = 'block';
    document.getElementById('eventDetailTitle').textContent = eventTitle;
}

function showEventsGrid() {
    document.getElementById('eventsGrid').style.display = 'block';
    document.getElementById('eventDetail').style.display = 'none';
}

function filterEvents(searchTerm) {
    const eventCards = document.querySelectorAll('.event-card');
    const term = searchTerm.toLowerCase();

    eventCards.forEach(card => {
        const title = card.querySelector('.event-title').textContent.toLowerCase();
        const type = card.querySelector('.event-type-label').textContent.toLowerCase();
        
        if (title.includes(term) || type.includes(term)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function filterGuestList(searchTerm) {
    const rows = document.querySelectorAll('#guestTableBody tr');
    const term = searchTerm.toLowerCase();

    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        let found = false;

        cells.forEach(cell => {
            if (cell.textContent.toLowerCase().includes(term)) {
                found = true;
            }
        });

        row.style.display = found ? 'table-row' : 'none';
    });
}

function handleDeleteGuest(row) {
    if (confirm('Are you sure you want to delete this guest?')) {
        row.remove();
        console.log('Guest deleted');
    }
}

function handleEditGuest(row) {
    console.log('Edit guest:', row);
    alert('Edit functionality would be implemented here');
}

// Global application state
const AppState = {
    currentPage: 'dashboard',
    currentEventId: null,
    currentMonth: new Date().getMonth(),
    currentYear: new Date().getFullYear(),
    events: [],
    sidebarCollapsed: false,
    currentTab: 'overview'
};

// DOM Elements
const elements = {
    sidebar: document.getElementById('sidebar'),
    sidebarToggle: document.getElementById('sidebarToggle'),
    mainContent: document.getElementById('mainContent'),
    breadcrumb: document.getElementById('breadcrumb'),
    navLinks: document.querySelectorAll('.nav-link'),
    pages: document.querySelectorAll('.page'),
    addEventBtn: document.getElementById('addEventBtn'),
    addEventBtnEvents: document.getElementById('addEventBtnEvents'),
    addEventModal: document.getElementById('addEventModal'),
    closeModal: document.getElementById('closeModal'),
    addEventModalForm: document.getElementById('addEventModalForm'),
    calendarGrid: document.getElementById('calendarGrid'),
    currentMonth: document.getElementById('currentMonth'),
    prevMonth: document.getElementById('prevMonth'),
    nextMonth: document.getElementById('nextMonth'),
    eventsGrid: document.getElementById('eventsGrid'),
    eventDetailModal: document.getElementById('eventDetailModal'),
    closeEventDetailModal: document.getElementById('closeEventDetailModal'),
    backToEvents: document.getElementById('backToEvents'),
    backFromAddEvent: document.getElementById('backFromAddEvent'),
    eventDetailTitle: document.getElementById('eventDetailTitle'),
    tabBtns: document.querySelectorAll('.tab-btn'),
    tabPanes: document.querySelectorAll('.tab-pane'),
    pieChart: document.getElementById('pieChart'),
    barChart: document.getElementById('barChart')
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Load sample data
    loadSampleData();
    
    // Initialize event listeners
    initializeEventListeners();
    
    // Initialize charts
    initializeCharts();
    
    // Generate calendar
    generateCalendar();
    
    // Generate events grid
    generateEventsGrid();
    
    // Update dashboard counts
    updateDashboardCounts();
    
    // Generate mini calendar
    generateMiniCalendar();
    
    console.log('Event Management Platform initialized successfully');
}

function initializeEventListeners() {
    // Sidebar toggle
    elements.sidebarToggle?.addEventListener('click', toggleSidebar);
    
    // Navigation
    elements.navLinks.forEach(link => {
        link.addEventListener('click', handleNavigation);
    });
    
    // Modal controls
    elements.addEventBtn?.addEventListener('click', openAddEventModal);
    elements.addEventBtnEvents?.addEventListener('click', openAddEventModal);
    elements.closeModal?.addEventListener('click', closeAddEventModal);
    elements.closeEventDetailModal?.addEventListener('click', closeEventDetailModal);
    
    // Form submission
    elements.addEventModalForm?.addEventListener('submit', handleAddEvent);
    
    // Calendar navigation
    elements.prevMonth?.addEventListener('click', () => navigateMonth(-1));
    elements.nextMonth?.addEventListener('click', () => navigateMonth(1));
    
    // Back buttons
    elements.backToEvents?.addEventListener('click', () => showPage('events'));
    elements.backFromAddEvent?.addEventListener('click', () => showPage('events'));
    
    // Tab switching
    elements.tabBtns.forEach(btn => {
        btn.addEventListener('click', handleTabSwitch);
    });
    
    // Close modals on outside click
    window.addEventListener('click', handleOutsideClick);
    
    // Checklist section toggles
    initializeChecklistToggles();
    
    // Budget section toggles
    initializeBudgetToggles();
}

function toggleSidebar() {
    AppState.sidebarCollapsed = !AppState.sidebarCollapsed;
    elements.sidebar?.classList.toggle('collapsed', AppState.sidebarCollapsed);
}

function handleNavigation(e) {
    e.preventDefault();
    const page = e.currentTarget.dataset.page;
    if (page) {
        showPage(page);
        updateActiveNavLink(e.currentTarget);
        updateBreadcrumb(page);
    }
}

function showPage(pageName) {
    AppState.currentPage = pageName;
    
    // Hide all pages
    elements.pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show target page
    const targetPage = document.getElementById(pageName);
    if (targetPage) {
        targetPage.classList.add('active');
        targetPage.classList.add('fade-in');
    }
    
    // Update navigation
    const navLink = document.querySelector(`[data-page="${pageName}"]`);
    if (navLink) {
        updateActiveNavLink(navLink);
        updateBreadcrumb(pageName);
    }
}

function updateActiveNavLink(activeLink) {
    elements.navLinks.forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

function updateBreadcrumb(pageName) {
    const breadcrumbMap = {
        dashboard: 'Dashboard',
        events: 'Events',
        eventDetail: 'Event Details',
        addEventForm: 'Add New Event',
        contacts: 'Contacts',
        templates: 'Templates',
        settings: 'Settings'
    };
    
    if (elements.breadcrumb) {
        elements.breadcrumb.innerHTML = `<span class="breadcrumb-item active">${breadcrumbMap[pageName] || pageName}</span>`;
    }
}

function openAddEventModal() {
    elements.addEventModal?.classList.add('active');
}

function closeAddEventModal() {
    elements.addEventModal?.classList.remove('active');
    elements.addEventModalForm?.reset();
}

function openEventDetailModal(event) {
    const modal = elements.eventDetailModal;
    if (modal && event) {
        // Populate modal with event data
        document.getElementById('eventModalTitle').textContent = event.title;
        document.getElementById('eventModalDateTime').textContent = 
            `${formatDate(event.date)} | ${event.time}`;
        document.getElementById('eventModalGuestCount').textContent = 
            `${event.guests?.length || 0} Guests`;
        
        modal.classList.add('active');
    }
}

function closeEventDetailModal() {
    elements.eventDetailModal?.classList.remove('active');
}

function handleAddEvent(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const newEvent = {
        id: Date.now(),
        title: formData.get('title'),
        date: formData.get('date'),
        time: formData.get('time'),
        guests: formData.get('guests')?.split(',').map(g => g.trim()).filter(g => g) || [],
        location: formData.get('location'),
        description: formData.get('description'),
        type: 'Other Event',
        status: 'upcoming',
        progress: 0
    };
    
    // Add to events array
    AppState.events.push(newEvent);
    
    // Update UI
    generateCalendar();
    generateEventsGrid();
    updateDashboardCounts();
    
    // Close modal
    closeAddEventModal();
    
    // Show success message (you can implement a toast notification here)
    console.log('Event added successfully:', newEvent);
}

function handleOutsideClick(e) {
    // Close modals when clicking outside
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
}

function navigateMonth(direction) {
    AppState.currentMonth += direction;
    
    if (AppState.currentMonth > 11) {
        AppState.currentMonth = 0;
        AppState.currentYear++;
    } else if (AppState.currentMonth < 0) {
        AppState.currentMonth = 11;
        AppState.currentYear--;
    }
    
    generateCalendar();
    generateMiniCalendar();
}

function generateCalendar() {
    if (!elements.calendarGrid || !elements.currentMonth) return;
    
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    // Update month header
    elements.currentMonth.textContent = `${monthNames[AppState.currentMonth]} ${AppState.currentYear}`;
    
    // Clear calendar
    elements.calendarGrid.innerHTML = '';
    
    // Add day headers
    dayNames.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'calendar-day day-header';
        dayHeader.textContent = day;
        elements.calendarGrid.appendChild(dayHeader);
    });
    
    // Get first day of month and number of days
    const firstDay = new Date(AppState.currentYear, AppState.currentMonth, 1).getDay();
    const daysInMonth = new Date(AppState.currentYear, AppState.currentMonth + 1, 0).getDate();
    const today = new Date();
    
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day';
        elements.calendarGrid.appendChild(emptyDay);
    }
    
    // Add days of month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;
        
        const currentDate = new Date(AppState.currentYear, AppState.currentMonth, day);
        const dateString = currentDate.toISOString().split('T')[0];
        
        // Check if today
        if (currentDate.toDateString() === today.toDateString()) {
            dayElement.classList.add('today');
        }
        
        // Check if has events
        const hasEvent = AppState.events.some(event => event.date === dateString);
        if (hasEvent) {
            dayElement.classList.add('has-event');
        }
        
        // Add click handler
        dayElement.addEventListener('click', () => {
            const dayEvents = AppState.events.filter(event => event.date === dateString);
            if (dayEvents.length > 0) {
                openEventDetailModal(dayEvents[0]);
            }
        });
        
        elements.calendarGrid.appendChild(dayElement);
    }
}

function generateMiniCalendar() {
    const miniCalendarGrid = document.querySelector('.mini-calendar-grid');
    if (!miniCalendarGrid) return;
    
    const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    
    // Clear mini calendar
    miniCalendarGrid.innerHTML = '';
    
    // Add day headers
    dayNames.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'mini-calendar-day';
        dayHeader.textContent = day;
        dayHeader.style.fontWeight = 'bold';
        dayHeader.style.color = 'var(--text-secondary)';
        miniCalendarGrid.appendChild(dayHeader);
    });
    
    // Get first day of month and number of days
    const firstDay = new Date(AppState.currentYear, AppState.currentMonth, 1).getDay();
    const daysInMonth = new Date(AppState.currentYear, AppState.currentMonth + 1, 0).getDate();
    
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'mini-calendar-day';
        miniCalendarGrid.appendChild(emptyDay);
    }
    
    // Add days of month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'mini-calendar-day';
        dayElement.textContent = day;
        
        const currentDate = new Date(AppState.currentYear, AppState.currentMonth, day);
        const dateString = currentDate.toISOString().split('T')[0];
        
        // Check if has events
        const hasEvent = AppState.events.some(event => event.date === dateString);
        if (hasEvent) {
            dayElement.classList.add('event-day');
        }
        
        // Add click handler
        dayElement.addEventListener('click', () => {
            document.querySelectorAll('.mini-calendar-day').forEach(d => d.classList.remove('selected'));
            dayElement.classList.add('selected');
        });
        
        miniCalendarGrid.appendChild(dayElement);
    }
}

function generateEventsGrid() {
    if (!elements.eventsGrid) return;
    
    elements.eventsGrid.innerHTML = '';
    
    AppState.events.forEach(event => {
        const eventCard = createEventCard(event);
        elements.eventsGrid.appendChild(eventCard);
    });
}

function createEventCard(event) {
    const card = document.createElement('div');
    card.className = 'event-card';
    
    const imageUrl = getEventImageUrl(event.type);
    
    card.innerHTML = `
        <img src="${imageUrl}" alt="${event.title}" class="event-card-image">
        <div class="event-card-content">
            <div class="event-card-meta">
                <span class="event-type">${event.type}</span>
                <span class="event-date-meta">${calculateDaysRemaining(event.date)}</span>
            </div>
            <h3 class="event-card-title">${event.title}</h3>
            <p class="event-card-date">${formatDate(event.date)}</p>
            <div class="event-card-progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${event.progress}%;"></div>
                </div>
                <span class="progress-text">${event.progress}%</span>
            </div>
        </div>
    `;
    
    card.addEventListener('click', () => {
        AppState.currentEventId = event.id;
        showEventDetail(event);
    });
    
    return card;
}

function showEventDetail(event) {
    AppState.currentEventId = event.id;
    
    // Update event detail page
    if (elements.eventDetailTitle) {
        elements.eventDetailTitle.textContent = event.title;
    }
    
    showPage('eventDetail');
}

function handleTabSwitch(e) {
    const tabName = e.target.dataset.tab;
    if (!tabName) return;
    
    AppState.currentTab = tabName;
    
    // Update tab buttons
    elements.tabBtns.forEach(btn => {
        btn.classList.remove('active');
    });
    e.target.classList.add('active');
    
    // Update tab panes
    elements.tabPanes.forEach(pane => {
        pane.classList.remove('active');
    });
    
    const targetPane = document.getElementById(tabName);
    if (targetPane) {
        targetPane.classList.add('active');
    }
}

function initializeChecklistToggles() {
    const sectionHeaders = document.querySelectorAll('.section-header-collapsible');
    
    sectionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const section = header.closest('.checklist-section-item');
            const icon = header.querySelector('i');
            
            section.classList.toggle('collapsed');
            
            if (section.classList.contains('collapsed')) {
                icon.className = 'fas fa-chevron-right';
            } else {
                icon.className = 'fas fa-chevron-down';
            }
        });
    });
}

function initializeBudgetToggles() {
    const toggleButtons = document.querySelectorAll('.section-toggle');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const section = button.closest('.budget-section');
            const table = section.querySelector('.budget-table-container');
            const total = section.querySelector('.budget-total');
            const icon = button.querySelector('i');
            
            if (table.style.display === 'none') {
                table.style.display = 'block';
                total.style.display = 'block';
                icon.className = 'fas fa-minus';
            } else {
                table.style.display = 'none';
                total.style.display = 'none';
                icon.className = 'fas fa-plus';
            }
        });
    });
}

function initializeCharts() {
    drawPieChart();
    drawBarChart();
}

function drawPieChart() {
    const canvas = elements.pieChart;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 80;
    
    const data = [
        { label: 'Wedding', value: 50, color: '#9B4431' },
        { label: 'Corporate', value: 10, color: '#D4A574' },
        { label: 'Birthday', value: 10, color: '#E8C7A0' },
        { label: 'Baby Shower', value: 10, color: '#F1E6D0' },
        { label: 'Anniversary', value: 10, color: '#F8F0E5' },
        { label: 'Graduation', value: 5, color: '#E6E6E6' },
        { label: 'Other', value: 5, color: '#CCCCCC' }
    ];
    
    let currentAngle = -Math.PI / 2;
    
    data.forEach(segment => {
        const sliceAngle = (segment.value / 100) * 2 * Math.PI;
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
        ctx.closePath();
        ctx.fillStyle = segment.color;
        ctx.fill();
        
        currentAngle += sliceAngle;
    });
}

function drawBarChart() {
    const canvas = elements.barChart;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const padding = 60;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    
    const data = [
        { label: 'Jan', value: 20 },
        { label: 'Feb', value: 80 },
        { label: 'Mar', value: 45 },
        { label: 'Apr', value: 30 },
        { label: 'May', value: 70 },
        { label: 'Jun', value: 55 },
        { label: 'Jul', value: 85 }
    ];
    
    const maxValue = Math.max(...data.map(d => d.value));
    const barWidth = chartWidth / data.length;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw bars
    data.forEach((item, index) => {
        const barHeight = (item.value / maxValue) * chartHeight;
        const x = padding + index * barWidth + barWidth * 0.2;
        const y = height - padding - barHeight;
        const width = barWidth * 0.6;
        
        ctx.fillStyle = '#9B4431';
        ctx.fillRect(x, y, width, barHeight);
        
        // Draw labels
        ctx.fillStyle = '#666';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(item.label, x + width / 2, height - padding + 20);
    });
}

function updateDashboardCounts() {
    const upcomingEvents = AppState.events.filter(event => 
        new Date(event.date) >= new Date() && event.status === 'upcoming'
    ).length;
    
    const totalEvents = AppState.events.length;
    const tasksCount = 8; // This would come from task data
    const rsvpCount = 12; // This would come from RSVP data
    
    const upcomingCountEl = document.getElementById('upcomingCount');
    const totalEventsCountEl = document.getElementById('totalEventsCount');
    const tasksCountEl = document.getElementById('tasksCount');
    const rsvpCountEl = document.getElementById('rsvpCount');
    
    if (upcomingCountEl) upcomingCountEl.textContent = upcomingEvents;
    if (totalEventsCountEl) totalEventsCountEl.textContent = totalEvents;
    if (tasksCountEl) tasksCountEl.textContent = tasksCount;
    if (rsvpCountEl) rsvpCountEl.textContent = rsvpCount;
}

// Utility functions
function formatDate(dateString) {
    if (!dateString) return 'No date';
    
    const date = new Date(dateString);
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    
    return date.toLocaleDateString('en-US', options);
}

function calculateDaysRemaining(dateString) {
    if (!dateString) return 'No date';
    
    const eventDate = new Date(dateString);
    const today = new Date();
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays > 0) {
        return `${diffDays} Days Remaining`;
    } else if (diffDays === 0) {
        return 'Today';
    } else {
        return 'Past Event';
    }
}

function getEventImageUrl(eventType) {
    const eventImages = {
        'Wedding': 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=250&fit=crop',
        'Birthday': 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=250&fit=crop',
        'Corporate': 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=250&fit=crop',
        'Baby Shower': 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=250&fit=crop',
        'Anniversary': 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=250&fit=crop',
        'Graduation Party': 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=250&fit=crop',
        'Other Event': 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=250&fit=crop'
    };
    
    return eventImages[eventType] || eventImages['Other Event'];
}

function loadSampleData() {
    // This function loads the sample data from data.js
    AppState.events = window.sampleEvents || [];
    console.log('Sample data loaded:', AppState.events.length, 'events');
}

// Export functions for potential external use
window.AppState = AppState;
window.showPage = showPage;
window.openEventDetailModal = openEventDetailModal;

class TemplateManager {
    constructor() {
        this.templates = [
            {
                id: 1,
                title: "Basic Wedding Checklist",
                type: "wedding",
                category: "Wedding",
                image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=300&fit=crop&auto=format",
                createdDate: "26/05/2025",
                updatedDate: "26/05/2025"
            },
            {
                id: 2,
                title: "Basic Birthday Checklist",
                type: "birthday",
                category: "Birthday",
                image: "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400&h=300&fit=crop&auto=format",
                createdDate: "28/05/2025",
                updatedDate: "28/05/2025"
            },
            {
                id: 3,
                title: "Corporate Event Checklist",
                type: "corporate",
                category: "Corporate Event",
                image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=300&fit=crop&auto=format",
                createdDate: "25/05/2025",
                updatedDate: "25/05/2025"
            },
            {
                id: 4,
                title: "Baby Shower Checklist",
                type: "baby-shower",
                category: "Baby Shower",
                image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400&h=300&fit=crop&auto=format",
                createdDate: "27/05/2025",
                updatedDate: "27/05/2025"
            }
        ];
        
        this.designTemplates = [
            {
                id: 1,
                title: "Mood Board",
                type: "wedding",
                category: "Wedding",
                image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=300&fit=crop&auto=format",
                createdDate: "29/05/2025",
                updatedDate: "29/05/2025"
            },
            {
                id: 2,
                title: "Photography Mode",
                type: "birthday",
                category: "Birthday",
                image: "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400&h=300&fit=crop&auto=format",
                createdDate: "26/05/2025",
                updatedDate: "26/05/2025"
            }
        ];
        
        this.budgetTemplates = [
            {
                id: 1,
                title: "Budget List for Wedding",
                type: "wedding",
                category: "Wedding",
                image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=300&fit=crop&auto=format",
                createdDate: "29/05/2025",
                updatedDate: "29/05/2025"
            },
            {
                id: 2,
                title: "Budget List for Birthday",
                type: "birthday",
                category: "Birthday",
                image: "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400&h=300&fit=crop&auto=format",
                createdDate: "26/05/2025",
                updatedDate: "26/05/2025"
            }
        ];
        
        this.questionnaireTemplates = [
            {
                id: 1,
                title: "Wedding Questionnaire",
                type: "wedding",
                category: "Wedding",
                image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=300&fit=crop&auto=format",
                createdDate: "29/05/2025",
                updatedDate: "29/05/2025"
            },
            {
                id: 2,
                title: "Birthday Questionnaire",
                type: "birthday",
                category: "Birthday",
                image: "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400&h=300&fit=crop&auto=format",
                createdDate: "26/05/2025",
                updatedDate: "26/05/2025"
            }
        ];
        
        this.filteredTemplates = [...this.templates];
        this.filteredDesignTemplates = [...this.designTemplates];
        this.filteredBudgetTemplates = [...this.budgetTemplates];
        this.filteredQuestionnaireTemplates = [...this.questionnaireTemplates];
        
        // Notes templates data
        this.notesTemplates = [
            {
                id: 1,
                title: "Budget List for Wedding",
                type: "wedding",
                category: "Wedding",
                image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=300&fit=crop&auto=format",
                updatedDate: "26/05/2025",
                eventType: "Wedding"
            },
            {
                id: 2,
                title: "Budget List for Birthday",
                type: "birthday",
                category: "Birthday",
                image: "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400&h=300&fit=crop&auto=format",
                createdDate: "26/05/2025",
                eventType: "Birthday"
            }
        ];
        this.filteredNotesTemplates = [...this.notesTemplates];
        
        // Notes data for detail view
        this.notes = [
            {
                id: 1,
                author: "Caroline Forbes",
                initials: "CF",
                date: "26/05/2025",
                content: "This vendor was selected for the Johnson wedding on June 14th. Please coordinate setup at the venue by 10:00 AM. Client prefers a pastel-themed arrangement with white roses and eucalyptus. All communication should go through the planner. Payment scheduled 50% upfront, balance on event day.",
                status: "active",
                avatarColor: "#f8a5c2"
            },
            {
                id: 2,
                author: "Klaus Mikaelson",
                initials: "KM",
                date: "25/05/2025",
                content: "This vendor was selected for the Johnson wedding on June 14th. Please coordinate setup at the venue by 10:00 AM. Client prefers a pastel-themed arrangement with white roses and eucalyptus. All communication should go through the planner. Payment scheduled 50% upfront, balance on event day.",
                status: "active",
                avatarColor: "#a5b4fc"
            }
        ];
        this.currentNoteId = null;
        this.showArchived = false;
        
        // Proposals data
        this.proposals = [
            {
                id: 1,
                title: "Wedding Proposal",
                type: "wedding",
                category: "Wedding",
                clientName: "John Smith",
                amount: "$5,000",
                status: "pending",
                createdDate: "29/05/2025",
                updatedDate: "29/05/2025"
            },
            {
                id: 2,
                title: "Birthday Party Proposal",
                type: "birthday",
                category: "Birthday",
                clientName: "Sarah Johnson",
                amount: "$2,500",
                status: "approved",
                createdDate: "28/05/2025",
                updatedDate: "28/05/2025"
            }
        ];
        this.filteredProposals = [...this.proposals];

        // Contracts data
        this.contracts = [
            {
                id: 1,
                title: "Wedding Contract",
                type: "wedding",
                category: "Wedding",
                clientName: "John Smith",
                amount: "$5,000",
                status: "signed",
                createdDate: "29/05/2025",
                updatedDate: "29/05/2025"
            },
            {
                id: 2,
                title: "Corporate Event Contract",
                type: "corporate",
                category: "Corporate Event",
                clientName: "Tech Corp",
                amount: "$10,000",
                status: "pending",
                createdDate: "27/05/2025",
                updatedDate: "27/05/2025"
            }
        ];
        this.filteredContracts = [...this.contracts];

        // Quotes data
        this.quotes = [
            {
                id: 1,
                title: "Wedding Quote",
                type: "wedding",
                category: "Wedding",
                clientName: "John Smith",
                amount: "$5,000",
                status: "sent",
                createdDate: "29/05/2025",
                updatedDate: "29/05/2025"
            },
            {
                id: 2,
                title: "Birthday Party Quote",
                type: "birthday",
                category: "Birthday",
                clientName: "Sarah Johnson",
                amount: "$2,500",
                status: "approved",
                createdDate: "28/05/2025",
                updatedDate: "28/05/2025"
            }
        ];
        this.filteredQuotes = [...this.quotes];

        // Invoices data
        this.invoices = [
            {
                id: 1,
                title: "Wedding Invoice",
                type: "wedding",
                category: "Wedding",
                clientName: "John Smith",
                amount: "$5,000",
                status: "paid",
                createdDate: "29/05/2025",
                updatedDate: "29/05/2025"
            },
            {
                id: 2,
                title: "Birthday Party Invoice",
                type: "birthday",
                category: "Birthday",
                clientName: "Sarah Johnson",
                amount: "$2,500",
                status: "overdue",
                createdDate: "28/05/2025",
                updatedDate: "28/05/2025"
            }
        ];
        this.filteredInvoices = [...this.invoices];

        // Payments data
        this.payments = [
            {
                id: 1,
                title: "Wedding Payment",
                type: "wedding",
                category: "Wedding",
                clientName: "John Smith",
                amount: "$5,000",
                status: "completed",
                paymentMethod: "Credit Card",
                createdDate: "29/05/2025",
                updatedDate: "29/05/2025"
            },
            {
                id: 2,
                title: "Birthday Party Payment",
                type: "birthday",
                category: "Birthday",
                clientName: "Sarah Johnson",
                amount: "$2,500",
                status: "pending",
                paymentMethod: "Bank Transfer",
                createdDate: "28/05/2025",
                updatedDate: "28/05/2025"
            }
        ];
        this.filteredPayments = [...this.payments];
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupSidebarToggle();
        this.renderTemplates();
        this.renderDesignTemplates();
        this.renderBudgetTemplates();
        this.renderQuestionnaireTemplates();
        this.renderNotesTemplates();
        this.renderProposalsTemplates();
        this.renderContractsTemplates();
        this.renderQuotesTemplates();
        this.renderInvoicesTemplates();
        this.renderPaymentsTemplates();
        this.setupDropdownSelection();
        this.setActiveNavItem();
        this.initializeNotesData();
    }
    
    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('templateSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
        }
        
        // Filter functionality
        const eventFilter = document.getElementById('eventFilter');
        if (eventFilter) {
            eventFilter.addEventListener('change', (e) => {
                this.handleFilter(e.target.value);
            });
        }
        
        // Create template modal
        const createTemplateBtn = document.getElementById('createTemplateBtn');
        if (createTemplateBtn) {
            createTemplateBtn.addEventListener('click', () => {
                this.handleCreateTemplate();
            });
        }
        
        // Design Studio search functionality
        const designSearchInput = document.getElementById('designTemplateSearch');
        if (designSearchInput) {
            designSearchInput.addEventListener('input', (e) => {
                this.handleDesignSearch(e.target.value);
            });
        }
        
        // Design Studio filter functionality
        const designEventFilter = document.getElementById('designEventFilter');
        if (designEventFilter) {
            designEventFilter.addEventListener('change', (e) => {
                this.handleDesignFilter(e.target.value);
            });
        }
        
        // Create design template modal
        const createDesignTemplateBtn = document.getElementById('createDesignTemplateBtn');
        if (createDesignTemplateBtn) {
            createDesignTemplateBtn.addEventListener('click', () => {
                this.handleCreateDesignTemplate();
            });
        }
        
        // Budget search functionality
        const budgetSearchInput = document.getElementById('budgetTemplateSearch');
        if (budgetSearchInput) {
            budgetSearchInput.addEventListener('input', (e) => {
                this.handleBudgetSearch(e.target.value);
            });
        }
        
        // Budget filter functionality
        const budgetEventFilter = document.getElementById('budgetEventFilter');
        if (budgetEventFilter) {
            budgetEventFilter.addEventListener('change', (e) => {
                this.handleBudgetFilter(e.target.value);
            });
        }
        
        // Create budget template modal
        const createBudgetTemplateBtn = document.getElementById('createBudgetTemplateBtn');
        if (createBudgetTemplateBtn) {
            createBudgetTemplateBtn.addEventListener('click', () => {
                this.handleCreateBudgetTemplate();
            });
        }
        
        // Save budget details button
        const saveBudgetDetailsBtn = document.getElementById('saveBudgetDetailsBtn');
        if (saveBudgetDetailsBtn) {
            saveBudgetDetailsBtn.addEventListener('click', () => {
                this.handleSaveBudgetDetails();
            });
        }
        
        // Questionnaire search functionality
        const questionnaireSearchInput = document.getElementById('questionnaireTemplateSearch');
        if (questionnaireSearchInput) {
            questionnaireSearchInput.addEventListener('input', (e) => {
                this.handleQuestionnaireSearch(e.target.value);
            });
        }
        
        // Questionnaire filter functionality
        const questionnaireEventFilter = document.getElementById('questionnaireEventFilter');
        if (questionnaireEventFilter) {
            questionnaireEventFilter.addEventListener('change', (e) => {
                this.handleQuestionnaireFilter(e.target.value);
            });
        }
        
        // Create questionnaire template modal
        const createQuestionnaireTemplateBtn = document.getElementById('createQuestionnaireTemplateBtn');
        if (createQuestionnaireTemplateBtn) {
            createQuestionnaireTemplateBtn.addEventListener('click', () => {
                this.handleCreateQuestionnaireTemplate();
            });
        }
        
        // Questionnaire event type dropdown
        const questionnaireEventTypeDropdown = document.getElementById('questionnaireEventTypeDropdown');
        if (questionnaireEventTypeDropdown) {
            questionnaireEventTypeDropdown.addEventListener('click', (e) => {
                if (e.target.classList.contains('dropdown-item')) {
                    e.preventDefault();
                    const value = e.target.getAttribute('data-value');
                    const text = e.target.textContent;
                    document.getElementById('questionnaireEventType').value = text;
                    
                    // Update active state
                    document.querySelectorAll('#questionnaireEventTypeDropdown .dropdown-item').forEach(item => {
                        item.classList.remove('active');
                    });
                    e.target.classList.add('active');
                }
            });
        }
        
        // Proposals search functionality
        const proposalsSearchInput = document.getElementById('proposalsSearch');
        if (proposalsSearchInput) {
            proposalsSearchInput.addEventListener('input', (e) => {
                this.handleProposalsSearch(e.target.value);
            });
        }

        // Proposals template modal
        const createProposalsTemplateBtn = document.getElementById('createProposalsTemplateBtn');
        if (createProposalsTemplateBtn) {
            createProposalsTemplateBtn.addEventListener('click', () => {
                this.handleCreateProposalsTemplate();
            });
        }

        // Contracts search functionality
        const contractsSearchInput = document.getElementById('contractsSearch');
        if (contractsSearchInput) {
            contractsSearchInput.addEventListener('input', (e) => {
                this.handleContractsSearch(e.target.value);
            });
        }

        // Contracts template modal
        const createContractsTemplateBtn = document.getElementById('createContractsTemplateBtn');
        if (createContractsTemplateBtn) {
            createContractsTemplateBtn.addEventListener('click', () => {
                this.handleCreateContractsTemplate();
            });
        }

        // Quotes search functionality
        const quotesSearchInput = document.getElementById('quotesSearch');
        if (quotesSearchInput) {
            quotesSearchInput.addEventListener('input', (e) => {
                this.handleQuotesSearch(e.target.value);
            });
        }

        // Quotes template modal
        const createQuotesTemplateBtn = document.getElementById('createQuotesTemplateBtn');
        if (createQuotesTemplateBtn) {
            createQuotesTemplateBtn.addEventListener('click', () => {
                this.handleCreateQuotesTemplate();
            });
        }

        // Invoices search functionality
        const invoicesSearchInput = document.getElementById('invoicesSearch');
        if (invoicesSearchInput) {
            invoicesSearchInput.addEventListener('input', (e) => {
                this.handleInvoicesSearch(e.target.value);
            });
        }

        // Invoices template modal
        const createInvoicesTemplateBtn = document.getElementById('createInvoicesTemplateBtn');
        if (createInvoicesTemplateBtn) {
            createInvoicesTemplateBtn.addEventListener('click', () => {
                this.handleCreateInvoicesTemplate();
            });
        }

        // Payments search functionality
        const paymentsSearchInput = document.getElementById('paymentsSearch');
        if (paymentsSearchInput) {
            paymentsSearchInput.addEventListener('input', (e) => {
                this.handlePaymentsSearch(e.target.value);
            });
        }

        // Payments template modal
        const createPaymentsTemplateBtn = document.getElementById('createPaymentsTemplateBtn');
        if (createPaymentsTemplateBtn) {
            createPaymentsTemplateBtn.addEventListener('click', () => {
                this.handleCreatePaymentsTemplate();
            });
        }

        // Tab switching
        const tabs = document.querySelectorAll('[data-bs-toggle="tab"]');
        tabs.forEach(tab => {
            tab.addEventListener('shown.bs.tab', () => {
                this.setActiveNavItem();
            });
        });
    }
    
    setupDropdownSelection() {
        // Regular template modal dropdown
        const dropdownItems = document.querySelectorAll('#eventTypeDropdown .dropdown-item');
        const eventTypeInput = document.getElementById('eventType');
        
        dropdownItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all items
                dropdownItems.forEach(i => i.classList.remove('active'));
                
                // Add active class to clicked item
                item.classList.add('active');
                
                // Update input value
                eventTypeInput.value = item.textContent;
                eventTypeInput.dataset.value = item.dataset.value;
            });
        });
        
        // Set default value
        const defaultItem = document.querySelector('#eventTypeDropdown .dropdown-item.active');
        if (defaultItem && eventTypeInput) {
            eventTypeInput.value = defaultItem.textContent;
            eventTypeInput.dataset.value = defaultItem.dataset.value;
        }
        
        // Design template modal dropdown
        const designDropdownItems = document.querySelectorAll('#designEventTypeDropdown .dropdown-item');
        const designEventTypeInput = document.getElementById('designEventType');
        
        designDropdownItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all items
                designDropdownItems.forEach(i => i.classList.remove('active'));
                
                // Add active class to clicked item
                item.classList.add('active');
                
                // Update input value
                designEventTypeInput.value = item.textContent;
                designEventTypeInput.dataset.value = item.dataset.value;
            });
        });
        
        // Set default value for design modal
        const designDefaultItem = document.querySelector('#designEventTypeDropdown .dropdown-item.active');
        if (designDefaultItem && designEventTypeInput) {
            designEventTypeInput.value = designDefaultItem.textContent;
            designEventTypeInput.dataset.value = designDefaultItem.dataset.value;
        }
        
        // Budget template modal dropdown
        const budgetDropdownItems = document.querySelectorAll('#budgetEventTypeDropdown .dropdown-item');
        const budgetEventTypeInput = document.getElementById('budgetEventType');
        
        budgetDropdownItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all items
                budgetDropdownItems.forEach(i => i.classList.remove('active'));
                
                // Add active class to clicked item
                item.classList.add('active');
                
                // Update input value
                budgetEventTypeInput.value = item.textContent;
                budgetEventTypeInput.dataset.value = item.dataset.value;
            });
        });
        
        // Set default value for budget modal
        const budgetDefaultItem = document.querySelector('#budgetEventTypeDropdown .dropdown-item.active');
        if (budgetDefaultItem && budgetEventTypeInput) {
            budgetEventTypeInput.value = budgetDefaultItem.textContent;
            budgetEventTypeInput.dataset.value = budgetDefaultItem.dataset.value;
        }
        
        // Proposals template modal dropdown
        const proposalsDropdownItems = document.querySelectorAll('#proposalsEventTypeDropdown .dropdown-item');
        const proposalsEventTypeInput = document.getElementById('proposalsEventType');
        
        proposalsDropdownItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all items
                proposalsDropdownItems.forEach(i => i.classList.remove('active'));
                
                // Add active class to clicked item
                item.classList.add('active');
                
                // Update input value
                proposalsEventTypeInput.value = item.textContent;
                proposalsEventTypeInput.dataset.value = item.dataset.value;
            });
        });
        
        // Set default value for proposals modal
        const proposalsDefaultItem = document.querySelector('#proposalsEventTypeDropdown .dropdown-item.active');
        if (proposalsDefaultItem && proposalsEventTypeInput) {
            proposalsEventTypeInput.value = proposalsDefaultItem.textContent;
            proposalsEventTypeInput.dataset.value = proposalsDefaultItem.dataset.value;
        }
        
        // Contracts template modal dropdown
        const contractsDropdownItems = document.querySelectorAll('#contractsEventTypeDropdown .dropdown-item');
        const contractsEventTypeInput = document.getElementById('contractsEventType');
        
        contractsDropdownItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all items
                contractsDropdownItems.forEach(i => i.classList.remove('active'));
                
                // Add active class to clicked item
                item.classList.add('active');
                
                // Update input value
                contractsEventTypeInput.value = item.textContent;
                contractsEventTypeInput.dataset.value = item.dataset.value;
            });
        });
        
        // Set default value for contracts modal
        const contractsDefaultItem = document.querySelector('#contractsEventTypeDropdown .dropdown-item.active');
        if (contractsDefaultItem && contractsEventTypeInput) {
            contractsEventTypeInput.value = contractsDefaultItem.textContent;
            contractsEventTypeInput.dataset.value = contractsDefaultItem.dataset.value;
        }
        
        // Quotes template modal dropdown
        const quotesDropdownItems = document.querySelectorAll('#quotesEventTypeDropdown .dropdown-item');
        const quotesEventTypeInput = document.getElementById('quotesEventType');
        
        quotesDropdownItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all items
                quotesDropdownItems.forEach(i => i.classList.remove('active'));
                
                // Add active class to clicked item
                item.classList.add('active');
                
                // Update input value
                quotesEventTypeInput.value = item.textContent;
                quotesEventTypeInput.dataset.value = item.dataset.value;
            });
        });
        
        // Set default value for quotes modal
        const quotesDefaultItem = document.querySelector('#quotesEventTypeDropdown .dropdown-item.active');
        if (quotesDefaultItem && quotesEventTypeInput) {
            quotesEventTypeInput.value = quotesDefaultItem.textContent;
            quotesEventTypeInput.dataset.value = quotesDefaultItem.dataset.value;
        }
        
        // Payments template modal dropdown
        const paymentsDropdownItems = document.querySelectorAll('#paymentsEventTypeDropdown .dropdown-item');
        const paymentsEventTypeInput = document.getElementById('paymentsEventType');
        
        paymentsDropdownItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all items
                paymentsDropdownItems.forEach(i => i.classList.remove('active'));
                
                // Add active class to clicked item
                item.classList.add('active');
                
                // Update input value
                paymentsEventTypeInput.value = item.textContent;
                paymentsEventTypeInput.dataset.value = item.dataset.value;
            });
        });
        
        // Set default value for payments modal
        const paymentsDefaultItem = document.querySelector('#paymentsEventTypeDropdown .dropdown-item.active');
        if (paymentsDefaultItem && paymentsEventTypeInput) {
            paymentsEventTypeInput.value = paymentsDefaultItem.textContent;
            paymentsEventTypeInput.dataset.value = paymentsDefaultItem.dataset.value;
        }
    }
    
    setupSidebarToggle() {
        const sidebar = document.getElementById('sidebar');
        const toggle = document.getElementById('sidebarToggle');
        
        if (toggle && sidebar) {
            toggle.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    sidebar.classList.toggle('open');
                } else {
                    sidebar.classList.toggle('collapsed');
                }
            });
        }
        
        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 && 
                sidebar && sidebar.classList.contains('open') && 
                !sidebar.contains(e.target) && 
                !toggle.contains(e.target)) {
                sidebar.classList.remove('open');
            }
        });
    }
    
    handleSearch(searchTerm) {
        const filtered = this.templates.filter(template => 
            template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            template.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        this.filteredTemplates = filtered;
        this.renderTemplates();
    }
    
    handleFilter(eventType) {
        if (eventType) {
            this.filteredTemplates = this.templates.filter(template => 
                template.type === eventType
            );
        } else {
            this.filteredTemplates = [...this.templates];
        }
        
        this.renderTemplates();
    }
    
    renderTemplates() {
        const grid = document.getElementById('templateGrid');
        if (!grid) return;
        
        if (this.filteredTemplates.length === 0) {
            grid.innerHTML = `
                <div class="col-12 text-center py-5">
                    <i class="fas fa-search fa-3x text-muted mb-3"></i>
                    <h4>No Templates Found</h4>
                    <p class="text-muted">Try adjusting your search or filter criteria</p>
                </div>
            `;
            return;
        }
        
        const templatesHTML = this.filteredTemplates.map(template => `
            <div class="template-card" onclick="templateManager.viewTemplate(${template.id})">
                <div class="card-image" style="background-image: url('${template.image}')">
                    <div class="card-actions">
                        <button class="card-action-btn edit" onclick="event.stopPropagation(); templateManager.editTemplate(${template.id})" title="Edit">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="card-action-btn delete" onclick="event.stopPropagation(); templateManager.deleteTemplate(${template.id})" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="card-content">
                    <div class="card-meta">
                        <span class="project-type">Project Type:</span>
                        <span class="event-type">${template.category}</span>
                    </div>
                    <h3 class="card-title">${template.title}</h3>
                    <p class="card-date">Created On: ${template.createdDate}</p>
                    <div class="card-icons">
                        <i class="fas fa-eye card-icon" title="View"></i>
                        <i class="fas fa-heart card-icon" title="Favorite"></i>
                    </div>
                </div>
            </div>
        `).join('');
        
        grid.innerHTML = templatesHTML;
    }
    
    handleCreateTemplate() {
        const eventTypeInput = document.getElementById('eventType');
        const templateTitleInput = document.getElementById('templateTitle');
        
        if (!eventTypeInput.dataset.value || !templateTitleInput.value.trim()) {
            this.showMessage('Please fill in all required fields', 'error');
            return;
        }
        
        const newTemplate = {
            id: this.templates.length + 1,
            title: templateTitleInput.value.trim(),
            type: eventTypeInput.dataset.value,
            category: eventTypeInput.value,
            image: this.getDefaultImage(eventTypeInput.dataset.value),
            createdDate: new Date().toLocaleDateString('en-GB'),
            updatedDate: new Date().toLocaleDateString('en-GB')
        };
        
        this.templates.push(newTemplate);
        this.filteredTemplates = [...this.templates];
        this.renderTemplates();
        
        // Reset form
        templateTitleInput.value = '';
        
        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('createTemplateModal'));
        modal.hide();
        
        this.showMessage('Template created successfully!', 'success');
    }
    
    getDefaultImage(type) {
        const images = {
            'wedding': 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=300&fit=crop&auto=format',
            'birthday': 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400&h=300&fit=crop&auto=format',
            'corporate': 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=300&fit=crop&auto=format',
            'baby-shower': 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400&h=300&fit=crop&auto=format',
            'anniversary': 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=300&fit=crop&auto=format',
            'graduation': 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop&auto=format',
            'other': 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=300&fit=crop&auto=format'
        };
        
        return images[type] || images['other'];
    }
    
    viewTemplate(templateId) {
        const template = this.templates.find(t => t.id === templateId);
        if (template) {
            window.location.href = `template-detail.html?id=${templateId}`;
        }
    }
    
    // Design Studio Methods
    handleDesignSearch(searchTerm) {
        const filtered = this.designTemplates.filter(template => 
            template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            template.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        this.filteredDesignTemplates = filtered;
        this.renderDesignTemplates();
    }
    
    handleDesignFilter(eventType) {
        if (eventType) {
            this.filteredDesignTemplates = this.designTemplates.filter(template => 
                template.type === eventType
            );
        } else {
            this.filteredDesignTemplates = [...this.designTemplates];
        }
        
        this.renderDesignTemplates();
    }
    
    renderDesignTemplates() {
        const grid = document.getElementById('designTemplateGrid');
        if (!grid) return;
        
        if (this.filteredDesignTemplates.length === 0) {
            grid.innerHTML = `
                <div class="col-12 text-center py-5">
                    <i class="fas fa-search fa-3x text-muted mb-3"></i>
                    <h4>No Design Templates Found</h4>
                    <p class="text-muted">Try adjusting your search or filter criteria</p>
                </div>
            `;
            return;
        }
        
        const templatesHTML = this.filteredDesignTemplates.map(template => `
            <div class="design-template-card" onclick="templateManager.viewMoodBoard(${template.id})">
                <div class="design-card-image" style="background-image: url('${template.image}')"></div>
                <div class="design-card-content">
                    <div class="design-card-meta">
                        <span class="design-project-type">Project Type:</span>
                        <span class="design-event-type">${template.category}</span>
                        <div class="design-card-icons">
                            <i class="fas fa-eye design-card-icon" title="View"></i>
                            <i class="fas fa-heart design-card-icon" title="Favorite"></i>
                        </div>
                    </div>
                    <div class="design-card-title-row">
                        <h3 class="design-card-title">${template.title}</h3>
                        <div class="design-card-actions">
                            <button class="design-action-btn edit" onclick="event.stopPropagation(); templateManager.editDesignTemplate(${template.id})" title="Edit">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="design-action-btn delete" onclick="event.stopPropagation(); templateManager.deleteDesignTemplate(${template.id})" title="Delete">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                    <p class="design-card-date">Created On: ${template.createdDate}</p>
                </div>
            </div>
        `).join('');
        
        grid.innerHTML = templatesHTML;
    }
    
    handleCreateDesignTemplate() {
        const eventTypeInput = document.getElementById('designEventType');
        const templateTitleInput = document.getElementById('designTemplateTitle');
        
        if (!eventTypeInput.dataset.value || !templateTitleInput.value.trim()) {
            this.showMessage('Please fill in all required fields', 'error');
            return;
        }
        
        const newTemplate = {
            id: this.designTemplates.length + 1,
            title: templateTitleInput.value.trim(),
            type: eventTypeInput.dataset.value,
            category: eventTypeInput.value,
            image: this.getDefaultImage(eventTypeInput.dataset.value),
            createdDate: new Date().toLocaleDateString('en-GB'),
            updatedDate: new Date().toLocaleDateString('en-GB')
        };
        
        this.designTemplates.push(newTemplate);
        this.filteredDesignTemplates = [...this.designTemplates];
        this.renderDesignTemplates();
        
        // Reset form
        templateTitleInput.value = '';
        
        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('createDesignTemplateModal'));
        modal.hide();
        
        this.showMessage('Design template created successfully!', 'success');
    }
    
    viewMoodBoard(templateId) {
        const template = this.designTemplates.find(t => t.id === templateId);
        if (template) {
            window.location.href = `mood-board.html?id=${templateId}`;
        }
    }
    
    editDesignTemplate(templateId) {
        this.showMessage('Edit functionality will be implemented soon', 'info');
    }
    
    deleteDesignTemplate(templateId) {
        if (confirm('Are you sure you want to delete this design template?')) {
            this.designTemplates = this.designTemplates.filter(t => t.id !== templateId);
            this.filteredDesignTemplates = this.filteredDesignTemplates.filter(t => t.id !== templateId);
            this.renderDesignTemplates();
            this.showMessage('Design template deleted successfully!', 'success');
        }
    }
    
    // Budget Template Methods
    handleBudgetSearch(searchTerm) {
        const filtered = this.budgetTemplates.filter(template => 
            template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            template.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        this.filteredBudgetTemplates = filtered;
        this.renderBudgetTemplates();
    }
    
    handleBudgetFilter(eventType) {
        if (eventType) {
            this.filteredBudgetTemplates = this.budgetTemplates.filter(template => 
                template.type === eventType
            );
        } else {
            this.filteredBudgetTemplates = [...this.budgetTemplates];
        }
        
        this.renderBudgetTemplates();
    }
    
    renderBudgetTemplates() {
        const grid = document.getElementById('budgetTemplateGrid');
        if (!grid) return;
        
        if (this.filteredBudgetTemplates.length === 0) {
            grid.innerHTML = `
                <div class="col-12 text-center py-5">
                    <i class="fas fa-search fa-3x text-muted mb-3"></i>
                    <h4>No Budget Templates Found</h4>
                    <p class="text-muted">Try adjusting your search or filter criteria</p>
                </div>
            `;
            return;
        }
        
        const templatesHTML = this.filteredBudgetTemplates.map(template => `
            <div class="budget-template-card" onclick="templateManager.viewBudgetDetails(${template.id})">
                <div class="budget-card-image" style="background-image: url('${template.image}')"></div>
                <div class="budget-card-content">
                    <div class="budget-card-meta">
                        <span class="budget-project-type">Project Type:</span>
                        <span class="budget-event-type">${template.category}</span>
                        <div class="budget-card-icons">
                            <i class="fas fa-eye budget-card-icon" title="View"></i>
                            <i class="fas fa-heart budget-card-icon" title="Favorite"></i>
                        </div>
                    </div>
                    <div class="budget-card-title-row">
                        <h3 class="budget-card-title">${template.title}</h3>
                        <div class="budget-card-actions">
                            <button class="budget-action-btn edit" onclick="event.stopPropagation(); templateManager.editBudgetTemplate(${template.id})" title="Edit">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="budget-action-btn delete" onclick="event.stopPropagation(); templateManager.deleteBudgetTemplate(${template.id})" title="Delete">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                    <p class="budget-card-date">Created On: ${template.createdDate}</p>
                </div>
            </div>
        `).join('');
        
        grid.innerHTML = templatesHTML;
    }
    
    handleCreateBudgetTemplate() {
        const eventTypeInput = document.getElementById('budgetEventType');
        const templateTitleInput = document.getElementById('budgetTemplateTitle');
        
        if (!eventTypeInput.dataset.value || !templateTitleInput.value.trim()) {
            this.showMessage('Please fill in all required fields', 'error');
            return;
        }
        
        const newTemplate = {
            id: this.budgetTemplates.length + 1,
            title: templateTitleInput.value.trim(),
            type: eventTypeInput.dataset.value,
            category: eventTypeInput.value,
            image: this.getDefaultImage(eventTypeInput.dataset.value),
            createdDate: new Date().toLocaleDateString('en-GB'),
            updatedDate: new Date().toLocaleDateString('en-GB')
        };
        
        this.budgetTemplates.push(newTemplate);
        this.filteredBudgetTemplates = [...this.budgetTemplates];
        this.renderBudgetTemplates();
        
        // Reset form
        templateTitleInput.value = '';
        
        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('createBudgetTemplateModal'));
        modal.hide();
        
        this.showMessage('Budget template created successfully!', 'success');
    }
    
    viewBudgetDetails(templateId) {
        this.currentBudgetId = templateId;
        const modal = new bootstrap.Modal(document.getElementById('budgetDetailsModal'));
        modal.show();
    }
    
    handleSaveBudgetDetails() {
        const budgetTitle = document.getElementById('budgetTitle').value.trim();
        if (!budgetTitle) {
            this.showMessage('Please enter a title', 'error');
            return;
        }
        
        // Navigate to budget detail page
        window.location.href = 'budget-detail.html';
    }
    
    editBudgetTemplate(templateId) {
        this.showMessage('Edit functionality will be implemented soon', 'info');
    }
    
    deleteBudgetTemplate(templateId) {
        if (confirm('Are you sure you want to delete this budget template?')) {
            this.budgetTemplates = this.budgetTemplates.filter(t => t.id !== templateId);
            this.filteredBudgetTemplates = this.filteredBudgetTemplates.filter(t => t.id !== templateId);
            this.renderBudgetTemplates();
            this.showMessage('Budget template deleted successfully!', 'success');
        }
    }
    
    // Questionnaire template methods
    handleQuestionnaireSearch(searchTerm) {
        this.filteredQuestionnaireTemplates = this.questionnaireTemplates.filter(template =>
            template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            template.type.toLowerCase().includes(searchTerm.toLowerCase())
        );
        this.renderQuestionnaireTemplates();
    }
    
    handleQuestionnaireFilter(eventType) {
        if (!eventType) {
            this.filteredQuestionnaireTemplates = [...this.questionnaireTemplates];
        } else {
            this.filteredQuestionnaireTemplates = this.questionnaireTemplates.filter(template => 
                template.type === eventType
            );
        }
        this.renderQuestionnaireTemplates();
    }
    
    renderQuestionnaireTemplates() {
        const grid = document.getElementById('questionnaireTemplateGrid');
        if (!grid) return;
        
        grid.innerHTML = this.filteredQuestionnaireTemplates.map(template => `
            <div class="questionnaire-template-card" onclick="templateManager.viewQuestionnaireTemplate(${template.id})">
                <div class="questionnaire-card-image" style="background-image: url('${template.image}')">
                    <div class="questionnaire-card-actions">
                        <button class="questionnaire-action-btn" onclick="event.stopPropagation(); templateManager.editQuestionnaireTemplate(${template.id})" title="Edit">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="questionnaire-action-btn delete" onclick="event.stopPropagation(); templateManager.deleteQuestionnaireTemplate(${template.id})" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="questionnaire-card-content">
                    <div class="questionnaire-card-meta">
                        <span class="questionnaire-project-type">Project Type:</span>
                        <span class="questionnaire-event-type">${template.category}</span>
                    </div>
                    <h3 class="questionnaire-card-title">${template.title}</h3>
                    <div class="questionnaire-card-date">Created On: ${template.createdDate}</div>
                </div>
            </div>
        `).join('');
    }
    
    handleCreateQuestionnaireTemplate() {
        const eventTypeInput = document.getElementById('questionnaireEventType');
        const titleInput = document.getElementById('questionnaireTemplateTitle');
        
        if (!eventTypeInput.value || !titleInput.value) {
            this.showMessage('Please fill in all fields', 'error');
            return;
        }
        
        const newTemplate = {
            id: this.questionnaireTemplates.length + 1,
            title: titleInput.value,
            type: eventTypeInput.value.toLowerCase().replace(' ', '-'),
            category: eventTypeInput.value,
            image: this.getDefaultImage(eventTypeInput.value.toLowerCase()),
            createdDate: new Date().toLocaleDateString('en-GB'),
            updatedDate: new Date().toLocaleDateString('en-GB')
        };
        
        this.questionnaireTemplates.push(newTemplate);
        this.filteredQuestionnaireTemplates = [...this.questionnaireTemplates];
        this.renderQuestionnaireTemplates();
        
        // Reset form
        eventTypeInput.value = '';
        titleInput.value = '';
        
        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('createQuestionnaireTemplateModal'));
        modal.hide();
        
        this.showMessage('Questionnaire template created successfully!', 'success');
    }
    
    viewQuestionnaireTemplate(templateId) {
        // Store the template ID for the detail page
        localStorage.setItem('currentQuestionnaireId', templateId);
        
        // Navigate to questionnaire detail page
        window.location.href = 'questionnaire-detail.html';
    }
    
    editQuestionnaireTemplate(templateId) {
        this.showMessage('Edit functionality will be implemented soon', 'info');
    }
    
    deleteQuestionnaireTemplate(templateId) {
        if (confirm('Are you sure you want to delete this questionnaire template?')) {
            this.questionnaireTemplates = this.questionnaireTemplates.filter(t => t.id !== templateId);
            this.filteredQuestionnaireTemplates = this.filteredQuestionnaireTemplates.filter(t => t.id !== templateId);
            this.renderQuestionnaireTemplates();
            this.showMessage('Questionnaire template deleted successfully!', 'success');
        }
    }
    
    editTemplate(templateId) {
        const template = this.templates.find(t => t.id === templateId);
        if (template) {
            this.showMessage('Edit functionality would open edit form', 'info');
        }
    }
    
    deleteTemplate(templateId) {
        const template = this.templates.find(t => t.id === templateId);
        if (template && confirm(`Are you sure you want to delete "${template.title}"?`)) {
            this.templates = this.templates.filter(t => t.id !== templateId);
            this.filteredTemplates = this.filteredTemplates.filter(t => t.id !== templateId);
            this.renderTemplates();
            this.showMessage('Template deleted successfully', 'success');
        }
    }
    
    showMessage(message, type = 'info') {
        const alertClass = type === 'error' ? 'danger' : type === 'success' ? 'success' : 'info';
        const messageEl = document.createElement('div');
        messageEl.className = `alert alert-${alertClass} alert-dismissible fade show`;
        messageEl.style.cssText = 'position: fixed; top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
        messageEl.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(messageEl);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.remove();
            }
        }, 5000);
    }
    
    // Notes Tab Functions
    initializeNotesData() {
        // Setup Notes tab event listeners
        const notesEventFilter = document.getElementById('notesEventFilter');
        const notesSearch = document.getElementById('notesSearch');
        const createNotesTemplateBtn = document.getElementById('createNotesTemplateBtn');
        const notesBudgetDetailsBtn = document.getElementById('notesBudgetDetailsBtn');
        const addNoteBtn = document.getElementById('addNoteBtn');
        const confirmDeleteNoteBtn = document.getElementById('confirmDeleteNoteBtn');
        const addAttachmentBtn = document.getElementById('addAttachmentBtn');
        
        if (notesEventFilter) {
            notesEventFilter.addEventListener('change', (e) => {
                this.handleNotesFilter(e.target.value);
            });
        }
        
        if (notesSearch) {
            notesSearch.addEventListener('input', (e) => {
                this.handleNotesSearch(e.target.value);
            });
        }
        
        if (createNotesTemplateBtn) {
            createNotesTemplateBtn.addEventListener('click', () => {
                this.handleCreateNotesTemplate();
            });
        }
        
        if (notesBudgetDetailsBtn) {
            notesBudgetDetailsBtn.addEventListener('click', () => {
                this.handleNotesBudgetDetails();
            });
        }
        
        if (addNoteBtn) {
            addNoteBtn.addEventListener('click', () => {
                this.handleAddNote();
            });
        }
        
        if (confirmDeleteNoteBtn) {
            confirmDeleteNoteBtn.addEventListener('click', () => {
                this.confirmDeleteNote();
            });
        }
        
        if (addAttachmentBtn) {
            addAttachmentBtn.addEventListener('click', () => {
                this.handleAddAttachment();
            });
        }
        
        // Setup dropdown for Notes event type
        this.setupNotesDropdown();
    }
    
    setupNotesDropdown() {
        const dropdown = document.getElementById('notesEventTypeDropdown');
        if (dropdown) {
            dropdown.addEventListener('click', (e) => {
                if (e.target.classList.contains('dropdown-item')) {
                    const input = document.getElementById('notesEventType');
                    const value = e.target.getAttribute('data-value');
                    const text = e.target.textContent;
                    
                    input.value = text;
                    input.setAttribute('data-value', value);
                    
                    // Remove active class from all items and add to selected
                    dropdown.querySelectorAll('.dropdown-item').forEach(item => {
                        item.classList.remove('active');
                    });
                    e.target.classList.add('active');
                }
            });
        }
    }
    
    renderNotesTemplates() {
        const notesGrid = document.getElementById('notesGrid');
        if (!notesGrid) return;
        
        if (this.filteredNotesTemplates.length === 0) {
            notesGrid.innerHTML = `
                <div class="text-center py-5" style="grid-column: 1/-1;">
                    <i class="fas fa-sticky-note fa-3x text-muted mb-3"></i>
                    <h4>No notes templates found</h4>
                    <p class="text-muted">Create your first notes template to get started</p>
                </div>
            `;
            return;
        }
        
        notesGrid.innerHTML = this.filteredNotesTemplates.map(template => `
            <div class="notes-card" onclick="templateManager.viewNotesTemplate(${template.id})" 
                 onmouseenter="templateManager.showNotesBudgetModal(${template.id})">
                <div class="notes-card-image" style="background-image: url('${template.image}')">
                    <div class="notes-card-actions">
                        <button class="notes-action-btn" onclick="event.stopPropagation(); templateManager.editNotesTemplate(${template.id})" title="Edit">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="notes-action-btn delete" onclick="event.stopPropagation(); templateManager.deleteNotesTemplate(${template.id})" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="notes-card-content">
                    <div class="notes-card-badges">
                        <span class="notes-badge">Project Type</span>
                        <span class="notes-badge">${template.eventType}</span>
                        <span class="notes-badge"><i class="fas fa-heart text-danger"></i></span>
                        <span class="notes-badge"><i class="fas fa-bookmark text-warning"></i></span>
                    </div>
                    <h3 class="notes-card-title">${template.title}</h3>
                    <div class="notes-card-meta">
                        <span>${template.updatedDate ? 'Updated On:' : 'Created On:'} ${template.updatedDate || template.createdDate}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    handleNotesSearch(searchTerm) {
        this.filteredNotesTemplates = this.notesTemplates.filter(template => 
            template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            template.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
        this.renderNotesTemplates();
    }
    
    handleNotesFilter(eventType) {
        if (eventType === '') {
            this.filteredNotesTemplates = [...this.notesTemplates];
        } else {
            this.filteredNotesTemplates = this.notesTemplates.filter(template => template.type === eventType);
        }
        this.renderNotesTemplates();
    }
    
    handleCreateNotesTemplate() {
        const eventTypeInput = document.getElementById('notesEventType');
        const titleInput = document.getElementById('notesTemplateTitle');
        
        if (!eventTypeInput.value || !titleInput.value.trim()) {
            this.showMessage('Please fill in all required fields', 'error');
            return;
        }
        
        const newTemplate = {
            id: Date.now(),
            title: titleInput.value.trim(),
            type: eventTypeInput.getAttribute('data-value') || 'wedding',
            category: eventTypeInput.value,
            image: this.getDefaultImage(eventTypeInput.getAttribute('data-value') || 'wedding'),
            createdDate: new Date().toLocaleDateString('en-GB'),
            eventType: eventTypeInput.value
        };
        
        this.notesTemplates.push(newTemplate);
        this.filteredNotesTemplates = [...this.notesTemplates];
        this.renderNotesTemplates();
        
        // Reset form
        eventTypeInput.value = '';
        titleInput.value = '';
        
        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('createNotesTemplateModal'));
        modal.hide();
        
        this.showMessage('Notes template created successfully!', 'success');
    }
    
    showNotesBudgetModal(templateId) {
        // Only show on actual hover, not when clicking
        setTimeout(() => {
            const modal = new bootstrap.Modal(document.getElementById('notesBudgetDetailsModal'));
            modal.show();
        }, 500);
    }
    
    handleNotesBudgetDetails() {
        const titleInput = document.getElementById('notesBudgetTitle');
        
        if (!titleInput.value.trim()) {
            this.showMessage('Please enter a title', 'error');
            return;
        }
        
        // Close current modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('notesBudgetDetailsModal'));
        modal.hide();
        
        // Navigate to notes detail view
        setTimeout(() => {
            this.showNotesDetailView();
        }, 300);
    }
    
    showNotesDetailView() {
        // Hide the notes grid and show detail view
        const notesTab = document.getElementById('notes');
        notesTab.innerHTML = `
            <div class="notes-detail-container">
                <div class="notes-detail-header">
                    <div class="d-flex align-items-center">
                        <button class="btn btn-link p-0 me-3" onclick="templateManager.backToNotesGrid()">
                            <i class="fas fa-arrow-left"></i>
                        </button>
                        <h2 class="notes-detail-title">Notes</h2>
                    </div>
                    <div class="notes-detail-actions">
                        <button class="archived-btn" onclick="templateManager.toggleArchived()">
                            <i class="fas fa-archive"></i>
                            ${this.showArchived ? 'Active' : 'Archived'}
                        </button>
                        <button class="add-notes-btn" onclick="templateManager.showAddNoteModal()">
                            Add Notes
                        </button>
                    </div>
                </div>
                
                <div class="notes-list" id="notesList">
                    ${this.renderNotesList()}
                </div>
            </div>
        `;
    }
    
    renderNotesList() {
        const filteredNotes = this.notes.filter(note => 
            this.showArchived ? note.status === 'archived' : note.status === 'active'
        );
        
        if (filteredNotes.length === 0) {
            return `
                <div class="text-center py-5">
                    <i class="fas fa-sticky-note fa-3x text-muted mb-3"></i>
                    <h4>No ${this.showArchived ? 'archived' : 'active'} notes found</h4>
                    <p class="text-muted">Add some notes to get started</p>
                </div>
            `;
        }
        
        return filteredNotes.map(note => `
            <div class="note-item">
                <div class="note-header">
                    <div class="note-author">
                        <div class="note-avatar" style="background-color: ${note.avatarColor}">
                            ${note.initials}
                        </div>
                        <div class="note-author-info">
                            <h6>${note.author}</h6>
                            <p class="note-date">${note.date}</p>
                        </div>
                    </div>
                    <div class="note-actions">
                        <span class="note-status ${note.status}">${note.status === 'archived' ? 'Archived' : 'Active'}</span>
                        <button class="note-action-btn" onclick="templateManager.showAttachmentsModal(${note.id})" title="Attachment">
                            <i class="fas fa-paperclip"></i>
                        </button>
                        <button class="note-action-btn" onclick="templateManager.editNote(${note.id})" title="Edit">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="note-action-btn delete" onclick="templateManager.showDeleteNoteModal(${note.id})" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                        <button class="note-action-btn archive" onclick="templateManager.toggleNoteArchive(${note.id})" title="${note.status === 'archived' ? 'Unarchive' : 'Archive'}">
                            <i class="fas fa-${note.status === 'archived' ? 'folder-open' : 'archive'}"></i>
                        </button>
                    </div>
                </div>
                <div class="note-content">
                    ${note.content}
                </div>
            </div>
        `).join('');
    }
    
    backToNotesGrid() {
        const notesTab = document.getElementById('notes');
        notesTab.innerHTML = `
            <div class="template-header">
                <h2>Notes</h2>
                <div class="template-controls">
                    <div class="filter-dropdown">
                        <select id="notesEventFilter">
                            <option value="">Filter by Event</option>
                            <option value="wedding">Wedding</option>
                            <option value="birthday">Birthday Party</option>
                            <option value="corporate">Corporate Event</option>
                            <option value="baby-shower">Baby Shower</option>
                            <option value="anniversary">Anniversary</option>
                        </select>
                    </div>
                    <div class="search-box">
                        <i class="fas fa-search search-icon"></i>
                        <input type="text" placeholder="Search..." id="notesSearch">
                    </div>
                    <button class="create-template-btn" data-bs-toggle="modal" data-bs-target="#createNotesTemplateModal">
                        Create New Template
                    </button>
                </div>
            </div>
            <div class="notes-grid" id="notesGrid">
                <!-- Notes cards populated by JavaScript -->
            </div>
        `;
        
        // Re-initialize event listeners and render
        this.initializeNotesData();
        this.renderNotesTemplates();
    }
    
    toggleArchived() {
        this.showArchived = !this.showArchived;
        this.showNotesDetailView();
    }
    
    showAddNoteModal() {
        const modal = new bootstrap.Modal(document.getElementById('addNoteModal'));
        modal.show();
    }
    
    handleAddNote() {
        const noteText = document.getElementById('noteText');
        
        if (!noteText.value.trim()) {
            this.showMessage('Please enter note content', 'error');
            return;
        }
        
        const newNote = {
            id: Date.now(),
            author: "John Doe",
            initials: "JD",
            date: new Date().toLocaleDateString('en-GB'),
            content: noteText.value.trim(),
            status: "active",
            avatarColor: "#22c55e"
        };
        
        this.notes.push(newNote);
        
        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('addNoteModal'));
        modal.hide();
        
        // Show success modal
        setTimeout(() => {
            const successModal = new bootstrap.Modal(document.getElementById('noteSuccessModal'));
            successModal.show();
        }, 300);
        
        // Reset form
        noteText.value = '';
        
        // Refresh notes list
        this.showNotesDetailView();
    }
    
    editNote(noteId) {
        const note = this.notes.find(n => n.id === noteId);
        if (note) {
            // Pre-fill the add note modal with existing content
            document.getElementById('noteText').value = note.content;
            document.getElementById('addNoteModalLabel').textContent = 'Edit Note';
            document.getElementById('addNoteBtn').textContent = 'Update';
            document.getElementById('addNoteBtn').onclick = () => this.updateNote(noteId);
            
            const modal = new bootstrap.Modal(document.getElementById('addNoteModal'));
            modal.show();
        }
    }
    
    updateNote(noteId) {
        const noteText = document.getElementById('noteText');
        const note = this.notes.find(n => n.id === noteId);
        
        if (!noteText.value.trim()) {
            this.showMessage('Please enter note content', 'error');
            return;
        }
        
        if (note) {
            note.content = noteText.value.trim();
            note.date = new Date().toLocaleDateString('en-GB');
        }
        
        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('addNoteModal'));
        modal.hide();
        
        // Show success modal
        setTimeout(() => {
            const successModal = new bootstrap.Modal(document.getElementById('updateSuccessModal'));
            successModal.show();
        }, 300);
        
        // Reset modal
        document.getElementById('addNoteModalLabel').textContent = 'Add Note';
        document.getElementById('addNoteBtn').textContent = 'Add';
        document.getElementById('addNoteBtn').onclick = () => this.handleAddNote();
        noteText.value = '';
        
        // Refresh notes list
        this.showNotesDetailView();
    }
    
    showDeleteNoteModal(noteId) {
        this.currentNoteId = noteId;
        const modal = new bootstrap.Modal(document.getElementById('deleteNoteModal'));
        modal.show();
    }
    
    confirmDeleteNote() {
        if (this.currentNoteId) {
            this.notes = this.notes.filter(n => n.id !== this.currentNoteId);
            
            // Close modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('deleteNoteModal'));
            modal.hide();
            
            // Refresh notes list
            this.showNotesDetailView();
            this.showMessage('Note deleted successfully!', 'success');
            this.currentNoteId = null;
        }
    }
    
    toggleNoteArchive(noteId) {
        const note = this.notes.find(n => n.id === noteId);
        if (note) {
            note.status = note.status === 'archived' ? 'active' : 'archived';
            this.showNotesDetailView();
            this.showMessage(`Note ${note.status === 'archived' ? 'archived' : 'unarchived'} successfully!`, 'success');
        }
    }
    
    showAttachmentsModal(noteId) {
        const modal = new bootstrap.Modal(document.getElementById('attachmentsModal'));
        modal.show();
    }
    
    handleAddAttachment() {
        const title = document.getElementById('attachmentTitle');
        
        if (!title.value.trim()) {
            this.showMessage('Please enter attachment title', 'error');
            return;
        }
        
        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('attachmentsModal'));
        modal.hide();
        
        this.showMessage('Attachment added successfully!', 'success');
        title.value = '';
    }
    
    viewNotesTemplate(templateId) {
        this.showNotesDetailView();
    }
    
    editNotesTemplate(templateId) {
        this.showMessage('Edit functionality will be implemented soon', 'info');
    }
    
    deleteNotesTemplate(templateId) {
        if (confirm('Are you sure you want to delete this notes template?')) {
            this.notesTemplates = this.notesTemplates.filter(t => t.id !== templateId);
            this.filteredNotesTemplates = this.filteredNotesTemplates.filter(t => t.id !== templateId);
            this.renderNotesTemplates();
            this.showMessage('Notes template deleted successfully!', 'success');
        }
    }
    
    // Proposals Template Methods
    renderProposalsTemplates() {
        const grid = document.getElementById('proposalsGrid');
        if (!grid) return;
        
        if (this.filteredProposals.length === 0) {
            grid.innerHTML = `
                <div class="text-center py-5">
                    <i class="fas fa-file-contract fa-3x text-muted mb-3"></i>
                    <h4>No proposals found</h4>
                    <p class="text-muted">Create your first proposal template</p>
                </div>
            `;
            return;
        }
        
        grid.innerHTML = this.filteredProposals.map((proposal, index) => `
            <div class="template-card" onclick="templateManager.viewProposal(${proposal.id})">
                <div class="template-card-image" style="background-image: url('${this.getTemplateImage(index)}')">
                    <div class="template-card-overlay"></div>
                </div>
                <div class="template-card-content">
                    <div class="template-card-info">
                        <div class="template-card-left">
                            <h3 class="template-title">${proposal.title}</h3>
                            <p class="template-date">Updated On: ${proposal.updatedDate}</p>
                        </div>
                        <div class="template-card-icons">
                            <div class="template-icon red">
                                <i class="fas fa-heart"></i>
                            </div>
                            <div class="template-icon green">
                                <i class="fas fa-bookmark"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    handleProposalsSearch(searchTerm) {
        this.filteredProposals = this.proposals.filter(proposal => 
            proposal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            proposal.clientName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        this.renderProposalsTemplates();
    }
    
    handleCreateProposalsTemplate() {
        const eventType = document.getElementById('proposalsEventType').value;
        const title = document.getElementById('proposalsTemplateTitle').value;
        
        if (!title.trim()) {
            this.showMessage('Please enter a title', 'error');
            return;
        }
        
        const newProposal = {
            id: Date.now(),
            title: title.trim(),
            type: eventType.toLowerCase(),
            category: eventType,
            clientName: 'New Client',
            amount: '$0',
            status: 'pending',
            createdDate: new Date().toLocaleDateString('en-GB'),
            updatedDate: new Date().toLocaleDateString('en-GB')
        };
        
        this.proposals.push(newProposal);
        this.filteredProposals = [...this.proposals];
        this.renderProposalsTemplates();
        
        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('createProposalsTemplateModal'));
        modal.hide();
        
        // Reset form
        document.getElementById('proposalsTemplateTitle').value = '';
        this.showMessage('Proposal template created successfully!', 'success');
    }
    
    viewProposal(proposalId) {
        window.location.href = `proposal-detail.html?id=${proposalId}`;
    }
    
    editProposal(proposalId) {
        this.showMessage('Edit functionality will be implemented soon', 'info');
    }
    
    deleteProposal(proposalId) {
        if (confirm('Are you sure you want to delete this proposal?')) {
            this.proposals = this.proposals.filter(p => p.id !== proposalId);
            this.filteredProposals = this.filteredProposals.filter(p => p.id !== proposalId);
            this.renderProposalsTemplates();
            this.showMessage('Proposal deleted successfully!', 'success');
        }
    }
    
    // Contracts Template Methods
    renderContractsTemplates() {
        const grid = document.getElementById('contractsGrid');
        if (!grid) return;
        
        if (this.filteredContracts.length === 0) {
            grid.innerHTML = `
                <div class="text-center py-5">
                    <i class="fas fa-handshake fa-3x text-muted mb-3"></i>
                    <h4>No contracts found</h4>
                    <p class="text-muted">Create your first contract template</p>
                </div>
            `;
            return;
        }
        
        grid.innerHTML = this.filteredContracts.map((contract, index) => `
            <div class="template-card" onclick="templateManager.viewContract(${contract.id})">
                <div class="template-card-image" style="background-image: url('${this.getTemplateImage(index)}')">
                    <div class="template-card-overlay"></div>
                </div>
                <div class="template-card-content">
                    <div class="template-card-info">
                        <div class="template-card-left">
                            <h3 class="template-title">${contract.title}</h3>
                            <p class="template-date">Updated On: ${contract.updatedDate}</p>
                        </div>
                        <div class="template-card-icons">
                            <div class="template-icon red">
                                <i class="fas fa-heart"></i>
                            </div>
                            <div class="template-icon green">
                                <i class="fas fa-bookmark"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    handleContractsSearch(searchTerm) {
        this.filteredContracts = this.contracts.filter(contract => 
            contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contract.clientName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        this.renderContractsTemplates();
    }
    
    handleCreateContractsTemplate() {
        const eventType = document.getElementById('contractsEventType').value;
        const title = document.getElementById('contractsTemplateTitle').value;
        
        if (!title.trim()) {
            this.showMessage('Please enter a title', 'error');
            return;
        }
        
        const newContract = {
            id: Date.now(),
            title: title.trim(),
            type: eventType.toLowerCase(),
            category: eventType,
            clientName: 'New Client',
            amount: '$0',
            status: 'pending',
            createdDate: new Date().toLocaleDateString('en-GB'),
            updatedDate: new Date().toLocaleDateString('en-GB')
        };
        
        this.contracts.push(newContract);
        this.filteredContracts = [...this.contracts];
        this.renderContractsTemplates();
        
        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('createContractsTemplateModal'));
        modal.hide();
        
        // Reset form
        document.getElementById('contractsTemplateTitle').value = '';
        this.showMessage('Contract template created successfully!', 'success');
    }
    
    viewContract(contractId) {
        // Show contract detail view within the tab
        this.currentContractId = contractId;
        document.getElementById('contractsListView').style.display = 'none';
        document.getElementById('contractDetailView').style.display = 'block';
        
        // Update title
        const contract = this.contracts.find(c => c.id === contractId);
        document.getElementById('contractDetailTitle').textContent = contract ? contract.title : `Contract ${contractId}`;
        
        // Load contract data (if exists)
        this.loadContractDetailData(contractId);
    }

    showContractsList() {
        document.getElementById('contractDetailView').style.display = 'none';
        document.getElementById('contractsListView').style.display = 'block';
        this.currentContractId = null;
    }

    loadContractDetailData(contractId) {
        const contract = this.contracts.find(c => c.id === contractId);
        if (contract) {
            // Load any existing data
            document.getElementById('partyAName').value = contract.partyAName || '';
            document.getElementById('partyBName').value = contract.partyBName || '';
            document.getElementById('effectiveDate').value = contract.effectiveDate || '';
            document.getElementById('executiveSummary').value = contract.executiveSummary || '';
            document.getElementById('timeline').value = contract.timeline || '';
            document.getElementById('termsConditions').value = contract.termsConditions || '';
        }
    }

    saveContract() {
        if (!this.currentContractId) return;
        
        const formData = {
            partyAName: document.getElementById('partyAName').value,
            partyBName: document.getElementById('partyBName').value,
            effectiveDate: document.getElementById('effectiveDate').value,
            executiveSummary: document.getElementById('executiveSummary').value,
            timeline: document.getElementById('timeline').value,
            termsConditions: document.getElementById('termsConditions').value
        };

        // Update contract data
        const contractIndex = this.contracts.findIndex(c => c.id === this.currentContractId);
        if (contractIndex !== -1) {
            this.contracts[contractIndex] = { ...this.contracts[contractIndex], ...formData };
            this.showMessage('Contract saved successfully!', 'success');
            
            // Go back to list view
            setTimeout(() => {
                this.showContractsList();
            }, 1500);
        }
    }

    downloadContract() {
        this.showMessage('Contract downloaded successfully!', 'success');
    }

    uploadContractFile() {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.pdf,.doc,.docx';
        
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                this.showMessage(`File "${file.name}" uploaded successfully!`, 'success');
            }
        });
        
        fileInput.click();
    }
    
    editContract(contractId) {
        this.showMessage('Edit functionality will be implemented soon', 'info');
    }
    
    deleteContract(contractId) {
        if (confirm('Are you sure you want to delete this contract?')) {
            this.contracts = this.contracts.filter(c => c.id !== contractId);
            this.filteredContracts = this.filteredContracts.filter(c => c.id !== contractId);
            this.renderContractsTemplates();
            this.showMessage('Contract deleted successfully!', 'success');
        }
    }
    
    // Quotes Template Methods
    renderQuotesTemplates() {
        const grid = document.getElementById('quotesGrid');
        if (!grid) return;
        
        if (this.filteredQuotes.length === 0) {
            grid.innerHTML = `
                <div class="text-center py-5">
                    <i class="fas fa-quote-left fa-3x text-muted mb-3"></i>
                    <h4>No quotes found</h4>
                    <p class="text-muted">Create your first quote template</p>
                </div>
            `;
            return;
        }
        
        grid.innerHTML = this.filteredQuotes.map((quote, index) => `
            <div class="template-card" onclick="templateManager.viewQuote(${quote.id})">
                <div class="template-card-image" style="background-image: url('${this.getTemplateImage(index)}')">
                    <div class="template-card-overlay"></div>
                </div>
                <div class="template-card-content">
                    <div class="template-card-info">
                        <div class="template-card-left">
                            <h3 class="template-title">${quote.title}</h3>
                            <p class="template-date">Updated On: ${quote.updatedDate}</p>
                        </div>
                        <div class="template-card-icons">
                            <div class="template-icon red">
                                <i class="fas fa-heart"></i>
                            </div>
                            <div class="template-icon green">
                                <i class="fas fa-bookmark"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    handleQuotesSearch(searchTerm) {
        this.filteredQuotes = this.quotes.filter(quote => 
            quote.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            quote.clientName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        this.renderQuotesTemplates();
    }
    
    handleCreateQuotesTemplate() {
        const eventType = document.getElementById('quotesEventType').value;
        const title = document.getElementById('quotesTemplateTitle').value;
        
        if (!title.trim()) {
            this.showMessage('Please enter a title', 'error');
            return;
        }
        
        const newQuote = {
            id: Date.now(),
            title: title.trim(),
            type: eventType.toLowerCase(),
            category: eventType,
            clientName: 'New Client',
            amount: '$0',
            status: 'pending',
            createdDate: new Date().toLocaleDateString('en-GB'),
            updatedDate: new Date().toLocaleDateString('en-GB')
        };
        
        this.quotes.push(newQuote);
        this.filteredQuotes = [...this.quotes];
        this.renderQuotesTemplates();
        
        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('createQuotesTemplateModal'));
        modal.hide();
        
        // Reset form
        document.getElementById('quotesTemplateTitle').value = '';
        this.showMessage('Quote template created successfully!', 'success');
    }
    
    viewQuote(quoteId) {
        // Show quote detail view within the tab
        this.currentQuoteId = quoteId;
        document.getElementById('quotesListView').style.display = 'none';
        document.getElementById('quoteDetailView').style.display = 'block';
        
        // Update title
        const quote = this.quotes.find(q => q.id === quoteId);
        document.getElementById('quoteDetailTitle').textContent = quote ? quote.title : `Quote ${quoteId}`;
        
        // Load quote data (if exists)
        this.loadQuoteDetailData(quoteId);
    }

    showQuotesList() {
        document.getElementById('quoteDetailView').style.display = 'none';
        document.getElementById('quotesListView').style.display = 'block';
        this.currentQuoteId = null;
    }

    loadQuoteDetailData(quoteId) {
        const quote = this.quotes.find(q => q.id === quoteId);
        if (quote) {
            // Load any existing data
            document.getElementById('clientName').value = quote.clientName || '';
            document.getElementById('quoteDate').value = quote.quoteDate || '';
            document.getElementById('additionalComments').value = quote.additionalComments || '';
            
            // Load quote items if they exist
            if (quote.items && quote.items.length > 0) {
                this.loadQuoteItems(quote.items);
            }
        }
        
        // Calculate initial total
        this.calculateQuoteTotal();
    }

    loadQuoteItems(items) {
        const tbody = document.getElementById('quoteItemsBody');
        tbody.innerHTML = '';
        
        items.forEach(item => {
            const row = this.createQuoteItemRow(item.name, item.description, item.price);
            tbody.appendChild(row);
        });
        
        // Ensure at least one row exists
        if (items.length === 0) {
            this.addQuoteItem();
        }
    }

    createQuoteItemRow(itemName = '', description = '', price = '') {
        const row = document.createElement('tr');
        row.className = 'quote-item-row';
        row.innerHTML = `
            <td><input type="text" class="form-control" placeholder="Item name" value="${itemName}"></td>
            <td><input type="text" class="form-control" placeholder="Description" value="${description}"></td>
            <td>
                <div class="input-group">
                    <span class="input-group-text">$</span>
                    <input type="number" class="form-control quote-price" value="${price}" onchange="templateManager.calculateQuoteTotal()">
                </div>
            </td>
            <td>
                <button type="button" class="btn btn-sm btn-outline-danger" onclick="templateManager.removeQuoteItem(this)">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        return row;
    }

    addQuoteItem() {
        const tbody = document.getElementById('quoteItemsBody');
        const row = this.createQuoteItemRow();
        tbody.appendChild(row);
        
        // Focus on the first input of the new row
        const firstInput = row.querySelector('input[type="text"]');
        if (firstInput) {
            firstInput.focus();
        }
    }

    removeQuoteItem(button) {
        const row = button.closest('tr');
        const tbody = document.getElementById('quoteItemsBody');
        
        // Don't remove if it's the last row
        if (tbody.children.length > 1) {
            row.remove();
            this.calculateQuoteTotal();
        } else {
            this.showMessage('At least one item is required', 'warning');
        }
    }

    calculateQuoteTotal() {
        const priceInputs = document.querySelectorAll('.quote-price');
        let total = 0;
        
        priceInputs.forEach(input => {
            const value = parseFloat(input.value) || 0;
            total += value;
        });
        
        const totalElement = document.getElementById('quoteTotal');
        if (totalElement) {
            totalElement.textContent = `$ ${total.toLocaleString()}`;
        }
        
        return total;
    }

    saveQuote() {
        if (!this.currentQuoteId) return;
        
        // Collect quote items
        const quoteItems = [];
        const rows = document.querySelectorAll('#quoteItemsBody .quote-item-row');
        
        rows.forEach(row => {
            const inputs = row.querySelectorAll('input');
            const item = {
                name: inputs[0].value || '',
                description: inputs[1].value || '',
                price: parseFloat(inputs[2].value) || 0
            };
            if (item.name || item.description || item.price) {
                quoteItems.push(item);
            }
        });
        
        const formData = {
            clientName: document.getElementById('clientName').value,
            quoteDate: document.getElementById('quoteDate').value,
            additionalComments: document.getElementById('additionalComments').value,
            items: quoteItems,
            total: this.calculateQuoteTotal()
        };

        // Update quote data
        const quoteIndex = this.quotes.findIndex(q => q.id === this.currentQuoteId);
        if (quoteIndex !== -1) {
            this.quotes[quoteIndex] = { ...this.quotes[quoteIndex], ...formData };
            this.showMessage('Quote saved successfully!', 'success');
            
            // Go back to list view
            setTimeout(() => {
                this.showQuotesList();
            }, 1500);
        }
    }

    downloadQuote() {
        this.showMessage('Quote downloaded successfully!', 'success');
    }

    uploadQuoteFile() {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.pdf,.doc,.docx';
        
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                this.showMessage(`File "${file.name}" uploaded successfully!`, 'success');
            }
        });
        
        fileInput.click();
    }
    
    editQuote(quoteId) {
        this.showMessage('Edit functionality will be implemented soon', 'info');
    }
    
    deleteQuote(quoteId) {
        if (confirm('Are you sure you want to delete this quote?')) {
            this.quotes = this.quotes.filter(q => q.id !== quoteId);
            this.filteredQuotes = this.filteredQuotes.filter(q => q.id !== quoteId);
            this.renderQuotesTemplates();
            this.showMessage('Quote deleted successfully!', 'success');
        }
    }
    
    // Invoices Template Methods
    renderInvoicesTemplates() {
        const grid = document.getElementById('invoicesGrid');
        if (!grid) return;
        
        if (this.filteredInvoices.length === 0) {
            grid.innerHTML = `
                <div class="text-center py-5">
                    <i class="fas fa-file-invoice fa-3x text-muted mb-3"></i>
                    <h4>No invoices found</h4>
                    <p class="text-muted">Create your first invoice template</p>
                </div>
            `;
            return;
        }
        
        grid.innerHTML = this.filteredInvoices.map((invoice, index) => `
            <div class="template-card" onclick="templateManager.viewInvoice(${invoice.id})">
                <div class="template-card-image" style="background-image: url('${this.getTemplateImage(index)}')">
                    <div class="template-card-overlay"></div>
                </div>
                <div class="template-card-content">
                    <div class="template-card-info">
                        <div class="template-card-left">
                            <h3 class="template-title">${invoice.title}</h3>
                            <p class="template-date">Updated On: ${invoice.updatedDate}</p>
                        </div>
                        <div class="template-card-icons">
                            <div class="template-icon red">
                                <i class="fas fa-heart"></i>
                            </div>
                            <div class="template-icon green">
                                <i class="fas fa-bookmark"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    handleInvoicesSearch(searchTerm) {
        this.filteredInvoices = this.invoices.filter(invoice => 
            invoice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        this.renderInvoicesTemplates();
    }
    
    handleCreateInvoicesTemplate() {
        const title = document.getElementById('invoicesTemplateTitle').value;
        
        if (!title.trim()) {
            this.showMessage('Please enter a title', 'error');
            return;
        }
        
        const newInvoice = {
            id: Date.now(),
            title: title.trim(),
            type: 'general',
            category: 'General',
            clientName: 'New Client',
            amount: '$0',
            status: 'pending',
            createdDate: new Date().toLocaleDateString('en-GB'),
            updatedDate: new Date().toLocaleDateString('en-GB')
        };
        
        this.invoices.push(newInvoice);
        this.filteredInvoices = [...this.invoices];
        this.renderInvoicesTemplates();
        
        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('createInvoicesTemplateModal'));
        modal.hide();
        
        // Reset form
        document.getElementById('invoicesTemplateTitle').value = '';
        this.showMessage('Invoice template created successfully!', 'success');
    }
    
    viewInvoice(invoiceId) {
        // Show invoice detail view within the tab
        this.currentInvoiceId = invoiceId;
        document.getElementById('invoicesListView').style.display = 'none';
        document.getElementById('invoiceDetailView').style.display = 'block';
        
        // Update title
        const invoice = this.invoices.find(i => i.id === invoiceId);
        document.getElementById('invoiceDetailTitle').textContent = invoice ? invoice.title : `Invoice ${invoiceId}`;
        
        // Load invoice data (if exists)
        this.loadInvoiceDetailData(invoiceId);
        
        // Setup tax calculation
        this.setupInvoiceTaxCalculation();
    }

    showInvoicesList() {
        document.getElementById('invoiceDetailView').style.display = 'none';
        document.getElementById('invoicesListView').style.display = 'block';
        this.currentInvoiceId = null;
    }

    loadInvoiceDetailData(invoiceId) {
        const invoice = this.invoices.find(i => i.id === invoiceId);
        if (invoice) {
            // Load any existing data
            document.getElementById('invoiceClientName').value = invoice.clientName || '';
            document.getElementById('billingDate').value = invoice.billingDate || '';
            document.getElementById('dueDate').value = invoice.dueDate || '';
            document.getElementById('invoiceComments').value = invoice.comments || '';
            
            // Load invoice items if they exist
            if (invoice.items && invoice.items.length > 0) {
                this.loadInvoiceItems(invoice.items);
            }
        }
        
        // Calculate initial total
        this.calculateInvoiceItemsTotal();
    }

    loadInvoiceItems(items) {
        const tbody = document.getElementById('invoiceItemsBody');
        tbody.innerHTML = '';
        
        items.forEach(item => {
            const row = this.createInvoiceItemRow(item.name, item.description, item.price);
            tbody.appendChild(row);
        });
        
        // Ensure at least one row exists
        if (items.length === 0) {
            this.addInvoiceItem();
        }
    }

    createInvoiceItemRow(itemName = '', description = '', price = '') {
        const row = document.createElement('tr');
        row.className = 'invoice-item-row';
        row.innerHTML = `
            <td><input type="text" class="form-control" placeholder="Item name" value="${itemName}"></td>
            <td><input type="text" class="form-control" placeholder="Description" value="${description}"></td>
            <td>
                <div class="input-group">
                    <span class="input-group-text">$</span>
                    <input type="number" class="form-control invoice-price" value="${price}" onchange="templateManager.calculateInvoiceItemsTotal()">
                </div>
            </td>
            <td>
                <button type="button" class="btn btn-sm btn-outline-danger" onclick="templateManager.removeInvoiceItem(this)">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        return row;
    }

    addInvoiceItem() {
        const tbody = document.getElementById('invoiceItemsBody');
        const row = this.createInvoiceItemRow();
        tbody.appendChild(row);
        
        // Focus on the first input of the new row
        const firstInput = row.querySelector('input[type="text"]');
        if (firstInput) {
            firstInput.focus();
        }
    }

    removeInvoiceItem(button) {
        const row = button.closest('tr');
        const tbody = document.getElementById('invoiceItemsBody');
        
        // Don't remove if it's the last row
        if (tbody.children.length > 1) {
            row.remove();
            this.calculateInvoiceItemsTotal();
        } else {
            this.showMessage('At least one item is required', 'warning');
        }
    }

    calculateInvoiceItemsTotal() {
        const priceInputs = document.querySelectorAll('.invoice-price');
        let total = 0;
        
        priceInputs.forEach(input => {
            const value = parseFloat(input.value) || 0;
            total += value;
        });
        
        const totalElement = document.getElementById('invoiceTotal');
        if (totalElement) {
            totalElement.textContent = `$ ${total.toLocaleString()}`;
        }
        
        return total;
    }

    setupInvoiceTaxCalculation() {
        const subtotalField = document.getElementById('subtotal');
        const taxRateField = document.getElementById('taxRate');
        
        const calculateTotals = () => this.calculateInvoiceTotals();
        
        subtotalField.addEventListener('input', calculateTotals);
        taxRateField.addEventListener('input', calculateTotals);
    }

    calculateInvoiceTotals() {
        const subtotal = parseFloat(document.getElementById('subtotal').value) || 0;
        const taxRate = parseFloat(document.getElementById('taxRate').value) || 0;
        
        const taxAmount = (subtotal * taxRate) / 100;
        const total = subtotal + taxAmount;
        
        document.getElementById('taxAmount').value = taxAmount.toFixed(2);
        document.getElementById('invoiceTotal').value = total.toFixed(2);
    }

    saveInvoice() {
        if (!this.currentInvoiceId) return;
        
        // Collect invoice items
        const invoiceItems = [];
        const rows = document.querySelectorAll('#invoiceItemsBody .invoice-item-row');
        
        rows.forEach(row => {
            const inputs = row.querySelectorAll('input');
            const item = {
                name: inputs[0].value || '',
                description: inputs[1].value || '',
                price: parseFloat(inputs[2].value) || 0
            };
            if (item.name || item.description || item.price) {
                invoiceItems.push(item);
            }
        });
        
        const formData = {
            clientName: document.getElementById('invoiceClientName').value,
            billingDate: document.getElementById('billingDate').value,
            dueDate: document.getElementById('dueDate').value,
            comments: document.getElementById('invoiceComments').value,
            items: invoiceItems,
            total: this.calculateInvoiceItemsTotal()
        };

        // Update invoice data
        const invoiceIndex = this.invoices.findIndex(i => i.id === this.currentInvoiceId);
        if (invoiceIndex !== -1) {
            this.invoices[invoiceIndex] = { ...this.invoices[invoiceIndex], ...formData };
            this.showMessage('Invoice saved successfully!', 'success');
            
            // Go back to list view
            setTimeout(() => {
                this.showInvoicesList();
            }, 1500);
        }
    }

    downloadInvoice() {
        this.showMessage('Invoice downloaded successfully!', 'success');
    }

    uploadInvoiceFile() {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.pdf,.doc,.docx';
        
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                this.showMessage(`File "${file.name}" uploaded successfully!`, 'success');
            }
        });
        
        fileInput.click();
    }
    
    editInvoice(invoiceId) {
        this.showMessage('Edit functionality will be implemented soon', 'info');
    }
    
    deleteInvoice(invoiceId) {
        if (confirm('Are you sure you want to delete this invoice?')) {
            this.invoices = this.invoices.filter(i => i.id !== invoiceId);
            this.filteredInvoices = this.filteredInvoices.filter(i => i.id !== invoiceId);
            this.renderInvoicesTemplates();
            this.showMessage('Invoice deleted successfully!', 'success');
        }
    }
    
    // Payments Template Methods
    renderPaymentsTemplates() {
        const grid = document.getElementById('paymentsGrid');
        if (!grid) return;
        
        if (this.filteredPayments.length === 0) {
            grid.innerHTML = `
                <div class="text-center py-5">
                    <i class="fas fa-credit-card fa-3x text-muted mb-3"></i>
                    <h4>No payments found</h4>
                    <p class="text-muted">Create your first payment template</p>
                </div>
            `;
            return;
        }
        
        grid.innerHTML = this.filteredPayments.map((payment, index) => `
            <div class="template-card" onclick="templateManager.viewPayment(${payment.id})">
                <div class="template-card-image" style="background-image: url('${this.getTemplateImage(index)}')">
                    <div class="template-card-overlay"></div>
                </div>
                <div class="template-card-content">
                    <div class="template-card-info">
                        <div class="template-card-left">
                            <h3 class="template-title">${payment.title}</h3>
                            <p class="template-date">Updated On: ${payment.updatedDate}</p>
                        </div>
                        <div class="template-card-icons">
                            <div class="template-icon red">
                                <i class="fas fa-heart"></i>
                            </div>
                            <div class="template-icon green">
                                <i class="fas fa-bookmark"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    handlePaymentsSearch(searchTerm) {
        this.filteredPayments = this.payments.filter(payment => 
            payment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            payment.clientName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        this.renderPaymentsTemplates();
    }
    
    handleCreatePaymentsTemplate() {
        const eventType = document.getElementById('paymentsEventType').value;
        const title = document.getElementById('paymentsTemplateTitle').value;
        
        if (!title.trim()) {
            this.showMessage('Please enter a title', 'error');
            return;
        }
        
        const newPayment = {
            id: Date.now(),
            title: title.trim(),
            type: eventType.toLowerCase(),
            category: eventType,
            clientName: 'New Client',
            amount: '$0',
            status: 'pending',
            paymentMethod: 'Credit Card',
            createdDate: new Date().toLocaleDateString('en-GB'),
            updatedDate: new Date().toLocaleDateString('en-GB')
        };
        
        this.payments.push(newPayment);
        this.filteredPayments = [...this.payments];
        this.renderPaymentsTemplates();
        
        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('createPaymentsTemplateModal'));
        modal.hide();
        
        // Reset form
        document.getElementById('paymentsTemplateTitle').value = '';
        this.showMessage('Payment template created successfully!', 'success');
    }
    
    viewPayment(paymentId) {
        // Show payment detail view within the tab
        this.currentPaymentId = paymentId;
        document.getElementById('paymentsListView').style.display = 'none';
        document.getElementById('paymentDetailView').style.display = 'block';
        
        // Update title
        const payment = this.payments.find(p => p.id === paymentId);
        document.getElementById('paymentDetailTitle').textContent = payment ? payment.title : `Payment ${paymentId}`;
        
        // Load payment data (if exists)
        this.loadPaymentDetailData(paymentId);
    }

    showPaymentsList() {
        document.getElementById('paymentDetailView').style.display = 'none';
        document.getElementById('paymentsListView').style.display = 'block';
        this.currentPaymentId = null;
    }

    loadPaymentDetailData(paymentId) {
        const payment = this.payments.find(p => p.id === paymentId);
        if (payment) {
            // Load any existing data
            document.getElementById('paymentId').value = payment.paymentId || `PAY-${paymentId.toString().padStart(4, '0')}`;
            document.getElementById('paymentDate').value = payment.paymentDate || '';
            document.getElementById('paymentStatus').value = payment.paymentStatus || 'pending';
            document.getElementById('paymentMethod').value = payment.paymentMethod || 'credit_card';
            document.getElementById('paymentClientName').value = payment.clientName || '';
            document.getElementById('paymentClientEmail').value = payment.clientEmail || '';
            document.getElementById('referenceNumber').value = payment.referenceNumber || '';
            document.getElementById('paymentAmount').value = payment.paymentAmount || '';
            document.getElementById('paymentCurrency').value = payment.paymentCurrency || 'USD';
            document.getElementById('processingFee').value = payment.processingFee || '';
            document.getElementById('transactionId').value = payment.transactionId || '';
            document.getElementById('gatewayResponse').value = payment.gatewayResponse || '';
            document.getElementById('paymentDescription').value = payment.description || '';
            document.getElementById('paymentNotes').value = payment.notes || '';
        }
    }

    savePayment() {
        if (!this.currentPaymentId) return;
        
        const formData = {
            paymentId: document.getElementById('paymentId').value,
            paymentDate: document.getElementById('paymentDate').value,
            paymentStatus: document.getElementById('paymentStatus').value,
            paymentMethod: document.getElementById('paymentMethod').value,
            clientName: document.getElementById('paymentClientName').value,
            clientEmail: document.getElementById('paymentClientEmail').value,
            referenceNumber: document.getElementById('referenceNumber').value,
            paymentAmount: document.getElementById('paymentAmount').value,
            paymentCurrency: document.getElementById('paymentCurrency').value,
            processingFee: document.getElementById('processingFee').value,
            transactionId: document.getElementById('transactionId').value,
            gatewayResponse: document.getElementById('gatewayResponse').value,
            description: document.getElementById('paymentDescription').value,
            notes: document.getElementById('paymentNotes').value
        };

        // Update payment data
        const paymentIndex = this.payments.findIndex(p => p.id === this.currentPaymentId);
        if (paymentIndex !== -1) {
            this.payments[paymentIndex] = { ...this.payments[paymentIndex], ...formData };
            this.showMessage('Payment saved successfully!', 'success');
            
            // Go back to list view
            setTimeout(() => {
                this.showPaymentsList();
            }, 1500);
        }
    }

    downloadPayment() {
        this.showMessage('Payment record downloaded successfully!', 'success');
    }

    uploadPaymentFile() {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.pdf,.doc,.docx,.jpg,.png';
        
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                this.showMessage(`File "${file.name}" uploaded successfully!`, 'success');
            }
        });
        
        fileInput.click();
    }
    
    editPayment(paymentId) {
        this.showMessage('Edit functionality will be implemented soon', 'info');
    }
    
    deletePayment(paymentId) {
        if (confirm('Are you sure you want to delete this payment?')) {
            this.payments = this.payments.filter(p => p.id !== paymentId);
            this.filteredPayments = this.filteredPayments.filter(p => p.id !== paymentId);
            this.renderPaymentsTemplates();
            this.showMessage('Payment deleted successfully!', 'success');
        }
    }
    
    getTemplateImage(index) {
        const images = [
            'https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
        ];
        return images[index % images.length];
    }

    setActiveNavItem() {
        // Remove active class from all nav items
        document.querySelectorAll('.sidebar .nav-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Add active class to templates nav item
        const templatesNav = document.querySelector('.sidebar .nav-item a[href="templates.html"]');
        if (templatesNav) {
            templatesNav.parentElement.classList.add('active');
        }
    }
}

// Initialize the template manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.templateManager = new TemplateManager();
});