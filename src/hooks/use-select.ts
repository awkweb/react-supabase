import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { Filter, PostgrestError } from '../types'
import { useClient } from './use-client'
import { initialState } from './state'

export type UseSelectState<Data = any> = {
    count?: number | null
    data?: Data[] | null
    error?: PostgrestError | null
    fetching: boolean
    stale: boolean
}

export type UseSelectResponse<Data = any> = [
    UseSelectState<Data>,
    () => Promise<Pick<UseSelectState<Data>, 'count' | 'data' | 'error'>>,
]

export type UseSelectOptions = {
    head?: boolean
    count?: null | 'exact' | 'planned' | 'estimated'
}

export type UseSelectConfig<Data = any> = {
    columns?: string
    filter?: Filter<Data> | false | null
    options?: UseSelectOptions
    single?: boolean
}

export function useSelect<Data = any>(
    table: string,
    config: UseSelectConfig = { columns: '*', options: {} },
): UseSelectResponse<Data> {
    const client = useClient()
    const isMounted = useRef(false)
    const [state, setState] = useState<UseSelectState>({
        ...initialState,
        stale: false,
    })

    const source = useMemo(() => {
        const { columns, filter, options } = config
        const source = client.from<Data>(table).select(columns, options)
        return filter ? filter(source) : source
    }, [client, config, table])

    const execute = useCallback(async () => {
        setState((x) => ({
            ...initialState,
            ...x,
            fetching: true,
            stale: true,
        }))
        const { count, data, error } = await source
        const res = { count, data, error }
        if (isMounted.current)
            setState({ ...res, fetching: false, stale: false })
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
