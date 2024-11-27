import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: ''
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => initialState,
    signin: (state, action) => {
      return {
        token: action.payload.token,
      }
    }
  }
})

export const { signin, logout } = authSlice.actions
export default authSlice.reducer