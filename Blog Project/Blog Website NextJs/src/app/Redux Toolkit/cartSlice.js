import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems : []
  },
  reducers: {
    addToCart: state => {

    },
    removeCart : state => {
      
    },
  }
})

export const { addToCart, removeCart } = cartSlice.actions

export default cartSlice.reducer