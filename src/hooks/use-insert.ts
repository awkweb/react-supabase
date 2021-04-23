import { useCallback, useEffect, useRef, useState } from 'react'

import { useClient } from '../context'
import { PostgrestError } from '../types'
import { initialState } from './state'

type UseInsertOptions = {
    returning?: 'minimal' | 'representation'
    count?: null | 'exact' | 'planned' | 'estimated'
}

export type UseInsertArgs = {
    options?: UseInsertOptions
    table: string
}

export type UseInsertState<Data = any> = {
    count?: number | null
    data?: Data | Data[] | null
    error?: PostgrestError | null
    fetching: boolean
}

export type UseInsertResponse<Data = any> = [
    UseInsertState<Data>,
    (
        values: Partial<Data>[],
        options?: UseInsertOptions,
    ) => Promise<Pick<UseInsertState<Data>, 'count' | 'data' | 'error'>>,
]

export function useInsert<Data = any>(
    args: UseInsertArgs,
): UseInsertResponse<Data> {
    const client = useClient()
    const isMounted = useRef(true)
    const [state, setState] = useState<UseInsertState>(initialState)

    /* eslint-disable react-hooks/exhaustive-deps */
    const execute = useCallback(
        async (values: Partial<Data>[], options?: UseInsertOptions) => {
            setState({ ...initialState, fetching: true })
            const { count, data, error } = await client
                .from<Data>(args.table)
                .insert(values, options ?? args.options)
            if (isMounted.current) {
                setState({ data, error, fetching: false })
            }
            return { count, data, error }
        },
        [client],
    )
    /* eslint-enable react-hooks/exhaustive-deps */

    useEffect(() => {
        return () => {
            isMounted.current = false
        }
    }, [])

    return [state, execute]
}
