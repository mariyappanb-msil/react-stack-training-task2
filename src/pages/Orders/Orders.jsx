import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import "./Orders.css";
import { useLocation } from "react-router-dom";

function Orders() {
  const location = useLocation();
  const locationState = location.state || {};
  const sellOrder = locationState.sellOrder;
  const quantity = locationState.quantity;

  console.log("sellOrder, quantity", sellOrder, quantity);
  const localData = JSON.parse(localStorage.getItem("Users")) || [];
  const loggedInUserIndex = localData.findIndex(
    (user) => user.login_status === "login"
  );
  const orders = localData[loggedInUserIndex].orders;

  const navigate = useNavigate();

  const handleSellClick = (stockName) => {

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
              {orders &&
                orders.map(
                  (order, index) =>
                    // Conditional rendering to check if order is not null
                    order && (
                      <tr key={index}>
                        <td>{order.stockName}</td>
                        <td>${order.price.toFixed(2)}</td>
                        <td>{order.quantity}</td>
                        {order.amount !== null ? ( // Check if order.amount is not null
                          <td>${order.amount.toFixed(2)}</td>
                        ) : (
                          <td>N/A</td> // Or any other appropriate value
                        )}
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
                    )
                )}
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
