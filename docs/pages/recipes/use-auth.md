# useAuth

Keep track of the authenticated session with the [Context API](https://reactjs.org/docs/context.html) and [`useAuthStateChange`](/documentation/auth/use-auth-state-change) hook. First, create a new React Context:

```js
import { createContext, useEffect, useState } from 'react'
import { useAuthStateChange, useClient } from 'react-supabase'

const initialState = { session: null, user: null }
export const AuthContext = createContext(initialState)

export function AuthProvider({ children }) {
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

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
}
```

And auth hook:

```js
import { AuthContext } from 'path/to/auth/context'

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw Error('useAuth must be used within AuthProvider')
  return context
}
```

Then, wrap your app in `AuthProvider` and use the `useAuth` hook in your components:

```js highlight=4
import { useAuth } from 'path/to/auth/hook'

function Page() {
  const { session, user } = useAuth()

  if (!session) return <div>Hello, stranger</div>

  return <div>Welcome back, {user.email}</div>
}
```
