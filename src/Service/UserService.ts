import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {fetchUser, deleteUser} from "../api/users.ts";
export function useGetUsers() {
    return useQuery({
        queryKey: ["users"],
        queryFn: fetchUser,
    });
}

export function useDeleteUser(userIds: number[]){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => deleteUser(userIds),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["users"]}).then(r =>r);
        },
    });
}