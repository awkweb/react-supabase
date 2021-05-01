# useSignOut

Remove logged in user and trigger a `SIGNED_OUT` event.

```js highlight=4
import { useSignOut } from 'react-supabase'

function Page() {
  const [{ error, fetching }, signOut] = useSignOut()

  async function onClickSignOut() {
    const { error } = await signOut()
  }

  if (error) return <div>Error signing out</div>
  if (fetching) return <div>Signing out</div>

  return ...
}
```
