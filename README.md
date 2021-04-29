## Introduction

`react-supabase` is a React Hooks library for [Supabase](https://supabase.io).

<br/>

## Installation

Inside your React project directory, install:

```
yarn add react-supabase @supabase/supabase-js
# or
npm install --save react-supabase @supabase/supabase-js
```

<br/>

## Usage

Create a Supabase client and pass it to the `Provider`:

```js
import { createClient } from '@supabase/supabase-js'
import { Provider } from 'react-supabase'

const client = createClient('https://xyzcompany.supabase.co', 'public-anon-key')

const App = () => (
  <Provider value={client}>
    <YourRoutes />
  </Provider>
)
```

Now every component and element inside and under the `Provider` can use the Supabase client:

```js
import { useSelect } from 'react-supabase'

const Todos = () => {
  const [result, reexecuteSelect] = useSelect('todos')

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

<br/>

## License

The MIT License.
