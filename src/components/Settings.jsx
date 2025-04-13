import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

function Settings() {
  const [theme, setTheme] = useState("dark");
  const [notifications, setNotifications] = useState(true);
  const [defaultReminderTime, setDefaultReminderTime] = useState("08:00");
  const [username, setUsername] = useState("User");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = () => {
    // Simulate saving to localStorage
    localStorage.setItem(
      "habitTrackerSettings",
      JSON.stringify({ theme, notifications, defaultReminderTime, username })
    );
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000); // Hide after 2s
  };

  return (
    <div className="p-5 max-w-2xl mx-auto">
      <h1 className="text-3xl font-semibold text-lime-300 mb-5">Settings</h1>

      {/* Appearance Section */}
      <div className="bg-[rgb(51,51,51)] rounded-2xl p-5 mb-5">
        <h2 className="text-xl text-gray-300 mb-3">Appearance</h2>
        <label className="block text-gray-400 mb-2">Theme</label>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="w-full p-2 bg-gray-900 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-300"
        >
          <option value="dark">Dark</option>
          <option value="light">Light</option>
        </select>
      </div>

      {/* Notifications Section */}
      <div className="bg-[rgb(51,51,51)] rounded-2xl p-5 mb-5">
        <h2 className="text-xl text-gray-300 mb-3">Notifications</h2>
        <label className="flex items-center text-gray-400">
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
            className="mr-2"
          />
          Enable habit reminders
        </label>
      </div>

      {/* Default Habit Settings */}
      <div className="bg-[rgb(51,51,51)] rounded-2xl p-5 mb-5">
        <h2 className="text-xl text-gray-300 mb-3">Habit Defaults</h2>
        <label className="block text-gray-400 mb-2">
          Default Reminder Time
        </label>
        <input
          type="time"
          value={defaultReminderTime}
          onChange={(e) => setDefaultReminderTime(e.target.value)}
          className="w-full p-2 bg-gray-900 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-300"
        />
      </div>

      {/* Account Info */}
      <div className="bg-[rgb(51,51,51)] rounded-2xl p-5 mb-5">
        <h2 className="text-xl text-gray-300 mb-3">Account</h2>
        <label className="block text-gray-400 mb-2">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 bg-gray-900 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-300"
        />
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="w-full p-3 bg-gray-900 text-lime-300 rounded-lg hover:bg-gray-700 transition-all duration-300"
      >
        Save Changes
      </button>

      {/* Success Message */}
      {showSuccess && (
        <div className="fixed bottom-5 right-5 bg-lime-300 text-gray-900 p-3 rounded-lg flex items-center gap-2">
          <FontAwesomeIcon icon={faCheck} />
          Settings saved!
        </div>
      )}
    </div>
  );
}

export default Settings;
