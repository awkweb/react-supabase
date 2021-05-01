# useSubscription

Subscribe to realtime changes to databse.

```js highlight=4,5,6
import { useSubscription } from 'react-supabase'

function Page() {
  useSubscription((payload) => {
      console.log('Change received!', payload)
  })

  return ...
}
```

## Passing options

During hook initialization:

```js
useSubscription(
  (payload) => {
    console.log('Change received!', payload)
  },
  {
    event: 'INSERT',
    table: 'todos',
  },
)
```
