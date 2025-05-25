import { createServerComponentClient } from "@/lib/supabase-server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import UserNav from "@/components/auth/user-nav"
import { Package, Eye, Download, Truck, CheckCircle, Clock, XCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default async function OrdersPage() {
  const supabase = await createServerComponentClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  // Sample orders data - replace with real data from your database
  const orders = [
    {
      id: "TS202401001",
      order_number: "TS202401001",
      status: "delivered",
      payment_status: "completed",
      total_amount: 1299000,
      created_at: "2024-01-15T10:30:00Z",
      items: [{ product_name: "iPhone 15 Pro", quantity: 1, unit_price: 1299000 }],
      shipping_address: {
        city: "Lilongwe",
        country: "Malawi",
      },
    },
    {
      id: "TS202401002",
      order_number: "TS202401002",
      status: "processing",
      payment_status: "completed",
      total_amount: 459000,
      created_at: "2024-01-20T14:15:00Z",
      items: [{ product_name: "Sony WH-1000XM5", quantity: 1, unit_price: 459000 }],
      shipping_address: {
        city: "Blantyre",
        country: "Malawi",
      },
    },
    {
      id: "TS202401003",
      order_number: "TS202401003",
      status: "shipped",
      payment_status: "completed",
      total_amount: 899000,
      created_at: "2024-01-22T09:45:00Z",
      items: [{ product_name: "MacBook Air M3", quantity: 1, unit_price: 899000 }],
      shipping_address: {
        city: "Mzuzu",
        country: "Malawi",
      },
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="h-6 w-6 text-white" />
      case "shipped":
        return <Truck className="h-6 w-6 text-white" />
      case "processing":
        return <Clock className="h-6 w-6 text-white" />
      case "cancelled":
        return <XCircle className="h-6 w-6 text-white" />
      default:
        return <Package className="h-6 w-6 text-white" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-gradient-to-r from-green-500 to-emerald-500"
      case "shipped":
        return "bg-gradient-to-r from-blue-500 to-purple-500"
      case "processing":
        return "bg-gradient-to-r from-orange-400 to-yellow-400"
      case "cancelled":
        return "bg-gradient-to-r from-red-500 to-pink-500"
      default:
        return "bg-gradient-to-r from-gray-500 to-gray-600"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Enhanced Header */}
      <header className="bg-white/90 backdrop-blur-xl shadow-lg border-0 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard"
                className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors duration-200"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="text-sm font-medium">Back to Dashboard</span>
              </Link>
              <div className="h-6 w-px bg-gray-300" />
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Package className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    My Orders
                  </h1>
                  <p className="text-xs text-gray-500">Track your purchases</p>
                </div>
              </div>
            </div>
            <UserNav />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {orders.map((order, index) => (
            <Card
              key={order.id}
              className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardHeader className="pb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-14 h-14 rounded-2xl ${getStatusColor(order.status)} flex items-center justify-center shadow-lg`}
                    >
                      {getStatusIcon(order.status)}
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                        Order {order.order_number}
                      </CardTitle>
                      <CardDescription className="text-gray-600 font-medium">
                        Placed on {new Date(order.created_at).toLocaleDateString()} • {order.items.length} item(s)
                      </CardDescription>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                      MWK {order.total_amount.toLocaleString()}
                    </p>
                    <Badge
                      className={`capitalize font-medium px-4 py-2 rounded-full border-0 text-white ${getStatusColor(order.status)}`}
                    >
                      {order.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Order Items */}
                  <div className="space-y-3">
                    {order.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border-0 shadow-sm"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-purple-400 rounded-xl flex items-center justify-center shadow-lg">
                            <Package className="h-7 w-7 text-white" />
                          </div>
                          <div>
                            <p className="font-bold text-gray-800 text-lg">{item.product_name}</p>
                            <p className="text-sm text-gray-600 font-medium">Quantity: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="font-bold text-gray-800 text-xl">MWK {item.unit_price.toLocaleString()}</p>
                      </div>
                    ))}
                  </div>

                  {/* Shipping Info */}
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-0 shadow-sm">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                        <Truck className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-800">Shipping to</p>
                        <p className="text-sm text-gray-600 font-medium">
                          {order.shipping_address.city}, {order.shipping_address.country}
                        </p>
                      </div>
                    </div>
                    <Badge className="capitalize font-medium px-4 py-2 rounded-full border-0 bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                      {order.payment_status}
                    </Badge>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3 pt-4">
                    <Button className="flex items-center h-10 bg-white border-2 border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 rounded-xl font-semibold transition-all duration-200">
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                    <Button className="flex items-center h-10 bg-white border-2 border-purple-200 text-purple-600 hover:bg-purple-50 hover:border-purple-300 rounded-xl font-semibold transition-all duration-200">
                      <Download className="mr-2 h-4 w-4" />
                      Download Invoice
                    </Button>
                    {order.status === "shipped" && (
                      <Button className="flex items-center h-10 bg-white border-2 border-green-200 text-green-600 hover:bg-green-50 hover:border-green-300 rounded-xl font-semibold transition-all duration-200">
                        <Truck className="mr-2 h-4 w-4" />
                        Track Package
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {orders.length === 0 && (
            <Card className="text-center py-16 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardContent>
                <div className="w-20 h-20 bg-gradient-to-br from-gray-300 to-gray-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Package className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">No orders yet</h3>
                <p className="text-gray-600 mb-8 font-medium">Start shopping to see your orders here!</p>
                <Button className="h-12 px-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white border-0 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-200">
                  Start Shopping
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
