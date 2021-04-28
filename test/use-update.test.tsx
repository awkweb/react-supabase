import { renderHook } from '@testing-library/react-hooks'

import { useUpdate } from '../src'
import { Wrapper as wrapper } from './utils'

describe('useUpdate', () => {
    it('should throw when not inside Provider', () => {
        const { result } = renderHook(() => useUpdate('todos'))
        expect(() => result.current).toThrowErrorMatchingSnapshot()
    })

    it('should throw when filter not provided to execute', async () => {
        const { result } = renderHook(() => useUpdate('todos'), { wrapper })
        await expect(
            result.current[1]({ status: 'complete' }),
        ).rejects.toThrowErrorMatchingSnapshot()
    })
})
