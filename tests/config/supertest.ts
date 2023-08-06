import { config } from 'dotenv';
config();

export const URL = "https://gorest.co.in/public-api/";

export const API_TOKEN = process.env.USER_TOKEN;

export const VALID_TOKEN = { "Authorization": `Bearer ${API_TOKEN}` }