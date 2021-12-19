export default function ProblemTile({ icon, title, description, end }) {
    return (
        <div
            className={`text-white text-center p-[1rem] flex flex-col items-center justify-center w-1/4 md:w-full sm:w-full gap-4 ${
                end === true
                    ? ""
                    : "border-r-[1px] sm:border-b-[1px] border-[rgba(255,255,255,0.5)]"
            }`}
        >
            <i className={`${icon}`}></i>
            <h3 className="text-2xl font-[400]">{title}</h3>
            <p className="w-3/4">{description}</p>
        </div>
    );
}
