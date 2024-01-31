export const protectInjection = (query: string) => {
    const pattern = /[.'"]/;
    if (pattern.test(query)) return false;
    return true;
};