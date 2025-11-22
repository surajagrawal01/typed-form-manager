📦 Custom React Form Hook (TypeScript) —

A lightweight, type-safe, reusable form management library built using React + TypeScript, inspired by Formik and React-Hook-Form — but fully custom and minimal.

This README currently includes temporary folder structure + explanation, and will be expanded with examples & full documentation later.

---

## Folder Structure
<img width="767" height="509" alt="image" src="https://github.com/user-attachments/assets/b9350f3f-6b04-40c1-bf83-2b77f4dcaa26" />

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

---

## Upcoming Work
- [ ] Full usage examples  
- [ ] register() API (Phase 2)  
- [ ] Schema validation integration (Zod/Yup/Valibot)  
- [ ] Dirty/pristine tracking  
- [ ] Debounced validation  
- [ ] More helpers  
- [ ] Vitest unit tests  
- [ ] Publish to npm  

---
