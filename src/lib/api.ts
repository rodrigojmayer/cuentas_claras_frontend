import { NewUser, NewDebt, NewPayment } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:7000/api";

export async function getUsers() {
    const res = await fetch(`${API_URL}/users`);
    return res.json();
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
                name
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
    } catch (error) {
        console.error("Network error posting payment: ", error);
        throw new Error("Unable to reach server");
    }
}