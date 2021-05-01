import { renderHook } from '@testing-library/react-hooks'

import { useSignUp } from '../../../src'

describe('useSignUp', () => {
    it('should throw when not inside Provider', () => {
        const { result } = renderHook(() => useSignUp())
        expect(() => result.current).toThrowErrorMatchingSnapshot()
    })
})
