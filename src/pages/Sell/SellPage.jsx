import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";

import { useNavigate } from "react-router-dom";

function Buy() {
  const location = useLocation();
  const navigate = useNavigate();
  const { stockName } = location.state || {};
  const { order } = location.state || {};
  console.log(stockName,"stockName")


  const localData = JSON.parse(localStorage.getItem("Users")) || [];
  const loggedInUserIndex = localData.findIndex(
    (user) => user.login_status === "login"
  );
  const orders = localData[loggedInUserIndex].orders;
  const matchedOrder = orders.find(order => order.stockName === stockName);

  // Use the matchedOrder to set initial state
  const [sellOrder, setSellOrder] = useState(matchedOrder || null);
  console.log("object",sellOrder)
  
 

  const [quantity, setQuantity] = useState(1); 
  
  const totalPrice = sellOrder ? sellOrder.price * quantity : 0;
  if (!sellOrder) {
    // Handle case where stock is undefined
    return <div>No stocks to Sell</div>;
  }

  

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);

    if (newQuantity >= 1 && newQuantity <= sellOrder.quantity) {
      setQuantity(newQuantity);
    }
  };

  const handleBuyClick = () => {

  };
  
  
  

  return (
    <>
      <Header />
      <div className="buy-page">
        {sellOrder && (
          <div className="buy-container">
            <table className="stock-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Available Quantity</th>
                  <th>Price</th>
                  <th>Selected Quantity</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{sellOrder.stockName}</td>
                  <td>{sellOrder.quantity}</td>
                  <td>${sellOrder.price.toFixed(2)}</td>
                  <td>
                    <input
                      type="number"
                      value={quantity}
                      onChange={handleQuantityChange}
                      min="1"
                      max={sellOrder.quantity}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            {quantity > sellOrder.quantity && (
              <div className="no-stock">No stock present</div>
            )}
            {quantity >= 1 && quantity <= sellOrder.quantity && (
              <div className="order-summary">
                <div className="total-amount">
                  Total Amount: ${totalPrice.toFixed(2)}
                </div>
                <button className="buy-button" onClick={handleBuyClick}>
                  Sell
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Buy;
