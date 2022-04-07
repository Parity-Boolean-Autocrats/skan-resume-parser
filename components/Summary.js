export default function Summary({ data }) {
    let dataDTO = {
        name: data.name && data.name.length > 0 ? data.name : "NF",
        phone: data.phone && data.phone.length > 0 ? data.phone : "NF",
        email: data.email && data.email.length > 0 ? data.email : "NF",
        education:
            data.education && data.education.length > 0 ? data.education : "NF",
        skills: data.skills && data.skills.length > 0 ? data.skills : "NF",
        experience:
            data.experience && data.experience.length > 0
                ? data.experience
                : "NF",
    };

    return (
        <div className="result-box m-[2rem] h-[400px] overflow-auto bg-white p-3 font-mono">
            <code className="text-black">
                <button
                    className="rounded-md bg-blue-300 py-2 px-4 font-serif text-white shadow-md transition-colors duration-200 hover:bg-blue-400"
                    onClick={() =>
                        navigator.clipboard.writeText(JSON.stringify(dataDTO))
                    }
                >
                    Copy JSON
                </button>

                <div className="my-4 flex flex-col justify-center gap-4">
                    <h1 className="text-2xl font-bold">{dataDTO.name}</h1>
                    <h2 className="font-bold">
                        Phone:{" "}
                        <span className="font-normal">{dataDTO.phone}</span>
                    </h2>
                    <h2 className="font-bold">
                        Email:{" "}
                        <span className="font-normal">{dataDTO.email}</span>
                    </h2>
                    <hr className="text-gray-300" />
                    <h2 className="font-bold">
                        Education:{" "}
                        <span className="font-normal">{dataDTO.education}</span>
                    </h2>
                    <hr className="text-gray-300" />
                    <h2 className="font-bold">Skills:</h2>
                    <div className="flex flex-wrap gap-4 break-words">
                        {dataDTO.skills.map((sk) => (
                            <span
                                key={dataDTO.skills.indexOf(sk)}
                                className="font-normal"
                            >
                                {sk}
                            </span>
                        ))}
                    </div>
                    {/* <h2 className="font-bold">Experience:</h2>
                    <div className="inline-flex gap-4">
                        {dataDTO.experience.map((ex) => (
                            <span
                                key={dataDTO.experience.indexOf(ex)}
                                className="font-normal"
                            >
                                {ex}
                            </span>
                        ))}
                    </div> */}
                </div>
            </code>
        </div>
    );
}
