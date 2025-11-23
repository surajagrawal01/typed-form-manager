import type { ZodSchema } from "zod";
import { buildEmptyErrorsFromValues } from "../../utils/helper";
import type { FormErrorsType } from "../../types/FormErrorsType";
import { mapZodIssuesToFormErrors } from "./mapZodIssuesToFormErrors";

export const zodResolver =
    <T>(schema: ZodSchema<T>) =>
        (values: T): FormErrorsType<T> => {
            const emptyErrors = buildEmptyErrorsFromValues(values);

            const result = schema.safeParse(values);

            if (result.success) return emptyErrors;

            const mapped = mapZodIssuesToFormErrors<T>(
                result.error.issues,
                emptyErrors
            );

            return { ...emptyErrors, ...mapped };
        };


