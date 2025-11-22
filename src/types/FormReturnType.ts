import type { FormErrorsType } from "./FormErrorsType"

export type FormReturnType<T> = {
    values: T,
    errors: FormErrorsType<T>,
    touched?: Partial<Record<keyof T, boolean>>,
    reset: () => void,
    handleChange: (name: keyof T, value: T[keyof T]) => void,
    handleSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => void | Promise<void>,
    handleBlur: (name: keyof T) => void,
    setErrors: (newErrors: FormErrorsType<T>) => void,
    setFieldValue: (name: keyof T, value: T[keyof T]) => void,
    isSubmitting: boolean
}