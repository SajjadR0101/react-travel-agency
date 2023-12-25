import React, { useState } from "react";

export default function useChildData() {
    const [data, setData] = useState(null)

    const sendDataToParent = (childData) => {
        setData(childData)
    }

    return [data, sendDataToParent]
}
