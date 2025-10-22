"use client";
import { useState } from "react";
import { postUser } from "../lib/api";
import type { NewUser } from "../types";

export default function ManageUser() {
    const [userEmail, setUserEmail] = useState<string>("");
    const [userPhone, setUserPhone] = useState<string>("");
    const [userName, setUserName] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault(); // prevent full page reload
        setLoading(true);
        setMessage(null);

        try {
            const newUser: NewUser = {
                email: userEmail,
                phone: userPhone,
                name: userName,
            };

            const response = await postUser(newUser);
            console.log("Created user:", response);

            setMessage("User created successfully!");
            setUserEmail("");
            setUserPhone("");
            setUserName("");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch(err: any) {
            console.error("Error creating user:", err);
            setMessage(`X ${err.message || "Failed to create user"}`);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col p-2 max-w-md">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                Create User
            </h2>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 border rounded-lg p-2 bg-blue-300">
                <input 
                    type="email"
                    placeholder="Email*"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="border rounded-lg p-2 bg-white text-gray-800"
                    required
                />
                <input
                    type="text"
                    placeholder="Phone"
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    className="border rounded-lg p-2 bg-white text-gray-800"
                />
                <input
                    type="text"
                    placeholder="Name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="border rounded-lg p-2 bg-white text-gray-800"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-gray-500 text-white py-2 m-auto w-30 rounded-lg hover:bg-gray-700 transition"
                >
                    {loading ? "Creating..." : "Create User"}
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