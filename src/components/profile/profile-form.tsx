"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { updateProfile } from "@/lib/auth-actions"
import { Loader2, CheckCircle, AlertCircle, Save, X } from "lucide-react"

interface ProfileFormProps {
  initialData: {
    fullName: string
    phone: string
    email: string
  }
}

export default function ProfileForm({ initialData }: ProfileFormProps) {
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      setMessage(null)

      const result = await updateProfile(formData)

      if ('error' in result) {
        setMessage({ type: "error", text: result.error })
        } else if ('success' in result) {
        setMessage({ type: "success", text: result.message || "Profile updated successfully!" })
        }
            })
        }

  return (
    <div className="space-y-8">
      <form action={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <Label htmlFor="fullName" className="text-sm font-semibold text-gray-700">
              Full Name
            </Label>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              defaultValue={initialData.fullName}
              placeholder="Enter your full name"
              className="h-12 bg-white/80 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-200 text-gray-800 font-medium"
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">
              Phone Number
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              defaultValue={initialData.phone}
              placeholder="+265 123 456 789"
              className="h-12 bg-white/80 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-200 text-gray-800 font-medium"
            />
          </div>
        </div>

        <div className="space-y-3">
          <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            value={initialData.email}
            disabled
            className="h-12 bg-gradient-to-r from-gray-100 to-gray-200 border-2 border-gray-300 rounded-xl text-gray-600 font-medium"
          />
          <p className="text-xs text-gray-500 font-medium">Email cannot be changed. Contact support if needed.</p>
        </div>

        <div className="flex justify-end space-x-4 pt-6">
          <Button
            variant="outline"
            type="button"
            className="h-12 px-8 bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 rounded-xl font-semibold transition-all duration-200"
          >
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isPending}
            className="h-12 px-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white border-0 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving Changes...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </form>

      {message && (
        <Alert
          className={`animate-slide-in border-2 rounded-xl p-4 ${
            message.type === "error"
              ? "border-red-200 bg-gradient-to-r from-red-50 to-pink-50 text-red-800"
              : "border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 text-green-800"
          }`}
        >
          {message.type === "error" ? <AlertCircle className="h-5 w-5" /> : <CheckCircle className="h-5 w-5" />}
          <AlertDescription className="font-medium ml-2">{message.text}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}
