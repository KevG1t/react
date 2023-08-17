import { useDispatch, useSelector } from "react-redux"
import './products.css'
import { addToCart } from "../features/cart/cartSlice.js"

export function Products() {
    const products = useSelector((state) => state.products)
    const dispatch = useDispatch()
    return (
        <>
            <h1 className="products-logo">PRODUCTOS</h1>
            <section className="products">
                <ul>
                    {products.map(product => {
                        return (
                            <li key={product.id}>
                                <img src={product.thumbnail} alt={product.title} />
                                <div>
                                    <strong>{product.title}</strong> - ${product.price}
                                </div>
                                <button onClick={() => dispatch(addToCart(product))}>agregar al carrito</button>
                            </li>
                        )
                    })}
                </ul>
            </section>
        </>
    )
}