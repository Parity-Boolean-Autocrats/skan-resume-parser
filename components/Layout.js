import Head from "next/head";
import Header from "./Header";

export default function Layout({ title, children, no_header, no_footer }) {
    return (
        <>
            <Head>
                <title>{title}</title>
                {/* <link rel="icon" href="/favicon.ico" /> */}
            </Head>
            {!no_header && <Header />}
            <main className="bg-black relative">{children}</main>
            {!no_footer && (
                <footer className="text-center font-2xl font-light my-5">
                    <h1>Copyright 2021 &copy; SKAN</h1>
                </footer>
            )}
        </>
    );
}
