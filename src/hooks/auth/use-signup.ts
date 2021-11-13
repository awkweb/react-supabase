import { Session, User, UserCredentials } from '@supabase/gotrue-js'
import { ApiError } from '@supabase/gotrue-js/dist/main/GoTrueApi'
import { useCallback, useState } from 'react'

import { useClient } from '../use-client'
import { initialState } from './state'

export type UseSignUpState = {
    error?: ApiError | null
    fetching: boolean
    session?: Session | null
    user?: User | null
}

export type UseSignUpResponse = [
    UseSignUpState,
    (
        credentials: UserCredentials,
        options?: UseSignUpOptions,
    ) => Promise<Pick<UseSignUpState, 'error' | 'session' | 'user'>>,
]

export type UseSignUpOptions = {
    redirectTo?: string
}

export type UseSignUpConfig = {
    options?: UseSignUpOptions
}

export function useSignUp(config: UseSignUpConfig = {}): UseSignUpResponse {
    const client = useClient()
    const [state, setState] = useState<UseSignUpState>(initialState)

    const execute = useCallback(
        async (credentials: UserCredentials, options?: UseSignUpOptions) => {
            setState({ ...initialState, fetching: true })
            const { error, session, user } = await client.auth.signUp(
                credentials,
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
