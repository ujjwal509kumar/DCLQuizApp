import React, { useState } from "react"
import axios from "axios"
import { useUser } from "@clerk/clerk-react"
import { BookOpen, Film, Music, Tv, Gamepad2, Dna, Monitor, Calculator, Globe, ScrollText, Palette, Car, User, Zap, Ghost, Smile, Brain, Trophy, Landmark, Loader2, RefreshCcw, ArrowRight, CheckCircle2, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

// Helper: Decode HTML entities from API
const decodeHtml = (html) => {
    const txt = document.createElement("textarea")
    txt.innerHTML = html
    return txt.value
}

// Full Category List
const CATEGORIES = [
    { id: 9, name: "General Knowledge", icon: Brain, color: "text-amber-500", bg: "bg-amber-500/10" },
    { id: 10, name: "Books", icon: BookOpen, color: "text-blue-500", bg: "bg-blue-500/10" },
    { id: 11, name: "Film", icon: Film, color: "text-rose-500", bg: "bg-rose-500/10" },
    { id: 12, name: "Music", icon: Music, color: "text-pink-500", bg: "bg-pink-500/10" },
    { id: 13, name: "Musicals & Theatres", icon: Music, color: "text-purple-500", bg: "bg-purple-500/10" },
    { id: 14, name: "Television", icon: Tv, color: "text-sky-500", bg: "bg-sky-500/10" },
    { id: 15, name: "Video Games", icon: Gamepad2, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { id: 16, name: "Board Games", icon: Gamepad2, color: "text-teal-500", bg: "bg-teal-500/10" },
    { id: 17, name: "Science & Nature", icon: Dna, color: "text-green-500", bg: "bg-green-500/10" },
    { id: 18, name: "Computers", icon: Monitor, color: "text-indigo-500", bg: "bg-indigo-500/10" },
    { id: 19, name: "Mathematics", icon: Calculator, color: "text-red-500", bg: "bg-red-500/10" },
    { id: 20, name: "Mythology", icon: Ghost, color: "text-violet-500", bg: "bg-violet-500/10" },
    { id: 21, name: "Sports", icon: Trophy, color: "text-orange-500", bg: "bg-orange-500/10" },
    { id: 22, name: "Geography", icon: Globe, color: "text-cyan-500", bg: "bg-cyan-500/10" },
    { id: 23, name: "History", icon: ScrollText, color: "text-yellow-600", bg: "bg-yellow-600/10" },
    { id: 24, name: "Politics", icon: Landmark, color: "text-slate-500", bg: "bg-slate-500/10" },
    { id: 25, name: "Art", icon: Palette, color: "text-fuchsia-500", bg: "bg-fuchsia-500/10" },
    { id: 26, name: "Celebrities", icon: User, color: "text-lime-500", bg: "bg-lime-500/10" },
    { id: 27, name: "Animals", icon: Smile, color: "text-amber-700", bg: "bg-amber-700/10" },
    { id: 28, name: "Vehicles", icon: Car, color: "text-red-600", bg: "bg-red-600/10" },
    { id: 29, name: "Comics", icon: Zap, color: "text-yellow-500", bg: "bg-yellow-500/10" },
    { id: 30, name: "Gadgets", icon: Monitor, color: "text-blue-400", bg: "bg-blue-400/10" },
    { id: 31, name: "Anime & Manga", icon: Ghost, color: "text-pink-600", bg: "bg-pink-600/10" },
    { id: 32, name: "Cartoons", icon: Smile, color: "text-orange-400", bg: "bg-orange-400/10" },
]

export function QuizPage() {
    const { user } = useUser()

    const [gameState, setGameState] = useState('menu')
    const [questions, setQuestions] = useState([])
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [score, setScore] = useState(0)
    const [loadingId, setLoadingId] = useState(null)

    // UI Interaction States
    const [selectedAnswer, setSelectedAnswer] = useState(null)
    const [isAnswerProcessed, setIsAnswerProcessed] = useState(false)

    // --- 1. START GAME ---
    const startGame = async (categoryId) => {
        setLoadingId(categoryId); // Show loading spinner

        try {
            // 1. Fetch data from API
            const url = `https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple&category=${categoryId}`;
            const response = await axios.get(url);
            const results = response.data.results;

            // 2. Format the questions properly
            const formattedQuestions = results.map((item) => {
                const correct = decodeHtml(item.correct_answer);
                const incorrect = item.incorrect_answers.map(ans => decodeHtml(ans));

                // Combine all answers and shuffle them roughly
                const allAnswers = [...incorrect, correct].sort(() => Math.random() - 0.5);

                return {
                    question: decodeHtml(item.question),
                    correctAnswer: correct,
                    answers: allAnswers,
                    category: decodeHtml(item.category)
                };
            });

            // 3. Update game state to start playing
            setQuestions(formattedQuestions);
            setScore(0);
            setCurrentQuestionIndex(0);
            setGameState('playing');

        } catch (error) {
            console.error("Could not fetch quiz:", error);
        } finally {
            setLoadingId(null); // Hide loading spinner
        }
    };

    // --- 2. HANDLE ANSWER ---
    const handleAnswer = (clickedAnswer) => {
        // Prevent double-clicking
        if (isAnswerProcessed) return;

        // 1. Lock the buttons and show colors
        setIsAnswerProcessed(true);
        setSelectedAnswer(clickedAnswer);

        // 2. Check if answer is correct
        const currentQuestion = questions[currentQuestionIndex];
        const isCorrect = clickedAnswer === currentQuestion.correctAnswer;

        // 3. Update score if correct
        if (isCorrect) {
            setScore((prevScore) => prevScore + 1);
        }

        // 4. Wait 1.5 seconds, then go to next question
        setTimeout(() => {
            const nextIndex = currentQuestionIndex + 1;

            if (nextIndex < questions.length) {
                // Move to next question
                setCurrentQuestionIndex(nextIndex);
                setIsAnswerProcessed(false); // Unlock buttons
                setSelectedAnswer(null);     // Reset selection
            } else {
                // Game Over - Pass the FINAL score (add 1 if the last one was correct)
                const finalScore = isCorrect ? score + 1 : score;
                finishGame(finalScore);
            }
        }, 1500);
    };

    // --- 3. FINISH & SAVE (Using Backend API) ---
    const finishGame = async (finalScore) => {
        setGameState('finished');

        // 1. Create the score object
        const newResult = {
            name: user?.firstName || "NO name given",
            email: user?.primaryEmailAddress?.emailAddress || "no email provided",
            score: finalScore,
            total: questions.length,
            category: questions[0].category,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString()
        };

        // 2. Save to Backend API
        try {
            const response = await fetch('https://dcl-quiz-app-backend.vercel.app/api/scores', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newResult)
            });

            if (response.ok) {
                const result = await response.json();
                console.log("Score saved to MongoDB:", result);
            } else {
                console.error("Failed to save score to backend");
            }
        } catch (error) {
            console.error("Could not save score:", error);
        }
    };

    // Helper for Button Styles
    const getButtonStyle = (answerText, currentQuestion) => {
        // Base style for all buttons
        let baseStyle = "h-14 text-lg justify-start px-6 transition-all border-2 ";

        // If we are NOT showing results yet (User hasn't clicked)
        if (!isAnswerProcessed) {
            return baseStyle + "hover:border-primary hover:bg-primary/5 hover:text-primary";
        }

        // If we ARE showing results (User clicked):

        // Case 1: This is the CORRECT answer -> Green
        if (answerText === currentQuestion.correctAnswer) {
            return baseStyle + "bg-green-100 border-green-500 text-green-700";
        }

        // Case 2: This is what user clicked, but it's WRONG -> Red
        if (answerText === selectedAnswer) {
            return baseStyle + "bg-red-100 border-red-500 text-red-700";
        }

        // Case 3: Not selected and not correct -> Fade it out
        return baseStyle + "opacity-50";
    };

    // --- RENDER: MENU ---
    if (gameState === 'menu') {
        return (
            <div className="min-h-screen bg-background p-4 md:p-12">
                <div className="container mx-auto max-w-6xl">
                    <div className="mb-10 space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight">Select a Topic</h1>
                        <p className="text-muted-foreground">Choose from {CATEGORIES.length} categories.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {CATEGORIES.map((category) => (
                            <Button
                                key={category.id}
                                variant="outline"
                                className={`h-auto py-4 px-4 justify-start gap-4 border-muted hover:border-primary/50 hover:bg-muted/30 ${loadingId === category.id ? 'border-primary bg-primary/5' : ''}`}
                                onClick={() => startGame(category.id)}
                                disabled={loadingId !== null}
                            >
                                <div className={`p-2 rounded-md ${category.bg} ${category.color}`}>
                                    {loadingId === category.id ? <Loader2 className="h-5 w-5 animate-spin" /> : <category.icon className="h-5 w-5" />}
                                </div>
                                <span className="font-semibold text-sm truncate">{category.name}</span>
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    // --- RENDER: PLAYING ---
    if (gameState === 'playing') {
        const currentQ = questions[currentQuestionIndex]
        const progress = ((currentQuestionIndex + 1) / questions.length) * 100

        return (
            <div className="min-h-screen flex items-center justify-center bg-background p-4">
                <Card className="w-full max-w-2xl border-2 shadow-xl">
                    <CardHeader className="pb-4">
                        <div className="flex justify-between items-center mb-4">
                            <Badge variant="secondary" className="text-xs uppercase tracking-widest">{currentQ.category}</Badge>
                            <span className="text-sm text-muted-foreground font-medium">Q{currentQuestionIndex + 1}/{questions.length}</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                    </CardHeader>
                    <CardContent className="space-y-8 pt-6">
                        <h2 className="text-2xl font-bold leading-relaxed text-center">{currentQ.question}</h2>
                        <div className="grid grid-cols-1 gap-3">
                            {currentQ.answers.map((ans, idx) => (
                                <Button
                                    key={idx}
                                    variant="outline"
                                    disabled={isAnswerProcessed}
                                    className={getButtonStyle(ans, currentQ)}
                                    onClick={() => handleAnswer(ans)}
                                >
                                    <span className="mr-4 flex h-6 w-6 items-center justify-center rounded-full border border-current text-xs opacity-50">
                                        {String.fromCharCode(65 + idx)}
                                    </span>
                                    {ans}
                                    {isAnswerProcessed && ans === currentQ.correctAnswer && <CheckCircle2 className="ml-auto h-5 w-5 text-green-600" />}
                                    {isAnswerProcessed && ans === selectedAnswer && ans !== currentQ.correctAnswer && <XCircle className="ml-auto h-5 w-5 text-red-600" />}
                                </Button>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    // --- RENDER: FINISHED ---
    if (gameState === 'finished') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background p-4">
                <Card className="w-full max-w-md text-center border-2 shadow-xl p-6">
                    <div className="flex justify-center mb-6">
                        <div className="p-6 rounded-full bg-yellow-500/10">
                            <Trophy className="h-16 w-16 text-yellow-500" />
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold mb-2">Quiz Completed!</h2>
                    <p className="text-muted-foreground text-lg mb-8">
                        You scored <span className="font-bold text-foreground">{score}</span> out of {questions.length}
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" size="lg" onClick={() => { setGameState('menu'); setScore(0); }}>
                            <RefreshCcw className="mr-2 h-4 w-4" /> New Topic
                        </Button>
                        <Button size="lg" onClick={() => window.location.href = '/leaderboard'}>
                            <ArrowRight className="mr-2 h-4 w-4" /> Leaderborad
                        </Button>
                    </div>
                </Card>
            </div>
        )
    }

    return null
}