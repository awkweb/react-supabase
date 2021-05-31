import { renderHook } from '@testing-library/react-hooks'

import { useSelect } from '../../../src'
import { initialState } from '../../../src/hooks/data/state'
import { Wrapper as wrapper } from '../../utils'

describe('useSelect', () => {
    it('should throw when not inside Provider', () => {
        const { result } = renderHook(() => useSelect('todos'))
        expect(() => result.current).toThrowErrorMatchingSnapshot()
    })

    it('should have correct initial state', async () => {
        const { result } = renderHook(
            () => useSelect('todos', { pause: true }),
            { wrapper },
        )
        expect(result.current[0]).toEqual({ ...initialState, stale: false })
    })
})
