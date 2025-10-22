"use client";
import { useState } from "react";
import PostDebt from "@/components/PostDebt";
import ManageUser from "../../components/ManageUser"
import PostPayment from "@/components/PostPayment";
import PostAlert from "@/components/PostAlert";
import DataList from "../../components/DataList"

export default function TestApi() {

    const [visibleUpdateUser, setVisibleUpdateUser] = useState(true)


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
                    <ManageUser />
                </div>
            </div>
        )}
        <div className="flex flex-col ">
            < ManageUser />
            < PostDebt />
            < PostPayment />
            < PostAlert />
        </div>
        < DataList />
    </div>
    );
}
