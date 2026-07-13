import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import api from '../api/axios'

export default function ProductList({ refreshCartCount }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const category = searchParams.get('category') || ''
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const url = category ? `/products/?category=${category}` : '/products/'
    api.get(url)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error('Failed to load products', err))
      .finally(() => setLoading(false))
  }, [category])

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl font-extrabold uppercase tracking-widest">
          {category ? category : 'All Products'}
        </h1>
        <div className="flex gap-3 text-sm uppercase">
          {['', 'T-SHIRT', 'SHIRT', 'FOOTWEAR'].map((c) => (
            <button
              key={c}
              onClick={() => setSearchParams(c ? { category: c } : {})}
              className={`px-3 py-1 border ${category === c ? 'bg-black text-white' : 'border-gray-300'}`}
            >
              {c || 'All'}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} refreshCartCount={refreshCartCount} />
          ))}
        </div>
      )}
    </div>
  )
}