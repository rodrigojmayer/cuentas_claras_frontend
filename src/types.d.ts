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
    payments?: Payment[];
    alerts?: Alert[];
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
}





export interface Data {
  _id: string;
  id?: number;
  id_client: number;
  product: string;
  amount: number ;
  measure: string;
  category: string;
  sub_category: string;
  [key?: string]: any;
  custom_fields?: array;
  id_custom_field_product?: number;
  code?: string;
  price?: number | string;
  description?: string;
  url_image?: string;
  alert_amount?: number ;
  alert_amount_enabled?: boolean;
  alerted_amount?: boolean;
  alert_date?: Date | string;
  alert_date_enabled?: boolean;
  alerted_date?: boolean;
}

export interface DataTable {
  data: Data[] 
  columns: ColumnData[]
  // openUpdateAmountStock: (id_prod: Number, name_prod: String, amount_prod: Number) => void
  // openUpdateAmountStock: (newData: ProductUpdateData) => void
  openUpdateAmountStock: (newData: Data) => void
//   handleDisabledUpdateButton: (newData: boolean) => void
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
}


