import { useMutation, useQueryClient } from "@tanstack/react-query";
import BackendApi from "../AxiInt";

const ProUpdate = async ({formData,id}) => {
    const res = await BackendApi.patch(`proupd/${id}/`, formData);
    return res.data;
};

export function useProUpdate() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ProUpdate,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["proinfo"],
            });
        },
    });
}