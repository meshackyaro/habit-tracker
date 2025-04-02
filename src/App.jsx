import { useRoutes } from "react-router-dom";
import { ROUTES } from "./routes/Routers";

function App() {
  return useRoutes(ROUTES);
}

export default App;
