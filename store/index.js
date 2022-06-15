import {
    supabase,
    FLASK_TOKEN,
    FLASK_DEMO_TOKEN,
    FLASK_API_URL,
} from "@/config/index";
import axios from "axios";
import { SUPABASE_STORAGE_URL } from "@/config/index";

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

// Request with no limits
export const getParsedResumeResult = async (file, user_id) => {
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
    const { result } = res.data;

    result.map(async (r) => {
        const {
            name,
            file: fl,
            phone,
            email,
            education_certifications_and_achievements,
            work,
            skills,
        } = r;

        const epo = Date.now();

        const er = await addFileToStorage({ filename: `${epo}_${fl}`, file });

        if (er) return er;

        let error = await addResume({
            user_id,
            file_url: `${epo}_${fl}`,
            name,
            phone,
            email,
            education_certifications_and_achievements,
            skills,
            work,
        });

        if (error) return error;
    });
};

// Upload File to Bucket

export const addFileToStorage = async ({ filename, file }) => {
    const { data, error } = await supabase.storage
        .from("files")
        .upload(`files/${filename}`, file);

    if (error) return error;
};

// Add Resume to DB

export const addResume = async ({
    user_id,
    name,
    file_url,
    phone,
    email,
    education_certifications_and_achievements,
    skills,
    work,
}) => {
    const { data, error } = await supabase.from("resumes").insert({
        user_id,
        file_url,
        name,
        phone,
        email,
        education_certifications_and_achievements,
        skills,
        work,
    });

    if (error) return error;
};

// Fetch Resumes for a User

export const fetchResumes = async (user_id) => {
    let { data, error } = await supabase
        .from("resumes")
        .select("*")
        .eq("user_id", user_id)
        .order("created_at", { ascending: false });

    return data;
};
