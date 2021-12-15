import Link from "next/link";

export default function Header() {
    return (
        <header className="flex bg-black justify-between items-center sm:flex-col sm:justify-center px-[10vw] lg:px-[1.5rem] sm:border-b-[1px] sm:border-slate-50">
            <Link href="/">
                <a>
                    <h1 className="text-white font-semibold text-3xl my-3 mx-3">
                        Resume Parser
                    </h1>
                </a>
            </Link>
            <ul className="flex text-white items-center justify-center sm:mr-0">
                <li className="mx-3 my-3">
                    <Link href="/">
                        <a className="transition-colors duration-500 hover:bg-[rgba(229,231,235,0.3)] rounded-[8px] p-[0.5rem]">
                            Home
                        </a>
                    </Link>
                </li>
                <li className="mx-3 my-3">
                    <Link href="/about">
                        <a className="transition-colors duration-500 ease-in-out hover:bg-[rgba(229,231,235,0.3)] rounded-[8px] p-[0.5rem]">
                            About
                        </a>
                    </Link>
                </li>
            </ul>
        </header>
    );
}
