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

```tsx highlight=7
import { useRealtime } from 'react-supabase'

function Page() {
  const [result, reexecute] = useRealtime(
    'todos',
    { select: { columns:'id, username' } },
    (data, payload) => data.username === payload.username,
  )

  return ...
}
```

## Initial selection of records

When initializing the component you might need to filter your data appropriately. You can pass the options directly to the `useSelect` hook.

First argument can be either a `string` table name or `useSelect` options with table property.

```tsx highlight=7,8,9,10
import { useRealtime } from 'react-supabase'

function Page() {
  const [result, reexecute] = useRealtime(
    'todos',
    {
      select: {
        columns: 'id, username, description',
        filter: (query) => query.eq('completed', false),
      }
    },
    (data, payload) => data.username === payload.username,
  )

  return ...
}
```
