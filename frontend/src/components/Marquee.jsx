export default function Marquee({ text = "FREE SHIPPING ON ORDERS ABOVE ₹999" }) {
  const items = Array(8).fill(text)
  return (
    <div className="bg-black overflow-hidden py-3 border-y border-gray-800">
      <div className="flex whitespace-nowrap animate-marquee">
        {items.map((t, i) => (
          <span key={i} className="text-white text-sm uppercase tracking-widest font-semibold mx-8">
            {t} <span className="text-gray-500 mx-4">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}