import {createAbortEffect} from "@/shared/utils/createAbortEffect";
import {api} from "@/shared/api/api";
import {UserDto} from "@/shared/types/types";
import {createEvent, createStore, sample} from "effector";
import {toast} from "react-toastify";


export const registerFx = createAbortEffect({
    handler: async (params: UserDto, signal?: AbortSignal) => {

        try {
            const response = await api.post('/user', params, {
                signal,
            });

            return response.data;
        } catch (error) {
            throw error;
        }
    }
})

export const $registerPending = registerFx.pending;
export const registerEvent = createEvent<UserDto>()
export const $registerError = createStore<boolean>(true)


sample({
    clock: registerEvent,
    target: registerFx
})

sample({
    clock: registerFx.doneData,
    fn: () => {
        toast.success('Вы успешно зарегистрировались!')
        return false
    },
    target: $registerError
})

sample({
    clock: registerFx.failData,
    fn: (err) => {
        console.log(err)
        toast.error(err.message)
    },
})
