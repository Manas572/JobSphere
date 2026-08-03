import { useMutation, useQueryClient } from "@tanstack/react-query";
import BackendApi from "../AxiInt";

const EduUpdate = async ({formData,id}) => {
    const res = await BackendApi.patch(`eduupd/${id}/`, formData);
    return res.data;
};

export function useEduUpdate() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: EduUpdate,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["eduinfo"],
            });
        },
    });
}