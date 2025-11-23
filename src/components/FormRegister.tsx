import z from "zod";
import { useFormRegister } from "../hooks/useFormRegister";
import { InputRegister } from "./form-controls-register/InputRegister";
import { zodResolver } from "./resolvers/zodResolver";

const schema = z.object({
    name: z.string().min(3, "Username must be at least 3 chars"),
    email: z.email("email should be a valid mail id"),
    age: z.number().min(1, "Age must be > 0")
});


export const FormRegister = () => {
    const
        {
            register,
            reset,
            handleSubmit,
            isSubmitting
        } = useFormRegister({
            initialValues: { name: "", email: "", age: 0 },
            validate: zodResolver(schema),
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