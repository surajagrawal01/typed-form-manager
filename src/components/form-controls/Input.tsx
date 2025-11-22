interface InputTypeProps<TFormValues, TName extends keyof TFormValues> {
    label: string;
    name: TName;
    value: TFormValues[TName];
    type?: string;
    error?: string;
    onChange: (name: TName, value: TFormValues[TName]) => void;
    onBlur: (name: TName) => void;
}

export const Input = <
    TFormValues extends Record<string, any>,
    TName extends keyof TFormValues
>({ label, value, onChange, onBlur, name, type, error }: InputTypeProps<TFormValues, TName>) => {
    return (
        <>
            <div className="mb-5">
                <label className="block mb-2.5 text-sm font-medium text-heading">
                    {label}
                </label>

                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(name, e.target.value as any)}
                    onBlur={() => onBlur(name)}
                    className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                />

                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
        </>
    )
}