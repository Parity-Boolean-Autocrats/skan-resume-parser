import { supabase, FLASK_TOKEN, FLASK_API_URL } from "@/config/index";
import axios from "axios";

// Fetch User Profile
export const fetchProfile = async (user) => {
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
        `${FLASK_API_URL}/api/v1/parse/doc`,
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
