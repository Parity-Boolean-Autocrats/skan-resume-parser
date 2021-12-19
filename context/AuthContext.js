import { useRouter } from "next/router";
import { createContext, useState, useEffect } from "react";
// import { useCollection } from "react-firebase-hooks/firestore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        checkUserLoggedIn();
    }, []);

    // Register User

    const register = async (user) => {
        // Register User
        try {
            router.push("/account/dashboard");
        } catch (e) {
            setError(e);
            setError(null);
        }
    };

    // Login User

    const login = async ({ email, password }) => {
        // Login

        try {
            const f_user = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            setUser(f_user.user);
            router.push("/account/dashboard");
        } catch (e) {
            setError(e);
            setError(null);
        }
    };

    // Logout User

    const logout = async () => {
        // LOGOUT

        if (res.ok) {
            setUser(null);
            router.push("/");
        }
    };

    // Check if User is valid

    const checkUserLoggedIn = async () => {
        // CHECK USER
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                register,
                error,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
