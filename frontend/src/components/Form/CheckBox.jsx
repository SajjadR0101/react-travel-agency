import React from 'react'

export default function CheckBox({ title, id }) {
  return (
    <div className='flex items-center gap-x-2 font-MontserratMedium text-xs sm:text-sm'>
        <input type="checkbox" id={id} className='w-4 sm:w-5 h-4 sm:h-5 accent-primary' />
        <label htmlFor={id}>{title}</label>
    </div>
  )
}
