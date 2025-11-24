/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createByDebtorEmail, findUserByEmail, postDebt, postUser } from "@/lib/api";
import { useStylesGlobal } from "@/Styles";
import { Contacts, Data, DataTable, Debt, NewDebt, NewUser, UpdateDataProps } from "@/types";
import { Autocomplete, Box, MenuItem, TextField } from "@mui/material";
import { useState } from "react";
import DatePickerComponent from "./DatePickerComponent";
import { AcceptButton, CancelButton } from "./Buttons";
import useUsers from "@/hooks/useUsers";
import { useSession } from "next-auth/react";


interface ManagePagoProps {
    setUpdateData: (visible: UpdateDataProps) => void;
    // debtEdit?: Debt;
    setVisibleManagePago: (visible: boolean) => void;
    // filteredContacts: Contacts[];
}
export default function ManagePago({ 
    setUpdateData, 
    // debtEdit, 
    setVisibleManagePago, 
    // filteredContacts 
}: ManagePagoProps ) {
    
    const { users } = useUsers();
    const { data: session } = useSession()

    const { classes } = useStylesGlobal()
    const [idDebtor, setIdDebtor] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState<string>("");
    const [amount, setAmount] = useState<string>("");
    const [detail, setDetail] = useState<string>("");
    // const [dateDue, setDateDue] = useState<Date | null>(debtEdit ? new Date(debtEdit.date_due) : null);
    const [currency, setCurrency] = useState<string>("$ARS");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const currencyOptions = ["$ARS", "$USD", "$EUR"]

    const test = "test"

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        console.log("email: ", email)

        if(email) { 
            try {
                const newDebt: NewDebt = {
                    id_user_creditor: session?.user._id,
                    id_user_debtor: idDebtor,
                    email_debtor: email,
                    detail,
                    amount: Number(amount),
                    currency,
                    // date_due: dateDue,
                }
                await createByDebtorEmail(newDebt);
                setVisibleManagePago?.(false);
            } catch (err: any) {
                console.error("Error creating debt: ", err);
                setMessage(`X ${err.message || "Failed to create debt"}`);
            } finally {
                setLoading(false);
                setUpdateData({state: true, data: "debts"})
            }
        }
    }


    return (
        <div className="flex flex-col p-2 max-w-md">
            <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                Nombre del otro usuario
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-1.5 rounded-lg p-2 text-gray-800">
                
                {/* <TextField
                    label="Teléfono"
                    value={phone}
                    onChange={(event:any) => {
                        const val = event.target.value;
                        // Allow only digits
                        if (/^\d*$/.test(val)) {
                            setPhone(val);
                        }
                    }}
                    size="small"
                    className={classes.inputMainData}
                /> */}
                <Box className={classes.customBoxRow}>

                    <TextField
                        label="Cantidad"
                        value={amount}
                        onChange={(event:any) => {
                            const val = event.target.value;
                            if (/^\d*$/.test(val)) {
                                setAmount(val);
                            }
                        }}
                        size="small"
                        className={classes.inputMainData}
                    />
                    <TextField
                        value={currency}
                        select
                        onChange={(event:any) => setCurrency(event.target.value)}
                        size="small"
                        className={`${classes.inputMainData}  max-w-25`}
                        
                    > 
                        {currencyOptions.map((c) => (
                            <MenuItem 
                                key={c} 
                                value={c}
                                sx={{ justifyContent: "space-between" }}
                            >
                                {c}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>
                <TextField
                    label="Detalle"
                    value={detail}
                    onChange={(event:any) => setDetail(event.target.value)}
                    size="small"
                    className={classes.inputMainData}
                />
                <Box className={`${classes.customBoxRow} ${classes.customBoxRowSpaces}` }>   
                    <CancelButton clicked={() => setVisibleManagePago(false)}/>
                    <AcceptButton />
                </Box>
            </form>
        </div>
    )
}