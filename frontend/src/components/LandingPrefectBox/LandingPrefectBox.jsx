import React from 'react'
import Button from '../Button/Button'
import Svg from '../Svg/Svg'

export default function LandingPrefectBox({ bgClass, title, desc, btnTitle, to }) {
  return (
    <div className={`min-h-[600px] rounded-3xl flex flex-col justify-end p-6 ${bgClass} bg-cover bg-center`}>
        <div className='text-center text-white max-w-[390px] mx-auto flex flex-col items-center'>
            <h3 className='text-[40px] font-TradeGothic font-bold'>{title}</h3>
            <p className='mt-2 mb-4'>{desc}</p>
            <Button title={btnTitle} to={to} size="lg" beforeIcon={<Svg iconID="paper-plane" className="w-5 h-5 -rotate-45" />} />
        </div>
    </div>
  )
}
