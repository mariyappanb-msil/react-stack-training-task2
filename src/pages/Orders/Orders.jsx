import React from "react";
import Header from "../../components/Header/Header";
import './Orders.css'

function Orders() {
  const orders = JSON.parse(localStorage.getItem("Orders")) || [];

  return (
    <>
      <Header />
      <div className="orders-page">
        <h2>Orders</h2>
        {orders.length > 0 ? (
          <table className="orders-table">
            <thead>
              <tr>
                <th>Stock Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>{order.stockName}</td>
                  <td>${order.price.toFixed(2)}</td>
                  <td>{order.quantity}</td>
                  <td>${order.amount.toFixed(2)}</td>
                  <td>Bought</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-orders">No orders placed yet.</div>
        )}
      </div>
    </>
  );
}

export default Orders;
