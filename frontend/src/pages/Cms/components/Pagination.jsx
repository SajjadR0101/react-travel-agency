import React from "react";

const PaginationItem = ({value, leftRounded, rightRounded, disabled, active, onClick = () => {}}) => {
    return (
        <li>
            <span onClick={onClick} className={`flex items-center justify-center px-4 h-10 leading-tight text-slate-500 bg-white border border-slate-300 hover:bg-slate-100 hover:text-slate-700 transition-all cursor-pointer ${leftRounded && 'rounded-l-lg'} ${rightRounded && 'rounded-r-lg'} ${disabled && 'pointer-events-none !bg-slate-50'} ${active && '!bg-blue-500 text-white hover:text-white'}`}>
                {value}
            </span>
        </li>
    );
};

export default function Pagination({ className, pageCount = 8, currentPage = 2, nextPage, prevPage, goToPage }) {
    return (
        <nav className={className}>
            <ul class="inline-flex -space-x-px text-base h-10">
                <PaginationItem value='Previous' leftRounded disabled={currentPage === 1} onClick={prevPage} />
                {
                    [...Array(pageCount).keys()].map(value => <PaginationItem key={value} value={value + 1} active={value + 1 === currentPage} onClick={() => value + 1 !== currentPage && goToPage(value + 1)} />)
                }
                <PaginationItem value='Next' rightRounded disabled={currentPage === pageCount} onClick={nextPage} />
            </ul>
        </nav>
    );
}
