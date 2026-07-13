import { useEffect, useState } from 'react'
import api from '../api/axios'

export default function Cart({ refreshCartCount }) {
  const [items, setItems] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [checkingOut, setCheckingOut] = useState(false)
  const [step, setStep] = useState('cart')
  const [paymentMethod, setPaymentMethod] = useState(null)

  const loadCart = async () => {
    setLoading(true)
    try {
      const res = await api.get('/cart/')
      setItems(res.data.items)
      setTotal(res.data.total)
    } catch (err) {
      console.error('Failed to load cart', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadCart() }, [])

  const handleConfirmPayment = async (method) => {
    setPaymentMethod(method)
    setCheckingOut(true)
    try {
      await api.post('/checkout/')
      setStep('confirmed')
      if (refreshCartCount) await refreshCartCount()
    } catch (err) {
      console.error('Checkout failed', err)
    } finally {
      setCheckingOut(false)
    }
  }

  if (loading) return <p className="text-center py-24 text-gray-400">Loading cart...</p>

  // ---------- Order Confirmed ----------
  if (step === 'confirmed') {
    return (
      <div className="max-w-md mx-auto px-6 py-24 text-center">
        <div className="w-20 h-20 rounded-full bg-black flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-extrabold uppercase tracking-widest mb-3">
          Order Confirmed
        </h1>
        <p className="text-gray-500 mb-1">
          {paymentMethod === 'cash' ? 'Cash on Delivery' : 'Paid Online'}
        </p>
        <p className="text-gray-600 mt-4">
          Arriving in <span className="font-bold text-black">3 days</span>
        </p>
        <a
          href="/"
          className="inline-block mt-10 bg-black text-white uppercase tracking-widest text-sm px-10 py-3 hover:bg-gray-800 transition"
        >
          Continue Shopping
        </a>
      </div>
    )
  }

  // ---------- Choose Payment Method ----------
  if (step === 'payment') {
    return (
      <div className="max-w-md mx-auto px-6 py-16">
        <button onClick={() => setStep('cart')} className="text-sm text-gray-400 mb-8 flex items-center gap-1 hover:text-black transition">
          ← Back to cart
        </button>

        <h1 className="text-2xl font-extrabold uppercase tracking-widest mb-1">
          Payment
        </h1>
        <p className="text-gray-400 mb-8">Total: <span className="font-bold text-black">₹{total}</span></p>

        <button
          onClick={() => handleConfirmPayment('cash')}
          disabled={checkingOut}
          className="w-full flex items-center gap-4 border border-gray-200 rounded-lg p-5 mb-4 hover:border-black transition disabled:opacity-50 text-left"
        >
          <div className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center text-xl">💵</div>
          <div className="flex-1">
            <p className="font-semibold">Cash on Delivery</p>
            <p className="text-sm text-gray-400">Pay when it arrives</p>
          </div>
          {checkingOut && paymentMethod === 'cash' && <span className="text-xs text-gray-400">...</span>}
        </button>

        <button
          onClick={() => handleConfirmPayment('online')}
          disabled={checkingOut}
          className="w-full flex items-center gap-4 border border-gray-200 rounded-lg p-5 hover:border-black transition disabled:opacity-50 text-left"
        >
          <div className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center text-xl">💳</div>
          <div className="flex-1">
            <p className="font-semibold">Pay Online</p>
            <p className="text-sm text-gray-400">Card, UPI, or wallet</p>
          </div>
          {checkingOut && paymentMethod === 'online' && <span className="text-xs text-gray-400">...</span>}
        </button>
      </div>
    )
  }

  // ---------- Cart ----------
  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-extrabold uppercase tracking-widest mb-8">Your Cart</h1>

      {items.length === 0 ? (
        <p className="text-gray-400">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 border-b border-gray-100 pb-4">
                <img src={item.product.image_url} alt={item.product.name} className="w-20 h-20 object-cover bg-gray-100 rounded" />
                <div className="flex-1">
                  <p className="font-semibold">{item.product.name}</p>
                  <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                </div>
                <p className="font-bold">₹{(item.product.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-8 text-lg font-bold">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button
            onClick={() => setStep('payment')}
            className="mt-6 w-full bg-black text-white uppercase tracking-widest py-3 rounded hover:bg-gray-800 transition"
          >
            Checkout
          </button>
        </>
      )}
    </div>
  )
}