import { createContext } from "react";

const FilterProductContext = createContext({
    productFilterReducer: () => {}
})

export default FilterProductContext;