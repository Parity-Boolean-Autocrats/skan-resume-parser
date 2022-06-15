import UserLayout from "@/components/UserLayout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import { useContext, useEffect } from "react";
import { fetchProfile, fetchResumes } from "@/store/index";
import { useRouter } from "next/router";
import AuthContext from "@/context/AuthContext";
import { supabase, SUPABASE_STORAGE_URL } from "@/config/index";
import Summary from "@/components/Summary";
import { useState } from "react";

export default function ScansPage({ profile, scs }) {
    const router = useRouter();

    const [scans, setScans] = useState(scs);
    const [params, setParams] = useState("");

    useEffect(() => {
        const getResults = async () => {
            if (params.length > 0) {
                setTimeout(async () => {
                    let { data, error } = await supabase
                        .from("resumes")
                        .select()
                        .textSearch("fts", `'${params.split(" ").join("|")}'`);
                    // .or(`skills.cs.({${params.split(" ")}})`);
                    setScans(data);
                }, 1000);
            } else {
                setScans(scs);
            }
        };
        getResults();
    }, [params]);

    const { logout } = useContext(AuthContext);

    const deleteResume = async (id) => {
        await supabase.from("resumes").delete().eq("id", id);
        setScans(scs.filter((sc) => sc.id !== id));
    };

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
        setParams(e.target.value);

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
                    <div className="flex justify-center">
                        <div className="mb-3 xl:w-96">
                            <input
                                type="search"
                                className="
        form-control
        m-0
        block
        w-full
        rounded
        border
        border-solid
        border-gray-300
        bg-white bg-clip-padding
        px-3 py-1.5 text-base
        font-normal
        text-gray-700
        transition
        ease-in-out
        focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none
      "
                                onChange={(e) => setParams(e.target.value)}
                                value={params}
                                id="exampleSearch"
                                placeholder="Search"
                            />
                        </div>
                    </div>
                    {!scans || scans.length === 0 ? (
                        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                            <div className="px-4 py-6 sm:px-0">
                                <h1 className="text-center text-2xl text-white">
                                    No Resume(s) found.
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
                                    <div
                                        key={res.id}
                                        className="flex items-center"
                                    >
                                        <div className="w-full">
                                            <Disclosure>
                                                {({ open }) => (
                                                    <>
                                                        <Disclosure.Button className="my-2 flex w-full justify-between rounded-lg bg-blue-200 px-4 py-2 text-left text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                                                            <div className="w-full max-w-[900px]">
                                                                <span>
                                                                    {res.name &&
                                                                    res.name
                                                                        .length >
                                                                        0
                                                                        ? res.name
                                                                        : "Name Not Found"}
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
                                                                data={res}
                                                            />
                                                        </Disclosure.Panel>
                                                    </>
                                                )}
                                            </Disclosure>
                                        </div>
                                        <div className="my-4 flex gap-3 self-start">
                                            <div>
                                                <div className="mb-1">
                                                    <button
                                                        onClick={() => {
                                                            deleteResume(
                                                                res.id
                                                            );
                                                        }}
                                                    >
                                                        <i className="fa-solid fa-trash-can"></i>
                                                    </button>
                                                </div>
                                            </div>
                                            <div>
                                                <button
                                                    className="mb-1"
                                                    onClick={async () => {
                                                        let { data, error } =
                                                            await supabase.storage
                                                                .from("files")
                                                                .download(
                                                                    `files/${res.file_url}`
                                                                );
                                                        if (!error) {
                                                            const blob = data;
                                                            const newBlob =
                                                                new Blob(
                                                                    [blob],
                                                                    {
                                                                        type: `application/${
                                                                            (res.file_url.match(
                                                                                /\.([^.]*?)(?=\?|#|$)/
                                                                            ) ||
                                                                                [])[1]
                                                                        }`,
                                                                    }
                                                                );
                                                            const blobUrl =
                                                                window.URL.createObjectURL(
                                                                    newBlob
                                                                );

                                                            const link =
                                                                document.createElement(
                                                                    "a"
                                                                );
                                                            link.href = blobUrl;
                                                            link.setAttribute(
                                                                "download",
                                                                `${res.file_url}`
                                                            );
                                                            document.body.appendChild(
                                                                link
                                                            );
                                                            link.click();
                                                            link.parentNode.removeChild(
                                                                link
                                                            );
                                                            window.URL.revokeObjectURL(
                                                                blob
                                                            );
                                                            toast.success(
                                                                `Downloading file`
                                                            );
                                                            return true;
                                                        } else {
                                                            toast.error(
                                                                `Failed to download`
                                                            );
                                                            return false;
                                                        }
                                                    }}
                                                >
                                                    <i className="fa-solid fa-file-arrow-down"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
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
    const scs = await fetchResumes(profile.id);

    return { props: { profile, scs } };
}
