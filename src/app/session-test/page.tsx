"use client";

import { useStylesGlobal } from "../../Styles";
import { useSession, signIn, signOut } from "next-auth/react"
import { useTheme } from "next-themes";

export default function SessionTestPage() {
  const { classes } = useStylesGlobal()
    const { theme } = useTheme();
    const { data: session } = useSession()
    return (
        <div className={classes[`${theme}_table_header_color` as keyof typeof classes]}>
            <div>
                <button onClick={() => signIn("google")} className="bg-blue-500 py-2 m-3 w-30 rounded-lg hover:bg-gray-700 transition cursor-pointer">
                    Iniciar sesión
                </button>
            </div>
            <div>
                <button onClick={() => signOut()} className="bg-red-500 py-2 m-3 w-30 rounded-lg hover:bg-gray-700 transition cursor-pointer">
                    Cerrar sesión
                </button>
            </div>
            <div>
                <pre className="py-2 m-3">{JSON.stringify(session, null, 2)}</pre>
            </div>
        </div>
    );
}