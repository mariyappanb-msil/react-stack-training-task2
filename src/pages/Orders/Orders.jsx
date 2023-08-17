import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import "./Orders.css";

function Orders() {
  const localData = JSON.parse(localStorage.getItem("Users")) || [];
  const loggedInUserIndex = localData.findIndex(
    (user) => user.login_status === "login"
  );
  const orders = localData[loggedInUserIndex].orders;

  const navigate = useNavigate();

  const handleSellClick = (stockName) => {
    // You can navigate to the "/sell" page with the stock name as a parameter
    navigate("/sell", { state: { stockName } });
  };

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
                <th>Action</th>
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
                  <td>
                    <button
                      className="buy-button"
                      onClick={() => handleSellClick(order.stockName)}
                    >
                      Sell now
                    </button>
                  </td>
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
