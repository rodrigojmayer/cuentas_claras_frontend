"use client";

import { useStylesGlobal } from "@/Styles";
import { signIn } from "next-auth/react";

export default function LoginPage() {
    const { classes } = useStylesGlobal();

    return (
        <div className={`${classes.table_header_color} flex justify-center items-center h-screen`}>
            <div>
                <button onClick={() => signIn("google", { callbackUrl: "/" })} className="bg-blue-500 py-2 m-3 w-30 rounded-lg hover:bg-gray-700 transition cursor-pointer">
                    Iniciar sesión
                </button>
            </div>
        </div>
    );
}