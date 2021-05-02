import {
    Head,
    Html,
    Main,
    default as NextDocument,
    NextScript,
} from 'next/document'

class Document extends NextDocument {
    render() {
        return (
            <Html lang="en">
                <Head />
                <body>
                    <Main />
                    <NextScript />

                    <script
                        async
                        defer
                        src="https://scripts.simpleanalyticscdn.com/latest.js"
                    />
                    <noscript>
                        <img
                            src="https://queue.simpleanalyticscdn.com/noscript.gif"
                            alt=""
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </noscript>
                </body>
            </Html>
        )
    }
}

export default Document
