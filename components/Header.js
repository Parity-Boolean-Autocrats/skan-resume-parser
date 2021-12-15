import Link from "next/link";

export default function Header() {
    return (
        <header className="flex bg-gray-500 justify-between items-center sm:flex-col sm:justify-center">
            <h1 className="text-white font-semibold text-3xl my-3 mx-3">
                Resume Parser
            </h1>
            <ul className="flex mr-[4rem] text-white items-center justify-center sm:flex-col sm:mr-0">
                <li className="mx-3 my-3">
                    <Link href="/">
                        <a>Home</a>
                    </Link>
                </li>
                <li className="mx-3 my-3">
                    <Link href="/">
                        <a>About</a>
                    </Link>
                </li>
            </ul>
        </header>
    );
}
