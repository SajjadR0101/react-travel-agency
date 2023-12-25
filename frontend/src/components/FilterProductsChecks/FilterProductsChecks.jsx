import React from "react";

export default function FilterProductsChecks({ items, onChange }) {
    return (
        <form className="font-MontserratMedium text-sm flex flex-col gap-y-2">
            {items.map((item) => {
                return (
                    <div className="flex items-center gap-x-2" key={item}>
                        <input type="checkbox" id={item} className="w-6 h-6 accent-primary" onInput={() => onChange(item)} />
                        <label htmlFor={item}>{item}</label>
                    </div>
                );
            })}
        </form>
    );
}
