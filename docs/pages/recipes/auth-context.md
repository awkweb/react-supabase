# Auth Context

Keep track of the authenticated user using the [Context API](https://reactjs.org/docs/context.html) and `useAuthStateChange` hook.

First, create a context and user hook:

```js
import { createContext, useEffect, useState } from 'react'
import { useAuthStateChange, useClient } from 'react-supabase'

const initialState = { session: null, user: null }
export const AuthContext = createContext(initialState)

export const AuthProvider = ({ children }) => {
  const client = useClient()
  const [state, setState] = useState(initialState)

  useEffect(() => {
    const session = client.auth.session()
    setState({ session, user: session?.user ?? null })
  }, [])

  useAuthStateChange((event, session) => {
    console.log(`Supbase auth event: ${event}`, session)
    setState({ session, user: session?.user ?? null })
  })

  return (
    <AuthContext.Provider value={state}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw Error('useAuth must be used within AuthProvider')
  return context
}
```

Wrap your app in `AuthProvider` and use the `useAuth` hook in your components:

```js highlight=4
import { useAuth } from 'path/to/auth'

function Page() {
  const { session, user } = useAuth()

  if (!session) return <div>Hello, stranger</div>

  return <div>Welcome back, {user.email}</div>
}
```
