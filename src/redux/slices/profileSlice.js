import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    userProfile: null,
}


export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {

        setUserProfile : (state, action) => {

            console.log('SetUserProfileCalled!', action.payload)
            state.userProfile = action.payload

        },

    }
})

export const { setUserProfile } = profileSlice.actions
export default profileSlice.reducer