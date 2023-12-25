import React, { useEffect, useState, useRef, useCallback } from "react";

export default function useModal() {
    const isFirstrender = useRef(true);
    const [isShow, setIsShow] = useState(false);
    const [modalProps, setModalProps] = useState({})

    const showModal = useCallback((props = null) => props ? setModalProps(props) : setIsShow(true), []);
    const onClose = useCallback(() => setIsShow(false), []);

    useEffect(() => {
        if (isFirstrender.current) {
            isFirstrender.current = false
            return;
        }
        setIsShow(true)
    } ,[modalProps])

    return [isShow, showModal, onClose, modalProps];
}
