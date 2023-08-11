import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import stocksData from "../../common/stocksData.json";
import Header from "../../components/Header/Header";
import './BuyPage.css';

function Buy() {
  const user = JSON.parse(localStorage.getItem("username"));

  const [storedStocks, setStoredStocks] = useState(JSON.parse(localStorage.getItem(`BuyStocks_${user}`)) || []);
  const [stocks, setStocks] = useState(stocksData);
  const [inputQuantity, setInputQuantity] = useState(1);
  const [selectedStockIndex, setSelectedStockIndex] = useState(null);
  const [isConfirmingBuy, setIsConfirmingBuy] = useState(false); 
  console.log("FOCUS", selectedStockIndex)
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
    localStorage.setItem(`BuyStocks_${user}`, JSON.stringify(updatedStocks));
  };

  const handleBuyNow = (stock, index) => {
<<<<<<< HEAD
    const selectedStock = { ...stock, quantity: inputQuantity };
    const existingOrderStocks = JSON.parse(localStorage.getItem(`OrderStocks_${user}`)) || [];
    const updatedOrderStocks = [...existingOrderStocks, selectedStock];
    localStorage.setItem(`OrderStocks_${user}`, JSON.stringify(updatedOrderStocks));
  
    // Remove the bought stock from storedStocks
   
  
    navigate("/orders");
=======
    if (isConfirmingBuy) { // If confirming buy, execute the buy action
      const selectedStock = { ...stock, quantity: inputQuantity };
      const existingOrderStocks = JSON.parse(localStorage.getItem(`OrderStocks_${user}`)) || [];
      const updatedOrderStocks = [...existingOrderStocks, selectedStock];
      localStorage.setItem(`OrderStocks_${user}`, JSON.stringify(updatedOrderStocks));

      // Remove the bought stock from storedStocks
      const updatedStoredStocks = [...storedStocks];
      updatedStoredStocks.splice(index, 1);
      setStoredStocks(updatedStoredStocks);
      localStorage.setItem(`BuyStocks_${user}`, JSON.stringify(updatedStoredStocks));

      navigate("/orders");
    } else {
      // Toggle to confirm buy state
      setIsConfirmingBuy(true);
    }
>>>>>>> b5f3550648519bff80d0eb206897db9cbc85a109
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
<<<<<<< HEAD
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
                    value={selectedStockIndex === index ? inputQuantity : stock.quantity}
                    onChange={handleQuantityChange}
                    onBlur={() => handleInputBlur(index)}
                    onFocus={() => setSelectedStockIndex(index)}
                    min="1"
                    max={stocks[index].quantity + 1}
                  />
                </div>
                {inputQuantity > stocks[index].quantity && (
                  <div style={{ color: 'red', fontWeight: 'bold', marginTop: '10px' }}>
                    Not enough quantity
                  </div>
                )}
              </td>
              <td>
                <div className="sell-buy-button-container">
                  <div className="sell-buynowbtn" onClick={() => handleBuyNow(stock, index)}>Buy Now</div>
                </div>
              </td>
              <td>${(stock.price * stock.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="total-amount">Total Amount: ${totalAmount.toFixed(2)}</div>
=======
      {storedStocks.map((stock, index) => {
        const quantityLeft = Math.max(stocks[index].quantity - inputQuantity, 0);

        return (
          <div key={index} className="sell-stock-card">
            <div className="sell-stock-card-details">
              <div>
                <h3 className="sell-stock-name">{stock.name}</h3>
                <div className="sell-stock-price">Price: ${stock.price.toFixed(2)}</div>
                <div>Total Quantity : {stocks[index].quantity}</div>
                <div className="sell-stock-quantity">
                  Quantity :
                  <div className="input-quan">
                    <input
                      type="number"
                      id="quantity"
                      value={selectedStockIndex === index ? inputQuantity : stock.quantity}
                      onChange={handleQuantityChange}
                      onBlur={() => handleInputBlur(index)}
                      onFocus={() => setSelectedStockIndex(index)}
                      min="1"
                      max={stocks[index].quantity + 1}
                    />
                  </div>
                  <div style={{ color: 'red', fontWeight: 'bold', marginTop: '10px' }}>
                    {inputQuantity > stocks[index].quantity ? <div>Not have enough quantity</div> : null}
                  </div>
                </div>
              </div>
              <div className="sell-buy-button-container">
                {isConfirmingBuy ? (
                  <div className="sell-buynowbtn" onClick={() => handleBuyNow(stock, index)}>Confirm Buy</div>
                ) : (
                  <div className="sell-buynowbtn" onClick={() => handleBuyNow(stock, index)}>Buy Now</div>
                )}
              </div>
            </div>
            Amount: ${stock.price.toFixed(2) * stock.quantity.toFixed(2)}
          </div>
        );
      })}
>>>>>>> b5f3550648519bff80d0eb206897db9cbc85a109
    </div>
  );
}

export default Buy;




