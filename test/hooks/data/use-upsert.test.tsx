import { renderHook } from '@testing-library/react-hooks'

import { useUpsert } from '../../../src'
import { initialState } from '../../../src/hooks/data/state'
import { Wrapper as wrapper } from '../../utils'

describe('useUpsert', () => {
    it('should throw when not inside Provider', () => {
        const { result } = renderHook(() => useUpsert('todos'))
        expect(() => result.current).toThrowErrorMatchingSnapshot()
    })

    it('should have correct initial state', async () => {
        const { result } = renderHook(() => useUpsert('todos'), { wrapper })
        expect(result.current[0]).toEqual(initialState)
    })
})
