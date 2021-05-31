# Provider

In order to use a Supabase client, you need to provide it via the [Context API](https://reactjs.org/docs/context.html). This may be done with the help of the Provider export.

```tsx
import { createClient } from '@supabase/supabase-js'
import { Provider } from 'react-supabase'

const client = createClient('https://xyzcompany.supabase.co', 'public-anon-key')

const App = () => (
  <Provider value={client}>
    <YourRoutes />
  </Provider>
)
```

All examples and code snippets from now on assume that they are wrapped in a `Provider`.
