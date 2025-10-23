import useSWR from "swr";
import { getUsers } from "@/lib/api";
import type { User } from "@/types";

export default function useUsers() {
    const { data, error, isLoading, mutate } = useSWR<User[]>("/users", getUsers);

    return {
        users: data ?? [],
        isLoading,
        isError: error,
        mutateUsers: mutate,
    };
}