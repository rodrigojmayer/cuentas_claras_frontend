"use client";
import { useEffect, useState } from "react";
import { patchPayment, postPayment } from "../lib/api";
import type { NewPayment, Payment, UpdateDataProps } from "../types";
import DatePickerComponent from "./DatePickerComponent";

interface TestManagePaymentProps {
    setUpdateData: (visible: UpdateDataProps) => void;
    paymentEdit?: Payment;
    setVisibleUpdatePayment?: (visible: boolean) => void;
}

export default function TestManagePayment({ setUpdateData, paymentEdit, setVisibleUpdatePayment }: TestManagePaymentProps ) {
    const [paymentIdDebt, setPaymentIdDebt] = useState<string>(paymentEdit ? paymentEdit.id_debt : "");
    const [paymentAmount, setPaymentAmount] = useState<number | null>(paymentEdit ? paymentEdit.amount : null);
    const [paymentDatePayment, setPaymentDatePayment] = useState<Date | null>(paymentEdit ? new Date(paymentEdit.date_payment) : null);
    const [paymentDolarGoogle, setPaymentDolarGoogle] = useState<number | null | undefined>(paymentEdit ? paymentEdit.dolar_google : null);
    const [paymentEnabled, setPaymentEnabled] = useState<boolean>(paymentEdit ? paymentEdit.enabled : true);
    const [paymentDeleted, setPaymentDeleted] = useState<boolean>(paymentEdit ? paymentEdit.deleted : false);

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    async function handleSubmit (e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            if(paymentEdit) {
                const updatePayment: Payment = {
                    _id: paymentEdit._id,
                    id_debt: paymentIdDebt,
                    amount: paymentAmount,
                    date_payment: paymentDatePayment,
                    dolar_google: paymentDolarGoogle,
                    enabled: paymentEnabled,
                    deleted: paymentDeleted,
                }
                await patchPayment(updatePayment);
                setVisibleUpdatePayment?.(false);
            } else {
                const newPayment: NewPayment = {
                    id_debt: paymentIdDebt,
                    amount: paymentAmount,
                    dolar_google: paymentDolarGoogle,
                }
                await postPayment(newPayment);
            }
            
            
            setMessage(`Payment ${paymentEdit ? "edited" : "created" } successfully!`);
            setPaymentIdDebt("");
            setPaymentAmount(null);
            setPaymentDolarGoogle(null);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            console.error("Error creating payment: ", err);
            setMessage(`X ${err.message || "Failed to create payment"}`);
        } finally {
            setLoading(false);
            setUpdateData({state: true, data: "payments"});
        }
    }

    

  useEffect(() => {
    if(paymentEdit?.amount){
      setPaymentAmount(paymentEdit.amount)
    }
  }, [paymentEdit]);
    return(
        <div className="flex flex-col p-2 max-w-md">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                {paymentEdit ? "Update" : "Create" } Payment
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-1.5 border rounded-lg p-2 bg-yellow-200 text-gray-800 ">
                <label className="input-label">ID Debt</label>
                <input
                    type="text"
                    placeholder=" "
                    value={paymentIdDebt}
                    onChange={(e) => setPaymentIdDebt(e.target.value)}
                    className="border rounded-lg p-2 bg-white"
                    required
                />
                <label className="input-label">Amount</label>
                <input
                    type="number"
                    placeholder=" "
                    value={paymentAmount ?? ""}
                    onChange={(e) => setPaymentAmount(e.target.value === "" ? null : Number(e.target.value))}
                    className="border rounded-lg p-2 bg-white"
                    required
                />
                {paymentEdit ?
                    <>
                        <label className="input-label">Date Payment</label>
                        <DatePickerComponent dateProp={paymentDatePayment} setDateProp={setPaymentDatePayment} />
                    </>
                :
                    <></>
                }
                <label className="input-label">Dolar Google</label>
                <input
                    type="number"
                    placeholder=" "
                    value={paymentDolarGoogle ?? ""}
                    onChange={(e) => setPaymentDolarGoogle(e.target.value === "" ? null : Number(e.target.value))}
                    className="border rounded-lg p-2 bg-white"
                />
                {paymentEdit ?
                    <>
                       <label className="grid grid-cols-[1fr_auto] items-center gap-x-4 w-24">
                            <span className="text-sm truncate">Enabled</span>
                            <input
                                type="checkbox"
                                checked={paymentEnabled}
                                onChange={(e) => setPaymentEnabled(e.target.checked)}
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
                                checked={paymentDeleted}
                                onChange={(e) => setPaymentDeleted(e.target.checked)}
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
                    {   paymentEdit ?
                        (loading ? "Updating..." : "Update Payment")
                    :
                        (loading ? "Creating..." : "Create Payment")
                    
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