import Image from "next/image";

export default function SolutionCard({ image, title, description, reverse }) {
    return (
        <div
            className={`flex w-full gap-0 sm:flex-col ${
                reverse && "flex-row-reverse"
            }`}
        >
            <div className="relative h-[350px] w-full sm:w-full md:h-[300px]">
                <Image
                    className="h-1/2 w-full"
                    src={`/images/${image}`}
                    layout="fill"
                    alt="Solution"
                    priority={true}
                />
            </div>
            <div className="flex w-full flex-col justify-center bg-blue-600 text-white">
                <h1 className="mb-5 text-center text-[2.5rem] font-bold md:text-[2rem]">
                    {title}
                </h1>
                <p className="m-5 text-[1.3rem] font-light sm:text-center md:text-[1rem]">
                    {description}
                </p>
            </div>
        </div>
    );
}
