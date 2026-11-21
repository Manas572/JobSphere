import { useQuery } from "@tanstack/react-query";
import BackendApi from "../AxiInt";

const getJobCount = async (id) => {
    const res = await BackendApi.get(`applicationcount/${id}`);
    return res.data;
};

export function useGetJobCount(id) {
    return useQuery({
        queryKey: ["job-count", id],
        queryFn: () => getJobCount(id),
        enabled: Boolean(id),
    });
}
