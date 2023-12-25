import React from "react";

export default function TableHead({ items }) {
    return (
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
                {items.map((item) => {
                    return (
                        <th scope="col" key={item} class="px-6 py-3">
                            {item}
                        </th>
                    );
                })}
            </tr>
        </thead>
    );
}
