import React from 'react'

export default function FaqCard({item, index, currentIndex, setCurrentIndex}) {

    const changeQuestion = (i) => {
        if(currentIndex == i){
            setCurrentIndex(-1)
        } else {
            setCurrentIndex(i)
        }
    }

    return (
        <>
            <div class="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:border-blue-200 hover:shadow-md">
                <div class="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 text-lg font-semibold text-slate-800" onClick={ () => changeQuestion(index) }>
                    <span>{item.question}</span>

                    <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-all duration-300 group-open:rotate-45 group-open:bg-blue-600 group-open:text-white">
                        {
                            currentIndex == index
                            ?
                            '-'
                            :
                            '+'
                        }
                    </span>
                </div>

                <div class={ currentIndex == index ? 'px-6 pb-6 text-slate-600' : 'px-6 pb-6 text-slate-600 hidden' }>
                    <p class="leading-7">
                        {item.answer}
                    </p>
                </div>
            </div>
        </>
    )
}
