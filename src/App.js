import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Watchlist from "./pages/Watchlist/Watchlist";
import Login from './pages/Auth/Login.jsx'
import Registration from './pages/Auth/Registration.jsx'
import BuyPage from './pages/Buy/BuyPage.jsx'
import Orders from "./pages/Orders/Orders";
import SellPage from './pages/Sell/SellPage.jsx'




function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/regestration" element={<Registration />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/buy" element={<BuyPage />} />
        <Route path="/sell" element={<SellPage />} />
        <Route path="/orders" element={<Orders />} />
     
        
        

      </Routes>
    </Router>
  );
}

export default App;
