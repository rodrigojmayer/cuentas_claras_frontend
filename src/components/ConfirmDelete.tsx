/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { deleteUser, deleteDebt, deletePayment, deleteAlert } from "../lib/api";
import type { Alert, Debt, Payment, UpdateDataProps, User } from "../types";

interface ConfirmDeleteProps {
    setUpdateData: (visible: UpdateDataProps) => void;
    setVisibleConfirmDelete?: (visible: boolean) => void;
    userDelete?: User;
    debtDelete?: Debt;
    paymentDelete?: Payment;
    alertDelete?: Alert;
}

export default function ConfirmDelete({
    setUpdateData, 
    setVisibleConfirmDelete, 
    userDelete, 
    debtDelete, 
    paymentDelete,
    alertDelete
}: ConfirmDeleteProps) {
    let toDelete = ""
    if(userDelete){
        toDelete = "users"
    } else if (debtDelete){
        toDelete = "debts"
    } else if (paymentDelete){
        toDelete = "payments"
    } else if (alertDelete){
        toDelete = "alerts"
    }
    
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault(); // prevent full page reload
        setLoading(true);
        setMessage(null);

        try {
            if(userDelete) {
                await deleteUser(userDelete._id);
            } 
            if(debtDelete) {
                await deleteDebt(debtDelete._id);
            } 
            if(paymentDelete) {
                await deletePayment(paymentDelete._id);
            } 
            if(alertDelete) {
                await deleteAlert(alertDelete._id);
            } 
            // console.log("Created user:", response);

            setMessage("Deleted successfully");
        } catch(err: any) {
            console.error("Error deleting: ", err);
            setMessage(`X ${err.message || "Failed to delete"}`);
        } finally {
            setVisibleConfirmDelete?.(false);
            setLoading(false);
            setUpdateData({state: true, data: toDelete})
        }
    }

    return (
        <div className="flex flex-col p-2 max-w-md">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                Delete 
                {userDelete && " User"} 
                {debtDelete && " Debt"}
                {paymentDelete && " Payment"}
                {alertDelete && " Alert"} 
            </h2>
            
            <form onSubmit={handleSubmit} className={`
                flex flex-col gap-1.5 
                border rounded-lg p-2 
                ${userDelete && "bg-blue-300"} 
                ${debtDelete && "bg-green-300"} 
                ${paymentDelete && "bg-yellow-200"} 
                ${alertDelete && "bg-red-200"} 
                text-gray-800`}>
                {(userDelete?._id && !debtDelete?._id && !paymentDelete?._id && !alertDelete?._id) && ( 
                    <>
                        <label className="input-label">Email: {userDelete?.email}</label>
                        <label className="input-label">Phone: {userDelete?.phone}</label>
                        <label className="input-label">Name: {userDelete?.name}</label>
                        <label className="input-label">Enabled: {userDelete?.enabled}</label>
                        <label className="input-label">Deleted: {userDelete?.deleted}</label>
                    </>
                ) }
                {(!userDelete?._id && debtDelete?._id && !paymentDelete?._id && !alertDelete?._id) && ( 
                    <>
                        <label className="input-label">
                            ID Creditor: {typeof debtDelete?.id_user_creditor === "object"
                            ? (debtDelete.id_user_creditor as any)._id
                            : debtDelete?.id_user_creditor}
                        </label>
                        <label className="input-label">
                            ID Debtor: {typeof debtDelete?.id_user_debtor === "object"
                            ? (debtDelete.id_user_debtor as any)._id
                            : debtDelete?.id_user_debtor}
                        </label>
                        <label className="input-label">Detail: {debtDelete?.detail}</label>
                        <label className="input-label">Amount: {debtDelete?.amount}</label>
                        <label className="input-label">Dolar Google: {debtDelete?.dolar_google}</label>
                        <label className="input-label">Status: {debtDelete?.status}</label>
                        <label className="input-label">Date Debt: {debtDelete?.date_debt}</label>
                        <label className="input-label">Date Due: {debtDelete?.date_due}</label>
                        <label className="input-label">Currency: {debtDelete?.currency}</label>
                        <label className="input-label">Enabled: {debtDelete?.enabled}</label>
                        <label className="input-label">Deleted: {debtDelete?.deleted}</label>
                    </>
                ) }
                {(!userDelete?._id && !debtDelete?._id && paymentDelete?._id && !alertDelete?._id) && ( 
                    <>
                        <label className="input-label">ID Debt: {paymentDelete?.id_debt}</label>
                        <label className="input-label">Amount: {paymentDelete?.amount}</label>
                        <label className="input-label">Date Payment: {paymentDelete?.date_payment}</label>
                        <label className="input-label">Dolar Google: {paymentDelete?.dolar_google}</label>
                        <label className="input-label">Enabled: {paymentDelete?.enabled}</label>
                        <label className="input-label">Deleted: {paymentDelete?.deleted}</label>
                    </>
                ) }
                {(!userDelete?._id && !debtDelete?._id && !paymentDelete?._id && alertDelete?._id) && ( 
                    <>
                        <label className="input-label">ID Debt: {alertDelete?.id_debt}</label>
                        <label className="input-label">Date Alert: {alertDelete?.date_alert}</label>
                        <label className="input-label">Sent: {alertDelete?.sent}</label>
                        <label className="input-label">Enabled: {alertDelete?.enabled}</label>
                        <label className="input-label">Deleted: {alertDelete?.deleted}</label>
                    </>
                ) }

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-red-500 text-white py-2 m-auto w-30 rounded-lg hover:bg-gray-700 transition cursor-pointer"
                >
                    Confirm Delete   
                </button>
            </form>

            {message && (
                <p className="mt-4 text-center text-gray-700 dark:text-gray-200">
                    {message}
                </p>
            )}
        </div>
    );
}