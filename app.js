// Event Management Dashboard JavaScript

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
    // Sidebar toggle functionality
    const sidebarToggle = document.getElementById("sidebarToggle");
    const sidebarToggleMain = document.getElementById("sidebarToggleMain");
    const sidebar = document.getElementById("sidebar");

    if (sidebarToggle) {
      sidebarToggle.addEventListener("click", () => this.toggleSidebar());
    }

    if (sidebarToggleMain) {
      sidebarToggleMain.addEventListener("click", () =>
        this.toggleMobileSidebar()
      );
    }

    // Navigation link active state
    const navLinks = document.querySelectorAll(".sidebar .nav-link");
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        this.setActiveNavLink(link);
      });
    });

    // Calendar navigation
    const prevBtn = document.getElementById("prevMonth");
    const nextBtn = document.getElementById("nextMonth");
    const todayBtn = document.getElementById("todayBtn");

    if (prevBtn) {
      prevBtn.addEventListener("click", () => this.previousMonth());
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => this.nextMonth());
    }

    if (todayBtn) {
      todayBtn.addEventListener("click", () => this.goToToday());
    }

    // Logout functionality
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        this.handleLogout();
      });
    }

    // Modal functionality
    const addAccessBtn = document.getElementById("addAccessBtn");
    if (addAccessBtn) {
      addAccessBtn.addEventListener("click", () => {
        this.handleAddAccess();
      });
    }

    // Checklist functionality
    const importTemplateBtn = document.getElementById("importTemplateBtn");
    if (importTemplateBtn) {
      importTemplateBtn.addEventListener("click", () => {
        this.showTemplateSelectionModal();
      });
    }

    const selectTemplateBtn = document.getElementById("selectTemplateBtn");
    if (selectTemplateBtn) {
      selectTemplateBtn.addEventListener("click", () => {
        this.handleTemplateSelection();
      });
    }

    const addChecklistBtn = document.getElementById("addChecklistBtn");
    if (addChecklistBtn) {
      addChecklistBtn.addEventListener("click", () => {
        this.showAddChecklistModal();
      });
    }

    const addChecklistSubmitBtn = document.getElementById(
      "addChecklistSubmitBtn"
    );
    if (addChecklistSubmitBtn) {
      addChecklistSubmitBtn.addEventListener("click", () => {
        this.handleAddChecklist();
      });
    }

    const addTaskSubmitBtn = document.getElementById("addTaskSubmitBtn");
    if (addTaskSubmitBtn) {
      addTaskSubmitBtn.addEventListener("click", () => {
        this.handleAddTask();
      });
    }

    // Template options
    const templateOptions = document.querySelectorAll(".template-option");
    templateOptions.forEach((option) => {
      option.addEventListener("click", () => {
        this.selectTemplate(option);
      });
    });

    // Add task buttons
    const addTaskBtns = document.querySelectorAll(".add-task-btn");
    addTaskBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.showAddTaskModal(btn.dataset.category);
      });
    });

    // Guest management functionality
    const addGuestBtn = document.getElementById("addGuestBtn");
    if (addGuestBtn) {
      addGuestBtn.addEventListener("click", () => {
        this.showAddGuestModal();
      });
    }

    const addGuestSubmitBtn = document.getElementById("addGuestSubmitBtn");
    if (addGuestSubmitBtn) {
      addGuestSubmitBtn.addEventListener("click", () => {
        this.handleAddGuest();
      });
    }

    const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
    if (confirmDeleteBtn) {
      confirmDeleteBtn.addEventListener("click", () => {
        this.handleDeleteGuest();
      });
    }

    // Tab functionality
    const tabButtons = document.querySelectorAll("#eventTabs .nav-link");
    tabButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        this.handleTabSwitch(e.target);
      });
    });

    // Checklist functionality
    const checkboxes = document.querySelectorAll(
      '.checklist-item input[type="checkbox"]'
    );
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", (e) => {
        this.handleChecklistChange(e.target);
      });
    });

    // Design Studio functionality
    const chooseFromTemplatesBtn = document.getElementById(
      "chooseFromTemplatesBtn"
    );
    if (chooseFromTemplatesBtn) {
      chooseFromTemplatesBtn.addEventListener("click", () => {
        this.showDesignTemplateSelectionModal();
      });
    }

    const createNewStyleGuideBtn = document.getElementById(
      "createNewStyleGuideBtn"
    );
    if (createNewStyleGuideBtn) {
      createNewStyleGuideBtn.addEventListener("click", () => {
        this.showCreateStyleGuideModal();
      });
    }

    const createNewStyleGuideBtnContent = document.getElementById(
      "createNewStyleGuideBtnContent"
    );
    if (createNewStyleGuideBtnContent) {
      createNewStyleGuideBtnContent.addEventListener("click", () => {
        this.showCreateStyleGuideModal();
      });
    }

    const selectDesignTemplateBtn = document.getElementById(
      "selectDesignTemplateBtn"
    );
    if (selectDesignTemplateBtn) {
      selectDesignTemplateBtn.addEventListener("click", () => {
        this.handleDesignTemplateSelection();
      });
    }

    const createStyleGuideSubmitBtn = document.getElementById(
      "createStyleGuideSubmitBtn"
    );
    if (createStyleGuideSubmitBtn) {
      createStyleGuideSubmitBtn.addEventListener("click", () => {
        this.handleCreateStyleGuide();
      });
    }

    // Design template options
    const designTemplateOptions = document.querySelectorAll(
      ".design-template-option"
    );
    designTemplateOptions.forEach((option) => {
      option.addEventListener("click", () => {
        this.selectDesignTemplate(option);
      });
    });

    // Contacts management functionality
    const addContactBtn = document.getElementById("addContactBtn");
    if (addContactBtn) {
      addContactBtn.addEventListener("click", () => {
        this.showAddContactModal();
      });
    }

    const importContactBtn = document.getElementById("importContactBtn");
    if (importContactBtn) {
      importContactBtn.addEventListener("click", () => {
        this.showImportContactModal();
      });
    }

    // Document upload input change
    const documentFileInput = document.getElementById("documentFileInput");
    if (documentFileInput) {
      documentFileInput.addEventListener("change", (e) => {
        this.handleFileSelection(e);
      });
    }

    // Design Studio Gallery functionality
    const addImagesGalleryBtn = document.getElementById("addImagesGalleryBtn");
    if (addImagesGalleryBtn) {
      addImagesGalleryBtn.addEventListener("click", () => {
        this.showNotification("Add Images feature coming soon!", "info");
      });
    }

    const createNewStyleGuideGalleryBtn = document.getElementById(
      "createNewStyleGuideGalleryBtn"
    );
    if (createNewStyleGuideGalleryBtn) {
      createNewStyleGuideGalleryBtn.addEventListener("click", () => {
        this.showCreateStyleGuideModal();
      });
    }

    // Add Note functionality
    const addNoteSubmitBtn = document.getElementById("addNoteSubmitBtn");
    if (addNoteSubmitBtn) {
      addNoteSubmitBtn.addEventListener("click", () => {
        this.handleAddNote();
      });
    }

    // Budget template options
    const budgetTemplateOptions = document.querySelectorAll(
      ".budget-template-option"
    );
    budgetTemplateOptions.forEach((option) => {
      option.addEventListener("click", () => {
        this.selectBudgetTemplate(option);
      });
    });

    const selectBudgetTemplateBtn = document.getElementById(
      "selectBudgetTemplateBtn"
    );
    if (selectBudgetTemplateBtn) {
      selectBudgetTemplateBtn.addEventListener("click", () => {
        this.handleBudgetTemplateSelection();
      });
    }

    // Budget functionality
    const addBudgetSectionBtn = document.getElementById("addBudgetSectionBtn");
    if (addBudgetSectionBtn) {
      addBudgetSectionBtn.addEventListener("click", () => {
        this.addBudgetSection();
      });
    }

    // Add budget item buttons (+ icons)
    document.addEventListener("click", (e) => {
      if (e.target.closest(".add-budget-item-btn")) {
        const btn = e.target.closest(".add-budget-item-btn");
        const sectionId = btn.getAttribute("data-section");
        this.toggleBudgetTable(sectionId);
      }
    });

    const budgetDetailsSubmitBtn = document.getElementById(
      "budgetDetailsSubmitBtn"
    );
    if (budgetDetailsSubmitBtn) {
      budgetDetailsSubmitBtn.addEventListener("click", () => {
        this.handleBudgetDetailsSubmit();
      });
    }

    // Contacts functionality
    const contactSearch = document.getElementById("contactSearch");
    if (contactSearch) {
      contactSearch.addEventListener("input", (e) => {
        this.filterContacts(e.target.value);
      });
    }

    const categoryFilter = document.getElementById("categoryFilter");
    if (categoryFilter) {
      categoryFilter.addEventListener("change", (e) => {
        this.filterContactsByCategory(e.target.value);
      });
    }

    // Global modal cleanup event listeners
    document.addEventListener("hidden.bs.modal", () => {
      setTimeout(() => this.cleanupModalArtifacts(), 100);
    });

    // Window resize handler
    window.addEventListener("resize", () => this.handleResize());
  }
  // ...existing code...

  setupEventListeners() {
    // Sidebar toggle functionality
    const sidebarToggle = document.getElementById("sidebarToggle");
    const sidebarToggleMain = document.getElementById("sidebarToggleMain");
    const sidebar = document.getElementById("sidebar");

    if (sidebarToggle) {
      sidebarToggle.addEventListener("click", () => this.toggleSidebar());
    }

    if (sidebarToggleMain) {
      sidebarToggleMain.addEventListener("click", () =>
        this.toggleMobileSidebar()
      );
    }

    // Only handle active state for nav-tabs, not sidebar nav-link
    const tabButtons = document.querySelectorAll("#eventTabs .nav-link");
    tabButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        this.handleTabSwitch(e.target);
      });
    });

    // Calendar navigation
    const prevBtn = document.getElementById("prevMonth");
    const nextBtn = document.getElementById("nextMonth");
    const todayBtn = document.getElementById("todayBtn");

    if (prevBtn) {
      prevBtn.addEventListener("click", () => this.previousMonth());
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => this.nextMonth());
    }

    if (todayBtn) {
      todayBtn.addEventListener("click", () => this.goToToday());
    }

    // Logout functionality
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        this.handleLogout();
      });
    }

    // Modal functionality
    const addAccessBtn = document.getElementById("addAccessBtn");
    if (addAccessBtn) {
      addAccessBtn.addEventListener("click", () => {
        this.handleAddAccess();
      });
    }

    // Checklist functionality
    const importTemplateBtn = document.getElementById("importTemplateBtn");
    if (importTemplateBtn) {
      importTemplateBtn.addEventListener("click", () => {
        this.showTemplateSelectionModal();
      });
    }

    const selectTemplateBtn = document.getElementById("selectTemplateBtn");
    if (selectTemplateBtn) {
      selectTemplateBtn.addEventListener("click", () => {
        this.handleTemplateSelection();
      });
    }

    const addChecklistBtn = document.getElementById("addChecklistBtn");
    if (addChecklistBtn) {
      addChecklistBtn.addEventListener("click", () => {
        this.showAddChecklistModal();
      });
    }

    const addChecklistSubmitBtn = document.getElementById(
      "addChecklistSubmitBtn"
    );
    if (addChecklistSubmitBtn) {
      addChecklistSubmitBtn.addEventListener("click", () => {
        this.handleAddChecklist();
      });
    }

    const addTaskSubmitBtn = document.getElementById("addTaskSubmitBtn");
    if (addTaskSubmitBtn) {
      addTaskSubmitBtn.addEventListener("click", () => {
        this.handleAddTask();
      });
    }

    // Template options
    const templateOptions = document.querySelectorAll(".template-option");
    templateOptions.forEach((option) => {
      option.addEventListener("click", () => {
        this.selectTemplate(option);
      });
    });

    // Add task buttons
    const addTaskBtns = document.querySelectorAll(".add-task-btn");
    addTaskBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.showAddTaskModal(btn.dataset.category);
      });
    });

    // Guest management functionality
    const addGuestBtn = document.getElementById("addGuestBtn");
    if (addGuestBtn) {
      addGuestBtn.addEventListener("click", () => {
        this.showAddGuestModal();
      });
    }

    const addGuestSubmitBtn = document.getElementById("addGuestSubmitBtn");
    if (addGuestSubmitBtn) {
      addGuestSubmitBtn.addEventListener("click", () => {
        this.handleAddGuest();
      });
    }

    const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
    if (confirmDeleteBtn) {
      confirmDeleteBtn.addEventListener("click", () => {
        this.handleDeleteGuest();
      });
    }

    // Checklist functionality
    const checkboxes = document.querySelectorAll(
      '.checklist-item input[type="checkbox"]'
    );
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", (e) => {
        this.handleChecklistChange(e.target);
      });
    });

    // Design Studio functionality
    const chooseFromTemplatesBtn = document.getElementById(
      "chooseFromTemplatesBtn"
    );
    if (chooseFromTemplatesBtn) {
      chooseFromTemplatesBtn.addEventListener("click", () => {
        this.showDesignTemplateSelectionModal();
      });
    }
    const chooseFromBudgetBtn = document.getElementById("chooseFromBudgetBtn");
    if (chooseFromBudgetBtn) {
      chooseFromBudgetBtn.addEventListener("click", () => {
        this.showBudgetTemplateSelectionModal();
      });
    }

    const createNewBudgetBtn = document.getElementById("createNewBudgetBtn");
    if (createNewBudgetBtn) {
      createNewBudgetBtn.addEventListener("click", () => {
        this.showCreateStyleGuideModal();
      });
    }

    const createNewStyleGuideBtn = document.getElementById(
      "createNewStyleGuideBtn"
    );
    if (createNewStyleGuideBtn) {
      createNewStyleGuideBtn.addEventListener("click", () => {
        this.showCreateStyleGuideModal();
      });
    }
    const createNewStyleGuideBtnContent = document.getElementById(
      "createNewStyleGuideBtnContent"
    );
    if (createNewStyleGuideBtnContent) {
      createNewStyleGuideBtnContent.addEventListener("click", () => {
        this.showCreateStyleGuideModal();
      });
    }

    const selectDesignTemplateBtn = document.getElementById(
      "selectDesignTemplateBtn"
    );
    if (selectDesignTemplateBtn) {
      selectDesignTemplateBtn.addEventListener("click", () => {
        this.handleDesignTemplateSelection();
      });
    }

    const createStyleGuideSubmitBtn = document.getElementById(
      "createStyleGuideSubmitBtn"
    );
    if (createStyleGuideSubmitBtn) {
      createStyleGuideSubmitBtn.addEventListener("click", () => {
        this.handleCreateStyleGuide();
      });
    }

    // Design template options
    const designTemplateOptions = document.querySelectorAll(
      ".design-template-option"
    );
    designTemplateOptions.forEach((option) => {
      option.addEventListener("click", () => {
        this.selectDesignTemplate(option);
      });
    });

    // Contacts management functionality
    const addContactBtn = document.getElementById("addContactBtn");
    if (addContactBtn) {
      addContactBtn.addEventListener("click", () => {
        this.showAddContactModal();
      });
    }

    const importContactBtn = document.getElementById("importContactBtn");
    if (importContactBtn) {
      importContactBtn.addEventListener("click", () => {
        this.showImportContactModal();
      });
    }

    // Document upload input change
    const documentFileInput = document.getElementById("documentFileInput");
    if (documentFileInput) {
      documentFileInput.addEventListener("change", (e) => {
        this.handleFileSelection(e);
      });
    }

    // Design Studio Gallery functionality
    const addImagesGalleryBtn = document.getElementById("addImagesGalleryBtn");
    if (addImagesGalleryBtn) {
      addImagesGalleryBtn.addEventListener("click", () => {
        this.showNotification("Add Images feature coming soon!", "info");
      });
    }

    const createNewStyleGuideGalleryBtn = document.getElementById(
      "createNewStyleGuideGalleryBtn"
    );
    if (createNewStyleGuideGalleryBtn) {
      createNewStyleGuideGalleryBtn.addEventListener("click", () => {
        this.showCreateStyleGuideModal();
      });
    }

    // Add Note functionality
    const addNoteSubmitBtn = document.getElementById("addNoteSubmitBtn");
    if (addNoteSubmitBtn) {
      addNoteSubmitBtn.addEventListener("click", () => {
        this.handleAddNote();
      });
    }

    // Budget template options
    const budgetTemplateOptions = document.querySelectorAll(
      ".budget-template-option"
    );
    budgetTemplateOptions.forEach((option) => {
      option.addEventListener("click", () => {
        this.selectBudgetTemplate(option);
      });
    });

    const selectBudgetTemplateBtn = document.getElementById(
      "selectBudgetTemplateBtn"
    );
    if (selectBudgetTemplateBtn) {
      selectBudgetTemplateBtn.addEventListener("click", () => {
        this.handleBudgetTemplateSelection();
      });
    }

    // Budget functionality
    const addBudgetSectionBtn = document.getElementById("addBudgetSectionBtn");
    if (addBudgetSectionBtn) {
      addBudgetSectionBtn.addEventListener("click", () => {
        this.addBudgetSection();
      });
    }

    // Add budget item buttons (+ icons)
    document.addEventListener("click", (e) => {
      if (e.target.closest(".add-budget-item-btn")) {
        const btn = e.target.closest(".add-budget-item-btn");
        const sectionId = btn.getAttribute("data-section");
        this.toggleBudgetTable(sectionId);
      }
    });

    const budgetDetailsSubmitBtn = document.getElementById(
      "budgetDetailsSubmitBtn"
    );
    if (budgetDetailsSubmitBtn) {
      budgetDetailsSubmitBtn.addEventListener("click", () => {
        this.handleBudgetDetailsSubmit();
      });
    }

    // Contacts functionality
    const contactSearch = document.getElementById("contactSearch");
    if (contactSearch) {
      contactSearch.addEventListener("input", (e) => {
        this.filterContacts(e.target.value);
      });
    }

    const categoryFilter = document.getElementById("categoryFilter");
    if (categoryFilter) {
      categoryFilter.addEventListener("change", (e) => {
        this.filterContactsByCategory(e.target.value);
      });
    }

    // Global modal cleanup event listeners
    document.addEventListener("hidden.bs.modal", () => {
      setTimeout(() => this.cleanupModalArtifacts(), 100);
    });

    // Window resize handler
    window.addEventListener("resize", () => this.handleResize());
  }
  initializeNotesData() {
    // Setup Notes tab event listeners
    const notesEventFilter = document.getElementById("notesEventFilter");
    const notesSearch = document.getElementById("notesSearch");
    const createNotesTemplateBtn = document.getElementById(
      "createNotesTemplateBtn"
    );
    const notesBudgetDetailsBtn = document.getElementById(
      "notesBudgetDetailsBtn"
    );
    const addNoteBtn = document.getElementById("addNoteBtn");
    const confirmDeleteNoteBtn = document.getElementById(
      "confirmDeleteNoteBtn"
    );
    const addAttachmentBtn = document.getElementById("addAttachmentBtn");

    if (notesEventFilter) {
      notesEventFilter.addEventListener("change", (e) => {
        this.handleNotesFilter(e.target.value);
      });
    }

    if (notesSearch) {
      notesSearch.addEventListener("input", (e) => {
        this.handleNotesSearch(e.target.value);
      });
    }

    if (createNotesTemplateBtn) {
      createNotesTemplateBtn.addEventListener("click", () => {
        this.handleCreateNotesTemplate();
      });
    }

    if (notesBudgetDetailsBtn) {
      notesBudgetDetailsBtn.addEventListener("click", () => {
        this.handleNotesBudgetDetails();
      });
    }

    if (addNoteBtn) {
      addNoteBtn.addEventListener("click", () => {
        this.handleAddNote();
      });
    }

    if (confirmDeleteNoteBtn) {
      confirmDeleteNoteBtn.addEventListener("click", () => {
        this.confirmDeleteNote();
      });
    }

    if (addAttachmentBtn) {
      addAttachmentBtn.addEventListener("click", () => {
        this.handleAddAttachment();
      });
    }

    // Setup dropdown for Notes event type
    this.setupNotesDropdown();
  }
  viewNotesTemplate(templateId) {
    this.showNotesDetailView();
  }

  editNotesTemplate(templateId) {
    this.showMessage("Edit functionality will be implemented soon", "info");
  }

  deleteNotesTemplate(templateId) {
    if (confirm("Are you sure you want to delete this notes template?")) {
      this.notesTemplates = this.notesTemplates.filter(
        (t) => t.id !== templateId
      );
      this.filteredNotesTemplates = this.filteredNotesTemplates.filter(
        (t) => t.id !== templateId
      );
      this.renderNotesTemplates();
      this.showMessage("Notes template deleted successfully!", "success");
    }
  }

  handleNotesSearch(searchTerm) {
    this.filteredNotesTemplates = this.notesTemplates.filter(
      (template) =>
        template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    this.renderNotesTemplates();
  }

  handleNotesFilter(eventType) {
    if (eventType === "") {
      this.filteredNotesTemplates = [...this.notesTemplates];
    } else {
      this.filteredNotesTemplates = this.notesTemplates.filter(
        (template) => template.type === eventType
      );
    }
    this.renderNotesTemplates();
  }

  handleCreateNotesTemplate() {
    const eventTypeInput = document.getElementById("notesEventType");
    const titleInput = document.getElementById("notesTemplateTitle");

    if (!eventTypeInput.value || !titleInput.value.trim()) {
      this.showMessage("Please fill in all required fields", "error");
      return;
    }

    const newTemplate = {
      id: Date.now(),
      title: titleInput.value.trim(),
      type: eventTypeInput.getAttribute("data-value") || "wedding",
      category: eventTypeInput.value,
      image: this.getDefaultImage(
        eventTypeInput.getAttribute("data-value") || "wedding"
      ),
      createdDate: new Date().toLocaleDateString("en-GB"),
      eventType: eventTypeInput.value,
    };

    this.notesTemplates.push(newTemplate);
    this.filteredNotesTemplates = [...this.notesTemplates];
    this.renderNotesTemplates();

    // Reset form
    eventTypeInput.value = "";
    titleInput.value = "";

    // Close modal
    const modal = bootstrap.Modal.getInstance(
      document.getElementById("createNotesTemplateModal")
    );
    modal.hide();

    this.showMessage("Notes template created successfully!", "success");
  }

  showNotesBudgetModal(templateId) {
    // Only show on actual hover, not when clicking
    setTimeout(() => {
      const modal = new bootstrap.Modal(
        document.getElementById("notesBudgetDetailsModal")
      );
      modal.show();
    }, 500);
  }

  handleNotesBudgetDetails() {
    const titleInput = document.getElementById("notesBudgetTitle");

    if (!titleInput.value.trim()) {
      this.showMessage("Please enter a title", "error");
      return;
    }

    // Close current modal
    const modal = bootstrap.Modal.getInstance(
      document.getElementById("notesBudgetDetailsModal")
    );
    modal.hide();

    // Navigate to notes detail view
    setTimeout(() => {
      this.showNotesDetailView();
    }, 300);
  }

  showNotesDetailView() {
    // Hide the notes grid and show detail view
    const notesTab = document.getElementById("notes");
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
                            ${this.showArchived ? "Active" : "Archived"}
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
  renderNotesTemplates() {
    const notesGrid = document.getElementById("notesGrid");
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

    notesGrid.innerHTML = this.filteredNotesTemplates
      .map(
        (template) => `
            <div class="notes-card" onclick="templateManager.viewNotesTemplate(${
              template.id
            })" 
                 onmouseenter="templateManager.showNotesBudgetModal(${
                   template.id
                 })">
                <div class="notes-card-image" style="background-image: url('${
                  template.image
                }')">
                    <div class="notes-card-actions">
                        <button class="notes-action-btn" onclick="event.stopPropagation(); templateManager.editNotesTemplate(${
                          template.id
                        })" title="Edit">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="notes-action-btn delete" onclick="event.stopPropagation(); templateManager.deleteNotesTemplate(${
                          template.id
                        })" title="Delete">
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
                        <span>${
                          template.updatedDate ? "Updated On:" : "Created On:"
                        } ${template.updatedDate || template.createdDate}</span>
                    </div>
                </div>
            </div>
        `
      )
      .join("");
  }
  renderNotesList() {
    const filteredNotes = this.notes.filter((note) =>
      this.showArchived ? note.status === "archived" : note.status === "active"
    );

    if (filteredNotes.length === 0) {
      return `
                <div class="text-center py-5">
                    <i class="fas fa-sticky-note fa-3x text-muted mb-3"></i>
                    <h4>No ${
                      this.showArchived ? "archived" : "active"
                    } notes found</h4>
                    <p class="text-muted">Add some notes to get started</p>
                </div>
            `;
    }

    return filteredNotes
      .map(
        (note) => `
            <div class="note-item">
                <div class="note-header">
                    <div class="note-author">
                        <div class="note-avatar" style="background-color: ${
                          note.avatarColor
                        }">
                            ${note.initials}
                        </div>
                        <div class="note-author-info">
                            <h6>${note.author}</h6>
                            <p class="note-date">${note.date}</p>
                        </div>
                    </div>
                    <div class="note-actions">
                        <span class="note-status ${note.status}">${
          note.status === "archived" ? "Archived" : "Active"
        }</span>
                        <button class="note-action-btn" onclick="templateManager.showAttachmentsModal(${
                          note.id
                        })" title="Attachment">
                            <i class="fas fa-paperclip"></i>
                        </button>
                        <button class="note-action-btn" onclick="templateManager.editNote(${
                          note.id
                        })" title="Edit">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="note-action-btn delete" onclick="templateManager.showDeleteNoteModal(${
                          note.id
                        })" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                        <button class="note-action-btn archive" onclick="templateManager.toggleNoteArchive(${
                          note.id
                        })" title="${
          note.status === "archived" ? "Unarchive" : "Archive"
        }">
                            <i class="fas fa-${
                              note.status === "archived"
                                ? "folder-open"
                                : "archive"
                            }"></i>
                        </button>
                    </div>
                </div>
                <div class="note-content">
                    ${note.content}
                </div>
            </div>
        `
      )
      .join("");
  }

  renderNotesList() {
    const filteredNotes = this.notes.filter((note) =>
      this.showArchived ? note.status === "archived" : note.status === "active"
    );

    if (filteredNotes.length === 0) {
      return `
                <div class="text-center py-5">
                    <i class="fas fa-sticky-note fa-3x text-muted mb-3"></i>
                    <h4>No ${
                      this.showArchived ? "archived" : "active"
                    } notes found</h4>
                    <p class="text-muted">Add some notes to get started</p>
                </div>
            `;
    }

    return filteredNotes
      .map(
        (note) => `
            <div class="note-item">
                <div class="note-header">
                    <div class="note-author">
                        <div class="note-avatar" style="background-color: ${
                          note.avatarColor
                        }">
                            ${note.initials}
                        </div>
                        <div class="note-author-info">
                            <h6>${note.author}</h6>
                            <p class="note-date">${note.date}</p>
                        </div>
                    </div>
                    <div class="note-actions">
                        <span class="note-status ${note.status}">${
          note.status === "archived" ? "Archived" : "Active"
        }</span>
                        <button class="note-action-btn" onclick="templateManager.showAttachmentsModal(${
                          note.id
                        })" title="Attachment">
                            <i class="fas fa-paperclip"></i>
                        </button>
                        <button class="note-action-btn" onclick="templateManager.editNote(${
                          note.id
                        })" title="Edit">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="note-action-btn delete" onclick="templateManager.showDeleteNoteModal(${
                          note.id
                        })" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                        <button class="note-action-btn archive" onclick="templateManager.toggleNoteArchive(${
                          note.id
                        })" title="${
          note.status === "archived" ? "Unarchive" : "Archive"
        }">
                            <i class="fas fa-${
                              note.status === "archived"
                                ? "folder-open"
                                : "archive"
                            }"></i>
                        </button>
                    </div>
                </div>
                <div class="note-content">
                    ${note.content}
                </div>
            </div>
        `
      )
      .join("");
  }
  backToNotesGrid() {
    const notesTab = document.getElementById("notes");
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
    const modal = new bootstrap.Modal(document.getElementById("addNoteModal"));
    modal.show();
  }

  handleAddNote() {
    const noteText = document.getElementById("noteText");

    if (!noteText.value.trim()) {
      this.showMessage("Please enter note content", "error");
      return;
    }

    const newNote = {
      id: Date.now(),
      author: "John Doe",
      initials: "JD",
      date: new Date().toLocaleDateString("en-GB"),
      content: noteText.value.trim(),
      status: "active",
      avatarColor: "#22c55e",
    };

    this.notes.push(newNote);

    // Close modal
    const modal = bootstrap.Modal.getInstance(
      document.getElementById("addNoteModal")
    );
    modal.hide();

    // Show success modal
    setTimeout(() => {
      const successModal = new bootstrap.Modal(
        document.getElementById("noteSuccessModal")
      );
      successModal.show();
    }, 300);

    // Reset form
    noteText.value = "";

    // Refresh notes list
    this.showNotesDetailView();
  }

  editNote(noteId) {
    const note = this.notes.find((n) => n.id === noteId);
    if (note) {
      // Pre-fill the add note modal with existing content
      document.getElementById("noteText").value = note.content;
      document.getElementById("addNoteModalLabel").textContent = "Edit Note";
      document.getElementById("addNoteBtn").textContent = "Update";
      document.getElementById("addNoteBtn").onclick = () =>
        this.updateNote(noteId);

      const modal = new bootstrap.Modal(
        document.getElementById("addNoteModal")
      );
      modal.show();
    }
  }

  updateNote(noteId) {
    const noteText = document.getElementById("noteText");
    const note = this.notes.find((n) => n.id === noteId);

    if (!noteText.value.trim()) {
      this.showMessage("Please enter note content", "error");
      return;
    }

    if (note) {
      note.content = noteText.value.trim();
      note.date = new Date().toLocaleDateString("en-GB");
    }

    // Close modal
    const modal = bootstrap.Modal.getInstance(
      document.getElementById("addNoteModal")
    );
    modal.hide();

    // Show success modal
    setTimeout(() => {
      const successModal = new bootstrap.Modal(
        document.getElementById("updateSuccessModal")
      );
      successModal.show();
    }, 300);

    // Reset modal
    document.getElementById("addNoteModalLabel").textContent = "Add Note";
    document.getElementById("addNoteBtn").textContent = "Add";
    document.getElementById("addNoteBtn").onclick = () => this.handleAddNote();
    noteText.value = "";

    // Refresh notes list
    this.showNotesDetailView();
  }

  showDeleteNoteModal(noteId) {
    this.currentNoteId = noteId;
    const modal = new bootstrap.Modal(
      document.getElementById("deleteNoteModal")
    );
    modal.show();
  }

  confirmDeleteNote() {
    if (this.currentNoteId) {
      this.notes = this.notes.filter((n) => n.id !== this.currentNoteId);

      // Close modal
      const modal = bootstrap.Modal.getInstance(
        document.getElementById("deleteNoteModal")
      );
      modal.hide();

      // Refresh notes list
      this.showNotesDetailView();
      this.showMessage("Note deleted successfully!", "success");
      this.currentNoteId = null;
    }
  }

  toggleNoteArchive(noteId) {
    const note = this.notes.find((n) => n.id === noteId);
    if (note) {
      note.status = note.status === "archived" ? "active" : "archived";
      this.showNotesDetailView();
      this.showMessage(
        `Note ${
          note.status === "archived" ? "archived" : "unarchived"
        } successfully!`,
        "success"
      );
    }
  }
  // ...existing code...
  toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const mainContent = document.getElementById("mainContent");

    this.sidebarCollapsed = !this.sidebarCollapsed;

    if (this.sidebarCollapsed) {
      sidebar.classList.add("collapsed");
      mainContent.classList.add("collapsed");
    } else {
      sidebar.classList.remove("collapsed");
      mainContent.classList.remove("collapsed");
    }

    // Store sidebar state
    localStorage.setItem("sidebarCollapsed", this.sidebarCollapsed);

    // Trigger resize event to update any dynamic content
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 300);
  }

  toggleMobileSidebar() {
    const sidebar = document.getElementById("sidebar");
    const overlay = this.getOrCreateOverlay();

    if (sidebar.classList.contains("show")) {
      sidebar.classList.remove("show");
      overlay.classList.remove("show");
      document.body.style.overflow = "";
    } else {
      sidebar.classList.add("show");
      overlay.classList.add("show");
      document.body.style.overflow = "hidden";
    }
  }

  getOrCreateOverlay() {
    let overlay = document.querySelector(".sidebar-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.className = "sidebar-overlay";
      overlay.addEventListener("click", () => this.toggleMobileSidebar());
      document.body.appendChild(overlay);
    }
    return overlay;
  }

  setActiveNavLink(activeLink) {
    // Remove active class from all nav links
    const navLinks = document.querySelectorAll(".sidebar .nav-link");
    navLinks.forEach((link) => link.classList.remove("active"));

    // Add active class to clicked link
    activeLink.classList.add("active");
  }

  initializeMobileHandlers() {
    // Close mobile sidebar when clicking outside
    document.addEventListener("click", (e) => {
      const sidebar = document.getElementById("sidebar");
      const sidebarToggle = document.getElementById("sidebarToggleMain");

      if (
        window.innerWidth <= 768 &&
        sidebar.classList.contains("show") &&
        !sidebar.contains(e.target) &&
        !sidebarToggle.contains(e.target)
      ) {
        this.toggleMobileSidebar();
      }
    });

    // Handle swipe gestures for mobile
    this.initializeSwipeGestures();
  }

  initializeSwipeGestures() {
    let startX = 0;
    let endX = 0;

    document.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });

    document.addEventListener("touchend", (e) => {
      endX = e.changedTouches[0].clientX;
      const diff = startX - endX;

      if (Math.abs(diff) > 50) {
        // Minimum swipe distance
        if (diff > 0 && startX < 50) {
          // Swipe left from edge - close sidebar
          const sidebar = document.getElementById("sidebar");
          if (sidebar.classList.contains("show")) {
            this.toggleMobileSidebar();
          }
        } else if (diff < 0 && startX < 50) {
          // Swipe right from edge - open sidebar
          const sidebar = document.getElementById("sidebar");
          if (!sidebar.classList.contains("show")) {
            this.toggleMobileSidebar();
          }
        }
      }
    });
  }

  generateCalendar() {
    const calendar = document.getElementById("calendar");
    if (!calendar) return;

    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    // Update calendar header
    const calendarHeader = document.querySelector(".calendar-header h5");
    if (calendarHeader) {
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      calendarHeader.textContent = `${monthNames[month]} ${year}`;
    }

    // Create calendar grid
    const calendarGrid = document.createElement("div");
    calendarGrid.className = "calendar-grid";

    // Add day headers
    const dayHeaders = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    dayHeaders.forEach((day) => {
      const dayHeader = document.createElement("div");
      dayHeader.className = "calendar-header-day";
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
      if (month === 4 && year === 2025) {
        // May 2025
        if (day === 1) {
          dayElement.classList.add("highlighted-purple");
        } else if (day === 10) {
          dayElement.classList.add("highlighted-green");
        } else if (day === 15) {
          dayElement.classList.add("highlighted-blue");
        } else if (day === 18) {
          dayElement.classList.add("highlighted-pink");
        } else if (day === 21) {
          dayElement.classList.add("today");
        }
      }

      // Mark today
      const today = new Date();
      if (
        day === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear()
      ) {
        dayElement.classList.add("today");
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
    calendar.innerHTML = "";
    calendar.appendChild(calendarGrid);
  }

  createDayElement(day, isOtherMonth) {
    const dayElement = document.createElement("div");
    dayElement.className = "calendar-day";
    dayElement.textContent = day;

    if (isOtherMonth) {
      dayElement.classList.add("other-month");
    }

    dayElement.addEventListener("click", () => {
      this.selectDate(day, isOtherMonth);
    });

    return dayElement;
  }

  selectDate(day, isOtherMonth) {
    // Remove previous selection
    const selectedDays = document.querySelectorAll(".calendar-day.selected");
    selectedDays.forEach((day) => day.classList.remove("selected"));

    // Add selection to clicked day
    event.target.classList.add("selected");

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
    switch (tabName.toLowerCase()) {
      case "overview":
        this.loadOverviewData();
        break;
      case "checklist":
        this.loadChecklistData();
        break;
      case "guest list":
        this.loadGuestListData();
        break;
    }
  }

  loadOverviewData() {
    // Load overview data
    console.log("Loading overview data...");
  }

  loadChecklistData() {
    // Load checklist data
    console.log("Loading checklist data...");
  }

  loadGuestListData() {
    // Load guest list data
    console.log("Loading guest list data...");
  }

  handleChecklistChange(checkbox) {
    const item = checkbox.closest(".checklist-item");
    const text = item.querySelector(".checklist-text");

    if (checkbox.checked) {
      text.style.textDecoration = "line-through";
      text.style.opacity = "0.7";
    } else {
      text.style.textDecoration = "none";
      text.style.opacity = "1";
    }

    // Here you could save the checklist state to localStorage or send to server
    this.saveChecklistState();
  }

  saveChecklistState() {
    const checkboxes = document.querySelectorAll(
      '.checklist-item input[type="checkbox"]'
    );
    const checklistState = Array.from(checkboxes).map((checkbox) => ({
      text: checkbox.nextElementSibling.textContent,
      checked: checkbox.checked,
    }));

    localStorage.setItem("eventChecklistState", JSON.stringify(checklistState));
  }

  loadChecklistState() {
    const savedState = localStorage.getItem("eventChecklistState");
    if (savedState) {
      const checklistState = JSON.parse(savedState);
      const checkboxes = document.querySelectorAll(
        '.checklist-item input[type="checkbox"]'
      );

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
    if (confirm("Are you sure you want to logout?")) {
      // Clear any stored data
      localStorage.removeItem("eventChecklistState");
      localStorage.removeItem("userSession");

      // Redirect to login page or show logout message
      alert("You have been logged out successfully!");

      // In a real application, you would redirect to login page
      // window.location.href = '/login';
    }
  }

  handleAddAccess() {
    // Close the module access modal
    const moduleAccessModal = bootstrap.Modal.getInstance(
      document.getElementById("moduleAccessModal")
    );
    if (moduleAccessModal) {
      moduleAccessModal.hide();
    }

    // Show success modal after a short delay
    setTimeout(() => {
      this.cleanupModalArtifacts();
      const successModal = new bootstrap.Modal(
        document.getElementById("successModal")
      );
      successModal.show();

      // Add event listener to continue button to change the button state
      const continueBtn = document.querySelector(
        '#successModal button[data-bs-dismiss="modal"]'
      );
      if (continueBtn) {
        continueBtn.addEventListener(
          "click",
          () => {
            this.changeInvitationStatus();
            setTimeout(() => this.cleanupModalArtifacts(), 100);
          },
          { once: true }
        );
      }
    }, 300);
  }

  changeInvitationStatus() {
    const notInvitedBtn = document.getElementById("notInvitedBtn");
    if (notInvitedBtn) {
      notInvitedBtn.className = "btn btn-success-custom";
      notInvitedBtn.innerHTML = '<i class="fas fa-check me-2"></i>Invited';
      notInvitedBtn.removeAttribute("data-bs-toggle");
      notInvitedBtn.removeAttribute("data-bs-target");
    }
  }

  // Checklist Methods
  showTemplateSelectionModal() {
    const templateModal = new bootstrap.Modal(
      document.getElementById("templateSelectionModal")
    );
    templateModal.show();
  }

  selectTemplate(option) {
    // Remove active class from all options
    document.querySelectorAll(".template-option").forEach((opt) => {
      opt.classList.remove("active");
    });

    // Add active class to selected option
    option.classList.add("active");
  }

  handleTemplateSelection() {
    // Hide template selection modal
    const templateModal = bootstrap.Modal.getInstance(
      document.getElementById("templateSelectionModal")
    );
    if (templateModal) {
      templateModal.hide();
    }

    // Clean up modal artifacts and show checklist content
    setTimeout(() => {
      this.cleanupModalArtifacts();
      document.getElementById("importTemplateView").classList.add("d-none");
      document
        .getElementById("checklistContentView")
        .classList.remove("d-none");
    }, 300);
  }

  showAddChecklistModal() {
    const addChecklistModal = new bootstrap.Modal(
      document.getElementById("addChecklistModal")
    );
    addChecklistModal.show();
  }

  handleAddChecklist() {
    const title = document.getElementById("checklistTitle").value;
    if (title.trim()) {
      // Here you would typically add the new checklist to the accordion
      console.log("Adding new checklist:", title);

      // Clear the form
      document.getElementById("checklistTitle").value = "";

      // Close modal
      const addChecklistModal = bootstrap.Modal.getInstance(
        document.getElementById("addChecklistModal")
      );
      if (addChecklistModal) {
        addChecklistModal.hide();
        setTimeout(() => this.cleanupModalArtifacts(), 100);
      }
    }
  }

  showAddTaskModal(category) {
    this.currentTaskCategory = category;
    const addTaskModal = new bootstrap.Modal(
      document.getElementById("addTaskModal")
    );
    addTaskModal.show();
  }

  handleAddTask() {
    const taskTitle = document.getElementById("taskTitle").value;
    const dueDate = document.getElementById("taskDueDate").value;
    const assignee = document.getElementById("taskAssignee").value;

    if (taskTitle.trim()) {
      // Here you would typically add the new task to the appropriate category
      console.log("Adding new task:", {
        title: taskTitle,
        dueDate: dueDate,
        assignee: assignee,
        category: this.currentTaskCategory,
      });

      // Clear the form
      document.getElementById("taskTitle").value = "";
      document.getElementById("taskDueDate").value = "";
      document.getElementById("taskAssignee").value = "";

      // Close modal
      const addTaskModal = bootstrap.Modal.getInstance(
        document.getElementById("addTaskModal")
      );
      if (addTaskModal) {
        addTaskModal.hide();
      }
    }
  }

  // Guest Management Methods
  showAddGuestModal() {
    const addGuestModal = new bootstrap.Modal(
      document.getElementById("addGuestModal")
    );
    addGuestModal.show();
  }

  handleAddGuest() {
    const firstName = document.getElementById("guestFirstName").value;
    const lastName = document.getElementById("guestLastName").value;
    const prefix = document.getElementById("guestPrefix").value;
    const relation = document.getElementById("guestRelation").value;
    const whatsapp = document.getElementById("guestWhatsapp").value;
    const invites = document.getElementById("guestInvites").value;

    if (firstName.trim() && lastName.trim()) {
      // Clear the form
      document.getElementById("guestFirstName").value = "";
      document.getElementById("guestLastName").value = "";
      document.getElementById("guestPrefix").value = "";
      document.getElementById("guestRelation").value = "";
      document.getElementById("guestWhatsapp").value = "";
      document.getElementById("guestInvites").value = "";

      // Close add guest modal
      const addGuestModal = bootstrap.Modal.getInstance(
        document.getElementById("addGuestModal")
      );
      if (addGuestModal) {
        addGuestModal.hide();
      }

      // Show success modal
      setTimeout(() => {
        document.getElementById(
          "guestSuccessName"
        ).textContent = `${firstName} ${lastName}`;
        document.getElementById("guestSuccessAction").textContent = "added";
        const successModal = new bootstrap.Modal(
          document.getElementById("guestSuccessModal")
        );
        successModal.show();
      }, 300);
    }
  }

  handleDeleteGuest() {
    const guestName = this.currentDeleteGuest;

    // Close delete confirmation modal
    const deleteModal = bootstrap.Modal.getInstance(
      document.getElementById("deleteGuestModal")
    );
    if (deleteModal) {
      deleteModal.hide();
    }

    // Show success modal for deletion
    setTimeout(() => {
      document.getElementById("guestSuccessName").textContent = guestName;
      document.getElementById("guestSuccessAction").textContent = "deleted";
      const successModal = new bootstrap.Modal(
        document.getElementById("guestSuccessModal")
      );
      successModal.show();
    }, 300);
  }

  // Design Studio Methods
  showDesignTemplateSelectionModal() {
    const designTemplateModal = new bootstrap.Modal(
      document.getElementById("designTemplateSelectionModal")
    );
    designTemplateModal.show();
  }

  showCreateStyleGuideModal() {
    const createStyleGuideModal = new bootstrap.Modal(
      document.getElementById("createStyleGuideModal")
    );
    createStyleGuideModal.show();
  }

  selectDesignTemplate(option) {
    // Remove active class from all design template options
    document.querySelectorAll(".design-template-option").forEach((opt) => {
      opt.classList.remove("active");
    });

    // Add active class to selected option
    option.classList.add("active");
  }

  handleDesignTemplateSelection() {
    // Hide template selection modal
    const templateModal = bootstrap.Modal.getInstance(
      document.getElementById("designTemplateSelectionModal")
    );
    if (templateModal) {
      templateModal.hide();
    }

    // Show design studio gallery view and hide initial view
    setTimeout(() => {
      document
        .getElementById("designStudioInitialView")
        .classList.add("d-none");
      document
        .getElementById("designStudioGalleryView")
        .classList.remove("d-none");
    }, 300);
  }

  handleCreateStyleGuide() {
    const title = document.getElementById("styleGuideTitle").value;
    if (title.trim()) {
      console.log("Creating new style guide:", title);

      // Clear the form
      document.getElementById("styleGuideTitle").value = "";

      // Close modal
      const createStyleGuideModal = bootstrap.Modal.getInstance(
        document.getElementById("createStyleGuideModal")
      );
      if (createStyleGuideModal) {
        createStyleGuideModal.hide();
      }

      // Show design studio gallery view instead of content view
      setTimeout(() => {
        document
          .getElementById("designStudioInitialView")
          .classList.add("d-none");
        document
          .getElementById("designStudioGalleryView")
          .classList.remove("d-none");
      }, 300);
    }
  }

  // New methods for Design Studio Gallery
  handleAddNote() {
    const noteText = document.getElementById("noteText");

    if (!noteText.value.trim()) {
      this.showMessage("Please enter note content", "error");
      return;
    }

    const newNote = {
      id: Date.now(),
      author: "John Doe",
      initials: "JD",
      date: new Date().toLocaleDateString("en-GB"),
      content: noteText.value.trim(),
      status: "active",
      avatarColor: "#22c55e",
    };

    this.notes.push(newNote);

    // Close modal
    const modal = bootstrap.Modal.getInstance(
      document.getElementById("addNoteModal")
    );
    modal.hide();

    // Show success modal
    setTimeout(() => {
      const successModal = new bootstrap.Modal(
        document.getElementById("noteSuccessModal")
      );
      successModal.show();
    }, 300);

    // Reset form
    noteText.value = "";

    // Refresh notes list
    this.showNotesDetailView();
  }

  // Budget Template Selection Methods
  selectBudgetTemplate(option) {
    // Remove active class from all budget template options
    document.querySelectorAll(".budget-template-option").forEach((opt) => {
      opt.classList.remove("active");
    });

    // Add active class to selected option
    option.classList.add("active");
  }

  handleBudgetTemplateSelection() {
    // Hide template selection modal
    const templateModal = bootstrap.Modal.getInstance(
      document.getElementById("budgetTemplateSelectionModal")
    );
    if (templateModal) {
      templateModal.hide();
    }

    // Show budget details modal after template selection
    setTimeout(() => {
      this.showBudgetDetailsModal();
    }, 300);
  }

  // Budget Methods
  showBudgetTemplateSelectionModal() {
    const budgetTemplateModal = new bootstrap.Modal(
      document.getElementById("budgetTemplateSelectionModal")
    );
    budgetTemplateModal.show();
  }

  showBudgetDetailsModal() {
    const budgetDetailsModal = new bootstrap.Modal(
      document.getElementById("budgetDetailsModal")
    );
    budgetDetailsModal.show();
  }

  handleBudgetDetailsSubmit() {
    const title = document.getElementById("budgetTitle").value;
    const amount = document.getElementById("budgetAmount").value;

    if (title.trim() && amount.trim()) {
      console.log("Adding budget section:", { title, amount });

      // Clear the form
      document.getElementById("budgetTitle").value = "";
      document.getElementById("budgetAmount").value = "";

      // Close modal
      const budgetDetailsModal = bootstrap.Modal.getInstance(
        document.getElementById("budgetDetailsModal")
      );
      if (budgetDetailsModal) {
        budgetDetailsModal.hide();
      }

      // Show success notification
      this.showNotification("Budget section added successfully!", "success");
    } else {
      this.showNotification("Please fill in all required fields", "error");
    }
  }

  handleResize() {
    // Handle responsive behavior on window resize
    const sidebar = document.getElementById("sidebar");
    const overlay = document.querySelector(".sidebar-overlay");

    if (window.innerWidth > 768) {
      // Desktop view
      sidebar.classList.remove("show");
      if (overlay) {
        overlay.classList.remove("show");
      }
      document.body.style.overflow = "";
    }
  }

  // Utility method to show notifications
  showNotification(message, type = "info") {
    // Create notification element
    const notification = document.createElement("div");
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText =
      "top: 20px; right: 20px; z-index: 9999; min-width: 300px;";
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
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animation = "fadeInUp 0.6s ease forwards";
        }
      });
    }, observerOptions);

    // Observe all section cards
    const sectionCards = document.querySelectorAll(".section-card");
    sectionCards.forEach((card) => {
      observer.observe(card);
    });
  }

  // Contact filtering methods
  filterContacts(searchTerm) {
    const rows = document.querySelectorAll(".contacts-table tbody tr");
    const lowerSearchTerm = searchTerm.toLowerCase();

    rows.forEach((row) => {
      const contactName =
        row.querySelector("td:nth-child(4) span")?.textContent.toLowerCase() ||
        "";
      const companyName =
        row.querySelector("td:nth-child(3)")?.textContent.toLowerCase() || "";
      const email =
        row.querySelector("td:nth-child(6)")?.textContent.toLowerCase() || "";
      const phone =
        row.querySelector("td:nth-child(5)")?.textContent.toLowerCase() || "";

      const matches =
        contactName.includes(lowerSearchTerm) ||
        companyName.includes(lowerSearchTerm) ||
        email.includes(lowerSearchTerm) ||
        phone.includes(lowerSearchTerm);

      row.style.display = matches ? "" : "none";
    });
  }

  filterContactsByCategory(category) {
    const rows = document.querySelectorAll(".contacts-table tbody tr");

    rows.forEach((row) => {
      const rowCategory =
        row.querySelector("td:nth-child(2)")?.textContent || "";
      const matches = !category || rowCategory === category;
      row.style.display = matches ? "" : "none";
    });
  }

  showAddContactModal() {
    // This would show an add contact modal
    console.log("Opening add contact modal...");
    this.showNotification("Add Contact feature coming soon!", "info");
  }

  // Modal cleanup method to fix fade artifacts
  cleanupModalArtifacts() {
    // Remove any lingering modal backdrops
    const backdrops = document.querySelectorAll(".modal-backdrop");
    backdrops.forEach((backdrop) => backdrop.remove());

    // Remove modal-open class from body
    document.body.classList.remove("modal-open");

    // Reset body padding that Bootstrap might have added
    document.body.style.paddingRight = "";

    // Restore body overflow
    document.body.style.overflow = "";
  }

  // Budget functionality methods
  addBudgetSection() {
    const container = document.getElementById("budgetSectionsContainer");
    if (!container) return;

    const sectionCount = container.children.length + 1;
    const sectionId = `section${sectionCount}`;

    const newSection = document.createElement("div");
    newSection.className = "budget-section mb-4";
    newSection.setAttribute("data-section-id", sectionId);

    newSection.innerHTML = `
            <div class="section-header d-flex justify-content-between align-items-center p-3" style="background-color: #F1EDE1; border-radius: 8px;">
                <div class="d-flex align-items-center">
                    <h6 class="mb-0">Venue - $ 11,000</h6>
                </div>
                <button class="btn btn-sm add-budget-item-btn" style="background-color: #9B4431; color: white; border-radius: 50%; width: 30px; height: 30px;" data-section="${sectionId}">
                    <i class="fas fa-plus"></i>
                </button>
            </div>
            
            <!-- Budget Table (Initially Hidden) -->
            <div class="budget-table-container d-none" id="budgetTable-${sectionId}">
                <div class="table-responsive">
                    <table class="table table-borderless budget-editable-table">
                        <thead>
                            <tr style="background-color: #F8F9FA;">
                                <th width="8%">Lock</th>
                                <th width="12%">Payment Proof</th>
                                <th width="15%">Category</th>
                                <th width="12%">Budget</th>
                                <th width="12%">Entered</th>
                                <th width="12%">Difference</th>
                                <th width="15%">Vendor Management</th>
                                <th width="12%">Payment Type</th>
                                <th width="12%">Payer</th>
                                <th width="10%">Status</th>
                                <th width="5%">Action</th>
                            </tr>
                        </thead>
                        <tbody id="budgetTableBody-${sectionId}">
                            <tr>
                                <td>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="lock-${sectionId}-1" checked>
                                        <label class="form-check-label" for="lock-${sectionId}-1">
                                            <i class="fas fa-check text-success"></i>
                                        </label>
                                    </div>
                                </td>
                                <td>
                                    <div class="d-flex align-items-center">
                                        <i class="fas fa-paperclip text-primary me-2"></i>
                                        <span class="text-primary" style="cursor: pointer; text-decoration: underline;">Picture.png</span>
                                    </div>
                                </td>
                                <td>
                                    <input type="text" class="form-control form-control-sm border-0" value="Florist" style="background: transparent;">
                                </td>
                                <td>
                                    <input type="text" class="form-control form-control-sm border-0" value="$ 5000" style="background: transparent;">
                                </td>
                                <td>
                                    <input type="text" class="form-control form-control-sm border-0" value="$ 6000" style="background: transparent;">
                                </td>
                                <td>
                                    <span class="fw-bold text-danger">$ 1000</span>
                                </td>
                                <td>
                                    <div>
                                        <div class="text-dark fw-medium">Tyler Murphy</div>
                                        <div class="text-muted small">92456789</div>
                                    </div>
                                </td>
                                <td>
                                    <select class="form-select form-select-sm border-0" style="background: transparent;">
                                        <option value="cash" selected>Cash</option>
                                        <option value="bank">Bank Transfer</option>
                                        <option value="card">Card</option>
                                    </select>
                                </td>
                                <td>
                                    <select class="form-select form-select-sm border-0" style="background: transparent;">
                                        <option value="jonathan" selected>Jonathan Freeman</option>
                                        <option value="jose">Jose Mendoza</option>
                                        <option value="richard">Richard James</option>
                                        <option value="louis">Louis Smith</option>
                                        <option value="walter">Walter Reyes</option>
                                    </select>
                                </td>
                                <td>
                                    <select class="form-select form-select-sm border-0 text-danger" style="background: transparent;">
                                        <option value="unpaid" selected>Unpaid</option>
                                        <option value="paid">Paid</option>
                                        <option value="pending">Pending</option>
                                    </select>
                                </td>
                                <td>
                                    <button class="btn btn-outline-danger btn-sm" onclick="deleteBudgetRow(this)">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="lock-${sectionId}-2">
                                    </div>
                                </td>
                                <td>
                                    <div class="d-flex align-items-center">
                                        <i class="fas fa-paperclip text-primary me-2"></i>
                                        <span class="text-primary" style="cursor: pointer; text-decoration: underline;">Picture.png</span>
                                    </div>
                                </td>
                                <td>
                                    <input type="text" class="form-control form-control-sm border-0" value="Photographer" style="background: transparent;">
                                </td>
                                <td>
                                    <input type="text" class="form-control form-control-sm border-0" value="$ 5000" style="background: transparent;">
                                </td>
                                <td>
                                    <input type="text" class="form-control form-control-sm border-0" value="$ 4000" style="background: transparent;">
                                </td>
                                <td>
                                    <span class="fw-bold text-success">$ 1000</span>
                                </td>
                                <td>
                                    <div>
                                        <div class="text-dark fw-medium">Jacob Evans</div>
                                        <div class="text-muted small">92456789</div>
                                    </div>
                                </td>
                                <td>
                                    <select class="form-select form-select-sm border-0" style="background: transparent;">
                                        <option value="">Select Type</option>
                                        <option value="cash" selected>Cash</option>
                                        <option value="bank">Bank Transfer</option>
                                        <option value="card">Card</option>
                                    </select>
                                </td>
                                <td>
                                    <select class="form-select form-select-sm border-0" style="background: transparent;">
                                        <option value="">Select Payer</option>
                                        <option value="jonathan">Jonathan Freeman</option>
                                        <option value="jose">Jose Mendoza</option>
                                        <option value="richard">Richard James</option>
                                        <option value="louis">Louis Smith</option>
                                        <option value="walter">Walter Reyes</option>
                                    </select>
                                </td>
                                <td>
                                    <select class="form-select form-select-sm border-0" style="background: transparent;">
                                        <option value="">Select Status</option>
                                        <option value="unpaid">Unpaid</option>
                                        <option value="paid">Paid</option>
                                        <option value="pending">Pending</option>
                                    </select>
                                </td>
                                <td>
                                    <button class="btn btn-outline-danger btn-sm" onclick="deleteBudgetRow(this)">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="lock-${sectionId}-3">
                                    </div>
                                </td>
                                <td>
                                    <div class="d-flex align-items-center">
                                        <button class="btn btn-link text-primary p-0" style="text-decoration: underline;">
                                            Add Image
                                        </button>
                                    </div>
                                </td>
                                <td>
                                    <input type="text" class="form-control form-control-sm border-0" value="Videographer" style="background: transparent;">
                                </td>
                                <td>
                                    <input type="text" class="form-control form-control-sm border-0" value="$ 5000" style="background: transparent;">
                                </td>
                                <td>
                                    <input type="text" class="form-control form-control-sm border-0" value="$ 4000" style="background: transparent;">
                                </td>
                                <td>
                                    <span class="fw-bold text-success">$ 1000</span>
                                </td>
                                <td>
                                    <div>
                                        <div class="text-dark fw-medium">Tom Meyer</div>
                                        <div class="text-muted small">92456789</div>
                                    </div>
                                </td>
                                <td>
                                    <select class="form-select form-select-sm border-0" style="background: transparent;">
                                        <option value="bank" selected>Bank Transfer</option>
                                        <option value="cash">Cash</option>
                                        <option value="card">Card</option>
                                    </select>
                                </td>
                                <td>
                                    <select class="form-select form-select-sm border-0" style="background: transparent;">
                                        <option value="nick" selected>Nick Hugh</option>
                                        <option value="jonathan">Jonathan Freeman</option>
                                        <option value="jose">Jose Mendoza</option>
                                        <option value="richard">Richard James</option>
                                        <option value="louis">Louis Smith</option>
                                        <option value="walter">Walter Reyes</option>
                                    </select>
                                </td>
                                <td>
                                    <select class="form-select form-select-sm border-0 text-danger" style="background: transparent;">
                                        <option value="unpaid" selected>Unpaid</option>
                                        <option value="paid">Paid</option>
                                        <option value="pending">Pending</option>
                                    </select>
                                </td>
                                <td>
                                    <button class="btn btn-outline-danger btn-sm" onclick="deleteBudgetRow(this)">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="lock-${sectionId}-4">
                                    </div>
                                </td>
                                <td>
                                    <div class="d-flex align-items-center">
                                        <i class="fas fa-paperclip text-primary me-2"></i>
                                        <span class="text-primary" style="cursor: pointer; text-decoration: underline;">Picture.png</span>
                                    </div>
                                </td>
                                <td>
                                    <input type="text" class="form-control form-control-sm border-0" value="Florist" style="background: transparent;">
                                </td>
                                <td>
                                    <input type="text" class="form-control form-control-sm border-0" value="$ 1000" style="background: transparent;">
                                </td>
                                <td>
                                    <input type="text" class="form-control form-control-sm border-0" value="$ 1000" style="background: transparent;">
                                </td>
                                <td>
                                    <span class="fw-bold">$ 0</span>
                                </td>
                                <td>
                                    <div>
                                        <div class="text-dark fw-medium">Joe Mark</div>
                                        <div class="text-muted small">92456789</div>
                                    </div>
                                </td>
                                <td>
                                    <select class="form-select form-select-sm border-0" style="background: transparent;">
                                        <option value="cash" selected>Cash</option>
                                        <option value="bank">Bank Transfer</option>
                                        <option value="card">Card</option>
                                    </select>
                                </td>
                                <td>
                                    <select class="form-select form-select-sm border-0" style="background: transparent;">
                                        <option value="brandon" selected>Brandon G</option>
                                        <option value="jonathan">Jonathan Freeman</option>
                                        <option value="jose">Jose Mendoza</option>
                                        <option value="richard">Richard James</option>
                                        <option value="louis">Louis Smith</option>
                                        <option value="walter">Walter Reyes</option>
                                    </select>
                                </td>
                                <td>
                                    <select class="form-select form-select-sm border-0 text-danger" style="background: transparent;">
                                        <option value="unpaid" selected>Unpaid</option>
                                        <option value="paid">Paid</option>
                                        <option value="pending">Pending</option>
                                    </select>
                                </td>
                                <td>
                                    <button class="btn btn-outline-danger btn-sm" onclick="deleteBudgetRow(this)">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                            <tr class="budget-total-row" style="background-color: #f8f9fa; border-top: 2px solid #dee2e6;">
                                <td colspan="2" class="fw-bold">Total :</td>
                                <td></td>
                                <td class="fw-bold">$ 1000</td>
                                <td class="fw-bold">$ 11,000</td>
                                <td class="fw-bold">$ 0</td>
                                <td colspan="5"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;

    container.appendChild(newSection);
    this.showNotification("New budget section added!", "success");
  }

  toggleBudgetTable(sectionId) {
    const table = document.getElementById(`budgetTable-${sectionId}`);
    if (!table) return;

    const btn = document.querySelector(`[data-section="${sectionId}"]`);
    const icon = btn.querySelector("i");

    if (table.classList.contains("d-none")) {
      // Show table
      table.classList.remove("d-none");
      icon.className = "fas fa-minus";
    } else {
      // Hide table
      table.classList.add("d-none");
      icon.className = "fas fa-plus";
    }
  }

  // Contact Management Methods
  showAddContactModal() {
    const modal = new bootstrap.Modal(
      document.getElementById("addContactModal")
    );
    modal.show();
  }

  showImportContactModal() {
    const modal = new bootstrap.Modal(
      document.getElementById("importContactModal")
    );
    modal.show();
  }

  handleFileSelection(event) {
    const files = event.target.files;
    const filesList = document.getElementById("filesList");
    const uploadedFilesList = document.getElementById("uploadedFilesList");

    if (files.length > 0) {
      filesList.innerHTML = "";
      Array.from(files).forEach((file) => {
        const fileItem = document.createElement("div");
        fileItem.className =
          "file-item d-flex justify-content-between align-items-center mb-2 p-2 border rounded";
        fileItem.innerHTML = `
                    <span><i class="fas fa-file"></i> ${file.name}</span>
                    <small class="text-muted">${(
                      file.size /
                      1024 /
                      1024
                    ).toFixed(2)} MB</small>
                `;
        filesList.appendChild(fileItem);
      });
      uploadedFilesList.style.display = "block";
    }
  }
}

// Global functions for onclick handlers
function deleteGuest(guestName) {
  if (window.dashboard) {
    window.dashboard.currentDeleteGuest = guestName;
    document.getElementById("deleteGuestName").textContent = guestName;
    const deleteModal = new bootstrap.Modal(
      document.getElementById("deleteGuestModal")
    );
    deleteModal.show();
  }
}

function editGuest(guestName) {
  console.log("Editing guest:", guestName);
  // This would typically open an edit modal with pre-filled data
}

function setCurrentCard(cardId) {
  if (window.dashboard) {
    window.dashboard.currentNoteCardId = cardId;
  }
}

function deleteBudgetRow(button) {
  const row = button.closest("tr");
  if (row) {
    row.remove();

    // Show notification
    if (window.dashboard) {
      window.dashboard.showNotification("Budget item deleted!", "success");
    }
  }
}

// Contact Management Functions
function viewContact(contactName) {
  const modal = new bootstrap.Modal(
    document.getElementById("contactDetailsModal")
  );

  // Update modal content with contact details
  document.getElementById("contactFullName").textContent = contactName;
  document.getElementById("uploadContactName").textContent = contactName;

  // Set avatar initial
  const initial = contactName.charAt(0).toUpperCase();
  document.getElementById("contactAvatarLarge").textContent = initial;

  modal.show();
}

function editContact(button) {
  // Get contact data from the row
  const row = button.closest("tr");
  const contactName = row.querySelector("td:nth-child(4) span").textContent;

  // Show add contact modal with pre-filled data
  const modal = new bootstrap.Modal(document.getElementById("addContactModal"));

  // Update modal title for editing
  document.getElementById("addContactModalLabel").textContent = "Edit Contact";

  // Pre-fill form with existing data
  const names = contactName.split(" ");
  document.getElementById("firstName").value = names[0] || "";
  document.getElementById("lastName").value = names.slice(1).join(" ") || "";

  modal.show();
}

function deleteContact(button) {
  const row = button.closest("tr");
  const contactName = row.querySelector("td:nth-child(4) span").textContent;

  if (confirm(`Are you sure you want to delete ${contactName}?`)) {
    row.remove();
    showNotification("Contact deleted successfully", "success");
  }
}

function uploadDocument(contactName) {
  const modal = new bootstrap.Modal(
    document.getElementById("uploadDocumentModal")
  );
  document.getElementById("uploadContactName").textContent = contactName;
  modal.show();
}

function handleAddNewContact() {
  const form = document.getElementById("addContactForm");
  const formData = new FormData(form);

  // Validate form
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  // Close add contact modal
  const addModal = bootstrap.Modal.getInstance(
    document.getElementById("addContactModal")
  );
  addModal.hide();

  // Show success modal
  setTimeout(() => {
    const successModal = new bootstrap.Modal(
      document.getElementById("contactSuccessModal")
    );
    successModal.show();
  }, 300);

  // Reset form
  form.reset();

  // Reset modal title
  document.getElementById("addContactModalLabel").textContent =
    "Add New Contact";
}

function handleImportContacts() {
  const csvFile = document.getElementById("csvFileInput").files[0];

  if (!csvFile) {
    alert("Please select a CSV file to import.");
    return;
  }

  // Close import modal
  const importModal = bootstrap.Modal.getInstance(
    document.getElementById("importContactModal")
  );
  importModal.hide();

  // Show success notification
  setTimeout(() => {
    showNotification("Contacts imported successfully", "success");
  }, 300);
}

function handleDocumentUpload() {
  const files = document.getElementById("documentFileInput").files;

  if (files.length === 0) {
    alert("Please select files to upload.");
    return;
  }

  // Close upload modal
  const uploadModal = bootstrap.Modal.getInstance(
    document.getElementById("uploadDocumentModal")
  );
  uploadModal.hide();

  // Show success notification
  setTimeout(() => {
    showNotification("Documents uploaded successfully", "success");
  }, 300);

  // Reset file input
  document.getElementById("documentFileInput").value = "";
  document.getElementById("uploadedFilesList").style.display = "none";
}

function editContactFromDetails() {
  // Close details modal
  const detailsModal = bootstrap.Modal.getInstance(
    document.getElementById("contactDetailsModal")
  );
  detailsModal.hide();

  // Show edit modal
  setTimeout(() => {
    const editModal = new bootstrap.Modal(
      document.getElementById("addContactModal")
    );
    document.getElementById("addContactModalLabel").textContent =
      "Edit Contact";
    editModal.show();
  }, 300);
}

function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div");
  notification.className = `alert alert-${
    type === "success" ? "success" : "info"
  } alert-dismissible fade show position-fixed`;
  notification.style.cssText =
    "top: 20px; right: 20px; z-index: 9999; min-width: 300px;";
  notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

  document.body.appendChild(notification);

  // Auto remove after 3 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 3000);
}

// Document management functions
function showAddDocumentModal() {
  const modal = new bootstrap.Modal(
    document.getElementById("addDocumentModal")
  );
  modal.show();
}

function handleAddDocument() {
  const title = document.getElementById("documentTitle").value;

  if (!title.trim()) {
    alert("Please enter a document title.");
    return;
  }

  // Close modal
  const modal = bootstrap.Modal.getInstance(
    document.getElementById("addDocumentModal")
  );
  modal.hide();

  // Show success notification
  setTimeout(() => {
    showNotification("Document added successfully!", "success");
  }, 300);

  // Reset form
  document.getElementById("documentTitle").value = "";
}

function showImportTemplateModal() {
  const modal = new bootstrap.Modal(
    document.getElementById("importTemplateModal")
  );
  modal.show();
}

function showSelectTemplateModal() {
  const importModal = bootstrap.Modal.getInstance(
    document.getElementById("importTemplateModal")
  );
  importModal.hide();

  setTimeout(() => {
    const selectModal = new bootstrap.Modal(
      document.getElementById("selectTemplateModal")
    );
    selectModal.show();
  }, 300);
}

function handleTemplateImport() {
  const selectedTemplate = document.querySelector(".template-option.selected");

  if (!selectedTemplate) {
    alert("Please select a template.");
    return;
  }

  // Close modal
  const modal = bootstrap.Modal.getInstance(
    document.getElementById("selectTemplateModal")
  );
  modal.hide();

  // Show success notification
  setTimeout(() => {
    showNotification("Template imported successfully!", "success");
  }, 300);
}

// Document detail screen functions
function showDocumentScreen(documentType) {
  console.log("Showing document screen:", documentType);

  // Hide all tab panes first
  const allTabPanes = document.querySelectorAll(".tab-pane");
  allTabPanes.forEach((pane) => {
    pane.classList.remove("show", "active");
    pane.style.display = "none";
  });

  // Show the specific document detail screen
  let screenId;
  switch (documentType) {
    case "proposal":
      screenId = "proposalDetail";
      break;
    case "contract":
      screenId = "contractDetail";
      break;
    case "quote":
      screenId = "quoteDetail";
      break;
    case "invoice":
      screenId = "invoiceDetail";
      break;
    case "payment":
      screenId = "paymentDetail";
      break;
    default:
      screenId = "proposalDetail";
  }

  const documentScreen = document.getElementById(screenId);
  if (documentScreen) {
    documentScreen.style.display = "block";
    documentScreen.classList.add("show", "active");
  }
}

// Back to documents function
function backToDocuments() {
  // Hide all document detail screens
  const documentScreens = [
    "proposalDetail",
    "contractDetail",
    "quoteDetail",
    "invoiceDetail",
    "paymentDetail",
  ];
  documentScreens.forEach((screenId) => {
    const screen = document.getElementById(screenId);
    if (screen) {
      screen.classList.remove("show", "active");
      screen.style.display = "none";
    }
  });

  // Show the documents tab
  const documentsTab = document.getElementById("documents");
  if (documentsTab) {
    documentsTab.style.display = "block";
    documentsTab.classList.add("show", "active");
  }

  // Update the navigation
  const documentsNavLink = document.querySelector('a[href="#documents"]');
  if (documentsNavLink && window.dashboard) {
    window.dashboard.setActiveNavLink(documentsNavLink);
  }
}

// Website functionality
function showCreateWebsiteForm() {
  // Hide all tab panes
  const allTabPanes = document.querySelectorAll(".tab-pane");
  allTabPanes.forEach((pane) => {
    pane.classList.remove("show", "active");
    pane.style.display = "none";
  });

  // Show create website form
  const createWebsiteTab = document.getElementById("createWebsite");
  if (createWebsiteTab) {
    createWebsiteTab.style.display = "block";
    createWebsiteTab.classList.add("show", "active");
  }
}

function backToWebsite() {
  // Hide all screens
  const allTabPanes = document.querySelectorAll(".tab-pane");
  allTabPanes.forEach((pane) => {
    pane.classList.remove("show", "active");
    pane.style.display = "none";
  });

  // Show website tab
  const websiteTab = document.getElementById("website");
  if (websiteTab) {
    websiteTab.style.display = "block";
    websiteTab.classList.add("show", "active");
  }
}

function backToCreateWebsite() {
  // Hide all screens
  const allTabPanes = document.querySelectorAll(".tab-pane");
  allTabPanes.forEach((pane) => {
    pane.classList.remove("show", "active");
    pane.style.display = "none";
  });

  // Show create website form
  const createWebsiteTab = document.getElementById("createWebsite");
  if (createWebsiteTab) {
    createWebsiteTab.style.display = "block";
    createWebsiteTab.classList.add("show", "active");
  }
}

function publishWebsite() {
  // Get form data
  const websiteHeading =
    document.getElementById("websiteHeading").value ||
    "Caroline And Klaus Wedding";
  const eventDate = document.getElementById("eventDate").value || "2024-03-12";
  const venue = document.getElementById("venue").value || "Masia Cabellut";
  const websiteNotes =
    document.getElementById("websiteNotes").value ||
    "Join us for our wedding celebration as we begin our new chapter together.";

  // Update preview with form data
  document.getElementById("previewWebsiteTitle").textContent = websiteHeading;
  document.getElementById("websitePreviewTitle").textContent = websiteHeading;

  // Format date for display
  if (eventDate) {
    const date = new Date(eventDate);
    const formattedDate = date
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, ".");
    document.getElementById("previewEventDate").textContent = formattedDate;
  }

  document.getElementById("previewVenueName").textContent = venue;
  document.getElementById("previewDescription").textContent = websiteNotes;

  // Update cover image if uploaded
  const coverImage = document.getElementById("coverImage");
  if (coverImage && coverImage.src) {
    document.getElementById("previewCoverImage").src = coverImage.src;
  }

  // Update photo gallery if uploaded
  updatePreviewGallery();

  // Hide all screens
  const allTabPanes = document.querySelectorAll(".tab-pane");
  allTabPanes.forEach((pane) => {
    pane.classList.remove("show", "active");
    pane.style.display = "none";
  });

  // Show website preview
  const websitePreview = document.getElementById("websitePreview");
  if (websitePreview) {
    websitePreview.style.display = "block";
    websitePreview.classList.add("show", "active");
  }

  showNotification("Website published successfully!", "success");
}

function editWebsite() {
  // Go back to create website form
  backToCreateWebsite();
}

function handleCoverImageUpload(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const coverImage = document.getElementById("coverImage");
      const coverImagePreview = document.getElementById("coverImagePreview");

      coverImage.src = e.target.result;
      coverImagePreview.style.display = "block";
    };
    reader.readAsDataURL(file);
  }
}

function handleGalleryImagesUpload(event) {
  const files = event.target.files;
  if (files.length > 0) {
    const galleryPreview = document.getElementById("galleryPreview");
    galleryPreview.innerHTML = "";
    galleryPreview.style.display = "block";

    // Store uploaded images for preview
    window.uploadedGalleryImages = [];

    Array.from(files).forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        window.uploadedGalleryImages.push(e.target.result);

        const imgCol = document.createElement("div");
        imgCol.className = "col-3";
        imgCol.innerHTML = `
                    <img src="${e.target.result}" alt="Gallery Image ${
          index + 1
        }" class="img-fluid rounded" style="height: 100px; object-fit: cover;">
                `;
        galleryPreview.appendChild(imgCol);
      };
      reader.readAsDataURL(file);
    });
  }
}

function updatePreviewGallery() {
  const carouselTrack = document.getElementById("photoCarouselTrack");

  if (window.uploadedGalleryImages && window.uploadedGalleryImages.length > 0) {
    carouselTrack.innerHTML = "";

    // Create slides with 4 images per slide
    const imagesPerSlide = 4;
    const totalSlides = Math.ceil(
      window.uploadedGalleryImages.length / imagesPerSlide
    );

    for (let slideIndex = 0; slideIndex < totalSlides; slideIndex++) {
      const slide = document.createElement("div");
      slide.className = `photo-carousel-slide ${
        slideIndex === 0 ? "active" : ""
      }`;

      const row = document.createElement("div");
      row.className = "row g-2";

      for (let i = 0; i < imagesPerSlide; i++) {
        const imageIndex = slideIndex * imagesPerSlide + i;
        if (imageIndex < window.uploadedGalleryImages.length) {
          const imgCol = document.createElement("div");
          imgCol.className = "col-3";
          imgCol.innerHTML = `
                        <img src="${
                          window.uploadedGalleryImages[imageIndex]
                        }" alt="Gallery Image ${
            imageIndex + 1
          }" class="img-fluid rounded">
                    `;
          row.appendChild(imgCol);
        }
      }

      slide.appendChild(row);
      carouselTrack.appendChild(slide);
    }

    // Initialize carousel state
    window.currentSlide = 0;
    window.totalSlides = totalSlides;
    updateCarouselButtons();
  }
}

// Carousel functionality
let currentSlide = 0;
let totalSlides = 1;

function moveCarousel(direction) {
  const slides = document.querySelectorAll(".photo-carousel-slide");
  const track = document.getElementById("photoCarouselTrack");

  if (slides.length === 0) return;

  // Hide current slide
  slides[currentSlide].classList.remove("active");

  // Update current slide index
  currentSlide += direction;

  // Handle wraparound
  if (currentSlide >= slides.length) {
    currentSlide = 0;
  } else if (currentSlide < 0) {
    currentSlide = slides.length - 1;
  }

  // Show new slide
  slides[currentSlide].classList.add("active");

  // Update carousel track position
  const translateX = -currentSlide * 100;
  track.style.transform = `translateX(${translateX}%)`;

  // Update button states
  updateCarouselButtons();
}

function updateCarouselButtons() {
  const prevBtn = document.getElementById("carouselPrev");
  const nextBtn = document.getElementById("carouselNext");
  const slides = document.querySelectorAll(".photo-carousel-slide");

  if (slides.length <= 1) {
    prevBtn.style.display = "none";
    nextBtn.style.display = "none";
  } else {
    prevBtn.style.display = "flex";
    nextBtn.style.display = "flex";
  }
}

// Auto-initialize carousel when page loads
document.addEventListener("DOMContentLoaded", function () {
  updateCarouselButtons();

  // Add keyboard navigation
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") {
      moveCarousel(-1);
    } else if (e.key === "ArrowRight") {
      moveCarousel(1);
    }
  });

  // Initialize seating arrangement drag and drop
  initializeSeatingDragAndDrop();
});

// Seating Arrangement Functions
let tablesData = [];
let canvasData = {
  width: 800,
  height: 600,
  tables: [],
};

function setupSeatingArrangement() {
  const numberOfTables =
    parseInt(document.getElementById("numberOfTables").value) || 6;
  const seatsPerTable =
    parseInt(document.getElementById("seatsPerTable").value) || 10;

  // Hide setup screen and show arrangement grid
  document.getElementById("seatingConfigurationSetup").classList.add("d-none");
  document.getElementById("seatingArrangementGrid").classList.remove("d-none");

  // Generate tables
  generateTables(numberOfTables, seatsPerTable);

  showNotification("Tables created successfully!", "success");
}

function generateTables(numberOfTables, seatsPerTable) {
  const tablesGrid = document.getElementById("tablesGrid");
  tablesGrid.innerHTML = "";
  tablesData = [];

  for (let i = 1; i <= numberOfTables; i++) {
    const tableData = {
      id: i,
      name: `Table ${String(i).padStart(2, "0")}`,
      seats: seatsPerTable,
      type: "rectangle",
      guests: [],
      position: { x: 50 + (i - 1) * 100, y: 50 + (i - 1) * 80 },
    };

    tablesData.push(tableData);

    const tableCard = createTableCard(tableData);
    tablesGrid.appendChild(tableCard);
  }

  // Initialize drag and drop
  initializeSeatingDragAndDrop();
}

function createTableCard(tableData) {
  const col = document.createElement("div");
  col.className = "col-md-6 col-lg-4";

  col.innerHTML = `
        <div class="table-card" data-table-id="${tableData.id}">
            <div class="">
                <div class="d-flex justify-content-between">
                <div>
                    <h6 class="table-title">${tableData.name}</h6>
                    </div>
                    <div>
                    <span class="table-seats">${tableData.seats} Seats</span>
                    <span class="text-success"><i class="fa fa-plus-circle" aria-hidden="true"></i></span>
                    </div>
                </div>
            </div>
           
            <div class="mb-3">
                         <input class="form-control" placeholder="Table Name">
            </div>
            <div class="mb-3">
                <select class="table-type-select form-select" onchange="updateTableType(${
                  tableData.id
                }, this.value)">
                    <option value="rectangle">Rectangle</option>
                    <option value="circle">Circle</option>
                    <option value="square">Square</option>
                </select>
            </div>
            
            <div class="guest-slots" id="guestSlots${tableData.id}">
                ${generateGuestSlots(tableData.seats, tableData.id)}
            </div>
        </div>
    `;

  return col;
}

function generateGuestSlots(numberOfSeats, tableId) {
  let slotsHtml = "";
  for (let i = 0; i < numberOfSeats; i++) {
    slotsHtml += `
            <div class="guest-slot" 
                 data-table-id="${tableId}" 
                 data-slot-index="${i}"
                 ondrop="dropGuest(event)" 
                 ondragover="allowDrop(event)"
                 ondragleave="dragLeave(event)">
                <span class="text-muted">Drag guest here</span>
            </div>
        `;
  }
  return slotsHtml;
}

function updateTableType(tableId, type) {
  const table = tablesData.find((t) => t.id === tableId);
  if (table) {
    table.type = type;
  }
}

// Drag and Drop Functions
function initializeSeatingDragAndDrop() {
  const guestItems = document.querySelectorAll(".guest-item.draggable");

  guestItems.forEach((item) => {
    item.addEventListener("dragstart", function (e) {
      e.dataTransfer.setData(
        "text/plain",
        JSON.stringify({
          name: this.dataset.guest,
          role: this.dataset.role || "",
        })
      );
      this.classList.add("dragging");
    });

    item.addEventListener("dragend", function (e) {
      this.classList.remove("dragging");
    });
  });
}

function allowDrop(event) {
  event.preventDefault();
  event.currentTarget.classList.add("drag-over");
}
this.notesTemplates = [
  {
    id: 1,
    title: "Budget List for Wedding",
    type: "wedding",
    category: "Wedding",
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=300&fit=crop&auto=format",
    updatedDate: "26/05/2025",
    eventType: "Wedding",
  },
  {
    id: 2,
    title: "Budget List for Birthday",
    type: "birthday",
    category: "Birthday",
    image:
      "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400&h=300&fit=crop&auto=format",
    createdDate: "26/05/2025",
    eventType: "Birthday",
  },
];
this.filteredNotesTemplates = [...this.notesTemplates];

// Notes data for detail view
this.notes = [
  {
    id: 1,
    author: "Caroline Forbes",
    initials: "CF",
    date: "26/05/2025",
    content:
      "This vendor was selected for the Johnson wedding on June 14th. Please coordinate setup at the venue by 10:00 AM. Client prefers a pastel-themed arrangement with white roses and eucalyptus. All communication should go through the planner. Payment scheduled 50% upfront, balance on event day.",
    status: "active",
    avatarColor: "#f8a5c2",
  },
  {
    id: 2,
    author: "Klaus Mikaelson",
    initials: "KM",
    date: "25/05/2025",
    content:
      "This vendor was selected for the Johnson wedding on June 14th. Please coordinate setup at the venue by 10:00 AM. Client prefers a pastel-themed arrangement with white roses and eucalyptus. All communication should go through the planner. Payment scheduled 50% upfront, balance on event day.",
    status: "active",
    avatarColor: "#a5b4fc",
  },
];
this.currentNoteId = null;
this.showArchived = false;

function dragLeave(event) {
  event.currentTarget.classList.remove("drag-over");
}

function dropGuest(event) {
  event.preventDefault();
  event.currentTarget.classList.remove("drag-over");

  const guestData = JSON.parse(event.dataTransfer.getData("text/plain"));
  const slot = event.currentTarget;
  const tableId = parseInt(slot.dataset.tableId);
  const slotIndex = parseInt(slot.dataset.slotIndex);

  // Check if slot is already occupied
  if (slot.classList.contains("occupied")) {
    showNotification("This seat is already occupied!", "error");
    return;
  }

  // Update slot content
  slot.innerHTML = `
        <span class="guest-name">${guestData.name}</span>
        ${
          guestData.role
            ? `<span class="guest-role">${guestData.role}</span>`
            : ""
        }
        <i class="fas fa-times remove-guest" onclick="removeGuestFromSeat(this, ${tableId}, ${slotIndex})"></i>
    `;
  slot.classList.add("occupied");

  // Update table data
  const table = tablesData.find((t) => t.id === tableId);
  if (table) {
    if (!table.guests) table.guests = [];
    table.guests[slotIndex] = guestData;
  }

  // Remove guest from available list (optional - you may want to keep them draggable)
  const guestItem = document.querySelector(`[data-guest="${guestData.name}"]`);
  if (guestItem) {
    guestItem.style.opacity = "0.5";
    guestItem.style.pointerEvents = "none";
  }

  showNotification(
    `${guestData.name} assigned to seat successfully!`,
    "success"
  );
}

function removeGuestFromSeat(button, tableId, slotIndex) {
  const slot = button.parentElement;
  const table = tablesData.find((t) => t.id === tableId);

  if (table && table.guests && table.guests[slotIndex]) {
    const guestName = table.guests[slotIndex].name;

    // Remove from table data
    table.guests[slotIndex] = null;

    // Reset slot
    slot.innerHTML = '<span class="text-muted">Drag guest here</span>';
    slot.classList.remove("occupied");

    // Restore guest in available list
    const guestItem = document.querySelector(`[data-guest="${guestName}"]`);
    if (guestItem) {
      guestItem.style.opacity = "1";
      guestItem.style.pointerEvents = "auto";
    }

    showNotification(`${guestName} removed from seat!`, "info");
  }
}

function openLayoutModal() {
  const modal = new bootstrap.Modal(
    document.getElementById("layoutDimensionsModal")
  );
  modal.show();
}

function createLayoutCanvas() {
  const width = parseInt(document.getElementById("layoutWidth").value) || 800;
  const height = parseInt(document.getElementById("layoutHeight").value) || 600;

  canvasData.width = width;
  canvasData.height = height;

  // Hide arrangement grid and show layout canvas
  document.getElementById("seatingArrangementGrid").classList.add("d-none");
  document.getElementById("layoutCanvas").classList.remove("d-none");

  // Setup canvas
  setupLayoutCanvas();

  // Close modal
  const modal = bootstrap.Modal.getInstance(
    document.getElementById("layoutDimensionsModal")
  );
  modal.hide();

  showNotification("Layout canvas created successfully!", "success");
}

function setupLayoutCanvas() {
  const canvas = document.getElementById("layoutCanvasArea");
  canvas.style.width = `${canvasData.width}px`;
  canvas.style.height = `${canvasData.height}px`;

  // Clear existing tables
  canvas.innerHTML = "";

  // Add tables to canvas
  tablesData.forEach((table) => {
    createCanvasTable(table);
  });

  // Update sidebar lists
  updateCanvasTablesList();
  updateCanvasGuestsList();

  // Initialize canvas drag and drop
  initializeCanvasDragAndDrop();
}

function createCanvasTable(tableData) {
  const canvas = document.getElementById("layoutCanvasArea");
  const tableElement = document.createElement("div");

  // Base class
  tableElement.className = `canvas-table ${tableData.type}`;
  tableElement.style.position = "absolute";
  tableElement.style.left = `${tableData.position.x}px`;
  tableElement.style.top = `${tableData.position.y}px`;
  tableElement.dataset.tableId = tableData.id;

  // Count assigned guests
  const assignedGuests = tableData.guests
    ? tableData.guests.filter((g) => g !== null).length
    : 0;

  // Inner HTML
  tableElement.innerHTML = `
    <div class="table-name">${tableData.name}</div>
    <div class="table-seats-count">${assignedGuests}/${tableData.seats}</div>
  `;

  // Style table shape dynamically
  switch (tableData.type) {
    case "circle":
      tableElement.style.width = "100px";
      tableElement.style.height = "100px";
      tableElement.style.borderRadius = "50%";
      tableElement.style.background = "#f8f9fa";
      tableElement.style.border = "2px solid #444";
      break;

    case "square":
      tableElement.style.width = "100px";
      tableElement.style.height = "100px";
      tableElement.style.borderRadius = "6px";
      tableElement.style.background = "#f8f9fa";
      tableElement.style.border = "2px solid #444";
      break;

    case "rectangle":
      tableElement.style.width = "140px";
      tableElement.style.height = "80px";
      tableElement.style.borderRadius = "6px";
      tableElement.style.background = "#f8f9fa";
      tableElement.style.border = "2px solid #444";
      break;

    case "oval":
      tableElement.style.width = "140px";
      tableElement.style.height = "90px";
      tableElement.style.borderRadius = "50%";
      tableElement.style.background = "#f8f9fa";
      tableElement.style.border = "2px solid #444";
      break;

    default:
      tableElement.style.width = "120px";
      tableElement.style.height = "80px";
      tableElement.style.border = "2px solid #444";
      tableElement.style.background = "#f8f9fa";
  }

  // Add to canvas
  canvas.appendChild(tableElement);

  // Make draggable
  makeTableDraggable(tableElement);
}


function makeTableDraggable(element) {
  let isDragging = false;
  let dragOffset = { x: 0, y: 0 };

  element.addEventListener("mousedown", function (e) {
    isDragging = true;
    const rect = element.getBoundingClientRect();
    const canvasRect = element.parentElement.getBoundingClientRect();
    dragOffset.x = e.clientX - rect.left;
    dragOffset.y = e.clientY - rect.top;
    element.classList.add("selected");
  });

  document.addEventListener("mousemove", function (e) {
    if (!isDragging) return;

    const canvas = document.getElementById("layoutCanvasArea");
    const canvasRect = canvas.getBoundingClientRect();

    let newX = e.clientX - canvasRect.left - dragOffset.x;
    let newY = e.clientY - canvasRect.top - dragOffset.y;

    // Constrain to canvas bounds
    newX = Math.max(0, Math.min(newX, canvasData.width - element.offsetWidth));
    newY = Math.max(
      0,
      Math.min(newY, canvasData.height - element.offsetHeight)
    );

    element.style.left = `${newX}px`;
    element.style.top = `${newY}px`;

    // Update table data
    const tableId = parseInt(element.dataset.tableId);
    const table = tablesData.find((t) => t.id === tableId);
    if (table) {
      table.position.x = newX;
      table.position.y = newY;
    }
  });

  document.addEventListener("mouseup", function () {
    if (isDragging) {
      isDragging = false;
      element.classList.remove("selected");
    }
  });
}

function updateCanvasTablesList() {
  const tablesList = document.getElementById("canvasTablesList");
  tablesList.innerHTML = "";

  tablesData.forEach((table) => {
    const assignedGuests = table.guests
      ? table.guests.filter((g) => g !== null).length
      : 0;
    const listItem = document.createElement("div");
    listItem.className = "table-list-item";
    listItem.innerHTML = `
            <div class="table-icon ${table.type}"></div>
            <div class="table-info">
                <div class="table-name">${table.name}</div>
                <div class="table-guests">${assignedGuests}/${table.seats} guests</div>
            </div>
            <i class="fas fa-grip-vertical text-muted"></i>
        `;
    tablesList.appendChild(listItem);
  });
}

function updateCanvasGuestsList() {
  const guestsList = document.getElementById("canvasGuestsList");
  guestsList.innerHTML = "";

  // Get all guests from tables
  const assignedGuests = [];
  tablesData.forEach((table) => {
    if (table.guests) {
      table.guests.forEach((guest, index) => {
        if (guest) {
          assignedGuests.push({
            ...guest,
            table: table.name,
            seat: index + 1,
          });
        }
      });
    }
  });

  assignedGuests.forEach((guest) => {
    const listItem = document.createElement("div");
    listItem.className = "guest-list-canvas-item";
    listItem.innerHTML = `
            <div class="guest-avatar">${guest.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()}</div>
            <div class="guest-info">
                <div class="guest-name">${guest.name}</div>
                <div class="guest-table text-muted">${guest.table} - Seat ${
      guest.seat
    }</div>
            </div>
            <div class="guest-status confirmed"></div>
        `;
    guestsList.appendChild(listItem);
  });
}

function initializeCanvasDragAndDrop() {
  // Initialize layout sidebar tabs
  document.getElementById("libraryTab").addEventListener("click", function () {
    this.classList.add("active");
    document.getElementById("guestsTab").classList.remove("active");
    document.getElementById("libraryPanel").classList.remove("d-none");
    document.getElementById("guestsPanel").classList.add("d-none");
  });

  document.getElementById("guestsTab").addEventListener("click", function () {
    this.classList.add("active");
    document.getElementById("libraryTab").classList.remove("active");
    document.getElementById("guestsPanel").classList.remove("d-none");
    document.getElementById("libraryPanel").classList.add("d-none");
  });
}

function backToSeatingArrangement() {
  // Hide layout canvas and show arrangement grid
  document.getElementById("layoutCanvas").classList.add("d-none");
  document.getElementById("seatingArrangementGrid").classList.remove("d-none");

  // Update tables with any changes from canvas
  updateCanvasTablesList();
}

// Website Form Gallery Functions
let formGalleryPosition = 0;
const formGalleryItemWidth = 128; // 120px + 8px gap

function moveFormGallery(direction) {
  const galleryGrid = document.getElementById("galleryGrid");
  const galleryItems = galleryGrid.querySelectorAll(".gallery-item");
  const containerWidth = galleryGrid.offsetWidth;
  const maxPosition = Math.max(
    0,
    galleryItems.length * formGalleryItemWidth - containerWidth
  );

  formGalleryPosition += direction * formGalleryItemWidth;
  formGalleryPosition = Math.max(0, Math.min(formGalleryPosition, maxPosition));

  galleryGrid.style.transform = `translateX(-${formGalleryPosition}px)`;

  // Update navigation buttons
  updateFormGalleryButtons();
}

function updateFormGalleryButtons() {
  const prevBtn = document.querySelector(".gallery-prev");
  const nextBtn = document.querySelector(".gallery-next");
  const galleryGrid = document.getElementById("galleryGrid");
  const galleryItems = galleryGrid.querySelectorAll(".gallery-item");
  const containerWidth = galleryGrid.offsetWidth;
  const maxPosition = Math.max(
    0,
    galleryItems.length * formGalleryItemWidth - containerWidth
  );

  // Update button states
  if (formGalleryPosition <= 0) {
    prevBtn.style.opacity = "0.5";
    prevBtn.style.pointerEvents = "none";
  } else {
    prevBtn.style.opacity = "1";
    prevBtn.style.pointerEvents = "auto";
  }

  if (formGalleryPosition >= maxPosition) {
    nextBtn.style.opacity = "0.5";
    nextBtn.style.pointerEvents = "none";
  } else {
    nextBtn.style.opacity = "1";
    nextBtn.style.pointerEvents = "auto";
  }
}

function refreshGalleryImage(button) {
  const galleryItem = button.closest(".gallery-item");
  const img = galleryItem.querySelector("img");

  // Sample wedding images for refresh
  const weddingImages = [
    "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=150&h=100&fit=crop",
    "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=150&h=100&fit=crop",
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=150&h=100&fit=crop",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=150&h=100&fit=crop",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=100&fit=crop",
    "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=150&h=100&fit=crop",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=150&h=100&fit=crop",
    "https://images.unsplash.com/photo-1519741497674-611481863552?w=150&h=100&fit=crop",
  ];

  const randomImage =
    weddingImages[Math.floor(Math.random() * weddingImages.length)];
  img.src = randomImage;

  showNotification("Image refreshed!", "success");
}

function removeGalleryImage(button) {
  const galleryItem = button.closest(".gallery-item");
  const galleryGrid = document.getElementById("galleryGrid");

  galleryItem.style.transform = "scale(0)";
  galleryItem.style.opacity = "0";

  setTimeout(() => {
    galleryItem.remove();
    updateFormGalleryButtons();
    showNotification("Image removed!", "info");
  }, 200);
}

// Initialize gallery navigation on page load
document.addEventListener("DOMContentLoaded", function () {
  updateFormGalleryButtons();

  // Add resize listener for gallery
  window.addEventListener("resize", function () {
    updateFormGalleryButtons();
  });

  // Initialize mobile sidebar functionality
  initializeMobileSidebar();

  // Initialize enhanced animations
  initializeAnimations();
});

// Mobile Sidebar Enhancement
function initializeMobileSidebar() {
  const sidebar = document.getElementById("sidebar");
  const mainContent = document.getElementById("mainContent");
  const sidebarToggleMain = document.getElementById("sidebarToggleMain");
  let sidebarOverlay = null;

  if (!sidebarToggleMain) return;

  // Mobile toggle functionality
  sidebarToggleMain.addEventListener("click", function () {
    sidebar.classList.toggle("show");

    // Create or remove overlay
    if (sidebar.classList.contains("show")) {
      createSidebarOverlay();
    } else {
      removeSidebarOverlay();
    }
  });

  // Create overlay for mobile
  function createSidebarOverlay() {
    if (!sidebarOverlay) {
      sidebarOverlay = document.createElement("div");
      sidebarOverlay.className = "sidebar-overlay";
      sidebarOverlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                z-index: 1035;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
      document.body.appendChild(sidebarOverlay);

      // Animate overlay
      setTimeout(() => {
        sidebarOverlay.style.opacity = "1";
      }, 10);

      // Close on overlay click
      sidebarOverlay.addEventListener("click", function () {
        sidebar.classList.remove("show");
        removeSidebarOverlay();
      });
    }
  }

  function removeSidebarOverlay() {
    if (sidebarOverlay) {
      sidebarOverlay.style.opacity = "0";
      setTimeout(() => {
        if (sidebarOverlay) {
          document.body.removeChild(sidebarOverlay);
          sidebarOverlay = null;
        }
      }, 300);
    }
  }

  // Close sidebar when clicking nav links on mobile
  const navLinks = document.querySelectorAll(".sidebar .nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (window.innerWidth <= 992) {
        sidebar.classList.remove("show");
        removeSidebarOverlay();
      }
    });
  });

  // Handle window resize
  window.addEventListener("resize", function () {
    if (window.innerWidth > 992) {
      sidebar.classList.remove("show");
      removeSidebarOverlay();
    }
  });
}

// Enhanced Animation System
function initializeAnimations() {
  // Add intersection observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        entry.target.style.animation = "fadeInUp 0.6s ease forwards";
      }
    });
  }, observerOptions);

  // Observe all section cards
  setTimeout(() => {
    document.querySelectorAll(".section-card").forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(20px)";
      card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(card);
    });
  }, 100);
}

// Enhanced Notification System
function showNotification(message, type = "info", duration = 3000) {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll(".notification");
  existingNotifications.forEach((notification) => notification.remove());

  // Create new notification
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;

  // Add to DOM
  document.body.appendChild(notification);

  // Auto remove after duration
  setTimeout(() => {
    notification.style.opacity = "0";
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, duration);
}

// Performance Optimization: Debounce function
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

// Override the existing viewContact function to use the new contact detail modal
function viewContact(contactName) {
  console.log("Viewing contact:", contactName);
  const modal = new bootstrap.Modal(
    document.getElementById("contactDetailModal")
  );
  modal.show();
}

// Initialize the dashboard when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.dashboard = new EventDashboard();
  window.dashboard.init();

  // Load saved checklist state
  window.dashboard.loadChecklistState();

  // Initialize scroll animations
  window.dashboard.initializeScrollAnimations();

  // Add some demo interactions
  console.log("Event Management Dashboard loaded successfully!");

  // Template option selection functionality
  setTimeout(() => {
    const templateOptions = document.querySelectorAll(".template-option");
    templateOptions.forEach((option) => {
      option.addEventListener("click", function () {
        // Remove selected class from all options
        templateOptions.forEach((opt) => opt.classList.remove("selected"));
        // Add selected class to clicked option
        this.classList.add("selected");
      });
    });
  }, 1000);
});

// Add CSS animation keyframes dynamically
const style = document.createElement("style");
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
if (typeof module !== "undefined" && module.exports) {
  module.exports = EventDashboard;
}
