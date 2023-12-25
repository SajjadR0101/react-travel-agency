import React, { useContext, useRef } from "react";
import PageTransition from "../../../components/PageTransition/PageTransition";
import Loading from "../../../components/Loading/Loading";
import Table from "../components/Table";
import TableHead from "../components/TableHead";
import TableBody from "../components/TableBody";
import useDataFetch from "../../../hooks/useDataFetch";
import Svg from "../../../components/Svg/Svg";
import QuestionModal from "../../../components/QuestionModal/QuestionModal";
import Toast from "../../../components/Toast/Toast";
import useModal from "../../../hooks/useModal";
import useFetch from "../../../hooks/useFetch";
import useToast from "../../../hooks/useToast";
import Alert from "../components/Alert";
import ToastContext from "../../../context/ToastContext";
import usePagination from "../../../hooks/usePagination";
import Pagination from "../components/Pagination";

export default function NewsLatter() {
    const removableNewsLatterID = useRef(null);

    const [newslatters, refreshNewsLatter, isPendding] = useDataFetch("https://node-travel-agency.liara.run/api/newslatter");

    const [isShowRemoveModal, showRemoveModal, onCloseRemoveModal] = useModal();

    const { showToast } = useContext(ToastContext);

    const [removeNewslatterAction] = useFetch({
        url: "https://node-travel-agency.liara.run/api/newslatter/",
        method: "DELETE",
        successCallback: () => {
            showToast("success", "Newslatter remove from database successfully.");
            refreshNewsLatter();
        },
        errorCallback: () => showToast("error", "Something wrong, please try latter."),
    });

    const [paginatedNewsLatter, paginationOptions] = usePagination(newslatters, 10);

    const onRemove = (newslatterID) => {
        showRemoveModal();
        removableNewsLatterID.current = newslatterID;
    };

    return (
        <PageTransition>
            <h2 className="font-TradeGothic font-bold text-3xl text-slate-600">List Off NewsLatter</h2>
            <div className="mt-8">
                <Loading isPendding={isPendding}>
                    {newslatters.length > 0 ? (
                        <>
                            <Table>
                                <TableHead items={["ID", "Email", "Actions"]} />
                                <TableBody>
                                    {paginatedNewsLatter.map((newslatter, index) => {
                                        const addToIndexNumber = (paginationOptions.currentPage - 1) * paginationOptions.showCount;
                                        return (
                                            <tr key={newslatter?.id} className="bg-white border-b">
                                                <td className="px-6 py-4">{index + 1 + addToIndexNumber}</td>
                                                <td className="px-6 py-4">{newslatter?.email}</td>
                                                <td className="px-6 py-4">
                                                    <button onClick={() => onRemove(newslatter?.id)}>
                                                        <Svg iconID="remove" className="w-6 h-6 text-rose-600" />
                                                    </button>
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
            <QuestionModal message="You sure about removing this newslatter from database?" isShow={isShowRemoveModal} onClose={onCloseRemoveModal} onAccept={() => removeNewslatterAction(null, [removableNewsLatterID.current])} />
        </PageTransition>
    );
}
