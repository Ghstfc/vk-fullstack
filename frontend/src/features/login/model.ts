import {createAbortEffect} from "@/shared/utils/createAbortEffect";
import {api} from "@/shared/api/api";
import {UserDto} from "@/shared/types/types";
import {createEvent, sample} from "effector";
import {$user} from "@/features/shared/model";
import {toast} from "react-toastify";


export const loginFx = createAbortEffect({
    handler: async (params: UserDto, signal?: AbortSignal) => {

        try {
            const response = await api.post('/auth/login', params, {
                signal,
            });

            return response.data;
        } catch (error) {
            throw error;
        }
    }
})

export const $loginPending = loginFx.pending;
export const loginEvent = createEvent<UserDto>()

sample({
    clock: loginEvent,
    target: loginFx
})

sample({
    clock: loginFx.doneData,
    fn: (data) => {
        toast.success(`Вы залогинились как ${data.login}`)
        return data
    },
    target: $user
})

sample({
    clock: loginFx.failData,
    fn: (err) => {
        toast.error(err.message);
    }
})