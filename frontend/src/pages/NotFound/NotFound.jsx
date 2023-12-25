import React from "react";
import PageTransition from "../../components/PageTransition/PageTransition";
import NotFoundSvg from "./NotFoundSvg";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Svg from "../../components/Svg/Svg";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <PageTransition>
            <Navbar />
            <main className="mb-[300px]">
                <div className="container">
                    <div className="h-[500px]">
                        <NotFoundSvg />
                    </div>
                    <div className="mt-4 flex flex-col gap-y-4 max-w-[700px] mx-auto text-center">
                        <span className="font-TradeGothic font-bold text-3xl">404, Page not founds</span>
                        <p>Something went wrong. It’s look that your requested could not be found. It’s look like the link is broken or the page is removed.</p>
                        <div className="flex gap-x-4 mt-4">
                            <Button title='Go Back' size='lg' flexible outline onClick={() => {navigate(-1)}} />
                            <Button title='Go To home' size='lg' flexible outline onClick={() => navigate('/')} />
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </PageTransition>
    );
}
