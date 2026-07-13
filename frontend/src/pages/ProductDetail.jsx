import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/axios'

export default function ProductDetail({ refreshCartCount }) {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [adding, setAdding] = useState(false)

  useEffect(() => {
    api.get(`/products/${id}/`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error('Failed to load product', err))
  }, [id])

  const handleAddToCart = async () => {
    setAdding(true)
    try {
      await api.post('/cart/add/', { product_id: product.id, quantity: 1 })
      if (refreshCartCount) await refreshCartCount()
      alert('Added to cart!')
    } catch (err) {
      console.error('Failed to add to cart', err)
    } finally {
      setAdding(false)
    }
  }

  if (!product) return <p className="text-center py-20">Loading...</p>

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-10">
      <div className="aspect-square bg-gray-100 overflow-hidden">
        <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
      </div>
      <div>
        <p className="text-xs uppercase text-gray-400 tracking-wide">{product.category}</p>
        <h1 className="text-2xl font-extrabold mt-2">{product.name}</h1>
        <div className="flex items-center gap-3 mt-3">
          <span className="text-xl font-bold">₹{product.price}</span>
          {product.old_price && (
            <span className="text-gray-400 line-through">₹{product.old_price}</span>
          )}
        </div>
        <p className="text-gray-600 mt-4">{product.description}</p>
        <button
          onClick={handleAddToCart}
          disabled={adding}
          className="mt-6 bg-black text-white uppercase tracking-widest px-8 py-3 hover:bg-gray-800 transition disabled:opacity-50"
        >
          {adding ? 'Adding...' : 'Add to Cart'}
        </button>
      </div>
    </div>
  )
}