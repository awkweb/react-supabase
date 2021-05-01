import { renderHook } from '@testing-library/react-hooks'

import { useSignOut } from '../../../src'

describe('useSignOut', () => {
    it('should throw when not inside Provider', () => {
        const { result } = renderHook(() => useSignOut())
        expect(() => result.current).toThrowErrorMatchingSnapshot()
    })
})
