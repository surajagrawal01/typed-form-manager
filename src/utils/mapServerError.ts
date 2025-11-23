import type { FormErrorsType } from "../types/FormErrorsType";

export function mapServerErrors<T>(
    error: unknown,
    values: T
): FormErrorsType<T> | null {
    // Step 1: Check error is an object
    if (typeof error !== "object" || error === null) return null;

    // Step 2: Check if it has "response"
    if (!("response" in error)) return null;

    const response: any = (error as any).response;

    if (typeof response !== "object" || response === null) return null;

    // Step 3: Check if response.errorMsg exists
    if (!("errorMsg" in response)) return null;

    const serverErrors = response.errorMsg;

    if (typeof serverErrors !== "object" || serverErrors === null) return null;

    // Step 4: Build empty errors matching T
    const mapped: FormErrorsType<T> = {} as FormErrorsType<T>;
    const formKeys = Object.keys(values as any) as (keyof T)[];

    // Step 5: Copy only matching keys
    for (const key of formKeys) {
        mapped[key] = serverErrors[key] || undefined;
    }

    return mapped;
}
