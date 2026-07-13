import { Link } from 'react-router-dom'
import { useState } from 'react'
import api from '../api/axios'

export default function ProductCard({ product, refreshCartCount }) {
  const [adding, setAdding] = useState(false)

  const handleAddToCart = async (e) => {
    e.preventDefault()
    setAdding(true)
    try {
      await api.post('/cart/add/', { product_id: product.id, quantity: 1 })
      if (refreshCartCount) await refreshCartCount()
    } catch (err) {
      console.error('Failed to add to cart', err)
    } finally {
      setAdding(false)
    }
  }

  return (
    <div className="group border border-gray-200 hover:border-black transition">
      <Link to={`/products/${product.id}`}>
        <div className="aspect-square overflow-hidden bg-gray-100">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      <div className="p-3">
        <p className="text-xs uppercase text-gray-400 tracking-wide">{product.category}</p>
        <h3 className="font-semibold text-sm mt-1 line-clamp-1">{product.name}</h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="font-bold">₹{product.price}</span>
          {product.old_price && (
            <span className="text-gray-400 text-sm line-through">₹{product.old_price}</span>
          )}
        </div>
        <button
          onClick={handleAddToCart}
          disabled={adding}
          className="mt-3 w-full bg-black text-white text-xs uppercase tracking-wider py-2 hover:bg-gray-800 transition disabled:opacity-50"
        >
          {adding ? 'Adding...' : 'Add to Cart'}
        </button>
      </div>
    </div>
  )
}