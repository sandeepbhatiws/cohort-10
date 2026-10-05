import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import products from '../data/products'
import ProductCard from './Common/ProductCard'
import axios from 'axios'

// const categories = [
//   { name: 'Face Care', img: 'https://placehold.co/150x150/d4f4e2/1e6b4d?text=Face' },
//   { name: 'Hair Care', img: 'https://placehold.co/150x150/fde8d4/b5651d?text=Hair' },
//   { name: 'Body Care', img: 'https://placehold.co/150x150/e2d4fd/5b3ea6?text=Body' },
//   { name: 'Baby Care', img: 'https://placehold.co/150x150/fdf1d4/a67c1d?text=Baby' },
//   { name: 'Men', img: 'https://placehold.co/150x150/d4e8fd/1d5aa6?text=Men' },
//   { name: 'Gifting', img: 'https://placehold.co/150x150/fdd4e0/a61d4d?text=Gifts' },
// ]

const usps = [
  { icon: '🌱', label: 'Made Safe Certified' },
  { icon: '🚫', label: 'Toxin Free' },
  { icon: '🐇', label: 'Cruelty Free' },
  { icon: '🔬', label: 'Dermatologically Tested' },
]

const testimonials = [
  { name: 'Priya S.', text: 'Amazing products! My skin feels so much better after using the Vitamin C serum.' },
  { name: 'Rahul M.', text: 'The onion hair oil really helped with hair fall. Highly recommend.' },
  { name: 'Anjali K.', text: 'Love that everything is toxin free and safe for my baby.' },
]

const instagramImages = [
  'https://placehold.co/300x300/dcfce7/166534?text=IG+1',
  'https://placehold.co/300x300/fef9c3/854d0e?text=IG+2',
  'https://placehold.co/300x300/fee2e2/991b1b?text=IG+3',
  'https://placehold.co/300x300/dbeafe/1e40af?text=IG+4',
  'https://placehold.co/300x300/fae8ff/86198f?text=IG+5',
  'https://placehold.co/300x300/ffedd5/9a3412?text=IG+6',
]

export default function Homepage() {

  const [categories, setCategories] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    axios.get('https://wscubetech.co/ecommerce-api/categories.php')
    .then((result) => {
      setCategories(result.data.data)
    })
    .catch(() => {
      toast.error('Something went wrong !')
    })
  }, []);

  useEffect(() => {
    axios.get('https://wscubetech.co/ecommerce-api/products.php?limit=8')
    .then((result) => {
      setBestSellers(result.data.data)
    })
    .catch(() => {
      toast.error('Something went wrong !')
    })
  }, []);


  return (
    <>
      {/* Hero section */}
      <section className='bg-linear-to-r from-emerald-100 to-emerald-50 py-12 sm:py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center gap-8'>
          <div className='flex-1 text-center md:text-left'>
            <p className='text-emerald-700 font-semibold mb-2'>Goodness Inside</p>
            <h1 className='text-3xl sm:text-5xl font-bold text-emerald-900 leading-tight mb-4'>
              Natural & Toxin-Free <br /> Skin & Hair Care
            </h1>
            <p className='text-gray-600 mb-6 max-w-md mx-auto md:mx-0'>
              Made Safe certified products crafted with natural ingredients for you and your family.
            </p>
            <button className='bg-emerald-700 hover:bg-emerald-800 text-white px-8 py-3 rounded-full font-semibold transition'>
              Shop Now
            </button>
          </div>
          <div className='flex-1'>
            <img
              src='https://placehold.co/600x400/a7f3d0/065f46?text=Mamaearth+Hero+Banner'
              alt='Hero banner'
              className='w-full rounded-2xl shadow-lg'
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className='max-w-7xl mx-auto px-4 sm:px-6 py-12'>
        <h2 className='text-2xl font-bold text-center text-gray-800 mb-8'>Shop By Category</h2>
        <div className='grid grid-cols-3 sm:grid-cols-6 gap-4 sm:gap-6'>
          {categories.map((cat, index) => (

            index > 9 && index < 16
            ?
            <Link key={cat.name} to={`/products/${cat.slug}`} className='flex flex-col items-center gap-2 cursor-pointer group'>
              <img
                src={`https://placehold.co/150x150/d4f4e2/1e6b4d?text=${cat.name}`}
                alt={cat.name}
                className='w-20 h-20 sm:w-28 sm:h-28 rounded-full object-cover border-2 border-transparent group-hover:border-emerald-500 transition'
              />
              <span className='text-xs sm:text-sm font-medium text-gray-700 text-center'>{cat.name}</span>
            </Link>
            :
            ''
          ))}
        </div>
      </section>

      {/* USP strip */}
      <section className='bg-emerald-800 py-8'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center'>
          {usps.map((usp) => (
            <div key={usp.label} className='flex flex-col items-center gap-2 text-white'>
              <span className='text-3xl'>{usp.icon}</span>
              <span className='text-xs sm:text-sm font-medium'>{usp.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Best sellers */}
      <section className='max-w-7xl mx-auto px-4 sm:px-6 py-12'>
        <div className='flex items-center justify-between mb-8'>
          <h2 className='text-2xl font-bold text-gray-800'>Best Sellers</h2>
          <Link to={'/products'} className='text-emerald-700 font-semibold text-sm hover:underline'>View All →</Link>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6'>
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Offer banner */}
      <section className='max-w-7xl mx-auto px-4 sm:px-6 pb-12'>
        <div className='bg-amber-100 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 p-8 text-center sm:text-left'>
          <div>
            <h3 className='text-xl font-bold text-amber-900'>Buy 2 Get 1 Free</h3>
            <p className='text-amber-800 text-sm'>On all skin care essentials. Limited time offer.</p>
          </div>
          <button className='bg-amber-900 text-white px-6 py-2 rounded-full font-semibold'>Grab Deal</button>
        </div>
      </section>

      {/* Testimonials */}
      <section className='bg-gray-50 py-12'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6'>
          <h2 className='text-2xl font-bold text-center text-gray-800 mb-8'>What Our Customers Say</h2>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
            {testimonials.map((t) => (
              <div key={t.name} className='bg-white rounded-xl p-6 shadow-sm'>
                <p className='text-amber-500 mb-2'>★★★★★</p>
                <p className='text-gray-600 text-sm mb-4'>"{t.text}"</p>
                <p className='font-semibold text-gray-800 text-sm'>— {t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram feed */}
      <section className='max-w-7xl mx-auto px-4 sm:px-6 py-12'>
        <h2 className='text-2xl font-bold text-center text-gray-800 mb-2'>#MamaearthFamily</h2>
        <p className='text-center text-gray-500 mb-8'>Follow us on Instagram</p>
        <div className='grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-4'>
          {instagramImages.map((img, i) => (
            <img key={i} src={img} alt={`Instagram post ${i + 1}`} className='w-full aspect-square object-cover rounded-lg' />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className='bg-emerald-800 py-12'>
        <div className='max-w-2xl mx-auto px-4 sm:px-6 text-center'>
          <h2 className='text-2xl font-bold text-white mb-2'>Stay in the Loop</h2>
          <p className='text-emerald-100 mb-6 text-sm'>Subscribe to get updates on new products and exclusive offers.</p>
          <div className='flex flex-col sm:flex-row gap-3'>
            <input
              type='email'
              placeholder='Enter your email'
              readOnly
              className='flex-1 rounded-full px-5 py-3 outline-none text-sm'
            />
            <button className='bg-amber-400 hover:bg-amber-500 text-emerald-900 font-semibold px-6 py-3 rounded-full transition'>
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
