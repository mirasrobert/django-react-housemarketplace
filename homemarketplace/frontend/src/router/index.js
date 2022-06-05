import { useRoutes } from 'react-router-dom'

import App from '../App'
import Login from '../pages/Login'
import PrivateRoute from './PrivateRoute'

// Define Routes
const routes = [
  {
    path: '/',
    element: (
      <PrivateRoute>
        <App />
      </PrivateRoute>
    ),
  },
  { path: '/login', element: <Login /> },
]

export default function Router() {
  return useRoutes(routes)
}
