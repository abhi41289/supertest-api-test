import { API_TOKEN } from "tests/config/supertest";

export const userQueryParams = {
    'access-token': API_TOKEN,
    'page': 5,
    'gender': 'male',
    'status': 'active'
}