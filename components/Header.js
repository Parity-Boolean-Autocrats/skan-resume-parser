import Link from "next/link";

export default function Header() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:p-0">
            <header className="flex bg-black justify-between items-center sm:flex-col sm:justify-center lg:px-[1.5rem] sm:border-b-[1px] sm:border-slate-50">
                <Link href="/">
                    <a>
                        <h1 className="text-white font-semibold text-3xl my-3 mx-3">
                            SKAN
                        </h1>
                    </a>
                </Link>
                <ul className="flex text-white items-center justify-center sm:mr-0">
                    <li className="mx-3 my-3">
                        <Link href="/">
                            <a className="transition-colors duration-500 ease-in-out hover:bg-[rgba(229,231,235,0.3)] rounded-[8px] p-[0.5rem] md:text-[0.9rem]">
                                Home
                            </a>
                        </Link>
                    </li>
                    <li className="mx-3 my-3">
                        <Link href="/about">
                            <a className="transition-colors duration-500 ease-in-out hover:bg-[rgba(229,231,235,0.3)] rounded-[8px] p-[0.5rem] md:text-[0.9rem]">
                                About
                            </a>
                        </Link>
                    </li>
                    <li className="mx-3 my-3">
                        <Link href="/auth/login">
                            <a className="cursor-pointer w-full h-full py-1 px-2 flex items-center justify-center border border-transparent font-medium rounded-md text-white bg-blue-600 transition-colors duration-500 ease-in-out hover:bg-blue-700 md:text-[0.9rem]">
                                Sign In
                            </a>
                        </Link>
                    </li>
                </ul>
            </header>
        </div>
    );
}
