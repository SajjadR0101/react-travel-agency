import React from 'react'
import Svg from '../Svg/Svg'

export default function HotelOverViewBox({ text, iconID, className }) {
  return (
    <div className={`border border-primary rounded-xl p-4 h-32 w-40 flex flex-col justify-between ${className}`}>
        <Svg iconID={iconID} className='w-8 h-8' />
        <span className='font-MontserratMedium text-sm'>{text}</span>
    </div>
  )
}
