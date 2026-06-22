import {configureStore} from "@reduxjs/toolkit"
import notireducer from "./Feature/NotificationSlice.js"


const store = configureStore({
    reducer : {
        Notification : notireducer
        
    }
})

export default store