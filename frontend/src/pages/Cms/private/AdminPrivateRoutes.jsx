import React, { useContext } from 'react'
import AuthContext from '../../../context/AuthContext'
import { Navigate } from 'react-router-dom'
import PageLoader from '../../../components/PageLoader/PageLoader'

export default function AdminPrivateRoutes({ children }) {
    const authCountext = useContext(AuthContext)
    const isPendding = authCountext.isPendding
    const role = authCountext.userInfo?.role

    return (
        <PageLoader isPendding={isPendding}>
            {
                role === 'admin' ? children : <Navigate to='/account' replace />
            }
        </PageLoader>
    )
}
