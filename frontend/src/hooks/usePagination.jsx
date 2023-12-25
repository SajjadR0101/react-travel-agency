import React, { useEffect, useState } from "react";

export default function usePagination(items, showCount = 5) {
    const [paginatedItems, setPaginatedItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(null);

    const paginationHandler = () => {
        const startIndex = (currentPage - 1) * showCount;
        const endIndex = currentPage * showCount;
        setPaginatedItems(items.slice(startIndex, endIndex));
    };

    useEffect(() => {
        paginationHandler();
        setPageCount(Math.ceil(items.length / showCount))
    }, [items]);

    useEffect(() => {
        paginationHandler()
    }, [currentPage])

    const nextPage = () => {
        currentPage + 1 <= pageCount && setCurrentPage(prevPage => ++prevPage)
    };

    const prevPage = () => {
        currentPage - 1 > 0 && setCurrentPage(prevPage => --prevPage)
    };

    const goToPage = (page) => {
        page <= pageCount && page > 0 && setCurrentPage(page) 
    };

    return [paginatedItems, { pageCount, currentPage, showCount, nextPage, prevPage, goToPage }];
}
