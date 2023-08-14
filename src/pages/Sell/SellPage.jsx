import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import stocksData from "../../common/stocksData.json";
import Header from "../../components/Header/Header";
import "./Sell.css";

function Sell() {
  const user = JSON.parse(localStorage.getItem("username"));
  const [sellQuantity, setSellQuantity] = useState(
    JSON.parse(localStorage.getItem(`OrderStocks_${user}`)) || []
  );
  const [storedStocks, setStoredStocks] = useState(
    JSON.parse(localStorage.getItem(`OrderDupStocks_${user}`)) || []
  );
  const [inputQuantity, setInputQuantity] = useState(1);
  const [isConfirmingBuy, setIsConfirmingBuy] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem(`InputQuantity_${user}`, inputQuantity);
  }, [inputQuantity, user]);

  const handleInputBlur = (index) => {
    if (inputQuantity !== storedStocks[index].quantity) {
      quantitySet(index);
    }
  };

  const quantitySet = (index) => {
    const updatedStocks = [...storedStocks];
    updatedStocks[index].quantity = inputQuantity;
    setStoredStocks(updatedStocks);
    localStorage.setItem(`OrderStocks_${user}`, JSON.stringify(updatedStocks));
  };

  const handleBuyNow = (stock, index) => {
    const selectedQuantity = inputQuantity;
    const availableQuantity = sellQuantity[index].quantity;

    if (selectedQuantity > 0 && selectedQuantity <= availableQuantity) {
      const selectedStock = { ...stock, quantity: selectedQuantity };
      const existingOrderStocks =
        JSON.parse(localStorage.getItem(`OrderSellStocks_${user}`)) || [];
      const updatedOrderStocks = [...existingOrderStocks, selectedStock];
      localStorage.setItem(
        `OrderSellStocks_${user}`,
        JSON.stringify(updatedOrderStocks)
      );

      const updatedStoredStocks = [...storedStocks];
      updatedStoredStocks.splice(index, 1);
      setStoredStocks(updatedStoredStocks);
      localStorage.setItem(
        `OrderDupStocks_${user}`,
        JSON.stringify(updatedStoredStocks)
      );

      setIsConfirmingBuy(false);
      setInputQuantity(1);

      navigate("/orders");
    } else {
      setIsConfirmingBuy(true);
    }
  };

  const handleQuantityChange = (event) => {
    const newInputQuantity = parseInt(event.target.value);
    setInputQuantity(newInputQuantity);
  };

  const totalAmount = storedStocks.reduce(
    (total, stock) => total + stock.price * stock.quantity,
    0
  );

  return (
    <div>
      <Header />
      <h2 className="sell-heading">Stocks for Sell</h2>

      <table className="stock-table">
        <thead>
          <tr>
            <th>Stock Name</th>
            <th>Price</th>
            <th>Total Quantity</th>
            <th>Quantity</th>
            <th>Action</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {storedStocks.map((stock, index) => (
            <tr key={index} className="sell-stock-card">
              <td>{stock.name}</td>
              <td>${stock.price.toFixed(2)}</td>
              <td>{sellQuantity[index].quantity}</td>
              <td>
                <div className="input-quan">
                  <input
                    type="number"
                    id="quantity"
                    value={inputQuantity}
                    onChange={handleQuantityChange}
                    onBlur={() => handleInputBlur(index)}
                    min="1"
                    max={sellQuantity[index].quantity}
                  />
                </div>
                {inputQuantity > sellQuantity[index].quantity && (
                  <div
                    style={{
                      color: "red",
                      fontWeight: "bold",
                      marginTop: "10px",
                    }}
                  >
                    Not enough quantity
                  </div>
                )}
              </td>
              <td>
                <div className="sell-buy-button-container">
                  <div
                    className="sell-buynowbtn"
                    onClick={() => handleBuyNow(stock, index)}
                  >
                    {isConfirmingBuy ? "Confirm to Sell" : "Sell Now"}
                  </div>
                </div>
              </td>
              <td>${(stock.price * stock.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="total-amount">
        Total Amount: ${totalAmount.toFixed(2)}
      </div>
    </div>
  );
}

export default Sell;
