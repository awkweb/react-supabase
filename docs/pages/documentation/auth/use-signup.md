# useSignUp

Creates new user.

```js highlight=4,5,6,7,8,9
import { useSignUp } from 'react-supabase'

function Page() {
  const [{ error, fetching, session, user }, signUp] = useSignUp({
    // Passing optional options
    options: {
      redirectTo: 'https://example.com/dashboard',
    },
  })

  async function onClickSignUp() {
    const { error, session, user } = await signUp(
      {
        email: 'user@example.com',
        password: 'foobarbaz',
      },
      {
        // Override options from hook init
        redirectTo: 'https://example.com/welcome',
      },
    )
  }

  if (error) return <div>Error signing up</div>
  if (fetching) return <div>Signing up</div>
  if (user) return <div>Welcome user</div>

  return ...
}
```
