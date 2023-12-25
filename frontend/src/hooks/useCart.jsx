import React, { useState, useEffect, useCallback } from "react";

export default function useCart(userID = null, showToast = () => {}) {
    const [cards, setCards] = useState([]);
    const [refreshCards, setRefreshCards] = useState(false);
    const [isPendding, setIsPendding] = useState(true);

    useEffect(() => {
        setIsPendding(true);
        const fetchCards = async () => {
            const response = await fetch(`https://node-travel-agency.liara.run/api/users/${userID}/cards`);
            const datas = await response.json();

            setCards(datas);
            setIsPendding(false);
        };

        if (userID) {
            fetchCards();
        }
    }, [userID, refreshCards]);

    const refreshCarts = useCallback(() => setRefreshCards((prevState) => !prevState), [])

    return [cards, refreshCarts, isPendding];
}
