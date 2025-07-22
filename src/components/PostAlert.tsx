"use client";
import { useState } from "react";
import { postAlert } from "../lib/api";
import type { NewAlert } from "../types";

export default function PostAlert() {
    const [alertIdDebt, setAlertIdDebt] = useState<string>("");
    const [alertDateAlert, setAlertDateAlert] = useState<Date | null>(null);
    
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    async function handleSubmit (e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            const newAlert: NewAlert = {
                id_debt: alertIdDebt,
                date_alert: alertDateAlert,
            }
            const response = await postAlert(newAlert);
            console.log("Created alert: ", response);

            setMessage("Alert created successfully");
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
                Create Alert
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 border rounded-lg p-2 bg-red-300">
                <input
                    type="text"
                    placeholder="ID Debt"
                    value={alertIdDebt}
                    onChange={(e) => setAlertIdDebt(e.target.value)}
                    className="border rounded-lg p-2 bg-white text-gray-800"
                    required
                />
                <input
                    type="date"
                    placeholder="Date Alert"
                    value={alertDateAlert ? alertDateAlert.toISOString().slice(0, 10) : ""}
                    onChange={(e) => setAlertDateAlert(e.target.value ? new Date(e.target.value) : null)}
                    className="border rounded-lg p-2 bg-white text-gray-800"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-gray-500 text-white py-2 m-auto w-30 rounded-lg hover:bg-gray-700 transition"
                >
                    {loading ? "Creating..." : "Create Alert"}
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