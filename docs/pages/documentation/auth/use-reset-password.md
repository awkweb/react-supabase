# useResetPassword

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
