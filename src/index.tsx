import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import App from './App'

import 'core-js'
import 'react-toastify/dist/ReactToastify.css'

import { ToastContainer } from 'react-toastify'
import { persistor, store } from './pages/redux/store'

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <ToastContainer position="top-right" autoClose={5000} />
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
