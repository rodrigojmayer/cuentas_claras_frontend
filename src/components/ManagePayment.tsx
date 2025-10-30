"use client";
import { useState } from "react";
import { postPayment } from "../lib/api";
import type { NewPayment, Payment } from "../types";

interface ManagePaymentProps {
    paymentEdit?: Payment;
    setVisibleUpdatePayment?: (visible: boolean) => void;
}

export default function ManagePayment({ paymentEdit, setVisibleUpdatePayment }: ManagePaymentProps ) {
    const [paymentIdDebt, setPaymentIdDebt] = useState<string>("");
    const [paymentAmount, setPaymentAmount] = useState<number | null>(null);
    const [paymentDolarGoogle, setPaymentDolarGoogle] = useState<number | null>(null);

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    async function handleSubmit (e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            const newPayment: NewPayment = {
                id_debt: paymentIdDebt,
                amount: paymentAmount,
                dolar_google: paymentDolarGoogle,
            }
            const response = await postPayment(newPayment);
            console.log("Created payment: ", response);
            
            setMessage("Payment created successfully!");
            setPaymentIdDebt("");
            setPaymentAmount(null);
            setPaymentDolarGoogle(null);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            console.error("Error creating payment: ", err);
            setMessage(`X ${err.message || "Failed to create payment"}`);
        } finally {
            setLoading(false);
        }
    }

    return(
        <div className="flex flex-col p-2 max-w-md">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                Create Payment
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 border rounded-lg p-2 bg-yellow-200">
                <input
                    type="text"
                    placeholder="ID Debt"
                    value={paymentIdDebt}
                    onChange={(e) => setPaymentIdDebt(e.target.value)}
                    className="border rounded-lg p-2 bg-white text-gray-800"
                    required
                />
                <input
                    type="number"
                    placeholder="Amount"
                    value={paymentAmount ?? ""}
                    onChange={(e) => setPaymentAmount(e.target.value === "" ? null : Number(e.target.value))}
                    className="border rounded-lg p-2 bg-white text-gray-800"
                    required
                />
                <input
                    type="number"
                    placeholder="Dolar Google"
                    value={paymentDolarGoogle ?? ""}
                    onChange={(e) => setPaymentDolarGoogle(e.target.value === "" ? null : Number(e.target.value))}
                    className="border rounded-lg p-2 bg-white text-gray-800"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-gray-500 text-white py-2 m-auto w-30 rounded-lg hover:bg-gray-700 transition cursor-pointer"
                >
                    {loading ? "Creating..." : "Create Payment"}    
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