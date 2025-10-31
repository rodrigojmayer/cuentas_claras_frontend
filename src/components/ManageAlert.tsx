"use client";
import { useState } from "react";
import { patchAlert, postAlert } from "../lib/api";
import type { Alert, NewAlert } from "../types";
import DatePickerComponent from "./DatePickerComponent";

interface ManageAlertProps {
    alertEdit?: Alert;
    setVisibleUpdateAlert?: (visible: boolean) => void;
}
export default function ManageAlert({ alertEdit, setVisibleUpdateAlert }: ManageAlertProps) {
    
    const [alertIdDebt, setAlertIdDebt] = useState<string>(alertEdit ? alertEdit.id_debt : "");
    const [alertDateAlert, setAlertDateAlert] = useState<Date | null>(alertEdit ? new Date(alertEdit.date_alert) : null);
    const [alertSent, setAlertSent] = useState<boolean>(alertEdit ? alertEdit.sent : false);
    const [alertEnabled, setAlertEnabled] = useState<boolean>(alertEdit ? alertEdit.enabled : true);
    const [alertDeleted, setAlertDeleted] = useState<boolean>(alertEdit ? alertEdit.deleted : false);
    
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    async function handleSubmit (e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            if(alertEdit) {
                const updateAlert : Alert = {
                    _id: alertEdit._id,
                    id_debt: alertIdDebt,
                    date_alert: alertDateAlert,
                    sent: alertSent,
                    enabled: alertEnabled,
                    deleted: alertDeleted
                };
                await patchAlert(updateAlert);
                setVisibleUpdateAlert?.(false);
            } else {
                const newAlert: NewAlert = {
                    id_debt: alertIdDebt,
                    date_alert: alertDateAlert,
                };   
                await postAlert(newAlert);
            }
            // console.log("Created alert: ", response);

            setMessage(`Alert ${alertEdit ? "edited" : "created"} successfully!`);
            setAlertIdDebt("");
            setAlertDateAlert(null);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            console.error("Error creating alert: ", err);
            setMessage(`X ${err.message || "Failed to create alert"}`);
        } finally {
            setLoading(false);
        }
    }

    return(
        <div className="flex flex-col p-2 max-w-md">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                {alertEdit ? "Update" : "Create"} Alert
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-1.5 border rounded-lg p-2 bg-red-300 text-gray-800">
                <label className="input-label">ID Debt</label>
                <input
                    type="text"
                    placeholder=" "
                    value={alertIdDebt}
                    onChange={(e) => setAlertIdDebt(e.target.value)}
                    className="border rounded-lg p-2 bg-white"
                    required
                />
                <label className="input-label">Date Alert</label>
                <DatePickerComponent dateProp={alertDateAlert} setDateProp={setAlertDateAlert} />
                { alertEdit ?
                    <>
                        <label className="grid grid-cols-[1fr_auto] items-center gap-x-4 w-24">
                            <span className="text-sm truncate">Sent</span>
                            <input
                                type="checkbox"
                                checked={alertSent}
                                onChange={(e) => setAlertSent(e.target.checked)}
                                className="
                                    w-6 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600
                                    after:content-[''] after:top-0.5 after:left-[2px] after:bg-white 
                                    after:border-gray-300 after:rounded-full after:h-5 after:w-5 
                                    after:transition-all peer-checked:after:translate-x-full 
                                    peer-checked:after:border-white
                                "
                            />
                        </label>
                        <label className="grid grid-cols-[1fr_auto] items-center gap-x-4 w-24">
                            <span className="text-sm truncate">Enabled</span>
                            <input
                                type="checkbox"
                                checked={alertEnabled}
                                onChange={(e) => setAlertEnabled(e.target.checked)}
                                className="
                                    w-6 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600
                                    after:content-[''] after:top-0.5 after:left-[2px] after:bg-white 
                                    after:border-gray-300 after:rounded-full after:h-5 after:w-5 
                                    after:transition-all peer-checked:after:translate-x-full 
                                    peer-checked:after:border-white
                                "
                            />
                        </label>
                        <label className="grid grid-cols-[1fr_auto] items-center gap-x-4 w-24">
                            <span className="text-sm truncate">Deleted</span>
                            <input
                                type="checkbox"
                                checked={alertDeleted}
                                onChange={(e) => setAlertDeleted(e.target.checked)}
                                className="
                                    w-6 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600
                                    after:content-[''] after:top-0.5 after:left-[2px] after:bg-white 
                                    after:border-gray-300 after:rounded-full after:h-5 after:w-5 
                                    after:transition-all peer-checked:after:translate-x-full 
                                    peer-checked:after:border-white
                                "
                            />
                        </label>
                    </>
                :
                    <></>   
                
                }
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-gray-500 text-white py-2 m-auto w-30 rounded-lg hover:bg-gray-700 transition cursor-pointer"
                >
                    {alertEdit ? 
                        (loading ? "Updating..." : "Update Alert")
                        :
                        (loading ? "Creating..." : "Create Alert")
                    }
                </button>
            </form>

            {message && (
                <p className="mt-4 text-center text-gray-700 dark:text-gray-200">
                    {message}
                </p>
            )}
        </div>
    )
}