/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useStylesGlobal } from "@/Styles";
import { NewPayment, UpdateDataProps, UpdateDebt } from "@/types";
import { Box } from "@mui/material";
import { AcceptButton, CancelButton } from "./Buttons";
import { useState } from "react";
import DatePickerComponent from "./DatePickerComponent";
import { patchDebtDateDue } from "@/lib/api";
import useDebtsByDebtor from "@/hooks/useDebtsByDebtor";
import useDebtsByCreditor from "@/hooks/useDebtsByCreditor";
import { dateFormat } from "@/utils/dateFormat";

interface ModalCambiarFechaProps {
    // setUpdateData: (visible: UpdateDataProps) => void;
    debtSelected?: NewPayment | null;
    setVisibleModalCambiarFecha: (visible: boolean) => void;
    // historialDebtPayments?: Payment[];
    setNewPayment: (visible: NewPayment) => void;
}
export default function ModalCambiarFecha({ 
    // setUpdateData,
    debtSelected,
    setVisibleModalCambiarFecha, 
    // historialDebtPayments,
    setNewPayment,
}: ModalCambiarFechaProps ) {

    const { classes } = useStylesGlobal()
    const { mutateDebtsByCreditor } = useDebtsByCreditor();
    const { mutateDebtsByDebtor } = useDebtsByDebtor();
    const [newDate, setNewDate] = useState<Date | null>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        if( debtSelected) { 
            try {
                const updateDateDueDebt: UpdateDebt = {
                    _id: debtSelected.id_debt ,
                    date_due: newDate
                }
                // console.log("updateDateDueDebt: ", updateDateDueDebt);
                await patchDebtDateDue(updateDateDueDebt);
                await setNewPayment({...debtSelected, date_due: dateFormat(newDate?.toString()) })
                mutateDebtsByCreditor()
                mutateDebtsByDebtor()
                setVisibleModalCambiarFecha(false)
            } catch (err: any) {
                console.error("Error creating debt: ", err);
                // setMessage(`X ${err.message || "Failed to create debt"}`);
            } finally {
                setLoading(false);
                // setUpdateData({state: true, data: "debts"})
            }
        } else {
            setMessage("Deuda no seleccionada")
            // alert("Ingresar pago")
        }
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