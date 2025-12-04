// LocalStorage utilities
export const storage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return defaultValue;
    }
  },
  
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  },
  
  clear: () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }
};

// Export all data
export const exportData = () => {
  const data = {
    startups: storage.get('startups', []),
    smcSchedules: storage.get('smcSchedules', []),
    oneOnOneSessions: storage.get('oneOnOneSessions', []),
    darkMode: storage.get('darkMode', false),
    exportDate: new Date().toISOString()
  };
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `magic-data-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

// Import data
export const importData = (file, callback) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      if (data.startups) storage.set('startups', data.startups);
      if (data.smcSchedules) storage.set('smcSchedules', data.smcSchedules);
      if (data.oneOnOneSessions) storage.set('oneOnOneSessions', data.oneOnOneSessions);
      if (typeof data.darkMode !== 'undefined') storage.set('darkMode', data.darkMode);
      callback(true);
    } catch (error) {
      console.error('Error importing data:', error);
      callback(false);
    }
  };
  reader.readAsText(file);
};

// Generate unique ID
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
