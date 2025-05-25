import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ShoppingBag,
  Smartphone,
  Laptop,
  Headphones,
  Camera,
  Star,
  Shield,
  Truck,
  CreditCard,
  Users,
  Zap,
  Heart,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"
import UserNav from "@/components/auth/user-nav"

export default function HomePage() {
  const features = [
    {
      icon: Shield,
      title: "Authentic Products",
      description: "100% genuine tech gadgets from authorized dealers",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Quick delivery across all major cities in Malawi",
      color: "from-green-500 to-green-600",
    },
    {
      icon: CreditCard,
      title: "Secure Payments",
      description: "Multiple payment options including mobile money",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "Dedicated customer support team ready to help",
      color: "from-red-500 to-red-600",
    },
  ]

  const categories = [
    {
      name: "Smartphones",
      icon: Smartphone,
      count: "45+ Products",
      color: "from-blue-500 to-blue-600",
      description: "Latest flagship and budget-friendly options",
    },
    {
      name: "Laptops",
      icon: Laptop,
      count: "32+ Products",
      color: "from-green-500 to-green-600",
      description: "Gaming, business, and ultrabooks",
    },
    {
      name: "Audio",
      icon: Headphones,
      count: "28+ Products",
      color: "from-purple-500 to-purple-600",
      description: "Headphones, speakers, and earbuds",
    },
    {
      name: "Cameras",
      icon: Camera,
      count: "19+ Products",
      color: "from-red-500 to-red-600",
      description: "Professional and consumer cameras",
    },
  ]

  const testimonials = [
    {
      name: "James Banda",
      location: "Lilongwe",
      rating: 5,
      comment: "Amazing service! Got my iPhone delivered the next day. Highly recommended!",
      product: "iPhone 15 Pro",
    },
    {
      name: "Grace Mwale",
      location: "Blantyre",
      rating: 5,
      comment: "Best tech store in Malawi. Authentic products and great customer service.",
      product: "MacBook Air M3",
    },
    {
      name: "Peter Phiri",
      location: "Mzuzu",
      rating: 5,
      comment: "Competitive prices and fast delivery. Will definitely shop here again!",
      product: "Sony WH-1000XM5",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="relative z-50 bg-white/90 backdrop-blur-xl shadow-lg border-0 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center animate-bounce-gentle shadow-lg">
                <ShoppingBag className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Taarts Store
                </h1>
                <p className="text-xs text-gray-500">Premium Tech Hub</p>
              </div>
            </div>
            <UserNav />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 animate-bounce-gentle shadow-lg">
            <Zap className="w-3 h-3 mr-1" />
            Now Serving All of Malawi
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Your Premier
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Tech Destination
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover the latest smartphones, laptops, and gadgets from top brands. Authentic products, competitive
            prices, and fast delivery across Malawi.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 text-lg px-8 py-6 shadow-xl"
            >
              <Link href="/shop">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Start Shopping
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="border-2 border-purple-200 hover:bg-purple-50 transform hover:scale-105 transition-all duration-200 text-lg px-8 py-6 shadow-lg"
            >
              <Link href="/login">
                <Users className="mr-2 h-5 w-5" />
                Sign In
              </Link>
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-16 animate-fade-in-up animation-delay-200">
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-12">
            Why Choose Taarts Store?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={feature.title}
                className="group cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up border-0 bg-white/80 backdrop-blur-sm"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2 text-lg">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Categories Section */}
        <div className="mb-16 animate-fade-in-up animation-delay-400">
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-12">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Card
                key={category.name}
                className="group cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up border-0 overflow-hidden"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className={`h-2 bg-gradient-to-r ${category.color}`}></div>
                <CardContent className="p-6 text-center bg-white/90 backdrop-blur-sm">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <category.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2 text-lg">{category.name}</h3>
                  <p className="text-purple-600 font-semibold text-sm mb-2">{category.count}</p>
                  <p className="text-gray-600 text-sm">{category.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16 animate-fade-in-up animation-delay-600">
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-12">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card
                key={testimonial.name}
                className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up border-0 bg-white/90 backdrop-blur-sm"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic text-lg leading-relaxed">"{testimonial.comment}"</p>
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
                    <p className="font-bold text-gray-800 text-lg">{testimonial.name}</p>
                    <p className="text-sm text-gray-600 font-medium">{testimonial.location}</p>
                    <Badge className="mt-2 text-xs bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
                      Purchased: {testimonial.product}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-16 animate-fade-in-up animation-delay-800">
          <Card className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white border-0 shadow-2xl">
            <CardContent className="p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold mb-2">5,000+</div>
                  <div className="text-blue-100">Happy Customers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">150+</div>
                  <div className="text-blue-100">Products Available</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">24/7</div>
                  <div className="text-blue-100">Customer Support</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">99%</div>
                  <div className="text-blue-100">Satisfaction Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center animate-fade-in-up animation-delay-1000">
          <Card className="bg-gradient-to-r from-green-600 to-blue-600 text-white border-0 shadow-2xl overflow-hidden">
            <CardContent className="p-12 relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
              <div className="relative z-10">
                <h2 className="text-4xl font-bold mb-4">Ready to Upgrade Your Tech?</h2>
                <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
                  Join thousands of satisfied customers across Malawi. Get the latest gadgets with authentic warranties
                  and unbeatable prices.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    variant="secondary"
                    size="lg"
                    asChild
                    className="transform hover:scale-105 transition-all duration-200 text-lg px-8 py-6 shadow-xl"
                  >
                    <Link href="/signup">
                      <Heart className="mr-2 h-5 w-5" />
                      Create Account
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    asChild
                    className="border-white text-white hover:bg-white hover:text-green-600 transform hover:scale-105 transition-all duration-200 text-lg px-8 py-6 shadow-xl"
                  >
                    <Link href="/shop">
                      <ShoppingBag className="mr-2 h-5 w-5" />
                      Browse Products
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <ShoppingBag className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">Taarts Store</span>
              </div>
              <p className="text-gray-300 mb-4">Your trusted partner for premium tech gadgets in Malawi.</p>
              <div className="flex space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer">
                  <span className="text-xs">f</span>
                </div>
                <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors cursor-pointer">
                  <span className="text-xs">t</span>
                </div>
                <div className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors cursor-pointer">
                  <span className="text-xs">i</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-gray-200">Quick Links</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link href="/shop" className="hover:text-white transition-colors">
                    Shop
                  </Link>
                </li>
                <li>
                  <Link href="/categories" className="hover:text-white transition-colors">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link href="/brands" className="hover:text-white transition-colors">
                    Brands
                  </Link>
                </li>
                <li>
                  <Link href="/deals" className="hover:text-white transition-colors">
                    Deals
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-gray-200">Support</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="hover:text-white transition-colors">
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="hover:text-white transition-colors">
                    Returns
                  </Link>
                </li>
                <li>
                  <Link href="/warranty" className="hover:text-white transition-colors">
                    Warranty
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-gray-200">Contact Info</h3>
              <div className="space-y-2 text-gray-300">
                <p>📍 Blntyre, Malawi</p>
                <p>📞 +265 113 113 113</p>
                <p>✉️ hello@taartsstore.com</p>
                <p>🕒 Mon-Sat: 8AM-6PM</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Taartsoft Ltd. All rights reserved. Made with ❤️ in Malawi</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
