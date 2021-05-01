# User Context

Keep track of the authenticated user using the [Context API](https://reactjs.org/docs/context.html) and `useAuthStateChange` hook. First, create a context and user hook:

```js
import { createContext, useEffect, useState } from 'react'
import { useAuthStateChange, useClient } from 'react-supabase'

const initialState = { session: null, user: null }
export const UserContext = createContext(initialState)

export const UserProvider = ({ children }) => {
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
    <UserContext.Provider value={state}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw Error('useUser must be used within UserProvider')
  return context
}
```

Wrap your app in `UserProvider` and use the `useUser` hook in your components:

```js
function LoggedInView() {
  const { session, user } = useUser()

  if (!session) return <Error />
  return (
    <div>
      {JSON.stringify(session)}
      {JSON.stringify(user)}
    </div>
  )
}
```
