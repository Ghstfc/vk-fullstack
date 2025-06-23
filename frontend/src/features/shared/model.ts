import {createEvent, createStore, sample} from "effector";
import {User} from "@/shared/types/types";
import {createAbortEffect} from "@/shared/utils/createAbortEffect";
import {api} from "@/shared/api/api";

export const refreshUserFx = createAbortEffect({
    handler: async (_: void, signal?: AbortSignal) => {

        try {
            const response = await api.get('/auth/refresh', {
                signal,
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
})

export const $user = createStore<User | null>(null)
export const refreshUserEvent = createEvent()

sample({
    clock: refreshUserEvent,
    target: refreshUserFx
})


sample({
    clock: refreshUserFx.doneData,
    target: $user
})
