import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import "./BuyPage.css";
import { useNavigate } from "react-router-dom";

function Buy() {
  const location = useLocation();
  const navigate = useNavigate();
  const { stock } = location.state || {};

  const [quantity, setQuantity] = useState(1); // Default quantity is set to 1
  const totalPrice = stock.price * quantity;

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);

    if (newQuantity >= 1 && newQuantity <= stock.quantity) {
      setQuantity(newQuantity);
    }
  };

  const handleBuyClick = () => {
    if (quantity <= stock.quantity) {
      const existingOrders = JSON.parse(localStorage.getItem("Orders")) || [];
      const existingOrder = existingOrders.find((order) => order.stockName === stock.name);

      if (existingOrder) {
        existingOrder.quantity += quantity;
        existingOrder.amount += totalPrice;
      } else {
        const order = {
          stockName: stock.name,
          price: stock.price,
          quantity,
          amount: totalPrice,
        };
        existingOrders.push(order);
      }

      localStorage.setItem("Orders", JSON.stringify(existingOrders));

      setQuantity(1);
      navigate("/orders");

      // Reset the stock prop to empty object after navigating
      navigate("/orders", { state: { stock: {} } });
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
                  <td>{stock.quantity}</td>
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
