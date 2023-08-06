import supertest from "supertest";
import { URL } from "tests/config/supertest";

export const makeGETCall = async (endpoint: string, headers: object) => {
    return await supertest(URL).get(endpoint).set(headers);
}

export const makeGETCallWithQueryParam = async (endpoint: string, query: object) => {
    return await supertest(URL).get(endpoint).query(query);
}

export const makePOSTCall = async (endpoint: string, payload: object, headers: object) => {
    const response = await supertest(URL).post(endpoint)
        .set(headers)
        .send(payload);
    return response;
}

export const makePUTCall = async (endpoint: string, payload: object, headers: object) => {
    const response = await supertest(URL).put(endpoint)
        .set(headers)
        .send(payload);
    return response;
}

export const makeDELETECall = async (endpoint: string, headers: object) => {
    const response = await supertest(URL).delete(endpoint)
        .set(headers);
    return response;
}