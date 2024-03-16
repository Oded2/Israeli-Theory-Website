export function addParams(link: URL, params: any): void {
    for (const key in params) {
        const value = params[key];
        link.searchParams.append(key, value);
    }
}
export function addParamsString(string: string, params: any): string {
    const link: URL = new URL("https://codevault.com");
    addParams(link, params);
    return link.toString().replace("https://codevault.com", string);
}
export function simplifyString(string: string): string {
    let result: string = ""
    for (let i = 0; i < string.length; i++) result = string.replace(/\s/g, "").toLowerCase();
    return result;

}