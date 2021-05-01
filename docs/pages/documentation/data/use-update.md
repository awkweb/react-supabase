# useUpdate

Performs UPDATE on table.

```js highlight=4
import { useUpdate } from 'react-supabase'

function Page() {
  const [{ count, data, error, fetching }, updateTodos] = useUpdate('todos')

  async function onClickMarkAllComplete() {
    const { count, data, error } = await updateTodos(
      { completed: true },
      (query) => query.eq('completed', false),
    )
  }

  return ...
}
```

Throws error during execute if a filter is not passed during hook initialization or execute method.

## Passing options

During hook initialization:

```js
const [{ count, data, error, fetching }, updateTodos] = useUpdate('todos', {
  filter: (query) => query.eq('completed', false),
  options: {
    returning: 'represenation',
    count: 'exact',
  },
})
```

Or execute function:

```js
const { count, data, error } = await updateTodos(
  { completed: true },
  (query) => query.eq('completed', false),
  {
    count: 'estimated',
    returning: 'minimal',
  },
)
```
