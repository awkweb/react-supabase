# useSignIn

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
