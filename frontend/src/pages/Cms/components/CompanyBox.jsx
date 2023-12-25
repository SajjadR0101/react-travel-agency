import React from 'react'
import ImageCover from '../../../components/ImageCover/ImageCover'
import ActiveDot from './ActiveDot'
import Svg from '../../../components/Svg/Svg'

export default function CompanyBox({ image, name, onRemove = () => {} }) {
  return (
    <div className='relative bg-white p-4 rounded-lg shadow-box flex items-center gap-x-6 h-24'>
        <ImageCover src={image} wrapperClassName='max-w-[100px]' />
        <div className='flex flex-col gap-y-1 text-xl font-MontserratMedium text-slate-600'>
            <span>{name}</span>
            <div className='text-xs flex items-center gap-x-2'>
                <ActiveDot />
                Active
            </div>
        </div>
        <button className='absolute right-2 top-2 text-slate-300 p-1 rounded-full transition-all hover:bg-slate-50/70' onClick={onRemove}>
            <Svg iconID='x-mark' className='w-5 h-5' />
        </button>
    </div>
  )
}
