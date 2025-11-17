import useSWR from "swr";
import { getUsers } from "@/lib/api";
import type { User } from "@/types";

export default function useUsers() {
    const { data, error, isLoading, mutate } = useSWR<User[]>("/", getUsers);

    return {
        users: data,
        isLoadingUsers: isLoading,
        isErrorUsers: error,
        mutateUsers: mutate,
    };
}