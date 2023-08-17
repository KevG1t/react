import { createSlice } from '@reduxjs/toolkit'
import {products} from '../../mocks/products.json'

const initialState = products

export const productsSlice = createSlice({
    name:'products',
    initialState,
    reducers:{}
})


export default productsSlice.reducer