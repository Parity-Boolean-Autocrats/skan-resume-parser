import UserLayout from "@/components/UserLayout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useContext } from "react";
import { fetchProfile } from "@/store/index";
import { useRouter } from "next/router";
import AuthContext from "@/context/AuthContext";

export default function DashboardPage({ profile }) {
    const router = useRouter();

    const { logout } = useContext(AuthContext);

    const handleLogout = async (e) => {
        e.preventDefault();

        try {
            let error = await logout();
            error && toast.error(error.message);
            router.push("/");
        } catch (error) {
            toast.error(error);
        }
    };

    return (
        <UserLayout
            title="SKAN | Dashboard"
            profile={profile}
            handleLogout={handleLogout}
        >
            <ToastContainer />
            <>
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Dashboard
                        </h1>
                    </div>
                </header>
                <main>
                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                        {/* Replace with your content */}
                        <div className="px-4 py-6 sm:px-0">
                            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96" />
                        </div>
                        {/* /End replace */}
                    </div>
                </main>
            </>
        </UserLayout>
    );
}

export async function getServerSideProps({ req }) {
    const profile = await fetchProfile(req);

    // If there is a user, return it.
    return { props: { profile } };
}
