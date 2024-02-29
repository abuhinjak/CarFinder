import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import HomeScreen from './screens/HomeScreen.jsx'
import MakeScreen from './screens/MakeScreen.jsx'
import ModelScreen from './screens/ModelScreen.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/' element={<HomeScreen />} />
      <Route path='/:search' element={<HomeScreen />} />
      <Route path='makes/:id' element={<MakeScreen />} />
      <Route path='model/:id' element={<ModelScreen />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
