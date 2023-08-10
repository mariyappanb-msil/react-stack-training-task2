import React from "react";
import { useNavigate, } from "react-router-dom";
import "./Header.css";
import { useAuth } from "../../pages/Auth/Auth";
function Header()
{
  const navigate = useNavigate();
  const auth = useAuth();
  
  const hanldeLogout = () => {
    auth.logout();
    alert("Do you want to Logout");
    navigate('/') // Call the logout function from the authentication context
  };
    return(
       
        <div className="nav">
         
    
        <p onClick={() => navigate("/watchlist")}>Watchlist</p> 
        <p onClick={() => navigate("/orders")}>Orders</p> 
        <p onClick={() => hanldeLogout()}>Logout</p>
        
        
      
      </div>
    )


}
export default Header;