/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { postDebt } from "@/lib/api";
import { useStylesGlobal } from "@/Styles";
import { Debt, NewDebt, UpdateDataProps } from "@/types";
import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";


interface ManageCargarPrestamoProps {
    setUpdateData: (visible: UpdateDataProps) => void;
    debtEdit?: Debt;
    setVisibleManageCargarPrestamo?: (visible: boolean) => void;
}
export default function ManageCargarPrestamo({ setUpdateData, debtEdit, setVisibleManageCargarPrestamo }: ManageCargarPrestamoProps ) {
    
    const { classes } = useStylesGlobal()
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    
    const emailOptions = [
        "test@gmail.com",
        "info@company.com",
        "support@example.com",
        "hello@domain.com"
    ];
    const test = "test"

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            const newDebt: NewDebt = {
                id_user_creditor: test,
                id_user_debtor: test,
                detail: test,
                amount: 1,
                dolar_google: 1,
                status: test,
                date_due: new Date("18/04/1990"),
                alert_enabled: false,
                alerted: false,
                currency: test,
            }
            // await postDebt(newDebt);
            setVisibleManageCargarPrestamo?.(false);
        } catch (err: any) {
            console.error("Error creating debt: ", err);
            setMessage(`X ${err.message || "Failed to create debt"}`);
        } finally {
            setLoading(false);
            setUpdateData({state: true, data: "debts"})
        }
    }


    return (
        <div className="flex flex-col p-2 max-w-md">
            <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                Cargar préstamo
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-1.5 rounded-lg p-2 text-gray-800">
                <Autocomplete
                    freeSolo                // allows typing any value
                    options={emailOptions}  // your array of emails
                    value={email}
                    onChange={(event, newValue) => {
                        setEmail(newValue ?? "");
                    }}
                    onInputChange={(event, newInputValue) => {
                        setEmail(newInputValue);    // update while typing
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Correo electrónico"
                            variant="outlined"
                            className="border rounded-lg bg-white"
                        />
                    )}
                />
            </form>
        </div>
    )
}