import type { ZodIssue } from "zod";
import type { FormErrorsType } from "../../types/FormErrorsType";


export const mapZodIssuesToFormErrors = <T>(
    issues: ZodIssue[],
    emptyErrors: FormErrorsType<T>
) => {

    const errors = emptyErrors;

    for (const issue of issues) {
        const field = issue.path[0] as keyof T;
        const message = issue.message;
        errors[field] = message;
    }

    return errors;

}