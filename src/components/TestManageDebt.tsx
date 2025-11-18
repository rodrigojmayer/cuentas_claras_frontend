"use client";
import { useState } from "react";
import { patchDebt, postDebt } from "../lib/api";
import type { Debt, NewDebt, UpdateDataProps, User } from "../types";
import DatePickerComponent from "./DatePickerComponent";

interface TestManageDebtProps {
    setUpdateData: (visible: UpdateDataProps) => void;
    debtEdit?: Debt;
    setVisibleUpdateDebt?: (visible: boolean) => void;
}
export default function TestManageDebt({ setUpdateData, debtEdit, setVisibleUpdateDebt }: TestManageDebtProps) {
    const getInitialCreditorId = (debt?: Debt): string => {
        if (!debt) return "";
        const id = debt.id_user_creditor;
        if (typeof id === "string") return id;
        return (id as User)?._id ?? "";
    };
    const getInitialDebtorId = (debt?: Debt): string => {
        if (!debt) return "";
        const id = debt.id_user_debtor;
        if (typeof id === "string") return id;
        return (id as User)?._id ?? "";
    }
    const [debtIdUserCreditor, setDebtIdUserCreditor] = useState<string>(getInitialCreditorId(debtEdit));
    const [debtIdUserDebtor, setDebtIdUserDebtor] = useState<string>(getInitialDebtorId(debtEdit));
    const [debtDateDebt, setDebtDateDebt] = useState<Date | null>(debtEdit ? new Date(debtEdit.date_debt) : null);
    const [debtDetail, setDebtDetail] = useState<string | undefined>(debtEdit ? debtEdit.detail : "");
    const [debtAmount, setDebtAmount] = useState<number | null>(debtEdit ? debtEdit.amount : null);
    const [debtDolarGoogle, setDebtDolarGoogle] = useState<number | null | undefined>(debtEdit ? debtEdit.dolar_google : null);
    const [debtStatus, setDebtStatus] = useState<string>(debtEdit ? debtEdit.status : "open");
    const [debtDateDue, setDebtDateDue] = useState<Date | null>(debtEdit ? new Date(debtEdit.date_due) : null);
    const [debtAlertEnabled, setDebtAlertEnabled] = useState<boolean>(debtEdit ? debtEdit.alert_enabled : true);
    const [debtAlerted, setDebtAlerted] = useState<boolean>(debtEdit ? debtEdit.alerted : false);
    const [debtCurrency, setDebtCurrency] = useState<string>(debtEdit ? debtEdit.currency : "ARS");
    const [debtEnabled, setDebtEnabled] = useState<boolean>(debtEdit ? debtEdit.enabled : true);
    const [debtDeleted, setDebtDeleted] = useState<boolean>(debtEdit ? debtEdit.deleted : false);

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        try {
            if(debtEdit) {
                const updateDebt: Debt = {
                    _id: debtEdit._id,
                    id_user_creditor: debtIdUserCreditor,
                    id_user_debtor: debtIdUserDebtor,
                    date_debt: debtDateDebt,
                    detail: debtDetail,
                    amount: debtAmount,
                    dolar_google: debtDolarGoogle,
                    status: debtStatus,
                    date_due: debtDateDue,
                    alert_enabled: debtAlertEnabled,
                    alerted: debtAlerted,
                    currency: debtCurrency,
                    enabled: debtEnabled,
                    deleted: debtDeleted
                };
                await patchDebt(updateDebt);
                setVisibleUpdateDebt?.(false);
            } else {
                const newDebt: NewDebt = {
                    id_user_creditor: debtIdUserCreditor,
                    id_user_debtor: debtIdUserDebtor,
                    detail: debtDetail,
                    amount: debtAmount,
                    dolar_google: debtDolarGoogle,
                    status: debtStatus,
                    date_due: debtDateDue,
                    alert_enabled: debtAlertEnabled,
                    alerted: debtAlerted,
                    currency: debtCurrency 
                }
                await postDebt(newDebt);
            }

            setMessage(`Debt ${debtEdit ? "edited" : "created"} successfully!`);
            setDebtIdUserCreditor("");
            setDebtIdUserDebtor("");
            setDebtDetail("");
            setDebtAmount(null);
            setDebtDolarGoogle(null);
            setDebtStatus("open");
            setDebtDateDue(null);
            setDebtCurrency("ARS");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            console.error("Error creating debt:", err);
            setMessage(`X ${err.message || "Failed to create debt"}`);
        } finally {
            setLoading(false);
            setUpdateData({state: true, data: "debts"})
        }

    }

    return (
        <div className="flex flex-col p-2 max-w-md">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                {debtEdit ? "Update" : "Create" } Debt
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-1.5 border rounded-lg p-2 bg-green-300 text-gray-800">
                <label className="input-label">ID Creditor*</label>
                <input
                    type="text"
                    placeholder=" "
                    value={debtIdUserCreditor}
                    onChange={(e) => setDebtIdUserCreditor(e.target.value)}
                    className="border rounded-lg p-2 bg-white"
                    required
                />
                <label className="input-label">ID Debtor*</label>
                <input 
                    type="text" 
                    placeholder=" "
                    value={debtIdUserDebtor}
                    onChange={(e) => setDebtIdUserDebtor(e.target.value)}
                    className="border rounded-lg p-2 bg-white"
                    required    
                />
                <label className="input-label">Detail</label>
                <input
                    type="text"
                    placeholder=" "
                    value={debtDetail}
                    onChange={(e) => setDebtDetail(e.target.value)}
                    className="border rounded-lg p-2 bg-white"
                />
                <label className="input-label">Amount*</label>
                <input
                    type="number"
                    placeholder=" "
                    value={debtAmount ?? ""}
                    onChange={(e) => setDebtAmount(e.target.value === "" ? null : Number(e.target.value))}
                    className="border rounded-lg p-2 bg-white"  
                />
                <label className="input-label">Dolar Google</label>
                <input
                    type="number"
                    placeholder=" "
                    value={debtDolarGoogle ?? ""}
                    onChange={(e) => setDebtDolarGoogle(e.target.value === "" ? null : Number(e.target.value))}
                    className="border rounded-lg p-2 bg-white"
                />
                <label className="input-label">Status</label>
                <select 
                    name="status"
                    value={debtStatus} 
                    onChange={(e) => setDebtStatus(e.target.value)}
                    className="border rounded-lg p-2 bg-white cursor-pointer"
                    required
                >
                    <option value="open">Open</option>
                    <option value="closed">Closed</option>
                    <option value="overdue">Overdue</option>
                </select>
                {debtEdit ? 
                    <>
                        <label className="input-label">Date Debt</label>    
                        <DatePickerComponent dateProp={debtDateDebt} setDateProp={setDebtDateDebt} />
                    </>
                : 
                    <></>
                }
                <label className="input-label">Date Due</label>
                <DatePickerComponent dateProp={debtDateDue} setDateProp={setDebtDateDue} />
                <label className="input-label">Currency</label>
                <select 
                    name="currency"
                    value={debtCurrency} 
                    onChange={(e) => setDebtCurrency(e.target.value)}
                    className="border rounded-lg p-2 bg-white cursor-pointer"
                    required
                >
                    <option value="ARS">ARS</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                </select>
                
                {debtEdit ? 
                    <>
                        <label className="grid grid-cols-[1fr_auto] items-center gap-x-4 w-32">
                            <span className="text-sm truncate">Alert Enabled</span>
                            <input
                                type="checkbox"
                                checked={debtAlertEnabled}
                                onChange={(e) => setDebtAlertEnabled(e.target.checked)}
                                className="
                                    w-6 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600
                                    after:content-[''] after:top-0.5 after:left-[2px] after:bg-white 
                                    after:border-gray-300 after:rounded-full after:h-5 after:w-5 
                                    after:transition-all peer-checked:after:translate-x-full 
                                    peer-checked:after:border-white
                                "
                            />
                        </label>
                        <label className="grid grid-cols-[1fr_auto] items-center gap-x-4 w-26">
                            <span className="text-sm truncate">Alerted</span>
                            <input
                                type="checkbox"
                                checked={debtAlerted}
                                onChange={(e) => setDebtAlerted(e.target.checked)}
                                className="
                                    w-6 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600
                                    after:content-[''] after:top-0.5 after:left-[2px] after:bg-white 
                                    after:border-gray-300 after:rounded-full after:h-5 after:w-5 
                                    after:transition-all peer-checked:after:translate-x-full 
                                    peer-checked:after:border-white
                                "
                            />
                        </label>
                        <label className="grid grid-cols-[1fr_auto] items-center gap-x-4 w-26">
                            <span className="text-sm truncate">Enabled</span>
                            <input
                                type="checkbox"
                                checked={debtEnabled}
                                onChange={(e) => setDebtEnabled(e.target.checked)}
                                className="
                                    w-6 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600
                                    after:content-[''] after:top-0.5 after:left-[2px] after:bg-white 
                                    after:border-gray-300 after:rounded-full after:h-5 after:w-5 
                                    after:transition-all peer-checked:after:translate-x-full 
                                    peer-checked:after:border-white
                                "
                            />
                        </label>
                        <label className="grid grid-cols-[1fr_auto] items-center gap-x-4 w-26">
                            <span className="text-sm truncate">Deleted</span>
                            <input
                                type="checkbox"
                                checked={debtDeleted}
                                onChange={(e) => setDebtDeleted(e.target.checked)}
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
                    {debtEdit ? 
                        (loading ? "Updating..." : "Update Debt")
                        :
                        (loading ? "Creating..." : "Create Debt")
                        
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