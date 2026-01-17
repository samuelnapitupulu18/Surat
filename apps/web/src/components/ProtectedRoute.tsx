import { Navigate, Outlet } from 'react-router-dom'
import { auth } from '@/lib/auth'

export const ProtectedRoute = () => {
    if (!auth.isAuthenticated()) {
        return <Navigate to="/login" replace />
    }

    return <Outlet />
}
