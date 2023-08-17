import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import "./BuyPage.css";
import { useNavigate } from "react-router-dom";

function Buy() {
  const location = useLocation();
  const navigate = useNavigate();
  const { stock } = location.state || {};

  const stockName = stock.name;
  const stockQuantity = stock.quantity;

  const [quantity, setQuantity] = useState(1);

  const localData = JSON.parse(localStorage.getItem("Users")) || [];
  const loggedInUserIndex = localData.findIndex(
    (user) => user.login_status === "login"
  );
  const orders = localData[loggedInUserIndex].orders;

  const order = orders.find((order) => order.stockName === stockName);
  const remainingQuantities = order &&  stockQuantity - order.quantity;

  const totalPrice = stock.price * quantity;

  if (!stock) {
    alert("No Stock Selected for Buy");
    return <div>No Stock Selected for Buy</div>;
  }

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);

    if (newQuantity >= 1 && newQuantity <= remainingQuantities) {
      setQuantity(newQuantity);
    }
  };

  const handleBuyClick = () => {
    if (quantity <= stock.quantity) {
      const existingUsers = JSON.parse(localStorage.getItem("Users")) || [];

      // Find the logged-in user
      const loggedInUserIndex = existingUsers.findIndex(
        (user) => user.login_status === "login"
      );

      if (loggedInUserIndex !== -1) {
        const loggedInUser = existingUsers[loggedInUserIndex];
        const existingOrderIndex = loggedInUser.orders.findIndex(
          (order) => order.stockName === stock.name
        );

        if (existingOrderIndex !== -1) {
          const existingOrder = loggedInUser.orders[existingOrderIndex];
          existingOrder.quantity += quantity;
          existingOrder.amount += totalPrice;
        } else {
          const newOrder = {
            stockName: stock.name,
            price: stock.price,
            quantity,
            amount: totalPrice,
          };
          loggedInUser.orders.push(newOrder);
        }

        existingUsers[loggedInUserIndex] = loggedInUser;
        localStorage.setItem("Users", JSON.stringify(existingUsers));

        setQuantity(1);
        navigate("/orders");
        navigate("/orders", { state: { stock: {} } }); // Reset the stock prop to empty object after navigating
      }
    }
  };

  return (
    <>
      <Header />
      <div className="buy-page">
        {stock && (
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
                  <td>{stock.name}</td>
                  <td>{remainingQuantities ? remainingQuantities : stock.quantity  }</td>
                  <td>${stock.price.toFixed(2)}</td>
                  <td>
                    <input
                      type="number"
                      value={quantity}
                      onChange={handleQuantityChange}
                      min="1"
                      max={stock.quantity}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            {quantity > stock.quantity && (
              <div className="no-stock">No stock present</div>
            )}
            {quantity >= 1 && quantity <= stock.quantity && (
              <div className="order-summary">
                <div className="total-amount">
                  Total Amount: ${totalPrice.toFixed(2)}
                </div>
                <button className="buy-button" onClick={handleBuyClick}>
                  Buy
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
