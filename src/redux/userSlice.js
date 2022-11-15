import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        fullname: "",
        token:"",
        role:""
    },
    reducers: {
        updateName(state, action) {
            state.fullname = (action.payload)
        },
        updateToken(state, action) {
            state.token =(action.payload)
            localStorage.setItem( "myToken", state.token );
        },
        updateRole(state, action) {
            state.role =(action.payload)
        },
        logOut(state){
            state.role = "";
            state.fullname = "";
            state.token = "";
            localStorage.setItem("myRole", "");
        }
    },
})

export const { updateName,updateToken, updateRole, logOut} = userSlice.actions;
export default userSlice.reducer;