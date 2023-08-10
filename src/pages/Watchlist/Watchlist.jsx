import React, { useState } from "react";
import stocksData from "../../common/stocksData.json";
import "./watchlist.css";
import { useNavigate } from "react-router-dom";

import Header from "../../components/Header/Header";



 
function Watchlist() {
  const [stocks, setStocks] = useState(stocksData);
  const navigate = useNavigate(); // Hook for navigation

  const handleBuyClick = (stock) => {
    // Get existing stored stocks from local storage
    const storedStocks = JSON.parse(localStorage.getItem("BuyStocks")) || [];

    // Check if the stock is already in the stored stocks
    const stockExists = storedStocks.some((storedStock) => storedStock.name === stock.name);

    // If the stock does not exist, add it
    if (!stockExists) {
      // Create a new stock object with a quantity of 1
      const sellStock = { ...stock, quantity: 1 };

      // Add the new stock object to the array
      storedStocks.push(sellStock);

      // Store the updated array in local storage
      localStorage.setItem("BuyStocks", JSON.stringify(storedStocks));
    }

    // Navigate to the sell page
    navigate("/buy");

    
  };

  const handleSellClick = (stock) => {
    // Get existing stored stocks from local storage
    const storedStocks = JSON.parse(localStorage.getItem("SellStocks")) || [];

    // Check if the stock is already in the stored stocks
    const stockExists = storedStocks.some((storedStock) => storedStock.name === stock.name);

    // If the stock does not exist, add it
    if (!stockExists) {
      // Create a new stock object with a quantity of 1
      const sellStock = { ...stock, quantity: 1 };

      // Add the new stock object to the array
      storedStocks.push(sellStock);

      // Store the updated array in local storage
      localStorage.setItem("SellStocks", JSON.stringify(storedStocks));
    }

    // Navigate to the sell page
    navigate("/sell");
  }

  return (
    <div>
      <Header />

      <h2 className="heading">Stock Watchlist</h2>
      {stocks.map((stock, index) => (
        <div key={index} className="stock-card">
          <img src={stock.logo} alt="logo" className="stock-card-img" />
          <div className="stock-card-details">
            <h3>{stock.name}</h3>

            <div className="stock-price">Price :  ${stock.price.toFixed(2)}</div>
            <div>Quantity : {stock.quantity}</div>
          </div>

          <div className="stock-card-options">
            {/* Pass the stock data to the handleSellClick function */}
            <button className="buybtn" onClick={() => handleBuyClick(stock)}>
              Buy
            </button>
            {/* Pass the stock data to the handleSellClick function */}
            <button className="sellbtn" onClick={() => handleSellClick(stock)}>
              Sell
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Watchlist;
