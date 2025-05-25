"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { signUp, signIn, signInWithOTP, verifyOTP } from "@/lib/auth-actions"
import { Loader2, Mail, Lock, User, ShoppingBag, Sparkles, Zap, Shield } from "lucide-react"

export default function AuthForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [showOTPVerification, setShowOTPVerification] = useState(false)
  const [otpEmail, setOtpEmail] = useState("")
  const searchParams = useSearchParams()
  const returnTo = searchParams.get("returnTo")

  async function handleSignUp(formData: FormData) {
    setIsLoading(true)
    setMessage(null)

    const result = await signUp(formData)

    if (result?.error) {
      setMessage({ type: "error", text: result.error })
    } else if (result?.success) {
      setMessage({ type: "success", text: result.message || "Account created successfully!" })
    }

    setIsLoading(false)
  }

  async function handleSignIn(formData: FormData) {
    setIsLoading(true)
    setMessage(null)

    if (returnTo) {
      formData.append("returnTo", returnTo)
    }

    const result = await signIn(formData)

    if (result?.error) {
      setMessage({ type: "error", text: result.error })
    }

    setIsLoading(false)
  }

  async function handleOTPSignIn(formData: FormData) {
    setIsLoading(true)
    setMessage(null)

    const email = formData.get("email") as string
    const result = await signInWithOTP(formData)

    if (result?.error) {
      setMessage({ type: "error", text: result.error })
    } else if (result?.success) {
      setOtpEmail(email)
      setShowOTPVerification(true)
      setMessage({ type: "success", text: result.message })
    }

    setIsLoading(false)
  }

  async function handleOTPVerification(formData: FormData) {
    setIsLoading(true)
    setMessage(null)

    formData.append("email", otpEmail)

    const result = await verifyOTP(formData)

    if (result?.error) {
      setMessage({ type: "error", text: result.error })
    }

    setIsLoading(false)
  }

  if (showOTPVerification) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <Card className="w-full max-w-md relative z-10 backdrop-blur-sm bg-white/90 shadow-2xl border-0 animate-fade-in-up">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-600 to-blue-600 rounded-2xl flex items-center justify-center animate-bounce-gentle">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <div className="space-y-2">
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Check Your Email
              </CardTitle>
              <CardDescription className="text-gray-600">
                We sent a magic link to <strong>{otpEmail}</strong>
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form action={handleOTPVerification} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp-token" className="text-sm font-medium">
                  Verification Code (Optional)
                </Label>
                <div className="relative group">
                  <Shield className="absolute left-3 top-3 h-4 w-4 text-gray-400 transition-colors group-focus-within:text-green-600" />
                  <Input
                    id="otp-token"
                    name="token"
                    type="text"
                    placeholder="Enter 6-digit code"
                    className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    maxLength={6}
                  />
                </div>
                <p className="text-xs text-gray-500">
                  You can either click the magic link in your email or enter the 6-digit code above.
                </p>
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Verify & Sign In
                  </>
                )}
              </Button>
            </form>

            <div className="mt-4 text-center">
              <Button
                variant="ghost"
                onClick={() => {
                  setShowOTPVerification(false)
                  setOtpEmail("")
                  setMessage(null)
                }}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                ← Back to sign in
              </Button>
            </div>

            {message && (
              <Alert
                className={`mt-4 animate-slide-in ${
                  message.type === "error"
                    ? "border-red-200 bg-red-50 text-red-800"
                    : "border-green-200 bg-green-50 text-green-800"
                }`}
              >
                <AlertDescription>{message.text}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <Card className="w-full max-w-md relative z-10 backdrop-blur-sm bg-white/90 shadow-2xl border-0 animate-fade-in-up">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center animate-bounce-gentle">
            <ShoppingBag className="w-8 h-8 text-white" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Taarts Store
            </CardTitle>
            <CardDescription className="text-gray-600">Your gateway to premium tech in Malawi</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="signin" className="transition-all duration-200 text-xs">
                Sign In
              </TabsTrigger>
              <TabsTrigger value="magic" className="transition-all duration-200 text-xs">
                Magic Link
              </TabsTrigger>
              <TabsTrigger value="signup" className="transition-all duration-200 text-xs">
                Sign Up
              </TabsTrigger>
            </TabsList>

            <TabsContent value="signin" className="space-y-4 animate-fade-in">
              <form action={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email" className="text-sm font-medium">
                    Email
                  </Label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400 transition-colors group-focus-within:text-blue-600" />
                    <Input
                      id="signin-email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signin-password" className="text-sm font-medium">
                    Password
                  </Label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400 transition-colors group-focus-within:text-blue-600" />
                    <Input
                      id="signin-password"
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Sign In
                    </>
                  )}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="magic" className="space-y-4 animate-fade-in">
              <form action={handleOTPSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="magic-email" className="text-sm font-medium">
                    Email Address
                  </Label>
                  <div className="relative group">
                    <Zap className="absolute left-3 top-3 h-4 w-4 text-gray-400 transition-colors group-focus-within:text-green-600" />
                    <Input
                      id="magic-email"
                      name="email"
                      type="email"
                      placeholder="Enter your email for magic link"
                      className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    We'll send you a secure link to sign in instantly - no password needed!
                  </p>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending magic link...
                    </>
                  ) : (
                    <>
                      <Zap className="mr-2 h-4 w-4" />
                      Send Magic Link
                    </>
                  )}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4 animate-fade-in">
              <form action={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name" className="text-sm font-medium">
                    Full Name
                  </Label>
                  <div className="relative group">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400 transition-colors group-focus-within:text-blue-600" />
                    <Input
                      id="signup-name"
                      name="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-sm font-medium">
                    Email
                  </Label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400 transition-colors group-focus-within:text-blue-600" />
                    <Input
                      id="signup-email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-sm font-medium">
                    Password
                  </Label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400 transition-colors group-focus-within:text-blue-600" />
                    <Input
                      id="signup-password"
                      name="password"
                      type="password"
                      placeholder="Create a password (min 6 characters)"
                      className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      minLength={6}
                      required
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Create Account
                    </>
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          {message && (
            <Alert
              className={`mt-4 animate-slide-in ${
                message.type === "error"
                  ? "border-red-200 bg-red-50 text-red-800"
                  : "border-green-200 bg-green-50 text-green-800"
              }`}
            >
              <AlertDescription>{message.text}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
