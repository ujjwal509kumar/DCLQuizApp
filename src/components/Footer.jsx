import React from "react"
import { Link } from "react-router-dom"
import { Zap } from "lucide-react"

export function Footer() {
    return (
        <footer className="bg-background border-t">
            <div className="container px-5 py-12 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">

                {/* BRAND SECTION */}
                <div className="w-64 shrink-0 md:mx-0 mx-auto text-center md:text-left">
                    <Link to="/" className="flex title-font font-medium items-center md:justify-start justify-center text-primary">
                        <div className="bg-primary/10 p-2 rounded-lg">
                            <Zap className="h-5 w-5" />
                        </div>
                        <span className="ml-3 text-xl font-bold tracking-tight">QuizApp</span>
                    </Link>
                    <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                        Test your knowledge, challenge your friends, and climb the global leaderboard.
                    </p>
                </div>

                {/* LINKS SECTION */}
                <div className="grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center justify-end">
                    <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                        <h2 className="title-font font-semibold text-foreground tracking-widest text-xs mb-4">PLATFORM</h2>
                        <nav className="list-none mb-10 space-y-3">
                            <li>
                                <Link to="/leaderboard" className="text-muted-foreground hover:text-primary transition-colors text-sm">Leaderboard</Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm">About Us</Link>
                            </li>
                        </nav>
                    </div>
                </div>

            </div>

            {/* BOTTOM INFO (Merged Up) */}
            <div className="border-t border-muted/40">
                <div className="container mx-auto py-6 px-5 flex flex-wrap flex-col sm:flex-row justify-between items-center">
                    <p className="text-muted-foreground text-sm text-center sm:text-left">
                        © 2026 QuizApp 
                    </p>

                    <span className="inline-flex sm:mt-0 mt-4 justify-center sm:justify-start items-center">
                        <span className="text-muted-foreground text-sm flex items-center gap-1">
                            Crafted with <span className="text-red-500 animate-pulse mx-1">&#10084;</span> and
                            <code className="bg-primary/10 text-primary px-1.5 py-0.5 rounded text-xs font-mono border border-primary/20">
                                &lt;/Code&gt;
                            </code>
                        </span>
                    </span>
                </div>
            </div>
        </footer>
    )
}