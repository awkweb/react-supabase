# useSignUp

Creates new user.

```tsx highlight=4
import { useSignUp } from 'react-supabase'

function Page() {
  const [{ error, fetching, session, user }, signUp] = useSignUp()

  async function onClickSignUp() {
    const { error, session, user } = await signUp({
      email: 'user@example.com',
      password: 'foobarbaz',
    })
  }

  if (error) return <div>Error signing up</div>
  if (fetching) return <div>Signing up</div>
  if (user) return <div>Welcome user</div>

  return ...
}
```

## Passing options

During hook initialization:

```tsx
const [{ error, fetching, session, user }, signUp] = useSignUp({
  options: {
    redirectTo: 'https://example.com/dashboard',
  },
})
```

Or execute function:

```tsx
const { error, session, user } = await signUp(
  {
    email: 'user@example.com',
    password: 'foobarbaz',
  },
  {
    redirectTo: 'https://example.com/welcome',
  },
)
```
