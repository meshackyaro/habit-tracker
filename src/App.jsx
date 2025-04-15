import { BrowserRouter as Router, Routes, Route } from "react-router";
import { useAppState } from "./hooks/useAppState";
import WelcomePage from "./components/WelcomePage";
import Dashboard from "./components/Dashboard/Dashboard";
import Settings from "./components/Settings";
import Statistics from "./components/Statistics";
import { useSettings } from "./context/SettingsContext";


function App() {
  const { userData } = useAppState();
  const {theme} = useSettings

  return (
    <div className="App" data-theme={theme}>
      <Routes>
        {/* <Route path="/" element={!userData ? <WelcomePage /> : <Dashboard />} /> */}
        <Route path="/" element={<WelcomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/statistics" element={<Statistics/>} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
}

export default App;