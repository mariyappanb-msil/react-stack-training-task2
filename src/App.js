import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Watchlist from "./pages/Watchlist/Watchlist";
import Login from './pages/Auth/Login.jsx'
import Registration from './pages/Auth/Registration.jsx'
import Orders from "./pages/Orders/Orders";
import Buy from "./common/Buy";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/regestration" element={<Registration />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/buy" element={<Buy/>}></Route>

      </Routes>
    </Router>
  );
}

export default App;
