import { renderHook } from '@testing-library/react-hooks'

import { useDelete } from '../../../src'
import { initialState } from '../../../src/hooks/data/state'
import { Wrapper as wrapper } from '../../utils'

describe('useDelete', () => {
    it('should throw when not inside Provider', () => {
        const { result } = renderHook(() => useDelete('todos'))
        expect(() => result.current).toThrowErrorMatchingSnapshot()
    })

    it('should throw when filter not provided to execute', async () => {
        const { result } = renderHook(() => useDelete('todos'), { wrapper })
        await expect(result.current[1]()).rejects.toThrowErrorMatchingSnapshot()
    })

    it('should have correct initial state', async () => {
        const { result } = renderHook(() => useDelete('todos'), { wrapper })
        expect(result.current[0]).toEqual(initialState)
    })
})
