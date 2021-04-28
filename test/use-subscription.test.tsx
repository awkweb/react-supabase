import { renderHook } from '@testing-library/react-hooks'

import { useSubscription } from '../src'

describe('useSubscription', () => {
    it('should throw when not inside Provider', () => {
        const { result } = renderHook(() => useSubscription(jest.fn()))
        expect(() => result.current).toThrowErrorMatchingSnapshot()
    })
})
