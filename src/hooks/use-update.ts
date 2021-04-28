import { useCallback, useEffect, useRef, useState } from 'react'

import { Count, PostgrestError, Returning } from '../types'
import { useClient } from './use-client'
import { initialState } from './state'

export type UseUpdateState<Data = any> = {
    count?: number | null
    data?: Data | Data[] | null
    error?: PostgrestError | null
    fetching: boolean
}

export type UseUpdateResponse<Data = any> = [
    UseUpdateState<Data>,
    (
        values: Partial<Data>,
        options?: UseUpdateOptions,
    ) => Promise<Pick<UseUpdateState<Data>, 'count' | 'data' | 'error'>>,
]

export type UseUpdateOptions = {
    returning?: Returning
    count?: null | Count
}

export type UseUpdateConfig = {
    options?: UseUpdateOptions
}

export function useUpdate<Data = any>(
    table: string,
    config: UseUpdateConfig = { options: {} },
): UseUpdateResponse<Data> {
    const client = useClient()
    const isMounted = useRef(false)
    const [state, setState] = useState<UseUpdateState>(initialState)

    /* eslint-disable react-hooks/exhaustive-deps */
    const execute = useCallback(
        async (values: Partial<Data>, options?: UseUpdateOptions) => {
            setState({ ...initialState, fetching: true })
            const { count, data, error } = await client
                .from<Data>(table)
                .update(values, options ?? config.options)
            if (isMounted.current) setState({ data, error, fetching: false })
            return { count, data, error }
        },
        [client],
    )
    /* eslint-enable react-hooks/exhaustive-deps */

    useEffect(() => {
        isMounted.current = true
        return () => {
            isMounted.current = false
        }
    }, [])

    return [state, execute]
}
