import React, { useEffect, useState } from 'react'
import ProductCard from './Common/ProductCard'
import axios from 'axios';

export default function ProductSection() {

    const [products, setProducts]= useState([]);

    useEffect(() => {
        axios.get('https://wscubetech.co/ecommerce-api/products.php')
        .then((result) => {
            setProducts(result.data.data)
        })
    },[])

    return (
        <>
            <section class="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-12">
                <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    {/* <!-- Heading & Filters --> */}
                    <div class="mb-4 space-y-4 sm:space-y-0 md:mb-8">
                            <h2 class="mt-3 text-center text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Best Sellings</h2>
                    </div>
                    <div class="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
                        {
                            products.map((v,i) => {
                                return(
                                    <ProductCard key={i} product={v}/>
                                )
                            })
                        }
                    </div>
                    {/* <div class="w-full text-center">
                        <button type="button" class="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">Show more</button>
                    </div> */}
                </div>
            </section>
        </>
    )
}
