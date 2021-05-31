# useDelete

Performs DELETE on table.

```tsx highlight=4
import { useDelete } from 'react-supabase'

function Page() {
  const [{ count, data, error, fetching }, execute] = useDelete('todos')

  async function onClickDelete(id) {
    const { count, data, error } = await deleteTodos(
      (query) => query.eq('id', id),
    )
  }

  return ...
}
```

Throws error during execute if a filter is not passed during hook initialization or execute method.

## Passing options

During hook initialization:

```tsx
const [{ count, data, error, fetching }, execute] = useDelete('todos', {
  filter: (query) => query.eq('status', 'completed'),
  options: {
    returning: 'represenation',
    count: 'exact',
  },
})
```

Or execute function:

```tsx
const { count, data, error } = await execute((query) => query.eq('id', id), {
  returning: 'minimal',
  count: 'estimated',
})
```
