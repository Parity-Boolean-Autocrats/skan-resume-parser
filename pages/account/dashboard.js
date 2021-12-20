import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import { supabase } from "@/config/index";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";

export default function DashboardPage() {
    const [session, setSession] = useState(null);

    useEffect(() => {
        setSession(supabase.auth.session());

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    }, []);

    return (
        <Layout title="SKAN | Dashboard" no_header={true}>
            <ToastContainer />
            <h3 className="text-white">Dashboard</h3>
            <p className="text-white">{session ? session.user.id : "NOPE"}</p>
        </Layout>
    );
}

export async function getServerSideProps({ req }) {
    if (!req.headers.cookie) {
        return {
            redirect: {
                permanent: false,
                destination: "/account/login",
            },
        };
    }

    return {
        props: {},
    };
}
