import { renderHook } from '@testing-library/react-hooks'

import { useFilter } from '../../../src'

describe('useFilter,', () => {
    it('should return filter', () => {
        const { result } = renderHook(() =>
            useFilter((query) => query.limit(10)),
        )
        expect(typeof result.current).toBe('function')
    })

    it('should return filter with dependencies', () => {
        const { result } = renderHook(() =>
            useFilter((query) => query.limit(10), [true]),
        )
        expect(typeof result.current).toBe('function')
    })
})
