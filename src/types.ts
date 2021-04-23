import { PostgrestFilterBuilder } from '@supabase/postgrest-js'

export type PostgrestError = {
    message: string
    details: string
    hint: string
    code: string
}

export type Filter<Data> = (
    query: PostgrestFilterBuilder<Data>,
) => PostgrestFilterBuilder<Data>
