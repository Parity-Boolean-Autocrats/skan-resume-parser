import Link from "next/link";
import Image from "next/image";

export default function Header() {
    return (
        <div className="mx-auto max-w-7xl px-4 sm:p-0">
            <header className="mt-2 flex items-center justify-between bg-black sm:flex-col sm:justify-center sm:border-b-[1px] sm:border-slate-50 lg:px-[1.5rem]">
                <Link href="/">
                    <a>
                        <Image
                            src="/images/SKAN.png"
                            width={120}
                            height={120}
                            alt="logo"
                        />
                    </a>
                </Link>
                <ul className="flex items-center justify-center text-white sm:mr-0">
                    <li className="mx-3 my-3">
                        <Link href="/">
                            <a className="rounded-[8px] p-[0.5rem] transition-colors duration-500 ease-in-out hover:bg-[rgba(229,231,235,0.3)] md:text-[0.9rem]">
                                Home
                            </a>
                        </Link>
                    </li>
                    <li className="mx-3 my-3">
                        <Link href="/about">
                            <a className="rounded-[8px] p-[0.5rem] transition-colors duration-500 ease-in-out hover:bg-[rgba(229,231,235,0.3)] md:text-[0.9rem]">
                                About
                            </a>
                        </Link>
                    </li>
                    <li className="mx-3 my-3">
                        <Link href="/auth/login">
                            <a className="flex h-full w-full cursor-pointer items-center justify-center rounded-md border border-transparent bg-blue-600 py-1 px-2 font-medium text-white transition-colors duration-500 ease-in-out hover:bg-blue-700 md:text-[0.9rem]">
                                Sign In
                            </a>
                        </Link>
                    </li>
                </ul>
            </header>
        </div>
    );
}
