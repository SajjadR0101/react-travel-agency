import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import { useLocation, useRoutes, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import routes from "./routes";
import AuthContext from "./context/AuthContext";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import GlobalIcons from "./components/Icons/GlobalIcons";
import { includesStringInArray } from "./utils/functions";

function App() {
    const [appData, setAppData] = useState({
        userInfo: null,
        isLoggedIn: false,
        isPendding: true,
    });
    const [token, setToken] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("userToken"));
        } catch {
            return null;
        }
    });
    const [refresh, setRefresh] = useState(false);
    const [isShowNavbarAndFooter, setIsShowNavbarAndFooter] = useState(false);

    const location = useLocation();
    const appRouter = useRoutes(routes);

    const refreshApp = useCallback(() => setRefresh((prevState) => !prevState), []);

    const login = (token, userInfo = null) => {
        const setLogOutUser = () => {
            setAppData({
                userInfo: null,
                isLoggedIn: false,
                isPendding: false,
            });
            localStorage.setItem("userToken", null);
        };

        if (userInfo) {
            setAppData({
                userInfo,
                isLoggedIn: true,
                isPendding: false,
            });
            setToken(userInfo.token);
            localStorage.setItem("userToken", JSON.stringify(userInfo.token));
        } else if (token) {
            fetch(`https://node-travel-agency.liara.run/api/users/${token}`)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                    }
                })
                .then((result) => {
                    setAppData({
                        userInfo: result[0],
                        isLoggedIn: true,
                        isPendding: false,
                    });
                    localStorage.setItem("userToken", JSON.stringify(token));
                })
                .catch((err) => setLogOutUser());
        } else {
            setLogOutUser();
        }
    };

    const logOut = useCallback(() => {
        setToken(null);
        refreshApp();
    });

    useEffect(() => {
        login(token);
    }, [refresh]);

    useEffect(() => {
        includesStringInArray(location.pathname, ["/flights", "/hotels", "/account", "/favourites"]) ? setIsShowNavbarAndFooter(true) : setIsShowNavbarAndFooter(false);

        !includesStringInArray(location.pathname, ["/account"]) && window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <AuthContext.Provider
            value={{
                ...appData,
                token,
                login,
                logOut,
                refreshUserInfo: refreshApp,
            }}
        >
            <AnimatePresence>
                <GlobalIcons />
                <Navbar isShow={isShowNavbarAndFooter} />
                {appRouter}
                <Footer isShow={isShowNavbarAndFooter} />
            </AnimatePresence>
        </AuthContext.Provider>
    );
}

export default App;
