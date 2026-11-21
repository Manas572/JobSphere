import { useQuery } from "@tanstack/react-query";
import BackendApi from "../AxiInt";

const getAppDetail = async (id) => {
    const res = await BackendApi.get(`applicationdetails/${id}/`);
    return res.data;
};

export function useGetAppDetail(id) {
    return useQuery({
        queryKey: ["appDetail", id],
        queryFn: () => getAppDetail(id),
        enabled: Boolean(id),
    });
}
