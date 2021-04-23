import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { useClient } from '../context'
import { Filter, PostgrestError } from '../types'
import { initialState } from './state'

export type UseSelectArgs<Data = any> = {
    columns?: string
    filter?: Filter<Data> | false | null
    lazy?: boolean
    options?: {
        head?: boolean
        count?: null | 'exact' | 'planned' | 'estimated'
    }
    single?: boolean
    table: string
}

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

export function useSelect<Data = any>({
    columns = '*',
    filter,
    lazy,
    options = {},
    table,
}: UseSelectArgs<Data>): UseSelectResponse<Data> {
    const client = useClient()
    const isMounted = useRef(false)
    const [state, setState] = useState<UseSelectState>(initialState)

    /* eslint-disable react-hooks/exhaustive-deps */
    const source = useMemo(() => {
        const source = client.from<Data>(table).select(columns, options)
        return filter ? filter(source) : source
    }, [client, filter])
    /* eslint-enable react-hooks/exhaustive-deps */

    const execute = useCallback(async () => {
        setState({ ...initialState, fetching: true })
        const { count, data, error } = await source
        if (isMounted.current) {
            setState({ count, data, error, fetching: false })
        }
        return { count, data, error }
    }, [source])

    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        if (!isMounted.current) return
        execute()
    }, [filter])
    /* eslint-enable react-hooks/exhaustive-deps */

    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        isMounted.current = true
        if (lazy) return
        execute()
        return () => {
            isMounted.current = false
        }
    }, [])
    /* eslint-enable react-hooks/exhaustive-deps */

    return [state, execute]
}
