import React, { useState } from "react";
import Button from "../Button/Button";

export default function FilterRatingProduct({ onChange }) {
    const [isActive, setIsActive] = useState(0);

    const changeActivity = (event) => {
        const value = +event.target.textContent[0];
        setIsActive(value);
        onChange(value);
    };

    return (
        <div className="flex flex-wrap gap-4 mb-1 pointer-events-none child:pointer-events-auto" onClick={changeActivity}>
            <Button title="0+" outline={isActive !== 0} />
            <Button title="1+" outline={isActive !== 1} />
            <Button title="2+" outline={isActive !== 2} />
            <Button title="3+" outline={isActive !== 3} />
            <Button title="4+" outline={isActive !== 4} />
        </div>
    );
}
