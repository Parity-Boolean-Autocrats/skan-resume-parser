import Layout from "@/components/Layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getUser, logout } from "@/store/index";

import { useState } from "react";
import { useRouter } from "next/router";

export default function DashboardPage({ user }) {
    const router = useRouter();

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
            <h3 className="text-white">Dashboard</h3>
            <p className="text-white">{user ? user.user.id : "NOPE"}</p>

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
    const user = await getUser(req);
    if (!user.user) {
        return {
            redirect: {
                permanent: false,
                destination: "/account/login",
            },
        };
    }

    return {
        props: { user: user },
    };
}
