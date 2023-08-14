import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import stocksData from "../../common/stocksData.json";
import Header from "../../components/Header/Header";
import "./BuyPage.css";

function Buy() {
  const user = JSON.parse(localStorage.getItem("username"));

  const [storedStocks, setStoredStocks] = useState(
    JSON.parse(localStorage.getItem(`BuyPageStocks_${user}`)) || []
  );
  const [stocks, setStocks] = useState(stocksData);
  const [inputQuantities, setInputQuantities] = useState(
    storedStocks.map((stock) => stock.quantity || 1)
  );

  const [isConfirmingBuy, setIsConfirmingBuy] = useState(false);
  const navigate = useNavigate();

  // function to upadte the quantity for particular item in Local stoarge
  const quantitySet = (index, newInputQuantity) => {
    const updatedStocks = [...storedStocks];
    updatedStocks[index].quantity = newInputQuantity;
    setStoredStocks(updatedStocks);
    console.log(updatedStocks, "updatedStocks");
    localStorage.setItem(
      `BuyPageStocks_${user}`,
      JSON.stringify(updatedStocks)
    );
  };

  const handleBuyNow = (stock, index) => {
    const selectedQuantity = inputQuantities[index];
    const availableQuantity = stocks[index].quantity;
    

    if (selectedQuantity > 0 && selectedQuantity <= availableQuantity ) {
      const selectedStock = { ...stock };
      const existingOrderStocks =
        JSON.parse(localStorage.getItem(`OrderStocks_${user}`)) || [];
      const updatedOrderStocks = [...existingOrderStocks, selectedStock];
      localStorage.setItem(
        `OrderPageStocks_${user}`,
        JSON.stringify(updatedOrderStocks)
      );
      const updatedDupStocks = [selectedStock];
      localStorage.setItem(
        `OrderPageDupStocks_${user}`,
        JSON.stringify(updatedDupStocks)
      );
      const updatedStoredStocks = [...storedStocks];
      updatedStoredStocks.splice(index, 1);
      setStoredStocks(updatedStoredStocks);
      localStorage.setItem(
        `BuyPageStocks_${user}`,
        JSON.stringify(updatedStoredStocks)
      );
      setIsConfirmingBuy(true); 
      
      navigate("/orders");
    } else {
      setIsConfirmingBuy(false); 
    }
  };

  const handleQuantityChange = (event, index) => {
    const newInputQuantity = parseInt(event.target.value);
    console.log(inputQuantities, "inputQuantities");
    console.log(newInputQuantity, "newInputQuantity");
    setInputQuantities((prevQuantities) =>
      prevQuantities.map((quantity, i) => {
        if (i === index) {
          quantitySet(index, newInputQuantity);
          console.log(i, quantity, "i", "q");
          return newInputQuantity;
        }
        return quantity;
      })
    );
  };

  const totalAmount = storedStocks.reduce(
    (total, stock, index) => total + stock.price * inputQuantities[index],
    0
  );

  return (
    <div>
      <Header />
      <h2 className="sell-heading">Stocks for Buy</h2>

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
              <td>{stocks[index].quantity}</td>
              <td>
                <div className="input-quan">
                  <input
                    type="number"
                    id="quantity"
                    value={inputQuantities[index]}
                    onChange={(event) => {
                      handleQuantityChange(event, index);
                    }}
                    min="1"
                  />
                </div>
                {inputQuantities[index] > stocks[index].quantity && (
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
                    {isConfirmingBuy ? "Confirm to Buy" : "Buy Now"}
                  </div>
                </div>
              </td>
              <td>${(stock.price * inputQuantities[index]).toFixed(2)}</td>
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

export default Buy;
