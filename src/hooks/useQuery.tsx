import { useState } from "react";

interface UseApi {
    get: <K = void>(path: string) => Promise<K>;
    inProgress: boolean;
}

export const useQuery = (): UseApi => {
    const [inProgress, setInProgress] = useState(false);

    const get = async (path: string): Promise<any> => {
        setInProgress(true)

        return await fetch(`${path}`, {
            method: 'GET',
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
            .then((res) => res.ok ? res.json() : console.error(res))
            .then((data) => data)
            .catch((err) => console.error(err))
            .finally(() => setInProgress(false));
    }
    return { get, inProgress }

}