import Layout from "@/components/Layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useContext } from "react";
import { getUserByCookie, fetchProfile } from "@/store/index";
import { useRouter } from "next/router";
import AuthContext from "@/context/AuthContext";

export default function DashboardPage({ user, profile }) {
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
        <Layout title="SKAN | Dashboard" no_header={true}>
            <ToastContainer />

            <p className="text-white">{profile?.username}</p>

            <button
                onClick={handleLogout}
                className="text-white m-3 p-3 rounded-lg bg-blue-600"
            >
                Logout
            </button>
        </Layout>
    );
}

export async function getServerSideProps({ req }) {
    const { user } = await getUserByCookie(req);

    if (!user) {
        // If no user, redirect to index.
        return { props: {}, redirect: { destination: "/", permanent: false } };
    }

    const profile = await fetchProfile(user);

    // If there is a user, return it.
    return { props: { user, profile } };
}
