import { useMutation, useQueryClient } from "@tanstack/react-query";
import BackendApi from "../AxiInt";

const ExpRegister = async (formData) => {
    const res = await BackendApi.post("experience/", formData);
    // console.log(formData);
    return res.data;
};

export function useExpRegister() {
    const queryClient = useQueryClient();
    return useMutation({
    mutationFn: ExpRegister,
    onSuccess: () => {
        queryClient.invalidateQueries({
            queryKey: ["expinfo"],
        });
    },
    onError: (err) => {
        console.log(err.response?.data);
    },
});
}