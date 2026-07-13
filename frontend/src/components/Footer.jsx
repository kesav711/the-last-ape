import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <h3 className="text-xl font-extrabold tracking-widest mb-3">THE-LAST-APE*</h3>
          <p className="text-gray-400 text-sm">Street-first apparel for the pedestrian generation.</p>
        </div>

        <div>
          <h4 className="uppercase text-xs tracking-widest text-gray-400 mb-4">Shop</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/products?category=T-SHIRT" className="hover:text-gray-400">T-Shirts</Link></li>
            <li><Link to="/products?category=SHIRT" className="hover:text-gray-400">Shirts</Link></li>
            <li><Link to="/products?category=FOOTWEAR" className="hover:text-gray-400">Footwear</Link></li>
            <li><Link to="/products" className="hover:text-gray-400">All Products</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="uppercase text-xs tracking-widest text-gray-400 mb-4">Help</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>Shipping Info</li>
            <li>Returns</li>
            <li>FAQs</li>
            <li>Contact Us</li>
          </ul>
        </div>

        <div>
          <h4 className="uppercase text-xs tracking-widest text-gray-400 mb-4">Follow</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>Instagram</li>
            <li>Twitter / X</li>
            <li>YouTube</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 py-5 text-center text-xs text-gray-500 tracking-wide">
        © {new Date().getFullYear()} THE-LAST-APE*. All rights reserved.
      </div>
    </footer>
  )
}