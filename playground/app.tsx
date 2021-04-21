import * as React from 'react'
import { useState } from 'react'
import { useSelect } from 'react-hook-supabase'

import { definitions } from './types/supabase'

const continents = [
    'Africa',
    'Antarctica',
    'Asia',
    'Europe',
    'Oceania',
    'North America',
    'South America',
]

export const App: React.FC = () => {
    const [continent, setContinent] = useState(continents[0])
    const { data, loading } = useSelect<definitions['countries']>({
        table: 'countries',
        filter: (query) => query.filter('continent', 'eq', continent),
    })

    // 1. Trigger update if filter changes
    // 2. Run reexecute with new filter function inside
    const changeContinent = () => {
        const currentIndex = continents.indexOf(continent)
        const nextIndex =
            currentIndex + 1 === continents.length ? 0 : currentIndex + 1
        setContinent(continents[nextIndex])
    }

    return (
        <div>
            <h1>Countries of {continent}</h1>
            <button onClick={changeContinent}>Change continent</button>
            {loading || !data ? (
                <div>Loading...</div>
            ) : (
                <ul>
                    {data.map((x) => (
                        <li key={x.id}>{x.name}</li>
                    ))}
                </ul>
            )}
        </div>
    )
}
