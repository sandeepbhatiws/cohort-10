import React from 'react'

export default function StarRating({ rating, showValue = true }) {
  const fullStars = Math.round(rating)
  return (
    <span className='text-amber-500 text-sm'>
      {'★'.repeat(fullStars)}
      {'☆'.repeat(5 - fullStars)}
      {showValue && <span className='text-gray-500 ml-1'>({rating})</span>}
    </span>
  )
}
