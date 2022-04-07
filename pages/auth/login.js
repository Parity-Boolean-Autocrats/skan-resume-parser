import Link from "next/link";
import Layout from "@/components/Layout";
import Loader from "@/components/Loader";
import AuthContext from "@/context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
            <div className="flex h-[90vh] w-full items-center justify-center sm:h-[80vh]">
                <div className="flex h-full w-full flex-col items-center justify-center">
                    <h1 className="my-3 text-4xl font-bold text-white">
                        Login
                    </h1>
                    <form
                        className="w-1/3 max-w-lg md:w-3/4"
                        onSubmit={handleSubmit}
                    >
                        <div className="my-6">
                            <label
                                className="mb-2 block text-sm font-bold text-white"
                                htmlFor="email"
                            >
                                Email
                            </label>
                            <input
                                className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-black shadow focus:outline-none "
                                id="email"
                                required={true}
                                type="email"
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="my-6">
                            <label
                                className="mb-2 block text-sm font-bold text-white"
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <input
                                className="focus:shadow-outline mb-3 w-full appearance-none rounded py-2 px-3 leading-tight text-black shadow focus:outline-none"
                                id="password"
                                type="password"
                                placeholder="****"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                className="flex w-1/3 cursor-pointer items-center justify-center rounded-md border border-transparent bg-blue-600 px-8 py-3 text-base font-medium text-white shadow-lg shadow-blue-600/50 transition-colors duration-500 ease-in-out hover:bg-blue-700 md:w-full lg:w-[45%]"
                                type="submit"
                            >
                                Log In
                            </button>
                        </div>
                        <div className="my-3 block">
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
