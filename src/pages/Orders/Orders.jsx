import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./orders.css"; // Import the generated stylesheet
import Header from "../../components/Header/Header";

const Orders = () => {
  const items = useSelector((state) => state.Order);
  const [orders,setOrders] = useState(items);

  const totalAmount = orders.reduce((total, order) => {
    return total + order.quantity * order.price;
  }, 0);
  const handleSell = (e, index) => {
    e.preventDefault();
    
    
  }

  return (
    <div className="orders-container">
      <Header/>
      <h1>Orders</h1>
      <div className="orders-center">
        {orders.map((stock, index) => (
          <div key={index} className="order-card">
          <img src={stock.logo} alt="logo" className="order-card-img" />
          <div className="order-card-details">
            <h3 className="order-card-title">{stock.name}</h3>
            <div className="order-card-info">Price: {stock.price}</div>
            <div className="order-card-info">Quantity: {stock.quantity}</div>
            <div className="order-card-options">
              <button className="order-buy-btn" onClick={handleSell}>Sell</button>
            </div>
            <div className="order-card-info">
              Amount: {stock.price * stock.quantity}
            </div>
          </div>
        </div>
        ))}
      </div>
      <div className="total-amount">Total Amount: {totalAmount}</div>
    </div>
  );
};

export default Orders;
