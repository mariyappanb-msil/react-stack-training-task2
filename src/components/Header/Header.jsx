import React from "react";
import { useNavigate, } from "react-router-dom";
import "./Header.css";

function Header()
{
  const navigate = useNavigate();

  const handleLogout = () =>{
    alert("Are u sure to Logout");
    navigate('/')
  }
    return(
       
        <div className="nav">
         
    
        <p onClick={() => navigate("/watchlist")}>Watchlist</p> 
        <p onClick={() => navigate("/orders")}>Orders</p> 
        <p onClick={() => handleLogout()}>Logout</p>
        
        
      
      </div>
    )


}
export default Header;