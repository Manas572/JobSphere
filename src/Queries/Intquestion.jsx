import { useMutation } from "@tanstack/react-query";
import BackendApi from "../AxiInt";

const getquestion = async (formData) => {
    const res = await BackendApi.post(
        "interviewquestion/",
        formData
    );
    return res.data;
};

export function usegetquestion() {
    return useMutation({
        mutationFn: getquestion
    });
}