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
import useDebtsByDebtor from "@/hooks/useDebtsByDebtor";
import useDebtsByCreditor from "@/hooks/useDebtsByCreditor";
import { useTheme } from "next-themes";


interface ManageCargarPrestamoProps {
    setUpdateData: (visible: UpdateDataProps) => void;
    debtEdit?: Debt;
    setVisibleManageCargarPrestamo: (visible: boolean) => void;
    filteredContacts: Contacts[];
}
export default function ManageCargarPrestamo({ setUpdateData, debtEdit, setVisibleManageCargarPrestamo, filteredContacts }: ManageCargarPrestamoProps ) {
    const maxAmount = 1000000000;
    const { users } = useUsers();
    const { data: session } = useSession()
    const { debtsByCreditor, isErrorDebtsByCreditor, isLoadingDebtsByCreditor, mutateDebtsByCreditor } = useDebtsByCreditor();
    const { debtsByDebtor, isErrorDebtsByDebtor, isLoadingDebtsByDebtor, mutateDebtsByDebtor } = useDebtsByDebtor();
 
    const { classes } = useStylesGlobal()
    const { theme } = useTheme();
    const [idDebtor, setIdDebtor] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState<string>("");
    const [amount, setAmount] = useState<string>("");
    const [detail, setDetail] = useState<string>("");
    const [dateDue, setDateDue] = useState<Date | null>(null);
    const [currency, setCurrency] = useState<string>("$ARS");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    
    const currencyOptions = ["$ARS", "$USD", "$EUR"]

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        if(!email) { 
            setMessage(`Introduce the email`);
            alert(`Introduce the email`);
        }
        else if(Number(amount) <= 0) {
            setMessage(`Introduce the amount`);
            alert(`Introduce the amount`);
        } else {
            try {
                const newDebt: NewDebt = {
                    id_user_creditor: session?.user._id,
                    id_user_debtor: idDebtor,
                    email_debtor: email,
                    detail,
                    amount: Number(amount),
                    currency,
                    date_due: dateDue,
                }
                await createByDebtorEmail(newDebt);
                mutateDebtsByCreditor()
                mutateDebtsByDebtor()
                setVisibleManageCargarPrestamo?.(false);
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
            <h3 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-4">
                Cargar préstamo
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-1.5 rounded-lg p-2 text-gray-800">
                <Autocomplete
                    freeSolo                // allows typing any value
                    options={filteredContacts}  // your array of emails
                    value={email}
                    onChange={(event, newValue) => {
                        // If the user selects an option (object)
                        if (typeof newValue === "object" && newValue !== null) {
                            setEmail(newValue.email ?? "");
                            // setPhone(newValue.phone ?? "");
                            setIdDebtor(newValue.id_user ?? "")
                        } else {
                            // If the user clears or types manually (string)
                            setEmail(newValue ?? "")
                            // setPhone("")
                        }
                    }}
                    onInputChange={(event, newInputValue) => {
                        setEmail(newInputValue);    // update while typing
                        // const match = filteredContacts.find(c => c.email === newInputValue)
                        // setPhone(match?.phone ?? "")
                    }}
                    getOptionLabel={(option) =>
                        typeof option === "string" ? option : (option.email ?? "")
                    }
                    size="small"
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Email"
                            variant="outlined"        
                            className={`${classes[`${theme}_inputMainData` as keyof typeof classes]} ${classes.inputMainData}`}
                            // className="border rounded-lg bg-white"
                        />
                    )}
                />
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
                    className={`${classes[`${theme}_inputMainData` as keyof typeof classes]}`}
                /> */}
                <Box className={classes.customBoxRow}>

                    <TextField
                        label="Cantidad"
                        value={amount}
                        onChange={(event:any) => {
                            const val = event.target.value;
                            if (/^\d*$/.test(val)) {
                                if(Number(val) > maxAmount)
                                    setAmount(maxAmount.toString());
                                else
                                    setAmount(val);
                            }
                        }}
                        size="small"
                        className={`${classes[`${theme}_inputMainData` as keyof typeof classes]} ${classes.inputMainData}`}
                    />
                    <TextField
                        value={currency}
                        select
                        onChange={(event:any) => setCurrency(event.target.value)}
                        size="small"
                        className={`${classes[`${theme}_inputMainData` as keyof typeof classes]} ${classes.inputMainData}  max-w-25`} 
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
                    className={`${classes[`${theme}_inputMainData` as keyof typeof classes]} ${classes.inputMainData}`}
                />
                <DatePickerComponent dateProp={dateDue} setDateProp={setDateDue} labelProp={"Fecha vencimiento"}/>             
                     
                <Box className={`${classes.customBoxRow} ${classes.customBoxRowSpaces}` }>   
                    <CancelButton clicked={() => setVisibleManageCargarPrestamo(false)}/>
                    <AcceptButton />
                </Box>
            </form>
        </div>
    )
}