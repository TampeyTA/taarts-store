import { createServerComponentClient } from "@/lib/supabase-server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import UserNav from "@/components/auth/user-nav"
import ProfileForm from "@/components/profile/profile-form"
import { User, Mail, Phone, Calendar, Shield, Edit, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default async function ProfilePage() {
  const supabase = await createServerComponentClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  // Get profile data
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Enhanced Header */}
      <header className="bg-white/90 backdrop-blur-xl shadow-lg border-b border-purple-100 sticky top-0 z-50">
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
                  <User className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    My Profile
                  </h1>
                  <p className="text-xs text-gray-500">Manage your account settings</p>
                </div>
              </div>
            </div>
            <UserNav />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Enhanced Profile Overview */}
          <div className="lg:col-span-1 animate-fade-in-up">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader className="text-center pb-6">
                <div className="relative mx-auto mb-6">
                  <div className="w-28 h-28 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl">
                    <User className="h-14 w-14 text-white" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  {profile?.full_name || user.user_metadata?.full_name || user.email?.split("@")[0]}
                </CardTitle>
                <CardDescription className="text-gray-600 font-medium">{user.email}</CardDescription>
                <div className="flex justify-center mt-4">
                  <Badge
                    variant={user.email_confirmed_at ? "default" : "secondary"}
                    className={`flex items-center px-4 py-2 rounded-full font-medium ${
                      user.email_confirmed_at
                        ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg"
                        : "bg-gradient-to-r from-orange-400 to-red-400 text-white shadow-lg"
                    }`}
                  >
                    <Shield className="w-3 h-3 mr-2" />
                    {user.email_confirmed_at ? "Verified Account" : "Pending Verification"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-3 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <Mail className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Email Address</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                  </div>
                  {profile?.phone && (
                    <div className="flex items-center space-x-4 p-3 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <Phone className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Phone Number</p>
                        <p className="text-sm text-gray-600">{profile.phone}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center space-x-4 p-3 rounded-xl bg-gradient-to-r from-pink-50 to-orange-50 border border-pink-100">
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-orange-500 rounded-lg flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Member Since</p>
                      <p className="text-sm text-gray-600">{new Date(user.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Profile Settings */}
          <div className="lg:col-span-2 space-y-8 animate-fade-in-up animation-delay-200">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  <Edit className="mr-3 h-6 w-6 text-purple-500" />
                  Profile Settings
                </CardTitle>
                <CardDescription className="text-gray-600 font-medium">
                  Update your personal information and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ProfileForm
                  initialData={{
                    fullName: profile?.full_name || user.user_metadata?.full_name || "",
                    phone: profile?.phone || "",
                    email: user.email || "",
                  }}
                />
              </CardContent>
            </Card>

            {/* Enhanced Account Security */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center text-2xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                  <Shield className="mr-3 h-6 w-6 text-green-500" />
                  Account Security
                </CardTitle>
                <CardDescription className="text-gray-600 font-medium">
                  Manage your account security settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-6 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 hover:shadow-lg transition-all duration-200">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Email Verification</h4>
                      <p className="text-sm text-gray-600">
                        {user.email_confirmed_at ? "Your email is verified" : "Please verify your email address"}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={user.email_confirmed_at ? "default" : "destructive"}
                    className={`px-4 py-2 rounded-full font-medium ${
                      user.email_confirmed_at
                        ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                        : "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                    }`}
                  >
                    {user.email_confirmed_at ? "Verified" : "Unverified"}
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-6 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 hover:shadow-lg transition-all duration-200">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 hover:from-blue-600 hover:to-purple-600 shadow-lg"
                  >
                    Enable 2FA
                  </Button>
                </div>

                <div className="flex items-center justify-between p-6 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 hover:shadow-lg transition-all duration-200">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Password</h4>
                      <p className="text-sm text-gray-600">Change your account password</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 hover:from-purple-600 hover:to-pink-600 shadow-lg"
                  >
                    Change Password
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
