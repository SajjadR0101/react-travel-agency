import React from "react";
import FooterNewsLatter from "../FooterNewsLatter/FooterNewsLatter";
import Svg from "../Svg/Svg";
import FooterMenu from "../FooterMenu/FooterMenu";

export default function Footer({ isShow = true }) {
    const menuOptions = [
        { title: "Our Destinations", subs: ["Canada", "Alaksa", "France", "Iceland"] },
        { title: "Our Activities", subs: ["Northern Lights", "Cruising & sailing", "Multi-activities", "Kayaing"] },
        { title: "Travel Blogs", subs: ["Bali Travel Guide", "Sri Lanks Travel Guide", "Peru Travel Guide", "Bali Travel Guide"] },
        { title: "About Us", subs: ["Our Story", "Work with us"] },
        { title: "Contact Us", subs: ["Our Story", "Work with us"] },
    ];

    return (
        <>
            <footer className={`bg-primary pb-20 ${isShow ? "" : "hidden"}`}>
                <div className="container">
                    <FooterNewsLatter />
                    <div className="-mt-20 flex flex-col xl:flex-row justify-between flex-wrap text-slate-900">
                        <div className="xl:mr-36">
                            <Svg iconID="app-logo-white" className="w-[120px] h-[39px]" />
                            <div className="mt-6 flex items-center gap-x-3">
                                <Svg iconID="facebook" className="w-5 h-5" />
                                <Svg iconID="twitter" className="w-5 h-5" />
                                <Svg iconID="youtube" className="w-5 h-5" />
                                <Svg iconID="instagram" className="w-5 h-5" />
                            </div>
                        </div>
                        <div className="flex justify-between gap-6 flex-wrap flex-grow mt-10 xl:mt-0">
                            {menuOptions.map((item) => (
                                <FooterMenu key={item.title} {...item} />
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
