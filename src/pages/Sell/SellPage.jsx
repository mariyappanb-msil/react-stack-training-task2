import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import stocksData from "../../common/stocksData.json";


function Buy() {
  const [storedStocks, setStoredStocks] = useState(JSON.parse(localStorage.getItem("SellStocks")) || []);
  const [stocks, setStocks] = useState(stocksData);
  const navigate = useNavigate(); // Hook for navigation

  const handleIncreaseQuantity = (index) => {
    const updatedStocks = [...storedStocks];
    if (updatedStocks[index].quantity < stocks[index].quantity) {
      updatedStocks[index].quantity += 1;
      setStoredStocks(updatedStocks);
      localStorage.setItem("BuyStocks", JSON.stringify(updatedStocks));
    }
  };

  const handleDecreaseQuantity = (index) => {
    const updatedStocks = [...storedStocks];
    if (updatedStocks[index].quantity > 1) {
      updatedStocks[index].quantity -= 1;
      setStoredStocks(updatedStocks);
      localStorage.setItem("BuyStocks", JSON.stringify(updatedStocks));
    }
  };

  const handleSellNow = (stock) => {
    const selectedStock = { ...stock, quantity: stock.quantity }; 
    const existingOrderStocks = JSON.parse(localStorage.getItem("OrderSellStocks")) || [];
    const updatedOrderStocks = [...existingOrderStocks, selectedStock];
    localStorage.setItem("OrderSellStocks", JSON.stringify(updatedOrderStocks));
    navigate("/orders");
  };

  return (
    <div>
            <Header/>

      <h2 className="sell-heading">Stocks for Sell</h2>
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
              <div style={{color : 'red',fontWeight : 'bold',marginTop : '10px'}}>
                {stock.quantity === stocks[index].quantity ? <div > Sell Over</div> : null}
                </div>
            </div>
            <div className="sell-buy-button-container">
              <div className="sell-buynowbtn" onClick={() => handleSellNow(stock)}>Sell Now</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Buy;
