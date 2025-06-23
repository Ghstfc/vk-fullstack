export const parseRawHeaders = (
    rawHeaders: string[],
): { [key: string]: string } => {
    const headers = {};

    for (let i = 0; i < rawHeaders.length; i += 2) {
        const header = rawHeaders[i];
        headers[header] = rawHeaders[i + 1];
    }
    return headers;
};
