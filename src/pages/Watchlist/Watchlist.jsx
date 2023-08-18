import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./watchlist.css";
import Header from "../../components/Header/Header";
import StocksData from "../../common/stocksData";

function Watchlist() {
  const navigate = useNavigate();
  const localData = JSON.parse(localStorage.getItem("Users")) || [];
  const loggedInUserIndex = localData.findIndex(
    (user) => user.login_status === "login"
  );
  const orders = localData[loggedInUserIndex].orders;

  const [stocks, setStocks] = useState([]);
  const [remainingQuantities, setRemainingQuantities] = useState([]);

  useEffect(() => {
    // Load stocks data from local storage
    const storedStocks = JSON.parse(localStorage.getItem("inventory")) || [];
    setStocks(storedStocks);

    // Calculate remaining quantities based on stocks and inventory
    const updatedRemainingQuantities = storedStocks.map((stock) => {
      const order = orders.find((order) => order.stockName === stock.name);
      const orderedQuantity = order ? order.quantity : 0;
      const availableQuantity = stock.quantity - orderedQuantity;
      return availableQuantity >= 0 ? availableQuantity : 0;
    });
    setRemainingQuantities(updatedRemainingQuantities);
  }, []); // Empty dependency array

  const handleBuyClick = (stock) => {
    navigate("/buy", { state: { stock } });
  };

  const handleSellClick = (stockName) => {
    navigate("/sell", { state: { stockName } });
  };

  return (
    <div>
      <Header />
      <StocksData />

      <h2 className="heading">Stock Watchlist</h2>
      {stocks.map((stock, index) => (
        <div key={index} className="stock-card">
          <div className="stock-card-details">
            <h3>{stock.name}</h3>
            <div className="stock-price">Price : ${stock.price.toFixed(2)}</div>
            <div> Quantity : {stock.quantity}</div>
          </div>
          <div className="stock-card-options">
            <button
              className="buybtn"
              onClick={() => handleBuyClick(stock)}
              disabled={stock.quantity === 0}  
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
