import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import stocksData from "../../common/stocksData.json";

function Sell() {
  const user = JSON.parse(localStorage.getItem("username"));

  const [storedStocks, setStoredStocks] = useState(
    JSON.parse(localStorage.getItem(`BuyStocks_${user}`)) || []
  );
  const [stocks, setStocks] = useState(stocksData);
  const [inputQuantity, setInputQuantity] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showQuantityInput, setShowQuantityInput] = useState(false);
  const navigate = useNavigate();

  const handleSellNow = (stock) => {
    setShowQuantityInput(true);
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
      {storedStocks.map((stock, index) => (
        <div key={index} className="sell-stock-card">
          <div className="sell-stock-card-details">
            <div>
              <h3 className="sell-stock-name">{stock.name}</h3>
              <div className="sell-stock-price">
                Price: ${stock.price.toFixed(2)}
              </div>
              <div className="sell-stock-quantity">
                Quantity: {stock.quantity}
              </div>
              <div
                style={{
                  color: "red",
                  fontWeight: "bold",
                  marginTop: "10px",
                }}
              >
                {stock.quantity === stocks[index].quantity ? (
                  <div> Sell Over</div>
                ) : null}
              </div>
            </div>
            <div className="sell-buy-button-container">
              {!showQuantityInput ? (
                <div className="sell-buynowbtn" onClick={() => handleSellNow(stock)}>
                  Sell Now
                </div>
              ) : (
                <>
                  <input
                    type="number"
                    placeholder="Enter quantity"
                    value={inputQuantity}
                    onChange={handleQuantityChange}
                  />
                  {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
                  <div className="sell-buynowbtn" onClick={() => handleConfirmSell(stock)}>
                    Confirm Sell
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Sell;
