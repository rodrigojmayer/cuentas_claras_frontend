/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { postDebt } from "@/lib/api";
import { useStylesGlobal } from "@/Styles";
import { Debt, NewDebt, UpdateDataProps } from "@/types";
import { Autocomplete, Box, MenuItem, TextField } from "@mui/material";
import { useState } from "react";
import DatePickerComponent from "./DatePickerComponent";
import { AcceptButton, CancelButton } from "./Buttons";


interface ManageCargarPrestamoProps {
    setUpdateData: (visible: UpdateDataProps) => void;
    debtEdit?: Debt;
    setVisibleManageCargarPrestamo: (visible: boolean) => void;
}
export default function ManageCargarPrestamo({ setUpdateData, debtEdit, setVisibleManageCargarPrestamo }: ManageCargarPrestamoProps ) {
    
    const { classes } = useStylesGlobal()
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState<string>("");
    const [amount, setAmount] = useState<string>("");
    const [detail, setDetail] = useState<string>("");
    const [dateDue, setDateDue] = useState<Date | null>(debtEdit ? new Date(debtEdit.date_due) : null);
    const [currency, setCurrency] = useState<string>("$ARS");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    
    const emailOptions = [
        {email: "test@gmail.com", phone: "111"},
        {email: "info@company.com", phone: "222"},
        {email: "support@example.com", phone: "333"},
        {email: "hello@domain.com", phone: "444"}
    ];
    const currencyOptions = ["$ARS", "$USD", "$EUR"]

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
                        // If the user selects an option (object)
                        if (typeof newValue === "object" && newValue !== null) {
                            setEmail(newValue.email);
                            setPhone(newValue.phone);
                        } else {
                            // If the user clears or types manually (string)
                            setEmail(newValue ?? "")
                            setPhone("")
                        }
                    }}
                    onInputChange={(event, newInputValue) => {
                        setEmail(newInputValue);    // update while typing
                    }}
                    getOptionLabel={(option) =>
                        typeof option === "string" ? option : option.email
                    }
                    size="small"
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Correo electrónico"
                            variant="outlined"        
                            className={classes.inputMainData}
                            // className="border rounded-lg bg-white"
                        />
                    )}
                />
                <TextField
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
                />
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
                <DatePickerComponent dateProp={dateDue} setDateProp={setDateDue} labelProp={"Fecha vencimiento"}/>             
                     
                <Box className={`${classes.customBoxRow} ${classes.customGap}` }>   
                    <CancelButton clicked={() => setVisibleManageCargarPrestamo(false)}/>
                    <AcceptButton clicked={() => setVisibleManageCargarPrestamo(false)}/> 
                </Box>
            </form>
        </div>
    )
}