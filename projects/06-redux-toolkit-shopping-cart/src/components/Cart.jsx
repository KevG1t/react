import { useDispatch, useSelector } from "react-redux"
import { SubIcon, SumIcon,RemoveIcon } from "./Icosn.jsx"
import './cart.css'
import { removeToCart, setQuantity } from "../features/cart/cartSlice.js"

export function Cart() {
    const products = useSelector((state) => state.cart)
    const dispatch = useDispatch()

    const handleClick = (action, product) => {
        dispatch(setQuantity({product,action}))
    }
    return (
        <>
            <h1>CARRITO</h1>
            <section className="products-cart">
                <ul>
                    {products.map(product => {
                        return (
                            <li key={product.id}>
                                <img src={product.thumbnail} alt={product.title} />
                                <strong>{product.title}</strong>
                                <button name="sub" onClick={(e) => handleClick(e.currentTarget.name,product)}>
                                    <SubIcon />
                                </button>
                                <strong>{product.quantity}</strong>
                                <button name="sum" onClick={(e) => handleClick(e.currentTarget.name,product)}>
                                    <SumIcon />
                                </button>

                                <button onClick={() => dispatch(removeToCart(product.id))}>
                                    <RemoveIcon/>
                                </button>
                            </li>
                        )
                    })}
                </ul>
            </section>
        </>
    )
}