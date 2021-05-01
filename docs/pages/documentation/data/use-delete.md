# useDelete

Performs a DELETE on the table.

```js highlight=4,5,6,7,8,9,10,11,12,13,14
import { useDelete } from 'react-supabase'

function Page() {
  const [
    { count, data, error, fetching }, deleteTodos] = useDelete(
    'todos',
    {
      // Passing optional options
      options: {
        returning: 'represenation',
        count: 'exact',
      },
    },
  )

  async function onClickDelete(id) {
    const { count, data, error } = await deleteTodos(
      (query) => query.eq('id', id),
      {
        // Override options from hook init
        returning: 'minimal',
        count: 'estimated',
      },
    )
  }

  return ...
}
```

Throws error during execute if `filter` is not passed during hook initialization or execute method directly.
