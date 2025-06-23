import {Effect, createEffect} from 'effector';

interface AbortableEffectParams<Params, Done> {
    handler: (params: Params, signal?: AbortSignal) => Promise<Done> | Done;
    name?: string;
}

export function createAbortEffect<Params, Done>(
    params: AbortableEffectParams<Params, Done>
): Effect<Params, Done> {
    let currentController: AbortController | null = null;

    return createEffect<Params, Done, Error>({
        name: params.name,
        handler: async (requestParams) => {
            if (currentController) {
                currentController.abort();
            }

            const controller = new AbortController();
            currentController = controller;

            try {
                const result = await params.handler(requestParams, controller.signal);
                if (currentController === controller) {
                    currentController = null;
                }
                return result;
            } catch (error) {
                if (error instanceof Error && error.name === 'AbortError') {
                    return undefined as Done;
                }
                throw error;
            }
        },
    });
}