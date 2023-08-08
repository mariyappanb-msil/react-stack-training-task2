import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Watchlist from "./pages/Watchlist/Watchlist";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Watchlist />} />
      </Routes>
    </Router>
  );
}

export default App;
