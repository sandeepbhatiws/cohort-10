import React, { useState } from 'react'
import faqsData from '../data/dataFaqs'
import FaqCard from './FaqCard';

export default function FrequentlyAskedQuestions() {

    const [faqs, setFaqs] = useState(faqsData);
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <>
            <section class="bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-4 py-20 sm:px-6 lg:px-8">
                <div class="mx-auto max-w-4xl">

                    {/* <!-- Header --> */}
                    <div class="mx-auto mb-12 max-w-2xl text-center">

                        <h2 class="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                            Frequently Asked Questions
                        </h2>

                        <p class="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
                            Everything you need to know about our services, process, pricing,
                            and ongoing support.
                        </p>
                    </div>

                    {/* <!-- FAQ --> */}
                    <div class="space-y-4">

                        {
                            faqs.map((v,i) => {
                                return(
                                    <FaqCard item={ v } index={i} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex}/>
                                )
                            })
                        }
                        
                    </div>
                </div>
            </section>
        </>
    )
}
