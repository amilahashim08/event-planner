class QuestionnaireDetail {
    constructor() {
        this.questionCounter = 1;
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupSidebarToggle();
        this.setActiveNavItem();
        this.initializeAnswerOptions();
    }
    
    setupEventListeners() {
        // Initialize existing dropdowns
        this.setupDropdowns();
        
        // Setup answer type change handlers
        document.querySelectorAll('.answer-type-select').forEach(select => {
            select.addEventListener('change', (e) => {
                this.updateAnswerType(e.target);
            });
        });
    }
    
    setupSidebarToggle() {
        const sidebarToggle = document.getElementById('sidebarToggle');
        const sidebar = document.getElementById('sidebar');
        
        if (sidebarToggle && sidebar) {
            sidebarToggle.addEventListener('click', () => {
                sidebar.classList.toggle('collapsed');
            });
        }
    }
    
    setupDropdowns() {
        // Handle answer type dropdowns
        document.querySelectorAll('.answer-type-select').forEach(select => {
            select.addEventListener('change', (e) => {
                this.handleAnswerTypeChange(e.target);
            });
        });
    }
    
    initializeAnswerOptions() {
        // Set up initial answer options for existing questions
        document.querySelectorAll('.answer-grid').forEach(grid => {
            this.updateOptionLetters(grid);
        });
    }
    
    toggleSection(sectionId) {
        const content = document.getElementById(sectionId + '-content');
        const toggle = document.getElementById(sectionId + '-toggle');
        
        if (content && toggle) {
            const isVisible = content.style.display !== 'none';
            
            if (isVisible) {
                content.style.display = 'none';
                toggle.classList.add('collapsed');
            } else {
                content.style.display = 'block';
                toggle.classList.remove('collapsed');
            }
        }
    }
    
    addNewQuestion() {
        this.questionCounter++;
        
        const sectionContent = document.querySelector('.section-content[style*="block"], .section-content:not([style])');
        if (!sectionContent) return;
        
        const questionHtml = this.createQuestionHtml(this.questionCounter);
        sectionContent.insertAdjacentHTML('beforeend', questionHtml);
        
        // Setup event listeners for the new question
        const newQuestion = sectionContent.lastElementChild;
        this.setupQuestionEventListeners(newQuestion);
        
        this.showMessage('New question added successfully!', 'success');
    }
    
    createQuestionHtml(questionNumber) {
        return `
            <div class="question-item">
                <div class="question-header">
                    <div>
                        <div class="question-number">Question ${questionNumber}</div>
                        <div class="question-details">
                            <div class="question-meta">
                                <span>Due Date:</span>
                                <span>24/05/2025</span>
                            </div>
                            <div class="question-meta">
                                <span>Assignee:</span>
                                <span>Caroline Forbes</span>
                                <i class="fas fa-user"></i>
                                <i class="fas fa-calendar"></i>
                            </div>
                        </div>
                    </div>
                    <button class="add-question-btn" onclick="questionnaireDetail.addNewQuestion()">
                        <i class="fas fa-plus"></i>
                        Add New Question
                    </button>
                </div>
                
                <input type="text" class="question-input" placeholder="Enter Question">
                
                <div class="answer-type-dropdown">
                    <select class="answer-type-select" onchange="questionnaireDetail.updateAnswerType(this)">
                        <option value="multiple-choice">Multiple Choice</option>
                        <option value="input">Input</option>
                        <option value="checkboxes">Checkboxes</option>
                    </select>
                </div>
                
                <div class="answer-options">
                    <div class="answer-label">
                        Answer <i class="fas fa-question-circle answer-help-icon" title="Add answer options"></i>
                    </div>
                    <div class="answer-grid">
                        <div class="answer-option">
                            <span class="option-letter">a)</span>
                            <input type="text" class="option-input" placeholder="Enter option">
                            <button class="remove-option" onclick="questionnaireDetail.removeOption(this)">
                                <i class="fas fa-minus-circle"></i>
                            </button>
                        </div>
                        <div class="answer-option">
                            <span class="option-letter">b)</span>
                            <input type="text" class="option-input" placeholder="Enter option">
                            <button class="remove-option" onclick="questionnaireDetail.removeOption(this)">
                                <i class="fas fa-minus-circle"></i>
                            </button>
                        </div>
                    </div>
                    <button class="btn btn-sm btn-outline-primary mt-2" onclick="questionnaireDetail.addAnswerOption(this)">
                        <i class="fas fa-plus"></i> Add Option
                    </button>
                </div>
            </div>
        `;
    }
    
    setupQuestionEventListeners(questionElement) {
        const answerTypeSelect = questionElement.querySelector('.answer-type-select');
        if (answerTypeSelect) {
            answerTypeSelect.addEventListener('change', (e) => {
                this.updateAnswerType(e.target);
            });
        }
    }
    
    updateAnswerType(selectElement) {
        const questionItem = selectElement.closest('.question-item');
        const answerOptions = questionItem.querySelector('.answer-options');
        const answerType = selectElement.value;
        
        // Update answer options based on type
        if (answerType === 'input') {
            answerOptions.innerHTML = `
                <div class="answer-label">
                    Answer <i class="fas fa-question-circle answer-help-icon" title="Input field for user response"></i>
                </div>
                <input type="text" class="form-control" placeholder="User will type their answer here" disabled>
            `;
        } else if (answerType === 'checkboxes') {
            answerOptions.innerHTML = `
                <div class="answer-label">
                    Answer <i class="fas fa-question-circle answer-help-icon" title="Multiple selection options"></i>
                </div>
                <div class="answer-grid">
                    <div class="answer-option">
                        <span class="option-letter">☐</span>
                        <input type="text" class="option-input" placeholder="Enter option">
                        <button class="remove-option" onclick="questionnaireDetail.removeOption(this)">
                            <i class="fas fa-minus-circle"></i>
                        </button>
                    </div>
                    <div class="answer-option">
                        <span class="option-letter">☐</span>
                        <input type="text" class="option-input" placeholder="Enter option">
                        <button class="remove-option" onclick="questionnaireDetail.removeOption(this)">
                            <i class="fas fa-minus-circle"></i>
                        </button>
                    </div>
                </div>
                <button class="btn btn-sm btn-outline-primary mt-2" onclick="questionnaireDetail.addAnswerOption(this)">
                    <i class="fas fa-plus"></i> Add Option
                </button>
            `;
        } else {
            // Multiple choice (default)
            answerOptions.innerHTML = `
                <div class="answer-label">
                    Answer <i class="fas fa-question-circle answer-help-icon" title="Single selection options"></i>
                </div>
                <div class="answer-grid">
                    <div class="answer-option">
                        <span class="option-letter">a)</span>
                        <input type="text" class="option-input" placeholder="Enter option">
                        <button class="remove-option" onclick="questionnaireDetail.removeOption(this)">
                            <i class="fas fa-minus-circle"></i>
                        </button>
                    </div>
                    <div class="answer-option">
                        <span class="option-letter">b)</span>
                        <input type="text" class="option-input" placeholder="Enter option">
                        <button class="remove-option" onclick="questionnaireDetail.removeOption(this)">
                            <i class="fas fa-minus-circle"></i>
                        </button>
                    </div>
                </div>
                <button class="btn btn-sm btn-outline-primary mt-2" onclick="questionnaireDetail.addAnswerOption(this)">
                    <i class="fas fa-plus"></i> Add Option
                </button>
            `;
        }
    }
    
    addAnswerOption(buttonElement) {
        const answerOptions = buttonElement.closest('.answer-options');
        const answerGrid = answerOptions.querySelector('.answer-grid');
        const currentOptions = answerGrid.querySelectorAll('.answer-option');
        const answerType = buttonElement.closest('.question-item').querySelector('.answer-type-select').value;
        
        let optionLetter;
        if (answerType === 'checkboxes') {
            optionLetter = '☐';
        } else {
            // Multiple choice - get next letter
            const letters = 'abcdefghijklmnopqrstuvwxyz';
            optionLetter = letters[currentOptions.length] + ')';
        }
        
        const newOption = document.createElement('div');
        newOption.className = 'answer-option';
        newOption.innerHTML = `
            <span class="option-letter">${optionLetter}</span>
            <input type="text" class="option-input" placeholder="Enter option">
            <button class="remove-option" onclick="questionnaireDetail.removeOption(this)">
                <i class="fas fa-minus-circle"></i>
            </button>
        `;
        
        answerGrid.appendChild(newOption);
        
        // Focus on the new input
        newOption.querySelector('.option-input').focus();
    }
    
    removeOption(buttonElement) {
        const answerOption = buttonElement.closest('.answer-option');
        const answerGrid = answerOption.closest('.answer-grid');
        
        // Don't allow removing if only 2 options remain
        if (answerGrid.querySelectorAll('.answer-option').length <= 2) {
            this.showMessage('At least 2 options are required', 'error');
            return;
        }
        
        answerOption.remove();
        
        // Update option letters
        this.updateOptionLetters(answerGrid);
    }
    
    updateOptionLetters(answerGrid) {
        const questionItem = answerGrid.closest('.question-item');
        const answerType = questionItem.querySelector('.answer-type-select').value;
        const options = answerGrid.querySelectorAll('.answer-option');
        
        options.forEach((option, index) => {
            const letterSpan = option.querySelector('.option-letter');
            if (answerType === 'checkboxes') {
                letterSpan.textContent = '☐';
            } else {
                const letters = 'abcdefghijklmnopqrstuvwxyz';
                letterSpan.textContent = letters[index] + ')';
            }
        });
    }
    
    addSection() {
        const titleInput = document.getElementById('sectionTitle');
        
        if (!titleInput.value.trim()) {
            this.showMessage('Please enter a section title', 'error');
            return;
        }
        
        // Create new section (simplified for demo)
        this.showMessage('Section added successfully!', 'success');
        
        // Clear form
        titleInput.value = '';
        
        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('addSectionModal'));
        modal.hide();
    }
    
    setActiveNavItem() {
        // Remove active class from all nav items
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Add active class to templates nav item
        const templatesNav = document.querySelector('a[href="templates.html"]');
        if (templatesNav) {
            templatesNav.parentElement.classList.add('active');
        }
    }
    
    showMessage(message, type = 'info') {
        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = `alert alert-${type === 'error' ? 'danger' : type === 'success' ? 'success' : 'info'} alert-dismissible fade show position-fixed`;
        messageEl.style.cssText = 'top: 20px; right: 20px; z-index: 1050; min-width: 300px;';
        messageEl.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(messageEl);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.remove();
            }
        }, 3000);
    }
}

// Global functions for onclick handlers
function toggleSection(sectionId) {
    window.questionnaireDetail.toggleSection(sectionId);
}

function addNewQuestion() {
    window.questionnaireDetail.addNewQuestion();
}

function updateAnswerType(selectElement) {
    window.questionnaireDetail.updateAnswerType(selectElement);
}

function removeOption(buttonElement) {
    window.questionnaireDetail.removeOption(buttonElement);
}

function addSection() {
    window.questionnaireDetail.addSection();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.questionnaireDetail = new QuestionnaireDetail();
});