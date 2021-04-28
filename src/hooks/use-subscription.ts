import { useEffect } from 'react'
import {
    SupabaseEventTypes,
    SupabaseRealtimePayload,
} from '@supabase/supabase-js/dist/main/lib/types'

import { useClient } from './use-client'

export type UseSubscriptionConfig = {
    event?: SupabaseEventTypes
    table?: string
}

export function useSubscription<Data = any>(
    callback: (payload: SupabaseRealtimePayload<Data>) => void,
    config: UseSubscriptionConfig = { event: '*', table: '*' },
) {
    const client = useClient()

    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        const subscription = client
            .from<Data>(config.table ?? '*')
            .on(config.event ?? '*', callback)
            .subscribe()
        return () => {
            subscription.unsubscribe()
        }
    }, [])
    /* eslint-enable react-hooks/exhaustive-deps */
}
