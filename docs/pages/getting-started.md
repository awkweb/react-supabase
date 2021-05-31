# Getting Started

## Installation

```
yarn add react-supabase @supabase/supabase-js
# or
npm install --save react-supabase @supabase/supabase-js
```

## Quick Start

Create a Supabase client and pass it to the `Provider`:

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

Now every component inside and under the `Provider` can use the Supabase client and hooks:

```tsx
import { useRealtime } from 'react-supabase'

const Todos = () => {
  const [result, reexecute] = useRealtime('todos')

  const { data, fetching, error } = result

  if (fetching) return <p>Loading...</p>
  if (error) return <p>Oh no... {error.message}</p>

  return (
    <ul>
      {data.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  )
}
```
