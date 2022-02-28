import {
    supabase,
    FLASK_TOKEN,
    FLASK_DEMO_TOKEN,
    FLASK_API_URL,
} from "@/config/index";
import axios from "axios";

// Fetch User Profile
export const fetchProfile = async (req) => {
    let { user } = await getUserByCookie(req);

    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id);

    if (!error) return data[0];
};

// Get User from auth cookie server side
export const getUserByCookie = async (req) => {
    return await supabase.auth.api.getUserByCookie(req);
};

// Send Demo request to FLASK API

export const getDemoResult = async (file) => {
    let formData = new FormData();

    formData.append("file", file);

    const res = await axios.post(
        `${FLASK_API_URL}/api/v1/parse-demo`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${FLASK_DEMO_TOKEN}`,
            },
        }
    );

    return { data: res.data };
};

export const getParsedResumeResult = async (file) => {
    let formData = new FormData();

    Array.from(file).forEach((f) => {
        formData.append(`file-${Array.from(file).indexOf(f)}`, f);
    });

    const res = await axios.post(
        `${FLASK_API_URL}/api/v1/parse-multiple`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${FLASK_TOKEN}`,
            },
        }
    );

    return { data: res.data };
};
