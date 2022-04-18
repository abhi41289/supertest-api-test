import { expect } from 'chai';
import { makeGETCall, makePOSTCall, makePOSTCallInvalidToken } from 'src/helper/apicalls';
import { createRandomeUser } from 'src/helper/createUser';
import { invalidPostPayload, validPostPayload } from 'src/resources/payloads';

describe('Validate GOREST Posts APIs', () => {

    let userID: number, postID: number;

    before(async () => {
        userID = await createRandomeUser();
    })

    describe('Validate GOREST Posts APIs happy scenarios', () => {
        it('should validate /POSTS', async () => {
            const response = await makePOSTCall('posts', validPostPayload(userID));
            postID = response.body.data.id;
            expect(response.body.code).to.be.eq(201);
        })

        it('should validate /POSTS/:id', async () => {
            const response = await makeGETCall(`posts/${postID}`);
            expect(response.statusCode).to.equal(200);
        })
    })

    describe('Validate GOREST Posts APIs Negative scenarios', () => {

        it('should validate 401 Error code', async () => {
            const response = await makePOSTCallInvalidToken('posts', validPostPayload(userID));
            expect(response.body.code).to.be.eq(401);
            expect(response.body.data.message).to.be.eq('Authentication failed');
        })

        it('should validate 422 Error code', async () => {
            const response = await makePOSTCall('posts', invalidPostPayload(userID));
            expect(response.body.code).to.be.eq(422);
            expect(response.body.data[0].message).to.be.eq("can't be blank");
        })

    })
})