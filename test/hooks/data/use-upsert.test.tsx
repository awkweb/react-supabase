import { renderHook } from '@testing-library/react-hooks'

import { useUpsert } from '../../../src'

describe('useUpsert', () => {
    it('should throw when not inside Provider', () => {
        const { result } = renderHook(() => useUpsert('todos'))
        expect(() => result.current).toThrowErrorMatchingSnapshot()
    })
})
