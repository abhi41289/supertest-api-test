import { API_TOKEN, request } from "src/config/supertest";

export const makeGETCall = async (endpoint: string) => {
    return await request.get(endpoint).set("Authorization", `Bearer ${API_TOKEN}`);
}

export const makePOSTCall = async (endpoint: string, payload: object) => {
    const response = await request.post(endpoint)
        .set("Authorization", `Bearer ${API_TOKEN}`)
        .send(payload);
    return response;
}

export const makePOSTCallInvalidToken = async (endpoint: string, payload: object) => {
    const response = await request.post(endpoint)
        .set("Authorization", `Bearer INVALID TOKEN`)
        .send(payload);
    return response;
}

export const makePUTCall = async (endpoint: string, payload: object) => {
    const response = await request.put(endpoint)
        .set('Authorization', `Bearer ${API_TOKEN}`)
        .send(payload);
    return response;
}

export const makeDELETECall = async (endpoint: string) => {
    const response = await request.delete(endpoint)
        .set('Authorization', `Bearer ${API_TOKEN}`);
    return response;
}