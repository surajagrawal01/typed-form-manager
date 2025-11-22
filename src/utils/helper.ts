import type { FormErrorsType } from "../types/FormErrorsType";
import type { FormTouchType } from "../types/FormTouchType";

export const getFieldValue = <T>({ values, name }: { values: T, name: keyof T }): T[keyof T] => {
    return values[name]
}

export const setFieldValueImmutable = <T>({ values, name, value }: { values: T, name: keyof T, value: T[keyof T] }): T => {
    const newValues = { ...values, [name]: value }
    return newValues;
}

export const buildEmptyErrorsFromValues = <T>(values: T): FormErrorsType<T> => {
    const emptyErrors: FormErrorsType<T> = {} as FormErrorsType<T>
    for (const key in values) {
        emptyErrors[key] = undefined
    }

    return emptyErrors;
}

export const builtAllFalseTouchedFormInputs = <T>(values: T): FormTouchType<T> => {
    const allFalseTouched: FormTouchType<T> = {} as FormTouchType<T>
    for (const key in values) {
        allFalseTouched[key] = false
    }

    return allFalseTouched;
}

export const mergeErrors = <T>(current: FormErrorsType<T>, newErrors: FormErrorsType<T>): FormErrorsType<T> => {
    return { ...current, ...newErrors }
}

export const isErrorsEmpty = <T>(errors: FormErrorsType<T>): boolean => {
    for (const key in errors) {
        if (typeof errors[key] === "string") return false;
    }
    return true;
}

export const runAllValidations = <T>(values: T, validate: (values: T) => FormErrorsType<T>): FormErrorsType<T> => {
    const emptyErrors = buildEmptyErrorsFromValues(values)
    const errors = validate(values)
    if (errors === undefined || errors === null || Object.keys(errors).length === 0) {
        return emptyErrors;
    }
    return { ...emptyErrors, ...errors };
}

export const validateField = <T>({ name, values, validate }: { name: keyof T, values: T, validate: (values: T) => FormErrorsType<T> }): string | undefined => {
    const errors: FormErrorsType<T> = runAllValidations(values, validate)
    const errorValue: string | undefined = errors[name]
    return errorValue;
}
