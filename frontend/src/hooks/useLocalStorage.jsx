import React, { useState } from 'react'

export default function useLocalStorage(key) {

    const [data, setData] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem(key));
        } catch {
            return null;
        }
    })

    const setLocalStorageData = (value) => {
        localStorage.setItem(key, JSON.stringify(value));
        setData(value)
    }

    const realTimeAccess = () => {
        try {
            return JSON.parse(localStorage.getItem(key));
        } catch {
            return null;
        }
    }

  return [data, setLocalStorageData, realTimeAccess]
}
