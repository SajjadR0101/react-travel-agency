import React from 'react'

export default function CustomCheckBox({ children, isActive, onClick }) {
  return (
    <div className={`flex items-center justify-between gap-x-6 sm:gap-x-16 p-4 rounded-xl transition-all cursor-pointer ${isActive ? 'bg-primary ring-1 ring-offset-2 ring-slate-200' : 'hover:bg-slate-50'}`} onClick={onClick}>
        {children}
        <div className={`w-6 h-6 rounded-full border-[3px] flex-center shrink-0 ${isActive ? 'border-white' : 'border-slate-300'}`}>
            <div className={`w-3 h-3 rounded-full bg-white ${!isActive && 'opacity-0'}`}></div>
        </div>
    </div>
  )
}
