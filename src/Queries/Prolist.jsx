import { useQuery } from "@tanstack/react-query";
import BackendApi from "../AxiInt";

const getproinfo = async () => {
    const res = await BackendApi.get("pro/");
    return res.data;
};

export function useproinfo() {
    return useQuery({
        queryKey: ["proinfo"],
        queryFn: getproinfo,
    });
}