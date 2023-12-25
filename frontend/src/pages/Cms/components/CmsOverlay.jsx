import React from "react";
import { createPortal } from "react-dom";
import Button from "../../../components/Button/Button";
import { useNavigate } from "react-router-dom";

export default function CmsOverlay() {
    const navigate = useNavigate();

    return createPortal(
        <div className="fixed inset-0 w-full h-full bg-white text-center flex-center flex-col gap-y-4 font-MontserratMedium z-50 lg:hidden">
            <span>Sorry! admin panel not available in low screen size!</span>
            <div className="flex gap-x-4">
                <Button title="Go back" outline onClick={() => navigate(-1)} />
                <Button title="Go Home" outline onClick={() => navigate('/')} />
            </div>
        </div>,
        document.body
    );
}
