import { renderHook } from '@testing-library/react-hooks'

import { useSelect } from '../../../src'

describe('useSelect', () => {
    it('should throw when not inside Provider', () => {
        const { result } = renderHook(() => useSelect('todos'))
        expect(() => result.current).toThrowErrorMatchingSnapshot()
    })
})
