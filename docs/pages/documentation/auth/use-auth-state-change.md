# useAuthStateChange

Receive a notification every time an auth event happens. Composed in the [User Context example](/documentation/recipes/user-context).

```js highlight=4,5,6
import { useAuthStateChange } from 'react-supabase'

function Page() {
  useAuthStateChange((event, session) => {
    console.log(`Supbase auth event: ${event}`, session)
  })

  return ...
}
```

Note: Auth listener is automatically cleaned up during the hook’s [cleanup phase](https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup).
