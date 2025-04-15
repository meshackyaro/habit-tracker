import { createContext, useContext, useState, useEffect } from "react";

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("habitTrackerSettings");
    return saved ? JSON.parse(saved).theme || "dark" : "dark";
  });
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem("habitTrackerSettings");
    return saved ? JSON.parse(saved).notifications ?? true : true;
  });
  const [defaultReminderTime, setDefaultReminderTime] = useState(() => {
    const saved = localStorage.getItem("habitTrackerSettings");
    return saved ? JSON.parse(saved).defaultReminderTime || "08:00" : "08:00";
  });
  const [username, setUsername] = useState(() => {
    const saved = localStorage.getItem("habitTrackerSettings");
    return saved ? JSON.parse(saved).username || "User" : "User";
  });

  // Save to localStorage whenever settings change
  useEffect(() => {
    localStorage.setItem(
      "habitTrackerSettings",
      JSON.stringify({ theme, notifications, defaultReminderTime, username })
    );
    // Apply theme to document
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme, notifications, defaultReminderTime, username]);

  return (
    <SettingsContext.Provider
      value={{
        theme,
        setTheme,
        notifications,
        setNotifications,
        defaultReminderTime,
        setDefaultReminderTime,
        username,
        setUsername,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
