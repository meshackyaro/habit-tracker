import { BrowserRouter as Router, Routes, Route } from "react-router";
import { useAppState } from "./hooks/useAppState";
import WelcomePage from "./components/WelcomePage";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  const { userData } = useAppState();

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={!userData ? <WelcomePage /> : <Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;