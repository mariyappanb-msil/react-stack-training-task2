import React, { useState, useEffect } from 'react';
import stocksData from '../../common/stocksData';
import  './watchlist.css'

function Watchlist() {
  const [stocks, setStocks] = useState(stocksData);

  return (
    <div>
      <h2 className='heading'>Stock Watchlist</h2>
      {stocks.map((stock, index) => (
        <div key={index} className="stock-card">
          <div className="stock-info">
            <img src={stock.logo} alt="Stock" />
            <div className="stock-details">
              <h3>{stock.name}</h3>
              <p>Price: {stock.price.toFixed(2)}</p>
              <p>Quantity: {stock.quantity}</p>
            </div>
          </div>
          <div className="stock-options">
            <button>Buy</button>
            <button>Sell</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Watchlist;
