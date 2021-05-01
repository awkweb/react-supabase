import Link from 'next/link'

# useSelect

Performs vertical filtering with SELECT.

```js highlight=4
import { useSelect } from 'react-supabase'

function Page() {
  const [{ count, data, error, fetching }, selectTodos] = useSelect('todos')

  if (error) return <div>{error.message}</div>
  if (fetching) return <div>Loading todos</div>
  if (data?.length === 0) return <div>No todos</div>

  return ...
}
```

## Passing options

During hook initialization:

```js
const [{ count, data, error, fetching }, selectTodos] = useSelect('todos', {
  columns: 'id, name, description',
  filter: (query) => query.eq('status', 'completed'),
  options: {
    count: 'exact',
    head: false,
  },
})
```

## Dynamic filtering

When using dynamic filters, you must make sure filters aren’t recreated every render. Otherwise, your request can get stuck in an infinite loop.

The easiest way to avoid this is to create dynamic filters with the [`useFilter`](/documentation/data/use-filter) hook:

```js
import { useState } from 'react'
import { useFilter, useSelect } from 'react-supabase'

function Page() {
  const [status, setStatus] = useState('completed')
  const filter = useFilter(
    (query) => query.eq('status', status),
    [status],
  )
  const [{ data }] = useSelect('todos', { filter })

  return ...
}
```
