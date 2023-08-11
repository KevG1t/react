/* eslint-disable react/prop-types */

import { useReducer } from "react";
import { createContext } from "react";
import { cartReducer, cartInitialState } from "../reducers/cart";

export const CartContext = createContext()

function useCartReducer() {
    const [state, dispatch] = useReducer(cartReducer, cartInitialState)

    //dispatch para usar el reducer
    const addToCart = product => dispatch({ type: 'ADD_TO_CART', payload: product })

    const cleanCart = () => dispatch({ type: 'CLEAR_CART' })

    const removeFromCart = product => dispatch({ type: 'REMOVE_FROM_CART', payload: product })

    return { state, addToCart, removeFromCart, cleanCart }
}

export function CartProvider({ children }) {
    const { state, addToCart, removeFromCart, cleanCart } = useCartReducer()
    return (
        <CartContext.Provider value={
            {
                cart: state,
                addToCart,
                cleanCart,
                removeFromCart
            }
        }>
            {children}
        </CartContext.Provider>
    )
}

