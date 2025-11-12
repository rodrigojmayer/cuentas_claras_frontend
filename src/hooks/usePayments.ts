import useSWR from "swr";
import { getPayments } from "@/lib/api";
import type { Payment } from "@/types";

export default function usePayments() {
    const { data, error, isLoading, mutate } = useSWR<Payment[]>("/payments", getPayments);
    
    return {
        payments: data ?? [],
        isLoadingPayments: isLoading,
        isErrorPayments: error,
        mutatePayments: mutate,
    };
}