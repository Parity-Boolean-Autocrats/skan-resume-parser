import Layout from "../components/Layout";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <Layout title="Resume Parser | Home">
            <div className="flex items-center justify-center text-white py-[2rem]">
                <div className="w-[420px] sm:text-center">
                    <h4 className="text-[1.2rem]">
                        Lorem ipsum dolor sit amet.
                    </h4>
                    <h1 className="font-bold text-[2.6rem]">
                        Automate your recruitment-pipeline with AI.
                    </h1>
                    <h4 className="text-[1.2rem]">
                        Our solutions are capable of processing multiple
                        documents at a time to display visualizations and stats
                        at your fingertips.
                    </h4>
                    <div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                        <div class="rounded-md shadow">
                            <Link href="/">
                                <a class="w-1/2 md:w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 shadow-lg shadow-blue-600/50 transition-colors duration-500 ease-in-out hover:bg-blue-700 md:py-4 md:text-lg md:px-10">
                                    Try Our Demo
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="sm:hidden">
                    <Image src="/images/img1.png" height={400} width={400} />
                </div>
            </div>
        </Layout>
    );
}
