export default function ResultBox({ result }) {
    return (
        <div className="result-box m-[2rem] h-[400px] w-[500px] overflow-auto bg-white p-3">
            <pre className="text-[0.9rem] text-black">
                {JSON.stringify(result, null, 2)}
            </pre>
        </div>
    );
}
