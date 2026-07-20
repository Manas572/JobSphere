import { useMutation } from "@tanstack/react-query";
import BackendApi from "../AxiInt";

const updatePersonalInfo = async (formData) => {
    const res = await BackendApi.patch("me/", formData);
    return res.data;
};

export function useUpdatePersonalInfo() {
    return useMutation({
        mutationFn: updatePersonalInfo,
    });
}