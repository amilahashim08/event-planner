class MoodBoard {
    constructor() {
        this.moodItems = [
            {
                id: 1,
                category: 'Floral',
                image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=300&fit=crop&auto=format',
                description: 'Lorem ipsum is a dummy text.',
                liked: false,
                bookmarked: false,
                note: null
            },
            {
                id: 2,
                category: 'Floral',
                image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=300&fit=crop&auto=format',
                description: 'Lorem ipsum is a dummy text.',
                liked: true,
                bookmarked: false,
                note: null
            },
            {
                id: 3,
                category: 'Floral',
                image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400&h=300&fit=crop&auto=format',
                description: 'Lorem ipsum is a dummy text.',
                liked: false,
                bookmarked: true,
                note: null
            },
            {
                id: 4,
                category: 'Floral',
                image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=300&fit=crop&auto=format',
                description: 'Lorem ipsum is a dummy text.',
                liked: true,
                bookmarked: true,
                note: null
            },
            {
                id: 5,
                category: 'Floral',
                image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400&h=300&fit=crop&auto=format',
                description: 'Lorem ipsum is a dummy text.',
                liked: false,
                bookmarked: false,
                note: null
            }
        ];
        
        this.init();
    }
    
    init() {
        this.renderMoodBoard();
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Add Images button
        const addImagesBtn = document.querySelector('.add-images-btn');
        if (addImagesBtn) {
            addImagesBtn.addEventListener('click', () => {
                this.handleAddImages();
            });
        }
        
        // Save note button
        const saveNoteBtn = document.getElementById('saveNoteBtn');
        if (saveNoteBtn) {
            saveNoteBtn.addEventListener('click', () => {
                this.saveNote();
            });
        }
        
        // Initialize tooltips
        this.initializeTooltips();
    }
    
    initializeTooltips() {
        // Initialize Bootstrap tooltips
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
    
    renderMoodBoard() {
        const grid = document.getElementById('moodBoardGrid');
        if (!grid) return;
        
        const moodHTML = this.moodItems.map(item => `
            <div class="mood-item">
                <div class="mood-image" style="background-image: url('${item.image}')">
                    <div class="mood-overlay"></div>
                    <div class="mood-actions">
                        <button class="mood-action-btn" onclick="moodBoard.toggleLike(${item.id})" data-bs-toggle="tooltip" title="Like">
                            <i class="fas fa-heart ${item.liked ? 'text-danger' : ''}"></i>
                        </button>
                        <button class="mood-action-btn" onclick="moodBoard.toggleBookmark(${item.id})" data-bs-toggle="tooltip" title="Bookmark">
                            <i class="fas fa-bookmark ${item.bookmarked ? 'text-warning' : ''}"></i>
                        </button>
                        <button class="mood-action-btn delete" onclick="moodBoard.deleteItem(${item.id})" data-bs-toggle="tooltip" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="mood-content">
                    <div class="mood-category">
                        <i class="fas fa-seedling mood-icon"></i>
                        <span class="mood-category-text">${item.category}</span>
                    </div>
                    <p class="mood-description">${item.description}</p>
                </div>
                <div class="mood-footer">
                    <div class="mood-footer-actions">
                        <button class="mood-footer-btn" onclick="moodBoard.addNote(${item.id})" data-bs-toggle="tooltip" title="Add Note">
                            Add Note
                        </button>
                        <button class="mood-footer-btn delete" onclick="moodBoard.deleteItem(${item.id})" data-bs-toggle="tooltip" title="Delete">
                            Delete
                        </button>
                    </div>
                    <div class="mood-stats">
                        <div class="mood-stat">
                            <i class="fas fa-heart ${item.liked ? 'text-danger' : ''}"></i>
                            <span>2</span>
                        </div>
                        <div class="mood-stat">
                            <i class="fas fa-bookmark ${item.bookmarked ? 'text-warning' : ''}"></i>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
        
        grid.innerHTML = moodHTML;
    }
    
    handleAddImages() {
        // Create file input element
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.multiple = true;
        fileInput.style.display = 'none';
        
        fileInput.addEventListener('change', (e) => {
            const files = Array.from(e.target.files);
            files.forEach(file => {
                this.addImageToMoodBoard(file);
            });
        });
        
        // Trigger file selection
        document.body.appendChild(fileInput);
        fileInput.click();
        document.body.removeChild(fileInput);
    }
    
    addImageToMoodBoard(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const newItem = {
                id: Date.now() + Math.random(),
                category: 'Custom',
                image: e.target.result,
                description: 'Custom uploaded image.',
                liked: false,
                bookmarked: false
            };
            
            this.moodItems.push(newItem);
            this.renderMoodBoard();
            this.showMessage('Image added to mood board successfully!', 'success');
        };
        reader.readAsDataURL(file);
    }
    
    toggleLike(itemId) {
        const item = this.moodItems.find(i => i.id === itemId);
        if (item) {
            item.liked = !item.liked;
            this.renderMoodBoard();
        }
    }
    
    toggleBookmark(itemId) {
        const item = this.moodItems.find(i => i.id === itemId);
        if (item) {
            item.bookmarked = !item.bookmarked;
            this.renderMoodBoard();
        }
    }
    
    deleteItem(itemId) {
        if (confirm('Are you sure you want to delete this item from the mood board?')) {
            this.moodItems = this.moodItems.filter(i => i.id !== itemId);
            this.renderMoodBoard();
            this.showMessage('Item deleted successfully!', 'success');
        }
    }
    
    addNote(itemId) {
        this.currentItemId = itemId;
        const modal = new bootstrap.Modal(document.getElementById('addNoteModal'));
        modal.show();
    }
    
    saveNote() {
        const noteText = document.getElementById('noteText').value.trim();
        if (!noteText) {
            this.showMessage('Please enter a note', 'error');
            return;
        }
        
        const item = this.moodItems.find(i => i.id === this.currentItemId);
        if (item) {
            item.note = noteText;
            this.showMessage('Note added successfully!', 'success');
            
            // Clear form and close modal
            document.getElementById('noteText').value = '';
            const modal = bootstrap.Modal.getInstance(document.getElementById('addNoteModal'));
            modal.hide();
        }
    }
    
    showMessage(message, type = 'info') {
        // Create toast notification
        const toast = document.createElement('div');
        toast.className = `alert alert-${type === 'error' ? 'danger' : type === 'success' ? 'success' : 'info'} alert-dismissible fade show position-fixed`;
        toast.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
        toast.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(toast);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 3000);
    }
}

// Initialize mood board when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.moodBoard = new MoodBoard();
});