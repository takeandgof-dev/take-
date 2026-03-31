const ADMIN_PASSWORD = "112233"
const AUTH_TOKEN_KEY = "admin_auth_token"

export async function signIn(password: string): Promise<{ authenticated: boolean; error: string | null }> {
  if (password === ADMIN_PASSWORD) {
    // Store auth token in localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem(AUTH_TOKEN_KEY, "authenticated")
    }
    return { authenticated: true, error: null }
  }
  return { authenticated: false, error: "Fel lösenord" }
}

export async function signOut(): Promise<void> {
  if (typeof window !== "undefined") {
    localStorage.removeItem(AUTH_TOKEN_KEY)
  }
}

export function getCurrentUser(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem(AUTH_TOKEN_KEY)
      resolve(token === "authenticated")
    } else {
      resolve(false)
    }
  })
}

export function isAuthenticated(): boolean {
  if (typeof window !== "undefined") {
    return localStorage.getItem(AUTH_TOKEN_KEY) === "authenticated"
  }
  return false
}
