class TemplateDetail {
    constructor() {
        this.templateId = this.getTemplateIdFromUrl();
        this.templateData = this.getTemplateData();
        this.checklistSections = [
            {
                id: 'pre-wedding',
                title: 'Pre-Wedding Planning',
                progress: 70,
                tasks: [
                    {
                        id: 1,
                        title: 'Finalize wedding date and time',
                        completed: true,
                        dueDate: '24/05/2025',
                        assignee: 'Caroline Forbes'
                    },
                    {
                        id: 2,
                        title: 'Book ceremony and reception venues',
                        completed: false,
                        dueDate: '24/05/2025',
                        assignee: 'Caroline Forbes'
                    },
                    {
                        id: 3,
                        title: 'Create initial guest list',
                        completed: false,
                        dueDate: '24/05/2025',
                        assignee: 'Caroline Forbes'
                    }
                ]
            },
            {
                id: 'design-styling',
                title: 'Design & Styling',
                progress: 70,
                tasks: [
                    {
                        id: 4,
                        title: 'Choose wedding theme and color palette',
                        completed: true,
                        dueDate: '24/05/2025',
                        assignee: 'Caroline Forbes'
                    },
                    {
                        id: 5,
                        title: 'Book ceremony and reception venues',
                        completed: false,
                        dueDate: '24/05/2025',
                        assignee: 'Caroline Forbes'
                    },
                    {
                        id: 6,
                        title: 'Create initial guest list',
                        completed: false,
                        dueDate: '24/05/2025',
                        assignee: 'Caroline Forbes'
                    }
                ]
            },
            {
                id: 'photography',
                title: 'Photography',
                progress: 70,
                tasks: [
                    {
                        id: 7,
                        title: 'Book wedding photographer',
                        completed: false,
                        dueDate: '24/05/2025',
                        assignee: 'Caroline Forbes'
                    },
                    {
                        id: 8,
                        title: 'Schedule engagement shoot',
                        completed: false,
                        dueDate: '24/05/2025',
                        assignee: 'Caroline Forbes'
                    }
                ]
            },
            {
                id: 'videography',
                title: 'Videography',
                progress: 70,
                tasks: [
                    {
                        id: 9,
                        title: 'Book wedding videographer',
                        completed: false,
                        dueDate: '24/05/2025',
                        assignee: 'Caroline Forbes'
                    },
                    {
                        id: 10,
                        title: 'Plan video shots and timeline',
                        completed: false,
                        dueDate: '24/05/2025',
                        assignee: 'Caroline Forbes'
                    }
                ]
            }
        ];
        
        this.currentSectionId = null;
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupSidebarToggle();
        this.loadTemplateData();
        this.renderChecklistSections();
        this.setActiveNavItem();
    }
    
    getTemplateIdFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id') || '1';
    }
    
    getTemplateData() {
        // This would typically come from a backend
        const templates = {
            '1': {
                title: 'Basic Wedding Checklist',
                type: 'wedding',
                category: 'Wedding'
            },
            '2': {
                title: 'Basic Birthday Checklist',
                type: 'birthday',
                category: 'Birthday'
            },
            '3': {
                title: 'Corporate Event Checklist',
                type: 'corporate',
                category: 'Corporate Event'
            },
            '4': {
                title: 'Baby Shower Checklist',
                type: 'baby-shower',
                category: 'Baby Shower'
            }
        };
        
        return templates[this.templateId] || templates['1'];
    }
    
    setupEventListeners() {
        // Add task modal
        const addTaskBtn = document.getElementById('addTaskBtn');
        if (addTaskBtn) {
            addTaskBtn.addEventListener('click', () => {
                this.handleAddTask();
            });
        }
        
        // Tab switching
        const tabs = document.querySelectorAll('[data-bs-toggle="tab"]');
        tabs.forEach(tab => {
            tab.addEventListener('shown.bs.tab', () => {
                this.setActiveNavItem();
            });
        });
        
        // Modal events
        const addTaskModal = document.getElementById('addTaskModal');
        if (addTaskModal) {
            addTaskModal.addEventListener('show.bs.modal', (event) => {
                // Clear form when modal opens
                this.clearAddTaskForm();
                this.setupDatePicker();
            });
        }
    }
    
    setupDatePicker() {
        const dateInput = document.getElementById('taskDueDate');
        if (dateInput) {
            // Make the date input clickable and convert to date type temporarily
            dateInput.addEventListener('click', () => {
                dateInput.type = 'date';
                dateInput.focus();
            });
            
            dateInput.addEventListener('change', () => {
                if (dateInput.value) {
                    // Format the date nicely
                    const date = new Date(dateInput.value);
                    dateInput.type = 'text';
                    dateInput.value = date.toLocaleDateString('en-GB');
                }
            });
            
            dateInput.addEventListener('blur', () => {
                if (!dateInput.value) {
                    dateInput.type = 'text';
                    dateInput.placeholder = 'Select date';
                }
            });
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
    
    loadTemplateData() {
        const titleElement = document.getElementById('templateTitle');
        if (titleElement && this.templateData) {
            titleElement.textContent = this.templateData.title;
        }
    }
    
    renderChecklistSections() {
        const accordion = document.getElementById('checklistAccordion');
        if (!accordion) return;
        
        const sectionsHTML = this.checklistSections.map((section, index) => `
            <div class="accordion-item">
                <div class="accordion-header">
                    <button class="accordion-button ${index === 0 ? '' : 'collapsed'}" 
                            type="button" 
                            data-bs-toggle="collapse" 
                            data-bs-target="#collapse-${section.id}" 
                            aria-expanded="${index === 0 ? 'true' : 'false'}" 
                            aria-controls="collapse-${section.id}">
                        <div class="accordion-section-title">
                            <span class="text-dark">${section.title}-</span>
                            <span class="section-progress">${section.progress}%</span>
                        </div>
                       
                    </button>
                </div>
                <div id="collapse-${section.id}" 
                     class="accordion-collapse collapse ${index === 0 ? 'show' : ''}" 
                     data-bs-parent="#checklistAccordion">
                    <div class="accordion-body">
                        <div class="tasks-header">
                            <h4 class="tasks-title">Tasks List</h4>

                                 <div>   <i class="fas fa-plus"  onclick="templateDetail.setCurrentSection('${section.id}')"></i> Add New Task
                    </div>    </div>
                        <div class="tasks-list">
                            ${this.renderTasks(section.tasks)}
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
        
        accordion.innerHTML = sectionsHTML;
    }
    
    renderTasks(tasks) {
        return tasks.map(task => `
            <div class="task-item">
                <div class="task-checkbox ${task.completed ? 'completed' : ''}" 
                     onclick="templateDetail.toggleTask(${task.id})"></div>
                <div class="task-content">
                    <p class="task-title ${task.completed ? 'completed' : ''}">${task.title}</p>
                </div>
                <div class="task-meta">
                    <span class="task-due-date">Due Date: ${task.dueDate}</span>
                    <span class="task-assignee">Assignee: ${task.assignee}</span>
                </div>
                <div class="task-actions">
                    <button class="task-action-btn" onclick="templateDetail.editTask(${task.id})" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="task-action-btn" onclick="templateDetail.deleteTask(${task.id})" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }
    
    setCurrentSection(sectionId) {
        this.currentSectionId = sectionId;
        document.getElementById('currentSection').value = sectionId;
    }
    
    toggleTask(taskId) {
        // Find the task in all sections
        for (let section of this.checklistSections) {
            const task = section.tasks.find(t => t.id === taskId);
            if (task) {
                task.completed = !task.completed;
                this.renderChecklistSections();
                this.showMessage(`Task ${task.completed ? 'completed' : 'uncompleted'}`, 'success');
                break;
            }
        }
    }
    
    handleAddTask() {
        const taskName = document.getElementById('taskName').value.trim();
        const taskDueDate = document.getElementById('taskDueDate').value;
        const taskAssignee = document.getElementById('taskAssignee').value.trim();
        const sectionId = document.getElementById('currentSection').value;
        
        if (!taskName || !taskDueDate || !taskAssignee || !sectionId) {
            this.showMessage('Please fill in all required fields', 'error');
            return;
        }
        
        const section = this.checklistSections.find(s => s.id === sectionId);
        if (!section) {
            this.showMessage('Invalid section selected', 'error');
            return;
        }
        
        // Generate new task ID
        const maxId = Math.max(...this.checklistSections.flatMap(s => s.tasks.map(t => t.id)));
        const newTask = {
            id: maxId + 1,
            title: taskName,
            completed: false,
            dueDate: taskDueDate, // Keep the date as entered
            assignee: taskAssignee
        };
        
        section.tasks.push(newTask);
        this.renderChecklistSections();
        
        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('addTaskModal'));
        modal.hide();
        
        this.showMessage('Task added successfully!', 'success');
    }
    
    editTask(taskId) {
        // Find the task
        for (let section of this.checklistSections) {
            const task = section.tasks.find(t => t.id === taskId);
            if (task) {
                this.showMessage('Edit functionality would open edit form', 'info');
                break;
            }
        }
    }
    
    deleteTask(taskId) {
        for (let section of this.checklistSections) {
            const taskIndex = section.tasks.findIndex(t => t.id === taskId);
            if (taskIndex !== -1) {
                const task = section.tasks[taskIndex];
                if (confirm(`Are you sure you want to delete "${task.title}"?`)) {
                    section.tasks.splice(taskIndex, 1);
                    this.renderChecklistSections();
                    this.showMessage('Task deleted successfully', 'success');
                }
                break;
            }
        }
    }
    
    clearAddTaskForm() {
        document.getElementById('taskName').value = '';
        document.getElementById('taskDueDate').value = '';
        document.getElementById('taskAssignee').value = '';
        document.getElementById('currentSection').value = '';
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

// Initialize the template detail when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.templateDetail = new TemplateDetail();
});