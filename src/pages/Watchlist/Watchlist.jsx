import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import stocksData from "../../common/stocksData.json";
import "./watchlist.css";
import Header from "../../components/Header/Header";

function Watchlist() {
  const [stocks] = useState(stocksData);
  const navigate = useNavigate();
  const localData = JSON.parse(localStorage.getItem("Users")) || [];
  const loggedInUserIndex = localData.findIndex(
    (user) => user.login_status === "login"
  );
  const orders = localData[loggedInUserIndex].orders;

  const remainingQuantities = stocks.map((stock) => {
    const order = orders.find((order) => order.stockName === stock.name);
    const orderedQuantity = order ? order.quantity : 0;
    return stock.quantity - orderedQuantity;
  });
  

  const handleBuyClick = (stock) => {
    navigate("/buy", { state: { stock } }); 
  };

  const handleSellClick = (stockName) => {
    console.log("WWW",stockName)
   
  
    navigate("/sell", {state: {stockName}});
  };

  return (
    <div>
      <Header />

      <h2 className="heading">Stock Watchlist</h2>
      {stocks.map((stock, index) => (
        <div key={index} className="stock-card">
          <div className="stock-card-details">
            <h3>{stock.name}</h3>
            <div className="stock-price">Price : ${stock.price.toFixed(2)}</div>
            
            {remainingQuantities[index] > 0 ? (
              <div> Quantity : {remainingQuantities[index]}</div>
            ) : (
              <div style={{color : "red", fontWeight : "bold"}}>Not enough quantity</div>
            )}
          </div>
          <div className="stock-card-options">
          <button
              className="buybtn"
              onClick={() => handleBuyClick(stock)}
              disabled={remainingQuantities[index] === 0}
            >
              Buy
            </button>
            <button className="sellbtn" onClick={() => handleSellClick(stock.name)}>
              Sell
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Watchlist;
