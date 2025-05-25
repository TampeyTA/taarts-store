"use client"

import { useEffect, useState } from "react"
import type { User } from "@supabase/supabase-js"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { createClientComponentClient } from "@/lib/supabase"
import { signOut } from "@/lib/auth-actions"
import { LogOut, Settings, UserIcon, Package, ShoppingBag } from "lucide-react"
import Link from "next/link"

export default function UserNav() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }

    getUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  if (loading) {
    return <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-200 to-purple-200 animate-pulse" />
  }

  if (!user) {
    return (
      <Button
        variant="outline"
        asChild
        className="border-2 border-purple-200 text-purple-600 hover:bg-purple-50 hover:border-purple-300 transition-all duration-200"
      >
        <Link href="/login">Sign In</Link>
      </Button>
    )
  }

  const userInitials =
    user.user_metadata?.full_name
      ?.split(" ")
      .map((name: string) => name[0])
      .join("")
      .toUpperCase() ||
    user.email?.[0].toUpperCase() ||
    "U"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-10 w-10 rounded-full hover:bg-purple-50 transition-all duration-200"
        >
          <Avatar className="h-10 w-10 ring-2 ring-purple-200 hover:ring-purple-300 transition-all duration-200">
            <AvatarImage
              src={user.user_metadata?.avatar_url || "/placeholder.svg"}
              alt={user.user_metadata?.full_name || user.email}
            />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold">
              {userInitials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-64 bg-white/95 backdrop-blur-xl border-0 shadow-2xl rounded-2xl p-2"
        align="end"
        forceMount
      >
        <DropdownMenuLabel className="font-normal p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl mb-2">
          <div className="flex flex-col space-y-2">
            <p className="text-sm font-semibold text-gray-800">{user.user_metadata?.full_name || "User"}</p>
            <p className="text-xs text-gray-600 bg-white/50 px-2 py-1 rounded-lg">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gradient-to-r from-blue-200 to-purple-200 h-px border-0 my-2" />
        <DropdownMenuItem asChild className="rounded-xl hover:bg-blue-50 transition-all duration-200 cursor-pointer">
          <Link href="/dashboard" className="flex items-center p-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
              <UserIcon className="h-4 w-4 text-white" />
            </div>
            <span className="font-medium text-gray-700">Dashboard</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="rounded-xl hover:bg-purple-50 transition-all duration-200 cursor-pointer">
          <Link href="/dashboard/profile" className="flex items-center p-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3">
              <Settings className="h-4 w-4 text-white" />
            </div>
            <span className="font-medium text-gray-700">Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="rounded-xl hover:bg-green-50 transition-all duration-200 cursor-pointer">
          <Link href="/dashboard/orders" className="flex items-center p-3">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-3">
              <Package className="h-4 w-4 text-white" />
            </div>
            <span className="font-medium text-gray-700">Orders</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="rounded-xl hover:bg-orange-50 transition-all duration-200 cursor-pointer">
          <Link href="/shop" className="flex items-center p-3">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mr-3">
              <ShoppingBag className="h-4 w-4 text-white" />
            </div>
            <span className="font-medium text-gray-700">Shop</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-gradient-to-r from-blue-200 to-purple-200 h-px border-0 my-2" />
        <DropdownMenuItem
          className="rounded-xl hover:bg-red-50 transition-all duration-200 cursor-pointer p-3"
          onSelect={() => signOut()}
        >
          <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center mr-3">
            <LogOut className="h-4 w-4 text-white" />
          </div>
          <span className="font-medium text-gray-700">Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
