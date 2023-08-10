import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Orders() {
  const [orderStocks, setOrderStocks] = useState(
    JSON.parse(localStorage.getItem("OrderStocks")) || []
  );
  const [orderSellStocks, setOrderSellStocks] = useState(
    JSON.parse(localStorage.getItem("OrderSellStocks")) || []
  )

  // Calculate the total amount for all ordered stocks
  const totalAmount = orderStocks.reduce(
    (total, stock) => total + stock.price * stock.quantity,
    0
  );

  const totalSellAmount = orderSellStocks.reduce(
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

      <h2 className="sell-heading">Sold Stocks</h2>
      {orderSellStocks.map((stock, index) => (
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
          <div className="order-msg" >Sold</div>
        </div>
      ))}
      <div className="total-amount">
        Total Amount: ${totalSellAmount.toFixed(2)}
      </div>
    </div>
  );
}

export default Orders;
