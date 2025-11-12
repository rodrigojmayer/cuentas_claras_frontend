import useSWR from "swr";
import { getDebts } from "@/lib/api";
import type { Debt } from "@/types";

export default function useDebts() {
    const { data, error, isLoading, mutate } = useSWR<Debt[]>("/", getDebts);

    return {
        debts: data ?? [],
        isLoadingDebts: isLoading,
        isErrorDebts: error,
        mutateDebts: mutate,
    };
}