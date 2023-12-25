import React, { useRef, useContext, useState, useEffect } from "react";
import PageTransition from "../../../components/PageTransition/PageTransition";
import Loading from "../../../components/Loading/Loading";
import Table from "../components/Table";
import TableHead from "../components/TableHead";
import TableBody from "../components/TableBody";
import useDataFetch from "../../../hooks/useDataFetch";
import AddNewUser from "../components/AddNewUser";
import Svg from "../../../components/Svg/Svg";
import QuestionModal from "../../../components/QuestionModal/QuestionModal";
import Toast from "../../../components/Toast/Toast";
import useFetch from "../../../hooks/useFetch";
import useModal from "../../../hooks/useModal";
import Alert from "../components/Alert";
import UserProfile from "../../../components/UserProfile/UserProfile";
import EditUserModal from "../components/EditUserModal";
import ToastContext from "../../../context/ToastContext";
import Pagination from "../components/Pagination";
import usePagination from "../../../hooks/usePagination";
import SerachUsers from "../components/SerachUsers";

export default function Users() {
    const removableUserToken = useRef(null);

    const [users, refreshUsers, isPendding] = useDataFetch("https://node-travel-agency.liara.run/api/users");

    const [isShowRemoveUserModal, showRemoveUserModal, onCloseRemoveModal] = useModal();
    const [isShowEditModal, showEditModal, onCloseEditModal, editModalProps] = useModal();

    const { showToast } = useContext(ToastContext);

    const [removeUserAction] = useFetch({
        url: "https://node-travel-agency.liara.run/api/users/",
        method: "DELETE",
        successCallback: () => {
            showToast("success", "User remove from database successfully.");
            refreshUsers();
        },
        errorCallback: () => showToast("error", "Something wrong, please try latter."),
    });

    const [paginatedUsers, paginationOptions] = usePagination(users, 5);

    const onRemoveUser = (userID) => {
        showRemoveUserModal();
        removableUserToken.current = userID;
    };

    return (
        <PageTransition>
            <AddNewUser onAddUser={refreshUsers} />
            <EditUserModal isShow={isShowEditModal} onClose={onCloseEditModal} onConfirm={refreshUsers} {...editModalProps} />
            <div className="mt-16">
                <h2 className="font-TradeGothic font-bold text-3xl text-slate-600">List Off Users</h2>
                <div className="mt-8">
                    <Loading isPendding={isPendding}>
                        {paginatedUsers.length > 0 ? (
                            <>
                                <SerachUsers users={users} onSelectUser={showEditModal} />
                                <Table>
                                    <TableHead items={["ID", "Profile", "Role", "Username", "Emial", "Phone", "Password", "Actions"]} />
                                    <TableBody>
                                        {paginatedUsers.map((user, index) => {
                                            const addToIndexNumber = (paginationOptions.currentPage - 1) * paginationOptions.showCount;
                                            return (
                                                <tr key={user.id} className="bg-white border-b">
                                                    <td className="px-6 py-4">{index + 1 + addToIndexNumber}</td>
                                                    <td className="px-6 py-4">
                                                        <UserProfile src={user?.profile} username={user?.username} />
                                                    </td>
                                                    <td className="px-6 py-4">{user?.role.toUpperCase()}</td>
                                                    <td className="px-6 py-4">{user?.username}</td>
                                                    <td className="px-6 py-4">{user?.email}</td>
                                                    <td className="px-6 py-4">{user?.phone}</td>
                                                    <td className="px-6 py-4">{user?.password}</td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex gap-x-3">
                                                            <button onClick={() => showEditModal({ userInfo: user })}>
                                                                <Svg iconID="edit" className="w-6 h-6 text-sky-600" />
                                                            </button>
                                                            <button onClick={() => onRemoveUser(user?.token)}>
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
            <QuestionModal message="You sure about removing this user from database?" isShow={isShowRemoveUserModal} onClose={onCloseRemoveModal} onAccept={() => removeUserAction(null, [removableUserToken.current])} />
        </PageTransition>
    );
}
