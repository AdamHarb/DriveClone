import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Signup from './components/Auth/SignUp/Signup'
import './components/Auth/SignUp/Signup.css';
import Login from './components/Auth/Login/Login';
import './components/Auth/Login/Login.css'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <Login />
    </>
  )
}

export default App
