import React from "react"
import {Code2, Database, Layout, Sparkles,Globe, Heart, Zap, Shield} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export function AboutPage() {
    return (
        <div className="min-h-screen bg-background relative overflow-hidden">

            {/* Background Decor */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[14px_24px]"></div>
            <div className="absolute right-0 top-0 -z-10 h-100 w-100 bg-primary/10 blur-[100px] rounded-full"></div>
            <div className="absolute left-0 bottom-0 -z-10 h-100 w-100 bg-blue-500/10 blur-[100px] rounded-full"></div>

            <div className="container mx-auto px-4 py-16 max-w-5xl space-y-20">

                {/* HERO SECTION */}
                <div className="text-center space-y-6 max-w-3xl mx-auto">
                    <Badge variant="outline" className="px-4 py-1 border-primary/20 bg-primary/5 text-primary mb-4">
                        About The Project
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
                        We make learning <br />
                        <span className="bg-linear-to-r from-primary via-purple-500 to-blue-600 bg-clip-text text-transparent">
                            fun and accessible.
                        </span>
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        QuizApp is designed to test your knowledge across the globe.
                        Whether you are a trivia master or just curious, we have a challenge for you.
                    </p>
                </div>

                {/* STATS / MISSION */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: Zap,
                            title: "Lightning Fast",
                            desc: "Built on Vite for instant page loads and seamless transitions."
                        },
                        {
                            icon: Globe,
                            title: "Global Topics",
                            desc: "Over 24+ categories ranging from Science to Japanese Anime."
                        },
                        {
                            icon: Heart,
                            title: "User Focused",
                            desc: "Clean UI, dark mode support, and distraction-free gaming."
                        }
                    ].map((item, i) => (
                        <Card key={i} className="border-muted/50 bg-background/50 backdrop-blur-sm hover:border-primary/50 transition-colors">
                            <CardHeader>
                                <item.icon className="h-10 w-10 text-primary mb-2" />
                                <CardTitle>{item.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{item.desc}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <Separator className="bg-muted/60" />

                {/* TECH STACK SECTION */}
                <div className="space-y-10">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold tracking-tight mb-4">Built with Modern Tech</h2>
                        <p className="text-muted-foreground">Under the hood of QuizApp.</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { name: "React 19", icon: Code2, color: "text-blue-500", bg: "bg-blue-500/10" },
                            { name: "Tailwind CSS", icon: Layout, color: "text-cyan-500", bg: "bg-cyan-500/10" },
                            { name: "Shadcn UI", icon: Sparkles, color: "text-zinc-900 dark:text-zinc-100", bg: "bg-zinc-500/10" },
                            { name: "MongoDB", icon: Database, color: "text-green-500", bg: "bg-green-500/10" },
                            { name: "Clerk Auth", icon: Shield, color: "text-purple-500", bg: "bg-purple-500/10" },
                            { name: "OpenTDB API", icon: Globe, color: "text-orange-500", bg: "bg-orange-500/10" },
                            { name: "Vite", icon: Zap, color: "text-yellow-500", bg: "bg-yellow-500/10" },
                        ].map((tech) => (
                            <div key={tech.name} className="flex items-center gap-3 p-4 rounded-xl border bg-card hover:shadow-md transition-all">
                                <div className={`p-2 rounded-lg ${tech.bg} ${tech.color}`}>
                                    <tech.icon className="h-5 w-5" />
                                </div>
                                <span className="font-semibold text-sm">{tech.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}