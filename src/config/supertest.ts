import supertest from 'supertest';
import urls from './urls';
require('dotenv').config();

export const request = supertest(urls.baseurl);

export const API_TOKEN = process.env.USER_TOKEN;