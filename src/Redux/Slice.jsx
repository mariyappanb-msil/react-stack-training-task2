import { createSlice } from "@reduxjs/toolkit";

const Slice = createSlice({
  name: "ORDERS",
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      const { name, logo, price } = action.payload;

      const existingItem = state.find(item => item.name === name);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({ name, logo, price, quantity: 1 });
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
