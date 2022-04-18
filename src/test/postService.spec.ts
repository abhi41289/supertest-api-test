import { expect } from 'chai';
import { API_TOKEN, request } from 'src/config/supertest';
import { createRandomeUser } from 'src/helper/createUser';
import { invalidPostPayload, validPostPayload } from 'src/resources/payloads';

describe('Validate GOREST Posts APIs', () => {

    let userID: number, postID: number;

    before(async () => {
        userID = await createRandomeUser();
    })

    describe('Validate GOREST Posts APIs happy scenarios', () => {
        it('should validate /POSTS', async () => {
            const res = await request.post('posts')
                .set('Authorization', `Bearer ${API_TOKEN}`)
                .send(validPostPayload(userID));
            postID = res.body.data.id;
            expect(res.body.code).to.be.eq(201);
        })


        it('should validate /POSTS/:id', async () => {
            await request.get(`posts/${postID}`).set("Authorization", `Bearer ${API_TOKEN}`).expect(200);
        })
    })

    describe('Validate GOREST Posts APIs Negative scenarios', () => {

        it('should validate 401 Error code', async () => {
            const res = await request
                .post('posts')
                .set('Authorization', 'Bearer INVALID TOKEN')
                .send(validPostPayload(userID));
            expect(res.body.code).to.be.eq(401);
            expect(res.body.data.message).to.be.eq('Authentication failed');
        })

        it('should validate 422 Error code', async () => {
            const res = await request
                .post('posts')
                .set('Authorization', `Bearer ${API_TOKEN}`)
                .send(invalidPostPayload(userID));
            expect(res.body.code).to.be.eq(422);
            expect(res.body.data[0].message).to.be.eq("can't be blank");
        })

    })
})