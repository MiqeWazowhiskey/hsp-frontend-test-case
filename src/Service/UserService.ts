import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {fetchUser, deleteUser, fetchUserById, updateUser, addUser} from "../api/users.ts";
import {User} from "../Model/User.ts";
import {useNavigate} from "react-router-dom";
export function useGetUsers() {
    return useQuery({
        queryKey: ["users"],
        queryFn: fetchUser,
    });
}

export function useDeleteUser(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (userIds: number[]) => deleteUser(userIds),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["users"]}).then(r =>r);
        },
    });
}

export function useGetUserById(id: string){
    return useQuery({
        queryKey: ["users", id],
        queryFn: () => fetchUserById(id),
    });
}

interface updateInterface {
    id: string;
    user: User;
}

export function useUpdateUser(){
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({id, user}:updateInterface) => updateUser(id,user),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["users"]}).then(r =>r);
            navigate("/users?success=true");
        },
    });
}

export function useAddUser(){
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (user: User) => addUser(user),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["users"]}).then(r =>r);
            navigate("/users");

        },
    });
}

export function formatDateToNumeric(date:Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-indexed
    const day = String(date.getDate()).padStart(2, '0');
    const numericFormat = `${year}${month}${day}00`;
    return parseInt(numericFormat, 10);
}