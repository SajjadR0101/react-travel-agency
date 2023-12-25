import { createContext } from "react";

const AuthContext = createContext({
    userInfo: null,
    token: null,
    isLoggedIn: false,
    isPendding: true,
    login: () => {},
    logOut: () => {},
    refreshUserInfo: () => {},
})

export default AuthContext;