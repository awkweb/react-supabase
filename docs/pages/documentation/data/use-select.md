# useSelect

Performs vertical filtering with SELECT.

```tsx highlight=4
import { useSelect } from 'react-supabase'

function Page() {
  const [{ count, data, error, fetching }, reexecute] = useSelect('todos')

  if (error) return <div>{error.message}</div>
  if (fetching) return <div>Loading todos</div>
  if (data?.length === 0) return <div>No todos</div>

  return ...
}
```

## Passing options

During hook initialization:

```tsx
const [{ count, data, error, fetching }, reexecute] = useSelect('todos', {
  columns: 'id, name, description',
  filter: (query) => query.eq('status', 'completed'),
  options: {
    count: 'exact',
    head: false,
  },
  pause: false,
})
```

## Dynamic filtering

When using dynamic filters, you must make sure filters aren’t recreated every render. Otherwise, your request can get stuck in an infinite loop.

The easiest way to avoid this is to create dynamic filters with the [`useFilter`](/documentation/data/use-filter) hook:

```tsx
import { useState } from 'react'
import { useFilter, useSelect } from 'react-supabase'

function Page() {
  const [status, setStatus] = useState('completed')
  const filter = useFilter(
    (query) => query.eq('status', status),
    [status],
  )
  const [result, reexecute] = useSelect('todos', { filter })

  return ...
}
```

## Pausing `useSelect`

In some cases, we may want `useSelect` to execute when a pre-condition has been met, and not execute otherwise. For instance, we may be building a form and want validation to only take place when a field has been filled out.

We can do this by setting the `pause` option to `true`:

```tsx
import { useState } from 'react'
import { useFilter, useSelect } from 'react-supabase'

function Page() {
  const [username, setUsername] = useState(null)
  const filter = useFilter(
    (query) => query.eq('username', username),
    [username],
  )
  const [result, reexecute] = useSelect('users', {
    filter,
    pause: !username,
  })

  return (
    <form>
      <label>Enter a username</label>
      <input onChange={(e) => setUsername(e.target.value)} />
      {result.data && <div>Username is taken</div>}
    </form>
  )
}
```
