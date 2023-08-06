import { VALID_TOKEN } from 'tests/config/supertest';
import { randomUserPayload } from 'tests/resources/payloads';
import { makePOSTCall } from './apiCalls';

export const createRandomUser = async () => {
    const response = await makePOSTCall('users', randomUserPayload, VALID_TOKEN)
    return response.body.data.id
}