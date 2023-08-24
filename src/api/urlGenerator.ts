const baseUrl = "http://localhost:3000";
interface param {
    [key: string]: string;
}
export const urlGenerator = (path:string,params?: param) => {
    const url = new URL(baseUrl);
    url.pathname= path;
    url.search= new URLSearchParams(params).toString();
    console.log(url.toString());
    return url.toString();
}