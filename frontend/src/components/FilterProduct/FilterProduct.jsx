import React, { memo, useContext, useRef } from "react";
import FilterProductItem from "../FilterProductItem/FilterProductItem";
import FilterRatingProduct from "../FilterRatingProduct/FilterRatingProduct";
import PriceRangeFilterProduct from "../PriceRangeFilterProduct/PriceRangeFilterProduct";
import Loading from "../Loading/Loading";
import useDataFetch from "../../hooks/useDataFetch";
import FilterProductsChecks from "../FilterProductsChecks/FilterProductsChecks";
import Button from "../Button/Button";
import Svg from "../Svg/Svg";
import FilterProductContext from "../../context/FilterProductContext";

export default memo(function FilterProduct({ className }) {
    const { filterReducer } = useContext(FilterProductContext);

    const filtersOptions = useRef({
        price: [0, 1200],
        rating: 0,
        companies: [],
        types: [],
    });

    const changeFiltering = (type, value) => (filtersOptions.current[type] = value);

    const changeChecksFiltering = (type, value) => {
        const items = filtersOptions.current[type];
        if (items.includes(value)) {
            filtersOptions.current[type] = items.filter((item) => item !== value);
        } else {
            filtersOptions.current[type].push(value);
        }
    };

    const [tripTypes, , penddingTripTypes] = useDataFetch("https://node-travel-agency.liara.run/api/triptypes");
    const [companies, , penddingCompanies] = useDataFetch("https://node-travel-agency.liara.run/api/companies");

    return (
        <div className={`flex flex-col gap-y-8 z-10 ${className}`}>
            <span className="font-MontserratSemiBold text-xl">Filters</span>
            <FilterProductItem title="Price">
                <PriceRangeFilterProduct onChange={(value) => changeFiltering("price", value)} />
            </FilterProductItem>
            <span className="h-[0.5px] w-full opacity-25 bg-current"></span>
            <FilterProductItem title="Rating">
                <FilterRatingProduct onChange={(value) => changeFiltering("rating", value)} />
            </FilterProductItem>
            <span className="h-[0.5px] w-full opacity-25 bg-current"></span>
            <Loading isPendding={penddingCompanies}>
                <FilterProductItem title="Companies">
                    <FilterProductsChecks items={companies.map((company) => company.name)} onChange={(value) => changeChecksFiltering("companies", value)} />
                </FilterProductItem>
            </Loading>
            <span className="h-[0.5px] w-full opacity-25 bg-current"></span>
            <Loading isPendding={penddingTripTypes}>
                <FilterProductItem title="Trips">
                    <FilterProductsChecks items={tripTypes.map((trip) => trip.type)} onChange={(value) => changeChecksFiltering("types", value)} />
                </FilterProductItem>
            </Loading>
            <Button
                title="Submit Filter"
                type="button"
                size="lg"
                outline
                afterIcon={<Svg iconID="filter" className="w-5 h-5 text-slate-600" />}
                onClick={() => {
                    filterReducer(filtersOptions.current);
                }}
            />
        </div>
    );
});
