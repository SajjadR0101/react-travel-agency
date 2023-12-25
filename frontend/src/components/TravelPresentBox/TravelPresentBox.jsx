import React from 'react'
import ImageCover from '../ImageCover/ImageCover'
import Button from '../Button/Button'

export default function TravelPresentBox({ imageSrc, title, subTitle, price }) {
  return (
    <div className='relative h-[480px] rounded-2xl overflow-hidden p-6 flex flex-col justify-end'>
        <ImageCover src={imageSrc} alt={title} wrapperClassName='!absolute inset-0 overflow-hidden -z-10' />
        <div>
            <div className='text-white font-MontserratSemiBold text-2xl flex justify-between items-end gap-x-2'>
                <div className='flex flex-col'>
                    <h4>{title}</h4>
                    <span className='text-sm font-Montserrat line-clamp-1'>{subTitle}</span>
                </div>
                <span className='shrink-0'>$ {price}</span>
            </div>
            <Button title='Book Flight' size='lg' className='w-full mt-4' />
        </div>
    </div>
  )
}
