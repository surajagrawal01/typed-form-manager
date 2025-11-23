import { ErrorMessage } from "../common/ErrorMessage";

interface InputTypeProps {
    label: string;
    name: string;
    value: string | number;
    type?: string;
    error?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: () => void;
}

export const InputRegister = ({ label, value, onChange, onBlur, type, error }: InputTypeProps) => {
    return (
        <>
            <div className="mb-5">
                <label className="block mb-2.5 text-sm font-medium text-heading">
                    {label}
                </label>

                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                />

                {error && <ErrorMessage message={error} />}
            </div>
        </>
    )
}