import {createAbortEffect} from "@/shared/utils/createAbortEffect";
import {api} from "@/shared/api/api";
import {createEvent, createStore, sample} from "effector";
import {Cat} from "@/shared/types/types";


export const getRandomCatsFx = createAbortEffect({
    handler: async (_: void, signal?: AbortSignal) => {

        try {
            const response = await api.get('/cats/random', {
                signal,
            });

            return response.data;
        } catch (error) {
            throw error;
        }
    }
})


export const $cats = createStore<Cat[]>([], {sid: "cats"})

export const getRandomCatsEvent = createEvent<void>()
export const getRandomCatsPending = getRandomCatsFx.pending

sample({
    clock: getRandomCatsEvent,
    target: getRandomCatsFx
})

sample({
    source: $cats,
    clock: getRandomCatsFx.doneData,
    fn: (cats, newCats) => [...cats, ...newCats],
    target: $cats
})

