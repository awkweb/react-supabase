# useInsert

Performs an INSERT into the table.

```js highlight=4,5,6,7,8,9,10,11,12,13
import { useInsert } from 'react-supabase'

function Page() {
  const [{ count, data, error, fetching }, insertTodo] = useInsert(
    'todos',
    // Passing optional options
    {
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
