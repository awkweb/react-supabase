# useFilter

Creates dynamic filter for using with other hooks.

```tsx highlight=4,5,6,7,8,9,10,11
import { useFilter, useSelect } from 'react-supabase'

function Page() {
  const filter = useFilter(
    (query) =>
      query
        .eq('status', status)
        .textSearch('name', `'exercise' & 'shopping'`)
        .limit(10),
    [status],
  )
  // Pass filter to other hooks
  const [{ data }] = useSelect('todos', { filter })

  return ...
}
```

For an example, see [`useSelect` "Dynamic Filtering"](/documentation/data/use-select#dynamic-filtering).
