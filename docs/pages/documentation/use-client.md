# useClient

Allows you to access the Supabase client directly, which is useful for use cases not covered by existing hooks or other customer behavoir.

```tsx highlight=4
import { useClient } from 'react-supabase'

function Page() {
  const client = useClient()

  // Interact with client normally
  // client.from('todos').filter(...)

  return ...
}
```

Most of the time, you probably want to use the existing hooks for auth, data fetching/mutation, subscriptions, and storage.
