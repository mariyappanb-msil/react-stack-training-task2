import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Orders() {
  const [orderStocks, setOrderStocks] = useState(
    JSON.parse(localStorage.getItem("OrderStocks")) || []
  );
  const navigate = useNavigate(); // Hook for navigation

  // Calculate the total amount for all ordered stocks
  const totalAmount = orderStocks.reduce(
    (total, stock) => total + stock.price * stock.quantity,
    0
  );

  return (
    <div>
      <h2 className="sell-heading">Ordered Stocks</h2>
      {orderStocks.map((stock, index) => (
        <div key={index} className="sell-stock-card">
          <div className="order-stock-card-details">
            <div>
              <h3 className="sell-stock-name">{stock.name}</h3>
              <div className="sell-stock-price">
                Price: ${stock.price.toFixed(2)}
              </div>
              <div className="sell-stock-quantity">
                Quantity: {stock.quantity}
              </div>
              <div className="sell-stock-amount">
                Amount: ${stock.price.toFixed(2) * stock.quantity.toFixed(2)}
              </div>
            </div>
            <div className="sell-buy-button-container">
              {/* You can add more actions/buttons here if needed */}
            </div>
          </div>
          <div className="order-msg" >Ordered Done</div>
        </div>
      ))}
      <div className="total-amount">
        Total Amount: ${totalAmount.toFixed(2)}
      </div>
    </div>
  );
}

export default Orders;
