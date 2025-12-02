/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createByDebtorEmail, findUserByEmail, postDebt, postPayment, postUser } from "@/lib/api";
import { useStylesGlobal } from "@/Styles";
import { Contacts, Data, DataTable, Debt, NewDebt, NewPayment, NewUser, UpdateDataProps, UpdateDebt } from "@/types";
import { Autocomplete, Box, Button, MenuItem, TextField } from "@mui/material";
import { useState } from "react";
import DatePickerComponent from "./DatePickerComponent";
import { AcceptButton, CancelButton } from "./Buttons";
import useUsers from "@/hooks/useUsers";
import { useSession } from "next-auth/react";


interface ManagePagoProps {
    setUpdateData: (visible: UpdateDataProps) => void;
    newPayment?: NewPayment | null;
    setVisibleManagePago: (visible: boolean) => void;
    // filteredContacts: Contacts[];
}
export default function ManagePago({ 
    setUpdateData, 
    newPayment, 
    setVisibleManagePago, 
    // filteredContacts 
}: ManagePagoProps ) {
    
    // const { users } = useUsers();
    const { data: session } = useSession()

    const { classes } = useStylesGlobal()
    // const [idDebtor, setIdDebtor] = useState("");
    // const [nameDebtor, setNameDebtorl] = useState(newPayment.id_debt);
    // const [phone, setPhone] = useState<string>("");
    const [amount, setAmount] = useState<string>("");
    // const [dateDue, setDateDue] = useState<Date | null>(debtEdit ? new Date(debtEdit.date_due) : null);
    // const [currency, setCurrency] = useState<string>("$ARS");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    // const currencyOptions = ["$ARS", "$USD", "$EUR"]

    // const test = "test"

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        // console.log("email: ", email)

        if(amount) { 
            try {
                const createNewPayment: NewPayment = {
                    id_debt: newPayment?.id_debt || "",
                    amount: Number(amount),
                    // dolar_google: ???,   //  ATTENTION IMPORTANT this dolar google should update to the dolar google on the current date
                }
                console.log("createNewPayment: ", createNewPayment);
                await postPayment(createNewPayment);
                setVisibleManagePago?.(false);
            } catch (err: any) {
                console.error("Error creating debt: ", err);
                // setMessage(`X ${err.message || "Failed to create debt"}`);
            } finally {
                setLoading(false);
                setUpdateData({state: true, data: "debts"})
            }
        } else {
            setMessage("Ingresar pago")
            alert("Ingresar pago")
        }
    }

    return (
        <div className="flex flex-col p-2 max-w-md">
            <h3 className="text-3xl text-center font-bold text-gray-800 dark:text-gray-100 mb-4">
                {newPayment?.name || newPayment?.email}
            </h3>

            
            <Box className={classes.customBoxRow}>
                <a>
                    Pendiente
                </a>
                <a>
                    {newPayment?.pending}
                </a>
                <a>
                    {newPayment?.currency}
                </a>
            </Box>
            <form onSubmit={handleSubmit} className="flex flex-col gap-1.5 rounded-lg p-2">
                
                <Box className={classes.customBoxRow}>
                    <a>
                        Pago
                    </a>
                    <TextField
                        // label="Pago"
                        autoFocus
                        value={amount}
                        onChange={(event:any) => {
                            const val = event.target.value;
                            if (/^\d*$/.test(val)) {
                                if(Number(val) > Number(newPayment?.pending))
                                    setAmount(newPayment?.pending || "");
                                else
                                    setAmount(val);
                            }
                        }}
                        size="small"
                        className={`${classes.inputMainData} ${classes.inputPago}`}
                    />
                    <Button
                        // type={clicked? "button" : "submit"}
                        variant="text"
                        className={`${classes.btnCommonStyle} ${classes.btn_info}`}
                        // color="inherit"
                        onClick={() => {
                            // const a = parseInt(newPayment?.pending, 10)
                            setAmount(newPayment?.pending ? newPayment?.pending.toString() : "")
                        }}
                    > 
                        Total
                    </Button>
                </Box>
                <Box className={`${classes.customBoxRow} ${classes.customBoxRowSpaces}` }>   
                    <CancelButton clicked={() => setVisibleManagePago(false)}/>
                    <AcceptButton />
                </Box>
            </form>
        </div>
    )
}