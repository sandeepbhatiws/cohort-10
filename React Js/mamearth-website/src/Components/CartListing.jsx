import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router'
import products from '../data/products'
import ProductCard from './Common/ProductCard'
import { ContextApi } from './Common/Context'

const cartItems = [
  { ...products[0], qty: 1 },
  { ...products[1], qty: 2 },
  { ...products[4], qty: 1 },
]

const suggestedProducts = products.slice(8, 12)

export default function CartListing() {

  // const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0)
  // const mrpTotal = cartItems.reduce((sum, item) => sum + item.mrp * item.qty, 0)
  // const discount = mrpTotal - subtotal
  // const delivery = subtotal > 499 ? 0 : 49
  // const total = subtotal + delivery

  const { cartData, removeCart, updateCart } = useContext(ContextApi);

  var [totalAmount, setTotalAmount] = useState(0); 

  useEffect(() => {
    var sum = 0;
    cartData.forEach((v) => {
      sum += v.quantity * v.price
    })

    setTotalAmount(sum)
  }, [cartData])

  

  return (
    <>
      <div className='bg-gray-50 border-b border-gray-200'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 py-3 text-sm text-gray-500'>
          <Link to={'/'} className='hover:text-emerald-700'>Home</Link> / <span className='text-gray-700'>Shopping Cart</span>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 py-8'>
        <h1 className='text-2xl sm:text-3xl font-bold text-gray-800 mb-6'>Shopping Cart ({cartData.length})</h1>

        <div className='flex flex-col lg:flex-row gap-8'>
          {/* Cart items */}
          <div className='flex-1 space-y-4'>
            {cartData.map((item) => (
              <div key={item.id} className='flex items-center gap-4 border border-gray-200 rounded-xl p-4'>
                <img src={item.image} alt={item.name} className='w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg shrink-0' />

                <div className='flex-1 min-w-0'>
                  <p className='text-xs text-emerald-700 font-medium mb-1'>{item.category_name}</p>
                  <h3 className='font-semibold text-gray-800 truncate'>{item.name}</h3>
                  <div className='flex items-center gap-2 mt-1'>
                    <span className='font-bold text-gray-900'>₹{item.price}</span>
                  </div>
                </div>

                <div className='flex items-center border border-gray-300 rounded-full shrink-0'>
                  <button onClick={ () => updateCart(item.id, 'minus') } type='button' className='w-8 h-8 text-gray-600'>−</button>
                  <span className='w-8 text-center text-sm'>{item.quantity}</span>
                  <button onClick={ () => updateCart(item.id, 'plus') }  type='button' className='w-8 h-8 text-gray-600'>+</button>
                </div>

                <div className='text-right shrink-0 w-20'>
                  <p className='font-semibold text-gray-800'>₹{item.price * item.quantity}</p>
                </div>

                <button onClick={ () => removeCart(item.id) } type='button' className='text-gray-400 hover:text-red-500 text-lg shrink-0'>✕</button>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <aside className='w-full lg:w-80 shrink-0'>
            <div className='border border-gray-200 rounded-xl p-6 sticky top-24'>
              <h2 className='font-semibold text-gray-800 mb-4'>Order Summary</h2>

              <div className='space-y-2 text-sm text-gray-600 mb-4'>
                <div className='flex justify-between'>
                  <span>Subtotal (MRP)</span>
                  <span>₹{totalAmount}</span>
                </div>
                <div className='flex justify-between text-emerald-700'>
                  <span>Discount</span>
                  <span>− ₹0</span>
                </div>
                <div className='flex justify-between'>
                  <span>Delivery</span>
                  <span>Free</span>
                </div>
              </div>

              <div className='border-t border-gray-200 pt-4 flex justify-between font-bold text-gray-800 mb-6'>
                <span>Total</span>
                <span>₹{totalAmount}</span>
              </div>

              <button type='button' className='w-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-3 rounded-full transition mb-3'>
                Proceed to Checkout
              </button>
              <Link to={'/products'} className='block text-center text-sm text-emerald-700 font-medium hover:underline'>
                Continue Shopping
              </Link>
            </div>
          </aside>
        </div>

        {/* Suggested products */}
        <section className='mt-14'>
          <h2 className='text-xl font-bold text-gray-800 mb-6'>You Might Also Like</h2>
          <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6'>
            {suggestedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
