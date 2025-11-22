import { useForm } from "../hooks/useForm"
import { Input } from "./form-controls/Input";

export const Form = () => {
    const
        { values,
            errors,
            reset,
            handleChange,
            handleSubmit,
            handleBlur,
            isSubmitting
        } = useForm({
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
                    <Input
                        label="Name"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.name}
                    />

                    <Input
                        label="Email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.email}
                    />

                    <Input
                        label="Age"
                        name="age"
                        value={values.age}
                        type="number"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.age}
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