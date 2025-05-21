const endpoint = "https://disorder-defects-programmers-treatments.trycloudflare.com";

const createRequest = (path: string, init?: RequestInit) => fetch(endpoint + path, init);

const createResponse = (request: Promise<Response>) =>
  request.then((r) => {
    if (!r.ok) {
      throw new Error("Request failed");
    }

    return r.json();
  });

export const getAllProducts = () => createResponse(createRequest("/api/products/get"));
export const getAllCategories = () => createResponse(createRequest("/api/categories/get"));
