import { ApiError } from '@supabase/gotrue-js/dist/main/GoTrueApi'
import { useCallback, useState } from 'react'

import { useClient } from '../use-client'

export type UseSignOutState = {
    error?: ApiError | null
    fetching: boolean
}

export type UseSignOutResponse = [
    UseSignOutState,
    () => Promise<Pick<UseSignOutState, 'error'>>,
]

const initialState = {
    error: undefined,
    fetching: false,
}

export function useSignOut(): UseSignOutResponse {
    const client = useClient()
    const [state, setState] = useState<UseSignOutState>(initialState)

    const execute = useCallback(async () => {
        setState({ ...initialState, fetching: true })
        const { error } = await client.auth.signOut()
        const res = { error }
        setState({ ...res, fetching: false })
        return res
    }, [client])

    return [state, execute]
}
