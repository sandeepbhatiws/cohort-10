import React, { useState } from 'react'
import ServiceCard from './ServiceCard'
import servicesData from '../data/dataServices'

export default function Services() {

    const [services, setServices] = useState(servicesData)

    return (
        <>
            <div class="bg-white">
                <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
                    <h2 class="text-3xl text-center font-bold tracking-tight text-gray-900">Our Services</h2>
                    <p className='text-center tracking-tight text-gray-900 text-1xl pt-4'>Discover professional, reliable solutions designed to meet your needs. From expert guidance to seamless execution, we’re here to make every step simple and effective.</p>

                    <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {
                            services.map((v, i) => {
                                return(
                                    <ServiceCard item={v}/>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

        </>
    )
}
