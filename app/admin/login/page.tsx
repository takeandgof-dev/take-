"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { signIn, getCurrentUser } from "@/lib/firebase/auth-service"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import Image from "next/image"

export default function AdminLoginPage() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [checking, setChecking] = useState(true)
  const router = useRouter()

  useEffect(() => {
    getCurrentUser().then((authenticated) => {
      if (authenticated) {
        router.push("/admin")
      } else {
        setChecking(false)
      }
    })
  }, [router])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const { authenticated, error } = await signIn(password)

    if (error || !authenticated) {
      setError(error || "Inloggning misslyckades")
      setLoading(false)
      return
    }

    router.push("/admin")
  }

  if (checking) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Kontrollerar inloggning...</p>
      </div>
    )
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: 'url(/bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />
      
      <Card className="relative z-10 w-full max-w-md bg-[#1a0f0a]/95 backdrop-blur-sm border border-[#c8a84b]/30">
        <CardHeader className="text-center border-b border-[#c8a84b]/30 pb-4">
          <div className="flex justify-center mb-4">
            <Image
              src="/logo.png"
              alt="Take & Go"
              width={120}
              height={60}
              className="w-auto h-20 object-contain"
            />
          </div>
          <CardTitle className="text-2xl text-[#f5e6c8]">Admin Panel</CardTitle>
          <p className="text-sm text-[#f5e6c8]/60 mt-1">Logga in för att hantera menyn</p>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleLogin}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="password" className="text-[#f5e6c8]">Lösenord</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ange lösenord"
                  required
                  autoFocus
                  className="bg-[#2a1810]/50 border-[#c8a84b]/30 text-[#f5e6c8] placeholder:text-[#f5e6c8]/40"
                />
              </Field>
              {error && (
                <p className="text-[#ff6b6b] text-sm text-center font-semibold">{error}</p>
              )}
              <Button 
                type="submit" 
                className="w-full bg-[#c41e1e] hover:bg-[#a51818] text-white font-semibold"
                disabled={loading}
              >
                {loading ? "Loggar in..." : "Logga in"}
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
