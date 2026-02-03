import { Link } from 'react-router-dom'
import { ModeToggle } from './mode-toggle'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import { Menu, Zap } from "lucide-react"

export function Navbar() {

    // Helper to render links so we don't repeat code for mobile/desktop
    const NavLinks = ({ className, onClick }) => (
        <>
            <Link to="/" onClick={onClick}>
                <Button variant="ghost" className={className}>Home</Button>
            </Link>
            <SignedIn>
                <Link to="/quiz" onClick={onClick}>
                    <Button variant="ghost" className={className}>Quiz</Button>
                </Link>
                <Link to="/leaderboard" onClick={onClick}>
                    <Button variant="ghost" className={className}>Leaderboard</Button>
                </Link>
            </SignedIn>
            <Link to="/about" onClick={onClick}>
                <Button variant="ghost" className={className}>About</Button>
            </Link>
        </>
    )

    return (
        <nav className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">

                {/* LOGO */}
                <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-90">
                    <div className="bg-primary/10 p-2 rounded-lg">
                        <Zap className="h-5 w-5 text-primary" />
                    </div>
                    <h1 className="text-xl font-bold tracking-tight">QuizApp</h1>
                </Link>

                {/* DESKTOP MENU (Hidden on Mobile) */}
                <div className="hidden md:flex items-center gap-2">
                    <NavLinks />
                    <div className="flex items-center gap-2 ml-4 border-l pl-4">
                        <ModeToggle />
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                        <SignedOut>
                            <SignInButton mode="modal" forceRedirectUrl="/Quiz">
                                <Button size="sm">Sign In</Button>
                            </SignInButton>
                        </SignedOut>
                    </div>
                </div>

                {/* MOBILE MENU (Visible only on small screens) */}
                <div className="flex items-center gap-2 md:hidden">
                    <ModeToggle />

                    <SignedIn>
                        <UserButton />
                    </SignedIn>

                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="-mr-2">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[80%] sm:w-96.25">
                            <div className="flex flex-col gap-4 py-4">
                                <div className="flex items-center gap-2 mb-4 px-2">
                                    <div className="bg-primary/10 p-2 rounded-lg">
                                        <Zap className="h-5 w-5 text-primary" />
                                    </div>
                                    <span className="font-bold text-lg">QuizApp</span>
                                </div>

                                {/* Mobile Links Stack */}
                                <div className="flex flex-col gap-2">
                                    <NavLinks className="justify-start text-lg h-12" />
                                </div>

                                <SignedOut>
                                    <div className="mt-4 pt-4 border-t">
                                        <SignInButton mode="modal" forceRedirectUrl="/Quiz">
                                            <Button className="w-full" size="lg">Sign In</Button>
                                        </SignInButton>
                                    </div>
                                </SignedOut>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>

            </div>
        </nav>
    )
}