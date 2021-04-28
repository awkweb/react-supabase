import { PostgrestFilterBuilder } from '@supabase/postgrest-js'

export type Count = 'exact' | 'planned' | 'estimated'

export type Filter<Data> = (
    query: PostgrestFilterBuilder<Data>,
) => PostgrestFilterBuilder<Data>

export type PostgrestError = {
    message: string
    details: string
    hint: string
    code: string
}

export type Returning = 'minimal' | 'representation'
