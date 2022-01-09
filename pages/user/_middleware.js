import { supabase } from "@/config/index";
import { NextResponse } from "next/server";

export async function middleware(req) {
    const { user } = await supabase.auth.api.getUserByCookie(req);

    if (!user) return NextResponse.redirect("/auth/login");

    return NextResponse.next();
}
