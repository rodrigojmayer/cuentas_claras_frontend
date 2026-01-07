/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { postPayment } from "@/lib/api";
import { useStylesGlobal } from "@/Styles";
import { NewPayment, UpdateDataProps } from "@/types";
import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { AcceptButton, CancelButton } from "./Buttons";
import { useSession } from "next-auth/react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import useDebtsByDebtor from "@/hooks/useDebtsByDebtor";
import useDebtsByCreditor from "@/hooks/useDebtsByCreditor";
import { useTheme } from "next-themes";

interface ManagePagoProps {
    setUpdateData: (visible: UpdateDataProps) => void;
    newPayment?: NewPayment | null;
    setVisibleManagePago: (visible: boolean) => void;
    setVisibleModalHistorial: (visible: boolean) => void;
    setVisibleModalCambiarFecha: (visible: boolean) => void;
    // filteredContacts: Contacts[];
}
export default function ManagePago({ 
    setUpdateData, 
    newPayment, 
    setVisibleManagePago, 
    setVisibleModalHistorial,
    setVisibleModalCambiarFecha,
    // filteredContacts 
}: ManagePagoProps ) {
    
    // const { users } = useUsers();
    const { data: session } = useSession()
    const { theme } = useTheme();

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

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        // console.log("email: ", email)

        if(amount && Number(amount) > 0) { 
            try {
                const createNewPayment: NewPayment = {
                    id_debt: newPayment?.id_debt || "",
                    amount: Number(amount),
                    pending: Number(newPayment?.pending) - Number(amount)
                    // dolar_google: ???,   //  ATTENTION IMPORTANT this dolar google should update to the dolar google on the current date
                }
                console.log("createNewPayment: ", createNewPayment);
                await postPayment(createNewPayment);
                mutateDebtsByCreditor()
                mutateDebtsByDebtor()
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
                {/* {newPayment?.name || newPayment?.email} */}
                {newPayment?.name || ((newPayment?.email ?? "").length > 15 ? (newPayment?.email ?? "").slice(0, 15)+"..." : newPayment?.email)}
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
                                    setAmount(newPayment?.pending ? newPayment?.pending.toString() : "");
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
            {/* <Box className={`${showDetails ? classes.customBoxColumn : classes.hide } grid grid-cols-5 grid-rows-5 gap-4` }> */}
            <Box className={`${showDetails ? classes.container : classes.hide }`}>
                <Box className={classes.row}>
                    <a className={classes.label}>
                        Teléfono: 
                    </a>
                    <a className={classes.value}>
                        {newPayment?.phone}
                    </a>
                </Box>
                <Box className={classes.row }>
                    <a className={classes.label}>
                        Correo:
                    </a>
                    <a className={classes.value}>  
                        {(newPayment?.email ?? "").length > 15 ? (newPayment?.email ?? "").slice(0, 15)+"..." : newPayment?.email}
                    </a>
                </Box>
                <Box className={classes.row}>
                    <a className={classes.label}>
                        Fecha: 
                    </a>
                    <a className={classes.value}>
                        {newPayment?.date_debt}
                        <b  className={"m-2"}>
                            <Button
                                // type={clicked? "button" : "submit"}
                                variant="text"
                                className={`${classes.btnCommonStyle} ${classes.btn_info}`}
                                // color="inherit"
                                onClick={() => {
                                    // const a = parseInt(newPayment?.pending, 10)
                                    setVisibleModalHistorial(true)
                                }}
                                > 
                                Historial
                            </Button>
                        </b>
                    </a>
                </Box>
                <Box className={classes.row}>
                    <a className={classes.label}>
                        Préstamo: 
                    </a>
                    <a className={classes.value}>
                        {newPayment?.initial_amount} {newPayment?.currency}
                    </a>
                </Box>
                <Box className={classes.row}>
                    <a className={classes.label}>
                        Vencimiento: 
                    </a>    
                    <a className={classes.value}>
                        {newPayment?.date_due}
                        <b  className={"m-2"}>
                            <Button
                                // type={clicked? "button" : "submit"}
                                variant="text"
                                className={`${classes.btnCommonStyle} ${classes.btn_info}`}
                                // color="inherit"
                                onClick={() => {
                                    // const a = parseInt(newPayment?.pending, 10)
                                    setVisibleModalCambiarFecha(true)
                                }}
                                > 
                                Cambiar
                            </Button>
                        </b>
                    </a>
                </Box>
            </Box>
            <Button 
                className={`${classes[`${theme}_background_color3` as keyof typeof classes]} ${classes.deployModalButton}`}
                onClick={() => setShowDetails(!showDetails)}
            >
                {showDetails ?
                    <KeyboardArrowUpIcon fontSize="large"/>
                    :
                    <KeyboardArrowDownIcon fontSize="large"/>
                }
            </Button>
        </div>
    )
}