import { useMutation, useQueryClient } from "@tanstack/react-query";
import BackendApi from "../AxiInt";

const ExpUpdate = async ({formData,id}) => {
    const res = await BackendApi.patch(`expupd/${id}/`, formData);
    return res.data;
};

export function useExpUpdate() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ExpUpdate,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["expinfo"],
            });
        },
    });
}