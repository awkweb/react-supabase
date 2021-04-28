import { renderHook } from '@testing-library/react-hooks'

import { useInsert } from '../src'

describe('useInsert', () => {
    it('should throw when not inside Provider', () => {
        const { result } = renderHook(() => useInsert('todos'))
        expect(() => result.current).toThrowErrorMatchingSnapshot()
    })
})
