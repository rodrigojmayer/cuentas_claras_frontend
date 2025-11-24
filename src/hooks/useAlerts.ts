import useSWR from "swr";
import { getAlerts } from "@/lib/api";
import type { Alert } from "@/types";

export default function useAlerts() {
    const { data, error, isLoading, mutate } = useSWR<Alert[]>("/alerts", getAlerts);

    return {
        alerts: data,
        isLoadingAlerts: isLoading,
        isErrorAlerts: error,
        mutateAlerts: mutate,
    };
}