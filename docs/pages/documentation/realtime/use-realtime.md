# useRealtime

Fetch table and listen for changes.

```tsx highlight=4
import { useRealtime } from 'react-supabase'

function Page() {
  const [{ data, error, fetching }, reexecute] = useRealtime('todos')

  return ...
}
```

## Compare function

You can pass a function for comparing subscription event changes. By default, the compare function checks the `id` field.

When using your own compare function, you typically want to compare unique values:

```tsx highlight=6
import { useRealtime } from 'react-supabase'

function Page() {
  const [result, reexecute] = useRealtime(
    'todos',
    (data, payload) => data.username === payload.username,
  )

  return ...
}
```
