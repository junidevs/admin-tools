import { useCallback, useEffect, useRef, useState} from "react";

interface useFetch<T> {
    inProgress: boolean;
    isError: boolean;
    data?: T;
}

export const useFetch = <T extends unknown> ( url:string, body:null | any, method:string): useFetch<T> => {

    const [inProgress, setInProgress] = useState(true);
    const [isError, setIsError] = useState(false);
    const [data, setData] = useState<any>();
    const isCancelled = useRef(false);

    // memo the query
    const query = useCallback(async () => {

            try {
                const response = await fetch(url, {
                    method,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body
                })

                const data:any = await response.json();
                if (!isCancelled.current) {
                    setInProgress(false);
                    setIsError(false);
                    setData(data);
                }
            }

            catch (error) {
                setInProgress(false);
                setIsError(true);
                console.error(error)
            }
    },[data]);

    useEffect(() => {
        const fetchData = async () => await query();
        if(!isCancelled.current)  fetchData();

        return () => {
            if(inProgress === false) isCancelled.current = true;
        };
    });


return { inProgress, isError, data };
}