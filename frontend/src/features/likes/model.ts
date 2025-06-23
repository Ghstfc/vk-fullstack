import {createAbortEffect} from "@/shared/utils/createAbortEffect";
import {api} from "@/shared/api/api";
import {Cat, LikeDto} from "@/shared/types/types";
import {createEvent, createStore, sample} from "effector";
import {toast} from "react-toastify";

// ----------------------------------
//             GET LIKED
// ----------------------------------
export const getLikedCatsFx = createAbortEffect({
    handler: async (_: void, signal?: AbortSignal) => {

        try {
            const response = await api.get('/cats/favourite', {
                signal,
            });

            console.log(response.data);

            return response.data;
        } catch (error) {
            throw error;
        }
    }
})

export const $favouriteCats = createStore<Cat[]>([])

export const getLikedCatsEvent = createEvent<void>()
export const getLikedCatsPending = getLikedCatsFx.pending

sample({
    clock: getLikedCatsEvent,
    target: getLikedCatsFx
})

sample({
    clock: getLikedCatsFx.doneData,
    target: $favouriteCats
})


// ----------------------------------
//             CREATE LIKE
// ----------------------------------
export const createUserLikeFx = createAbortEffect({
    handler: async (params: LikeDto, signal?: AbortSignal) => {

        try {
            const response = await api.post('/cats/favourite', params, {
                signal,
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
})

export const createUserLikeEvent = createEvent<string>()


sample({
    clock: createUserLikeFx.failData,
    fn: (data) => {
        toast.error(data.message)
    },
})

sample({
    clock: createUserLikeEvent,
    fn: (catId) => {
        return {
            cat_id: catId,
        }
    },
    target: createUserLikeFx
})

// ----------------------------------
//             DELETE LIKE
// ----------------------------------

export const removeUserLikeFx = createAbortEffect({
    handler: async (params: LikeDto, signal?: AbortSignal) => {

        try {
            const response = await api.delete(`/cats/favourite/${params.cat_id}`, {
                signal,
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
})

export const removeUserLikeEvent = createEvent<string>()

sample({
    clock: removeUserLikeEvent,
    fn: (catId) => {
        return {
            cat_id: catId,
        }
    },
    target: removeUserLikeFx
})

sample({
    clock: removeUserLikeFx.failData,
    fn: (data) => {
        toast.error(data.message)
    },
})