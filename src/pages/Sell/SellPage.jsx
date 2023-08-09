import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './SellPage.css';

function Sell() {
  const [storedStocks, setStoredStocks] = useState(JSON.parse(localStorage.getItem("SellStocks")) || []);
  const navigate = useNavigate(); // Hook for navigation

  const handleIncreaseQuantity = (index) => {
    const updatedStocks = [...storedStocks];
    updatedStocks[index].quantity += 1;
    setStoredStocks(updatedStocks);
    localStorage.setItem("SellStocks", JSON.stringify(updatedStocks));
  };

  const handleDecreaseQuantity = (index) => {
    const updatedStocks = [...storedStocks];
    if (updatedStocks[index].quantity > 1) {
      updatedStocks[index].quantity -= 1;
      setStoredStocks(updatedStocks);
      localStorage.setItem("SellStocks", JSON.stringify(updatedStocks));
    }
  };

  const handleBuyNow = (stock) => {
    const selectedStock = { ...stock, quantity: stock.quantity }; // Set quantity to stock.quantity when adding to OrderStocks
    const existingOrderStocks = JSON.parse(localStorage.getItem("OrderStocks")) || [];
    const updatedOrderStocks = [...existingOrderStocks, selectedStock];
    localStorage.setItem("OrderStocks", JSON.stringify(updatedOrderStocks));
    navigate("/orders");
  };

  return (
    <div>
      <h2 className="sell-heading">Stocks for Sale</h2>
      {storedStocks.map((stock, index) => (
        <div key={index} className="sell-stock-card">
          <div className="sell-stock-card-details">
            <div>
              <h3 className="sell-stock-name">{stock.name}</h3>
              <div className="sell-stock-price">Price: ${stock.price.toFixed(2)}</div>
              <div className="sell-stock-quantity">
                Quantity: 
                <button className="quantity-button" onClick={() => handleIncreaseQuantity(index)}>+</button>
                {stock.quantity}
                <button className="quantity-button" onClick={() => handleDecreaseQuantity(index)}>-</button>
              </div>
            </div>
            <div className="sell-buy-button-container">
              <div className="sell-buynowbtn" onClick={() => handleBuyNow(stock)}>Buy Now</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Sell;
