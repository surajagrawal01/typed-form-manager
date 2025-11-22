import { useRef, useState } from "react"
import type { FormOptions } from "../types/FormOptionsType"
import type { FormErrorsType } from "../types/FormErrorsType"
import { buildEmptyErrorsFromValues, builtAllFalseTouchedFormInputs, isErrorsEmpty, runAllValidations, validateField } from "../utils/helper"
import type { FormTouchType } from "../types/FormTouchType"
import { mapServerErrors } from "../utils/mapServerError"
import type { FormReturnType } from "../types/FormReturnType"


export const useForm = <T>(props: FormOptions<T>): FormReturnType<T> => {
    const [values, setValues] = useState<T>(props?.initialValues)
    const [errors, setErrors] = useState<FormErrorsType<T>>(buildEmptyErrorsFromValues(props.initialValues))
    const [touched, setTouched] = useState<FormTouchType<T>>(builtAllFalseTouchedFormInputs(props.initialValues))
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const initialValuesRef = useRef<T>(props?.initialValues)
    const validateOnRef = useRef<string>(props?.validateOn || "submit")

    const handleChange = (name: keyof T, value: T[keyof T]): void => {
        const newValues = { ...values, [name]: value }
        setValues(newValues)
        if (props?.validate) {
            if (validateOnRef.current == "change") {
                const fieldError = validateField({ name, values: newValues, validate: props.validate })
                setErrors({ ...errors, [name]: fieldError })
            }
        }
    }

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
                setIsSubmitting(false)
                console.log({ result: "Success" })
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


    return {
        values,
        errors,
        touched,
        reset: handleReset,
        handleChange,
        handleBlur,
        handleSubmit,
        setErrors: handleSetErrors,
        setFieldValue: handleUpdateFieldValue,
        isSubmitting
    }
}