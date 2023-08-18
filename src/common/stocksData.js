import React from "react";

const inventoryData = [
  {
    name: "Apple",
    price: 300,
    quantity: 10,
  },
  {
    name: "Microsoft",
    price: 250,
    quantity: 15,
  },
  {
    name: "Hp",
    price: 180,
    quantity: 8,
  },
  {
    name: "Intel",
    price: 180,
    quantity: 8,
  },
  {
    name: "Nvidia",
    price: 180,
    quantity: 8,
  },
  {
    name: "Dell",
    price: 180,
    quantity: 8,
  },
];

const StocksData = () => {
  const inventoryDataString = JSON.stringify(inventoryData);

  // Check if the key 'inventory' already exists in localStorage before setting it
  if (!localStorage.getItem('inventory')) {
    localStorage.setItem("inventory", inventoryDataString);
    console.log("Inventory data saved to localStorage.");
  } else {
    console.log("Inventory data already exists in localStorage.");
  }

  return (
    <div>
      {/* Your component JSX */}
    </div>
  );
};

export default StocksData;
