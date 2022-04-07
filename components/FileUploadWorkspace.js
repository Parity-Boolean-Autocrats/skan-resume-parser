import { useState } from "react";
import { getParsedResumeResult } from "@/store/index";
import ResultSummary from "@/components/ResultSummary";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "@/components/Loader";

export default function FileUploadWorkspace({ user_id }) {
    const [result, setResult] = useState("");
    const [isFileUploaded, setIsFileUploaded] = useState(false);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!file) {
            toast.error("Please Upload a File");
            setLoading(false);
            return;
        }

        if (file.length > 100) {
            setLoading(false);
            document.getElementById("file").value = "";
            toast.error("The Max File Limit is 100.");
            return;
        }

        setIsFileUploaded(true);

        try {
            const count = file.length;
            let error = await getParsedResumeResult(file, user_id);

            if (error) toast.error(error.message);
            setResult(count);
        } catch (e) {
            setResult(e.toString());
        } finally {
            document.getElementById("file").value = "";
            setLoading(false);
        }
    };

    const onChange = (e) => {
        setFile(e.target.files);
    };

    const handleClear = (e) => {
        e.preventDefault();
        setResult("");
    };

    return (
        <div
            id="demo"
            className="flex w-full flex-col items-center justify-center p-[2rem] "
        >
            {loading && <Loader />}
            {isFileUploaded && <ResultSummary count={result} />}
            <form className="flex flex-col items-center justify-center">
                <input
                    type="file"
                    name="file"
                    id="file"
                    onChange={onChange}
                    multiple={true}
                    className="w-full cursor-pointer rounded-full bg-gradient-to-br from-gray-600 to-gray-700 text-white/70 shadow-md shadow-gray-600/30 file:m-5 file:cursor-pointer file:rounded-full file:border-none file:bg-gradient-to-b file:from-blue-600 file:to-blue-500 file:px-5 file:py-3 file:text-white file:shadow-lg file:shadow-blue-500/50"
                />
                <div>
                    <button
                        onClick={handleSubmit}
                        className="m-[1rem] cursor-pointer rounded-full bg-gradient-to-b from-blue-500 to-blue-600 p-[1rem] text-white shadow-md shadow-blue-600/30"
                    >
                        Parse Resume(s)
                    </button>
                    <button
                        onClick={handleClear}
                        className="m-[1rem] cursor-pointer rounded-lg bg-gradient-to-b from-yellow-500 to-yellow-600 p-[1rem] text-white shadow-md shadow-blue-600/30"
                    >
                        Clear
                    </button>
                </div>
            </form>
        </div>
    );
}
