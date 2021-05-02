import { useEffect, useReducer } from 'react'
import { SupabaseRealtimePayload } from '@supabase/supabase-js'

import { UseSelectState, useSelect } from '../data'
import { useSubscription } from './use-subscription'

export type UseRealtimeState<Data = any> = Omit<
    UseSelectState<Data>,
    'count'
> & {
    old?: Data[] | null
}

export type UseRealtimeResponse<Data = any> = [
    UseRealtimeState<Data>,
    () => Promise<Pick<UseSelectState<Data>, 'count' | 'data' | 'error'>>,
]

export type UseRealtimeAction<Data = any> =
    | { type: 'FETCH'; payload: UseSelectState<Data> }
    | { type: 'SUBSCRIPTION'; payload: SupabaseRealtimePayload<Data> }

export type UseRealtimeCompareFn<Data = any> = (
    data: Data,
    payload: Data,
) => boolean

type CompareFnDefaultData<Data> = Data & { id: any }

export function useRealtime<Data = any>(
    table: string,
    compareFn: UseRealtimeCompareFn<Data> = (a, b) =>
        (<CompareFnDefaultData<Data>>a).id ===
        (<CompareFnDefaultData<Data>>b).id,
): UseRealtimeResponse<Data> {
    if (table === '*')
        throw Error(
            'Must specify table or row. Cannot listen for all database changes.',
        )

    const [result, reexecute] = useSelect<Data>(table)
    const [state, dispatch] = useReducer<
        React.Reducer<UseRealtimeState<Data>, UseRealtimeAction<Data>>
    >(reducer(compareFn), result)

    useSubscription((payload) => dispatch({ type: 'SUBSCRIPTION', payload }), {
        table,
    })

    useEffect(() => {
        dispatch({ type: 'FETCH', payload: result })
    }, [result])

    return [state, reexecute]
}

const reducer = <Data = any>(compareFn: UseRealtimeCompareFn) => (
    state: UseRealtimeState<Data>,
    action: UseRealtimeAction<Data>,
): UseRealtimeState<Data> => {
    const old = state.data
    switch (action.type) {
        case 'FETCH':
            return { ...state, old, ...action.payload }
        case 'SUBSCRIPTION':
            switch (action.payload.eventType) {
                case 'DELETE':
                    return {
                        ...state,
                        data: state.data?.filter(
                            (x) => !compareFn(x, action.payload.old),
                        ),
                        fetching: false,
                        old,
                    }
                case 'INSERT':
                    return {
                        ...state,
                        data: [...(old ?? []), action.payload.new],
                        fetching: false,
                        old,
                    }
                case 'UPDATE': {
                    const data = old ?? []
                    const index = data.findIndex((x) =>
                        compareFn(x, action.payload.new),
                    )
                    return {
                        ...state,
                        data: [
                            ...data.slice(0, index),
                            action.payload.new,
                            ...data.slice(index + 1),
                        ],
                        fetching: false,
                        old,
                    }
                }
                default:
                    throw Error(
                        `eventType "${action.payload.eventType}" does not exist.`,
                    )
            }
        default:
            throw Error('Action type does not exist.')
    }
}
