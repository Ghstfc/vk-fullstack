import {getRandomCatsEvent} from "@/features/index/model";
import HomePage from "@/pages/index/HomePage";
import {allSettled, fork, serialize} from "effector";
import {EffectorNext} from "@effector/next";
import {api} from "@/shared/api/api";
import {cookies} from "next/headers";

export default async function Home() {
    const scope = fork();

    const cookie = await cookies();
    api.defaults.headers.Cookie = cookie.toString();

    await allSettled(getRandomCatsEvent, {scope});

    const values = serialize(scope);

    return (
        <EffectorNext values={values}>
            <HomePage/>
        </EffectorNext>
    )

}
