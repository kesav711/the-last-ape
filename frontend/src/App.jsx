import { Routes, Route } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Marquee from './components/Marquee'
import Home from './pages/Home'
import ProductList from './pages/ProductList'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import api from './api/axios'

export default function App() {
  const [cartCount, setCartCount] = useState(0)

  const refreshCartCount = useCallback(async () => {
    try {
      const res = await api.get('/cart/')
      setCartCount(res.data.count || 0)
    } catch (err) {
      console.error('Failed to load cart count', err)
    }
  }, [])

  useEffect(() => {
    refreshCartCount()
  }, [refreshCartCount])

  return (
   <div>
      <Navbar cartCount={cartCount} />
      <Marquee />
      <Routes>
        <Route path="/" element={<Home refreshCartCount={refreshCartCount} />} />
        <Route path="/products" element={<ProductList refreshCartCount={refreshCartCount} />} />
        <Route path="/products/:id" element={<ProductDetail refreshCartCount={refreshCartCount} />} />
        <Route path="/cart" element={<Cart refreshCartCount={refreshCartCount} />} />
     </Routes>
      <Footer />
    </div>
  )
}