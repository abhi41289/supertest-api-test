import { expect } from 'chai';
import { VALID_TOKEN } from 'tests/config/supertest';
import { makeGETCall, makePOSTCall } from 'tests/helper/apiCalls';
import { createRandomUser } from 'tests/helper/createUser';
import { invalidPostPayload, validPostPayload } from 'tests/resources/payloads';

describe('Validate GO_REST Posts APIs', () => {

    let userID: number, postID: number;

    before(async () => {
        userID = await createRandomUser();
    })

    describe('Validate GO_REST Posts APIs happy scenarios', () => {
        it('should validate /POSTS', async () => {
            const response = await makePOSTCall('posts', validPostPayload(userID), VALID_TOKEN);
            postID = response.body.data.id;
            expect(response.body.code).to.be.eq(201);
        })

        it('should validate /POSTS/:id', async () => {
            const response = await makeGETCall(`posts/${postID}`, VALID_TOKEN);
            expect(response.statusCode).to.equal(200);
        })
    })

    describe('Validate GO_REST Posts APIs Negative scenarios', () => {

        it('should validate 401 Error code', async () => {
            const response = await makePOSTCall('posts', validPostPayload(userID), {});

            expect(response.body.code).to.be.eq(401);
            expect(response.body.data.message).to.be.eq('Authentication failed');
        })

        it('should validate 401 Error code with invalid token', async () => {
            const response = await makePOSTCall('posts', validPostPayload(userID), { "Authorization": `Bearer INVALID TOKEN` });

            expect(response.body.code).to.be.eq(401);
            expect(response.body.data.message).to.be.eq('Invalid token');
        })

        it('should validate 422 Error code', async () => {
            const response = await makePOSTCall('posts', invalidPostPayload(userID), VALID_TOKEN);
            expect(response.body.code).to.be.eq(422);
            expect(response.body.data[0].message).to.be.eq("can't be blank");
        })

    })
})