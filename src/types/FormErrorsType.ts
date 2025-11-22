
type MakingStringOrUndefined<T> = {
    [k in keyof T]: string | undefined
}

export type FormErrorsType<T> = MakingStringOrUndefined<T>;