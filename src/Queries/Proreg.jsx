import { useMutation, useQueryClient } from "@tanstack/react-query";
import BackendApi from "../AxiInt";

const ProRegister = async (formData) => {
    const res = await BackendApi.post("project/", formData);
    // console.log(formData);
    return res.data;
};

export function useProRegister() {
    const queryClient = useQueryClient();

    return useMutation({
    mutationFn: ProRegister,

    onSuccess: () => {
        queryClient.invalidateQueries({
            queryKey: ["proinfo"],
        });
    },

    onError: (err) => {
        console.log(err.response?.data);
    },
});
}