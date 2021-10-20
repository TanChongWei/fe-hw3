import React from 'react'
import { useAuth, LogoutButton } from './domains/auth'
import { Link } from 'react-router-dom'

export const AppShell = ({ children }) => {
  const { status } = useAuth()

  return (
    <>
      <header className="md:sticky md:top-0 bg-white md:z-10">
        <div className="px-4">
          <div className="flex justify-between items-center py-2 max-w-7xl mx-auto border-b border-gray-200">
            <nav className="flex items-center">
              <Link
                to="/marketplace"
                className="text-xl inline-block mr-4 font-bold text-pink-700 hover:text-pink-900"
              >
            Marketplace
              </Link>
            </nav>
            {status === 'authenticated' ? (
              <div className="flex gap-3">
                <LogoutButton />
              </div>
            ) : (
              <div className="flex gap-3">
                <Link
                  to="/login"
                  className="text-sm px-4 py-1 text-pink-500"
                >Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>
      <main>{children}</main>
    </>
  )
}