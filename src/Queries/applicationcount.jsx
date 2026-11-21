import { useQuery } from "@tanstack/react-query";
import BackendApi from "../AxiInt";

const getApplicationCount = async (id) => {
    const res = await BackendApi.get(`applicationcount/${id}/`);
    return res.data;
};

export function useGetApplicationCount(id) {
    return useQuery({
        queryKey: ["application-count", id],
        queryFn: () => getApplicationCount(id),
        enabled: Boolean(id),
    });
}
