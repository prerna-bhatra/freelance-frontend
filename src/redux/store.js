import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/Authslice";
import ProfileReducer from "./slices/profileSlice"
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
import { persistReducer } from "redux-persist";
;

const rootReducer = combineReducers({
    user : userReducer,
    profile : ProfileReducer,
})

const persistConfig = {
    key : "user",
    storage, 
    version : 1
}

const persistedReducer = persistReducer( persistConfig , rootReducer)
export const store = configureStore({
    reducer: persistedReducer,
    middleware : ( getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck : false
        })
    }
})

export const persistor = persistStore(store)