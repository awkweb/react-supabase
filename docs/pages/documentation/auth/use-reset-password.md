# useResetPassword

Sends reset request to email address.

```js highlight=4
import { useResetPassword } from 'react-supabase'

function Page() {
  const [{ error, fetching }, resetPassword] = useResetPassword()

  async function onClickResetPassword() {
    const { error } = await resetPassword('user@example.com')
  }

  if (error) return <div>Error sending email</div>
  if (fetching) return <div>Sending reset email</div>

  return ...
}
```

## Passing options

During hook initialization:

```js
const [{ error, fetching }, resetPassword] = useResetPassword({
  options: {
    redirectTo: 'https://example.com/welcome',
  },
})
```

Or execute function:

```js
const { error } = await resetPassword('user@example.com', {
  redirectTo: 'https://example.com/reset',
})
```
