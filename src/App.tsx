import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { AdminRoutes } from "./routes/AdminRoutes";
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Router>
      <AdminRoutes />
    </Router>
    </ThemeProvider>
  );
}

export default App;
