"use client";
import { useState } from "react";
import PostDebt from "@/components/PostDebt";
import ManageUser from "@/components/ManageUser"
import PostPayment from "@/components/PostPayment";
import ManageAlert from "@/components/ManageAlert";
import DataList from "@/components/DataList"
import type { Alert, User } from "@/types";

export default function TestApi() {

    const [visibleUpdateUser, setVisibleUpdateUser] = useState(false);
    const [userEdit, setUserEdit] = useState<User | undefined>(undefined);
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
                    />
                </div>
            </div>
        )}
        <div className="flex flex-col ">
            < ManageUser />
            < PostDebt />
            < PostPayment />
            < ManageAlert />
        </div>
        < DataList 
            setVisibleUpdateUser={setVisibleUpdateUser} 
            setUserEdit={setUserEdit} 
            setVisibleUpdateAlert={setVisibleUpdateAlert} 
            setAlertEdit={setAlertEdit} 
        />
    </div>
    );
}
