import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import App from './App.jsx'
import Auth from './Auth/index.jsx'
import './index.css'
import {ClerkProvider} from '@clerk/clerk-react'
import EditExpense from './components/EditExpense.jsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <Routes>
        <Route path='/' element={<Auth/>}>
          <Route index element={<App/>}/>
          <Route path='/edit/:id' element={<EditExpense/>}/>
        </Route>
      </Routes>
    </ClerkProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
