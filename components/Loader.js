export default function Loader() {
    let circleCommonClasses =
        "h-5 w-5 bg-blue-600 rounded-full sm:h-2.5 sm:2-2.5";

    return (
        <div className="flex">
            <div className={`${circleCommonClasses} mr-1 animate-bounce`}></div>
            <div
                className={`${circleCommonClasses} mr-1 animate-bounce200`}
            ></div>
            <div className={`${circleCommonClasses} animate-bounce400`}></div>
        </div>
    );
}
