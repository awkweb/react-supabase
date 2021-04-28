import { useCallback } from 'react'

import { Filter } from '../../types'

export function useFilter<Data = any>(filter: Filter<Data>, deps: any[] = []) {
    /* eslint-disable react-hooks/exhaustive-deps */
    const callback = useCallback(filter, deps)
    /* eslint-enable react-hooks/exhaustive-deps */
    return callback
}
