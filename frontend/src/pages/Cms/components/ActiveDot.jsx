import React from "react";

export default function ActiveDot({ active = true }) {
    return <span className={`block relative w-2 h-2 rounded-full after:absolute after:inset-0 after:rounded-full ${active ? 'bg-teal-500 after:bg-teal-500' : 'bg-rose-400 after:bg-rose-400'} after:animate-ping`}></span>;
}
