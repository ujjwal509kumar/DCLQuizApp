import React from "react"
import { Link } from "react-router-dom"
import { Zap } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export function Footer() {
    return (
        <footer className="bg-background border-t">
            <div className="container mx-auto px-6 py-10">
                
                {/* TOP SECTION: Horizontal Layout */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
                    
                    {/* LEFT: Brand & Tagline */}
                    <div className="text-center md:text-left space-y-1">
                        <Link to="/" className="flex items-center justify-center md:justify-start gap-2 text-primary">
                            <div className="bg-primary/10 p-1.5 rounded-lg">
                                <Zap className="h-5 w-5" />
                            </div>
                            <span className="text-xl font-bold tracking-tight">QuizApp</span>
                        </Link>
                        <p className="text-sm text-muted-foreground">
                            Gamifying knowledge, one question at a time.
                        </p>
                    </div>

                    {/* RIGHT: Links (Horizontal Row) */}
                    <nav className="flex flex-wrap justify-center gap-8">
                        <Link to="/leaderboard" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                            Leaderboard
                        </Link>
                        <Link to="/about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                            About Us
                        </Link>
                    </nav>
                </div>

                <Separator className="opacity-50" />

                {/* BOTTOM SECTION */}
                <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
                    <p>© 2026 QuizApp. All rights reserved.</p>

                    <div className="flex items-center gap-1.5">
                        <span>Crafted with</span>
                        <span className="text-red-500 animate-pulse text-sm">&#10084;</span>
                        <span>and</span>
                        <code className="bg-primary/10 text-primary px-1.5 py-0.5 rounded text-[10px] font-mono border border-primary/20">
                            &lt;/Code&gt;
                        </code>
                        <span>in Bengaluru</span>
                    </div>
                </div>

            </div>
        </footer>
    )
}