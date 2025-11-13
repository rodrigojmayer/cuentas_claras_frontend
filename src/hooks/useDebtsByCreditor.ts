import useSWR from "swr";
import { getDebtsByCreditor } from "@/lib/api";
import type { Debt } from "@/types";

export default function useDebtsByCreditor() {
    const creditorId = "68e5b887cfb837d89f00be9f";
    const { data, error, isLoading, mutate } = useSWR<Debt[]>(creditorId ? `debts/creditor/${creditorId}` : null,
    () => getDebtsByCreditor(creditorId));

    return {
        debtsByCreditor: data ?? [],
        isLoadingDebtsByCreditor: isLoading,
        isErrorDebtsByCreditor: error,
        mutateDebtsByCreditor: mutate,
    };
}