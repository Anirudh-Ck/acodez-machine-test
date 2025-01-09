import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from './reducers/userSlice';
import storage from "redux-persist/lib/storage"; 
import persistReducer from "redux-persist/es/persistReducer";
import { persistStore } from "redux-persist";


const persistConfig ={
    key: 'root',
    storage,
    whitelist: ['user']
}

const rootReducer = combineReducers({
     user : userReducer
})

const persistedReducers = persistReducer(persistConfig,rootReducer)


const store = configureStore({
    reducer :  persistedReducers,
    middleware: (getDefaultMiddleware)=>
        getDefaultMiddleware({
            serializableCheck: false
        }),
});

export const persistor = persistStore(store);


export default store;