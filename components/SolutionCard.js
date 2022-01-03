import Image from "next/image";

export default function SolutionCard({ image, title, description, reverse }) {
    return (
        <div
            className={`flex gap-0 w-full sm:flex-col ${
                reverse && "flex-row-reverse"
            }`}
        >
            <div className="relative w-full h-[350px] md:h-[300px] sm:w-full">
                <Image
                    className="w-full h-1/2"
                    src={`/images/${image}`}
                    layout="fill"
                    alt="Solution"
                    priority={true}
                />
            </div>
            <div className="bg-blue-600 text-white flex flex-col w-full justify-center">
                <h1 className="font-bold text-[2.5rem] mb-5 text-center md:text-[2rem]">
                    {title}
                </h1>
                <p className="m-5 font-light text-[1.3rem] md:text-[1rem] sm:text-center">
                    {description}
                </p>
            </div>
        </div>
    );
}
