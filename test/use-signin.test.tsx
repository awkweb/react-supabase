import { renderHook } from '@testing-library/react-hooks'

import { useSignIn } from '../src'

describe('useSignIn', () => {
    it('should throw when not inside Provider', () => {
        const { result } = renderHook(() => useSignIn())
        expect(() => result.current).toThrowErrorMatchingSnapshot()
    })
})
