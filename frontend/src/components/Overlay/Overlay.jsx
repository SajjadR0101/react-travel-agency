import React, { memo } from 'react'

export default memo(function Overlay({ isShow, onClose }) {
  return (
    <div className={`fixed inset-0 bg-black/25 z-10 backdrop-blur-[2px] transition-all ${isShow ? 'visible opacity-100' : 'invisible opacity-0'}`} onClick={onClose}></div>
  )
})
