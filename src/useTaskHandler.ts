import {reactive, ref} from "vue";
import {FormError} from "./errors/FormError";
import {swallow} from "./helpers/swallow";
import {InvalidCredentialsError} from "./errors/InvalidCredentialsError";
import {compose} from "ramda";
export const useTaskHandler = () => {
    const isLoading = ref(false)
    const errorBag = ref<Record<string, string[]> | null>({})
    const errorMessage = ref<string | null>('')
    const wrapToHandleActive = compose(
        swallow(FormError)((formError) => alert("Error de validacion")),
        swallow(InvalidCredentialsError)((invalidCredentialsError) => alert("Error de login"))
    )
    const wrapToHandlePassive = compose(
        swallow(FormError)((formError) => errorBag.value = formError.errors),
        swallow(InvalidCredentialsError)((invalidCredentialsError) => errorMessage.value = invalidCredentialsError.message)
    )
    const reset = () => {
        errorBag.value = null
        errorMessage.value = null
    }
    return {
        wrapToHandleActive,
        wrapToHandlePassive,
        reset,
        isLoading,
        errorBag,
        errorMessage
    }
}