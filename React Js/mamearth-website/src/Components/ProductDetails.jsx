import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import products from '../data/products'
import StarRating from './Common/StarRating'
import ProductCard from './Common/ProductCard'
import axios from 'axios'
import { toast } from 'react-toastify'
import { ContextApi } from './Common/Context'

export default function ProductDetails() {
  const { slug } = useParams()

  const [productDetails, setProductDetails] = useState('');
  const [image, setImage] = useState('');

  const { cartData, addToCart, removeCart, updateCart } = useContext(ContextApi);

  const [cartExit, setCartExit] = useState('');

  useEffect(() => {
    axios.get('https://wscubetech.co/ecommerce-api/productdetails.php', {
      params: {
        slug: slug
      }
    })
      .then((result) => {
        setProductDetails(result.data.product);
        setImage(result.data.product.image)

        const checkCart = cartData.find((c) => {
          if (c.id == result.data.product.id) {
            return c;
          }
        })

        setCartExit(checkCart)
      })
      .catch(() => {
        toast.error('Something Went wrong !!')
      })
  }, [cartData])



  // const product = products.find((p) => p.slug === slug) ?? products[0]
  // const relatedProducts = products.filter((p) => p.category === productDetails.category && p.id !== productDetails.id).slice(0, 4)

  return (
    <>
      {/* Breadcrumb */}
      <div className='bg-gray-50 border-b border-gray-200'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 py-3 text-sm text-gray-500'>
          <Link to={'/'} className='hover:text-emerald-700'>Home</Link> / <Link to={'/products'} className='hover:text-emerald-700'>Products</Link> / <span className='text-gray-700'>{productDetails.name}</span>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-10'>
        {/* Gallery */}
        <div>
          <img src={image} alt={productDetails.name} className='w-full aspect-square object-cover rounded-2xl border border-gray-200' />
          <div className='grid grid-cols-4 gap-3 mt-4'>
            {productDetails?.multiple_images?.map((i) => (
              <img key={i} src={i}
                onMouseOver={() => {
                  setImage(i)
                }}
                alt={`${productDetails.name} thumbnail ${i + 1}`} className='w-full aspect-square object-cover rounded-lg border border-gray-200 cursor-pointer hover:border-emerald-500' />
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          <p className='text-sm text-emerald-700 font-medium mb-2'>{productDetails.category}</p>
          <h1 className='text-2xl sm:text-3xl font-bold text-gray-800 mb-3'>{productDetails.name}</h1>
          <div className='flex items-center gap-2 mb-4'>
            <StarRating rating={productDetails.rating} />
            <span className='text-sm text-gray-400'>({productDetails.reviews} reviews)</span>
          </div>

          <div className='flex items-center gap-3 mb-6'>
            <span className='text-3xl font-bold text-gray-900'>₹{productDetails.price}</span>
            <span className='text-lg text-gray-400 line-through'>₹{productDetails.mrp}</span>
            <span className='text-emerald-700 font-semibold text-sm'>
              {Math.round(((productDetails.mrp - productDetails.price) / productDetails.mrp) * 100)}% OFF
            </span>
          </div>

          <p className='text-gray-600 mb-6'>{productDetails.description}</p>

          {/* Benefits */}
          {/* <div className='mb-6'>
            <h3 className='font-semibold text-gray-800 mb-2'>Key Benefits</h3>
            <ul className='grid grid-cols-2 gap-2'>
              {productDetails.benefits.map((b) => (
                <li key={b} className='flex items-center gap-2 text-sm text-gray-600'>
                  <span className='text-emerald-600'>✓</span> {b}
                </li>
              ))}
            </ul>
          </div> */}

          {/* Quantity + actions */}
          <div className='flex items-center gap-4 mb-6'>

            {
              cartExit
                ?
                <div className='flex items-center border border-gray-300 rounded-full'>
                  <button onClick={() => updateCart(cartExit.id, 'minus')} type='button' className='w-10 h-10 text-lg text-gray-600'>−</button>
                  <span className='w-10 text-center'>{cartExit.quantity}</span>
                  <button onClick={() => updateCart(cartExit.id, 'plus')} type='button' className='w-10 h-10 text-lg text-gray-600'>+</button>
                </div>
                :
                ''
            }


            <span className='text-sm text-emerald-700 font-medium'>In Stock</span>
          </div>

          <div className='flex flex-col sm:flex-row gap-3'>

            {
              cartExit
                ?
                <button onClick={() => removeCart(productDetails.id)}
                  className='flex-1 text-center border border-emerald-700 text-emerald-700 hover:bg-emerald-700 hover:text-white rounded-full py-3 font-semibold transition'
                >
                  Remove from Cart
                </button>
                :
                <button onClick={() => addToCart(productDetails)}
                  className='flex-1 text-center border border-emerald-700 text-emerald-700 hover:bg-emerald-700 hover:text-white rounded-full py-3 font-semibold transition'
                >
                  Add to Cart
                </button>
            }





            <Link
              to={'/cart'}
              className='flex-1 text-center bg-emerald-700 hover:bg-emerald-800 text-white rounded-full py-3 font-semibold transition'
            >
              Buy Now
            </Link>
          </div>

          {/* Delivery info */}
          <div className='mt-8 border border-gray-200 rounded-xl p-4 flex items-center gap-3'>
            <span className='text-2xl'>🚚</span>
            <div>
              <p className='text-sm font-semibold text-gray-800'>Free delivery on orders above ₹499</p>
              <p className='text-xs text-gray-500'>Estimated delivery in 3-5 business days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Related products */}
      {/* {relatedProducts.length > 0 && (
        <section className='max-w-7xl mx-auto px-4 sm:px-6 pb-14'>
          <h2 className='text-2xl font-bold text-gray-800 mb-6'>You May Also Like</h2>
          <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6'>
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )} */}
    </>
  )
}
