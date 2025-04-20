import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faDownload } from "@fortawesome/free-solid-svg-icons";
import { HiArrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router"; // ✅ Ensure using 'react-router-dom'

function Settings() {
  const [theme, setTheme] = useState("dark");
  const [notifications, setNotifications] = useState(true);
  const [defaultReminderTime, setDefaultReminderTime] = useState("08:00");
  const [username, setUsername] = useState("User");
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSave = () => {
    localStorage.setItem(
      "habitTrackerSettings",
      JSON.stringify({ theme, notifications, defaultReminderTime, username })
    );
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const handleExport = () => {
    const data = localStorage.getItem("habitTrackerState");
    if (!data) {
      alert("No habit data found to export!");
      return;
    }
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "habits.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 sm:p-6 max-w-3xl mx-auto min-h-screen text-white">
      {/* Back Button */}
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-lime-300 hover:text-lime-400 transition"
        >
          <HiArrowLeft className="mr-1 text-lg" />
          <span className="text-sm sm:text-base">Back</span>
        </button>
      </div>

      <h1 className="text-2xl sm:text-3xl font-semibold text-lime-300 mb-6 mt-8 sm:text-left">
        Settings
      </h1>

      {/* Reusable section component styling */}
      <div className="space-y-5">
        {/* Appearance */}
        <section className="bg-[rgb(51,51,51)] rounded-xl p-4 sm:p-5">
          <h2 className="text-lg sm:text-xl text-gray-300 mb-3">Appearance</h2>
          <label className="block text-sm sm:text-base text-gray-400 mb-2">
            Theme
          </label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="w-full p-2 text-sm sm:text-base bg-gray-900 text-gray-300 rounded-lg focus:ring-2 focus:ring-lime-300"
          >
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </section>

        {/* Notifications */}
        <section className="bg-[rgb(51,51,51)] rounded-xl p-4 sm:p-5">
          <h2 className="text-lg sm:text-xl text-gray-300 mb-3">
            Notifications
          </h2>
          <label className="flex items-center text-sm sm:text-base text-gray-400">
            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
              className="mr-2 w-4 h-4"
            />
            Enable habit reminders
          </label>
        </section>

        {/* Default Habit Settings */}
        <section className="bg-[rgb(51,51,51)] rounded-xl p-4 sm:p-5">
          <h2 className="text-lg sm:text-xl text-gray-300 mb-3">
            Habit Defaults
          </h2>
          <label className="block text-sm sm:text-base text-gray-400 mb-2">
            Default Reminder Time
          </label>
          <input
            type="time"
            value={defaultReminderTime}
            onChange={(e) => setDefaultReminderTime(e.target.value)}
            className="w-full p-2 text-sm sm:text-base bg-gray-900 text-gray-300 rounded-lg focus:ring-2 focus:ring-lime-300"
          />
        </section>

        {/* Account Info */}
        <section className="bg-[rgb(51,51,51)] rounded-xl p-4 sm:p-5">
          <h2 className="text-lg sm:text-xl text-gray-300 mb-3">Account</h2>
          <label className="block text-sm sm:text-base text-gray-400 mb-2">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 text-sm sm:text-base bg-gray-900 text-gray-300 rounded-lg focus:ring-2 focus:ring-lime-300"
          />
        </section>

        {/* Data Management */}
        <section className="bg-[rgb(51,51,51)] rounded-xl p-4 sm:p-5">
          <h2 className="text-lg sm:text-xl text-gray-300 mb-3">
            Data Management
          </h2>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 p-2 text-sm sm:text-base bg-gray-900 text-gray-300 rounded-lg hover:bg-gray-700 transition"
          >
            <FontAwesomeIcon icon={faDownload} />
            Export Habits
          </button>
        </section>
      </div>

      {/* Save Button */}
      <div className="mt-6">
        <button
          onClick={handleSave}
          className="w-full p-3 text-sm sm:text-base bg-gray-900 text-lime-300 rounded-lg hover:bg-gray-700 transition"
        >
          Save Changes
        </button>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-lime-300 text-gray-900 px-4 py-3 rounded-lg flex items-center gap-2 text-sm sm:text-base shadow-lg">
          <FontAwesomeIcon icon={faCheck} />
          Settings saved!
        </div>
      )}
    </div>
  );
}

export default Settings;
