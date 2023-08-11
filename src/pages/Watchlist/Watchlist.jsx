
import React, { useState } from "react";
import stocksData from "../../common/stocksData.json";
import "./watchlist.css";
import { useNavigate } from "react-router-dom";

import Header from "../../components/Header/Header";

function Watchlist() {
  const [stocks, setStocks] = useState(stocksData);
  const navigate = useNavigate(); 
  const user = JSON.parse(localStorage.getItem("username"));
  console.log(user)


  const handleBuyClick = (stock) => {
    // Get existing stored stocks from local storage
    const storedStocks = JSON.parse(localStorage.getItem(`BuyStocks_${user}`)) || [];

    // Check if the stock is already in the stored stocks
    const stockExists = storedStocks.some(
      (storedStock) => storedStock.name === stock.name
    );
    console.log(stockExists)
    // If the stock does not exist, add it
    if (!stockExists) {
      // Create a new stock object with a quantity of 1
      const sellStock = { ...stock, quantity: 1 };

      // Add the new stock object to the array
      storedStocks.push(sellStock);

      // Store the updated array in local storage
      localStorage.setItem(`BuyStocks_${user}`, JSON.stringify(storedStocks));
    }

    
    navigate("/buy");
  };

  const handleSellClick = (stock) => {
    // Get existing stored stocks from local storage
    const storedStocks = JSON.parse(localStorage.getItem(`SellStocks_${user}`)) || [];
  
    // Check if the stock is already in the stored stocks
    const stockExists = storedStocks.some(
      (storedStock) => storedStock.name === stock.name
    );
  
    // If the stock does not exist, add it
    if (!stockExists) {
      // Create a new stock object with a quantity of 1
      const sellStock = { ...stock, quantity: 1 };
  
      // Add the new stock object to the array
      storedStocks.push(sellStock);
  
      // Store the updated array in local storage
      localStorage.setItem(`SellStocks_${user}`, JSON.stringify(storedStocks));
    }
  
    
    navigate("/sell");
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
            <div>Quantity : {stock.quantity}</div>
          </div>

          <div className="stock-card-options">
            
            <button className="buybtn" onClick={() => handleBuyClick(stock)}>
              Buy
            </button>
            
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
