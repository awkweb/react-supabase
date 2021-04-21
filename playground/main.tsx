import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { createClient } from '@supabase/supabase-js'
import { Provider } from 'react-hook-supabase'

import { App } from './app'

const client = createClient(
    import.meta.env.VITE_SUPABASE_URL as string,
    import.meta.env.VITE_SUPABASE_KEY as string,
)

ReactDOM.render(
    <React.StrictMode>
        <Provider value={client}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
)
