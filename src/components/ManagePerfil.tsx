/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { patchUser, postPayment } from "@/lib/api";
import { useStylesGlobal } from "../Styles";
import { NewPayment, NewUser, UpdateDataProps, User } from "@/types";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { AcceptButton, CancelButton } from "./Buttons";
import { useSession } from "next-auth/react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import useDebtsByDebtor from "@/hooks/useDebtsByDebtor";
import useDebtsByCreditor from "@/hooks/useDebtsByCreditor";
import { useTheme } from "next-themes";

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
    const { data: session, update: updateSession } = useSession()
// console.log("session: ", session)
    const { classes } = useStylesGlobal()
    const { theme } = useTheme();
    const { debtsByCreditor, isErrorDebtsByCreditor, isLoadingDebtsByCreditor, mutateDebtsByCreditor } = useDebtsByCreditor();
    const { debtsByDebtor, isErrorDebtsByDebtor, isLoadingDebtsByDebtor, mutateDebtsByDebtor } = useDebtsByDebtor();
    const [name, setName] = useState<string>(session?.user.name ? session.user.name : "");
    const [phone, setPhone] = useState<string>(session?.user.phone ? session.user.phone : "");
    // const [phoneValidated, setPhoneValidated] = useState<boolean>(false);
    const [email, setEmail] = useState<string>(session?.user.email ? session.user.email : "");
    // const [emailValidated, setEmailValidated] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        // console.log("email: ", email)
        // if(email && emailValidated) { 
        if(email) { 
            try {
                const editUser: User = {
                _id: session?.user._id || "", 
                email: email,
                phone: phone,
                name: name,
                }
                console.log("session?.user: ", session?.user);
                // console.log("editUser: ", editUser);
                await patchUser(editUser);
                await updateSession({
                    user: {
                        ...session?.user,
                        name,
                        phone,
                        email,
                    },
                });
                // mutateDebtsByCreditor()
                // mutateDebtsByDebtor()
                setVisibleManagePerfil?.(false);
            } catch (err: any) {
                console.error("Error creating debt: ", err);
                // setMessage(`X ${err.message || "Failed to create debt"}`);
            } finally {
                setLoading(false);
                // setUpdateData({state: true, data: "debts"})
            }
        } else {
            setMessage("Ingresar email")
            alert("Ingresar email")
        }
    }

    return (
        <div className={`
                ${classes[`${theme}_text` as keyof typeof classes]}
                flex flex-col p-2 max-w-md
            `}
        >
            <h3 className="text-3xl text-center font-bold mb-4">
                Perfil
            </h3>
            <form onSubmit={handleSubmit} >
                 <Box className={`${classes.container}`}>
                    <Box className={classes.row}>
                    <a className={`
                ${classes[`${theme}_text` as keyof typeof classes]}
                ${classes.labelPerfil}
            `}>
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
                        className={`
                            ${classes[`${theme}_inputMainData` as keyof typeof classes]} 
                            ${classes.inputMainData} 
                            ${classes.valuePerfil}
                        `}
                    />
                </Box>
                <Box className={classes.row} >
                   <a className={`
                ${classes[`${theme}_text` as keyof typeof classes]}
                ${classes.labelPerfil}
            `}>
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
                        className={`
                            ${classes[`${theme}_inputMainData` as keyof typeof classes]} 
                            ${classes.inputMainData} 
                            ${classes.valuePerfil}
                        `}
                    />
                    {/* <Button
                        variant="text"
                        className={`${classes.btnCommonStyle} ${classes[`${theme}_btnCommonStyle_color` as keyof typeof classes]} ${classes.btn_info} ${classes[`${theme}_btn_info_color` as keyof typeof classes]}`}
                        onClick={() => {
                            alert("Validar teléfono")
                        }}
                    > 
                        Validar
                    </Button> */}
                </Box>
                    <Box className={classes.row}>
                        <a className={`
                ${classes[`${theme}_text` as keyof typeof classes]}
                ${classes.labelPerfil}
            `}>
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
                        className={`
                            ${classes[`${theme}_inputMainData` as keyof typeof classes]} 
                            ${classes.inputMainData} 
                            ${classes.valuePerfil}
                        `}
                    />
                    {/* <Button
                        variant="text"
                        className={`${classes.btnCommonStyle} ${classes[`${theme}_btnCommonStyle_color` as keyof typeof classes]} ${classes.btn_info} ${classes[`${theme}_btn_info_color` as keyof typeof classes]}`}
                        onClick={() => {
                            alert("Validar email")
                        }}
                    > 
                        Validar
                    </Button> */}
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