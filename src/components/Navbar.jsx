import { Link } from 'react-router-dom'
import { ModeToggle } from './mode-toggle'
import { Button } from "@/components/ui/button"
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'

export function Navbar() {
    return (
        <nav className="border-b">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link to="/">
                        <h1 className="text-2xl font-bold cursor-pointer">QuizApp</h1>
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    <Link to="/">
                        <Button variant="ghost">Home</Button>
                    </Link>
                    <SignedIn>
                        <Link to="/quiz">
                            <Button variant="ghost">Quiz</Button>
                        </Link>
                        <Link to="/leaderboard">
                            <Button variant="ghost">Leaderboard</Button>
                        </Link>
                    </SignedIn>
                    <Link to="/about">
                        <Button variant="ghost">About</Button>
                    </Link>

                    <ModeToggle />

                    <SignedOut>
                        <SignInButton mode="modal" forceRedirectUrl="/Quiz">
                            <Button>Sign In</Button>
                        </SignInButton>
                    </SignedOut>

                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </div>
        </nav>
    )
}