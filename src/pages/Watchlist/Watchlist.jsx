import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import stocksData from "../../common/stocksData.json";
import "./watchlist.css";
import Header from "../../components/Header/Header";

function Watchlist() {
  const [stocks] = useState(stocksData);
  const navigate = useNavigate();

  const handleBuyClick = (stock) => {
    navigate("/buy", { state: { stock } }); // Pass stock details as state
  };

  const handleSellClick = () => {
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
            <button className="sellbtn" onClick={handleSellClick}>
              Sell
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Watchlist;
