import { useAuth, SignInButton } from "@clerk/clerk-react"
import { LeaderboardPage } from "./LeaderboardPage"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trophy, Lock } from "lucide-react"

export function LeaderboardProtected() {
    const { isSignedIn, isLoaded } = useAuth()

    // Show loading while auth state is being determined
    if (!isLoaded) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        )
    }

    // Show sign-in prompt if not signed in
    if (!isSignedIn) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background p-4">
                <Card className="w-full max-w-md text-center border-2 shadow-xl p-8">
                    <div className="flex justify-center mb-6">
                        <div className="p-6 rounded-full bg-primary/10 relative">
                            <Trophy className="h-16 w-16 text-primary" />
                            <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-1">
                                <Lock className="h-6 w-6 text-muted-foreground" />
                            </div>
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold mb-4">Leaderboard Access</h2>
                    <p className="text-muted-foreground text-lg mb-8">
                        Sign in to view the leaderboard and see how you rank against other players!
                    </p>
                    <SignInButton mode="modal" forceRedirectUrl="/leaderboard">
                        <Button size="lg" className="w-full">
                            Sign In to View Leaderboard
                        </Button>
                    </SignInButton>
                </Card>
            </div>
        )
    }

    // Show the actual leaderboard if signed in
    return <LeaderboardPage />
}