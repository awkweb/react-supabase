import { renderHook } from '@testing-library/react-hooks'

import { useResetPassword } from '../../../src'

describe('useResetPassword', () => {
    it('should throw when not inside Provider', () => {
        const { result } = renderHook(() => useResetPassword())
        expect(() => result.current).toThrowErrorMatchingSnapshot()
    })
})
