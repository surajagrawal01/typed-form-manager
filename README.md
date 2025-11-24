📦 Custom React Form Hook (TypeScript) —

A lightweight, type-safe, reusable form management library built using React + TypeScript, inspired by Formik and React-Hook-Form — but fully custom and minimal.

---

## Folder Structure
<img width="769" height="712" alt="image" src="https://github.com/user-attachments/assets/5445ff98-bfd3-44bc-8949-c865713857db" />

---

## Module Descriptions

### hooks/useForm.ts  
- Core form logic  
- Manages: values, errors, touched, isSubmitting  
- Provides: handleChange, handleBlur, handleSubmit, reset  
- Supports `validateOn: "change" | "blur" | "submit"`  
- Field + form validation  
- Async submit lifecycle  
- Integrates with mapServerErrors  

### types/
TypeScript definitions for the entire library.

- **FormOptionsType.ts**  
  - initialValues  
  - validate  
  - validateOn  
  - onSubmit  

- **FormErrorsType.ts**  
  - Type-safe error shape inferred from values  

- **FormReturnType.ts**  
  - values  
  - errors  
  - touched  
  - handleChange  
  - handleBlur  
  - handleSubmit  
  - reset  
  - setErrors  
  - setFieldValue  
  - isSubmitting
  
- **FormRegisterReturnType.ts**
  - register: function to register a form field with the given name and validation
  - reset: function to reset the form values and errors
  - handleSubmit: form submit handler
  - setErrors: function to manually set form errors
  - setFieldValue: function to set the value of a specific field
  - isSubmitting: boolean flag indicating if the form is currently submitting 

### utils/helper.ts  
Internal utility helpers:
- buildEmptyErrorsFromValues  
- mergeErrors  
- isErrorsEmpty  
- setFieldValueImmutable  
- getFieldValue  
- runAllValidations  
- validateField  

### utils/mapServerErrors.ts  
- Maps API/server errors → FormErrorsType  
- Filters unknown fields  
- Ensures strict typing  
- Makes API error handling consistent  

---

## Current Features
- [x] Fully type-safe form values  
- [x] Strongly typed errors  
- [x] validateOn: "change" | "blur" | "submit"  
- [x] Field-level + form-level validation  
- [x] Async submit lifecycle  
- [x] Reset support  
- [x] Server error mapping  
- [x] Immutable helpers  
- [x] Zero external form libraries  
- [x] Zod schema validation integration via useFormRegister
- [x] Zero external form libraries

---
## Example Usage
<img width="747" height="627" alt="image" src="https://github.com/user-attachments/assets/6ece88cd-37dc-4d02-93bb-eb57e6d299f4" />


---
