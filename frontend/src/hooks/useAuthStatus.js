import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [checkingStatus, setCheckingStatus] = useState(true)
  const [adminAccount, setAdminAccount] = useState(false)

  const { user } = useSelector((state) => state.auth)
  const { isAdmin } = useSelector((state) => state.auth.user)

  useEffect(() => {
    if (isAdmin) {
      setAdminAccount(true)
    } else {
      setAdminAccount(false)
    }

    setCheckingStatus(false)

    return
  }, [isAdmin])

  useEffect(() => {
    if (user) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }

    setCheckingStatus(false)

    return
  }, [user])

  return { loggedIn, checkingStatus, adminAccount }
}
