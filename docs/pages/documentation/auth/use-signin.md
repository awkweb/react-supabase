# useSignIn

Log in existing user, or login via a third-party provider.

```js
import { useSignIn } from 'react-supabase'

function Page() {
  const [{ error, fetching, session, user }, signIn] = useSignIn({
    // Passing optional options
    options: {
      redirectTo: 'https://example.com/dashboard',
    },
  })

  async function onClickSignIn() {
    const { error, session, user } = await signIn(
      {
        email: 'user@example.com',
        password: 'foobarbaz',
      },
      {
        // Override options from hook init
        redirectTo: 'https://example.com/account',
      },
    )
  }

  if (error) return <div>Error signing in</div>
  if (fetching) return <div>Signing in</div>
  if (user) return <div>Logged in</div>

  return ...
}
```

## Magic links

Omit password from the execute function:

```js
const { error, session, user } = await signIn({ email: 'user@example.com' })
```

## Third-party providers

Either pass a provider (and scopes) during hook initialization:

```js
const [{ error, fetching, user, session }, signIn] = useSignIn({
  provider: 'github',
  options: {
    scopes: 'repo gist notifications',
  },
})
```

Or the execute function:

```js
const { error, session, user } = await signIn(
  { provider: 'github' },
  { scopes: 'repo gist notifications' },
)
```
