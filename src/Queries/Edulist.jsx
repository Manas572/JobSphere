import { useQuery } from "@tanstack/react-query";
import BackendApi from "../AxiInt";

const geteduinfo = async () => {
    const res = await BackendApi.get("edu/");
    return res.data;
};

export function useeduinfo() {
    return useQuery({
        queryKey: ["eduinfo"],
        queryFn: geteduinfo,
    });
}