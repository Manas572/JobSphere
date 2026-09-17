
import { useMutation, useQueryClient } from "@tanstack/react-query";
import BackendApi from "../AxiInt";

const ResCreate = async (formData) => {
    const res = await BackendApi.post("createresume/", formData);
     console.log(formData);
    return res.data;
};

export function useResCreate() {
    const queryClient = useQueryClient();
    return useMutation({
    mutationFn: ResCreate,
    onError: (err) => {
        console.log(err.response?.data);
    },
});
}