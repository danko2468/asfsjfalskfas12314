import { apiUrl } from "./constants";

export const getSwrFetcher =
  <T>(handler: (data: any) => T | Promise<T> = (data) => data) =>
  (url: string) =>
    fetch(`${apiUrl}${url}`)
      .then((res) => res.json())
      .then(handler);
