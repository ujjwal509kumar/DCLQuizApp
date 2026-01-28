import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Button } from "@/components/ui/button"
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from './components/mode-toggle'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import './App.css'
import { Navbar } from './components/Navbar'

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <div>
          <Navbar/>
          <ModeToggle />
          <h1>Your App Content</h1>
          <UserButton />
        </div>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </ThemeProvider>
    </>
  )
}

export default App
