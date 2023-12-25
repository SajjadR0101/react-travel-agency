import Index from "./pages/Index/Index";
import FlightsSearch from "./pages/FlightsSearch/FlightsSearch";
import FlightList from "./pages/FlightList/FlightList";
import FlightDetails from "./pages/FlightDetails/FlightDetails";
import BookFlight from "./pages/BookFlight/BookFlight";
import HotelSearch from "./pages/HotelSearch/HotelSearch";
import HotelList from "./pages/HotelList/HotelList";
import HotelDetails from "./pages/HotelDetails/HotelDetails";
import BookHotel from "./pages/BookHotel/BookHotel";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import Favourites from "./pages/Favourites/Favourites";

import UserPanel from "./pages/Account/Index";
import UserPanelHome from "./pages/Account/Home/Home";
import UserPanelHistory from "./pages/Account/History/History";
import UserPanelPayments from "./pages/Account/Payments/Payments";

import UserAccountProtectRoute from "./pages/Account/protectRoute/UserAccountProtectRoute";

import AdminPanel from "./pages/Cms/Index";
import AdminPanelDashboard from "./pages/Cms/Dashboard/Dashboard";
import AdminPanelUsers from "./pages/Cms/Users/Users";
import AdminPanelFlights from "./pages/Cms/Flights/Flights";
import AdminPanelHotels from "./pages/Cms/Hotels/Hotels";
import AdminPanelCompanies from "./pages/Cms/Companies/Companies";
import AdminPanelNewsLatter from "./pages/Cms/NewsLatter/NewsLatter";
import AdminPanelAdminInfo from "./pages/Cms/AdminInfo/AdminInfo";

import AdminPrivateRoutes from "./pages/Cms/private/AdminPrivateRoutes";

import NotFound from "./pages/NotFound/NotFound";

const routes = [
    { path: "/", element: <Index /> },
    { path: "/flights", element: <FlightsSearch /> },
    { path: "/flights/all", element: <FlightList /> },
    { path: "/flights/:flightID", element: <FlightDetails /> },
    { path: "/flights/:flightID/book", element: <BookFlight /> },
    { path: "/hotels", element: <HotelSearch /> },
    { path: "/hotels/all", element: <HotelList /> },
    { path: "/hotels/:hotelID", element: <HotelDetails /> },
    { path: "/hotels/:hotelID/book", element: <BookHotel /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <SignUp /> },
    { path: '/favourites', element: <Favourites />},
    // user account
    {
        path: "/account/*",
        element: (
            <UserAccountProtectRoute>
                <UserPanel />
            </UserAccountProtectRoute>
        ),
        children: [
            { path: "", element: <UserPanelHome /> },
            { path: "history", element: <UserPanelHistory /> },
            { path: "payments", element: <UserPanelPayments /> },
        ],
    },
    // admin panel
    {
        path: "/admin-panel/*",
        element: (
            <AdminPrivateRoutes>
                <AdminPanel />
            </AdminPrivateRoutes>
        ),
        children: [
            { path: "", element: <AdminPanelDashboard /> },
            { path: "users", element: <AdminPanelUsers /> },
            { path: "flight-all", element: <AdminPanelFlights /> },
            { path: "hotel-all", element: <AdminPanelHotels /> },
            { path: "companies", element: <AdminPanelCompanies /> },
            { path: "newslatter", element: <AdminPanelNewsLatter /> },
            { path: "admin-info", element: <AdminPanelAdminInfo /> },
        ],
    },

    { path: "*", element: <NotFound /> },
];

export default routes;
