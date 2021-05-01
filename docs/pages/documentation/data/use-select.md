import Link from 'next/link'

# useSelect

Performs vertical filtering with SELECT.

```js highlight=4,5,6,7,8,9,10,11,12,13,14,15,16,17,18
import { useSelect } from 'react-supabase'

function Page() {
  const [
    { count, data, error, fetching },
    selectTodos,
  ] = useSelect(
    'todos',
    // Passing optional options
    {
      columns: 'id, name, description',
      filter: (query) => query.eq('status', 'completed'),
      options: {
        count: 'exact',
        head: false,
      },
    },
  )

  if (error) return <div>{error.message}</div>
  if (fetching) return <div>Loading todos</div>
  if (data?.length === 0) return <div>No todos</div>

  return ...
}
```

## Dynamic filtering

When using dynamic filters, you must make sure filters aren't recreated every render. Otherwise, your request can get stuck in an infinite loop.

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
