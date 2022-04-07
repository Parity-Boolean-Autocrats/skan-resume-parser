export default function ResultBox({ result }) {
    return (
        <div className="result-box m-[2rem] h-[400px] w-[500px] overflow-auto bg-white p-3">
            <code className="text-black">{JSON.stringify(result, 4, 2)}</code>
        </div>
    );
}
