/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useStylesGlobal } from "@/Styles";
import { NewPayment, Payment } from "@/types";
import { Box } from "@mui/material";

interface ModalHistorialProps {
    debtSelected?: NewPayment | null;
    historialDebtPayments?: Payment[];
}
export default function ModalHistorial({ 
    debtSelected, 
    historialDebtPayments
}: ModalHistorialProps ) {

    const { classes } = useStylesGlobal()
    return (
        <div className="max-h-[80vh] overflow-y-auto flex flex-col p-2 max-w-md mt-1 mb-4">
            <h3 className="text-3xl text-center font-bold text-gray-800 dark:text-gray-100 mb-4">
               Historial
            </h3>
            <Box className={`${classes.customBoxRow} font-bold`}>
                <a>
                    {debtSelected?.date_debt} - Préstamo creado
                </a>
            </Box>
            { debtSelected?.dolar_google && 
                <Box className={classes.customBoxRow}>
                    <a>
                        Cotización Dolar: 
                    </a>
                    <a>
                        {debtSelected?.dolar_google}
                    </a>
                </Box>
            }
            <Box className={classes.customBoxRow}>
                 <a>
                    Cantidad: 
                </a>
                <a>
                    {debtSelected?.initial_amount} {debtSelected?.currency}
                </a>
            </Box>
            { historialDebtPayments && historialDebtPayments.length > 0 &&
                historialDebtPayments.map((payment:Payment, index: number) => (
                    <Box key={index} className="mt-4">
                        <Box className={`${classes.customBoxRow} font-bold`} >
                            <a>
                                {payment?.date_payment} - {index+1}° Devolución
                            </a>
                        </Box>
                        { payment?.dolar_google && 
                            <Box className={classes.customBoxRow} >
                                <a>
                                    Cotización Dolar: 
                                </a>
                                <a>
                                    {payment?.dolar_google}
                                </a>
                            </Box>
                        }
                        <Box className={classes.customBoxRow}>
                            <a>
                                Cantidad: 
                            </a>
                            <a>
                                {payment?.amount} {debtSelected?.currency}
                            </a>
                        </Box>
                        <Box className={classes.customBoxRow}>
                            <a>
                                Pendiente: 
                            </a>
                            <a>
                                {payment?.pending} {debtSelected?.currency}
                            </a>
                        </Box>
                    </Box>
                ))
            }
        </div>
    )
}