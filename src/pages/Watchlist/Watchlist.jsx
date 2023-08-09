import React, { useState } from "react";
import stocksData from '../../common/stocksData.json'
import "./watchlist.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";


import Header from "../../components/Header/Header";

function Watchlist() {
  const [stocks, setStocks] = useState(stocksData);

 

  return (
    <div>
      <Header />

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
            <button className="buybtn" >
              Buy
            </button>
            <button className="sellbtn">
              Sell
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Watchlist;
