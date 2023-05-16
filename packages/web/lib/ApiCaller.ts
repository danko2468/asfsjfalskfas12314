export const swrFetcher = (url: string) => fetch(`${process.env.API_URL}${url}`).then((res) => res.json());
