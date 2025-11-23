import { useRef, useState } from "react"
import type { FormOptions } from "../types/FormOptionsType"
import type { FormErrorsType } from "../types/FormErrorsType"
import { buildEmptyErrorsFromValues, builtAllFalseTouchedFormInputs, isErrorsEmpty, runAllValidations, validateField } from "../utils/helper"
import type { FormTouchType } from "../types/FormTouchType"
import { mapServerErrors } from "../utils/mapServerError"
import type { RegisterReturnType } from "../types/RegisterRetunType"
import type { FormRegisterReturnType } from "../types/FormRegisterReturnType"

export const normalizeFieldValue = <T>(
    name: keyof T,
    value: unknown,
    initialValues: T
): T[keyof T] => {
    const originalValue = initialValues[name];

    // CASE 1: Original field is a number → convert safely
    if (typeof originalValue === "number") {
        // allow empty input → convert to empty string (user still typing)
        if (value === "") return "" as T[keyof T];

        const num = Number(value);

        // If it's not a valid number → return string as-is (user typing invalid char)
        if (Number.isNaN(num)) return value as T[keyof T];

        return num as T[keyof T];
    }

    // CASE 2: Original is boolean
    if (typeof originalValue === "boolean") {
        if (value === "true") return true as T[keyof T];
        if (value === "false") return false as T[keyof T];
        return originalValue as T[keyof T]; // fallback
    }

    // CASE 3: Default → return the string value
    return value as T[keyof T];
};


export const useFormRegister = <T>(props: FormOptions<T>): FormRegisterReturnType<T> => {
    const [values, setValues] = useState<T>(props?.initialValues)
    const [errors, setErrors] = useState<FormErrorsType<T>>(buildEmptyErrorsFromValues(props.initialValues))
    const [touched, setTouched] = useState<FormTouchType<T>>(builtAllFalseTouchedFormInputs(props.initialValues))
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const initialValuesRef = useRef<T>(props?.initialValues)
    const validateOnRef = useRef<string>(props?.validateOn || "submit")

    const handleChange = (name: keyof T, value: T[keyof T]): void => {
        const normalizedValue = normalizeFieldValue(name, value, initialValuesRef.current);

        const newValues = { ...values, [name]: normalizedValue };
        setValues(newValues);

        if (props?.validate && validateOnRef.current === "change") {
            const fieldError = validateField({
                name,
                values: newValues,
                validate: props.validate
            });

            setErrors({ ...errors, [name]: fieldError });
        }
    };

    const handleBlur = (name: keyof T) => {
        const updatedTouch = { ...touched, [name]: true }
        setTouched(updatedTouch)
        if (props?.validate) {
            if (validateOnRef.current == "blur") {
                const fieldError = validateField({ name, values, validate: props.validate })
                setErrors({ ...errors, [name]: fieldError })
            }
        }
    }


    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            setIsSubmitting(true)
            let isInputCorrect = false
            if (props?.validate) {
                const validate = props?.validate
                const errors = runAllValidations(values, validate)
                isInputCorrect = isErrorsEmpty(errors)
                if (!isInputCorrect) {
                    setErrors(errors)
                    setIsSubmitting(false)
                    return;
                }
            }
            if (isInputCorrect && props?.onSubmit) {
                const result = await props?.onSubmit(values)
                console.log({ result, check: "success" })
                setIsSubmitting(false)
            }
        } catch (error) {
            const mappedErrors = mapServerErrors(error, values);

            if (mappedErrors) {
                setErrors(mappedErrors);
            }

            setIsSubmitting(false);
        }
    }

    const handleUpdateFieldValue = (name: keyof T, value: T[keyof T]) => {
        const updatedValues = { ...values, [name]: value }
        setValues(updatedValues)
    }

    const handleSetErrors = (newErrors: FormErrorsType<T>) => {
        const updatedErrors = { ...errors, ...newErrors }
        setErrors(updatedErrors)
    }

    const handleReset = () => {
        setValues(initialValuesRef.current)
        setErrors(buildEmptyErrorsFromValues(initialValuesRef.current))
        setTouched(builtAllFalseTouchedFormInputs)
        setIsSubmitting(false)
    }

    const register = (name: keyof T): RegisterReturnType<T> => {
        return ({
            label: name,
            name: name,
            value: values[name],
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleChange(name, e.target.value as any),
            onBlur: () => handleBlur(name),
            error: errors[name]
        })
    }

    return {
        register,
        handleSubmit,
        reset: handleReset,
        setErrors: handleSetErrors,
        setFieldValue: handleUpdateFieldValue,
        isSubmitting,
    }
}