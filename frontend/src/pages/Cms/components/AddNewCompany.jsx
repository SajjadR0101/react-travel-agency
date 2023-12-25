import React, { useCallback, useMemo } from "react";
import GridSystem from "../../../components/GridSystem/GridSystem";
import Input from "../../../components/Form/Input";
import { requiredValidator, minValidator, maxValidator, emailValidator, phoneValidator } from "../../../validator/rules";
import useForm from "../../../hooks/useForm";
import FileInput from "../../../components/Form/FileInput";
import useFetch from "../../../hooks/useFetch";
import useUploader from "../../../hooks/useUploader";
import { useContext } from "react";
import ToastContext from "../../../context/ToastContext";
import CmsButton from "./CmsButton";

export default function AddNewCompany({ onAddCompany }) {
    const [formState, onInput, clearInput] = useForm(["company-name"]);

    const { showToast } = useContext(ToastContext);

    const [logo, setLogoHandler, makeEmptyLogo] = useUploader(undefined, () => showToast("warning", "Type of profile only png or jpeg."));

    const [addNewCompanyAction, isFetching] = useFetch({
        url: "https://node-travel-agency.liara.run/api/companies",
        method: "POST",
        contentType: true,
        successCallback: () => {
            showToast("success", "Company add to database successfully.");
            onAddCompany();
            clearInput();
            makeEmptyLogo();
        },
        errorCallback: () => showToast("error", "Something wrong, please try latter."),
    });

    const onChangeLogo = useCallback((event) => {
        setLogoHandler(event, 250, 250);
    }, []);

    const addCompnay = (event) => {
        event.preventDefault();

        if (formState.isFormValid && logo) {
            const { "company-name": name } = formState.form;

            addNewCompanyAction({ name: name.value, image: logo });
        } else {
            showToast("warning", "Please Enter Valid Data.");
        }
    };

    return (
        <>
            <div>
                <h3 className="font-TradeGothic font-bold text-3xl text-slate-600 mb-6">Add New Company</h3>
                <form>
                    <GridSystem parentClaasName="grid grid-cols-3 gap-6">
                        <Input type="text" id="company-name" label="Company Name" wrapperClassName="col-span-1" errormessage="The minimum of company name is 3 character" validations={useMemo(() => [requiredValidator(), minValidator(3), maxValidator(20)], [])} onInput={onInput} />
                        <FileInput className="cms-btn h-full" id="company-logo" title="Upload company logo" onChange={onChangeLogo} uploaded={!!logo} />
                        <CmsButton isLoading={isFetching} className='max-w-[200px] row-start-2' onClick={addCompnay}>Add Company</CmsButton>
                    </GridSystem>
                </form>
            </div>
        </>
    );
}
