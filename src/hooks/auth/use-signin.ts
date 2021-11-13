import { Provider, Session, User, UserCredentials } from '@supabase/gotrue-js'
import { ApiError } from '@supabase/gotrue-js/dist/main/GoTrueApi'
import { useCallback, useState } from 'react'

import { useClient } from '../use-client'
import { initialState } from './state'

export type UseSignInState = {
    error?: ApiError | null
    fetching: boolean
    session?: Session | null
    user?: User | null
}

export type UseSignInResponse = [
    UseSignInState,
    (
        credentials: UserCredentials,
        options?: UseSignInOptions,
    ) => Promise<Pick<UseSignInState, 'error' | 'session' | 'user'>>,
]

export type UseSignInOptions = {
    redirectTo?: string
    scopes?: string
}

export type UseSignInConfig = {
    provider?: Provider
    options?: UseSignInOptions
}

export function useSignIn(config: UseSignInConfig = {}): UseSignInResponse {
    const client = useClient()
    const [state, setState] = useState<UseSignInState>(initialState)

    const execute = useCallback(
        async (credentials: UserCredentials, options?: UseSignInOptions) => {
            setState({ ...initialState, fetching: true })
            const { error, session, user } = await client.auth.signIn(
                {
                    provider: config.provider,
                    ...credentials,
                },
                options ?? config.options,
            )
            const res = { error, session, user }
            setState({ ...res, fetching: false })
            return res
        },
        [client, config],
    )

    return [state, execute]
}
