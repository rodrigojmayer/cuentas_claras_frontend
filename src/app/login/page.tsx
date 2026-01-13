"use client";

import { useStylesGlobal } from "../../Styles";
import { signIn } from "next-auth/react";
import { useTheme } from "next-themes";

export default function LoginPage() {
    const { classes } = useStylesGlobal();
    const { theme } = useTheme();

    return (
        <div className={`
            ${classes[`${theme}_table_header_color` as keyof typeof classes]} 
            flex justify-center items-center h-screen
        `}>
            <div>
                <button onClick={() => signIn("google", { callbackUrl: "/" })} className="bg-blue-500 py-2 m-3 w-30 rounded-lg hover:bg-gray-700 transition cursor-pointer">
                    Iniciar sesión
                </button>
            </div>
        </div>
    );
}