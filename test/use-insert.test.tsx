import { renderHook } from '@testing-library/react-hooks'

import { useInsert } from '../src'

describe('useSelect', () => {
    it('should throw when not inside Provider', () => {
        const { result } = renderHook(() => useInsert('todos'))
        expect(result.error).toEqual(
            Error('No client has been specified using Provider.'),
        )
    })
})
