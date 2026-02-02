import { useAuth } from "@clerk/clerk-react"
import { Navigate } from "react-router-dom"

export function ProtectedRoute({ children }) {
    const { isSignedIn, isLoaded } = useAuth()

    // spinner animation untill the page is loaded
    if (!isLoaded) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        )
    }

    // Redirect to home if not signed in
    if (!isSignedIn) {
        return <Navigate to="/" replace />
    }

    return children
}