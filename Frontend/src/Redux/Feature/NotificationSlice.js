import {createSlice} from "@reduxjs/toolkit"

const NotiSlice = createSlice({
    name : Notification,
    initialState : {
        data: ""
    },
    reducers : {
        setData(state , action) {
            state.data = action.payload
        }
    }
})

export const {setData} = NotiSlice.actions;

export default NotiSlice.reducer