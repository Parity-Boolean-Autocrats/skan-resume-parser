import UserLayout from "@/components/UserLayout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import { useContext } from "react";
import { fetchProfile, fetchResumes } from "@/store/index";
import { useRouter } from "next/router";
import AuthContext from "@/context/AuthContext";
import { SUPABASE_STORAGE_URL } from "@/config/index";
import Summary from "@/components/Summary";

export default function ScansPage({ profile, scans }) {
    const router = useRouter();

    const { logout } = useContext(AuthContext);

    const resumes = [
        {
            id: 1,
            name: "Sreekesh Iyer",
            education: ["BE IT, VESIT, Chembur, 2019-23"],
            skills: ["programming", "linux", "AI"],
            experience: ["Project Utkarsh", "Project Swechchha"],
        },
        {
            id: 2,
            name: "Aamir Ansari",
            education: ["BE IT, VESIT, Chembur, 2019-23"],
            skills: ["programming", "linux", "AI"],
            experience: ["Project Utkarsh", "Ganit App"],
        },
    ];

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
            current={true}
        >
            <ToastContainer />
            <>
                <header className="shadow">
                    <div className="mx-auto flex max-w-7xl items-center justify-between py-6 px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold text-white">
                            All Scans
                        </h1>
                    </div>
                </header>
                <main>
                    {!resumes || resumes.length === 0 ? (
                        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                            <div className="px-4 py-6 sm:px-0">
                                <h1 className="text-center text-2xl text-white">
                                    No Resume Scanned Yet.
                                </h1>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="mx-auto max-w-7xl rounded-lg bg-white p-5 sm:px-6 lg:mx-5 lg:px-8">
                                <h1 className="mb-5 text-2xl font-bold ">
                                    Scanned Resumes
                                </h1>
                                {scans.map((res) => (
                                    <Disclosure key={res.id}>
                                        {({ open }) => (
                                            <>
                                                <Disclosure.Button className="my-2 flex w-full justify-between rounded-lg bg-blue-200 px-4 py-2 text-left text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                                                    <div className="w-full max-w-[900px]">
                                                        <span>{res.name}</span>
                                                        <span className="mx-4 self-end">
                                                            <a
                                                                rel="noopener noreferrer"
                                                                download
                                                                target="_blank"
                                                                href={
                                                                    SUPABASE_STORAGE_URL +
                                                                    res.file_url
                                                                }
                                                            >
                                                                <i className="fa-solid fa-file-arrow-down"></i>
                                                            </a>
                                                        </span>
                                                    </div>
                                                    <div className="flex">
                                                        <ChevronUpIcon
                                                            className={`${
                                                                !open
                                                                    ? "rotate-180 transform"
                                                                    : ""
                                                            } h-5 w-5 text-blue-600`}
                                                        />
                                                    </div>
                                                </Disclosure.Button>
                                                <Disclosure.Panel className="rounded-md bg-blue-100 px-4 pt-4 pb-2 text-sm text-gray-700">
                                                    <Summary
                                                        key={scans.indexOf(res)}
                                                        data={res}
                                                    />
                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>
                                ))}
                            </div>
                        </>
                    )}
                </main>
            </>
        </UserLayout>
    );
}

export async function getServerSideProps({ req }) {
    const profile = await fetchProfile(req);
    const scans = await fetchResumes(profile.id);

    return { props: { profile, scans } };
}
