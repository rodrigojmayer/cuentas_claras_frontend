import useSWR from "swr";
import { getDebtsByCreditor } from "@/lib/api";
import { useSession } from "next-auth/react";
import type { Debt } from "@/types";

export default function useDebtsByCreditor() {
  const { data: session, status } = useSession();
  const creditorId = session?.user?._id;

  const { data, error, isLoading, mutate } = useSWR<Debt[]>(
    status === "authenticated" && creditorId
      ? `debts/creditor/${creditorId}`
      : null,
    () => getDebtsByCreditor(creditorId!)
  );

  return {
    debtsByCreditor: data,
    isLoadingDebtsByCreditor: isLoading,
    isErrorDebtsByCreditor: error,
    mutateDebtsByCreditor: mutate,
  };
}