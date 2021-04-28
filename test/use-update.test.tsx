import { renderHook } from '@testing-library/react-hooks'

import { useUpdate } from '../src'

describe('useUpdate', () => {
    it('should throw when not inside Provider', () => {
        const { result } = renderHook(() => useUpdate('todos'))
        expect(result.error).toEqual(
            Error('No client has been specified using Provider.'),
        )
    })
})
