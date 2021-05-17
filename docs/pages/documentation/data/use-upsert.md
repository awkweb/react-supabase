# useUpsert

Performs `INSERT` or `UPDATE` on table.

```js highlight=4
import { useUpsert } from 'react-supabase'

function Page() {
  const [{ count, data, error, fetching }, execute] = useUpsert('users')

  async function onClickMarkAllComplete() {
    const { count, data, error } = await execute(
      { completed: true },
      { onConflict: 'username' },
      (query) => query.eq('completed', false),
    )
  }

  return ...
}
```

## Notes

- By specifying the `onConflict` option, you can make `UPSERT` work on a column(s) that has a `UNIQUE` constraint.
- Primary keys should to be included in the data payload in order for an update to work correctly.
- Primary keys must be natural, not surrogate. There are however, workarounds for surrogate primary keys.
- Param `filter` makes sense only when operation is update
- Upsert supports sending array of elements, just like `useInsert`

## Passing options

During hook initialization:

```js
const [{ count, data, error, fetching }, execute] = useUpsert('users', {
  filter: (query) => query.eq('completed', false),
  options: {
    returning: 'represenation',
    onConflict: 'username',
    count: 'exact',
  },
})
```

Or execute function:

```js
const { count, data, error } = await execute(
  { completed: true },
  {
    count: 'estimated',
    onConflict: 'username',
    returning: 'minimal',
  },
  (query) => query.eq('completed', false),
)
```
