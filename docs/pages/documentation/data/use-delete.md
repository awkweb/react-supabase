# useDelete

Performs a DELETE on the table.

```js
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
