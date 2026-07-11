"use client";
import React from 'react'
import { signOut } from '@/lib/auth-client'

const Logout = ({
  children,
  className
}: {
  children?: React.ReactNode
  className?: string
}) => {
  return (
    <span className={className}
      onClick={() => signOut({
        fetchOptions: {
          onSuccess: () => {
            window.location.href = '/login'
          }
        }
      })}>
      {children}
    </span>
  )
}

export default Logout