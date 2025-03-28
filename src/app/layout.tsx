import "./globals.css";
import "/public/themes/default.css";
import Header from "@/components/header/header";
import {ReactNode} from "react";

export default function RootLayout({children}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="en">

        <head>
            <meta charSet="UTF-8"/>
            <title>SteamTrack</title>
        </head>

        <body>
        <main>
            <Header/>
            <div className="main">{children}</div>
        </main>
        </body>

        </html>
    );
}
