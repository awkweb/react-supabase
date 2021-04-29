## Introduction

`react-supabase` is a React Hooks library for [Supabase](https://supabase.io).

With `react-supabase`, components can request and access data declaratively without needing to handle state updates on their own.

<br/>

## Installation

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

Now every component inside and under the `Provider` can use the Supabase client:

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

### API

#### Auth

```js
useAuthStateChange((event, session) => {
  console.log(`Supbase auth event: ${event}`, session)
})
```

```js
const [{ error, fetching }, resetPassword] = useResetPassword({
  options: {
    redirectTo: 'https://example.com/welcome',
  },
})

const { error } = await resetPassword('user@example.com', {
  redirectTo: 'https://example.com/reset',
})
```

```js
const [{ error, fetching, user, session }, signIn] = useSignIn({
  // provider: 'github',
  options: {
    redirectTo: 'https://example.com/dashboard',
    // scopes: 'repo gist notifications',
  },
})

const { error, session, user } = await signIn(
  {
    email: 'user@example.com',
    password: 'foobarbaz', // omit for magic link
    // provider: 'github',
  },
  {
    redirectTo: 'https://example.com/dashboard',
    // scopes: 'repo gist notifications',
  },
)
```

```js
const [{ error, fetching }, signOut] = useSignOut()

const { error } = await signOut()
```

```js
const [{ error, fetching, user, session }, signUp] = useSignUp({
  options: {
    redirectTo: 'https://example.com/dashboard',
  },
})

const { error, session, user } = await signUp(
  {
    email: 'user@example.com',
    password: 'foobarbaz',
  },
  {
    redirectTo: 'https://example.com/dashboard',
  },
)
```

#### Data

#### Realtime

#### Storage

<br/>

## License

The MIT License.
