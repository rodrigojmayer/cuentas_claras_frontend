export interface User {
    _id: string;
    email: string;
    phone?: string;
    name?: string;
    enabled: boolean;
    deleted: boolean;
}
export interface NewUser {
    email: string;
    phone?: string;
    name?: string;
}

export interface Debt {
    _id: string;
    id_user_creditor: string;
    id_user_debtor: string;
    date_debt: date;
    detail?: string;
    amount: number | null;
    dolar_google?: number | null;
    status: string;
    date_due?: date;
    currency: string;
    enabled: boolean;
    deleted: boolean;
    payments: Payment[];
    alerts: Alert[];
}

export interface NewDebt {
    id_user_creditor: string;
    id_user_debtor: string;
    detail?: string;
    amount: number | null;
    dolar_google?: number | null;
    status: string;
    date_due?: date;
    currency: string;
}

export interface Payment {
    _id: string;
    id_debt: string;
    amount: number | null;
    date_payment: date;
    dolar_google?: number | null;
    enabled: boolean;
    deleted: boolean;
}

export interface NewPayment {
    id_debt: string;
    amount: number | null;
    dolar_google?: number | null;
}

export interface Alert {
    _id: string;
    id_debt: string;
    date_alert: date;
    sent: boolean;
    enabled: boolean;
    deleted: boolean;
}

export interface NewAlert {
    id_debt: string;
    date_alert: date;
    sent: boolean;
}