import React from 'react'

export default function HeaderOfPage({ className, title, subTitle }) {
  return (
    <header className={className}>
        <div className="container">
            <div className='text-white max-w-[440px] text-center mx-auto md:mx-0 md:text-start'>
                <h1 className='font-TradeGothic font-bold text-3xl xs:text-4xl/[44px] md:text-[45px]/[67.5px] '>{title}</h1>
                <span className='block mt-2 font-MontserratMedium xs:text-xl'>{subTitle}</span>
            </div>
        </div>
    </header>
  )
}
