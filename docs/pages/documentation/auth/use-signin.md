# useSignIn

Log in existing user, or login via a third-party provider.

```tsx highlight=4
import { useSignIn } from 'react-supabase'

function Page() {
  const [{ error, fetching, session, user }, signIn] = useSignIn()

  async function onClickSignIn() {
    const { error, session, user } = await signIn({
      email: 'user@example.com',
      password: 'foobarbaz',
    })
  }

  if (error) return <div>Error signing in</div>
  if (fetching) return <div>Signing in</div>
  if (user) return <div>Logged in</div>

  return ...
}
```

## Passing options

During hook initialization:

```tsx
const [{ error, fetching, session, user }, signIn] = useSignIn({
  options: {
    redirectTo: 'https://example.com/dashboard',
  },
})
```

Or the execute function:

```tsx
const { error, session, user } = await signIn(
  {
    email: 'user@example.com',
    password: 'foobarbaz',
  },
  {
    redirectTo: 'https://example.com/account',
  },
)
```

## Magic links

Omit password from the execute function:

```tsx
const { error, session, user } = await signIn({ email: 'user@example.com' })
```

## Third-party providers

Either pass a provider (and scopes) during hook initialization:

```tsx
const [{ error, fetching, user, session }, signIn] = useSignIn({
  provider: 'github',
  options: {
    scopes: 'repo gist notifications',
  },
})
```

Or execute function:

```tsx
const { error, session, user } = await signIn(
  { provider: 'github' },
  { scopes: 'repo gist notifications' },
)
```
