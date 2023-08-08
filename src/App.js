import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Watchlist from "./pages/Watchlist/Watchlist";
import Login from './pages/Auth/Login.jsx'
import Registration from './pages/Auth/Registration.jsx'

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/reg" element={<Registration />} />
        <Route path="/watchlist" element={<Watchlist />} />
      </Routes>
    </Router>
  );
}

export default App;
