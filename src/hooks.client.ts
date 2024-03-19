export function randomNum(min: number, max: number) {
    const difference: number = max - min;
    return Math.round(Math.random() * difference + min);

}

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
export function shuffleArray<T>(arr: T[], maxLength: number): T[] {
    const arrLength = arr.length;
    let numUsed: number[] = [];
    let newArray: T[] = [];
    for (let i = 0; i < maxLength; i++) {
        let random = randomNum(0, arrLength);
        while (numUsed.includes(random)) random = randomNum(0, arrLength);
        numUsed.push(random)
        newArray.push(arr[random])
    }
    return newArray;
}
export function showModal(id: string) {
    const modal: any = document.getElementById(id);
    modal.showModal();
}

export function countCorrect(arr: boolean[]): number {
    let count: number = 0;
    for (let i of arr) if (i) count++;
    return count;
}