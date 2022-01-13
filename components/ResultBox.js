export default function ResultBox({ result }) {
    return (
        <div className="bg-white p-3 w-[500px] h-[400px] m-[2rem] overflow-auto result-box">
            <code className="text-black">{result}</code>
        </div>
    );
}
