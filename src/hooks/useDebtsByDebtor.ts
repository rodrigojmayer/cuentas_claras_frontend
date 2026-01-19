import useSWR from "swr";
import { getDebtsByDebtor } from "@/lib/api";
import { useSession } from "next-auth/react";
import type { Debt } from "@/types";

export default function useDebtsByDebtor() {
  const { data: session, status } = useSession();
  const debtorId = session?.user?._id;

  const { data, error, isLoading, mutate } = useSWR<Debt[]>(
    status === "authenticated" && debtorId
      ? `debts/debtor/${debtorId}`
      : null,
    () => getDebtsByDebtor(debtorId!)
  );

  return {
    debtsByDebtor: data,
    isLoadingDebtsByDebtor: isLoading,
    isErrorDebtsByDebtor: error,
    mutateDebtsByDebtor: mutate,
  };
}