import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";


const Orders = () => {
  const items = useSelector((state) => state.Order);
  const [orders, setOrders] = useState(items);
  console.log("III",items)
  return (
    <div>
      {orders.map((stock, index) => (
        <div key={index} className="stock-card">
          <img src={stock.logo} alt="logo" className="stock-card-img" />
          <div className="stock-card-details">
            <h3>{stock.name}</h3>
            <div>Price: {stock.price}</div>
            <div>Quantity: {stock.quantity}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
