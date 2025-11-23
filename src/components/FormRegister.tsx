import { useFormRegister } from "../hooks/useFormRegister";
import { InputRegister } from "./form-controls-register/InputRegister";

export const FormRegister = () => {
    const
        {
            register,
            reset,
            handleSubmit,
            isSubmitting
        } = useFormRegister({
            initialValues: { name: "", email: "", age: 0 },
            validate: (values) => {
                return {
                    name: values.name ? undefined : "Name required",
                    email: values.email ? undefined : "Email required",
                    age: values.age > 0 ? undefined : "Age must be greater than 0",
                };
            },
            validateOn: 'blur',
            onSubmit: (values) => {
                // API CALL HAPPENS HERE
                console.log({ values })
                window.alert("Your form has been submitted successfully!");
            }
        })

    return (
        <>
            {isSubmitting ? (
                <p>Loading...</p>
            ) : (
                <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
                    <InputRegister
                        {...register("name")}
                        type="text"
                    />

                    <InputRegister
                        {...register("email")}
                        type="text"
                    />

                    <InputRegister
                        {...register("age")}
                        type="number"
                    />

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={reset}
                            className="text-black bg-neutral-secondary-medium border border-default-medium px-4 py-2 rounded"
                        >
                            Reset
                        </button>

                        <button
                            type="submit"
                            className="text-black bg-neutral-secondary-medium border border-default-medium px-4 py-2 rounded"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            )}
        </>
    )
}