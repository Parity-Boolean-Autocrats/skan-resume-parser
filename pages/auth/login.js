import Link from "next/link";
import Layout from "@/components/Layout";
import Loader from "@/components/Loader";
import AuthContext from "@/context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getUserByCookie } from "@/store/index";
import { useState, useContext } from "react";

export default function SignUpPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let error = await login({ email, password });

            if (error) {
                toast.error(error.message);
            }
        } catch (error) {
            toast.error(error.error_description || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout title="SKAN | Login">
            {loading && <Loader />}
            <ToastContainer />
            <div className="w-full flex h-[90vh] items-center justify-center sm:h-[80vh]">
                <div className="w-full h-full flex flex-col items-center justify-center">
                    <h1 className="text-white text-4xl font-bold my-3">
                        Login
                    </h1>
                    <form
                        className="max-w-lg w-1/3 md:w-3/4"
                        onSubmit={handleSubmit}
                    >
                        <div className="my-6">
                            <label
                                className="text-white block text-sm font-bold mb-2"
                                htmlFor="email"
                            >
                                Email
                            </label>
                            <input
                                className="shadow text-black appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline "
                                id="email"
                                required={true}
                                type="email"
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="my-6">
                            <label
                                className="text-white block text-sm font-bold mb-2"
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <input
                                className="shadow appearance-none text-black rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                type="password"
                                placeholder="****"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                className="cursor-pointer w-1/3 lg:w-[45%] md:w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 shadow-lg shadow-blue-600/50 transition-colors duration-500 ease-in-out hover:bg-blue-700"
                                type="submit"
                            >
                                Log In
                            </button>
                        </div>
                        <div className="block my-3">
                            <p className="text-white">
                                Don&apos;t have an account?{" "}
                                <Link href="/auth/signup">
                                    <a className="text-blue-500 hover:underline">
                                        Sign Up
                                    </a>
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}
