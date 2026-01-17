import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { auth } from '@/lib/auth'

export const Dashboard = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        auth.logout()
        navigate('/login')
    }

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <Button variant="destructive" onClick={handleLogout}>
                    Logout
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Welcome!</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            You are logged in to "Sistem Informasi Persuratan & HRIS".
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
