import { renderHook } from '@testing-library/react-hooks'

import { useRealtime } from '../../../src'
import { Wrapper as wrapper } from '../../utils'

describe('useRealtime', () => {
    it('should throw when not inside Provider', () => {
        const { result } = renderHook(() => useRealtime('todos'))
        expect(() => result.current).toThrowErrorMatchingSnapshot()
    })

    it('should throw when trying to listen all database changes', () => {
        const { result } = renderHook(() => useRealtime('*'), { wrapper })
        expect(() => result.current).toThrowErrorMatchingSnapshot()
    })
})
