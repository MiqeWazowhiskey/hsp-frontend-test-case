import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {fetchUser, deleteUser, fetchUserById, updateUser} from "../api/users.ts";
import {User} from "../Model/User.ts";
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

export function useGetUserById(id: number){
    return useQuery({
        queryKey: ["users", id],
        queryFn: () => fetchUserById(id),
    });
}

interface updateInterface {
    id: number;
    user: User;
}
export function useUpdateUser(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({id, user}:updateInterface) => updateUser(id,user),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["users"]}).then(r =>r);
        },
    });
}