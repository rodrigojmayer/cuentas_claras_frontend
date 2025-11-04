"use client";
import { useEffect, useState } from "react";
import ManageUser from "@/components/ManageUser"
import ManageDebt from "@/components/ManageDebt";
import ManagePayment from "@/components/ManagePayment";
import ManageAlert from "@/components/ManageAlert";
import DataList from "@/components/DataList"
import type { Alert, Debt, Payment, User } from "@/types";
import ConfirmDelete from "@/components/ConfirmDelete";

export default function TestApi() {

    const [visibleUpdateUser, setVisibleUpdateUser] = useState(false);
    const [userEdit, setUserEdit] = useState<User | undefined>(undefined);
    const [visibleUpdateDebt, setVisibleUpdateDebt] = useState(false);
    const [debtEdit, setDebtEdit] = useState<Debt | undefined>(undefined);
    const [visibleUpdatePayment, setVisibleUpdatePayment] = useState(false);
    const [paymentEdit, setPaymentEdit] = useState<Payment | undefined>(undefined);
    const [visibleUpdateAlert, setVisibleUpdateAlert] = useState(false);
    const [alertEdit, setAlertEdit] = useState<Alert | undefined>(undefined);
    const [visibleConfirmDelete, setVisibleConfirmDelete] = useState(false);
    const [userDelete, setUserDelete] = useState<User | undefined>(undefined);
    const [debtDelete, setDebtDelete] = useState<Debt | undefined>(undefined);
    const [paymentDelete, setPaymentDelete] = useState<Payment | undefined>(undefined);
    const [alertDelete, setAlertDelete] = useState<Alert | undefined>(undefined);

    useEffect(() => {
        if(!visibleConfirmDelete) {
            setUserDelete(undefined)
            setDebtDelete(undefined)
            setPaymentDelete(undefined)
            setAlertDelete(undefined)
        }
    }, [visibleConfirmDelete])
    useEffect(() => {
       if(userDelete || debtDelete || paymentDelete || alertDelete)
        setVisibleConfirmDelete(true)
    }, [userDelete, debtDelete, paymentDelete, alertDelete])

  return (
    <div className="flex justify-center bg-gray-700">
        {/* --- MODAL OVERLAY --- } */}
        {visibleUpdateUser && (
            <div 
                className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
                onClick={() => setVisibleUpdateUser(false)} // click background to close
            >
                {/* --- MODAL CONTENT --- */}
                <div
                    className="bg-blue-900 p6 rounded-2xl shadow-lg w-[90%] max-w-md text-white"
                    onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
                >
                    <ManageUser 
                        userEdit={userEdit}  
                        setVisibleUpdateUser={setVisibleUpdateUser}
                    />
                </div>
            </div>
        )}
        {visibleUpdateDebt && (
            <div 
                className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
                onClick={() => setVisibleUpdateDebt(false)} // click background to close
            >
                <div
                    className="bg-green-900 p6 rounded-2xl shadow-lg w-[90%] max-w-md text-white"
                    onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
                >
                    <ManageDebt  
                        debtEdit={debtEdit}  
                        setVisibleUpdateDebt={setVisibleUpdateDebt}  
                    />
                </div>
            </div>
        )}
        {visibleUpdatePayment && (
            <div 
                className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
                onClick={() => setVisibleUpdatePayment(false)} // click background to close
            >
                {/* --- MODAL CONTENT --- */}
                <div
                    className="bg-yellow-900 p6 rounded-2xl shadow-lg w-[90%] max-w-md text-white"
                    onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
                >
                    <ManagePayment 
                        paymentEdit={paymentEdit}  
                        setVisibleUpdatePayment={setVisibleUpdatePayment}
                    />
                </div>
            </div>
        )}
        {visibleUpdateAlert && (
            <div 
                className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
                onClick={() => setVisibleUpdateAlert(false)} // click background to close
            >
                <div
                    className="bg-red-900 p6 rounded-2xl shadow-lg w-[90%] max-w-md text-white"
                    onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
                >
                    <ManageAlert  
                        alertEdit={alertEdit}  
                        setVisibleUpdateAlert={setVisibleUpdateAlert}  
                    />
                </div>
            </div>
        )}
        {visibleConfirmDelete && (
            <div 
                className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
                onClick={() => setVisibleConfirmDelete(false)} // click background to close
            >
                <div
                    className="bg-red-600 p6 rounded-2xl shadow-lg w-[90%] max-w-md text-white"
                    onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
                >
                    <ConfirmDelete  
                        setVisibleConfirmDelete={setVisibleConfirmDelete}  
                        userDelete={userDelete}  
                        debtDelete={debtDelete}  
                        paymentDelete={paymentDelete}
                        alertDelete={alertDelete}
                    />
                </div>
            </div>
        )}
        <div className="flex flex-col ">
            < ManageUser />
            < ManageDebt />
            < ManagePayment />
            < ManageAlert />
        </div>
        < DataList 
            setVisibleUpdateUser={setVisibleUpdateUser} 
            setUserEdit={setUserEdit} 
            setVisibleUpdateDebt={setVisibleUpdateDebt} 
            setDebtEdit={setDebtEdit} 
            setVisibleUpdatePayment={setVisibleUpdatePayment} 
            setPaymentEdit={setPaymentEdit} 
            setVisibleUpdateAlert={setVisibleUpdateAlert} 
            setAlertEdit={setAlertEdit} 
            setUserDelete={setUserDelete} 
            setDebtDelete={setDebtDelete} 
            setPaymentDelete={setPaymentDelete}
            setAlertDelete={setAlertDelete}
        />
    </div>
    );
}
