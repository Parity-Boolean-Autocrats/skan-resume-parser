import Head from "next/head";
import UserHeader from "./UserHeader";

export default function UserLayout({ title, children, profile, handleLogout }) {
    return (
        <>
            <Head>
                <title>{title}</title>
                {/* <link rel="icon" href="/favicon.ico" /> */}
            </Head>
            <div className="min-h-full">
                <UserHeader profile={profile} handleLogout={handleLogout} />
                <>{children}</>
            </div>
        </>
    );
}
