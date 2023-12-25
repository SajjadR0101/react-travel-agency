import React, { useContext, useRef } from "react";
import PageTransition from "../../../components/PageTransition/PageTransition";
import Loading from "../../../components/Loading/Loading";
import Table from "../components/Table";
import TableHead from "../components/TableHead";
import TableBody from "../components/TableBody";
import useDataFetch from "../../../hooks/useDataFetch";
import Alert from "../components/Alert";
import Svg from "../../../components/Svg/Svg";
import AddNewFlight from "../components/AddNewFlight";
import useModal from "../../../hooks/useModal";
import QuestionModal from "../../../components/QuestionModal/QuestionModal";
import useFetch from "../../../hooks/useFetch";
import ToastContext from "../../../context/ToastContext";
import EditFlightModal from "../components/EditFlightModal";
import usePagination from "../../../hooks/usePagination";
import Pagination from "../components/Pagination";

export default function Flights() {
    const removableFlightID = useRef(null);

    const [flights, refreshFlights, isPendding] = useDataFetch("https://node-travel-agency.liara.run/api/flights");

    const { showToast } = useContext(ToastContext);

    const [isShowRemoveUserModal, showRemoveUserModal, onCloseRemoveModal] = useModal();
    const [isShowEditModal, showEditModal, onCloseEditModal, editModalProps] = useModal();

    const [remoevFlightAction] = useFetch({
        url: "https://node-travel-agency.liara.run/api/flights/",
        method: "DELETE",
        successCallback: () => {
            showToast("success", "Flight remove from database successfully.");
            refreshFlights();
        },
        errorCallback: () => showToast("error", "Something wrong, please try latter."),
    });

    const [paginatedFlights, paginationOptions] = usePagination(flights, 5);

    const onRemoveFlight = (flightID) => {
        showRemoveUserModal();
        removableFlightID.current = flightID;
    };

    return (
        <PageTransition>
            <AddNewFlight onAddFlight={refreshFlights} />
            <EditFlightModal isShow={isShowEditModal} onClose={onCloseEditModal} onConfirm={refreshFlights} {...editModalProps} />
            <div className="mt-16">
                <h2 className="font-TradeGothic font-bold text-3xl text-slate-600">List Off Flights</h2>
                <div className="mt-8">
                    <Loading isPendding={isPendding}>
                        {flights.length > 0 ? (
                            <>
                                <Table>
                                    <TableHead items={["ID", "FlightName", "Price", "From - To", "Date", "Company", "Type", "FlyTime", "Actions"]} />
                                    <TableBody>
                                        {paginatedFlights.map((flight, index) => {
                                            const addToIndexNumber = (paginationOptions.currentPage - 1) * paginationOptions.showCount;
                                            return (
                                                <tr key={flight.id} className="bg-white border-b">
                                                    <td className="px-6 py-4">{index + 1 + addToIndexNumber}</td>
                                                    <td className="px-6 py-4 max-w-[250px] line-clamp-1 h-3">{flight?.flightName}</td>
                                                    <td className="px-6 py-4">${flight?.price}</td>
                                                    <td className="px-6 py-4">{`${flight?.fromCity} - ${flight?.toCity}`}</td>
                                                    <td className="px-6 py-4">{flight?.departDate}</td>
                                                    <td className="px-6 py-4">{flight?.company}</td>
                                                    <td className="px-6 py-4">{flight?.triptype}</td>
                                                    <td className="px-6 py-4">{flight?.flyTime} min</td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex gap-x-3">
                                                            <button onClick={() => showEditModal({ flight })}>
                                                                <Svg iconID="edit" className="w-6 h-6 text-sky-600" />
                                                            </button>
                                                            <button onClick={() => onRemoveFlight(flight.id)}>
                                                                <Svg iconID="remove" className="w-6 h-6 text-rose-600" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                                {paginationOptions.pageCount > 1 && <Pagination className="mt-8 flex justify-end" {...paginationOptions} />}
                            </>
                        ) : (
                            <Alert />
                        )}
                    </Loading>
                </div>
            </div>
            <QuestionModal message="You sure about removing this flight from database?" isShow={isShowRemoveUserModal} onClose={onCloseRemoveModal} onAccept={() => remoevFlightAction(null, [removableFlightID.current])} />
        </PageTransition>
    );
}
