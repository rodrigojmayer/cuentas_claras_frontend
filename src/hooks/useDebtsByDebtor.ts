import useSWR from "swr";
import { getDebtsByDebtor } from "@/lib/api";
import type { Debt } from "@/types";

export default function useDebtsByDebtor() {
    const debtorId = "68e5b887cfb837d89f00be9f";
    const { data, error, isLoading, mutate } = useSWR<Debt[]>(debtorId ? `debts/debtor/${debtorId}` : null,
    () => getDebtsByDebtor(debtorId));

    return {
        debtsByDebtor: data ?? [],
        isLoadingDebtsByDebtor: isLoading,
        isErrorDebtsByDebtor: error,
        mutateDebtsByDebtor: mutate,
    };
}