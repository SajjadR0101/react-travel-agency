import React, { memo, useMemo } from "react";
import Input from "../Form/Input";
import DateInput from "../Form/DateInput";
import Select from "../Form/Select";
import Svg from "../Svg/Svg";
import useForm from '../../hooks/useForm'
import { requiredValidator, minValidator, maxValidator, dateValidator } from "../../validator/rules";

export default memo(function FlightsSearchForm({ className }) {

    const [formState, onInput] = useForm(['from', 'to', 'trip', 'return'])

    return (
        <div className={className}>
            <Input label="Flight from" id="from" wrapperClassName="col-span-2" afterIcon={<Svg iconID="swap" className="w-6 h-6" />} errorMessage='The minimum of field is 3 character' onInput={onInput} validations={useMemo(() => [requiredValidator(), minValidator(3)], [])} />
            <Input label="Flight to" id="to" wrapperClassName="col-span-2" afterIcon={<Svg iconID="swap" className="w-6 h-6" />} errorMessage='The minimum of field is 3 character' onInput={onInput} validations={useMemo(() => [requiredValidator(), minValidator(3)], [])} />
            <div className="col-span-2 sm:col-span-1">
                <Select label="Trip" id='trip' options={[{title: "Return", value: 'return'}, {title: "Depart", value: 'depart'}, {title: 'Other', value: 'other'}]} className placeholder="Select" onInput={onInput} validations={useMemo(() => [requiredValidator()], [])} />
            </div>
            <DateInput label="Return" wrapperClassName="col-span-2" id="return" onInput={onInput} validations={useMemo(() => [requiredValidator(), dateValidator()], [])} />
        </div>
    );
}
)