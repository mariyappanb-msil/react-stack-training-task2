import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import stocksData from "../../common/stocksData.json";
import "./Sell.css"; // Import the CSS file

function Sell() {
  const user = JSON.parse(localStorage.getItem("username"));

  const [storedStocks, setStoredStocks] = useState(
<<<<<<< HEAD
    JSON.parse(localStorage.getItem(`OrderStocks_${user}`)) || []
  );
=======
<<<<<<< HEAD
    JSON.parse(localStorage.getItem(`OrderStocks_${user}`)) || []
  );
=======
    JSON.parse(localStorage.getItem(`OrderStocks_${user}`)) || [] );
>>>>>>> a4cca0da2990afa1a0439e8e6828d707df6829a5
>>>>>>> b5f3550648519bff80d0eb206897db9cbc85a109
  const [inputQuantity, setInputQuantity] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedItemIndex, setSelectedItemIndex] = useState(null); // Track the selected item
  const navigate = useNavigate();

  const handleSellNow = (index) => {
    setSelectedItemIndex(index);
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
<<<<<<< HEAD

=======
<<<<<<< HEAD
    
=======
  
    // Remove the stock from BuyStocks local storage
    const existingBuyStocks = JSON.parse(
      localStorage.getItem(`BuyStocks_${user}`) || "[]"
    );
    const updatedBuyStocks = existingBuyStocks.filter((item) => item.name !== stock.name);
    localStorage.setItem(
      `BuyStocks_${user}`,
      JSON.stringify(updatedBuyStocks)
    );
  
>>>>>>> a4cca0da2990afa1a0439e8e6828d707df6829a5
>>>>>>> b5f3550648519bff80d0eb206897db9cbc85a109
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
              <td>
                {selectedItemIndex === index ? (
                  <>
                    <input
                      type="number"
                      placeholder="Enter quantity"
                      value={inputQuantity}
                      onChange={handleQuantityChange}
                    />
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <div
                      className="sell-buynowbtn"
                      onClick={() => handleConfirmSell(stock)}
                    >
                      Confirm Sell
                    </div>
                  </>
                ) : (
                  <div className="sell-buynowbtn" onClick={() => handleSellNow(index)}>
                    Sell Now
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {inputQuantity !== "" && !isNaN(inputQuantity) && +inputQuantity > 0 && (
        <div className="sell-stock-total-amount">
          Total Amount: $
          {(storedStocks[selectedItemIndex].price * +inputQuantity).toFixed(2)}
        </div>
      )}
    </div>
  );
}

export default Sell;
