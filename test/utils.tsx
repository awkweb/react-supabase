import React from 'react'
import { createClient } from '@supabase/supabase-js'

import { Provider } from '../src'

export const client = createClient('https://example.com', 'some.fake.key')

export const Wrapper: React.FC<{ children: any }> = ({ children }) => (
    <Provider value={client}>{children}</Provider>
)
