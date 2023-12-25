import React, { useContext, useRef } from "react";
import PageTransition from "../../../components/PageTransition/PageTransition";
import Loading from "../../../components/Loading/Loading";
import useDataFetch from "../../../hooks/useDataFetch";
import Alert from "../components/Alert";
import AddNewCompany from "../components/AddNewCompany";
import CompanyBox from "../components/CompanyBox";
import GridSystem from "../../../components/GridSystem/GridSystem";
import QuestionModal from "../../../components/QuestionModal/QuestionModal";
import Toast from "../../../components/Toast/Toast";
import useModal from "../../../hooks/useModal";
import useFetch from "../../../hooks/useFetch";
import useToast from "../../../hooks/useToast";
import ToastContext from "../../../context/ToastContext";

export default function Companies() {
    const removableCompanyID = useRef(null);

    const { showToast } = useContext(ToastContext);

    const [companies, refreshCompanies, isPendding] = useDataFetch("https://node-travel-agency.liara.run/api/companies");

    const [isShowRemoveCompanyModal, showRemoveCompanyModal, onCloseRemoveModal] = useModal();

    const [removeCompanyAction] = useFetch({
        url: "https://node-travel-agency.liara.run/api/companies/",
        method: "DELETE",
        successCallback: () => {
            showToast("success", "Company remove from database successfully.");
            refreshCompanies();
        },
        errorCallback: () => showToast("error", "Something wrong, please try latter."),
    });

    const onRemoveCompany = (companyID) => {
        showRemoveCompanyModal();
        removableCompanyID.current = companyID;
    };

    return (
        <PageTransition>
            <AddNewCompany onAddCompany={refreshCompanies} />
            <div className="mt-16">
                <h2 className="font-TradeGothic font-bold text-3xl text-slate-600">List Off Companies</h2>
                <div className="mt-8">
                    <Loading isPendding={isPendding}>
                        {companies.length > 0 ? (
                            <GridSystem parentClaasName="grid grid-cols-4 gap-4">
                                {companies.map((company) => (
                                    <CompanyBox key={company.id} {...company} onRemove={() => onRemoveCompany(company.id)} />
                                ))}
                            </GridSystem>
                        ) : (
                            <Alert />
                        )}
                    </Loading>
                </div>
            </div>
            <QuestionModal message="You sure about removing this company from database?" isShow={isShowRemoveCompanyModal} onClose={onCloseRemoveModal} onAccept={() => removeCompanyAction(null, [removableCompanyID.current])} />
        </PageTransition>
    );
}
