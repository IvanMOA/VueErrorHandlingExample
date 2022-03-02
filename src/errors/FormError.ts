export class FormError extends Error {
    constructor(public errors: Record<string, string[]>) {
        super();
    }
}
type A = typeof FormError
const a : FormError = new FormError({})