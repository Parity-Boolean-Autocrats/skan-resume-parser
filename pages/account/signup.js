import Link from "next/link";

import Layout from "@/components/Layout";
import Loader from "@/components/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getUser } from "@/store/index";
import { register } from "@/store/index";

import { useState } from "react";
import { useRouter } from "next/router";

export default function SignUpPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        try {
            let error = await register({ username, email, password });

            if (error) {
                toast.error(error.message);
                return;
            }
            router.push("/account/dashboard");
        } catch (error) {
            toast.error(error.error_description || error.message);
            return;
        } finally {
            setLoading(false);
            router.push("/account/dashboard");
        }
    };

    return (
        <Layout title="SKAN | Sign Up">
            {loading && <Loader />}
            <ToastContainer />
            <div className="text-white w-full flex md:justify-center md:items-center">
                <div className="flex w-1/2 h-full justify-center items-center my-[8rem]">
                    <div className=" flex flex-col md:items-center justify-center lg:p-[2rem] md:w-full sm:p-0 sm:my-[4rem]">
                        <h1 className="text-4xl font-bold my-3">Sign Up</h1>
                        <form
                            className="pt-6 pb-8 mb-4 w-[350px]"
                            onSubmit={handleSubmit}
                        >
                            <div className="mb-4">
                                <label
                                    className="block text-sm font-bold mb-2"
                                    htmlFor="username"
                                >
                                    Username
                                </label>
                                <input
                                    required={true}
                                    className="shadow text-black appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                                    id="username"
                                    type="text"
                                    placeholder="Username"
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-sm font-bold mb-2"
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
                            <div className="mb-6">
                                <label
                                    className="block text-sm font-bold mb-2"
                                    htmlFor="password"
                                >
                                    Password
                                </label>
                                <input
                                    className="shadow appearance-none text-black rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                    id="password"
                                    type="password"
                                    placeholder="****"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>
                            <div className="mb-6">
                                <label
                                    className="block text-sm font-bold mb-2"
                                    htmlFor="confirmPassword"
                                >
                                    Confirm Password
                                </label>
                                <input
                                    className="shadow appearance-none text-black rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="****"
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <button
                                    className="cursor-pointer w-1/2 md:w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 shadow-lg shadow-blue-600/50 transition-colors duration-500 ease-in-out hover:bg-blue-700 md:py-4 md:text-lg md:px-10 md:mr-4"
                                    type="submit"
                                >
                                    Sign Up
                                </button>
                                {/* <a
                                    className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-700"
                                    href="#"
                                >
                                    Forgot Password?
                                </a> */}
                            </div>
                            <div className="block my-3">
                                <p className="text-[0.9rem]">
                                    Already have an account?{" "}
                                    <Link href="/account/login">
                                        <a className="text-blue-500 hover:underline">
                                            Log In
                                        </a>
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="w-1/2 h-full md:hidden signup_img"></div>
            </div>
        </Layout>
    );
}

export async function getServerSideProps({ req }) {
    const user = await getUser(req);

    if (user.user) {
        return {
            redirect: {
                permanent: false,
                destination: "/account/dashboard",
            },
        };
    }

    return {
        props: {},
    };
}
