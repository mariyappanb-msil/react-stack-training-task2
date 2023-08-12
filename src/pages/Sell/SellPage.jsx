import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import stocksData from "../../common/stocksData.json";
import Header from "../../components/Header/Header";
import './Sell.css';

function Buy() {
  const user = JSON.parse(localStorage.getItem("username"));
  const [sellQuantity, setsellQuantity] = useState(JSON.parse(localStorage.getItem(`OrderStocks_${user}`)) || []);
  const [storedStocks, setStoredStocks] = useState(JSON.parse(localStorage.getItem(`OrderStocks_${user}`)) || []);
  const [stocks, setStocks] = useState(stocksData);
  const [inputQuantity, setInputQuantity] = useState(1);
  const [selectedStockIndex, setSelectedStockIndex] = useState(null);
  const [isConfirmingBuy, setIsConfirmingBuy] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem(`InputQuantity_${user}`, inputQuantity);
  }, [inputQuantity, user]);

  const handleInputBlur = (index) => {
    if (inputQuantity !== storedStocks[index].quantity) {
      quantitySet(index);
    }
    setSelectedStockIndex(null);
  };

  const quantitySet = (index) => {
    const updatedStocks = [...storedStocks];
    updatedStocks[index].quantity = inputQuantity;
    setStoredStocks(updatedStocks);
    localStorage.setItem(`SellStocks_${user}`, JSON.stringify(updatedStocks));
  };

  const handleBuyNow = (stock, index) => {
    if (isConfirmingBuy) {
      // If confirming buy, execute the buy action
      const selectedStock = { ...stock, quantity: inputQuantity };
      const existingOrderStocks = JSON.parse(localStorage.getItem(`OrderSellStocks_${user}`)) || [];
      const updatedOrderStocks = [...existingOrderStocks, selectedStock];
      localStorage.setItem(`OrderSellStocks_${user}`, JSON.stringify(updatedOrderStocks));

 

      // Reset confirming state and input quantity
      setIsConfirmingBuy(false);
      setInputQuantity(1);

      navigate("/orders");
    } else {
      // Toggle to confirm buy state
      setIsConfirmingBuy(true);
    }
  };

  const handleQuantityChange = (event) => {
    const newIndex = selectedStockIndex !== null ? selectedStockIndex : 0;
    const newInputQuantity = parseInt(event.target.value);
    const maxQuantity = stocks[newIndex].quantity;
    const clampedQuantity = Math.min(Math.max(newInputQuantity, 1), maxQuantity + 1);
    setInputQuantity(clampedQuantity);
  };

  const totalAmount = storedStocks.reduce(
    (total, stock) => total + stock.price * stock.quantity,
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
              <td>{sellQuantity[index].quantity}</td>
              <td>
                <div className="input-quan">
                  <input
                    type="number"
                    id="quantity"
                    value={selectedStockIndex === index ? inputQuantity : stock.quantity}
                    onChange={(event) => {
                      handleQuantityChange(event);
                      handleInputBlur(index);
                    }} 
                    min="1"
                    max={sellQuantity[index].quantity + 1}
                  />
                </div>
                {inputQuantity > sellQuantity[index].quantity && (
                  <div style={{ color: 'red', fontWeight: 'bold', marginTop: '10px' }}>
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
              <td>${(stock.price * stock.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="total-amount">Total Amount: ${totalAmount.toFixed(2)}</div>

    </div>
  );
}

export default Buy;
