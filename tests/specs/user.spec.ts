import { expect } from 'chai';
import { VALID_TOKEN } from 'tests/config/supertest';
import { makeDELETECall, makeGETCall, makeGETCallWithQueryParam, makePOSTCall, makePUTCall } from 'tests/helper/apiCalls';
import { createUserPayload, updateUserPayload } from 'tests/resources/payloads';
import { userQueryParams } from 'tests/resources/query';
import { Person } from 'tests/types/custom';

describe('Validate GO REST User APIs', () => {

    let userID: number;

    describe('Validate POST tests', () => {

        it('should validate create users', async () => {
            const response = await makePOSTCall('users', createUserPayload, VALID_TOKEN);
            expect(response.statusCode).to.equal(200);
            expect(response.body.code).to.equal(201);

            const responseData: Person = response.body.data;
            const { name, email, gender, status, id } = responseData;

            expect(name).to.equal(createUserPayload.name);
            expect(email).to.equal(createUserPayload.email);
            expect(gender).to.equal(createUserPayload.gender.toLowerCase());
            expect(status).to.equal(createUserPayload.status.toLowerCase());
            userID = id;
        })
    })

    describe('Validate GET tests', () => {
        it('should validate /USERS', async () => {
            const response = await makeGETCall('users', VALID_TOKEN);
            expect(response.body.data).to.not.be.empty;
        })

        it('should validate /USERS:id', async () => {
            const response = await makeGETCall(`users/${userID}`, VALID_TOKEN);
            expect(response.body.data.id).to.equal(userID);
        })

        it('should validate /USERS with query parameter', async () => {
            const response = await makeGETCallWithQueryParam('users', userQueryParams);
            expect(response.statusCode).to.equal(200);
            response.body.data.forEach((person: Person) => {
                expect(person.id).to.satisfy(Number.isInteger);
                expect(person.gender).to.equal('male');
                expect(person.status).to.equal('active');
            })
        })

    })

    describe('Validate PUT tests', () => {
        it('should validate /users/id', async () => {
            const response = await makePUTCall(`users/${userID}`, updateUserPayload, VALID_TOKEN);
            expect(response.status).to.equal(200);
            expect(response.body.data.name).to.equal(updateUserPayload.name);
            expect(response.body.data.email).to.equal(updateUserPayload.email);
        })
    })

    describe('Validate DELETE tests', () => {
        it('should validate /users/id', async () => {
            const response = await makeDELETECall(`users/${userID}`, VALID_TOKEN);
            expect(response.body.code).to.equal(204);
            expect(response.body.data).to.equal(null);
        })
    })

})