import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/config/index";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        setUser(supabase.auth.user());

        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                await handleAuthChange(event, session);

                if (event === "SIGNED_IN") router.push("/user/dashboard");
                else if (event === "SIGNED_OUT") router.push("/");

                setUser(session?.user || null);
            }
        );

        return () => {
            authListener.unsubscribe();
        };
    }, []);

    const register = async ({ username, email, password }) => {
        let { data: usernames, error: e } = await supabase
            .from("profiles")
            .select("username")
            .eq("username", username);

        if (e) return e;

        if (usernames.length !== 0)
            return { message: "Username is not unique" };

        const { error } = await supabase.auth.signUp(
            { email, password },
            {
                data: { username },
            }
        );
        if (error) return error;
    };

    const login = async ({ email, password }) => {
        const { error } = await supabase.auth.signIn({
            email,
            password,
        });
        if (error) return error;
    };

    const logout = async () => {
        const { error } = supabase.auth.signOut();
        if (error) return error;
    };

    async function handleAuthChange(event, session) {
        await fetch("/api/auth", {
            method: "POST",
            headers: new Headers({ "Content-Type": "application/json" }),
            credentials: "same-origin",
            body: JSON.stringify({ event, session }),
        });
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                register,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
