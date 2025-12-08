/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useStylesGlobal } from "@/Styles";
import { NewPayment, Payment } from "@/types";
import { Box, TextField } from "@mui/material";
import { AcceptButton, CancelButton } from "./Buttons";
import { useState } from "react";
import DatePickerComponent from "./DatePickerComponent";

interface ModalCambiarFechaProps {
    debtSelected?: NewPayment | null;
    setVisibleModalCambiarFecha: (visible: boolean) => void;
    // historialDebtPayments?: Payment[];
}
export default function ModalCambiarFecha({ 
    debtSelected,
    setVisibleModalCambiarFecha, 
    // historialDebtPayments
}: ModalCambiarFechaProps ) {

    const { classes } = useStylesGlobal()
    const [newDate, setNewDate] = useState<Date | null>(null);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        // setLoading(true);
        // setMessage(null);

        console.log("e: ", e)

        // if(amount) { 
        //     try {
        //         const createNewPayment: NewPayment = {
        //             id_debt: newPayment?.id_debt || "",
        //             amount: Number(amount),
        //             pending: Number(newPayment?.pending) - Number(amount)
        //             // dolar_google: ???,   //  ATTENTION IMPORTANT this dolar google should update to the dolar google on the current date
        //         }
        //         console.log("createNewPayment: ", createNewPayment);
        //         // await postPayment(createNewPayment);
        //         mutateDebtsByCreditor()
        //         mutateDebtsByDebtor()
        //         setVisibleManagePago?.(false);
        //     } catch (err: any) {
        //         console.error("Error creating debt: ", err);
        //         // setMessage(`X ${err.message || "Failed to create debt"}`);
        //     } finally {
        //         setLoading(false);
        //         setUpdateData({state: true, data: "debts"})
        //     }
        // } else {
        //     setMessage("Ingresar pago")
        //     alert("Ingresar pago")
        // }
        setVisibleModalCambiarFecha(false)
    }


    return (
        <div className="max-h-[80vh] overflow-y-auto flex flex-col p-2 max-w-md mt-1">
            <h3 className="text-3xl text-center font-bold text-gray-800 dark:text-gray-100 mb-4">
               Cambiar vencimiento
            </h3>
            <Box className={classes.customBoxRow}>
                <a>
                    Actual: 
                </a>
                <a>
                    {debtSelected?.date_due}
                </a>
            </Box>
            <form onSubmit={handleSubmit} className="flex flex-col gap-1.5 rounded-lg p-2">
                
                <Box className={classes.customBoxRow}>
                    {/* <a>
                        Nuevo vencimiento: 
                    </a> */}
                        <label className="input-label">Nuevo:</label>
                        <DatePickerComponent dateProp={newDate} setDateProp={setNewDate} widthProp={"160px"} />
                </Box>
                <Box className={`${classes.customBoxRow} ${classes.customBoxRowSpaces}` }>   
                    <CancelButton clicked={() => setVisibleModalCambiarFecha(false)}/>
                    <AcceptButton />
                </Box>
            </form>
        </div>
    )
}