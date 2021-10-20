import * as React from 'react'
import {useHistory} from 'react-router-dom'
// import { fetchJson } from 'lib/fetch-json'

const BASE_URL = "https://ecomm-service.herokuapp.com"

const ACCESS_TOKEN_STORAGE = 'auth'

const storedAccessToken = localStorage.getItem(ACCESS_TOKEN_STORAGE)

const AUTH_DEFAULT_STATE = storedAccessToken
  ? {
    status: 'authenticated',
    accessToken: storedAccessToken,
  }
  : {
    status: 'anonymous',
    accessToken: null,
  }

const AuthContext = React.createContext()

const authReducer = (state, event) => {
  switch (event.type) {
  case 'login':
    return {
      accessToken: event.accessToken,
      status: 'authenticated',
    }

  case 'logout':
    return {
      accessToken: null,
      status: 'anonymous',
    }

  default:
    throw new Error(
      `Unsupported event type ${event.type} in authReducer`
    )
  }
}

export const useAuthState = () => {
  const [state, dispatch] = React.useReducer(authReducer, AUTH_DEFAULT_STATE)

  const login = (accessToken) =>
    dispatch({
      type: 'login',
      accessToken,
    })

  const logout = () =>
    dispatch({
      type: 'logout',
    })

  return {
    ...state,
    login,
    logout,
  }
}

export const AuthProvider = ({ children }) => {
  const auth = useAuthState()

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const auth = React.useContext(AuthContext)

  if (!auth) {
    throw new Error('Your application must be wrapped with AuthProvider')
  }

  return auth
}

const login = (email, password) =>
  fetch(`${BASE_URL}/login`, {
    method: 'POST',
    body: {
      username: email,
      password,
    },
  }).then((res) => res.json())


export const useLogin = () => {
  const auth = React.useContext(AuthContext)

  if (!auth) {
    throw new Error('Your application must be wrapped with AuthProvider')
  }

  return function invokeLogin({ email, password }) {
    return login(email, password).then((res) => {
      console.log('logging in')
      auth.login(res.access_token)
      localStorage.setItem(ACCESS_TOKEN_STORAGE, res.access_token)
    })
  }
}


export const useLogout = () => {
  const auth = React.useContext(AuthContext)

  if (!auth) {
    throw new Error('Your application must be wrapped with AuthProvider')
  }

  return () => {
    auth.logout()
    localStorage.removeItem(ACCESS_TOKEN_STORAGE)
  }
}
