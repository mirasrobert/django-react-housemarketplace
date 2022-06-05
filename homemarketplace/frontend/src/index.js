import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'

import { BrowserRouter } from 'react-router-dom'
import Router from './router'

import { Provider } from 'react-redux'
import { store } from './store'

import { getUser } from './features/auth/authSlice'

const root = ReactDOM.createRoot(document.getElementById('root'))

store
  .dispatch(getUser())
  .then(() => {
    root.render(
      <React.StrictMode>
        <Provider store={store}>
          <BrowserRouter>
            <Router></Router>
          </BrowserRouter>
        </Provider>
      </React.StrictMode>
    )
  })
  .catch(() => console.error('Unauthorized'))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
