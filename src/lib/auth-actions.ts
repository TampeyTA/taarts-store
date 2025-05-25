"use server"

import { createServerClient } from "@supabase/ssr"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

async function createServerActionClient() {
  const cookieStore = await cookies()

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options)
          })
        } catch (error) {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  })
}

export async function signUp(formData: FormData) {
  const supabase = await createServerActionClient()

  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const fullName = formData.get("fullName") as string

  if (!email || !password || !fullName) {
    return { error: "All fields are required" }
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  })

  if (error) {
    console.error("Signup error:", error)
    return { error: error.message }
  }

  if (data.user && !data.user.email_confirmed_at) {
    return {
      success: true,
      message: "Check your email for a confirmation link before signing in.",
    }
  }

  revalidatePath("/", "layout")
  redirect("/dashboard")
}

export async function signIn(formData: FormData) {
  const supabase = await createServerActionClient()

  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const returnTo = formData.get("returnTo") as string

  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error("Signin error:", error)
    return { error: error.message }
  }

  // Ensure the session is properly set
  if (data.session) {
    revalidatePath("/", "layout")
    redirect(returnTo || "/dashboard")
  } else {
    return { error: "Failed to create session" }
  }
}

export async function signInWithOTP(formData: FormData) {
  const supabase = await createServerActionClient()

  const email = formData.get("email") as string

  if (!email) {
    return { error: "Email is required" }
  }

  // Send OTP with explicit configuration for 6-digit code
 const { error } = await supabase.auth.signInWithOtp({
  email,
  options: {
    shouldCreateUser: true,
    data: {
      full_name: email.split("@")[0],
    },
    channel: "sms", // Update to "sms"
    emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/auth/callback`,
  },
})

  if (error) {
    console.error("OTP error:", error)
    return { error: error.message }
  }

  return {
    success: true,
    message: "Check your email for a 6-digit verification code and magic link!",
  }
}

export async function verifyOTP(formData: FormData) {
  const supabase = await createServerActionClient()

  const email = formData.get("email") as string
  const token = formData.get("token") as string

  if (!email || !token) {
    return { error: "Email and verification code are required" }
  }

  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: "email",
  })

  if (error) {
    console.error("OTP verification error:", error)
    return { error: error.message }
  }

  if (data.session) {
    revalidatePath("/", "layout")
    redirect("/dashboard")
  } else {
    return { error: "Failed to create session" }
  }
}

export async function signOut() {
  const supabase = await createServerActionClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error("Signout error:", error)
    return { error: error.message }
  }

  revalidatePath("/", "layout")
  redirect("/")
}

export async function updateProfile(
  formData: FormData,
): Promise<{ error: string } | { success: true; message: string }> {
  const supabase = await createServerActionClient()

  const fullName = formData.get("fullName") as string
  const phone = formData.get("phone") as string

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Not authenticated" }
  }

  // Update auth metadata
  const { error: authError } = await supabase.auth.updateUser({
    data: { full_name: fullName },
  })

  if (authError) {
    return { error: authError.message }
  }

  // Update profile table
  const { error: profileError } = await supabase
    .from("profiles")
    .update({
      full_name: fullName,
      phone: phone,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id)

  if (profileError) {
    return { error: profileError.message }
  }

  revalidatePath("/dashboard/profile")
  return { success: true, message: "Profile updated successfully!" }
}
