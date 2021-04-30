# useSignUp

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
