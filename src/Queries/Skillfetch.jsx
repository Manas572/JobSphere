import { useQuery } from "@tanstack/react-query";
import BackendApi from "../AxiInt";

const getskills = async () => {
    const res = await BackendApi.get("skills/");
    return res.data;
};

export function useSkillinfo() {
    return useQuery({
        queryKey: ["skills"],
        queryFn: getskills,
    });
}
