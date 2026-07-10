"use client"

import React, { useState } from "react"
import { signIn } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.236-3.22-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23A11.51 11.51 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.652.242 2.873.118 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.804 5.625-5.475 5.922.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576C20.565 21.796 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
)

const TYPING_PHRASES = [
  "Code Inspector",
  "PR Analysis",
  "Bug Detector",
  "Code Review",
  "Lint Scanner",
]

const TYPING_SPEED = 70   // ms per character typed
const ERASE_SPEED  = 40   // ms per character erased
const PAUSE_AFTER  = 1600 // ms to hold the full word before erasing
const PAUSE_BEFORE = 300  // ms gap between erase-finish and next word

function useTypewriter(phrases: string[]) {
  const [displayed, setDisplayed] = React.useState("")
  const [phraseIdx, setPhraseIdx] = React.useState(0)
  const [isErasing, setIsErasing] = React.useState(false)

  React.useEffect(() => {
    const current = phrases[phraseIdx]

    if (!isErasing && displayed.length < current.length) {
      // Still typing
      const t = setTimeout(
        () => setDisplayed(current.slice(0, displayed.length + 1)),
        TYPING_SPEED,
      )
      return () => clearTimeout(t)
    }

    if (!isErasing && displayed.length === current.length) {
      // Finished typing — pause then start erasing
      const t = setTimeout(() => setIsErasing(true), PAUSE_AFTER)
      return () => clearTimeout(t)
    }

    if (isErasing && displayed.length > 0) {
      // Erasing
      const t = setTimeout(
        () => setDisplayed(displayed.slice(0, -1)),
        ERASE_SPEED,
      )
      return () => clearTimeout(t)
    }

    if (isErasing && displayed.length === 0) {
      // Finished erasing — move to next phrase
      const t = setTimeout(() => {
        setIsErasing(false)
        setPhraseIdx((i) => (i + 1) % phrases.length)
      }, PAUSE_BEFORE)
      return () => clearTimeout(t)
    }
  }, [displayed, isErasing, phraseIdx, phrases])

  return displayed
}

const LoginUI = () => {
  const [isLoading, setIsLoading] = useState(false)
  const typedText = useTypewriter(TYPING_PHRASES)

  const handleGithubLogin = async () => {
    setIsLoading(true)
    try {
      await signIn.social({ provider: "github" })
    } catch (error) {
      console.error("Error during GitHub login:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex">

      {/* ── Left Panel ── */}
      <div className="flex flex-col w-1/2 px-14 py-10">

        {/* Logo + hero copy — vertically centered together */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-8">
            <img
              src="/viber logo.png"
              alt="Viber"
              className="w-16 h-16 object-contain flex-shrink-0"
              style={{ mixBlendMode: "screen" }}
            />
            {/* Brand name + typewriter — inline */}
            <span className="flex items-center gap-1.5 text-white font-semibold text-lg tracking-tight">
              Viber
              <span className="text-zinc-500">·</span>
              <span className="flex items-center font-mono text-zinc-400">
                <span>{typedText}</span>
                <span className="inline-block w-[2px] h-[1em] bg-zinc-400 ml-0.5 animate-pulse" />
              </span>
            </span>
          </div>

          <h1 className="text-white font-bold text-5xl leading-[1.1] tracking-tight mb-4">
            Cut Code Review<br />
            Time &amp; Bugs in Half.<br />
            Instantly.
          </h1>
          <p className="text-zinc-400 text-base max-w-sm leading-relaxed">
            Supercharge your team to ship faster with the most advanced AI
            code reviews.
          </p>
        </div>

      </div>

      {/* ── Right Panel ── */}
      <div className="flex flex-col justify-center w-1/2 px-16">
        <div className="max-w-sm w-full">

          {/* Heading */}
          <h2 className="text-white font-bold text-2xl mb-1.5">
            Welcome Back
          </h2>
          <p className="text-zinc-400 text-sm mb-8">
            Login using the following providers:
          </p>

          {/* GitHub button */}
          <Button
            onClick={handleGithubLogin}
            disabled={isLoading}
            className="w-full h-11 bg-white hover:bg-zinc-100 text-black font-medium text-sm rounded-md flex items-center justify-center gap-2.5 transition-colors duration-200 cursor-pointer"
          >
            {isLoading ? (
              <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            ) : (
              <GithubIcon className="w-4 h-4" />
            )}
            GitHub
          </Button>

          {/* Sign-up & self-hosted */}
          <div className="flex flex-col items-center gap-2 mt-6 text-sm">
            <p className="text-zinc-400">
              New to Viber?{" "}
              <a
                href="/signup"
                className="text-white font-semibold hover:underline underline-offset-2"
              >
                Sign Up
              </a>
            </p>
            <span className="text-white font-semibold text-sm">
              Self-Hosted Services
            </span>
          </div>

          {/* Divider + footer */}
          <Separator className="my-8 bg-zinc-800" />

          <div className="flex items-center justify-center gap-2 text-zinc-500 text-xs">
            <a href="/terms" className="hover:text-zinc-300 transition-colors">
              Terms of Use
            </a>
            <span>and</span>
            <a href="/privacy" className="hover:text-zinc-300 transition-colors">
              Privacy Policy
            </a>
          </div>

        </div>
      </div>

    </div>
  )
}

export default LoginUI