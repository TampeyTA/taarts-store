import { createServerComponentClient } from "@/lib/supabase-server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import UserNav from "@/components/auth/user-nav"
import { Package, CreditCard, Heart, Settings, ShoppingBag, TrendingUp, Clock, CheckCircle } from "lucide-react"
import Link from "next/link"

export default async function DashboardPage() {
  const supabase = await createServerComponentClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  // Get user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  // Sample data - replace with real data from your database
  const recentOrders = [
    { id: "TS202401001", status: "delivered", total: 1299000, date: "2024-01-15", items: 2 },
    { id: "TS202401002", status: "processing", total: 459000, date: "2024-01-20", items: 1 },
    { id: "TS202401003", status: "shipped", total: 899000, date: "2024-01-22", items: 3 },
  ]

  const stats = [
    { label: "Total Orders", value: "12", icon: Package, color: "from-blue-500 to-purple-500" },
    { label: "Total Spent", value: "MWK 8.2M", icon: CreditCard, color: "from-green-500 to-emerald-500" },
    { label: "Wishlist Items", value: "5", icon: Heart, color: "from-pink-500 to-rose-500" },
    { label: "Loyalty Points", value: "2,450", icon: TrendingUp, color: "from-purple-500 to-indigo-500" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Enhanced Header */}
      <header className="bg-white/90 backdrop-blur-xl shadow-lg border-0 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <ShoppingBag className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  My Dashboard
                </h1>
                <p className="text-xs text-gray-500">Welcome back!</p>
              </div>
            </div>
            <UserNav />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in-up">
          <Card className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white border-0 shadow-2xl hover:shadow-3xl transition-all duration-300">
            <CardHeader className="pb-6">
              <CardTitle className="text-3xl font-bold">
                Welcome back, {profile?.full_name || user.user_metadata?.full_name || user.email?.split("@")[0]}!
              </CardTitle>
              <CardDescription className="text-blue-100 text-lg font-medium">
                Here's what's happening with your account today.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card
              key={stat.label}
              className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-2">{stat.label}</p>
                    <p className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}
                  >
                    <stat.icon className="h-7 w-7 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2 animate-fade-in-up animation-delay-400">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
                    <Package className="h-5 w-5 text-white" />
                  </div>
                  Recent Orders
                </CardTitle>
                <CardDescription className="text-gray-600 font-medium">
                  Your latest purchases and their status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order, index) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-gray-50 to-blue-50 border-0 hover:from-blue-50 hover:to-purple-50 transition-all duration-200 animate-slide-in shadow-sm hover:shadow-md"
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-400 rounded-xl flex items-center justify-center shadow-lg">
                          {order.status === "delivered" ? (
                            <CheckCircle className="h-6 w-6 text-white" />
                          ) : order.status === "shipped" ? (
                            <Package className="h-6 w-6 text-white" />
                          ) : (
                            <Clock className="h-6 w-6 text-white" />
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-gray-800">Order {order.id}</p>
                          <p className="text-sm text-gray-600 font-medium">
                            {order.items} items • {order.date}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-800 text-lg">MWK {order.total.toLocaleString()}</p>
                        <Badge
                          className={`capitalize font-medium px-3 py-1 rounded-full border-0 ${
                            order.status === "delivered"
                              ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                              : order.status === "shipped"
                                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                                : "bg-gradient-to-r from-orange-400 to-yellow-400 text-white"
                          }`}
                        >
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Button
                    variant="outline"
                    className="w-full h-12 bg-white border-2 border-purple-200 text-purple-600 hover:bg-purple-50 hover:border-purple-300 rounded-xl font-semibold transition-all duration-200"
                    asChild
                  >
                    <Link href="/dashboard/orders">View All Orders</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="animate-fade-in-up animation-delay-600">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3">
                    <Settings className="h-5 w-5 text-white" />
                  </div>
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  className="w-full justify-start h-12 bg-white border-2 border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 rounded-xl font-semibold transition-all duration-200"
                  asChild
                >
                  <Link href="/dashboard/orders">
                    <Package className="mr-3 h-5 w-5" />
                    View All Orders
                  </Link>
                </Button>
                <Button
                  className="w-full justify-start h-12 bg-white border-2 border-purple-200 text-purple-600 hover:bg-purple-50 hover:border-purple-300 rounded-xl font-semibold transition-all duration-200"
                  asChild
                >
                  <Link href="/dashboard/profile">
                    <Heart className="mr-3 h-5 w-5" />
                    Edit Profile
                  </Link>
                </Button>
                <Button className="w-full justify-start h-12 bg-white border-2 border-green-200 text-green-600 hover:bg-green-50 hover:border-green-300 rounded-xl font-semibold transition-all duration-200">
                  <CreditCard className="mr-3 h-5 w-5" />
                  Payment Methods
                </Button>
                <Button
                  className="w-full justify-start h-12 bg-white border-2 border-pink-200 text-pink-600 hover:bg-pink-50 hover:border-pink-300 rounded-xl font-semibold transition-all duration-200"
                  asChild
                >
                  <Link href="/dashboard/profile">
                    <Settings className="mr-3 h-5 w-5" />
                    Account Settings
                  </Link>
                </Button>
                <div className="pt-4">
                  <Button
                    className="w-full h-12 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white border-0 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-200"
                    asChild
                  >
                    <Link href="/shop">
                      <ShoppingBag className="mr-3 h-5 w-5" />
                      Continue Shopping
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
