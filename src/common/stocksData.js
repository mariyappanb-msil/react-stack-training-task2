var inventoryData = [
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
var inventoryDataString = JSON.stringify(inventoryData);

localStorage.setItem("inventory", inventoryDataString);

export default inventoryData;