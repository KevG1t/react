import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import productsReducer from "../features/products/productsSlice";
import authReducer from "../features/auth/authSlice";
// Define el estado inicial basado en localStorage
const persistedState = JSON.parse(localStorage.getItem('reduxState')) || {};

const store = configureStore({
    reducer:{
        auth:authReducer,
        cart: cartReducer,
        products:productsReducer
    },
    preloadedState:persistedState
})

//cuando se hagan cambios se guardara en el localStorage
store.subscribe(() => {
    localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});


export default store