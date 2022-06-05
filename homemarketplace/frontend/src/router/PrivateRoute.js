import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import loader from '../loader.gif'

const PrivateRoute = ({ children }) => {
  const auth = useSelector((state) => state.auth)

  if (auth.isLoading) {
    return (
      <div className='h-screen h-full'>
        <div className='w-full min-h-screen'>
          <div className='flex justify-center items-center'>
            <img src={loader} className='mx-auto' alt='' />
          </div>
        </div>
      </div>
    )
  } else if (!auth.isAuthenticated) {
    return <Navigate to={'/login'} replace />
  } else {
    return <>{children}</>
  }
}

export default PrivateRoute
