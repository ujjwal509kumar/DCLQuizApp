import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SignInButton, SignedIn, SignedOut } from "@clerk/clerk-react"
import { Brain, Trophy, Clock, Users } from "lucide-react"

export function LandingPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            {/* Hero Section */}
            <div className="text-center mb-16">
                <h1 className="text-5xl font-bold mb-4">Welcome to QuizApp</h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Test your knowledge with thousands of trivia questions from Open Trivia Database.
                    Challenge yourself across multiple categories and difficulty levels!
                </p>

                <SignedOut>
                    <SignInButton mode="modal">
                        <Button size="lg" className="text-lg px-8 py-6">
                            Sign In to Start Playing
                        </Button>
                    </SignInButton>
                    <p className="text-sm text-muted-foreground mt-4">
                        You need to sign in to start playing quizzes
                    </p>
                </SignedOut>

                <SignedIn>
                    <Button size="lg" className="text-lg px-8 py-6">
                        Start Quiz
                    </Button>
                </SignedIn>
            </div>

            {/* Features Section */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                <Card>
                    <CardHeader>
                        <Brain className="h-10 w-10 mb-2 text-primary" />
                        <CardTitle>Multiple Categories</CardTitle>
                        <CardDescription>
                            Choose from various categories including Science, History, Sports, and more
                        </CardDescription>
                    </CardHeader>
                </Card>

                <Card>
                    <CardHeader>
                        <Trophy className="h-10 w-10 mb-2 text-primary" />
                        <CardTitle>Track Your Score</CardTitle>
                        <CardDescription>
                            Compete with yourself and improve your knowledge with every quiz
                        </CardDescription>
                    </CardHeader>
                </Card>

                <Card>
                    <CardHeader>
                        <Clock className="h-10 w-10 mb-2 text-primary" />
                        <CardTitle>Timed Challenges</CardTitle>
                        <CardDescription>
                            Test your speed and accuracy with time-based quiz challenges
                        </CardDescription>
                    </CardHeader>
                </Card>

                <Card>
                    <CardHeader>
                        <Users className="h-10 w-10 mb-2 text-primary" />
                        <CardTitle>Community Driven</CardTitle>
                        <CardDescription>
                            Join thousands of quiz enthusiasts and challenge your knowledge
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>

            {/* How It Works Section */}
            <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>1. Sign In</CardTitle>
                            <CardDescription>
                                Create your account or sign in to get started with QuizApp
                            </CardDescription>
                        </CardHeader>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>2. Choose Your Quiz</CardTitle>
                            <CardDescription>
                                Select a category and difficulty level that matches your interest and skill
                            </CardDescription>
                        </CardHeader>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>3. Answer Questions</CardTitle>
                            <CardDescription>
                                Test your knowledge with multiple-choice questions from Open Trivia Database
                            </CardDescription>
                        </CardHeader>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>4. View Your Results</CardTitle>
                            <CardDescription>
                                Check your score, review answers, and track your progress over time
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </div>
            </div>

            {/* CTA Section */}
            <SignedOut>
                <div className="text-center mt-16">
                    <h2 className="text-3xl font-bold mb-4">Ready to Test Your Knowledge?</h2>
                    <p className="text-muted-foreground mb-6">
                        Sign in now and start your quiz journey today!
                    </p>
                    <SignInButton mode="modal">
                        <Button size="lg" className="text-lg px-8 py-6">
                            Get Started Now
                        </Button>
                    </SignInButton>
                </div>
            </SignedOut>
        </div>
    )
}