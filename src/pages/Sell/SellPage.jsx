import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import stocksData from "../../common/stocksData.json";
import "./Sell.css"; // Import the CSS file

function Sell() {
  const user = JSON.parse(localStorage.getItem("username"));

  const [storedStocks, setStoredStocks] = useState(
    JSON.parse(localStorage.getItem(`OrderStocks_${user}`)) || []
  );

  const [inputQuantity, setInputQuantity] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSellNow = (index) => {
    setInputQuantity(""); // Reset input quantity when clicking "Sell Now"
    setErrorMessage("");
  };

  const handleConfirmSell = (stock) => {
    if (inputQuantity === "" || isNaN(inputQuantity) || +inputQuantity <= 0) {
      setErrorMessage("Please enter a valid quantity.");
      return;
    }

    const availableQuantity = stock.quantity;
    if (+inputQuantity > availableQuantity) {
      setErrorMessage("Quantity exceeded the available quantity.");
      return;
    }

    const selectedStock = { ...stock, quantity: +inputQuantity };
    const existingOrderStocks = JSON.parse(
      localStorage.getItem(`OrderSellStocks_${user}`) || "[]"
    );
    const updatedOrderStocks = [...existingOrderStocks, selectedStock];

    localStorage.setItem(
      `OrderSellStocks_${user}`,
      JSON.stringify(updatedOrderStocks)
    );

    navigate("/orders");
  };

  const handleQuantityChange = (event) => {
    const newQuantity = event.target.value;
    setInputQuantity(newQuantity);
    setErrorMessage("");
  };

  return (
    <div>
      <Header />

      <h2 className="sell-heading">Stocks for Sell</h2>
      <table className="sell-stock-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Total Quantity</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {storedStocks.map((stock, index) => (
            <tr key={index}>
              <td>{stock.name}</td>
              <td>${stock.price.toFixed(2)}</td>
              <td>{stock.quantity}</td>
              <td><input
                    type="number"
                    placeholder="Enter quantity"
                    value={inputQuantity}
                    onChange={handleQuantityChange}
                  />
                  {errorMessage && <div className="error-message">{errorMessage}</div>}</td>
              <td>
                <>
                  
                  <div
                    className="sell-buynowbtn"
                    onClick={() => handleConfirmSell(stock)}
                  >
                    Confirm Sell
                  </div>
                </>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {inputQuantity !== "" && !isNaN(inputQuantity) && +inputQuantity > 0 && (
        <div className="sell-stock-total-amount">
          Total Amount: $
          {(storedStocks[0].price * +inputQuantity).toFixed(2)}
        </div>
      )}
    </div>
  );
}

export default Sell;
