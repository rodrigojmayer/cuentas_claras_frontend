import { NewUser, NewDebt, NewPayment, NewAlert, User, Alert, Debt, Payment } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:7000/api";

export async function getUsers() {
    const res = await fetch(`${API_URL}/users`);
    return res.json();
}

export async function findUserByEmail(email: string) {
    const res = await fetch(`${API_URL}/users/find-by-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
    });
    return res;
}

export async function getDebts() {
    const res = await fetch(`${API_URL}/debts`);
    return res.json();
}

export async function getPayments() {
    const res = await fetch(`${API_URL}/payments`);
    return res.json();
}

export async function getAlerts() {
    const res = await fetch(`${API_URL}/alerts`);
    return res.json();
}

export async function getDebtsByCreditor(_id: string ) {
    const res = await fetch(`${API_URL}/debts/creditor/${_id}`)
    
    if(!res.ok) {
        // Try to read the message if the server sent one
        const errorText = await res.text();
        console.error("Error fetching debts: ", res.status, errorText);

        // Throw a clear error so your component can catch it
        throw new Error(`Failed to fetch debts (status ${res.status})`);
    }
    return res.json();
}

export async function getDebtsByDebtor(_id: string) {
    const res = await fetch(`${API_URL}/debts/debtor/${_id}`);

    if(!res.ok) {
        const errorText = await res.text();
        console.error("Error fetching debts: ", res.status, errorText);

        throw new Error(`Failed to fetch debts (status ${res.status})`);
    }
    return res.json();
}

export async function postUser({email, phone, name}: NewUser) {
    try {

        const res = await fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                phone,
                name,
            })
        });

        if(!res.ok) {
            const errorText = await res.text();
            console.error("Error posting user: ", res.status, errorText);
            throw new Error(`Failed to post user (status ${res.status})`);
        }
        return res.json();
    } catch (error) {
        console.error("Network error posting user: ", error);
        throw new Error("Unable to reach server");
    }
}

export async function postDebt({id_user_creditor, id_user_debtor, detail, amount, dolar_google, status, date_due, currency}: NewDebt) {
    try {
        const res = await fetch(`${API_URL}/debts`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id_user_creditor, 
                id_user_debtor, 
                // date_debt, 
                detail, 
                amount, 
                dolar_google, 
                status, 
                date_due, 
                currency
            })

        })
        if(!res.ok){
            const errorText = await res.text();
            console.error("Error posting debt: ", res.status, errorText);
            throw new Error(`Failed to post debt (status ${res.status})`);
        }
        return res.json();
    } catch (error) {
        console.error("Network error posting debt: ", error);
        throw new Error("Unable to reach server");
    }
}

export async function postPayment({id_debt, amount, dolar_google}: NewPayment) {
    try {
        const res = await fetch(`${API_URL}/payments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id_debt,
                amount,
                dolar_google
            })
        })
        if(!res.ok) {
            const errorText = await res.text();
            console.error("Error posting payment: ", res.status, errorText);
            throw new Error(`Failed to post payment (status ${res.status})`);
        }
        return res.json();
    } catch (error) {
        console.error("Network error posting payment: ", error);
        throw new Error("Unable to reach server");
    }
}

export async function postAlert({id_debt, date_alert}: NewAlert) {
    try {
        const res = await fetch(`${API_URL}/alerts`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id_debt,
                date_alert
            })
            
        })
        if(!res.ok) {
            const errorText = await res.text();
            console.error("Error posting alert: ", res.status, errorText);
            throw new Error(`Failed to post alert (status ${res.status})`);
        }
        return res.json();
    } catch (error) {
        console.error("Network error posting alert: ", error);
        throw new Error("Unable to reach server");
    }
}

export async function patchUser({_id, email, phone, name, enabled, deleted}: User) {
    try {
        const res = await fetch(`${API_URL}/users/${_id}`, {
            method: 'PATCH',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({
                email,
                phone,
                name,
                enabled,
                deleted    
            })
        })
        if(!res.ok) {
            const errorText = await res.text();
            console.error("Error patching user: ", res.status, errorText);
            throw new Error(`Failed to patch user (status ${res.status})`);
        }

        // Return the updated user data (assuming backend sends it back)
        const updatedUser = await res.json();
        return updatedUser;
    } catch (error) {
        console.error("Network error patching user: ", error);
        throw new Error("Unable to reach server");
    }
}

export async function patchDebt({_id, id_user_creditor, id_user_debtor, date_debt, detail, amount, dolar_google, status, date_due,alert_enabled, alerted, currency, enabled, deleted}: Debt) {
    console.log("dolar_google: ", dolar_google);
    try {
        const res = await fetch(`${API_URL}/debts/${_id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id_user_creditor,
                id_user_debtor,
                date_debt,
                detail,
                amount,
                dolar_google,
                status,
                date_due,
                alert_enabled,
                alerted,
                currency,
                enabled,
                deleted
            })
        })
        if(!res.ok) {
            const errorText = await res.text();
            console.error("Error patching debt: ", res.status, errorText);
            throw new Error(`Failed to patch debt (status ${res.status})`);
        }

        const updateDebt = await res.json();
        return updateDebt;
    } catch (error) {
        console.error("Network error patching debt: ", error);
        throw new Error("Unable to reach server");
    }
}

export async function patchPayment({_id, id_debt, amount, date_payment, dolar_google, enabled, deleted }: Payment) {
    try {
        const res = await fetch(`${API_URL}/payments/${_id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({
                id_debt,
                amount,
                date_payment,
                dolar_google,
                enabled,
                deleted
            })
        })
        if(!res.ok) {
            const errorText = await res.text();
            console.error("Error patching payment: ", res.status, errorText);
            throw new Error(`Failed to patch payment (status ${res.status})`);
        }

        const updatePayment = await res.json();
        return updatePayment;
    } catch (error) {
        console.error("Network error patching payment: ", error);
        throw new Error("Unable to reach server");
    }
}

export async function patchAlert({_id, id_debt, date_alert, sent, enabled, deleted }: Alert) {
    try {
        const res = await fetch(`${API_URL}/alerts/${_id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({
                id_debt,
                date_alert,
                sent,
                enabled,
                deleted
            })
        })
        if(!res.ok) {
            const errorText = await res.text();
            console.error("Error patching alert: ", res.status, errorText);
            throw new Error(`Failed to patch alert (status ${res.status})`);
        }

        const updateAlert = await res.json();
        return updateAlert;
    } catch (error) {
        console.error("Network error patching alert: ", error);
        throw new Error("Unable to reach server");
    }
}

export async function deleteUser(_id: string): Promise<void> {
    try {
        const res = await fetch(`${API_URL}/users/${_id}`, {
            method: 'DELETE',
        })
        if(!res.ok) {
            const errorText = await res.text();
            console.error("Error deleting user: ", res.status, errorText);
            throw new Error(`Failed to delete user (status ${res.status})`);
        }

        console.log("User deleted successfully");
    }catch (error) {
        console.error("Network error deleting user: ", error);
        throw new Error("Unable to reach server");
    }
}

export async function deleteDebt(_id: string): Promise<void> {
    try {
        const res = await fetch(`${API_URL}/debts/${_id}`, {
            method: 'DELETE',
        })
        if(!res.ok) {
            const errorText = await res.text();
            console.error("Error deleting debt: ", res.status, errorText);
            throw new Error(`Faailed to delete debt (status ${res.status})`);
        }

        console.log("Debt deleted successfully");
    } catch (error) {
        console.error("Network error deleting debt: ", error);
        throw new Error("Unable to reach server");
    }
}

export async function deletePayment(_id: string): Promise<void> {
    try {
        const res = await fetch(`${API_URL}/payments/${_id}`, {
            method: 'DELETE',
        })
        if(!res.ok) {
            const errorText = await res.text();
            console.error("Error deleting payment: ", res.status, errorText);
            throw new Error(`Faailed to delete payment (status ${res.status})`);
        }

        console.log("Payment deleted successfully");
    } catch (error) {
        console.error("Network error deleting payment: ", error);
        throw new Error("Unable to reach server");
    }
}

export async function deleteAlert(_id: string): Promise<void> {
    try {
        const res = await fetch(`${API_URL}/alerts/${_id}`, {
            method: 'DELETE',
        })
        if(!res.ok) {
            const errorText = await res.text();
            console.error("Error deleting alert: ", res.status, errorText);
            throw new Error(`Faailed to delete alert (status ${res.status})`);
        }

        console.log("Alert deleted successfully");
    } catch (error) {
        console.error("Network error deleting alert: ", error);
        throw new Error("Unable to reach server");
    }
}