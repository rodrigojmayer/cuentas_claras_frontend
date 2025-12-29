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

interface ManagePerfilProps {
    setUpdateData: (visible: UpdateDataProps) => void;
    // newPayment?: NewPayment | null;
    setVisibleManagePerfil: (visible: boolean) => void;
    // setVisibleModalHistorial: (visible: boolean) => void;
    setVisibleModalCambiarFecha: (visible: boolean) => void;
    // filteredContacts: Contacts[];
}
export default function ManagePerfil({ 
    setUpdateData, 
    // newPayment, 
    setVisibleManagePerfil, 
    // setVisibleModalHistorial,
    setVisibleModalCambiarFecha,
    // filteredContacts 
}: ManagePerfilProps ) {
    
    // const { users } = useUsers();
    const { data: session } = useSession()
// console.log("session: ", session)
    const { classes } = useStylesGlobal()
    const { debtsByCreditor, isErrorDebtsByCreditor, isLoadingDebtsByCreditor, mutateDebtsByCreditor } = useDebtsByCreditor();
    const { debtsByDebtor, isErrorDebtsByDebtor, isLoadingDebtsByDebtor, mutateDebtsByDebtor } = useDebtsByDebtor();
    // const [idDebtor, setIdDebtor] = useState("");
    // const [nameDebtor, setNameDebtorl] = useState(newPayment.id_debt);
    // const [phone, setPhone] = useState<string>("");
    const [name, setName] = useState<string>(session?.user.name ? session.user.name : "");
    const [phone, setPhone] = useState<string>("");
    const [email, setEmail] = useState<string>("");
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
if(email) { 
    //     if(amount && Number(amount) > 0) { 
    //         try {
    //             const createNewPayment: NewPayment = {
    //                 id_debt: newPayment?.id_debt || "",
    //                 amount: Number(amount),
    //                 pending: Number(newPayment?.pending) - Number(amount)
    //                 // dolar_google: ???,   //  ATTENTION IMPORTANT this dolar google should update to the dolar google on the current date
    //             }
    //             console.log("createNewPayment: ", createNewPayment);
    //             await postPayment(createNewPayment);
    //             mutateDebtsByCreditor()
    //             mutateDebtsByDebtor()
    //             setVisibleManagePerfil?.(false);
    //         } catch (err: any) {
    //             console.error("Error creating debt: ", err);
    //             // setMessage(`X ${err.message || "Failed to create debt"}`);
    //         } finally {
    //             setLoading(false);
    //             setUpdateData({state: true, data: "debts"})
    //         }
        } else {
            setMessage("Ingresar email")
            alert("Ingresar email")
        }
    }

    return (
        <div className="flex flex-col p-2 max-w-md">
            <h3 className="text-3xl text-center font-bold text-gray-800 dark:text-gray-100 mb-4">
                Perfil
            </h3>
            <form onSubmit={handleSubmit} >
                 <Box className={`${classes.container}`}>
                    <Box className={classes.row}>
                    <a className={classes.labelPerfil}>
                        Nombre
                    </a>
                    <TextField
                        autoFocus
                        value={name}
                        onChange={(event:any) => {
                            const val = event.target.value;
                            setName(val);
                        }}
                        size="small"
                        className={`${classes.inputMainData} ${classes.valuePerfil}`}
                    />
                </Box>
                <Box className={classes.row}>
                    <a className={classes.labelPerfil}>
                        Teléfono
                    </a>
                    <TextField
                        autoFocus
                        value={phone}
                        onChange={(event:any) => {
                            const val = event.target.value;
                            if (/^\d*$/.test(val)) {
                                    setPhone(val);
                            }
                        }}
                        size="small"
                        className={`${classes.inputMainData} ${classes.valuePerfil}`}
                    />
                    <Button
                        variant="text"
                        className={`${classes.btnCommonStyle} ${classes.btn_info}`}
                        onClick={() => {
                            alert("Validar teléfono")
                        }}
                    > 
                        Validar
                    </Button>
                </Box>
                    <Box className={classes.row}>
                                        <a className={classes.labelPerfil}>

                        Email
                    </a>
                    <TextField
                        autoFocus
                        value={email}
                        onChange={(event:any) => {
                            const val = event.target.value;
                            setEmail(val);
                        }}
                        size="small"
                        className={`${classes.inputMainData} ${classes.valuePerfil}`}
                    />
                    <Button
                        variant="text"
                        className={`${classes.btnCommonStyle} ${classes.btn_info}`}
                        onClick={() => {
                            alert("Validar email")
                        }}
                    > 
                        Validar
                    </Button>
                </Box>
                <Box className={`${classes.customBoxRow} ${classes.customBoxRowSpaces}` }>   
                    <CancelButton clicked={() => setVisibleManagePerfil(false)}/>
                    <AcceptButton />
                </Box>
                </Box>
            </form>
        </div>
    )
}