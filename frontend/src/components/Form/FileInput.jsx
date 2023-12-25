import React from "react";
import Svg from "../Svg/Svg";

export default function FileInput({ className, id, title, onChange, uploaded = false }) {
    return (
        <div>
            <label htmlFor={id} className={className}>
                <Svg iconID="upload" className="w-5 h-5" />
                {title}
                {uploaded && <span className="block ml-2 bg-white rounded py-1 px-2 text-xs text-blue-500 animate-loadByOpacity">Uploaded</span>}
            </label>
            <input type="file" id={id} className="hidden" onChange={onChange} />
        </div>
    );
}
