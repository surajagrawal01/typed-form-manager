import type { FormErrorsType } from "./FormErrorsType"
import type { RegisterReturnType } from "./RegisterRetunType"

export type FormRegisterReturnType<T> = {
    register: (name: keyof T) => RegisterReturnType<T>
    touched?: Partial<Record<keyof T, boolean>>,
    reset: () => void,
    handleSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => void | Promise<void>,
    setErrors: (newErrors: FormErrorsType<T>) => void,
    setFieldValue: (name: keyof T, value: T[keyof T]) => void,
    isSubmitting: boolean
}