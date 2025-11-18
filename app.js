// ========================================
// מצב אפליקציה גלובלי
// ========================================

let appState = {
  tasks: [],
  currentTab: 'all',
  currentCategory: 'all',
  searchQuery: '',
  viewMode: 'kanban',
  settings: null
};

// ========================================
// אתחול אפליקציה
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 אתחול מערכת התאוששות כלכלית...');
  
  // טעינת הגדרות
  appState.settings = loadSettings();
  applySettings(appState.settings);
  
  // טעינת משימות מ-localStorage או מהמאגר
  loadTasksFromStorage();
  
  // טעינת viewMode מהגדרות
  appState.viewMode = appState.settings.display.viewMode || 'kanban';
  
  // אתחול UI
  initializeUI();
  
  // רינדור ראשוני
  renderTasks();
  updateStats();
  updateProgress();
  
  console.log('✅ המערכת מוכנה!');
  console.log(`📊 נטענו ${appState.tasks.length} משימות`);
});

// ========================================
// טעינת משימות
// ========================================

function loadTasksFromStorage() {
  try {
    const saved = localStorage.getItem('matan_finance_tasks');
    if (saved) {
      appState.tasks = JSON.parse(saved);
      console.log('📥 משימות נטענו מ-localStorage');
    } else {
      appState.tasks = JSON.parse(JSON.stringify(TASKS_DATA));
      saveTasksToStorage();
      console.log('📦 משימות נטענו מהמאגר');
    }
  } catch (e) {
    console.error('❌ שגיאה בטעינת משימות:', e);
    appState.tasks = JSON.parse(JSON.stringify(TASKS_DATA));
  }
}

function saveTasksToStorage() {
  try {
    localStorage.setItem('matan_finance_tasks', JSON.stringify(appState.tasks));
    console.log('💾 משימות נשמרו ב-localStorage');
  } catch (e) {
    console.error('❌ שגיאה בשמירת משימות:', e);
  }
}

// ========================================
// אתחול UI
// ========================================

function initializeUI() {
  // עדכון כפתור תצוגה פעיל
  document.querySelectorAll('.view-toggle-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.view === appState.viewMode) {
      btn.classList.add('active');
    }
  });
  
  // הוספת מאזינים לכפתורי טאבים
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
      const tabName = e.currentTarget.dataset.tab;
      switchMainTab(tabName, e.currentTarget);
    });
  });
  
  // הוספת מאזינים לצ'יפס סינון
  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', (e) => {
      const category = e.currentTarget.dataset.category;
      filterByCategory(category, e.currentTarget);
    });
  });
  
  // מאזין לשדה חיפוש
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', debounce((e) => {
      appState.searchQuery = e.target.value.toLowerCase();
      renderTasks();
    }, 300));
  }
  
  // כפתור ייצוא
  const exportBtn = document.getElementById('exportBtn');
  if (exportBtn) {
    exportBtn.addEventListener('click', exportTasksToExcel);
  }
  
  // כפתור איפוס
  const resetBtn = document.getElementById('resetBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', resetAllTasks);
  }
}

// ========================================
// מעבר בין טאבים
// ========================================

function switchMainTab(tabName, element) {
  appState.currentTab = tabName;
  
  // עדכון כפתורים
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  element.classList.add('active');
  
  // רינדור מחדש
  renderTasks();
  updateStats();
}

// ========================================
// סינון לפי קטגוריה
// ========================================

function filterByCategory(category, element) {
  appState.currentCategory = category;
  
  // עדכון צ'יפסים
  document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  element.classList.add('active');
  
  // רינדור מחדש
  renderTasks();
}

// ========================================
// רינדור משימות
// ========================================

function renderTasks() {
  const container = document.getElementById('tasksContainer');
  if (!container) return;
  
  // סינון משימות
  let filtered = appState.tasks.filter(task => {
    // סינון לפי טאב
    if (appState.currentTab === 'todo' && task.status !== 'todo') return false;
    if (appState.currentTab === 'done' && task.status !== 'done') return false;
    
    // סינון לפי קטגוריה
    if (appState.currentCategory !== 'all' && task.category !== appState.currentCategory) return false;
    
    // סינון לפי חיפוש
    if (appState.searchQuery) {
      const searchable = `${task.title} ${task.description} ${task.amount}`.toLowerCase();
      if (!searchable.includes(appState.searchQuery)) return false;
    }
    
    return true;
  });
  
  // בדיקה אם יש תוצאות
  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🔍</div>
        <h3>לא נמצאו משימות</h3>
        <p>נסה לשנות את הסינון או החיפוש</p>
      </div>
    `;
    return;
  }
  
  // תצוגה מיוחדת למשימות שהושלמו
  if (appState.currentTab === 'done') {
    renderCompletedView(filtered, container);
    return;
  }
  
  // רינדור לפי מצב תצוגה
  if (appState.viewMode === 'list') {
    renderListView(filtered, container);
  } else {
    renderKanbanView(filtered, container);
  }
}

// ========================================
// תצוגת Kanban
// ========================================

function renderKanbanView(tasks, container) {
  // רק משימות פתוחות - משימות שהושלמו בטאב נפרד
  const todoTasks = tasks.filter(t => t.status === 'todo');
  
  // חלוקה מאוזנת ל-2 עמודות
  const column1 = [];
  const column2 = [];
  
  todoTasks.forEach((task, index) => {
    if (index % 2 === 0) {
      column1.push(task);
    } else {
      column2.push(task);
    }
  });
  
  container.innerHTML = `
    <div class="kanban-board">
      <div class="kanban-column">
        <div class="column-header">
          <h3><span>📋</span> משימות פעילות</h3>
          <span class="badge">${column1.length}</span>
        </div>
        <div class="column-content" id="todoColumn1">
          ${column1.map(task => createTaskCard(task)).join('')}
        </div>
      </div>
      
      <div class="kanban-column">
        <div class="column-header">
          <h3><span>💪</span> משימות פעילות</h3>
          <span class="badge">${column2.length}</span>
        </div>
        <div class="column-content" id="todoColumn2">
          ${column2.map(task => createTaskCard(task)).join('')}
        </div>
      </div>
    </div>
  `;
}

// ========================================
// תצוגת רשימה
// ========================================

function renderListView(tasks, container) {
  container.innerHTML = `
    <div class="list-view">
      ${tasks.map(task => createTaskCard(task, true)).join('')}
    </div>
  `;
}

// ========================================
// תצוגת משימות שהושלמו - דף נפרד
// ========================================

function renderCompletedView(tasks, container) {
  if (tasks.length === 0) {
    container.innerHTML = `
      <div class="completed-view">
        <div class="completed-empty">
          <div class="completed-empty-icon">🎉</div>
          <h3>עדיין לא השלמת משימות</h3>
          <p>התחל לבצע משימות וסמן אותן כמושלמות כדי לראות אותן כאן</p>
        </div>
      </div>
    `;
    return;
  }
  
  container.innerHTML = `
    <div class="completed-view">
      <div class="completed-header">
        <h2>🎉 משימות שהושלמו</h2>
        <p class="completed-subtitle">כל הכבוד! השלמת <strong>${tasks.length}</strong> משימות</p>
      </div>
      <div class="completed-grid">
        ${tasks.map(task => createCompletedTaskCard(task)).join('')}
      </div>
    </div>
  `;
}

function createCompletedTaskCard(task) {
  const categoryIcons = {
    reserve: '🎖️',
    government: '🏛️',
    debt: '💳',
    employment: '💼',
    housing: '🏠',
    business: '🚀'
  };
  
  const categoryNames = {
    reserve: 'מילואים',
    government: 'ממשלתי',
    debt: 'חובות',
    employment: 'תעסוקה',
    housing: 'דיור',
    business: 'עסקים'
  };
  
  const priorityColors = {
    high: 'danger',
    medium: 'warning',
    low: 'success'
  };
  
  const priorityLabels = {
    high: 'דחוף',
    medium: 'בינוני',
    low: 'נמוך'
  };
  
  return `
    <div class="completed-card" onclick="openTaskModal(${task.id})">
      <div class="completed-card-header">
        <div class="completed-card-meta">
          <h3 class="completed-card-title">
            <span class="completed-icon">✅</span>
            ${task.title}
          </h3>
          <div class="completed-badges">
            <span class="badge badge-${priorityColors[task.priority]}">
              ${priorityLabels[task.priority]}
            </span>
            <span class="badge">
              ${categoryIcons[task.category]} ${categoryNames[task.category]}
            </span>
            ${task.amount ? `<span class="badge badge-primary">💰 ${task.amount}</span>` : ''}
          </div>
        </div>
      </div>
      
      <p class="completed-card-description">${task.description}</p>
      
      <div class="completed-card-details">
        ${task.deadline ? `<span class="completed-detail-item">📅 ${task.deadline}</span>` : ''}
        ${task.difficulty ? `<span class="completed-detail-item">⚡ רמת קושי: ${task.difficulty}/5</span>` : ''}
        ${task.duration ? `<span class="completed-detail-item">⏱️ ${task.duration}</span>` : ''}
      </div>
      
      <div class="completed-card-footer">
        <div class="completed-actions">
          <button 
            class="undo-btn" 
            onclick="event.stopPropagation(); undoTaskCompletion(${task.id})">
            ↩️ ביטול השלמה
          </button>
        </div>
      </div>
    </div>
  `;
}

// ========================================
// ביטול השלמת משימה
// ========================================

function undoTaskCompletion(taskId) {
  const task = appState.tasks.find(t => t.id === taskId);
  if (task) {
    task.status = 'todo';
    saveTasksToStorage();
    renderTasks();
    updateStats();
    updateProgress();
  }
}

// ========================================
// יצירת כרטיס משימה
// ========================================

function createTaskCard(task, isListView = false) {
  const priorityColors = {
    high: 'danger',
    medium: 'warning',
    low: 'success'
  };
  
  const priorityLabels = {
    high: 'דחוף',
    medium: 'בינוני',
    low: 'נמוך'
  };
  
  const categoryIcons = {
    reserve: '🎖️',
    government: '🏛️',
    debt: '💳',
    employment: '💼',
    housing: '🏠',
    business: '🚀'
  };
  
  const categoryNames = {
    reserve: 'מילואים',
    government: 'ממשלתי',
    debt: 'חובות',
    employment: 'תעסוקה',
    housing: 'דיור',
    business: 'עסקים'
  };
  
  const isCompleted = task.status === 'done';
  
  return `
    <div class="task-card ${isListView ? 'list-mode' : ''} ${isCompleted ? 'completed' : ''}" 
         data-task-id="${task.id}"
         onclick="openTaskModal(${task.id})">
      
      <div class="task-checkbox-wrapper" onclick="event.stopPropagation();">
        <div class="checkbox-container">
          <input 
            type="checkbox" 
            class="task-checkbox" 
            id="checkbox-${task.id}" 
            ${isCompleted ? 'checked' : ''}
            onchange="toggleTaskStatus(${task.id})"
          >
          <label for="checkbox-${task.id}" class="checkbox-label"></label>
        </div>
      </div>
      
      <div class="task-content">
        <div class="task-header">
          <h4 class="task-title">${task.title}</h4>
          <div class="task-badges">
            <span class="badge badge-${priorityColors[task.priority]}">
              ${priorityLabels[task.priority]}
            </span>
            <span class="badge">
              ${categoryIcons[task.category]} ${categoryNames[task.category]}
            </span>
          </div>
        </div>
        
        <p class="task-description">${task.description}</p>
        
        <div class="task-details">
          <div class="detail-item">
            <span class="detail-icon">💰</span>
            <span class="detail-text">${task.amount}</span>
          </div>
          <div class="detail-item">
            <span class="detail-icon">⏱️</span>
            <span class="detail-text">${task.estimatedTime}</span>
          </div>
          ${task.deadline ? `
            <div class="detail-item">
              <span class="detail-icon">📅</span>
              <span class="detail-text">${task.deadline}</span>
            </div>
          ` : ''}
        </div>
        
        <div class="task-actions">
          ${task.phone ? `
            <a href="tel:${task.phone}" class="action-btn" onclick="event.stopPropagation();">
              <span>📞</span>
              <span>${task.phone}</span>
            </a>
          ` : ''}
          ${task.link ? `
            <a href="${task.link}" target="_blank" class="action-btn" onclick="event.stopPropagation();">
              <span>🔗</span>
              <span>לאתר</span>
            </a>
          ` : ''}
          <button class="action-btn action-btn-primary" onclick="event.stopPropagation(); openTaskModal(${task.id});">
            <span>ℹ️</span>
            <span>פרטים מלאים</span>
          </button>
        </div>
      </div>
    </div>
  `;
}

// ========================================
// החלפת סטטוס משימה
// ========================================

function toggleTaskStatus(taskId) {
  const task = appState.tasks.find(t => t.id === taskId);
  if (!task) return;
  
  task.status = task.status === 'done' ? 'todo' : 'done';
  
  saveTasksToStorage();
  renderTasks();
  updateStats();
  updateProgress();
  
  // אנימציה
  const card = document.querySelector(`[data-task-id="${taskId}"]`);
  if (card) {
    card.style.animation = 'pulse 0.3s ease';
    setTimeout(() => {
      card.style.animation = '';
    }, 300);
  }
}

// ========================================
// עדכון סטטיסטיקות
// ========================================

function updateStats() {
  const total = appState.tasks.length;
  const completed = appState.tasks.filter(t => t.status === 'done').length;
  const pending = total - completed;
  
  // עדכון מספרים
  const totalEl = document.getElementById('totalTasks');
  const completedEl = document.getElementById('completedTasks');
  const pendingEl = document.getElementById('pendingTasks');
  
  if (totalEl) totalEl.textContent = total;
  if (completedEl) completedEl.textContent = completed;
  if (pendingEl) pendingEl.textContent = pending;
}

// ========================================
// עדכון פס התקדמות
// ========================================

function updateProgress() {
  const total = appState.tasks.length;
  const completed = appState.tasks.filter(t => t.status === 'done').length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  const progressBar = document.getElementById('progressBar');
  const progressText = document.getElementById('progressText');
  
  if (progressBar) {
    progressBar.style.width = `${percentage}%`;
  }
  
  if (progressText) {
    progressText.textContent = `${percentage}%`;
  }
}

// ========================================
// פתיחת modal משימה מפורט
// ========================================

function openTaskModal(taskId) {
  const task = appState.tasks.find(t => t.id === taskId);
  if (!task) return;
  
  const modal = document.getElementById('taskModal');
  if (!modal) return;
  
  // בניית תוכן ה-modal
  const modalContent = document.getElementById('taskModalContent');
  if (modalContent) {
    modalContent.innerHTML = renderDetailedTask(task);
  }
  
  // הצגת ה-modal
  modal.style.display = 'flex';
  setTimeout(() => modal.classList.add('active'), 10);
}

// ========================================
// סגירת modal משימה
// ========================================

function closeTaskModal() {
  const modal = document.getElementById('taskModal');
  if (!modal) return;
  
  modal.classList.remove('active');
  setTimeout(() => modal.style.display = 'none', 300);
}

// ========================================
// רינדור משימה מפורטת
// ========================================

function renderDetailedTask(task) {
  const categoryIcons = {
    reserve: '🎖️',
    government: '🏛️',
    debt: '💳',
    employment: '💼',
    housing: '🏠',
    business: '🚀'
  };
  
  const categoryNames = {
    reserve: 'זכויות מילואים',
    government: 'תמיכות ממשלתיות',
    debt: 'פתרונות חובות',
    employment: 'תעסוקה וקריירה',
    housing: 'דיור',
    business: 'עסקים קטנים'
  };
  
  const isCompleted = task.status === 'done';
  const progress = calculateTaskProgress(task);
  
  return `
    <div class="modal-header">
      <div class="modal-title">
        <span style="font-size: 2rem;">${categoryIcons[task.category]}</span>
        <div>
          <h2>${task.title}</h2>
          <p style="font-size: 0.9rem; opacity: 0.8; font-weight: 400;">
            ${categoryNames[task.category]}
          </p>
        </div>
      </div>
      <button class="modal-close" onclick="closeTaskModal()">×</button>
    </div>
    
    <div class="modal-body">
      <!-- סימון משימה -->
      <div class="task-checkbox-wrapper" style="margin-bottom: 1.5rem;">
        <div class="checkbox-container" style="transform: scale(1.3);">
          <input 
            type="checkbox" 
            class="task-checkbox" 
            id="modal-checkbox-${task.id}" 
            ${isCompleted ? 'checked' : ''}
            onchange="toggleTaskStatusInModal(${task.id})"
          >
          <label for="modal-checkbox-${task.id}" class="checkbox-label"></label>
        </div>
        <span style="font-size: 1.1rem; font-weight: 600; margin-right: 1rem;">
          ${isCompleted ? 'הושלמה ✓' : 'סמן כהושלם'}
        </span>
      </div>
      
      <!-- פס התקדמות -->
      ${progress !== null ? `
        <div style="margin-bottom: 1.5rem;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
            <span style="font-weight: 600;">התקדמות</span>
            <span style="font-weight: 700; color: var(--color-accent);">${progress}%</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${progress}%;">${progress}%</div>
          </div>
        </div>
      ` : ''}
      
      <!-- תיאור -->
      <div class="step-section" style="margin-bottom: 1.5rem;">
        <div class="step-title">
          <span>📝</span>
          <span>תיאור</span>
        </div>
        <p style="line-height: 1.8; font-size: 1.05rem;">${task.description}</p>
      </div>
      
      <!-- פרטים חשובים -->
      <div class="step-section" style="margin-bottom: 1.5rem;">
        <div class="step-title">
          <span>💡</span>
          <span>פרטים חשובים</span>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
          <div class="detail-card">
            <div class="detail-icon" style="font-size: 2rem;">💰</div>
            <div>
              <div style="font-size: 0.85rem; opacity: 0.7;">סכום</div>
              <div style="font-size: 1.2rem; font-weight: 700;">${task.amount}</div>
            </div>
          </div>
          <div class="detail-card">
            <div class="detail-icon" style="font-size: 2rem;">⏱️</div>
            <div>
              <div style="font-size: 0.85rem; opacity: 0.7;">זמן משוער</div>
              <div style="font-size: 1.2rem; font-weight: 700;">${task.estimatedTime}</div>
            </div>
          </div>
          ${task.deadline ? `
            <div class="detail-card">
              <div class="detail-icon" style="font-size: 2rem;">📅</div>
              <div>
                <div style="font-size: 0.85rem; opacity: 0.7;">דדליין</div>
                <div style="font-size: 1.2rem; font-weight: 700;">${task.deadline}</div>
              </div>
            </div>
          ` : ''}
        </div>
      </div>
      
      <!-- פרטי קשר -->
      <div class="step-section" style="margin-bottom: 1.5rem;">
        <div class="step-title">
          <span>📞</span>
          <span>פרטי קשר</span>
        </div>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          ${task.phone ? `
            <a href="tel:${task.phone}" class="btn btn-primary" style="flex: 1; min-width: 200px;">
              <span style="font-size: 1.5rem;">📞</span>
              <span style="font-size: 1.1rem;">${task.phone}</span>
            </a>
          ` : ''}
          ${task.link ? `
            <a href="${task.link}" target="_blank" class="btn btn-primary" style="flex: 1; min-width: 200px;">
              <span style="font-size: 1.5rem;">🔗</span>
              <span style="font-size: 1.1rem;">פתח את האתר</span>
            </a>
          ` : ''}
        </div>
      </div>
      
      ${renderTaskSteps(task)}
    </div>
    
    <div class="modal-footer">
      <button class="btn" onclick="closeTaskModal()">סגור</button>
      <button class="btn btn-primary" onclick="printTask(${task.id})">
        <span>🖨️</span>
        <span>הדפס</span>
      </button>
      <button class="btn btn-success" onclick="shareTask(${task.id})">
        <span>📤</span>
        <span>שתף</span>
      </button>
    </div>
  `;
}

// ========================================
// רינדור שלבי המשימה
// ========================================

function renderTaskSteps(task) {
  let html = '<div class="task-steps">';
  
  // תנאים
  if (task.conditions && task.conditions.length > 0) {
    html += `
      <div class="step-section">
        <div class="step-title">
          <span>✅</span>
          <span>תנאי זכאות</span>
        </div>
        <ul class="step-list">
          ${task.conditions.map(cond => `<li>${cond}</li>`).join('')}
        </ul>
      </div>
    `;
  }
  
  // הוראות
  if (task.howTo && task.howTo.length > 0) {
    html += `
      <div class="step-section">
        <div class="step-title">
          <span>📋</span>
          <span>איך לבצע? (שלב אחר שלב)</span>
        </div>
        <ol class="step-list" style="list-style: decimal; padding-right: 1.5rem;">
          ${task.howTo.map((step, i) => `
            <li style="padding-right: 0.5rem; margin-bottom: 0.5rem;">
              <strong>שלב ${i + 1}:</strong> ${step}
            </li>
          `).join('')}
        </ol>
      </div>
    `;
  }
  
  // דוגמאות
  if (task.examples && task.examples.length > 0) {
    html += `
      <div class="step-section">
        <div class="step-title">
          <span>💡</span>
          <span>דוגמאות מעשיות</span>
        </div>
        <ul class="step-list">
          ${task.examples.map(ex => `<li>${ex}</li>`).join('')}
        </ul>
      </div>
    `;
  }
  
  // יתרונות
  if (task.benefits && task.benefits.length > 0) {
    html += `
      <div class="step-section">
        <div class="step-title">
          <span>⭐</span>
          <span>יתרונות</span>
        </div>
        <ul class="step-list">
          ${task.benefits.map(ben => `<li>${ben}</li>`).join('')}
        </ul>
      </div>
    `;
  }
  
  html += '</div>';
  return html;
}

// ========================================
// חישוב אחוזי התקדמות משימה
// ========================================

function calculateTaskProgress(task) {
  // לוגיקה פשוטה: אם הושלם - 100%, אחרת - 0%
  // ניתן להרחיב בעתיד לתת-משימות
  return task.status === 'done' ? 100 : 0;
}

// ========================================
// החלפת סטטוס בmodal
// ========================================

function toggleTaskStatusInModal(taskId) {
  toggleTaskStatus(taskId);
  
  // עדכון התוכן של ה-modal
  const task = appState.tasks.find(t => t.id === taskId);
  if (task) {
    const modalContent = document.getElementById('taskModalContent');
    if (modalContent) {
      modalContent.innerHTML = renderDetailedTask(task);
    }
  }
}

// ========================================
// הדפסת משימה
// ========================================

function printTask(taskId) {
  const task = appState.tasks.find(t => t.id === taskId);
  if (!task) return;
  
  const printWindow = window.open('', '_blank');
  printWindow.document.write(`
    <html dir="rtl">
      <head>
        <title>${task.title}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
            line-height: 1.6;
          }
          h1 { color: #667eea; }
          h2 { color: #764ba2; margin-top: 20px; }
          ul, ol { margin: 10px 0; padding-right: 20px; }
          li { margin: 5px 0; }
          .detail { 
            background: #f0f0f0; 
            padding: 10px; 
            margin: 10px 0; 
            border-radius: 5px; 
          }
        </style>
      </head>
      <body>
        <h1>${task.title}</h1>
        <p><strong>תיאור:</strong> ${task.description}</p>
        
        <div class="detail">
          <strong>💰 סכום:</strong> ${task.amount}<br>
          <strong>⏱️ זמן משוער:</strong> ${task.estimatedTime}<br>
          ${task.deadline ? `<strong>📅 דדליין:</strong> ${task.deadline}<br>` : ''}
          ${task.phone ? `<strong>📞 טלפון:</strong> ${task.phone}<br>` : ''}
          ${task.link ? `<strong>🔗 קישור:</strong> <a href="${task.link}">${task.link}</a>` : ''}
        </div>
        
        ${task.conditions ? `
          <h2>תנאי זכאות</h2>
          <ul>${task.conditions.map(c => `<li>${c}</li>`).join('')}</ul>
        ` : ''}
        
        ${task.howTo ? `
          <h2>איך לבצע?</h2>
          <ol>${task.howTo.map(h => `<li>${h}</li>`).join('')}</ol>
        ` : ''}
        
        ${task.examples ? `
          <h2>דוגמאות</h2>
          <ul>${task.examples.map(e => `<li>${e}</li>`).join('')}</ul>
        ` : ''}
        
        ${task.benefits ? `
          <h2>יתרונות</h2>
          <ul>${task.benefits.map(b => `<li>${b}</li>`).join('')}</ul>
        ` : ''}
      </body>
    </html>
  `);
  
  printWindow.document.close();
  printWindow.print();
}

// ========================================
// שיתוף משימה
// ========================================

function shareTask(taskId) {
  const task = appState.tasks.find(t => t.id === taskId);
  if (!task) return;
  
  const shareText = `
📋 ${task.title}

${task.description}

💰 ${task.amount}
⏱️ ${task.estimatedTime}
${task.phone ? `📞 ${task.phone}` : ''}
${task.link ? `🔗 ${task.link}` : ''}
  `.trim();
  
  if (navigator.share) {
    navigator.share({
      title: task.title,
      text: shareText
    }).catch(err => console.log('שגיאה בשיתוף:', err));
  } else {
    // העתקה ללוח
    navigator.clipboard.writeText(shareText).then(() => {
      showNotification('✅ הטקסט הועתק ללוח!', 'success');
    });
  }
}

// ========================================
// מעבר בין תצוגות
// ========================================

function switchViewMode(mode) {
  appState.viewMode = mode;
  
  // שמירה בהגדרות
  const settings = loadSettings();
  settings.display.viewMode = mode;
  saveSettings(settings);
  
  // עדכון UI
  renderTasks();
  
  // עדכון כפתורים
  document.querySelectorAll('.view-toggle-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.view === mode) {
      btn.classList.add('active');
    }
  });
}

// ========================================
// ייצוא משימות ל-Excel (CSV)
// ========================================

function exportTasksToExcel() {
  const headers = ['מספר', 'כותרת', 'תיאור', 'קטגוריה', 'סטטוס', 'סכום', 'זמן משוער', 'דדליין', 'טלפון', 'קישור'];
  
  const rows = appState.tasks.map(task => [
    task.id,
    task.title,
    task.description,
    task.category,
    task.status === 'done' ? 'הושלם' : 'לביצוע',
    task.amount,
    task.estimatedTime,
    task.deadline || '-',
    task.phone || '-',
    task.link || '-'
  ]);
  
  let csv = '\uFEFF'; // BOM for Excel UTF-8
  csv += headers.join(',') + '\n';
  csv += rows.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
  
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `מערכת_התאוששות_כלכלית_${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
  URL.revokeObjectURL(url);
  
  showNotification('✅ הקובץ יוצא בהצלחה!', 'success');
}

// ========================================
// איפוס כל המשימות
// ========================================

function resetAllTasks() {
  if (confirm('האם אתה בטוח שברצונך לאפס את כל המשימות?\nפעולה זו תמחק את כל ההתקדמות!')) {
    appState.tasks = JSON.parse(JSON.stringify(TASKS_DATA));
    saveTasksToStorage();
    renderTasks();
    updateStats();
    updateProgress();
    showNotification('✅ כל המשימות אופסו!', 'success');
  }
}

// ========================================
// Debounce (עיכוב חיפוש)
// ========================================

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
