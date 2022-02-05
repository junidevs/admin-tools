import { useState, useEffect } from 'react';

export const  useDebounce = (value?:any, delay?:number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {

            const handler = setTimeout(() => {
                setDebouncedValue(value);
                console.log(debouncedValue)
            }, delay);

            return () => {
                clearTimeout(handler);
            };
        },
        [value]
    );

    return debouncedValue;
}