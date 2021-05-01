# useResetPassword

Sends reset request to email address.

```js
import { useResetPassword } from 'react-supabase'

function Page() {
  const [{ error, fetching }, resetPassword] = useResetPassword({
    // Passing optional options
    options: {
      redirectTo: 'https://example.com/welcome',
    },
  })

  async function onClickResetPassword() {
    const { error } = await resetPassword('user@example.com', {
      // Override options from hook init
      redirectTo: 'https://example.com/reset',
    })
  }

  if (error) return <div>Error sending email</div>
  if (fetching) return <div>Sending reset email</div>

  return ...
}
```
