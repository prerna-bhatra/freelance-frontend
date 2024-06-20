import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user: null,
    token : null,
    isLoggedIn : false,
    userType : null,
}


export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {

        setToken : (state, action) => {
            state.token = action.payload
            state.isLoggedIn = true;
        },
        setUser: (state, action) => {
            state.user = action.payload
        },

        logout: (state) => {
            state.user = null
            state.isLoggedIn = false
            state.userType = null
            state.token = null
        },

        setUserType : ( state  , action) => {
            state.userType = action.payload
        }
    }
})

export const { setUserType ,  setUser, setToken, logout } = userSlice.actions
export default userSlice.reducer