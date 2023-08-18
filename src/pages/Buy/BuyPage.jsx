import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import './BuyPage.css';
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
  const loggedInUser = localData[loggedInUserIndex];

  const order = loggedInUser.orders.find((order) => order.stockName === stockName);
  const orderedQuantity = order ? order.quantity : 0;
  const remainingQuantities = stockQuantity - orderedQuantity;

  const totalPrice = stock.price * quantity;

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);

    if (newQuantity >= 1 && newQuantity <= remainingQuantities) {
      setQuantity(newQuantity);
    } else if (newQuantity > remainingQuantities) {
      setQuantity(remainingQuantities); // Set to maximum available quantity
    }
  };

  const handleBuyClick = () => {
    if (quantity <= remainingQuantities) {
      const existingUsers = JSON.parse(localStorage.getItem("Users")) || [];

      // Find the logged-in user
      const existingUser = existingUsers.find(user => user.login_status === "login");

      if (existingUser) {
        const existingOrderIndex = existingUser.orders.findIndex(
          (order) => order.stockName === stock.name
        );

        if (existingOrderIndex !== -1) {
          const existingOrder = existingUser.orders[existingOrderIndex];
          existingOrder.quantity += quantity;
          existingOrder.amount += totalPrice;
        } else {
          const newOrder = {
            stockName: stock.name,
            price: stock.price,
            quantity,
            amount: totalPrice,
          };
          existingUser.orders.push(newOrder);
        }

        localStorage.setItem("Users", JSON.stringify(existingUsers));

        // Update the inventory quantity
        const inventoryData = JSON.parse(localStorage.getItem("inventory")) || [];
        const stockIndex = inventoryData.findIndex(item => item.name === stock.name);
        
        if (stockIndex !== -1) {
          inventoryData[stockIndex].quantity -= quantity;
          localStorage.setItem("inventory", JSON.stringify(inventoryData));
        }

        setQuantity(1);
        navigate("/orders");
        navigate("/orders", { state: { stock: {} } }); // Reset the stock prop to an empty object after navigating
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
                  <td>{remainingQuantities}</td>
                  <td>${stock.price.toFixed(2)}</td>
                  <td>
                    <input
                      type="number"
                      value={quantity}
                      onChange={handleQuantityChange}
                      min="1"
                      max={remainingQuantities}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            {quantity > remainingQuantities && (
              <div className="no-stock">No stock present</div>
            )}
            {quantity >= 1 && quantity <= remainingQuantities && (
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
