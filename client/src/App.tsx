//import { useState } from 'react'

import './App.css'
import { Routes,Route } from 'react-router-dom'
import SignupPage from './pages/SignupPage'
import Dashboard from './pages/Dashboard'

function App() {
  //const [count, setCount] = useState(0)

  return (
   

    <Routes>
      <Route path="/" element={<SignupPage />} />
        //     {/*<Route path="/" element={<SignupPage />} />
        //<Route path="/signin" element={<SigninPage />} />
        //<Route path="/dashboard" element={<Dashboard />} />*/}

<Route path="/dashboard" element={<Dashboard />} />

    </Routes>
  )
}

export default App




