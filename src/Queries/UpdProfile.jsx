import { useMutation, useQueryClient } from "@tanstack/react-query";
import BackendApi from "../AxiInt";

const updatePersonalInfo = async (formData) => {
    const res = await BackendApi.patch("me/", formData);
    return res.data;
};

export function useUpdatePersonalInfo() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updatePersonalInfo,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["personalInfo"],
            });

            queryClient.invalidateQueries({
                queryKey: ["skills"],
            });
        },
    });
}