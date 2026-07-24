import { useQuery } from "@tanstack/react-query";
import BackendApi from "../AxiInt";

const getPersonalInfo = async () => {
    const res = await BackendApi.get("me/");
    return res.data;
};

export function usePersonalInfo() {
    return useQuery({
        queryKey: ["personalInfo"],
        queryFn: getPersonalInfo,
    });
}
