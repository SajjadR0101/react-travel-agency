import { testEmail, testPhone, testCard, testDate, testTime } from "./regex"

const requiredValue = 'REQUIRED_VALUE'
const minLength = 'MIN_VALUE'
const maxLength = 'MAX_VALUE'
const emailValue = 'EMAIL_VALUE'
const phoneValue = 'PHONE_VALUE'
const cardValue = 'CARD_VALUE'
const dateValue = 'DATE_VALUE'
const timeValue = 'TIME_VALUE'
const numberValue = 'NUMBER_VALUE'

const requiredValidator = () => ({value: requiredValue})
const minValidator = min => ({value: minLength, min})
const maxValidator = max => ({value: maxLength, max})
const emailValidator = () => ({value: emailValue})
const phoneValidator = () => ({value: phoneValue})
const cardValidator = () => ({value: cardValue})
const dateValidator = () => ({value: dateValue})
const timeValidator = () => ({value: timeValue})
const numberValidator = () => ({value: numberValue})

const requiredValidatorTester = ({value}) => value.length > 0
const minValidatorTester = ({value, min}) => value.length > min
const maxValidatorTester = ({value, max}) => value.length < max
const emailValidatorTester = ({value}) => testEmail(value)
const phoneValidatorTester = ({value}) => testPhone(value)
const cardValidatorTester = ({value}) => testCard(value)
const dateValidatorTester = ({value}) => testDate(value)
const timeValidatorTester = ({value}) => testTime(value)
const numberValidatorTester = ({value}) => Number.isInteger(+value) && +value > 0

const validatorTestersObj = {
    [requiredValue]: requiredValidatorTester,
    [minLength]: minValidatorTester,
    [maxLength]: maxValidatorTester,
    [emailValue]: emailValidatorTester,
    [phoneValue]: phoneValidatorTester,
    [cardValue]: cardValidatorTester,
    [dateValue]: dateValidatorTester,
    [timeValue]: timeValidatorTester,
    [numberValue]: numberValidatorTester,
}

export { requiredValidator, minValidator, maxValidator, emailValidator, phoneValidator, cardValidator, dateValidator, timeValidator, numberValidator }
export { validatorTestersObj }
export default { requiredValue, minLength, maxLength, emailValue, phoneValue, cardValue, dateValue, timeValue, numberValue }
