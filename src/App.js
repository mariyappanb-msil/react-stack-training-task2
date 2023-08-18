import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Watchlist from "./pages/Watchlist/Watchlist";
import Login from './pages/Auth/Login.jsx'
import Registration from './pages/Auth/Registration.jsx'
import BuyPage from './pages/Buy/BuyPage.jsx'
import Orders from "./pages/Orders/Orders";
import SellPage from './pages/Sell/SellPage.jsx'
import { AuthProvider } from "./pages/Auth/Auth";
import { RequireAuth } from "./pages/Auth/RequireAuth";

function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/regestration" element={<Registration />} />
        <Route path="/watchlist" element={<RequireAuth><Watchlist /></RequireAuth>} />
        <Route path="/buy" element={<RequireAuth><BuyPage /></RequireAuth>} />
        <Route path="/sell" element={<RequireAuth><SellPage /></RequireAuth>} />
        <Route path="/orders" element={<RequireAuth><Orders /></RequireAuth>} />
      </Routes>
    </Router>
    </AuthProvider>
  );
}
export default App;
