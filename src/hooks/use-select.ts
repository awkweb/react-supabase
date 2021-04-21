import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { PostgrestFilterBuilder } from '@supabase/postgrest-js'

import { useClient } from '../context'

type PostgrestError = {
    message: string
    details: string
    hint: string
    code: string
}

export function useSelect<T>({
    table,
    columns = '*',
    options = {},
    filter,
}: {
    table: string
    columns?: string
    options?: {
        head?: boolean
        count?: null | 'exact' | 'planned' | 'estimated'
    }
    filter?:
        | ((query: PostgrestFilterBuilder<T>) => PostgrestFilterBuilder<T>)
        | false
        | null
}) {
    const client = useClient()
    const query = useMemo(() => {
        const base = client.from<T>(table).select(columns, options)
        if (filter) filter(base)
        return base
    }, [client, table, filter, columns, options])
    const initialMountedRef = useRef(false)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<T[] | null>()
    const [error, setError] = useState<PostgrestError>()

    const execute = useCallback(async () => {
        setError(undefined)
        setData(undefined)
        setLoading(true)
        const res = await query
        setLoading(false)
        if (res?.error) setError(res.error)
        if (res?.data) setData(res.data)
    }, [query])

    useEffect(() => {
        if (filter !== undefined && (filter === false || filter === null))
            return
        if (initialMountedRef.current) return
        execute()
        initialMountedRef.current = true
    }, [query, filter, execute, initialMountedRef])

    return { execute, loading, data, error }
}
