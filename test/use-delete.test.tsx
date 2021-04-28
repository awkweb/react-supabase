import { renderHook } from '@testing-library/react-hooks'

import { useDelete } from '../src'

describe('useDelete', () => {
    it('should throw when not inside Provider', () => {
        const { result } = renderHook(() => useDelete('todos'))
        expect(result.error).toEqual(
            Error('No client has been specified using Provider.'),
        )
    })
})
