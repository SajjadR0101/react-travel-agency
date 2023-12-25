import React, { useContext, useRef } from "react";
import PageTransition from "../../../components/PageTransition/PageTransition";
import Loading from "../../../components/Loading/Loading";
import Table from "../components/Table";
import TableHead from "../components/TableHead";
import TableBody from "../components/TableBody";
import useDataFetch from "../../../hooks/useDataFetch";
import Alert from "../components/Alert";
import Svg from "../../../components/Svg/Svg";
import AddNewHotel from "../components/AddNewHotel";
import ToastContext from "../../../context/ToastContext";
import useFetch from "../../../hooks/useFetch";
import useModal from "../../../hooks/useModal";
import QuestionModal from "../../../components/QuestionModal/QuestionModal";
import EditHotelModal from "../components/EditHotelModal";
import usePagination from "../../../hooks/usePagination";
import Pagination from "../components/Pagination";

export default function Hotels() {
    const removableHotelID = useRef(null);

    const [hotels, refreshHotels, isPendding] = useDataFetch("https://node-travel-agency.liara.run/api/hotels");

    const [isShowRemoveHotelModal, showRemoveHotelModal, onCloseRemoveModal] = useModal();
    const [isShowEditModal, showEditModal, onCloseEditModal, editModalProps] = useModal();

    const { showToast } = useContext(ToastContext);

    const [removeHotelAction] = useFetch({
        url: "https://node-travel-agency.liara.run/api/hotels/",
        method: "DELETE",
        successCallback: () => {
            showToast("success", "Hotel remove from database successfully.");
            refreshHotels();
        },
        errorCallback: () => showToast("error", "Something wrong, please try latter."),
    });

    const [paginatedHotels, paginationOptions] = usePagination(hotels, 5);

    const onRemoveHotel = (hotelID) => {
        showRemoveHotelModal();
        removableHotelID.current = hotelID;
    };

    return (
        <PageTransition>
            <AddNewHotel onAddHotel={refreshHotels} />
            <EditHotelModal isShow={isShowEditModal} onClose={onCloseEditModal} onConfirm={refreshHotels} {...editModalProps} />
            <div className="mt-16">
                <h2 className="font-TradeGothic font-bold text-3xl text-slate-600">List Off Hotels</h2>
                <div className="mt-8">
                    <Loading isPendding={isPendding}>
                        {hotels.length > 0 ? (
                            <>
                                <Table>
                                    <TableHead items={["ID", "HoteltName", "Price", "Score", "Date", "Time", "Rooms", "Actions"]} />
                                    <TableBody>
                                        {paginatedHotels.map((hotel, index) => {
                                            const addToIndexNumber = (paginationOptions.currentPage - 1) * paginationOptions.showCount;
                                            return (
                                                <tr key={hotel.id} className="bg-white border-b">
                                                    <td className="px-6 py-4">{index + 1 + addToIndexNumber}</td>
                                                    <td className="px-6 py-4">{hotel?.hotelName}</td>
                                                    <td className="px-6 py-4">${hotel?.price}</td>
                                                    <td className="px-6 py-4">{hotel?.score}</td>
                                                    <td className="px-6 py-4">{hotel?.checkInDate}</td>
                                                    <td className="px-6 py-4">{hotel?.checkInTime}</td>
                                                    <td className="px-6 py-4">{hotel?.rooms} room</td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex gap-x-3">
                                                            <button onClick={() => showEditModal({ hotel })}>
                                                                <Svg iconID="edit" className="w-6 h-6 text-sky-600" />
                                                            </button>
                                                            <button onClick={() => onRemoveHotel(hotel.id)}>
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
            <QuestionModal message="You sure about remove this hotel from database?" isShow={isShowRemoveHotelModal} onClose={onCloseRemoveModal} onAccept={() => removeHotelAction(null, [removableHotelID.current])} />
        </PageTransition>
    );
}
