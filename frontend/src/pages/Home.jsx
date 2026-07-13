import { useEffect, useState } from 'react'
import Hero from '../components/Hero'
import ProductCard from '../components/ProductCard'
import api from '../api/axios'

export default function Home({ refreshCartCount }) {
  const [products, setProducts] = useState([])

  useEffect(() => {
    api.get('/products/')
      .then((res) => setProducts(res.data.slice(0, 8)))
      .catch((err) => console.error('Failed to load products', err))
  }, [])

  return (
    <div>
      <Hero />

      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-extrabold uppercase tracking-widest text-center mb-10">
          Shop By Category
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} refreshCartCount={refreshCartCount} />
          ))}
        </div>
      </section>
    </div>
  )
}