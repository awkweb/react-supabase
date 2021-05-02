import { SupabaseClient } from '@supabase/supabase-js'
import { useContext } from 'react'

import { Context } from '../context'

export function useClient(): SupabaseClient {
    const client = useContext(Context)
    if (client === undefined)
        throw Error('No client has been specified using Provider.')
    return client
}
