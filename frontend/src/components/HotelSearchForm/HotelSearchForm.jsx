import React, { memo, useMemo } from "react";
import Input from "../Form/Input";
import DateInput from "../Form/DateInput";
import Select from "../Form/Select";
import Svg from "../Svg/Svg";
import useForm from '../../hooks/useForm'
import { requiredValidator, minValidator, maxValidator, dateValidator } from "../../validator/rules";

export default memo(function HotelSearchForm({ className }) {

    const [formState, onInput] = useForm(['destination', 'check-in', 'check-out', 'rooms'])

    return (
        <div className={`z-10 ${className}`}>
            <Input label="Enter Destination" id="destination" wrapperClassName="lg:col-span-3" afterIcon={<Svg iconID="bed" className="w-6 h-6" />} errorMessage='The minimum of destination is 5 character' onInput={onInput} validations={useMemo(() => [requiredValidator(), minValidator(3)], [])} />
            <DateInput label="Check In" wrapperClassName="lg:col-span-2" id="check-in" afterIcon={<Svg iconID="calender" className="w-6 h-6" />} onInput={onInput} validations={useMemo(() => [requiredValidator(), dateValidator()], [])} />
            <DateInput label="Check Out" wrapperClassName="lg:col-span-2" id="check-out" afterIcon={<Svg iconID="calender" className="w-6 h-6" />} onInput={onInput} validations={useMemo(() => [requiredValidator(), dateValidator()], [])} />
            <Select label="Rooms & Guests" id='rooms' options={[{title: "1 room, 2 guests", value: '"1 room, 2 guests"'}, {title: "2 room, 4 guests", value: '"2 room, 4 guests"'}, {title: "optional", value: '"optional"'}]} wrapperClassName="lg:col-span-2" onInput={onInput} validations={useMemo(() => [requiredValidator()], [])} />
        </div>
    );
}
)