import { createContext, useContext } from 'react'
import { SupabaseClient } from '@supabase/supabase-js'

export const Context = createContext<SupabaseClient | undefined>(undefined)
export const Provider = Context.Provider
export const Consumer = Context.Consumer
Context.displayName = 'SupabaseContext'

export const useClient = (): SupabaseClient => {
    const client = useContext(Context)
    if (client === undefined)
        throw new Error('No client has been specified using Provider.')
    return client
}
