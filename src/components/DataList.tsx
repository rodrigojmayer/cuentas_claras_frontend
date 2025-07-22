"use client";
import { useEffect, useState } from "react";
import { getAlerts, getDebts, getPayments, getUsers, getDebtsByCreditor, getDebtsByDebtor } from "../lib/api";
import type { Alert, Debt, Payment, User } from "../types";

export default function DataList() {
    const [alerts, setAlerts] = useState<Alert[]>([]);
    const [debts, setDebts] = useState<Debt[]>([]);
    const [payments, setPayments] = useState<Payment[]>([]);
    const [users, setUsers] = useState<User[]>([]);

    const [userSelected, setUserSelected] = useState<User | null>(null);
    const [debtsByCreditor, setDebtsByCreditor] = useState<Debt[]>([]);
    const [debtsByDebtor, setDebtsByDebtor] = useState<Debt[]>([]);

    const selectUser = (id: string) =>{
        const user = users.filter(u => {
            if(u._id===id) return u
        })
        setUserSelected(user[0])
    }
    useEffect(() => {
        getAlerts().then(setAlerts);
        getDebts().then(setDebts);
        getPayments().then(setPayments);
        getUsers().then(setUsers);
    }, []);
    useEffect(() => {
        if(userSelected){
            getDebtsByCreditor(userSelected._id).then(setDebtsByCreditor);
            getDebtsByDebtor(userSelected._id).then(setDebtsByDebtor);
        }
    }, [userSelected]);

    return (
        <div className="flex flex-row">
            <div className="p-2">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                    Users
                </h2>
                <ul className="space-y-2">
                    {users.map((u: User) => (
                        <li 
                            key={u._id} 
                            className="p-3 bg-blue-300 rounded-lg shadow"
                            onClick={() => selectUser(u._id)}    
                        >
                            <p>ID: {u._id}</p>
                            <p>Email: {u.email}</p>
                            <p>Phone: {u.phone}</p>
                            <p>Name: {u.name}</p>
                        </li>
                    ))}
                </ul>
                <h2 className="text-3xl mt-5 font-bold text-gray-800 dark:text-gray-100 mb-4">
                    Debts
                </h2>
                <ul className="space-y-2">
                    {debts.map((d: Debt) => (
                        <li key={d._id} className="p-3 bg-green-300 rounded-lg shadow">
                            <p>ID: {d._id}</p>
                            <p>Detail: {d.detail}</p>
                            <p>Amount: ${d.amount}</p>
                            <p>Date: {new Date(d.date_debt).toLocaleDateString("es-ES")}</p>
                        </li>
                    ))}
                </ul>
                <h2 className="text-3xl mt-5 font-bold text-gray-800 dark:text-gray-100 mb-4">
                    Payments
                </h2>
                <ul className="space-y-2">
                    {payments.map((p: Payment) => (
                        <li key={p._id} className="p-3 bg-yellow-200 rounded-lg shadow">
                            <p>Amount: ${p.amount}</p>
                            <p>Date: {new Date(p.date_payment).toLocaleDateString("es-ES")}</p>
                        </li>
                    ))}
                </ul>
                <h2 className="text-3xl mt-5 font-bold text-gray-100 dark:text-gray-100 mb-4">
                    Alerts
                </h2>
                <ul className="space-y-2">
                    {alerts.map((a: Alert) => (
                        <li key={a._id} className="p-3 bg-red-300 rounded-lg shadow">
                            <p>Date: {new Date(a.date_alert).toLocaleDateString("es-ES")}</p>
                            <p>Sent: {a.sent ? "Si":"No"}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="p-2">

                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                    User data selected
                </h2>
                { userSelected &&
                    <ul className="space-y-2">
                        <li className="p-3 bg-blue-300 rounded-lg shadow">
                            <p>Email: {userSelected.email}</p>
                            <p>Phone: {userSelected.phone}</p>
                            <p>Name: {userSelected.name}</p>
                        </li>
                    </ul>
                }
                
                <h2 className="text-3xl mt-5 font-bold text-gray-800 dark:text-gray-100 mb-4">
                    Debts as creditor
                </h2>
                {debtsByCreditor.length === 0 ? 
                    <p>No debts</p>
                : 
                    <ul className="space-y-2">
                        {debtsByCreditor.map((d: Debt) => (
                            <li key={d._id} className="p-3 bg-green-300 rounded-lg shadow">
                                <p>Detail: {d.detail}</p>
                                <p>Amount: ${d.amount}</p>
                                <h3 className="text-3xl mt-3 font-bold text-gray-800 dark:text-gray-500 mb-4">
                                    Payments
                                </h3>
                                {d.payments.length === 0 ? 
                                    <p>No payments</p>
                                :
                                    <ul className="space-y-2">
                                        {d.payments.map((p: Payment) => (
                                            <li key={p._id} className="p-3 bg-yellow-200 rounded-lg shadow">
                                                <p>Amount: {p.amount}</p>
                                                <p>Date: {new Date(p.date_payment).toLocaleDateString("es-ES")}</p>
                                            </li>
                                        ))}
                                    </ul>
                                }
                                <h3 className="text-3xl mt-3 font-bold text-gray-800 dark:text-gray-500 mb-4">
                                    Alerts
                                </h3>
                                {d.alerts.length === 0 ? 
                                    <p className="text-gray-800 dark:text-gray-900">
                                        No alerts
                                    </p>
                                :
                                    <ul className="space-y-2">
                                        {d.alerts.map((a: Alert) => (
                                            <li key={a._id} className="p-3 bg-red-300 rounded-lg shadow">
                                                <p>Date: {new Date(a.date_alert).toLocaleDateString("es-ES")}</p>
                                                <p>Sent: {a.sent ? "Si":"No"}</p>
                                            </li>
                                        ))}
                                    </ul>
                                }
                            </li>
                        ))}
                    </ul>
                }
                <h2 className="text-3xl mt-5 font-bold text-gray-800 dark:text-gray-100 mb-4">
                    Debts as debtor
                </h2>
                {debtsByDebtor.length === 0 ? 
                    <p>No debts</p>
                : 
                    <ul className="space-y-2">
                        {debtsByDebtor.map((d: Debt) => (
                            <li key={d._id} className="p-3 bg-green-300 rounded-lg shadow">
                                <p>Detail: {d.detail}</p>
                                <p>Amount: ${d.amount}</p>
                                <h3 className="text-3xl mt-3 font-bold text-gray-800 dark:text-gray-500 mb-4">
                                    Payments
                                </h3>
                                {d.payments.length === 0 ? 
                                    <p>No payments</p>
                                :
                                    <ul className="space-y-2">
                                        {d.payments.map((p: Payment) => (
                                            <li key={p._id} className="p-3 bg-yellow-200 rounded-lg shadow">
                                                <p>Amount: {p.amount}</p>
                                                <p>Date: {new Date(p.date_payment).toLocaleDateString("es-ES")}</p>
                                            </li>
                                        ))}
                                    </ul>
                                }
                                <h3 className="text-3xl mt-3 font-bold text-gray-800 dark:text-gray-500 mb-4">
                                    Alerts
                                </h3>
                                {d.alerts.length === 0 ? 
                                    <p>No alerts</p>
                                :
                                    <ul className="space-y-2">
                                        {d.alerts.map((a: Alert) => (
                                            <li key={a._id} className="p-3 bg-red-300 rounded-lg shadow">
                                                <p>Date: {new Date(a.date_alert).toLocaleDateString("es-ES")}</p>
                                                <p>Sent: {a.sent ? "Si":"No"}</p>
                                            </li>
                                        ))}
                                    </ul>
                                }
                            </li>
                        ))}
                    </ul>
                }
            </div>
        </div>
    )
}