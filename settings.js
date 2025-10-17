class SettingsManager {
    constructor() {
        this.teamMembers = [
            {
                id: 1234,
                name: 'Tyler Collins',
                position: 'Florist',
                email: 'tyler@gmail.com',
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
                color: 'success'
            },
            {
                id: 1234,
                name: 'Alan Powell',
                position: 'Photographer',
                email: 'alan@gmail.com',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
                color: 'primary'
            },
            {
                id: 1234,
                name: 'Justin Wood',
                position: 'Videographer',
                email: 'justin@gmail.com',
                avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
                color: 'info'
            },
            {
                id: 1234,
                name: 'Jacob Evans',
                position: 'Florist',
                email: 'jacob@gmail.com',
                avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=40&h=40&fit=crop&crop=face',
                color: 'warning'
            },
            {
                id: 1234,
                name: 'Tom Meyer',
                position: 'Photographer',
                email: 'tom@gmail.com',
                avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop&crop=face',
                color: 'secondary'
            },
            {
                id: 1234,
                name: 'Nicolas Palmer',
                position: 'Florist',
                email: 'nicolas@gmail.com',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
                color: 'danger'
            },
            {
                id: 1234,
                name: 'Jonathan Jones',
                position: 'Photographer',
                email: 'jonathan@gmail.com',
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
                color: 'light'
            },
            {
                id: 1234,
                name: 'Joe Meyer',
                position: 'Florist',
                email: 'joe@gmail.com',
                avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
                color: 'dark'
            }
        ];
        this.currentStep = 1;
        this.currentMember = null;
    }

    init() {
        this.setupEventListeners();
        this.initializeTeamTable();
    }

    setupEventListeners() {
        // Account form submission
        document.getElementById('accountForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.updateAccount();
        });

        // Password form submission
        document.getElementById('passwordForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.updatePassword();
        });

        // Add team member form submission
        document.getElementById('addTeamMemberForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTeamMember();
        });

        // Custom plan form submission
        document.getElementById('customPlanForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.updateCustomPlan();
        });

        // Payment method form submission
        document.getElementById('paymentMethodForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.updatePaymentMethod();
        });
    }

    // Account Configuration Methods
    enableAccountEdit() {
        // Hide field values and show inputs
        document.querySelectorAll('.field-value').forEach(element => {
            element.style.display = 'none';
        });

        document.querySelectorAll('.form-control').forEach(element => {
            element.style.display = 'block';
        });

        document.querySelector('.phone-input').style.display = 'block';

        // Show form actions
        document.getElementById('accountActions').style.display = 'flex';

        // Hide edit button
        document.querySelector('.edit-btn').style.display = 'none';
    }

    cancelAccountEdit() {
        // Show field values and hide inputs
        document.querySelectorAll('.field-value').forEach(element => {
            element.style.display = 'flex';
        });

        document.querySelectorAll('.form-control').forEach(element => {
            element.style.display = 'none';
        });

        document.querySelector('.phone-input').style.display = 'none';

        // Hide form actions
        document.getElementById('accountActions').style.display = 'none';

        // Show edit button
        document.querySelector('.edit-btn').style.display = 'flex';
    }

    updateAccount() {
        // Get form values
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const contact = document.getElementById('contact').value;
        const company = document.getElementById('company').value;

        // Update display values
        document.getElementById('firstNameValue').textContent = firstName;
        document.getElementById('lastNameValue').textContent = lastName;
        document.getElementById('emailValue').textContent = email;
        document.getElementById('contactValue').innerHTML = `
            <img src="https://flagcdn.com/w20/es.png" alt="Spain" class="flag-icon">
            (+34) ${contact}
        `;
        document.getElementById('companyValue').textContent = company;

        // Update profile info
        document.getElementById('profileName').textContent = `${firstName} ${lastName}`;

        // Cancel edit mode
        this.cancelAccountEdit();

        // Show success modal
        this.showSuccessModal('Account details has been updated Successfully !');
    }

    changeProfilePicture() {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    document.getElementById('profileImage').src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
        
        fileInput.click();
    }

    // Password Methods
    updatePassword() {
        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (newPassword !== confirmPassword) {
            this.showMessage('Passwords do not match', 'error');
            return;
        }

        if (newPassword.length < 6) {
            this.showMessage('Password must be at least 6 characters', 'error');
            return;
        }

        // Clear form
        document.getElementById('passwordForm').reset();

        // Show success modal
        this.showSuccessModal('Password has been updated Successfully !');
    }

    togglePassword(fieldId) {
        const field = document.getElementById(fieldId);
        const toggle = field.nextElementSibling.querySelector('i');
        
        if (field.type === 'password') {
            field.type = 'text';
            toggle.classList.remove('fa-eye');
            toggle.classList.add('fa-eye-slash');
        } else {
            field.type = 'password';
            toggle.classList.remove('fa-eye-slash');
            toggle.classList.add('fa-eye');
        }
    }

    // Team Members Methods
    initializeTeamTable() {
        const tableBody = document.querySelector('#teamMembersTable tbody');
        tableBody.innerHTML = '';

        this.teamMembers.forEach((member, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${member.id}</td>
                <td>
                    <div class="team-member-info">
                        <div class="member-avatar-wrapper">
                            <div class="member-avatar-circle bg-${member.color}">
                                ${member.name.split(' ').map(n => n[0]).join('')}
                            </div>
                        </div>
                        <span class="member-name">${member.name}</span>
                    </div>
                </td>
                <td>${member.position}</td>
                <td>${member.email}</td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn btn-view" onclick="settingsManager.viewTeamMember(${index})" title="View">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="action-btn btn-edit" onclick="settingsManager.editTeamMember(${index})" title="Edit">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn btn-delete" onclick="settingsManager.deleteTeamMember(${index})" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    showAddTeamMemberModal() {
        this.currentStep = 1;
        this.showStep1();
        const modal = new bootstrap.Modal(document.getElementById('addTeamMemberModal'));
        modal.show();
    }

    showStep1() {
        document.getElementById('step1').style.display = 'block';
        document.getElementById('step2').style.display = 'none';
        this.currentStep = 1;
    }

    showStep2() {
        // Validate step 1 fields
        const name = document.getElementById('memberName').value;
        const position = document.getElementById('memberPosition').value;
        const email = document.getElementById('memberEmail').value;
        const password = document.getElementById('memberPassword').value;

        if (!name || !position || !email || !password) {
            this.showMessage('Please fill in all required fields', 'error');
            return;
        }

        document.getElementById('step1').style.display = 'none';
        document.getElementById('step2').style.display = 'block';
        this.currentStep = 2;
    }

    addTeamMember() {
        const name = document.getElementById('memberName').value;
        const position = document.getElementById('memberPosition').value;
        const email = document.getElementById('memberEmail').value;

        // Generate new member
        const newMember = {
            id: 1234,
            name: name,
            position: position,
            email: email,
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
            color: 'primary'
        };

        this.teamMembers.push(newMember);
        this.initializeTeamTable();

        // Clear form
        document.getElementById('addTeamMemberForm').reset();

        // Hide modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('addTeamMemberModal'));
        modal.hide();

        // Show success modal
        this.showSuccessModal(`${name} has been added successfully!`);
    }

    viewTeamMember(index) {
        const member = this.teamMembers[index];
        this.currentMember = member;

        // Update modal content
        document.getElementById('memberViewTitle').textContent = member.name;
        document.getElementById('memberViewEmail').textContent = member.email;
        document.getElementById('memberViewPosition').textContent = member.position;

        // Show modal
        const modal = new bootstrap.Modal(document.getElementById('teamMemberViewModal'));
        modal.show();
    }

    editTeamMember(index) {
        this.showMessage('Edit functionality will be implemented soon', 'info');
    }

    deleteTeamMember(index) {
        const member = this.teamMembers[index];
        document.getElementById('deleteTargetName').textContent = `"${member.name}"`;
        
        // Store index for deletion
        this.memberToDelete = index;

        // Show confirmation modal
        const modal = new bootstrap.Modal(document.getElementById('deleteConfirmModal'));
        modal.show();

        // Handle confirmation
        document.querySelector('.delete-confirm-btn').onclick = () => {
            this.confirmDeleteMember();
        };
    }

    confirmDeleteMember() {
        if (this.memberToDelete !== null) {
            const memberName = this.teamMembers[this.memberToDelete].name;
            this.teamMembers.splice(this.memberToDelete, 1);
            this.initializeTeamTable();
            
            // Hide modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('deleteConfirmModal'));
            modal.hide();

            // Show success modal
            this.showSuccessModal(`${memberName} has been deleted successfully!`);
            
            this.memberToDelete = null;
        }
    }

    // Subscription Methods
    showManageSubscription() {
        this.showMessage('Manage subscription functionality will be implemented soon', 'info');
    }

    showCustomPlanModal() {
        const modal = new bootstrap.Modal(document.getElementById('customPlanModal'));
        modal.show();
    }

    updateCustomPlan() {
        // Hide modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('customPlanModal'));
        modal.hide();

        // Show success modal
        this.showSuccessModal('Custom plan updated successfully!');
    }

    showPaymentMethodModal() {
        const modal = new bootstrap.Modal(document.getElementById('paymentMethodModal'));
        modal.show();
    }

    updatePaymentMethod() {
        // Hide modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('paymentMethodModal'));
        modal.hide();

        // Show success modal
        this.showSuccessModal('Payment method updated successfully!');
    }

    // Utility Methods
    showSuccessModal(message) {
        document.getElementById('successTitle').textContent = message;
        const modal = new bootstrap.Modal(document.getElementById('successModal'));
        modal.show();
    }

    showMessage(message, type = 'info') {
        // Create toast notification
        const toast = document.createElement('div');
        toast.className = `alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show position-fixed`;
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

// Navigation function
function goToDashboard() {
    window.location.href = 'dashboard.html';
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.settingsManager = new SettingsManager();
    settingsManager.init();
});

// Global functions for HTML onclick handlers
function enableAccountEdit() {
    settingsManager.enableAccountEdit();
}

function cancelAccountEdit() {
    settingsManager.cancelAccountEdit();
}

function changeProfilePicture() {
    settingsManager.changeProfilePicture();
}

function togglePassword(fieldId) {
    settingsManager.togglePassword(fieldId);
}

function showAddTeamMemberModal() {
    settingsManager.showAddTeamMemberModal();
}

function showStep1() {
    settingsManager.showStep1();
}

function showStep2() {
    settingsManager.showStep2();
}

function showManageSubscription() {
    settingsManager.showManageSubscription();
}

function showCustomPlanModal() {
    settingsManager.showCustomPlanModal();
}

function showPaymentMethodModal() {
    settingsManager.showPaymentMethodModal();
}