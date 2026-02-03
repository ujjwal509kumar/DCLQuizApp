import React, { useEffect, useState } from "react"
import axios from "axios"
import { Trophy, Medal, Crown, Loader2, AlertCircle, ChevronLeft, ChevronRight, Search } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"

// Helper: Get Initials
const getInitials = (name) => {
    if (!name) return "AN"
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
}

export function LeaderboardPage() {
    const [leaderboardData, setLeaderboardData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchQuery, setSearchQuery] = useState("")

    // Pagination
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                setLoading(true)
                const response = await axios.get("https://dcl-quiz-app-backend.vercel.app/api/scores")
                // Sort high to low
                const sortedData = response.data.sort((a, b) => b.score - a.score)
                setLeaderboardData(sortedData)
            } catch (err) {
                console.error("Failed to fetch leaderboard:", err)
                setError("Failed to load data.")
            } finally {
                setLoading(false)
            }
        }
        fetchLeaderboard()
    }, [])

    // --- FILTER LOGIC ---
    const filteredData = leaderboardData.filter(item =>
        (item.name?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
        (item.category?.toLowerCase() || "").includes(searchQuery.toLowerCase())
    )

    // --- PAGINATION LOGIC ---
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem)
    const totalPages = Math.ceil(filteredData.length / itemsPerPage)

    const handleNext = () => setCurrentPage(p => Math.min(totalPages, p + 1))
    const handlePrev = () => setCurrentPage(p => Math.max(1, p - 1))

    // Top 3 for the visual Podium (only if not searching)
    const topThree = searchQuery ? [] : leaderboardData.slice(0, 3)

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center">
                <AlertCircle className="h-10 w-10 text-destructive" />
                <p className="text-lg font-medium">{error}</p>
                <Button onClick={() => window.location.reload()}>Try Again</Button>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[14px_24px]"></div>

            <div className="container mx-auto px-4 py-8 max-w-5xl space-y-8">

                {/* Header */}
                <div className="text-center space-y-2">
                    <Badge variant="outline" className="px-4 py-1 border-primary/20 bg-primary/5 text-primary">
                        <Trophy className="mr-2 h-3 w-3" /> Hall of Fame
                    </Badge>
                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Global Leaderboard</h1>
                </div>

                {/* PODIUM (Only visible when NOT searching) */}
                {!searchQuery && leaderboardData.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end mb-8">
                        {/* Rank 2 */}
                        {topThree[1] && (
                            <Card className="order-2 md:order-1 border-slate-200 bg-slate-50/50 dark:bg-slate-900/20">
                                <CardContent className="p-4 text-center">
                                    <div className="mx-auto bg-slate-200 dark:bg-slate-800 p-2 rounded-full w-fit mb-2">
                                        <Medal className="h-6 w-6 text-slate-500" />
                                    </div>
                                    <h3 className="font-bold truncate">{topThree[1].name}</h3>
                                    <div className="text-2xl font-black text-slate-500">{topThree[1].score}</div>
                                    <p className="text-xs text-muted-foreground">{topThree[1].category}</p>
                                </CardContent>
                            </Card>
                        )}

                        {/* Rank 1 */}
                        {topThree[0] && (
                            <Card className="order-1 md:order-2 border-yellow-500/50 bg-yellow-50/50 dark:bg-yellow-900/10 shadow-lg relative -top-4">
                                <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                                    <Crown className="h-10 w-10 text-yellow-500 fill-yellow-500" />
                                </div>
                                <CardContent className="p-6 text-center pt-8">
                                    <Avatar className="h-16 w-16 mx-auto border-4 border-yellow-500 mb-2">
                                        <AvatarFallback className="bg-yellow-100 text-yellow-700 font-bold">
                                            {getInitials(topThree[0].name)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <h3 className="font-bold text-lg truncate">{topThree[0].name}</h3>
                                    <div className="text-4xl font-black text-yellow-600">{topThree[0].score}</div>
                                    <p className="text-xs text-muted-foreground mt-1">{topThree[0].category}</p>
                                </CardContent>
                            </Card>
                        )}

                        {/* Rank 3 */}
                        {topThree[2] && (
                            <Card className="order-3 border-orange-200 bg-orange-50/50 dark:bg-orange-900/10">
                                <CardContent className="p-4 text-center">
                                    <div className="mx-auto bg-orange-100 dark:bg-orange-900/50 p-2 rounded-full w-fit mb-2">
                                        <Medal className="h-6 w-6 text-amber-700" />
                                    </div>
                                    <h3 className="font-bold truncate">{topThree[2].name}</h3>
                                    <div className="text-2xl font-black text-amber-700">{topThree[2].score}</div>
                                    <p className="text-xs text-muted-foreground">{topThree[2].category}</p>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                )}

                {/* MAIN TABLE */}
                <Card className="border-muted/60 shadow-sm overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between py-4 px-6 border-b bg-muted/10">
                        <CardTitle className="text-lg">All Scores</CardTitle>
                        <div className="relative w-full max-w-xs">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search by name or category..."
                                className="pl-9 bg-background h-9"
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value)
                                    setCurrentPage(1) // Reset to page 1 on search
                                }}
                            />
                        </div>
                    </CardHeader>

                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/30 hover:bg-muted/30">
                                    <TableHead className="w-16 text-center font-bold">#</TableHead>
                                    <TableHead>Player</TableHead>
                                    <TableHead className="hidden md:table-cell">Category</TableHead>
                                    <TableHead className="hidden sm:table-cell">Date</TableHead>
                                    <TableHead className="hidden lg:table-cell">Time</TableHead>
                                    <TableHead className="text-right pr-6">Score</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {currentItems.map((item, index) => {
                                    // Rank Calculation
                                    const actualRank = indexOfFirstItem + index + 1

                                    // Highlight top 3 rows
                                    let rankBadge = null
                                    if (actualRank === 1) rankBadge = "🥇"
                                    else if (actualRank === 2) rankBadge = "🥈"
                                    else if (actualRank === 3) rankBadge = "🥉"
                                    else rankBadge = `#${actualRank}`

                                    return (
                                        <TableRow key={item._id || index} className="h-14 border-b hover:bg-muted/50">
                                            <TableCell className="text-center font-medium">
                                                {rankBadge}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-8 w-8 bg-muted">
                                                        <AvatarFallback className="text-xs font-medium">
                                                            {getInitials(item.name)}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex flex-col">
                                                        <span className="font-semibold text-sm">{item.name}</span>
                                                        <span className="text-[10px] text-muted-foreground md:hidden">{item.category}</span>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                                                {item.category}
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                                                {item.date}
                                            </TableCell>
                                            <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                                                {item.time}
                                            </TableCell>
                                            <TableCell className="text-right font-bold pr-6">
                                                {item.score} <span className="text-muted-foreground font-normal text-xs">/ {item.total}</span>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}

                                {currentItems.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                                            No scores found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* PAGINATION */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-between px-4 py-3 bg-muted/10 border-t">
                            <div className="text-xs text-muted-foreground">
                                Page {currentPage} of {totalPages}
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handlePrev}
                                    disabled={currentPage === 1}
                                    className="h-8 px-2"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleNext}
                                    disabled={currentPage === totalPages}
                                    className="h-8 px-2"
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    )}
                </Card>

            </div>
        </div>
    )
}