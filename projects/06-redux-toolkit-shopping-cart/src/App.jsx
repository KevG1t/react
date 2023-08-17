import { Routes, Route } from "react-router-dom"
import { Products } from "./components/Products.jsx"
import { Cart } from "./components/Cart.jsx"
import { Navbar } from "./components/Navbar.jsx"
import { LogIn } from "./components/LogIn.jsx"
import { ProtectedRoute } from "./components/ProtectedRoute.jsx"

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </>
  )
}

export default App
