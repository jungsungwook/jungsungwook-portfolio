export const getApiUrl = (route: string) => {
    const url = process.env.NODE_ENV === "development" ?
            `${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_React_Port}/api${route}` :
            `${process.env.NEXT_PUBLIC_API_URL}/api${route}`;
    return url;
}            