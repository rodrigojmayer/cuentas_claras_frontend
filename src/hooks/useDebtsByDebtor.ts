import useSWR from "swr";
import { getDebtsByDebtor } from "@/lib/api";
import type { Debt } from "@/types";
import { useSession } from "next-auth/react";

export default function useDebtsByDebtor() {
    const { data: session } = useSession()
    // const debtorId = "68e5b887cfb837d89f00be9f";
    const debtorId = session ? session.user._id : "";
    const { data, error, isLoading, mutate } = useSWR<Debt[]>(
        debtorId ? `debts/debtor/${debtorId}` : null,
        () => getDebtsByDebtor(debtorId)
        // ([_, id]: [string, string]) => getDebtsByDebtor(id)
    );
    

    return {
        debtsByDebtor: data,
        isLoadingDebtsByDebtor: isLoading,
        isErrorDebtsByDebtor: error,
        mutateDebtsByDebtor: mutate,
    };
}