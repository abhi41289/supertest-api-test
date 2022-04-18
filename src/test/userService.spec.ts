import { expect } from 'chai';
import { request } from 'src/config/supertest';
import { makeDELETECall, makeGETCall, makePOSTCall, makePUTCall } from 'src/helper/apicalls';
import { createUserPayload, updateUserPayload } from 'src/resources/payloads';
import { user_query_params } from 'src/resources/query';


describe('Validate GOREST User APIs', () => {

    let userID: number;

    describe('Validate POST tests', () => {

        it('should validate create users', async () => {
            const response = await makePOSTCall('users', createUserPayload);
            expect(response.statusCode).to.equal(200);
            expect(response.body.code).to.equal(201);

            const { name, email, gender, status, id } = response.body.data;

            expect(name).to.equal(createUserPayload.name);
            expect(email).to.equal(createUserPayload.email);
            expect(gender).to.equal(createUserPayload.gender.toLowerCase());
            expect(status).to.equal(createUserPayload.status.toLowerCase());
            userID = id;
        })
    })

    describe('Validate GET tests', () => {
        it('should validate /USERS', async () => {
            const response = await makeGETCall('users');
            expect(response.body.data).to.not.be.empty;
        })

        it('should validate /USERS:id', async () => {
            const response = await makeGETCall(`users/${userID}`);
            expect(response.body.data.id).to.equal(userID);
        })

        it('should validate /USERS with query parameter', async () => {
            const response = await request.get('users').query(user_query_params)
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
            const response = await makePUTCall(`users/${userID}`, updateUserPayload);
            expect(response.status).to.equal(200);
            expect(response.body.data.name).to.equal(updateUserPayload.name);
            expect(response.body.data.email).to.equal(updateUserPayload.email);
        })
    })

    describe('Validate DELETE tests', () => {
        it('should validate /users/id', async () => {
            const response = await makeDELETECall(`users/${userID}`);
            expect(response.body.code).to.equal(204);
            expect(response.body.data).to.equal(null);
        })
    })

})