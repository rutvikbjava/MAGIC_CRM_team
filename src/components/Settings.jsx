import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Download, Upload, Trash2, Bell, Check, X } from 'lucide-react';
import { storage, exportData, importData } from '../utils/storage';
import GuestManagement from './GuestManagement';

export default function Settings({ darkMode, toggleDarkMode, isGuest = false }) {
  const [accessRequests, setAccessRequests] = useState([]);

  useEffect(() => {
    if (!isGuest) {
      const requests = storage.get('accessRequests', []);
      setAccessRequests(requests.filter(r => r.status === 'pending'));
    }
  }, [isGuest]);

  const handleApproveRequest = (requestId) => {
    const requests = storage.get('accessRequests', []);
    const updatedRequests = requests.map(r => 
      r.id === requestId ? { ...r, status: 'approved' } : r
    );
    storage.set('accessRequests', updatedRequests);
    setAccessRequests(updatedRequests.filter(r => r.status === 'pending'));
    alert('Request approved! Guest user has been notified.');
  };

  const handleDenyRequest = (requestId) => {
    const requests = storage.get('accessRequests', []);
    const updatedRequests = requests.map(r => 
      r.id === requestId ? { ...r, status: 'denied' } : r
    );
    storage.set('accessRequests', updatedRequests);
    setAccessRequests(updatedRequests.filter(r => r.status === 'pending'));
  };

  const handleExport = () => {
    exportData();
    alert('Data exported successfully!');
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (file) {
      importData(file, (success) => {
        if (success) {
          alert('Data imported successfully! Please refresh the page.');
          window.location.reload();
        } else {
          alert('Failed to import data. Please check the file format.');
        }
      });
    }
  };

  const handleClearData = () => {
    if (confirm('Are you sure you want to clear all data? This action cannot be undone!')) {
      if (confirm('This will delete ALL startups, schedules, and sessions. Are you absolutely sure?')) {
        storage.set('startups', []);
        storage.set('smcSchedules', []);
        storage.set('oneOnOneSessions', []);
        alert('All data cleared successfully!');
        window.location.reload();
      }
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Manage your preferences and data
        </p>
      </div>

      <div className="space-y-6">
        {/* Access Requests - Admin Only */}
        {!isGuest && accessRequests.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-2 border-orange-200 dark:border-orange-700 rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-4">
              <Bell className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                Access Requests ({accessRequests.length})
              </h2>
            </div>
            <div className="space-y-3">
              {accessRequests.map((request) => (
                <div key={request.id} className="bg-white dark:bg-gray-800 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {request.username}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Requesting access to: <span className="font-medium">{request.actionType}</span>
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      {new Date(request.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleApproveRequest(request.id)}
                      className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                      title="Approve"
                    >
                      <Check className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDenyRequest(request.id)}
                      className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      title="Deny"
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Guest Management - Admin Only */}
        {!isGuest && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
          >
            <GuestManagement />
          </motion.div>
        )}

        {/* Dark Mode */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
        >
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            Appearance
          </h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {darkMode ? <Moon className="w-6 h-6 text-gray-700 dark:text-gray-300" /> : <Sun className="w-6 h-6 text-gray-700" />}
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {darkMode ? 'Dark Mode' : 'Light Mode'}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Toggle between light and dark themes
                </p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleDarkMode}
              className={`px-6 py-3 rounded-xl font-semibold shadow-md transition-all ${
                darkMode
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                  : 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white'
              }`}
            >
              Toggle
            </motion.button>
          </div>
        </motion.div>

        {/* Data Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
        >
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            Data Management
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <div className="flex items-center space-x-3">
                <Download className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    Export Data
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Download all data as JSON
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleExport}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all"
              >
                Export
              </motion.button>
            </div>

            <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
              <div className="flex items-center space-x-3">
                <Upload className="w-6 h-6 text-green-600 dark:text-green-400" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    Import Data
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Upload JSON file to restore data
                  </p>
                </div>
              </div>
              <label className="cursor-pointer">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all"
                >
                  Import
                </motion.div>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="hidden"
                />
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
              <div className="flex items-center space-x-3">
                <Trash2 className="w-6 h-6 text-red-600 dark:text-red-400" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    Clear All Data
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Delete all startups and schedules
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClearData}
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all"
              >
                Clear
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* System Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
        >
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            System Information
          </h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Version:</span>
              <span className="text-gray-900 dark:text-white font-medium">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Organization:</span>
              <span className="text-gray-900 dark:text-white font-medium">CMIA Marathwada Industries</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Location:</span>
              <span className="text-gray-900 dark:text-white font-medium">Aurangabad</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Storage:</span>
              <span className="text-gray-900 dark:text-white font-medium">LocalStorage</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
