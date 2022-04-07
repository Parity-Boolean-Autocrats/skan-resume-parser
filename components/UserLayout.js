import Head from "next/head";
import UserHeader from "./UserHeader";

export default function UserLayout({
    title,
    children,
    profile,
    handleLogout,
    current,
}) {
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <div className="min-h-full">
                <UserHeader
                    profile={profile}
                    handleLogout={handleLogout}
                    current={current}
                />
                <>{children}</>
            </div>
        </>
    );
}
