"use client";
import { useState } from "react";
import { postUser, patchUser, deleteUser } from "../lib/api";
import type { NewUser, User } from "../types";

interface ConfirmDeleteProps {
    userDelete?: User;
    setUserDelete?: (user?: User) => void;
    setVisibleConfirmDelete?: (visible: boolean) => void;
}

export default function ConfirmDelete({ userDelete, setUserDelete, setVisibleConfirmDelete }: ConfirmDeleteProps) {
    
    
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
            // console.log("Created user:", response);

            setMessage("User deleted");
            setUserDelete?.(undefined);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch(err: any) {
            console.error("Error creating user:", err);
            setMessage(`X ${err.message || "Failed to create user"}`);
        } finally {
            setVisibleConfirmDelete?.(false);
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col p-2 max-w-md">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                Delete User
            </h2>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-1.5 border rounded-lg p-2 bg-blue-300 text-gray-800">
                <label className="input-label">Email: {userDelete?.email}</label>
                <label className="input-label">Phone: {userDelete?.phone}</label>
                <label className="input-label">Name: {userDelete?.name}</label>
                <label className="input-label">Enabled: {userDelete?.enabled}</label>
                <label className="input-label">Deleted: {userDelete?.deleted}</label>
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-gray-500 text-white py-2 m-auto w-30 rounded-lg hover:bg-gray-700 transition cursor-pointer"
                >
                    Confirm Delete User   
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