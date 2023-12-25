import React, { useEffect, useState } from 'react'
import { resizeAndConvertToBase64 } from '../utils/functions'

export default function useUploader(successCallback = () => {}, errorCallback = () => {}, defaultFile = null) {
    const [file, setFile] = useState(null)

    useEffect(() => {
        defaultFile && setFile(defaultFile)
    }, [defaultFile])

    const uploaderHandler = async (event, width, height) => {
        const eventFile = event.target.files[0];

        if (["image/png", "image/jpeg"].includes(eventFile.type)) {
            resizeAndConvertToBase64(eventFile, width, height, (result) => {
                setFile(result)
                successCallback(result)
            });
        } else {
            errorCallback()
        }
    }

    const makeEmpty = () => setFile(null)

    return [file, uploaderHandler, makeEmpty]
}
