import { useCallback, useEffect, useRef, useState } from 'react'

import { Count, Filter, PostgrestError, Returning } from '../../types'
import { useClient } from '../use-client'
import { initialState } from './state'

export type UseDeleteState<Data = any> = {
    count?: number | null
    data?: Data | Data[] | null
    error?: PostgrestError | null
    fetching: boolean
}

export type UseDeleteResponse<Data = any> = [
    UseDeleteState<Data>,
    (
        filter?: Filter<Data>,
        options?: UseDeleteOptions,
    ) => Promise<Pick<UseDeleteState<Data>, 'count' | 'data' | 'error'>>,
]

export type UseDeleteOptions = {
    count?: null | Count
    returning?: Returning
}

export type UseDeleteConfig<Data = any> = {
    filter?: Filter<Data>
    options?: UseDeleteOptions
}

export function useDelete<Data = any>(
    table: string,
    config: UseDeleteConfig<Data> = { options: {} },
): UseDeleteResponse<Data> {
    const client = useClient()
    const isMounted = useRef(false)
    const [state, setState] = useState<UseDeleteState>(initialState)

    /* eslint-disable react-hooks/exhaustive-deps */
    const execute = useCallback(
        async (filter?: Filter<Data>, options?: UseDeleteOptions) => {
            const refine = filter ?? config.filter
            if (refine === undefined)
                throw Error('delete() should always be combined with `filter`')

            setState({ ...initialState, fetching: true })
            const source = client
                .from<Data>(table)
                .delete(options ?? config.options)
            const { count, data, error } = await refine(source)

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
