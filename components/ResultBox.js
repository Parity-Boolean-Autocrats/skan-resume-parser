export default function ResultBox({ result }) {
    return (
        <div className="bg-white w-[500px] h-[400px] m-[2rem] overflow-auto">
            <div
                dangerouslySetInnerHTML={{ __html: result }}
                className="text-black p-2"
            ></div>
        </div>
    );
}
