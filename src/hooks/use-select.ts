import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { PostgrestFilterBuilder } from '@supabase/postgrest-js'

import { useClient } from '../context'
import { PostgrestError } from '../types'

export type UseSelectArgs<Data = any> = {
    columns?: string
    filter?:
        | ((
              query: PostgrestFilterBuilder<Data>,
          ) => PostgrestFilterBuilder<Data>)
        | false
        | null
    lazy?: boolean
    options?: {
        head?: boolean
        count?: null | 'exact' | 'planned' | 'estimated'
    }
    table: string
}

export type UseSelectState<Data = any> = {
    fetching: boolean
    data?: Data | null
    error?: PostgrestError | null
}

export type UseSelectResponse<Data = any> = [UseSelectState<Data>, () => void]

export function useSelect<Data = any>(
    args: UseSelectArgs<Data>,
): UseSelectResponse<Data> {
    const { columns = '*', filter, lazy, options = {}, table } = args
    const client = useClient()
    const mountedRef = useRef(false)
    const [state, setState] = useState<UseSelectState>({ fetching: false })

    const source = useMemo(() => {
        const source = client.from<Data>(table).select(columns, options)
        return filter ? filter(source) : source
    }, [client, columns, filter, options, table])

    const execute = useCallback(async () => {
        setState((x) => ({ ...x, fetching: true }))
        const { data, error } = await source
        setState({ data, error, fetching: false })
    }, [source])

    // Run when filter changes
    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        if (!mountedRef.current) return
        execute()
    }, [filter])
    /* eslint-enable react-hooks/exhaustive-deps */

    // Run on mount
    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        mountedRef.current = true
        if (lazy) return
        execute()
        return () => {
            mountedRef.current = false
        }
    }, [])
    /* eslint-enable react-hooks/exhaustive-deps */

    return [state, execute]
}
