import { createSlice } from "@reduxjs/toolkit";

const Slice = createSlice({
  name: "ORDERS",
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      const { name, logo, price,quantity} = action.payload;

      const existingItem = state.find(item => item.name === name);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.push({ name, logo, price, quantity: quantity });
      }
    },

    removeItem: (state, action) => {
      const itemIndex = state.findIndex(
        (item) => item.props.id === action.payload.props.id
      );

      if (itemIndex !== -1) {
        state.splice(itemIndex, 1);
      }
    },
  },
});

export const { removeItem, addItem } = Slice.actions;

export default Slice.reducer;
