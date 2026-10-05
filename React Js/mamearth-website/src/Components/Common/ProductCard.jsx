import React, { useContext } from 'react'
import { Link } from 'react-router'
import StarRating from './StarRating'
import { ContextApi } from './Context'

export default function ProductCard({ product }) {

  const { addToCart } = useContext(ContextApi)

  return (
    <div className='block border border-gray-200 rounded-xl p-3 hover:shadow-lg transition'>
      <Link
        to={`/product-details/${product.slug}`}
      >
        <img src={product.image} alt={product.name} className='w-full aspect-square object-cover rounded-lg mb-3' />
        <p className='text-xs text-emerald-700 font-medium mb-1'>{product.category_name}</p>
        <h3 className='text-sm font-semibold text-gray-800 mb-1 line-clamp-2'>{product.name}</h3>
        <StarRating rating={product.rating} />
        <div className='flex items-center gap-2 mt-2'>
          <span className='font-bold text-gray-900'>₹{product.price}</span>
          {/* <span className='text-xs text-gray-400 line-through'>₹{product.mrp}</span> */}
        </div>
      </Link>
      <button onClick={ () => addToCart(product) } className='mt-3 w-full border border-emerald-700 text-emerald-700 hover:bg-emerald-700 hover:text-white rounded-full py-1.5 text-sm font-semibold transition'>
          Add to Cart
        </button>
    </div>
  )
}
