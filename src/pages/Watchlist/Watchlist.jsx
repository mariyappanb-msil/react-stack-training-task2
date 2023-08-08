import React, { useState, useEffect } from "react";
import stocksData from "../../common/stocksData";
import "./watchlist.css";
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";
import { addItem } from "../../Redux/Slice";

function Watchlist() {
  const [stocks, setStocks] = useState(stocksData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Function to update stock quantity
  const updateStockQuantity = (stockIndex) => {
    const updatedStocks = [...stocks];
    console.log(updatedStocks)
    updatedStocks[stockIndex].quantity -= 1;
    setStocks(updatedStocks);
    navigate('/orders')
  };

  const handleBuy = (e, index) => {
    e.preventDefault();
    updateStockQuantity(index);
    dispatch(addItem(stocks[index]));
    
  }

  return (
    <div>
      <h2 className="heading">Stock Watchlist</h2>
      {stocks.map((stock, index) => (
        <div key={index} className="stock-card">
          <img src={stock.logo} alt="logo" className="stock-card-img" />
          <div className="stock-card-details">
            <h3>{stock.name}</h3>
            
            <div>Price : {stock.price}</div>
            <div>Quantity : {stock.quantity}</div>
          </div>

          <div className="stock-card-options">
            <button className="buybtn" onClick={(e) => handleBuy(e, index)}>Buy</button>
            <button className="sellbtn">Sell</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Watchlist;
