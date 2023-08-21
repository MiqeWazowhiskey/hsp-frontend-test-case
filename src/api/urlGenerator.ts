const baseUrl = "http://localhost:3000";
interface param {
    [key: string]: string;
}
export const urlGenerator = (params: param, path:string) => {
    const url = new URL(baseUrl);
    url.pathname= path;
    url.search= new URLSearchParams(params).toString();
    return url.toString();
}