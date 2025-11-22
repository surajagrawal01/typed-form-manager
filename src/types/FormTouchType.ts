
type MakingBoolean<T> = {
    [k in keyof T]: boolean
}

export type FormTouchType<T> = Partial<MakingBoolean<T>>;