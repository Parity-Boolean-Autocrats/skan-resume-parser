import Head from "next/head";
import Header from "./Header";

export default function Layout({ title, children }) {
    return (
        <>
            <Head>
                <title>{title}</title>
                {/* <link rel="icon" href="/favicon.ico" /> */}
            </Head>
            <Header />
            <main className="bg-black px-[10vw] lg:px-[1.5rem]">
                {children}
            </main>
        </>
    );
}
