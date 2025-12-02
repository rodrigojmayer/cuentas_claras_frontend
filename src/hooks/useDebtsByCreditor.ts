/* eslint-disable @typescript-eslint/no-unused-vars */
import useSWR from "swr";
import { getDebtsByCreditor } from "@/lib/api";
import type { Debt } from "@/types";
import { useSession } from "next-auth/react";

export default function useDebtsByCreditor() {
    const { data: session } = useSession()
    // const creditorId = "68e5b887cfb837d89f00be9f";
    const creditorId = session ? session.user._id : "";
    const { data, error, isLoading, mutate } = useSWR<Debt[]>(
        creditorId ? `debts/creditor/${creditorId}` : null,
        () => getDebtsByCreditor(creditorId)
        // ([_, id]: [string, string]) => getDebtsByCreditor(id)
    );

    return {
        debtsByCreditor: data,
        isLoadingDebtsByCreditor: isLoading,
        isErrorDebtsByCreditor: error,
        mutateDebtsByCreditor: mutate,
    };
}