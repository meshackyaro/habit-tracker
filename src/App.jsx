import { BrowserRouter as Router, Routes, Route } from "react-router";
import { useAppState } from "./hooks/useAppState";
import WelcomePage from "./components/WelcomePage";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  const { userData } = useAppState();

  return (
    <div className="App">
      <Routes>
        {/*<Route path="/" element={!userData ? <WelcomePage /> : <Dashboard />} />*/}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<WelcomePage />} />
      </Routes>
    </div>
  );
}

export default App;