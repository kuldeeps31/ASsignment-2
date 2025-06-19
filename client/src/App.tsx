//import { useState } from 'react'

import './App.css'
import { Routes,Route } from 'react-router-dom'
import SignupPage from './pages/SignupPage'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
//import SigninPopup from './pages/SigninPage'
function App() {
  //const [count, setCount] = useState(0)

  return (
   

    <Routes>
    +  <Route path="/signup" element={<SignupPage />} />
   <Route path="/" element={<SignupPage />} />
   {/*<Route path="/signin" element={<SigninPopup />} />*/}
   <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
    </Routes>
  )
}

export default App




