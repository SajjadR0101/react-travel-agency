import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export default function useDataFetch(url = "") {
    const [data, setData] = useState([]);
    const [refreshData, setRefreshData] = useState(false);
    const [isPendding, setIsPendding] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        setIsPendding(true)
        const fetchData = async () => {
            const response = await fetch(url);

            try {
                if (response.ok) {
                    const fetchedData = await response.json();
                    setData(fetchedData);
                    setIsPendding(false);
                } else {
                    throw new Error(response.text);
                }
            } catch (err) {
                setError(true);
            }
        };

        fetchData();
    }, [refreshData]);

    const refresh = () => {
        setRefreshData((prevState) => !prevState);
    };

    return [data, refresh, isPendding, error];
}
