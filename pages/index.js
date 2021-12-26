import Image from "next/image";
import Link from "next/link";

import Layout from "../components/Layout";
import Loader from "@/components/Loader";
import ProblemTile from "../components/ProblemTile";
import SolutionCard from "../components/SolutionCard";
import ResultBox from "../components/ResultBox";

import { getDemoResult } from "../store/index";
import { Link as LK, animateScroll } from "react-scroll";
import { problems, solutions } from "../helpers/index";

import { useState } from "react";

export default function Home() {
    const [result, setResult] = useState(
        "Please upload your resume to parse it :)"
    );
    const [isFileUploaded, setIsFileUploaded] = useState(false);
    const [file, setFile] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        setIsFileUploaded(true);
        setLoading(true);

        e.preventDefault();
        try {
            let data = await getDemoResult(file);
            setResult(data.toString());
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
            <div className="flex items-center justify-center text-white py-[2rem] px-[1.2rem] sm:items-center sm:justify-center ">
                <div className="w-[420px] sm:text-center">
                    <h4 className="text-[1.2rem]">
                        Witness speed and accuracy together.
                    </h4>
                    <h1 className="font-bold text-[2.5rem]">
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
                                className="cursor-pointer w-1/2 md:w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 shadow-lg shadow-blue-600/50 transition-colors duration-500 ease-in-out hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
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
                    <Image src="/images/img1.png" height={400} width={400} />
                </div>
            </div>
            <div className="text-gray-800 bg-white text-center py-4">
                <h4 className="text-[2rem] font-semibold">Truth Be Told</h4>
                <h1 className="first-letter:text-[3.5rem] font-bold text-blue-600 my-1 text-[2rem]">
                    8s
                </h1>
                <h4 className="text-[1.5rem] font-extralight mb-2">
                    Is the average time spent by a recruiter on
                    <span className="font-normal"> manually </span>
                    scanning One Resume.
                </h4>
            </div>
            <div className="text-white text-center py-[0.6rem] flex flex-col items-center justify-center">
                <h1 className="text-[2rem] font-semibold sm:text-2xl m-3">
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
            <div className="text-white bg-black flex flex-col w-full">
                <h1 className="text-[3rem] font-bold text-center m-4">
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
                className="text-white w-full flex flex-col justify-center items-center p-[2rem]"
            >
                <h1 className="text-[3rem] font-bold mb-6">Try Now</h1>
                {isFileUploaded && <ResultBox result={result} />}
                <form className="flex flex-col items-center justify-center">
                    <input
                        type="file"
                        name="file"
                        id="file"
                        onChange={onChange}
                        className="file:bg-gradient-to-b file:from-blue-600 file:to-blue-500 file:px-5 file:py-3 file:m-5 file:border-none file:rounded-full file:text-white file:cursor-pointer file:shadow-lg file:shadow-blue-500/50 bg-gradient-to-br from-gray-600 to-gray-700 text-white/70 rounded-full cursor-pointer shadow-md shadow-gray-600/30 w-full"
                    />
                    <div>
                        <button
                            onClick={handleSubmit}
                            className="m-[1rem] p-[1rem] bg-gradient-to-b from-blue-500 to-blue-600 text-white rounded-full cursor-pointer shadow-md shadow-blue-600/30"
                        >
                            Parse Resume
                        </button>
                        <button
                            onClick={handleClear}
                            className="m-[1rem] p-[1rem] bg-gradient-to-b from-yellow-300 to-yellow-400 text-white rounded-lg cursor-pointer shadow-md shadow-blue-600/30"
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
        </Layout>
    );
}
