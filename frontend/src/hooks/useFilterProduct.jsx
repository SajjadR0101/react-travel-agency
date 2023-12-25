import React, { useCallback, useEffect, useState } from 'react'

export default function useFilterProduct(products) {
    const [filteredProducts, setFilterdProducts] = useState([])

    useEffect(() => {
        setFilterdProducts([...products])
    }, [products])

    const filterReducer = (filters) => {
        let allProdcuts = [...products]

        const filterActions = {
            price: (filter, allProdcuts) => allProdcuts.filter(product => product.price > filter[0] && product.price < filter[1]),
            rating: (filter, allProdcuts) => allProdcuts.filter(product => product.score >= filter),
            companies: (filter, allProdcuts) => !filter.length ? [...allProdcuts] : allProdcuts.filter(product => filter.includes(product.company)),
            types: (filter, allProdcuts) => !filter.length ? [...allProdcuts] : allProdcuts.filter(product => filter.includes(product.triptype)),
            default: (filter, allProdcuts) => [...allProdcuts]
        }

        Object.entries(filters).forEach(filter => {
            allProdcuts = filterActions[filter[0]](filter[1], allProdcuts)
        })

        setFilterdProducts(allProdcuts)
    }

    return [filteredProducts, filterReducer]
}
