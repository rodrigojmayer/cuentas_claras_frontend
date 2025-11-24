/* eslint-disable @typescript-eslint/no-explicit-any */
export interface UpdateDataProps {
    state: boolean,
    data: string
}
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

// export interface Debt {
//     _id: string;
//     id_user_creditor: string;
//     id_user_debtor: string;
//     date_debt: date;
//     detail?: string;
//     amount: number | null;
//     dolar_google?: number | null;
//     status: string;
//     date_due?: date;
//     currency: string;
//     enabled: boolean;
//     deleted: boolean;
//     payments?: Payment[];
//     alerts?: Alert[];
// }

export interface Debt {
    _id: string;
    id_user_creditor: string;   // always an ID
    user_creditor?: User;       // populated user (optional)
    id_user_debtor:  string;
    user_debtor?: User;  
    date_debt: date;
    detail?: string;
    amount: number | null;
    dolar_google?: number | null;
    status: string;
    date_due?: date;
    alert_enabled: boolean;
    alerted: boolean;
    currency: string;
    enabled: boolean;
    deleted: boolean;
    payments?: Payment[];
    alerts?: Alert[];
}

export interface NewDebt {
    id_user_creditor: string;
    id_user_debtor: string;
    detail?: string;
    amount: number | null;
    dolar_google?: number | null;
    status?: string;
    date_due?: date;
    alert_enabled?: boolean;
    alerted?: boolean;
    currency: string;
    email_debtor?: string;
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
    nameUser?: string | null
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
}





export interface Data {
    _id: string;
    gestion: string;
    nombre: string;
    vencimiento: string;
    pendiente: string;
    [key?: string]: any;
    id_user?: string;
}

export interface DataTable {
  data: Data[] 
}
export interface DataTableSubCategory {
  data: CategoriesSubData[] 
  columns: ColumnDataAdministrator[]
  // openUpdateAmountStock: (id_prod: Number, name_prod: String, amount_prod: Number) => void
  // openUpdateAmountStock: (newData: ProductUpdateData) => void
  openSubCategoryUpdate: (newData: CategoriesSubData) => void
//   handleDisabledUpdateButton: (newData: boolean) => void
}

export interface ColumnData {
  id: number;
  dataKey: string;
  label: string;
  numeric?: boolean;
  width: number;
  id_client?: number;
  deleted: boolean;
  [key: string]: any;
  dolar_google?: number | null;
}

export interface Contacts {
    id_user?: string;
    email?: string;
    phone?: string;
}
