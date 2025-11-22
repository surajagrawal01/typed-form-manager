import type { FormErrorsType } from "./FormErrorsType"


export type FormOptions<T> = {
    initialValues: T,
    validate?: (values: T) => FormErrorsType<T>,
    validateOn?: 'change' | 'blur' | 'submit',
    onSubmit?: (values: T) => void | Promise<void>
}