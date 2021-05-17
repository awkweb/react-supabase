import { useCallback, useEffect, useRef, useState } from 'react'

import { Count, Filter, PostgrestError, Returning } from '../../types'
import { useClient } from '../use-client'
import { initialState } from './state'

export type UseUpsertState<Data = any> = {
    count?: number | null
    data?: Data | Data[] | null
    error?: PostgrestError | null
    fetching: boolean
}

export type UseUpsertResponse<Data = any> = [
    UseUpsertState<Data>,
    (
        values: Partial<Data> | Partial<Data>[],
        options?: UseUpsertOptions,
        filter?: Filter<Data>,
    ) => Promise<Pick<UseUpsertState<Data>, 'count' | 'data' | 'error'>>,
]

export type UseUpsertOptions = {
    count?: null | Count
    onConflict?: string
    returning?: Returning
}

export type UseUpsertConfig<Data = any> = {
    filter?: Filter<Data>
    options?: UseUpsertOptions
}

export function useUpsert<Data = any>(
    table: string,
    config: UseUpsertConfig<Data> = { options: {} },
): UseUpsertResponse<Data> {
    const client = useClient()
    const isMounted = useRef(false)
    const [state, setState] = useState<UseUpsertState>(initialState)

    /* eslint-disable react-hooks/exhaustive-deps */
    const execute = useCallback(
        async (
            values: Partial<Data> | Partial<Data>[],
            options?: UseUpsertOptions,
            filter?: Filter<Data>,
        ) => {
            const refine = filter ?? config.filter
            setState({ ...initialState, fetching: true })
            const source = client
                .from<Data>(table)
                .upsert(values, options ?? config.options)

            const { count, data, error } = await (refine
                ? refine(source)
                : source)

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
