import { API_TOKEN, request } from '../config/supertest'
import { randomUserPayload } from '../resources/payloads';

export const createRandomeUser = async () => {
    const res = await request.post('users').set("Authorization", `Bearer ${API_TOKEN}`).send(randomUserPayload);
    return res.body.data.id
}