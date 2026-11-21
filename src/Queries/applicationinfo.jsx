import { useQuery } from "@tanstack/react-query";
import BackendApi from "../AxiInt";

const getAppInfo = async (id) => {
    const res = await BackendApi.get(`applicationinfo/${id}/`);
    return res.data;
};

export function useGetAppInfo(id) {
    return useQuery({
        queryKey: ["appinfo", id],
        queryFn: () => getAppInfo(id),
        enabled: Boolean(id),
    });
}
