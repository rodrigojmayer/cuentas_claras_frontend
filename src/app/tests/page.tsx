"use client";
import { useState } from "react";
import ManageUser from "@/components/ManageUser"
import ManageDebt from "@/components/ManageDebt";
import PostPayment from "@/components/PostPayment";
import ManageAlert from "@/components/ManageAlert";
import DataList from "@/components/DataList"
import type { Alert, Debt, User } from "@/types";

export default function TestApi() {

    const [visibleUpdateUser, setVisibleUpdateUser] = useState(false);
    const [userEdit, setUserEdit] = useState<User | undefined>(undefined);
    const [visibleUpdateDebt, setVisibleUpdateDebt] = useState(false);
    const [debtEdit, setDebtEdit] = useState<Debt | undefined>(undefined);
    const [visibleUpdateAlert, setVisibleUpdateAlert] = useState(false);
    const [alertEdit, setAlertEdit] = useState<Alert | undefined>(undefined);


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
        <div className="flex flex-col ">
            < ManageUser />
            < ManageDebt />
            < PostPayment />
            < ManageAlert />
        </div>
        < DataList 
            setVisibleUpdateUser={setVisibleUpdateUser} 
            setUserEdit={setUserEdit} 
            setVisibleUpdateDebt={setVisibleUpdateDebt} 
            setDebtEdit={setDebtEdit} 
            setVisibleUpdateAlert={setVisibleUpdateAlert} 
            setAlertEdit={setAlertEdit} 
        />
    </div>
    );
}
