import { useQuery } from "@tanstack/react-query";
import BackendApi from "../AxiInt";

const getexpinfo = async () => {
    const res = await BackendApi.get("exp/");
    return res.data;
};

export function useexpinfo() {
    return useQuery({
        queryKey: ["expinfo"],
        queryFn: getexpinfo,
    });
}