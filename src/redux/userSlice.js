import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'role',
    initialState: {role:""},
    reducers: {
        updateRole(state, action) {
            state.role =(action.payload)
        },
        logOut(state){
            state.role = ""
        }
    }
})

export const { updateRole,logOut } = userSlice.actions;
export default userSlice.reducer;