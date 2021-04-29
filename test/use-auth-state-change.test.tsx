import { renderHook } from '@testing-library/react-hooks'

import { useAuthStateChange } from '../src'

describe('useAuthStateChange', () => {
    it('should throw when not inside Provider', () => {
        const { result } = renderHook(() => useAuthStateChange(jest.fn()))
        expect(() => result.current).toThrowErrorMatchingSnapshot()
    })
})
