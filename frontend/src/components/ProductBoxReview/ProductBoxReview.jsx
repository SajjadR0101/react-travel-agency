import React from "react";

export default function ProductBoxReview({ score, reviewsCount }) {

    const scoreText = {1: 'Very Bad', 2: 'Bad', 3: 'middle', 4: 'Good', 5: 'Very Good'}

    return (
        <div className="flex items-center gap-x-2 text-xs font-MontserratMedium">
            <div className="py-2 px-4 border border-slate-200 transition-all hover:bg-slate-50 rounded">{score}</div>
            <div>
                <span className="font-MontserratBold">{scoreText[Math.ceil(score)] || 'Good'} </span>
                <span>{reviewsCount} reviews</span>
            </div>
        </div>
    );
}
