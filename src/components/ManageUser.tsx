"use client";
import { useState } from "react";
import { postUser, patchUser } from "../lib/api";
import type { NewUser, User } from "../types";

interface ManageUserProps {
    userEdit?:  User;
    setVisibleUpdateUser?: (visible: boolean) => void;
}

export default function ManageUser({ userEdit, setVisibleUpdateUser }: ManageUserProps) {
    const [userEmail, setUserEmail] = useState<string>(userEdit ? userEdit.email : "");
    const [userPhone, setUserPhone] = useState<string | undefined>(userEdit ? userEdit.phone : "");
    const [userName, setUserName] = useState<string | undefined>(userEdit ? userEdit.name : "");
    const [userEnabled, setUserEnabled] = useState<boolean>(userEdit ? userEdit.enabled : true);
    const [userDeleted, setUserDeleted] = useState<boolean>(userEdit ? userEdit.deleted : false);
    
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault(); // prevent full page reload
        setLoading(true);
        setMessage(null);

        try {
            let response
            if(userEdit) {
                const updateUser: User = {
                    _id: userEdit._id,
                    email: userEmail,
                    phone: userPhone,
                    name: userName,
                    enabled: userEnabled,
                    deleted: userDeleted
                };
                response = await patchUser(updateUser);
                setVisibleUpdateUser?.(false);
            } else {
                const newUser: NewUser = {
                    email: userEmail,
                    phone: userPhone,
                    name: userName,
                };
                response = await postUser(newUser);
            }
            // console.log("Created user:", response);

            setMessage(`User ${userEdit ? "edited" : "created"} successfully!`);
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
                {userEdit ? "Update" : "Create"} User
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
                { userEdit ? 
                    <>
                        <label className="grid grid-cols-[1fr_auto] items-center gap-x-4 w-24">
                            <span className="text-sm text-gray-800 truncate">Enabled</span>
                            <input
                                type="checkbox"
                                checked={userEnabled}
                                onChange={(e) => setUserEnabled(e.target.checked)}
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
                            <span className="text-sm text-gray-800 truncate">Deleted</span>
                            <input
                                type="checkbox"
                                checked={userDeleted}
                                onChange={(e) => setUserDeleted(e.target.checked)}
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
                    {userEdit ? 
                        (loading ? "Updating..." : "Update User")
                        :
                        (loading ? "Creating..." : "Create User")
                    }
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