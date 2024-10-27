// fetchUtil.ts

import { HttpError } from "../errors/errors";

export const fetchData = async (url: string, options?: RequestInit) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new HttpError(response.status, `HTTP error ${response.status}`);
  }
  return response.json();
};
