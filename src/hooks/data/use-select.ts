import { useCallback, useEffect, useRef, useState } from 'react'

import { Count, Filter, PostgrestError } from '../../types'
import { useClient } from '../use-client'
import { initialState } from './state'

export type UseSelectState<Data = any> = {
    count?: number | null
    data?: Data[] | null
    error?: PostgrestError | null
    fetching: boolean
}

export type UseSelectResponse<Data = any> = [
    UseSelectState<Data>,
    () => Promise<Pick<UseSelectState<Data>, 'count' | 'data' | 'error'>>,
]

export type UseSelectOptions = {
    count?: null | Count
    head?: boolean
}

export type UseSelectConfig<Data = any> = {
    columns?: string
    filter?: Filter<Data> | false | null
    options?: UseSelectOptions
}

export function useSelect<Data = any>(
    table: string,
    config: UseSelectConfig<Data> = { columns: '*', options: {} },
): UseSelectResponse<Data> {
    const client = useClient()
    const isMounted = useRef(false)
    const [state, setState] = useState<UseSelectState>(initialState)

    const execute = useCallback(async () => {
        setState({ ...initialState, fetching: true })
        const source = client
            .from<Data>(table)
            .select(config.columns, config.options)
        const { count, data, error } = await (config.filter
            ? config.filter(source)
            : source)
        const res = { count, data, error }
        if (isMounted.current) setState({ ...res, fetching: false })
        return res
    }, [client, config, table])

    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        isMounted.current = true
        execute()
        return () => {
            isMounted.current = false
        }
    }, [config?.filter])
    /* eslint-enable react-hooks/exhaustive-deps */

    return [state, execute]
}
