import Image from "next/image";
import Link from "next/link";

import Layout from "@/components/Layout";
import Loader from "@/components/Loader";
import ProblemTile from "@/components/ProblemTile";
import SolutionCard from "@/components/SolutionCard";
import ResultBox from "@/components/ResultBox";

import { getDemoResult } from "@/store/index";
import { Link as LK } from "react-scroll";
import { problems, solutions } from "@/helpers/index";

import { useState } from "react";

export default function Home() {
    const [result, setResult] = useState("");
    const [isFileUploaded, setIsFileUploaded] = useState(false);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsFileUploaded(true);
        setLoading(true);

        try {
            let { data } = await getDemoResult(file);
            setResult(data);
        } catch (e) {
            setResult(e.toString());
        } finally {
            document.getElementById("file").value = "";
            setLoading(false);
        }
    };

    const onChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleClear = (e) => {
        e.preventDefault();
        setResult("");
    };

    return (
        <Layout title="SKAN | Home">
            {loading && <Loader />}
            <div className="flex items-center justify-center py-[2rem] px-[1.2rem] text-white sm:items-center sm:justify-center ">
                <div className="w-[420px] sm:text-center">
                    <h4 className="text-[1.2rem]">
                        Witness speed and accuracy together.
                    </h4>
                    <h1 className="text-[2.5rem] font-bold">
                        Automate your recruitment-pipeline with AI.
                    </h1>
                    <h4 className="text-[1.2rem]">
                        Our solutions are capable of processing multiple
                        documents at a time to display visualizations and stats
                        at your fingertips.
                    </h4>
                    <div className="mt-5 sm:mt-8 sm:flex sm:justify-center">
                        <div className="rounded-md">
                            <LK
                                className="flex w-1/2 cursor-pointer items-center justify-center rounded-md border border-transparent bg-blue-600 px-8 py-3 text-base font-medium text-white shadow-lg shadow-blue-600/50 transition-colors duration-500 ease-in-out hover:bg-blue-700 md:w-full md:py-4 md:px-10 md:text-lg"
                                to="demo"
                                smooth={true}
                                offset={-70}
                                duration={500}
                            >
                                Try Our Demo
                            </LK>
                        </div>
                    </div>
                </div>
                <div className="sm:hidden">
                    <Image
                        src="/images/img1.png"
                        height={400}
                        width={400}
                        alt="Resume Cover Image"
                    />
                </div>
            </div>
            <div className="bg-white py-4 text-center text-gray-800">
                <h4 className="text-[2rem] font-semibold">Truth Be Told</h4>
                <h1 className="my-1 text-[2rem] font-bold text-blue-600 first-letter:text-[3.5rem]">
                    8s
                </h1>
                <h4 className="mb-2 text-[1.5rem] font-extralight">
                    Is the average time spent by a recruiter on
                    <span className="font-normal"> manually </span>
                    scanning One Resume.
                </h4>
            </div>
            <div className="flex flex-col items-center justify-center py-[0.6rem] text-center text-white">
                <h1 className="m-3 text-[2rem] font-semibold sm:text-2xl">
                    Problems With the Current System
                </h1>
                <div className="flex justify-center gap-2 py-4 sm:flex-col">
                    {problems.map((problem) => (
                        <ProblemTile
                            key={problems.indexOf(problem)}
                            icon={problem.icon}
                            title={problem.title}
                            description={problem.description}
                            end={problem.end || false}
                        />
                    ))}
                </div>
            </div>
            <hr className="text-white" noshade="true" />
            <div className="flex w-full flex-col bg-black text-white">
                <h1 className="m-4 text-center text-[3rem] font-bold">
                    Our Solutions
                </h1>
                {solutions.map((solution) => (
                    <SolutionCard
                        key={solutions.indexOf(solution)}
                        image={solution.image}
                        title={solution.title}
                        description={solution.description}
                        reverse={solution.reverse || false}
                    />
                ))}
            </div>

            <div
                id="demo"
                className="flex w-full flex-col items-center justify-center p-[2rem] text-white"
            >
                <h1 className="mb-6 text-[3rem] font-bold">Try Now</h1>
                {isFileUploaded && <ResultBox result={result} />}
                <form className="flex flex-col items-center justify-center">
                    <input
                        type="file"
                        name="file"
                        id="file"
                        onChange={onChange}
                        className="w-full cursor-pointer rounded-full bg-gradient-to-br from-gray-600 to-gray-700 text-white/70 shadow-md shadow-gray-600/30 file:m-5 file:cursor-pointer file:rounded-full file:border-none file:bg-gradient-to-b file:from-blue-600 file:to-blue-500 file:px-5 file:py-3 file:text-white file:shadow-lg file:shadow-blue-500/50"
                    />
                    <div>
                        <button
                            onClick={handleSubmit}
                            className="m-[1rem] cursor-pointer rounded-full bg-gradient-to-b from-blue-500 to-blue-600 p-[1rem] text-white shadow-md shadow-blue-600/30"
                        >
                            Parse Resume
                        </button>
                        <button
                            onClick={handleClear}
                            className="m-[1rem] cursor-pointer rounded-lg bg-gradient-to-b from-yellow-300 to-yellow-400 p-[1rem] text-white shadow-md shadow-blue-600/30"
                        >
                            Clear
                        </button>
                    </div>
                </form>
                <p>
                    For More File Formats, Visualizations and Statistics,{" "}
                    <Link href="/account/signup">
                        <a className="text-blue-500 hover:underline">Sign Up</a>
                    </Link>
                </p>
            </div>
            <footer className="font-2xl bg-white py-5 text-center font-light">
                <h1>
                    Copyright &copy; {new Date().getFullYear()} | All Rights
                    Reserved
                </h1>
            </footer>
        </Layout>
    );
}
