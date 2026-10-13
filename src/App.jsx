import { useState } from 'react'

import './App.css'
import { Button } from '@heroui/react'
import { Todos } from './assets/Todos'
import { Login } from '../components/Login'

function App() {
 const [isLoggedIn, setisLoggedIn] = useState(false)


  return (
<div className='bg-indigo-950 text-indigo-50 min-h-screen relative'>

{isLoggedIn ?  <Todos setisLoggedIn={setisLoggedIn}/> : <Login setisLoggedIn={setisLoggedIn}/>}
</div>
  
)}

export default App
