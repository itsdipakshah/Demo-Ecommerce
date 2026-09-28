import { createContext, useContext, useEffect, useState } from "react"
import axiosClient from "@/api/axiosClient"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem("luma_user")
    if (stored) setUser(JSON.parse(stored))
    setLoading(false)
  }, [])

  async function signup({ name, email, password }) {
    try {
      const { data } = await axiosClient.post("/auth/signup", { name, email, password })
      persist(data)
      return { ok: true }
    } catch (err) {
      return { ok: false, message: err.response?.data?.message || "Could not create account" }
    }
  }

  async function login({ email, password }) {
    try {
      const { data } = await axiosClient.post("/auth/login", { email, password })
      persist(data)
      return { ok: true }
    } catch (err) {
      return { ok: false, message: err.response?.data?.message || "Invalid email or password" }
    }
  }

  function persist(data) {
    localStorage.setItem("luma_token", data.token)
    localStorage.setItem("luma_user", JSON.stringify(data.user))
    setUser(data.user)
  }

  function logout() {
    localStorage.removeItem("luma_token")
    localStorage.removeItem("luma_user")
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
