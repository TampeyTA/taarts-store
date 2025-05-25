import { createClient } from "@supabase/supabase-js"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import UserNav from "@/components/auth/user-nav"
import {
  ShoppingBag,
  Star,
  Heart,
  ShoppingCart,
  Smartphone,
  Laptop,
  Headphones,
  Camera,
  Zap,
  TrendingUp,
} from "lucide-react"

export default async function ShopPage() {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Sample products - replace with real data from your database
  const featuredProducts = [
    {
      id: 1,
      name: "iPhone 15 Pro",
      price: 1299000,
      originalPrice: 1399000,
      image: "/img/products/iPhone 15 pro.jpg",
      rating: 4.8,
      reviews: 124,
      category: "Smartphones",
      badge: "New Arrival",
    },
    {
      id: 2,
      name: "MacBook Air M3",
      price: 1899000,
      originalPrice: null,
      image: "/img/products/MacBook Air.jpg",
      rating: 4.9,
      reviews: 89,
      category: "Laptops",
      badge: "Best Seller",
    },
    {
      id: 3,
      name: "Sony WH-1000XM5",
      price: 459000,
      originalPrice: 499000,
      image: "/img/products/Sony Headphones.jpg",
      rating: 4.7,
      reviews: 203,
      category: "Audio",
      badge: "Sale",
    },
    {
      id: 4,
      name: "Canon EOS R6 Mark II",
      price: 3299000,
      originalPrice: null,
      image: "/img/products/Canon Camera.jpg",
      rating: 4.9,
      reviews: 67,
      category: "Cameras",
      badge: "Professional",
    },
  ]

  const categories = [
    { name: "Smartphones", icon: Smartphone, count: 45, color: "bg-blue-500" },
    { name: "Laptops", icon: Laptop, count: 32, color: "bg-green-500" },
    { name: "Audio", icon: Headphones, count: 28, color: "bg-purple-500" },
    { name: "Cameras", icon: Camera, count: 19, color: "bg-red-500" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <ShoppingBag className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Taarts Store</h1>
                <p className="text-xs text-gray-500">Premium Tech Hub</p>
              </div>
            </div>
            <UserNav />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        {user && (
          <div className="mb-8 animate-fade-in-up">
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-xl">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Zap className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">
                      Welcome back, {user.user_metadata?.full_name?.split(" ")[0] || "Friend"}!
                    </CardTitle>
                    <CardDescription className="text-blue-100">
                      Discover the latest tech gadgets curated just for you
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>
        )}

        {/* Categories */}
        <div className="mb-12 animate-fade-in-up animation-delay-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <TrendingUp className="mr-2 h-6 w-6 text-blue-600" />
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <Card
                key={category.name}
                className="group cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up border-0 bg-white/80 backdrop-blur-sm"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <category.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.count} products</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Featured Products */}
        <div className="animate-fade-in-up animation-delay-400">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Star className="mr-2 h-6 w-6 text-yellow-500" />
            Featured Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <Card
                key={product.id}
                className="group cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up border-0 bg-white/80 backdrop-blur-sm"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant={product.badge === "Sale" ? "destructive" : "default"} className="animate-pulse">
                      {product.badge}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="rounded-full w-8 h-8 p-0 bg-white/80 backdrop-blur-sm hover:bg-white/90"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="mb-2">
                    <Badge variant="outline" className="text-xs">
                      {product.category}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-lg font-bold text-gray-900">MWK {product.price.toLocaleString()}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through ml-2">
                          MWK {product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 animate-fade-in-up animation-delay-600">
          <Card className="bg-gradient-to-r from-green-600 to-blue-600 text-white border-0 shadow-xl">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Upgrade Your Tech?</h2>
              <p className="text-lg text-green-100 mb-6">Join thousands of satisfied customers across Malawi</p>
              <div className="space-x-4">
                <Button
                  variant="secondary"
                  size="lg"
                  className="transform hover:scale-105 transition-all duration-200 bg-white/80 backdrop-blur-sm hover:bg-white/90 text-gray-900"
                >
                  Browse All Products
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-green-600 transform hover:scale-105 transition-all duration-200"
                >
                  Contact Us
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

