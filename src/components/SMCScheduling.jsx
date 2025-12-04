import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Plus, Check, X } from 'lucide-react';
import { storage } from '../utils/storage';
import GuestRestrictedButton from './GuestRestrictedButton';

export default function SMCScheduling({ isGuest = false }) {
  const [startups, setStartups] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [showCompletionForm, setShowCompletionForm] = useState(null);
  const [showHistoryModal, setShowHistoryModal] = useState(null);
  const [completionData, setCompletionData] = useState({
    panelistName: '',
    time: '',
    feedback: ''
  });

  const timeSlots = ['10 AM', '11 AM', '2 PM', '3 PM'];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const startupsData = storage.get('startups', []).filter(
      s => s.status === 'Active' && ['S0', 'S1', 'S2'].includes(s.stage)
    );
    setStartups(startupsData);
    setSchedules(storage.get('smcSchedules', []));
  };

  const getSaturdays = (month, year) => {
    const saturdays = [];
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day, 12, 0, 0); // Set to noon to avoid timezone issues
      if (date.getDay() === 6) { // Saturday (0 = Sunday, 6 = Saturday)
        // Format date as YYYY-MM-DD
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        saturdays.push(dateStr);
      }
    }
    return saturdays;
  };

  const getYearOptions = () => {
    const years = [];
    for (let year = currentYear; year <= 2060; year++) {
      years.push(year);
    }
    return years;
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleSchedule = () => {
    if (!selectedDate || !selectedSlot || !selectedStartup) {
      alert('Please select date, time slot, and startup');
      return;
    }

    const newSchedule = {
      id: Date.now().toString(),
      startupId: selectedStartup,
      date: selectedDate,
      timeSlot: selectedSlot,
      status: 'Scheduled',
      createdAt: new Date().toISOString()
    };

    const updated = [...schedules, newSchedule];
    storage.set('smcSchedules', updated);
    setSchedules(updated);
    setSelectedStartup(null);
    alert('SMC scheduled successfully!');
  };

  const handleComplete = (schedule) => {
    setShowCompletionForm(schedule);
    setCompletionData({ panelistName: '', time: '', feedback: '' });
  };

  const submitCompletion = () => {
    if (!completionData.panelistName || !completionData.time || !completionData.feedback) {
      alert('Please fill all fields');
      return;
    }

    const schedule = showCompletionForm;
    const startup = startups.find(s => s.id === schedule.startupId);
    
    if (!startup) return;

    // Update startup stage
    let newStage = startup.stage;
    if (startup.stage === 'S0') newStage = 'S1';
    else if (startup.stage === 'S1') newStage = 'S2';
    else if (startup.stage === 'S2') newStage = 'S3';

    // Add pitch history
    const pitchHistory = startup.pitchHistory || [];
    pitchHistory.push({
      stage: newStage,
      date: schedule.date,
      time: completionData.time,
      panelistName: completionData.panelistName,
      feedback: completionData.feedback
    });

    // Update startup
    const allStartups = storage.get('startups', []);
    const updatedStartups = allStartups.map(s => 
      s.id === startup.id 
        ? { ...s, stage: newStage, pitchHistory }
        : s
    );
    storage.set('startups', updatedStartups);

    // Mark schedule as completed
    const updatedSchedules = schedules.map(s =>
      s.id === schedule.id
        ? { ...s, status: 'Completed', completionData }
        : s
    );
    storage.set('smcSchedules', updatedSchedules);

    setSchedules(updatedSchedules);
    setShowCompletionForm(null);
    loadData();
    alert('SMC marked as completed!');
  };

  const getScheduleForSlot = (date, slot) => {
    return schedules.find(s => s.date === date && s.timeSlot === slot && s.status === 'Scheduled');
  };

  const getCompletedScheduleForSlot = (date, slot) => {
    return schedules.find(s => s.date === date && s.timeSlot === slot && s.status === 'Completed');
  };

  const handleViewHistory = (schedule) => {
    const allStartups = storage.get('startups', []);
    const startup = allStartups.find(s => s.id === schedule.startupId);
    setShowHistoryModal({ schedule, startup });
  };

  const saturdays = getSaturdays(selectedMonth, selectedYear);

  return (
    <div>
      <div className="mb-6 sm:mb-8 max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold magic-text-gradient">
          SMC Scheduling
        </h1>
        <p className="text-gray-900 dark:text-gray-100 mt-2 text-sm sm:text-base">
          Saturday Mentorship Clinic - Schedule and manage pitch sessions
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 max-w-7xl mx-auto">
        {/* Scheduling Panel */}
        <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-lg">
          <h2 className="text-lg sm:text-xl text-gray-900 dark:text-gray-100 mb-4">
            Schedule New SMC
          </h2>

          <div className="space-y-3 sm:space-y-4">
            {/* Month and Year Filters */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs sm:text-sm text-gray-900 dark:text-gray-100 mb-2">
                  Month
                </label>
                <select
                  value={selectedMonth}
                  onChange={(e) => {
                    setSelectedMonth(parseInt(e.target.value));
                    setSelectedDate(null); // Reset selected date when month changes
                  }}
                  className="w-full px-3 sm:px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-magic-500 focus:border-magic-500 outline-none transition-all text-sm sm:text-base"
                >
                  {monthNames.map((month, index) => (
                    <option key={index} value={index}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs sm:text-sm text-gray-900 dark:text-gray-100 mb-2">
                  Year
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => {
                    setSelectedYear(parseInt(e.target.value));
                    setSelectedDate(null); // Reset selected date when year changes
                  }}
                  className="w-full px-3 sm:px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-magic-500 focus:border-magic-500 outline-none transition-all text-sm sm:text-base"
                >
                  {getYearOptions().map(year => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs sm:text-sm text-gray-900 dark:text-gray-100 mb-2">
                Select Saturday
              </label>
              <select
                value={selectedDate || ''}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-magic-500 focus:border-magic-500 outline-none transition-all text-sm sm:text-base"
              >
                <option value="">Choose Saturday...</option>
                {saturdays.length > 0 ? (
                  saturdays.map(date => (
                    <option key={date} value={date}>
                      {new Date(date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        day: 'numeric',
                        month: 'long'
                      })}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>No Saturdays in {monthNames[selectedMonth]} {selectedYear}</option>
                )}
              </select>
            </div>

            <div>
              <label className="block text-xs sm:text-sm text-gray-900 dark:text-gray-100 mb-2">
                Select Time Slot
              </label>
              <div className="grid grid-cols-2 gap-2">
                {timeSlots.map(slot => (
                  <motion.button
                    key={slot}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedSlot(slot)}
                    className={`px-3 sm:px-4 py-2 rounded-xl transition-all text-sm sm:text-base ${
                      selectedSlot === slot
                        ? 'magic-gradient text-white shadow-magic'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {slot}
                  </motion.button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs sm:text-sm text-gray-900 dark:text-gray-100 mb-2">
                Select Startup
              </label>
              <select
                value={selectedStartup || ''}
                onChange={(e) => setSelectedStartup(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-magic-500 focus:border-magic-500 outline-none transition-all text-sm sm:text-base"
              >
                <option value="">Choose startup...</option>
                {startups.map(startup => (
                  <option key={startup.id} value={startup.id}>
                    {startup.companyName} ({startup.stage})
                  </option>
                ))}
              </select>
            </div>

            <GuestRestrictedButton
              isGuest={isGuest}
              onClick={handleSchedule}
              actionType="schedule"
              className="w-full flex items-center justify-center space-x-2 magic-gradient text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl shadow-magic hover:shadow-magic-lg transition-all text-sm sm:text-base"
            >
              <Plus className="w-5 h-5" />
              <span>Schedule SMC</span>
            </GuestRestrictedButton>
          </div>
        </div>

        {/* Calendar View */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl text-gray-900 dark:text-gray-100">
              {monthNames[selectedMonth]} {selectedYear} - Saturdays
            </h2>
            <span className="text-sm text-gray-900 dark:text-gray-100">
              {saturdays.length} Saturday{saturdays.length !== 1 ? 's' : ''}
            </span>
          </div>

          {saturdays.length > 0 ? (
            <div className="space-y-6">
              {saturdays.map(date => (
              <div key={date} className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span className="font-semibold">
                      {new Date(date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
                  {timeSlots.map(slot => {
                    const schedule = getScheduleForSlot(date, slot);
                    const completedSchedule = getCompletedScheduleForSlot(date, slot);
                    const startup = schedule ? startups.find(s => s.id === schedule.startupId) : null;

                    return (
                      <div
                        key={slot}
                        className={`p-4 rounded-lg border-2 ${
                          schedule
                            ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                            : completedSchedule
                            ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                            : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700'
                        }`}
                      >
                        <div className="flex items-center space-x-2 mb-2">
                          <Clock className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                          <span className="font-semibold text-sm text-gray-700 dark:text-gray-300">
                            {slot}
                          </span>
                        </div>
                        {schedule && startup ? (
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white mb-2 truncate">
                              {startup.companyName}
                            </p>
                            <GuestRestrictedButton
                              isGuest={isGuest}
                              onClick={() => handleComplete(schedule)}
                              actionType="feedback"
                              className="w-full flex items-center justify-center space-x-1 bg-green-500 text-white px-3 py-1 rounded text-xs font-semibold"
                            >
                              <Check className="w-3 h-3" />
                              <span>Mark Done</span>
                            </GuestRestrictedButton>
                          </div>
                        ) : completedSchedule ? (
                          <div>
                            <p className="text-xs font-medium text-green-700 dark:text-green-300 mb-1">
                              ✓ Completed
                            </p>
                            {(() => {
                              const allStartups = storage.get('startups', []);
                              const completedStartup = allStartups.find(s => s.id === completedSchedule.startupId);
                              return completedStartup ? (
                                <p className="text-xs text-gray-700 dark:text-gray-300 mb-2 truncate font-medium">
                                  {completedStartup.companyName}
                                </p>
                              ) : null;
                            })()}
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleViewHistory(completedSchedule)}
                              className="w-full flex items-center justify-center space-x-1 bg-blue-500 text-white px-3 py-1 rounded text-xs font-semibold"
                            >
                              <span>More Info</span>
                            </motion.button>
                          </div>
                        ) : (
                          <p className="text-xs text-gray-500 dark:text-gray-400">Available</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <Calendar className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No Saturdays in {monthNames[selectedMonth]} {selectedYear}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* History Modal */}
      <AnimatePresence>
        {showHistoryModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowHistoryModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl p-6 max-h-[80vh] overflow-y-auto scrollbar-thin"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold magic-text-gradient">
                  SMC Session History
                </h3>
                <button
                  onClick={() => setShowHistoryModal(null)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                </button>
              </div>

              {showHistoryModal.startup ? (
                <div className="space-y-6">
                  {/* Startup Info */}
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-lg">
                      Startup Information
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Company:</span>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {showHistoryModal.startup.companyName}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Magic Code:</span>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {showHistoryModal.startup.magicCode}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Founder:</span>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {showHistoryModal.startup.founderName}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Current Stage:</span>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {showHistoryModal.startup.stage}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">City:</span>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {showHistoryModal.startup.city}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Sector:</span>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {showHistoryModal.startup.sector}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* SMC Session Details */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-lg">
                      SMC Session Details
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Date:</span>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {new Date(showHistoryModal.schedule.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Time Slot:</span>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {showHistoryModal.schedule.timeSlot}
                        </p>
                      </div>
                      {showHistoryModal.schedule.completionData && (
                        <>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Actual Time:</span>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {showHistoryModal.schedule.completionData.time}
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Panelist:</span>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {showHistoryModal.schedule.completionData.panelistName}
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Feedback:</span>
                            <p className="font-medium text-gray-900 dark:text-white mt-1 whitespace-pre-wrap">
                              {showHistoryModal.schedule.completionData.feedback}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Pitch History */}
                  {showHistoryModal.startup.pitchHistory && showHistoryModal.startup.pitchHistory.length > 0 && (
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-lg">
                        All Pitch History
                      </h4>
                      <div className="space-y-3">
                        {showHistoryModal.startup.pitchHistory.map((pitch, index) => (
                          <div key={index} className="bg-white dark:bg-gray-700 rounded-lg p-3 text-sm">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-gray-900 dark:text-white">
                                Pitch {index + 1} - {pitch.stage}
                              </span>
                              <span className="text-xs text-gray-600 dark:text-gray-400">
                                {new Date(pitch.date).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="space-y-1">
                              <p className="text-gray-600 dark:text-gray-400">
                                <span className="font-medium">Panelist:</span> {pitch.panelistName}
                              </p>
                              <p className="text-gray-600 dark:text-gray-400">
                                <span className="font-medium">Time:</span> {pitch.time}
                              </p>
                              <p className="text-gray-600 dark:text-gray-400">
                                <span className="font-medium">Feedback:</span> {pitch.feedback}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                  Startup information not found
                </p>
              )}

              <div className="mt-6 flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setShowHistoryModal(null)}
                  className="px-6 py-2.5 magic-gradient text-white rounded-xl font-semibold shadow-magic hover:shadow-magic-lg transition-all"
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Completion Form Modal */}
        {showCompletionForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowCompletionForm(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md p-6"
            >
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                Complete SMC Session
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Panelist Name
                  </label>
                  <input
                    type="text"
                    value={completionData.panelistName}
                    onChange={(e) => setCompletionData({ ...completionData, panelistName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
                    placeholder="Enter panelist name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Time
                  </label>
                  <input
                    type="time"
                    value={completionData.time}
                    onChange={(e) => setCompletionData({ ...completionData, time: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Feedback
                  </label>
                  <textarea
                    value={completionData.feedback}
                    onChange={(e) => setCompletionData({ ...completionData, feedback: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
                    placeholder="Enter feedback..."
                  />
                </div>

                <div className="flex space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowCompletionForm(null)}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={submitCompletion}
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    Complete
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
