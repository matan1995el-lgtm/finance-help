// ========================================
// מערכת הגדרות מתקדמת - עיצוב מקצועי
// ========================================

// הגדרות ברירת מחדל - עיצוב מקצועי
const DEFAULT_SETTINGS = {
  colors: {
    primary: '#2563eb',      // כחול מקצועי
    secondary: '#1e40af',    // כחול כהה
    accent: '#3b82f6',       // כחול בהיר
    success: '#10b981',      // ירוק
    warning: '#f59e0b',      // כתום
    danger: '#ef4444',       // אדום
    background: '#0f172a',   // כהה מאוד
    surface: '#1e293b',      // אפור כהה
    surfaceLight: '#334155', // אפור בהיר יותר
    text: '#f1f5f9',         // טקסט בהיר
    textSecondary: '#cbd5e1', // טקסט משני
    border: '#475569',       // גבול
    shadow: 'rgba(0, 0, 0, 0.5)'
  },
  
  typography: {
    fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
    fontSize: {
      small: '0.875rem',
      base: '1rem',
      large: '1.125rem',
      xlarge: '1.25rem',
      xxlarge: '1.5rem',
      xxxlarge: '2rem'
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700'
    },
    // הגדרות מתקדמות לכותרות וטקסט
    mainTitle: {
      fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
      fontSize: '2rem',
      fontWeight: '800',
      color: null  // ישתמש ב-var(--color-text) אם null
    },
    subtitle: {
      fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
      fontSize: '1.5rem',
      fontWeight: '700',
      color: null  // ישתמש ב-var(--color-text) אם null
    },
    bodyText: {
      fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
      fontSize: '1rem',
      fontWeight: '400',
      color: null  // ישתמש ב-var(--color-text) אם null
    }
  },
  
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem'
  },
  
  effects: {
    borderRadius: {
      small: '4px',
      medium: '8px',
      large: '12px',
      xlarge: '16px'
    },
    blur: '0px',
    opacity: 1,
    shadowIntensity: 0.5
  },
  
  display: {
    viewMode: 'kanban',
    compactMode: false,
    showCompletedTasks: true
  }
};

// ערכות נושא מקצועיות - צבעים אחידים ללא גרדיאנטים
const THEME_PRESETS = {
  professional_dark: {
    name: 'מקצועי כהה',
    description: 'עיצוב עסקי כהה עם ניגודיות גבוהה',
    colors: {
      primary: '#3b82f6',
      secondary: '#2563eb',
      accent: '#60a5fa',
      success: '#10b981',
      warning: '#f59e0b',
      danger: '#ef4444',
      background: '#0f172a',
      surface: '#1e293b',
      surfaceLight: '#334155',
      text: '#f1f5f9',
      textSecondary: '#cbd5e1',
      border: '#475569',
      shadow: 'rgba(0, 0, 0, 0.5)'
    }
  },
  
  professional_light: {
    name: 'מקצועי בהיר',
    description: 'עיצוב נקי ובהיר לעבודה ביום',
    colors: {
      primary: '#2563eb',
      secondary: '#1d4ed8',
      accent: '#3b82f6',
      success: '#059669',
      warning: '#d97706',
      danger: '#dc2626',
      background: '#f8fafc',
      surface: '#ffffff',
      surfaceLight: '#f1f5f9',
      text: '#0f172a',
      textSecondary: '#475569',
      border: '#e2e8f0',
      shadow: 'rgba(0, 0, 0, 0.1)'
    }
  },
  
  corporate_blue: {
    name: 'כחול עסקי',
    description: 'גוון כחול מקצועי לסביבה עסקית',
    colors: {
      primary: '#1e40af',
      secondary: '#1e3a8a',
      accent: '#3b82f6',
      success: '#059669',
      warning: '#d97706',
      danger: '#dc2626',
      background: '#1e293b',
      surface: '#334155',
      surfaceLight: '#475569',
      text: '#f1f5f9',
      textSecondary: '#cbd5e1',
      border: '#64748b',
      shadow: 'rgba(0, 0, 0, 0.4)'
    }
  },
  
  elegant_gray: {
    name: 'אפור אלגנטי',
    description: 'צבעי אפור מתוחכמים ומינימליסטיים',
    colors: {
      primary: '#64748b',
      secondary: '#475569',
      accent: '#94a3b8',
      success: '#059669',
      warning: '#d97706',
      danger: '#dc2626',
      background: '#0f172a',
      surface: '#1e293b',
      surfaceLight: '#334155',
      text: '#f1f5f9',
      textSecondary: '#cbd5e1',
      border: '#475569',
      shadow: 'rgba(0, 0, 0, 0.5)'
    }
  },
  
  modern_slate: {
    name: 'צפחה מודרנית',
    description: 'עיצוב מודרני עם גוון צפחה',
    colors: {
      primary: '#0ea5e9',
      secondary: '#0284c7',
      accent: '#38bdf8',
      success: '#10b981',
      warning: '#f59e0b',
      danger: '#ef4444',
      background: '#0f172a',
      surface: '#1e293b',
      surfaceLight: '#334155',
      text: '#f1f5f9',
      textSecondary: '#cbd5e1',
      border: '#475569',
      shadow: 'rgba(0, 0, 0, 0.5)'
    }
  },
  
  executive_black: {
    name: 'שחור מנהלים',
    description: 'עיצוב יוקרתי בשחור ולבן',
    colors: {
      primary: '#000000',
      secondary: '#171717',
      accent: '#404040',
      success: '#10b981',
      warning: '#f59e0b',
      danger: '#ef4444',
      background: '#000000',
      surface: '#171717',
      surfaceLight: '#262626',
      text: '#fafafa',
      textSecondary: '#d4d4d4',
      border: '#404040',
      shadow: 'rgba(0, 0, 0, 0.8)'
    }
  }
};

// טעינת הגדרות מ-localStorage
function loadSettings() {
  try {
    const saved = localStorage.getItem('matan_finance_settings');
    if (saved) {
      const settings = JSON.parse(saved);
      return deepMerge(DEFAULT_SETTINGS, settings);
    }
  } catch (e) {
    console.error('שגיאה בטעינת הגדרות:', e);
  }
  return JSON.parse(JSON.stringify(DEFAULT_SETTINGS));
}

// שמירת הגדרות ל-localStorage
function saveSettings(settings) {
  try {
    localStorage.setItem('matan_finance_settings', JSON.stringify(settings));
    return true;
  } catch (e) {
    console.error('שגיאה בשמירת הגדרות:', e);
    return false;
  }
}

// מיזוג עמוק של אובייקטים
function deepMerge(target, source) {
  const result = JSON.parse(JSON.stringify(target));
  
  function merge(obj, src) {
    for (const key in src) {
      if (src[key] && typeof src[key] === 'object' && !Array.isArray(src[key])) {
        obj[key] = obj[key] || {};
        merge(obj[key], src[key]);
      } else {
        obj[key] = src[key];
      }
    }
  }
  
  merge(result, source);
  return result;
}

// החלת הגדרות על העמוד
function applySettings(settings = null) {
  const s = settings || loadSettings();
  const root = document.documentElement;
  
  // צבעים
  root.style.setProperty('--color-primary', s.colors.primary);
  root.style.setProperty('--color-secondary', s.colors.secondary);
  root.style.setProperty('--color-accent', s.colors.accent);
  root.style.setProperty('--color-success', s.colors.success);
  root.style.setProperty('--color-warning', s.colors.warning);
  root.style.setProperty('--color-danger', s.colors.danger);
  root.style.setProperty('--color-background', s.colors.background);
  root.style.setProperty('--color-surface', s.colors.surface);
  root.style.setProperty('--color-surface-light', s.colors.surfaceLight);
  root.style.setProperty('--color-text', s.colors.text);
  root.style.setProperty('--color-text-secondary', s.colors.textSecondary);
  root.style.setProperty('--color-border', s.colors.border);
  root.style.setProperty('--color-shadow', s.colors.shadow);
  
  // רקע
  document.body.style.background = s.colors.background;
  
  // טיפוגרפיה
  root.style.setProperty('--font-family', s.typography.fontFamily);
  root.style.setProperty('--font-size-small', s.typography.fontSize.small);
  root.style.setProperty('--font-size-base', s.typography.fontSize.base);
  root.style.setProperty('--font-size-large', s.typography.fontSize.large);
  root.style.setProperty('--font-size-xlarge', s.typography.fontSize.xlarge);
  root.style.setProperty('--font-size-xxlarge', s.typography.fontSize.xxlarge);
  root.style.setProperty('--font-size-xxxlarge', s.typography.fontSize.xxxlarge);
  
  // הגדרות מתקדמות לכותרות וטקסט
  root.style.setProperty('--main-title-font', s.typography.mainTitle.fontFamily);
  root.style.setProperty('--main-title-size', s.typography.mainTitle.fontSize);
  root.style.setProperty('--main-title-weight', s.typography.mainTitle.fontWeight);
  root.style.setProperty('--main-title-color', s.typography.mainTitle.color || s.colors.text);
  
  root.style.setProperty('--subtitle-font', s.typography.subtitle.fontFamily);
  root.style.setProperty('--subtitle-size', s.typography.subtitle.fontSize);
  root.style.setProperty('--subtitle-weight', s.typography.subtitle.fontWeight);
  root.style.setProperty('--subtitle-color', s.typography.subtitle.color || s.colors.text);
  
  root.style.setProperty('--body-text-font', s.typography.bodyText.fontFamily);
  root.style.setProperty('--body-text-size', s.typography.bodyText.fontSize);
  root.style.setProperty('--body-text-weight', s.typography.bodyText.fontWeight);
  root.style.setProperty('--body-text-color', s.typography.bodyText.color || s.colors.text);
  
  // מרווחים
  root.style.setProperty('--spacing-xs', s.spacing.xs);
  root.style.setProperty('--spacing-sm', s.spacing.sm);
  root.style.setProperty('--spacing-md', s.spacing.md);
  root.style.setProperty('--spacing-lg', s.spacing.lg);
  root.style.setProperty('--spacing-xl', s.spacing.xl);
  root.style.setProperty('--spacing-xxl', s.spacing.xxl);
  
  // אפקטים
  root.style.setProperty('--radius-small', s.effects.borderRadius.small);
  root.style.setProperty('--radius-medium', s.effects.borderRadius.medium);
  root.style.setProperty('--radius-large', s.effects.borderRadius.large);
  root.style.setProperty('--radius-xlarge', s.effects.borderRadius.xlarge);
  root.style.setProperty('--blur', s.effects.blur);
  root.style.setProperty('--opacity', s.effects.opacity);
  root.style.setProperty('--shadow-intensity', s.effects.shadowIntensity);
}

// פתיחת modal הגדרות
function openSettings() {
  const modal = document.getElementById('settingsModal');
  if (!modal) return;
  
  const settings = loadSettings();
  populateSettingsForm(settings);
  
  modal.style.display = 'flex';
  setTimeout(() => modal.classList.add('active'), 10);
}

// סגירת modal הגדרות
function closeSettings() {
  const modal = document.getElementById('settingsModal');
  if (!modal) return;
  
  modal.classList.remove('active');
  setTimeout(() => modal.style.display = 'none', 300);
}

// מילוי הטופס עם ערכים
function populateSettingsForm(settings) {
  setValue('colorPrimary', settings.colors.primary);
  setValue('colorSecondary', settings.colors.secondary);
  setValue('colorAccent', settings.colors.accent);
  setValue('colorSuccess', settings.colors.success);
  setValue('colorWarning', settings.colors.warning);
  setValue('colorDanger', settings.colors.danger);
  setValue('colorBackground', settings.colors.background);
  setValue('colorSurface', settings.colors.surface);
  setValue('colorText', settings.colors.text);
  
  setValue('fontFamily', settings.typography.fontFamily);
  setValue('fontSizeBase', parseFloat(settings.typography.fontSize.base));
  setValue('borderRadius', parseFloat(settings.effects.borderRadius.medium));
  
  // הגדרות טיפוגרפיה מתקדמות
  if (settings.typography.mainTitle) {
    setValue('mainTitleFont', settings.typography.mainTitle.fontFamily);
    setValue('mainTitleSize', parseFloat(settings.typography.mainTitle.fontSize));
    setValue('mainTitleWeight', settings.typography.mainTitle.fontWeight);
    setValue('mainTitleColor', settings.typography.mainTitle.color || '');
  }
  
  if (settings.typography.subtitle) {
    setValue('subtitleFont', settings.typography.subtitle.fontFamily);
    setValue('subtitleSize', parseFloat(settings.typography.subtitle.fontSize));
    setValue('subtitleWeight', settings.typography.subtitle.fontWeight);
    setValue('subtitleColor', settings.typography.subtitle.color || '');
  }
  
  if (settings.typography.bodyText) {
    setValue('bodyTextFont', settings.typography.bodyText.fontFamily);
    setValue('bodyTextSize', parseFloat(settings.typography.bodyText.fontSize));
    setValue('bodyTextWeight', settings.typography.bodyText.fontWeight);
    setValue('bodyTextColor', settings.typography.bodyText.color || '');
  }
}

function setValue(id, value) {
  const el = document.getElementById(id);
  if (el) {
    if (el.type === 'range') {
      el.value = value;
      const output = document.getElementById(id + 'Value');
      if (output) output.textContent = value;
    } else {
      el.value = value;
    }
  }
}

// שמירת הגדרות מהטופס
function saveSettingsFromForm() {
  const settings = loadSettings();
  
  settings.colors.primary = getValue('colorPrimary');
  settings.colors.secondary = getValue('colorSecondary');
  settings.colors.accent = getValue('colorAccent');
  settings.colors.success = getValue('colorSuccess');
  settings.colors.warning = getValue('colorWarning');
  settings.colors.danger = getValue('colorDanger');
  settings.colors.background = getValue('colorBackground');
  settings.colors.surface = getValue('colorSurface');
  settings.colors.surfaceLight = getValue('colorSurface');
  settings.colors.text = getValue('colorText');
  settings.colors.textSecondary = settings.colors.text + 'cc';
  settings.colors.border = settings.colors.text + '33';
  
  settings.typography.fontFamily = getValue('fontFamily');
  const baseFontSize = parseFloat(getValue('fontSizeBase'));
  settings.typography.fontSize = {
    small: `${baseFontSize * 0.875}rem`,
    base: `${baseFontSize}rem`,
    large: `${baseFontSize * 1.125}rem`,
    xlarge: `${baseFontSize * 1.25}rem`,
    xxlarge: `${baseFontSize * 1.5}rem`,
    xxxlarge: `${baseFontSize * 2}rem`
  };
  
  // הגדרות טיפוגרפיה מתקדמות
  settings.typography.mainTitle = {
    fontFamily: getValue('mainTitleFont') || settings.typography.fontFamily,
    fontSize: `${getValue('mainTitleSize')}rem`,
    fontWeight: getValue('mainTitleWeight'),
    color: getValue('mainTitleColor') || null
  };
  
  settings.typography.subtitle = {
    fontFamily: getValue('subtitleFont') || settings.typography.fontFamily,
    fontSize: `${getValue('subtitleSize')}rem`,
    fontWeight: getValue('subtitleWeight'),
    color: getValue('subtitleColor') || null
  };
  
  settings.typography.bodyText = {
    fontFamily: getValue('bodyTextFont') || settings.typography.fontFamily,
    fontSize: `${getValue('bodyTextSize')}rem`,
    fontWeight: getValue('bodyTextWeight'),
    color: getValue('bodyTextColor') || null
  };
  
  const radius = parseFloat(getValue('borderRadius'));
  settings.effects.borderRadius = {
    small: `${radius * 0.5}px`,
    medium: `${radius}px`,
    large: `${radius * 1.5}px`,
    xlarge: `${radius * 2}px`
  };
  
  if (saveSettings(settings)) {
    applySettings(settings);
    showNotification('✅ ההגדרות נשמרו בהצלחה!', 'success');
    closeSettings();
  } else {
    showNotification('❌ שגיאה בשמירת הגדרות', 'error');
  }
}

function getValue(id) {
  const el = document.getElementById(id);
  return el ? el.value : '';
}

// איפוס להגדרות ברירת מחדל
function resetSettings() {
  if (confirm('האם אתה בטוח שברצונך לאפס את כל ההגדרות?')) {
    saveSettings(DEFAULT_SETTINGS);
    applySettings(DEFAULT_SETTINGS);
    populateSettingsForm(DEFAULT_SETTINGS);
    showNotification('✅ ההגדרות אופסו לברירת מחדל', 'success');
  }
}

// החלת ערכת נושא מוכנה
function applyThemePreset(presetName) {
  const preset = THEME_PRESETS[presetName];
  if (!preset) return;
  
  const settings = loadSettings();
  settings.colors = { ...settings.colors, ...preset.colors };
  
  saveSettings(settings);
  applySettings(settings);
  populateSettingsForm(settings);
  
  showNotification(`✅ ערכת נושא "${preset.name}" הוחלה בהצלחה!`, 'success');
}

// ייצוא הגדרות ל-JSON
function exportSettings() {
  const settings = loadSettings();
  const json = JSON.stringify(settings, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'matan_finance_settings.json';
  a.click();
  URL.revokeObjectURL(url);
  showNotification('✅ ההגדרות יוצאו בהצלחה!', 'success');
}

// ייבוא הגדרות מ-JSON
function importSettings() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const settings = JSON.parse(event.target.result);
        saveSettings(settings);
        applySettings(settings);
        populateSettingsForm(settings);
        showNotification('✅ ההגדרות יובאו בהצלחה!', 'success');
      } catch (error) {
        showNotification('❌ שגיאה בקריאת קובץ ההגדרות', 'error');
      }
    };
    reader.readAsText(file);
  };
  input.click();
}

// הצגת התראה
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--color-surface);
    color: var(--color-text);
    padding: 15px 25px;
    border-radius: var(--radius-medium);
    box-shadow: 0 4px 20px var(--color-shadow);
    z-index: 100000;
    animation: slideInRight 0.3s ease;
    font-weight: 600;
    border: 1px solid var(--color-border);
  `;
  
  if (type === 'success') {
    notification.style.borderColor = 'var(--color-success)';
    notification.style.background = 'var(--color-success)';
  } else if (type === 'error') {
    notification.style.borderColor = 'var(--color-danger)';
    notification.style.background = 'var(--color-danger)';
  }
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// מעבר בין תצוגת קנבן לרשימה
function switchViewMode(mode) {
  const settings = loadSettings();
  settings.display.viewMode = mode;
  saveSettings(settings);
  
  if (typeof renderTasks === 'function') {
    renderTasks();
  }
  
  document.querySelectorAll('.view-toggle-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.querySelector(`[data-view="${mode}"]`)?.classList.add('active');
}

// אתחול הגדרות בטעינת הדף
document.addEventListener('DOMContentLoaded', () => {
  applySettings();
  
  document.querySelectorAll('input[type="range"]').forEach(slider => {
    slider.addEventListener('input', (e) => {
      const output = document.getElementById(e.target.id + 'Value');
      if (output) output.textContent = e.target.value;
    });
  });
});
