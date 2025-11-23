export interface RegisterReturnType<T> {
    label: keyof T,
    name: keyof T,
    value: T[keyof T],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onBlur: () => void,
    error: string | undefined
}