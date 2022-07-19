import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStatus } from '../hooks/useAuthStatus'
import Spinner from './Spinner'

const PrivateRoute = () => {
  const { checkingStatus, adminAccount } = useAuthStatus()

  if (checkingStatus) {
    return <Spinner />
  }

  return adminAccount ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateRoute
