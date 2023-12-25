import React, { useCallback, useReducer } from "react";

const formReducer = (state, action) => {
    switch (action.type) {
        case "change-form": {
            state.form[action.id].value = action.value;
            state.form[action.id].isValid = action.isValid;
            if (action.setValue) {
                state.form[action.id].setValue = action.setValue;
            }
            state.isFormValid = Object.entries(state.form).every((form) => form[1].isValid);
            return {
                ...state,
            };
        }

        case "clear-all": {
            for (let form in state.form) {
                state.form[form].value = "";
                state.form[form].isValid = false;
                const { setValue } = state.form[form]
                setValue && setValue('')
            }
            state.isFormValid = false;

            return { ...state };
        }

        default: {
            return { ...state };
        }
    }
};

export default function useForm(formIDs) {
    const [formState, dispatch] = useReducer(formReducer, {
        form: Object.fromEntries(formIDs.map((id) => [id, { value: "", setValue: null, isValid: false }])),
        isFormValid: false,
    });

    const onInput = useCallback((id, value, setValue = null, isValid) => {
        dispatch({ type: "change-form", id, value, setValue, isValid });
    }, [])

    const clearAllInput = () => {
        dispatch({ type: "clear-all" });
    };

    return [formState, onInput, clearAllInput];
}
