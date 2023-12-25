import React from 'react'
import { NavLink } from 'react-router-dom'
import TextByIcon from '../../../components/TextByIcon/TextByIcon'

export default function CmsSidebarItem({ title, to, iconID }) {
  return (
    <NavLink to={to} className='admin-panel__sidebar-link'>
        <TextByIcon text={title} className="flex items-center gap-x-2 font-MontserratSemiBold" iconID={iconID} iconClasses="w-7 h-7" />
    </NavLink>
  )
}
