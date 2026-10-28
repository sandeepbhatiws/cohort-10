import { createSlice } from '@reduxjs/toolkit'
const Cookies = require('js-cookie')

let cookies = Cookies.get('user_token');

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isLogin : cookies ?? 0
  },
  reducers: {
    loginRegister: (state, action) => {
        state.isLogin = action.payload
        Cookies.set('user_token', action.payload)
    },
    logout : state => {
        state.isLogin = '0'
        Cookies.remove('user_token')
    },
  }
})

export const { loginRegister, logout } = loginSlice.actions

export default loginSlice.reducer