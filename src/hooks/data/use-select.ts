import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

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
    head?: boolean
    count?: null | Count
}

export type UseSelectConfig<Data = any> = {
    columns?: string
    filter?: Filter<Data> | false | null
    options?: UseSelectOptions
}

export function useSelect<Data = any>(
    table: string,
    config: UseSelectConfig = { columns: '*', options: {} },
): UseSelectResponse<Data> {
    const client = useClient()
    const isMounted = useRef(false)
    const [state, setState] = useState<UseSelectState>(initialState)

    const source = useMemo(() => {
        const { columns, filter, options } = config
        const source = client.from<Data>(table).select(columns, options)
        return filter ? filter(source) : source
    }, [client, config, table])

    const execute = useCallback(async () => {
        setState({ ...initialState, fetching: true })
        const { count, data, error } = await source
        const res = { count, data, error }
        if (isMounted.current) setState({ ...res, fetching: false })
        return res
    }, [source])

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
