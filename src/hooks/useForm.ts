import { useRef, useState } from "react"
import type { FormOptions } from "../types/FormOptionsType"
import type { FormErrorsType } from "../types/FormErrorsType"
import { buildEmptyErrorsFromValues, builtAllFalseTouchedFormInputs } from "../utils/helper"
import type { FormTouchType } from "../types/FormTouchType"


export const useForm = <T>(props: FormOptions<T>) => {
    const [values, setValues] = useState<T>(props?.initialValues)
    const [errors, setErrors] = useState<FormErrorsType<T>>(buildEmptyErrorsFromValues(props.initialValues))
    const [touched, setTouched] = useState<FormTouchType<T>>(builtAllFalseTouchedFormInputs(props.initialValues))
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const initialValuesRef = useRef<T>(props?.initialValues)
    const validateOnRef = useRef<string>(props?.validateOn || "submit")


}