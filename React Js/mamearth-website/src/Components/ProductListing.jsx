import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useNavigation, useParams } from 'react-router'
import ProductCard from './Common/ProductCard'
import axios from 'axios'
import { toast } from 'react-toastify'
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic-light-dark.css';

const priceRanges = [
  {
    from : 0,
    to : 250,
    value : 'Under ₹250'
  },
  {
    from : 251,
    to : 1000,
    value : '₹251 - ₹1000'
  },
  {
    from : 1001,
    to : 2500,
    value : '₹1001 - ₹2500'
  },
  {
    from : 2501,
    to : 5000,
    value : '₹2501 - ₹5000'
  },
  {
    from : 5001,
    to : 100000,
    value : 'Above ₹5001'
  }
  ]
const ratings = [5, 4, 3, 2]

export default function ProductListing() {

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sorting, setSorting] = useState('');
  const [rating, setRating] = useState('');

  const [categorySlugs, setCategorySlugs] = useState([]);
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');

  const params = useParams();

  useEffect(() => {
    if(params.slug){
      setCategorySlugs([params.slug]);
    }
  }, [params.slug])

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
    axios.get('https://wscubetech.co/ecommerce-api/products.php', {
        params : {
          limit : 12,
          page : currentPage,
          sorting : sorting,
          rating : rating,
          categories : categorySlugs.toString(),
          price_from : priceFrom,
          price_to : priceTo
        }
    })
    .then((result) => {
      setProducts(result.data.data)
      setTotalPages(result.data.total_pages)
    })
    .catch(() => {
      toast.error('Something went wrong !')
    })
  }, [currentPage, sorting, rating, categorySlugs, priceFrom, priceTo]);

  const filterCategories = (slug) => {
    if(categorySlugs.includes(slug)){
      const filterCategory = categorySlugs.filter((v) => {
        if(v != slug){
          return v;
        }
      })

      console.log([...filterCategory])
      setCategorySlugs([...filterCategory])
    } else {
      console.log([...categorySlugs, slug])
      setCategorySlugs([...categorySlugs, slug])
    }

    setCurrentPage(1)
  }

  const priceRange = (from, to) => {
    setCurrentPage(1)

    setPriceFrom(from)
    setPriceTo(to)
      
  }

  const navigate = useNavigate();

  const clearFilter = () => {
    window.location.reload();
  }
  
  return (
    <>
      {/* Breadcrumb */}
      <div className='bg-gray-50 border-b border-gray-200'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 py-3 text-sm text-gray-500'>
          <Link to={'/'} className='hover:text-emerald-700'>Home</Link> / <span className='text-gray-700'>All Products</span>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 py-8'>
        <h1 className='text-2xl sm:text-3xl font-bold text-gray-800 mb-6'>All Products</h1>

        <div className='flex flex-col lg:flex-row gap-8'>
          {/* Filters sidebar */}
          <aside className='w-full lg:w-64 shrink-0'>
            <div className='border border-gray-200 rounded-xl p-5 sticky top-24'>
              <div className='flex items-center justify-between mb-4'>
                <h2 className='font-semibold text-gray-800'>Filters</h2>
                <button type='button' onClick={ clearFilter } className='text-xs text-emerald-700 font-medium hover:underline'>Clear All</button>
              </div>

              {/* Category filter */}
              <div className='mb-6'>
                <h3 className='text-sm font-semibold text-gray-700 mb-3'>Category</h3>
                <div className='space-y-2'>
                  {categories.map((cat) => (
                    <label key={cat.id} 
                    className='flex items-center gap-2 text-sm text-gray-600 cursor-pointer'>
                      <input onClick={ () => filterCategories(cat.slug) } type='checkbox' checked={ categorySlugs.includes(cat.slug) ? true : false } className='accent-emerald-700' />
                      {cat.name}
                    </label>
                  ))}
                </div>
              </div>

              {/* Price filter */}
              <div className='mb-6'>
                <h3 className='text-sm font-semibold text-gray-700 mb-3'>Price</h3>
                <div className='space-y-2'>
                  {priceRanges.map((range) => (
                    <label key={range.value} className='flex items-center gap-2 text-sm text-gray-600 cursor-pointer'>
                      <input onClick={ () => priceRange(range.from, range.to) } type='radio' name='price' className='accent-emerald-700' />
                      {range.value}
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating filter */}
              <div>
                <h3 className='text-sm font-semibold text-gray-700 mb-3'>Customer Rating</h3>
                <div className='space-y-2'>
                  {ratings.map((r) => (
                    <label key={r} className='flex items-center gap-2 text-sm text-gray-600 cursor-pointer' onClick={() => {
                      setRating(r)
                      setCurrentPage(1)
                    }} >
                      <input type='radio' name='rating' className='accent-emerald-700' />
                      {r}★ & above
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Product grid */}
          <div className='flex-1'>
            <div className='flex items-center justify-between mb-6'>
              <p className='text-sm text-gray-500'>{products.length} products</p>
              <select className='border border-gray-300 rounded-lg text-sm px-3 py-2 text-gray-600 outline-none' defaultValue='popularity'
              onChange={ (e) => {
                setSorting(e.target.value)
                setCurrentPage(1)
              }}
              >
                <option value=''>Sort by: Popularity</option>
                <option value='1'>Name: A to Z</option>
                <option value='2'>Name: Z to A</option>
                <option value='3'>Price: Low to High</option>
                <option value='4'>Price: High to Low</option>
              </select>
            </div>

            <div className='grid mb-8 grid-cols-2 sm:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6'>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <ResponsivePagination
              current={currentPage}
              total={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </>
  )
}
