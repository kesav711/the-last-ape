import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-b from-black via-neutral-900 to-neutral-800 text-white min-h-[80vh] flex items-center justify-center overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=900"
        alt="T-shirt on hanger"
        className="absolute right-0 bottom-0 h-full object-cover opacity-70 hidden md:block"
      />
      <div className="relative z-10 text-center px-4">
        <p className="uppercase tracking-[6px] text-sm text-gray-400 mb-4">
          New Drop
        </p>
        <h1 className="text-4xl md:text-6xl font-extrabold uppercase leading-tight">
          Pedestrian <br /> Collection <span className="text-gray-500">404</span>
        </h1>
        <Link
          to="/products"
          className="inline-block mt-8 bg-white text-black font-bold uppercase tracking-widest px-8 py-3 hover:bg-gray-300 transition"
        >
          Shop Now
        </Link>
      </div>
    </div>
  )
}