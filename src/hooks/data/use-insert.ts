import { useCallback, useEffect, useRef, useState } from 'react'

import { Count, PostgrestError, Returning } from '../../types'
import { initialState } from '../state'
import { useClient } from '../use-client'

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
    returning?: Returning
    count?: null | Count
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
            const res = { count, data, error }
            if (isMounted.current) setState({ ...res, fetching: false })
            return res
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
