import { PostgrestFilterBuilder } from '@supabase/postgrest-js'
import { useCallback } from 'react'

export function useFilter<Data = any>(
    filter: (
        query: PostgrestFilterBuilder<Data>,
    ) => PostgrestFilterBuilder<Data>,
    deps: any[] = [],
) {
    /* eslint-disable react-hooks/exhaustive-deps */
    const callback = useCallback(filter, deps)
    /* eslint-enable react-hooks/exhaustive-deps */
    return callback
}
