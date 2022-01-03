import {
    supabase,
    FLASK_TOKEN,
    FLASK_API_URL,
    NEXT_API_KEY,
    NEXT_URL,
} from "@/config/index";
import { parseCookies } from "@/helpers/index";
import axios from "axios";

// AUTH FUNCTIONS
export const updateAuth = async (_event, session) => {
    fetch(`${NEXT_URL}/api/auth`, {
        method: "POST",
        headers: new Headers({
            "Content-Type": "application/json",
            Authorization: `Bearer ${NEXT_API_KEY}`,
        }),
        credentials: "same-origin",
        body: JSON.stringify({ event: _event, session }),
    }).then((res) => res.json());
};

export const register = async ({ username, email, password }) => {
    let usernames = await supabase
        .from("users")
        .select("username")
        .eq("username", username);

    if (usernames.data.length !== 0) {
        let er = { message: "Username is not unique" };
        return er;
    }

    const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password,
    });
    if (error) return error;

    let u = {
        uid: user.id,
        username: username.toLowerCase(),
        email: email,
    };

    let { data, error: err } = await supabase.from("users").insert(u);

    if (err) return error;
};

export const login = async ({ email, password }) => {
    const { error } = await supabase.auth.signIn({
        email,
        password,
    });
    if (error) return error;
};

export const logout = async () => {
    const { error } = supabase.auth.signOut();
    if (error) return error;
};

export const getUser = async (req) => {
    const { token } = parseCookies(req);
    const user = await supabase.auth.api.getUser(token);
    return user;
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
