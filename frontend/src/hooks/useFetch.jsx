import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function useFetch({ url = "", method = "GET", contentType, authorization, authorizationID, authorizationToken = null, successCallback = () => {}, errorCallback = () => {} }) {
    const authContext = useContext(AuthContext)
    const [isFetching, setIsFetching] = useState(false)

    const fetchHandler = async (body = null, urlParams = []) => {
        setIsFetching(true)
        try {
            const response = await fetch(`${url}${urlParams.reduce((prev, cerrent) => prev + cerrent + '/', '')}`, {
                method,
                ...((contentType || authorization) && {
                    headers: {
                        ...(contentType && { "Content-type": "application/json", }),
                        ...(authorization && { Authorization: authorizationToken || authContext.token || null }),
                        ...(authorizationID && { Authorization: authContext.userInfo?.id || null }),
                    },
                }),
                ...(body && { body: JSON.stringify(body) }),
            });
    
            if (response.ok) {
                successCallback();
            } else {
                errorCallback();
            }

            setIsFetching(false)
        } catch {
            errorCallback();
            setIsFetching(false)
        }
    };

    return [fetchHandler, isFetching]
}
