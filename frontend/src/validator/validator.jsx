import rules from './rules'
import { validatorTestersObj as validatorTester } from "./rules";

const validator = (validations, value) => {

    let isValid = false

    for (let validation of validations) {
        if (!validatorTester[validation.value]({...validation, value})) {
            isValid = false
            break;
        }

        isValid = true
    }

    return isValid
}

export default validator;