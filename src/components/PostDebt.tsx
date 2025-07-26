"use client";
import { useState } from "react";
import { postDebt } from "../lib/api";
import type { NewDebt } from "../types";

export default function PostDebt() {
    const [debtIdUserCreditor, setDebtIdUserCreditor] = useState<string>("");
    const [debtIdUserDebtor, setDebtIdUserDebtor] = useState<string>("");
    // const [debtDateDebt, setDebtDateDebt] = useState<date | null>(null);
    const [debtDetail, setDebtDetail] = useState<string>("");
    const [debtAmount, setDebtAmount] = useState<number | null>(null);
    const [debtDolarGoogle, setDebtDolarGoogle] = useState<number | null>(null);
    const [debtStatus, setDebtStatus] = useState<string>("open");
    const [debtDateDue, setDebtDateDue] = useState<Date | null>(null);
    const [debtCurrency, setDebtCurrency] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        try {
            const newDebt: NewDebt = {
                id_user_creditor: debtIdUserCreditor,
                id_user_debtor: debtIdUserDebtor,
                detail: debtDetail,
                amount: debtAmount,
                dolar_google: debtDolarGoogle,
                status: debtStatus,
                date_due: debtDateDue,
                currency: debtCurrency 
            }
            const response = await postDebt(newDebt);
            console.log("Created debt: ", response);

            setMessage("Debt created successfully!");
            setDebtIdUserCreditor("");
            setDebtIdUserDebtor("");
            setDebtDetail("");
            setDebtAmount(null);
            setDebtDolarGoogle(null);
            setDebtStatus("");
            setDebtDateDue(null);
            setDebtCurrency("");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            console.error("Error creating debt:", err);
            setMessage(`X ${err.message || "Failed to create debt"}`);
        } finally {
            setLoading(false);
        }

    }

    return (
        <div className="flex flex-col p-2 max-w-md">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                Create Debt
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 border rounded-lg p-2 bg-green-300">
                <input
                    type="text"
                    placeholder="ID Creditor*"
                    value={debtIdUserCreditor}
                    onChange={(e) => setDebtIdUserCreditor(e.target.value)}
                    className="border rounded-lg p-2 bg-white text-gray-800"
                    required
                />
                <input 
                    type="text" 
                    placeholder="ID Debtor*"
                    value={debtIdUserDebtor}
                    onChange={(e) => setDebtIdUserDebtor(e.target.value)}
                    className="border rounded-lg p-2 bg-white text-gray-800"
                    required    
                />
                <input
                    type="text"
                    placeholder="Detail"
                    value={debtDetail}
                    onChange={(e) => setDebtDetail(e.target.value)}
                    className="border rounded-lg p-2 bg-white text-gray-800"
                />
                <input
                    type="number"
                    placeholder="Amount*"
                    value={debtAmount ?? ""}
                    onChange={(e) => setDebtAmount(e.target.value === "" ? null : Number(e.target.value))}
                    className="border rounded-lg p-2 bg-white text-gray-800"  
                />
                <input
                    type="number"
                    placeholder="Dolar Google"
                    value={debtDolarGoogle ?? ""}
                    onChange={(e) => setDebtDolarGoogle(e.target.value === "" ? null : Number(e.target.value))}
                    className="border rounded-lg p-2 bg-white text-gray-800"
                />
                {/* <input
                    type="select"
                    placeholder="Status*"
                    // value={debtStatus}
                    onChange={(e) => setDebtStatus(e.target.value)}
                    className="border rounded-lg p-2 bg-white text-gray-800"
                /> */}
                <select 
                    name="status"
                    value={debtStatus} 
                    onChange={(e) => setDebtStatus(e.target.value)}
                    className="border rounded-lg p-2 bg-white text-gray-800 cursor-pointer"
                    required
                >
                    <option value="open">Open</option>
                    <option value="closed">Closed</option>
                    <option value="overdue">Overdue</option>
                </select>
                <input
                    type="date"
                    placeholder="Date Due"
                    value={debtDateDue ? debtDateDue.toISOString().slice(0, 10) : ""}
                    onChange={(e) => setDebtDateDue(e.target.value ? new Date(e.target.value) : null)}
                    className="border rounded-lg p-2 bg-white text-gray-800"
                />
                <input
                    type="text"
                    placeholder="Currency"
                    value={debtCurrency}
                    onChange={(e) => setDebtCurrency(e.target.value)}
                    className="border rounded-lg p-2 bg-white text-gray-800"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-gray-500 text-white py-2 m-auto w-30 rounded-lg hover:bg-gray-700 transition"
                >
                    {loading ? "Creating..." : "Create Debt"}
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