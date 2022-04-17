import { expect } from 'chai';
import { request, API_TOKEN } from 'src/config/supertest'
import { createUserPayload, updateUserPayload } from 'src/resources/payloads';


describe('Validate GOREST User APIs', () => {

    let userID: number;

    describe('Validate POST tests', () => {

        it('should validate create users', async () => {
            const response = await request.post('users')
                .set("Authorization", `Bearer ${API_TOKEN}`)
                .send(createUserPayload)
            expect(response.statusCode).to.equal(200);
            expect(response.body.code).to.equal(201);
            expect(response.body.data.name).to.equal(createUserPayload.name);
            expect(response.body.data.email).to.equal(createUserPayload.email);
            expect(response.body.data.gender).to.equal(createUserPayload.gender.toLowerCase());
            expect(response.body.data.status).to.equal(createUserPayload.status.toLowerCase());
            userID = response.body.data.id;
        })
    })

    describe('Validate GET tests', () => {
        it('should validate /USERS', async () => {
            const response = await request.get('users').query({ 'access-token': API_TOKEN })
            expect(response.body.data).to.not.be.empty;
        })

        it('should validate /USERS:id', async () => {
            const response = await request.get(`users/${userID}`).query({ 'access-token': API_TOKEN })
            expect(response.body.data.id).to.equal(userID);
        })

        it('should validate /USERS with query parameter', async () => {
            const query_params = {
                'access-token': API_TOKEN,
                'page': 5,
                'gender': 'male',
                'status': 'active'
            }
            const response = await request.get('users').query(query_params)
            expect(response.statusCode).to.equal(200);
            response.body.data.forEach((data: any) => {
                expect(data.id).to.satisfy(Number.isInteger);
                expect(data.gender).to.equal('male');
                expect(data.status).to.equal('active');
            })
        })

    })

    describe('Validate PUT tests', () => {
        it('should validate /users/id', async () => {

            const response = await request.put(`users/${userID}`)
                .set('Authorization', `Bearer ${API_TOKEN}`)
                .send(updateUserPayload)
            expect(response.status).to.equal(200);
            expect(response.body.data.name).to.equal(updateUserPayload.name);
            expect(response.body.data.email).to.equal(updateUserPayload.email);
        })
    })

    describe('Validate DELETE tests', () => {
        it('should validate /users/id', async () => {
            const response = await request.delete(`users/${userID}`)
                .set('Authorization', `Bearer ${API_TOKEN}`)

            expect(response.body.code).to.equal(204);
            expect(response.body.data).to.equal(null);
        })
    })

})