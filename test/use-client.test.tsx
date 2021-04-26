import React from 'react'
import { createClient } from '@supabase/supabase-js'
import { renderHook } from '@testing-library/react-hooks'

import { Provider, useClient } from '../src'

const client = createClient('https://example.com', 'some.fake.key')

describe('useClient', () => {
    it('should throw when not inside Provider', () => {
        const { result } = renderHook(() => useClient())
        expect(result.error).toEqual(
            Error('No client has been specified using Provider.'),
        )
    })

    it('should return client', () => {
        const wrapper = ({ children }) => (
            <Provider value={client}>{children}</Provider>
        )
        const { result } = renderHook(() => useClient(), { wrapper })
        expect(Object.keys(result.current)).toEqual([
            'supabaseUrl',
            'supabaseKey',
            'restUrl',
            'realtimeUrl',
            'authUrl',
            'storageUrl',
            'schema',
            'auth',
            'realtime',
        ])
    })
})
