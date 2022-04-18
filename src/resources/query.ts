import { API_TOKEN } from "src/config/supertest";

export const user_query_params = {
    'access-token': API_TOKEN,
    'page': 5,
    'gender': 'male',
    'status': 'active'
}