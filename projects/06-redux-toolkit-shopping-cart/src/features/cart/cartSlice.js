import { createSlice } from "@reduxjs/toolkit";

const initialState = []

export const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const {payload} = action
            const isInCart = state.find(product => product.id === payload.id)

            if (!isInCart){
                state.push({...payload, quantity:1})
            }
        },
        removeToCart: (state, action) => {
            const id = action.payload
            const found = state.find(p => p.id === id)
            if(!found) return
            state.splice(state.indexOf(found),1)
        },
        setQuantity: (state, action) => {
            const {payload} = action
            const {action:actionQuantity, product} = payload
            let {quantity} = product
            const found = state.find(p => p.id === product.id)

            if (!found) return
            
            let index = state.indexOf(found)

            switch (actionQuantity) {
                case 'sum': {
                    quantity++
                    state.splice(index,1)
                    state.splice(index,0,{...product,quantity:quantity })
                }
                break;
                case 'sub': {
                    if (quantity === 1) break
                    quantity--
                    state.splice(index,1)
                    state.splice(index,0,{...product,quantity:quantity })
                }
            }
        }
    }
})

//TODO: EXPORT REDUCERS ACTIONS
export const {addToCart, setQuantity, removeToCart} = cartSlice.actions
//EXPORT SLICE REDUCER
export default cartSlice.reducer