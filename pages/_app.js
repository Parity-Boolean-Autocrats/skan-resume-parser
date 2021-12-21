import "../styles/globals.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { supabase } from "@/config/index";
import { updateAuth } from "@/store/index";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (_event, session) => {
                await updateAuth(_event, session);
            }
        );
        return () => {
            authListener.unsubscribe();
        };
    }, []);

    return <Component {...pageProps} />;
}

export default MyApp;
