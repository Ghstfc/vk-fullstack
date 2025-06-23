export const parseCookies = (cookies: string): { [key: string]: string } => {
    const splitted = cookies.split('; ');
    const res = {};
    for (const cook of splitted) {
        const [key, value] = cook.split('=');
        res[key] = value;
    }
    return res;
};
