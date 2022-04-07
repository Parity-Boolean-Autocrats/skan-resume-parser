import Link from "next/link";

export default function ResultSummary({ count }) {
    return (
        <div className="result-box m-[2rem] w-[500px] overflow-auto rounded-sm bg-white p-3 font-light shadow-sm">
            <code className="text-black">
                <div className="my-4 flex flex-col justify-center gap-4">
                    <h1 className="text-2xl font-bold">
                        Your Resume(s) have been parsed.
                    </h1>
                    <h1 className="text-[1.5rem]">
                        No. of Files Parsed: {count}
                    </h1>

                    <h1>
                        Click{" "}
                        <span className="text-blue-600 hover:underline">
                            <Link href="/user/scans">here</Link>
                        </span>{" "}
                        and view the latest scans.
                    </h1>
                </div>
            </code>
        </div>
    );
}
