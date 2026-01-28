import { ModeToggle } from './mode-toggle'
import { Button } from "@/components/ui/button"

export function Navbar() {
    return (
        <nav className="border-b">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold">QuizApp</h1>
                </div>

                <div className="flex items-center gap-4">
                    <Button variant="ghost">Home</Button>
                    <Button variant="ghost">Leaderboard</Button>
                    <Button variant="ghost">About</Button>
                    <ModeToggle />
                </div>
            </div>
        </nav>
    )
}