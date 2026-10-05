import React from 'react'

export default function ServiceCard({item}) {

    console.log(item)

    return (
        <>
            <div class="group relative">
                <img src={item.image} alt={item.title} class="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80" />
                <div class="mt-4 flex justify-between">
                    <div>
                        <h3 class="text-sm text-gray-700 font-bold">
                            <a href="#">
                                <span aria-hidden="true" class="absolute inset-0"></span>
                                {item.title}
                            </a>
                        </h3>
                        <p class="mt-1 text-sm text-gray-500">{item.description}</p>
                    </div>
                </div>
            </div>
        </>
    )
}
