import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SignInButton, SignedIn, SignedOut } from "@clerk/clerk-react"
import { Brain, Clock, Trophy, ArrowRight, Zap, CheckCircle2 } from "lucide-react"
import { useNavigate } from "react-router-dom"

export function LandingPage() {
    const navigate = useNavigate()
    return (
        <div className="relative min-h-screen bg-background text-foreground overflow-hidden">

            {/* Background Decor: Dot Pattern & Gradients */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[14px_24px]"></div>
            <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-77.5 w-77.5 rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>
            <div className="container mx-auto px-4 py-20 md:py-32 space-y-32">

                {/* HERO SECTION */}
                <section className="text-center space-y-8 max-w-4xl mx-auto relative animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <Badge variant="secondary" className="px-4 py-2 text-sm rounded-full border-primary/20 bg-primary/5 text-primary">
                        <Zap className="mr-2 h-3 w-3 fill-primary" />
                        Powered by Open Trivia Database
                    </Badge>

                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
                        Master your knowledge <br className="hidden md:block" />
                        <span className="bg-linear-to-r from-primary via-purple-500 to-blue-600 bg-clip-text text-transparent">
                            one question at a time.
                        </span>
                    </h1>

                    <p className="mx-auto max-w-2xl text-xl text-muted-foreground leading-relaxed">
                        QuizApp creates a distraction-free environment for you to test your skills across science, history, and tech. No clutter, just pure trivia.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                        <SignedOut>
                            <SignInButton mode="modal" forceRedirectUrl="/quiz">
                                <Button size="xl" className="h-14 px-8 text-lg rounded-full shadow-lg shadow-primary/20 transition-transform hover:scale-105">
                                    Get Started
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </SignInButton>
                            <Button size="xl" variant="outline" className="h-14 px-8 text-lg rounded-full">
                                View Leaderboard
                            </Button>
                        </SignedOut>

                        <SignedIn>
                            <Button
                                size="xl"
                                className="h-14 px-10 text-lg rounded-full shadow-lg shadow-primary/20"
                                onClick={() => navigate('/quiz')}
                            >
                                Jump Back In <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </SignedIn>
                    </div>
                </section>

                {/* FEATURES GRID */}
                <section>
                    <div className="mb-12 text-center">
                        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Why QuizApp?</h2>
                        <p className="mt-4 text-muted-foreground">Everything you need to sharpen your mind.</p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-3">
                        {[
                            {
                                icon: Brain,
                                color: "text-rose-500",
                                bg: "bg-rose-500/10",
                                title: "Curated Categories",
                                desc: "Dive deep into Science, History, Sports, Tech and pop culture.",
                            },
                            {
                                icon: Clock,
                                color: "text-blue-500",
                                bg: "bg-blue-500/10",
                                title: "Speed Challenges",
                                desc: "Test your reflex and accuracy with timed sprint modes.",
                            },
                            {
                                icon: Trophy,
                                color: "text-amber-500",
                                bg: "bg-amber-500/10",
                                title: "Instant Analytics",
                                desc: "Get a detailed breakdown of your strengths and weaknesses instantly.",
                            },
                        ].map((item, index) => (
                            <Card
                                key={item.title}
                                className="group relative border-muted/60 bg-linear-to-b from-background to-muted/20 transition-all hover:border-primary/50 hover:shadow-md"
                            >
                                <CardHeader>
                                    <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${item.bg}`}>
                                        <item.icon className={`h-6 w-6 ${item.color}`} />
                                    </div>
                                    <CardTitle className="text-xl group-hover:text-primary transition-colors">{item.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* HOW IT WORKS */}
                <section className="mx-auto max-w-4xl space-y-16">
                    <h2 className="text-center text-3xl font-bold md:text-4xl">
                        Start in seconds
                    </h2>

                    <div className="relative grid gap-8 md:grid-cols-2">
                        {/* Connecting line for desktop */}
                        <div className="absolute left-1/2 top-0 bottom-0 hidden w-px bg-linear-to-b from-transparent via-muted-foreground/30 to-transparent md:block" />

                        {[
                            "Create your free account",
                            "Select your favorite topic",
                            "Challenge the clock",
                            "Climb the global ranks",
                        ].map((step, index) => (
                            <div
                                key={step}
                                className={`relative flex items-center gap-6 rounded-2xl border bg-card p-6 shadow-sm transition-all hover:shadow-md ${index % 2 === 0 ? "md:mr-12 md:text-right md:flex-row-reverse" : "md:ml-12"
                                    }`}
                            >
                                {/* Number Badge */}
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/30">
                                    {index + 1}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">{step}</h3>
                                    <p className="text-sm text-muted-foreground mt-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA SECTION */}
                <section className="relative overflow-hidden rounded-3xl bg-primary px-6 py-20 text-center text-primary-foreground shadow-2xl">
                    {/* Decorative circles */}
                    <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
                    <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>

                    <div className="relative z-10 space-y-8">
                        <h2 className="text-3xl font-bold md:text-5xl">
                            Ready to prove your smarts?
                        </h2>
                        <p className="mx-auto max-w-lg text-primary-foreground/80 text-lg">
                            Join thousands of quiz enthusiasts and start climbing the leaderboard today.
                        </p>

                        <SignInButton mode="modal" forceRedirectUrl="/quiz">
                            <Button size="lg" variant="secondary" className="h-12 px-8 font-semibold text-primary shadow-lg hover:bg-white/90">
                                Start Quizzing Now
                            </Button>
                        </SignInButton>

                        <div className="flex justify-center gap-8 pt-4 text-sm font-medium text-primary-foreground/60">
                            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> No credit card</div>
                            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> Free forever</div>
                        </div>
                    </div>
                </section>

                {/* FOOTER SPACER */}
                <div className="h-12"></div>
            </div>
        </div>
    )
}