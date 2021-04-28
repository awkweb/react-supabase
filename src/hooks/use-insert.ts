import { useCallback, useEffect, useRef, useState } from 'react'

import { PostgrestError } from '../types'
import { useClient } from './use-client'
import { initialState } from './state'

export type UseInsertState<Data = any> = {
    count?: number | null
    data?: Data | Data[] | null
    error?: PostgrestError | null
    fetching: boolean
}

export type UseInsertResponse<Data = any> = [
    UseInsertState<Data>,
    (
        values: Partial<Data> | Partial<Data>[],
        options?: UseInsertOptions,
    ) => Promise<Pick<UseInsertState<Data>, 'count' | 'data' | 'error'>>,
]

export type UseInsertOptions = {
    returning?: 'minimal' | 'representation'
    count?: null | 'exact' | 'planned' | 'estimated'
}

export type UseInsertConfig = {
    options?: UseInsertOptions
}

export function useInsert<Data = any>(
    table: string,
    config: UseInsertConfig = { options: {} },
): UseInsertResponse<Data> {
    const client = useClient()
    const isMounted = useRef(false)
    const [state, setState] = useState<UseInsertState>(initialState)

    /* eslint-disable react-hooks/exhaustive-deps */
    const execute = useCallback(
        async (
            values: Partial<Data> | Partial<Data>[],
            options?: UseInsertOptions,
        ) => {
            setState({ ...initialState, fetching: true })
            const { count, data, error } = await client
                .from<Data>(table)
                .insert(values, options ?? config.options)
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
