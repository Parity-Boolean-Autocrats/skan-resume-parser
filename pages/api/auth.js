import { supabase, NEXT_API_KEY } from "@/config/index";
import cookie from "cookie";

export default function handler(req, res) {
    if (req.headers.authorization !== `Bearer ${NEXT_API_KEY}`) {
        res.status(401).json({ message: "Unauthorized Access" });
        return;
    }

    const { session, event } = req.body;

    if (event === "SIGNED_IN") {
        // access_token
        res.setHeader(
            "Set-Cookie",
            cookie.serialize("token", session.access_token, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                maxAge: 60 * 60 * 24 * 3,
                sameSite: "strict",
                path: "/",
            })
        );
        res.status(200).json({
            message: "Signed In",
        });
        return;
    } else if (event === "SIGNED_OUT") {
        res.setHeader(
            "Set-Cookie",
            cookie.serialize("token", "", {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                expires: new Date(0),
                sameSite: "strict",
                path: "/",
            })
        );

        res.status(200).json({
            message: "Logged Out",
        });
    }
}
