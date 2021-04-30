export default {
    repository: 'https://github.com/tmm/react-supabase', // project repo
    docsRepository: 'https://github.com/tmm/react-supabase', // docs repo
    branch: 'main', // branch of docs
    path: '/docs/', // path of docs
    titleSuffix: ' – react-supabase',
    nextLinks: true,
    prevLinks: true,
    search: true,
    customSearch: null, // customizable, you can use algolia for example
    darkMode: true,
    footer: true,
    footerText: 'MIT 2020 © Tom Meagher.',
    footerEditOnGitHubLink: true, // will link to the docs repo
    logo: <span>react-supabase</span>,
    head: (
        <>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
            />
            <meta
                name="description"
                content="React Hooks library for Supabase"
            />
            <meta name="og:title" content="react-supabase" />
        </>
    ),
}
