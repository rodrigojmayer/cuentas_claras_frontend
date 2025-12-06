/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createByDebtorEmail, findUserByEmail, getPaymentsByDebt, postDebt, postPayment, postUser } from "@/lib/api";
import { useStylesGlobal } from "@/Styles";
import { Contacts, Data, DataTable, Debt, NewDebt, NewPayment, NewUser, UpdateDataProps, UpdateDebt } from "@/types";
import { Autocomplete, Box, Button, MenuItem, TextField } from "@mui/material";
import { useState } from "react";
import DatePickerComponent from "./DatePickerComponent";
import { AcceptButton, CancelButton } from "./Buttons";
import useUsers from "@/hooks/useUsers";
import { useSession } from "next-auth/react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import useDebtsByDebtor from "@/hooks/useDebtsByDebtor";
import useDebtsByCreditor from "@/hooks/useDebtsByCreditor";

interface ModalHistorialProps {
    setUpdateData: (visible: UpdateDataProps) => void;
    debtSelected?: NewPayment | null;
    setVisibleManagePago: (visible: boolean) => void;
    historialDebt?: Debt[];
    // filteredContacts: Contacts[];
}
export default function ModalHistorial({ 
    setUpdateData, 
    debtSelected, 
    setVisibleManagePago,
    historialDebt, 
    // filteredContacts 
}: ModalHistorialProps ) {
    
    // const { users } = useUsers();
    const { data: session } = useSession()

    const { classes } = useStylesGlobal()
    const { debtsByCreditor, isErrorDebtsByCreditor, isLoadingDebtsByCreditor, mutateDebtsByCreditor } = useDebtsByCreditor();
    const { debtsByDebtor, isErrorDebtsByDebtor, isLoadingDebtsByDebtor, mutateDebtsByDebtor } = useDebtsByDebtor();
    // const [idDebtor, setIdDebtor] = useState("");
    // const [nameDebtor, setNameDebtorl] = useState(newPayment.id_debt);
    // const [phone, setPhone] = useState<string>("");
    const [amount, setAmount] = useState<string>("");
    const [showDetails, setShowDetails] = useState<boolean>(false);
    
    // const [dateDue, setDateDue] = useState<Date | null>(debtEdit ? new Date(debtEdit.date_due) : null);
    // const [currency, setCurrency] = useState<string>("$ARS");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    console.log("historialDebt: ", historialDebt)
    // async function handleSubmit(e: React.FormEvent) {
    //     e.preventDefault();
    //     setLoading(true);
    //     setMessage(null);

    //     // console.log("email: ", email)

    //     if(amount) { 
    //         try {
    //             const createNewPayment: NewPayment = {
    //                 id_debt: newPayment?.id_debt || "",
    //                 amount: Number(amount),
    //                 // dolar_google: ???,   //  ATTENTION IMPORTANT this dolar google should update to the dolar google on the current date
    //             }
    //             console.log("createNewPayment: ", createNewPayment);
    //             await postPayment(createNewPayment);
    //             mutateDebtsByCreditor()
    //             mutateDebtsByDebtor()
    //             setVisibleManagePago?.(false);
    //         } catch (err: any) {
    //             console.error("Error creating debt: ", err);
    //             // setMessage(`X ${err.message || "Failed to create debt"}`);
    //         } finally {
    //             setLoading(false);
    //             setUpdateData({state: true, data: "debts"})
    //         }
    //     } else {
    //         setMessage("Ingresar pago")
    //         alert("Ingresar pago")
    //     }
    // }

    return (
        <div className="flex flex-col p-2 max-w-md">
            <h3 className="text-3xl text-center font-bold text-gray-800 dark:text-gray-100 mb-4">
                {/* {newPayment?.name || newPayment?.email} */}
                {/* {newPayment?.name || ((newPayment?.email ?? "").length > 15 ? (newPayment?.email ?? "").slice(0, 15)+"..." : newPayment?.email)} */}
                Historial
            </h3>
            <Box className={classes.customBoxRow}>
                <a>
                    Pendiente
                </a>
                <a>
                    {debtSelected?.id_debt}
                </a>
                <a>
                    {debtSelected?.currency}
                </a>
            </Box>
          
        </div>
    )
}