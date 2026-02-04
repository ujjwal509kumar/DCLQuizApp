import React from "react"
import { Link } from "react-router-dom"
import { Zap } from "lucide-react"

export function Footer() {
    return (
        <footer className="bg-background border-t pt-12 pb-8">
            <div className="container mx-auto px-4">
                
                {/* TOP SECTION: Content & Links */}
                <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
                    
                    {/* LEFT: Brand & Description */}
                    <div className="space-y-4 max-w-sm">
                        <Link to="/" className="flex items-center gap-2 text-primary">
                            <div className="bg-primary/10 p-2 rounded-lg">
                                <Zap className="h-5 w-5 fill-current" />
                            </div>
                            <span className="text-xl font-bold tracking-tight">QuizApp</span>
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            The ultimate platform to test your trivia skills. 
                            Challenge friends, climb the global leaderboard, 
                            and master over 20+ categories of knowledge.
                        </p>
                    </div>

                    {/* RIGHT: Navigation Links */}
                    <div className="flex flex-col space-y-3">
                        <h3 className="font-semibold text-foreground text-sm tracking-wider uppercase">
                            Explore
                        </h3>
                        <nav className="flex flex-col space-y-2 text-sm text-muted-foreground">
                            <Link to="/leaderboard" className="hover:text-primary transition-colors">Global Leaderboard</Link>
                            <Link to="/about" className="hover:text-primary transition-colors">About the Project</Link>
                        </nav>
                    </div>
                </div>

                {/* DIVIDER */}
                <div className="border-t border-muted/40 my-8"></div>

                {/* BOTTOM SECTION: Copyright & Crafted With */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-muted-foreground">
                        © 2026 - QuizApp
                    </p>

                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <span>Crafted with</span>
                        <span className="text-red-500 animate-pulse">&#10084;</span>
                        <span>&</span>
                        <code className="bg-primary/10 text-primary px-1 py-0.5 rounded text-[10px] font-mono border border-primary/20">
                            &lt;/Code&gt;
                        </code>
                    </div>
                </div>

            </div>
        </footer>
    )
}