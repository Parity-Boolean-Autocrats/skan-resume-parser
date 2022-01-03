import Head from "next/head";
import Header from "./Header";

export default function Layout({ title, children, no_header }) {
    return (
        <>
            <Head>
                <title>{title}</title>
                {/* <link rel="icon" href="/favicon.ico" /> */}
            </Head>
            {!no_header && <Header />}
            <main className="bg-black">{children}</main>
        </>
    );
}
