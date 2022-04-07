import UserLayout from "@/components/UserLayout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { fetchProfile } from "@/store/index";
import { useRouter } from "next/router";
import AuthContext from "@/context/AuthContext";
import FileUploadWorkspace from "@/components/FileUploadWorkspace";

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
            current={0}
        >
            <ToastContainer />
            <>
                <header className="shadow">
                    <div className="mx-auto flex max-w-7xl items-center justify-between py-6 px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold text-white">
                            Dashboard
                        </h1>
                    </div>
                </header>
                <main>
                    <>
                        <div className="mx-auto my-4 max-w-4xl rounded-lg bg-gray-300 p-5 sm:px-6 md:px-8 lg:mx-8">
                            <h1 className="mb-5 text-2xl font-bold ">
                                Scan New Resume(s)
                            </h1>
                            <FileUploadWorkspace user_id={profile.id} />
                        </div>
                    </>
                </main>
            </>
        </UserLayout>
    );
}

export async function getServerSideProps({ req }) {
    const profile = await fetchProfile(req);

    return { props: { profile } };
}
