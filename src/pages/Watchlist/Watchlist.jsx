import React, { useState } from "react";
import stocksData from '../../common/stocksData.json'
import "./watchlist.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addItem } from "../../Redux/Slice";
import Header from "../../components/Header/Header";

function Watchlist() {
  const [stocks, setStocks] = useState(stocksData);
  const items = useSelector((state) => state.Order);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const updateStockQuantity = (stockIndex) => {
    const updatedStocks = [...stocks];
    const stockWatchListData = updatedStocks[stockIndex];
    const inputQuantity = prompt(`Enter quantity to sell for ${stockWatchListData.name}:`);
    
    if (inputQuantity !== null  && inputQuantity > 0) {
      const quantityToSell = parseInt(inputQuantity, 10);
      console.log("quantityToSell",quantityToSell)
      
      if (quantityToSell <= stockWatchListData.quantity) {
        updatedStocks[stockIndex].quantity -= quantityToSell;
        setStocks(updatedStocks);
        dispatch(addItem({ ...stockWatchListData, quantity: quantityToSell }));
        navigate("/orders");
      } else {
        alert("Insufficient quantity to sell.");
      }
    } else {
      alert("Invalid quantity. Please enter a valid number.");
    }
  }

  const checkStock = (stockIndex) => {
    const updatedStocks = [...stocks];
    const stockWatchListData = updatedStocks[stockIndex];
    const stockInOrders = items.find(
      (item) => item.name === stockWatchListData.name
    );
    if (!stockInOrders) {
      alert("Order is not placed. First Buy STOCKS");
    } else {
      navigate("/orders");
    }
  };

  const handleBuy = (e, index) => {
    e.preventDefault();
    updateStockQuantity(index);
  
  };
  const handleSell = (e, index) => {
    e.preventDefault();
    checkStock(index);
  };

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
            <button className="buybtn" onClick={(e) => handleBuy(e, index)}>
              Buy
            </button>
            <button className="sellbtn" onClick={(e) => handleSell(e, index)}>
              Sell
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Watchlist;
