import { useMutation, useQueryClient } from "@tanstack/react-query";
import BackendApi from "../AxiInt";

const EduRegister = async (formData) => {
    const res = await BackendApi.post("education/", formData);
    console.log(formData);
    return res.data;
};

export function useEduRegister() {
    const queryClient = useQueryClient();

    return useMutation({
    mutationFn: EduRegister,

    onSuccess: () => {
        queryClient.invalidateQueries({
            queryKey: ["eduinfo"],
        });
    },

    onError: (err) => {
        console.log(err.response?.data);
    },
});
}