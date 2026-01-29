import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from './components/Navbar'
import { LandingPage } from './components/LandingPage'
import './App.css'

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Router>
        <div className="min-h-screen">
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            {/* Add more routes here as you build more pages */}
            {/* <Route path="/quiz" element={<QuizPage />} /> */}
            {/* <Route path="/leaderboard" element={<Leaderboard />} /> */}
            {/* <Route path="/about" element={<About />} /> */}
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App