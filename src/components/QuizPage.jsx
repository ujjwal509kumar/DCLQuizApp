import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useUser } from "@clerk/clerk-react"

export function QuizPage() {
    const { user } = useUser()

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold mb-4">
                        Welcome to Quiz, {user?.firstName || 'Quiz Master'}!
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Choose your category and start testing your knowledge
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {[
                        { title: "Science", description: "Test your scientific knowledge", color: "bg-blue-500/10 border-blue-500/20" },
                        { title: "History", description: "Journey through time", color: "bg-amber-500/10 border-amber-500/20" },
                        { title: "Technology", description: "Modern tech questions", color: "bg-green-500/10 border-green-500/20" },
                        { title: "Sports", description: "Athletic achievements", color: "bg-red-500/10 border-red-500/20" },
                        { title: "Entertainment", description: "Movies, music & more", color: "bg-purple-500/10 border-purple-500/20" },
                        { title: "General Knowledge", description: "A bit of everything", color: "bg-gray-500/10 border-gray-500/20" }
                    ].map((category) => (
                        <Card key={category.title} className={`${category.color} hover:shadow-md transition-all cursor-pointer`}>
                            <CardHeader>
                                <CardTitle className="text-xl">{category.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground mb-4">{category.description}</p>
                                <Button className="w-full">Start Quiz</Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}