import React from 'react'
import { useAuth } from './domains/auth'
import { LoginPage } from './pages/login'
import { Marketplace } from './pages/marketplace'

const App = () => {
  const { status } = useAuth()
  console.log(status)

  return (
    <div>
      {status === 'authenticated' 
        ? <Marketplace />
        : <LoginPage />
      }
    </div>
  )
}

export default App

