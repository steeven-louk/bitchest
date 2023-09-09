const { createSlice } = require("@reduxjs/toolkit");

const initialState ={
    // wallets: 0,
    userData:{},
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        // userAmount:(state, action)=>{
        //     state.wallets = action.payload
        // },
        // setUserEmail:(state, action)=>{
        //     // state.userInfo.id = action.payload.id,
        //     state.userInfo.email = action.payload
        // },
        setUserData:(state, action)=>{
            state.userData = action.payload
        },

    }
})

export const {setUserData} = userSlice.actions
export default userSlice.reducer