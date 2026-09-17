import { useMutation } from "@tanstack/react-query";
import BackendApi from "../AxiInt";

const extractSkills = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await BackendApi.post("api/extract-skills", formData, { timeout: 60000 });
    return res.data;
};

export function useExtractSkills() {
    return useMutation({
        mutationFn: extractSkills,
        onError: (err) => {
            console.log(err.response?.data);
        },
    });
}

