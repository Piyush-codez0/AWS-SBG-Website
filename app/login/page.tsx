"use client"

import { useTheme } from "next-themes"

import { Button } from "@/components/ui/Button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MagicCard } from "@/components/ui/magic-card"

export default function LoginPage() {
  const { theme } = useTheme()
  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-bg relative overflow-hidden">
      {/* Decorative glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/4 h-[300px] w-[300px] translate-y-1/2 rounded-full bg-secondary/10 blur-[100px]"
      />
      <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay pointer-events-none" />

      <Card className="w-full max-w-sm border-none p-0 shadow-none z-10 bg-transparent">
        <MagicCard
          gradientColor={theme === "dark" ? "#262626" : "rgba(255,255,255,0.05)"}
          className="p-0 border-white/10 shadow-2xl bg-bg/60 backdrop-blur-xl"
        >
          <CardHeader className="border-border border-b border-white/10 p-6 pb-4">
            <CardTitle className="text-2xl font-display text-text-primary">Login</CardTitle>
            <CardDescription className="text-text-secondary">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="grid gap-5">
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-text-primary">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="name@example.com" 
                    className="bg-black/20 border-white/10 text-text-primary focus:border-primary/50"
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-text-primary">Password</Label>
                    <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    className="bg-black/20 border-white/10 text-text-primary focus:border-primary/50"
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="border-border border-t border-white/10 p-6 pt-4">
            <Button className="w-full bg-primary hover:bg-primary/90 text-white font-medium h-10">Sign In</Button>
          </CardFooter>
        </MagicCard>
      </Card>
    </div>
  )
}
