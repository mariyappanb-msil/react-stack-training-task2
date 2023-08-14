import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import "./Orders.css"; // Import the CSS file for styling

function Orders() {
  const user = JSON.parse(localStorage.getItem("username"));

  const [orderStocks, setOrderStocks] = useState(
    JSON.parse(localStorage.getItem(`OrderPageStocks_${user}`)) || []
  );
  const [orderSellStocks, setOrderSellStocks] = useState(
    JSON.parse(localStorage.getItem(`OrderPageSellStocks_${user}`)) || []
  );

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
      <Header />
      <h2 className="sell-heading">Ordered Stocks</h2>
      <table className="stock-table">
        <thead>
          <tr>
            <th>Stock Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orderStocks.map((stock, index) => (
            <tr key={index} className="sell-stock-card">
              <td>{stock.name}</td>
              <td>${stock.price.toFixed(2)}</td>
              <td>{stock.quantity}</td>
              <td>${(stock.price * stock.quantity).toFixed(2)}</td>
              <td>Ordered Done</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="total-amount">
        Total Amount: ${totalAmount.toFixed(2)}
      </div>

      <h2 className="sell-heading">Sold Stocks</h2>
      <table className="stock-table">
        <thead>
          <tr>
            <th>Stock Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orderSellStocks.map((stock, index) => (
            <tr key={index} className="sell-stock-card">
              <td>{stock.name}</td>
              <td>${stock.price.toFixed(2)}</td>
              <td>{stock.quantity}</td>
              <td>${(stock.price * stock.quantity).toFixed(2)}</td>
              <td>Sold</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="total-amount">
        Total Amount: ${totalSellAmount.toFixed(2)}
      </div>
    </div>
  );
}

export default Orders;
