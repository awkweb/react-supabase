# useInsert

Performs INSERT into table.

```tsx highlight=4
import { useInsert } from 'react-supabase'

function Page() {
  const [{ count, data, error, fetching }, execute] = useInsert('todos')

  async function onClickInsert(name) {
    const { count, data, error } = await insertTodos({
      name,
    })
  }

  return ...
}
```

## Passing options

During hook initialization:

```tsx
const [{ count, data, error, fetching }, execute] = useInsert('todos', {
  options: {
    returning: 'represenation',
    count: 'exact',
  },
})
```

Or execute function:

```tsx
const { count, data, error } = await execute(
  { name: 'Buy more cheese' },
  {
    count: 'estimated',
    returning: 'minimal',
  },
)
```
