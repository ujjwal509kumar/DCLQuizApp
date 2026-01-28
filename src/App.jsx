import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Button } from "@/components/ui/button"
import './App.css'

function App() {
  return (
    <>
      <p className='flex flex-col text-center text-stone-800'>Hello world</p>
      <Button onClick={()=>alert("Hello world")} variant="outline">Click here</Button>
    </>
  )
}

export default App
