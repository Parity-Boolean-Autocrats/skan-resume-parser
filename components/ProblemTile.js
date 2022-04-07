export default function ProblemTile({ icon, title, description, end }) {
    return (
        <div
            className={`flex w-1/4 flex-col items-center justify-center gap-4 p-[1rem] text-center text-white sm:w-full md:w-full ${
                end === true
                    ? ""
                    : "border-r-[1px] border-[rgba(255,255,255,0.5)] sm:border-b-[1px]"
            }`}
        >
            <i className={`${icon}`}></i>
            <h3 className="text-2xl font-[400]">{title}</h3>
            <p className="w-3/4">{description}</p>
        </div>
    );
}
