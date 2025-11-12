import useSWR from "swr";
import { getDebtsByCreditor } from "@/lib/api";
import type { Debt } from "@/types";

export default function useDebtsByCreditor() {
    const { data, error, isLoading, mutate } = useSWR<Debt[]>("68e5b887cfb837d89f00be9f", getDebtsByCreditor);

    return {
        debtsByCreditor: data ?? [],
        isLoadingDebtsByCreditor: isLoading,
        isErrorDebtsByCreditor: error,
        mutateDebtsByCreditor: mutate,
    };
}