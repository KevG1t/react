export const cartInitialState = JSON.parse(window.localStorage.getItem('cart')) || []

const CART_ACTION_TYPES = {
    addToCart:'ADD_TO_CART',
    removeFromCart: 'REMOVE_FROM_CART',
    cleanCart:'CLEAR_CART'
}

export const updateLocalStorage = state => {
    window.localStorage.setItem('cart',JSON.stringify(state))
}

export const cartReducer = (state, action) => {
    const { type: actionType, payload: actionPayload } = action

    switch (actionType) {

        case CART_ACTION_TYPES.addToCart: {
            const { id } = actionPayload
            // ver si ya existe en el carrito
            const productInCartIndex = state.findIndex(item => item.id === id)
            if (productInCartIndex >= 0) {
                const newState = structuredClone(state)
                newState[productInCartIndex].quantity += 1
                updateLocalStorage(newState)
                return newState
            }

            const newState = [
                ...state,
                {
                    ...actionPayload, //product
                    quantity: 1
                }
            ]
            updateLocalStorage(newState)
            //si no
            return newState
        }
        case CART_ACTION_TYPES.removeFromCart: {
            const { id } = actionPayload
            const newState = state.filter(item => item.id !== id)
            updateLocalStorage(newState)
            return newState
        }
        case CART_ACTION_TYPES.cleanCart: { 
            updateLocalStorage([])
            return [] 
        }
    }
}