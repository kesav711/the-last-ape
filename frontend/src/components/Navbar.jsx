import { Link } from 'react-router-dom'

export default function Navbar({ cartCount }) {
  return (
    <nav className="bg-black text-white flex items-center justify-between px-6 py-4 sticky top-0 z-50">
      <Link to="/" className="text-xl font-extrabold tracking-widest">
        THE-LAST-APE*
      </Link>

      <div className="hidden md:flex gap-8 text-sm uppercase tracking-wide">
        <Link to="/products?category=T-SHIRT" className="hover:text-gray-400">T-Shirts</Link>
        <Link to="/products?category=SHIRT" className="hover:text-gray-400">Shirts</Link>
        <Link to="/products?category=FOOTWEAR" className="hover:text-gray-400">Footwear</Link>
        <Link to="/products" className="hover:text-gray-400">All</Link>
      </div>

      <Link to="/cart" className="relative flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
          viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <span className="absolute -top-2 -right-3 bg-white text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {cartCount}
        </span>
      </Link>
    </nav>
  )
}