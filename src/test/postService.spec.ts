import { expect } from 'chai'
import { createRandomeUser } from 'src/helper/createUser'
import { request, API_TOKEN } from 'src/config/supertest'
import { fakerAPI } from 'src/resources/payloads';

describe('Validate GOREST Posts APIs', () => {

    let userID: number, postID: number;

    before(async () => {
        userID = await createRandomeUser();
    })

    describe('Validate GOREST Posts APIs happy scenarios', () => {
        it('should validate /POSTS', async () => {
            const postPayload = {
                user_id: userID,
                title: fakerAPI.lorem.sentence(),
                body: fakerAPI.lorem.paragraph()
            }

            const res = await request.post('posts')
                .set('Authorization', `Bearer ${API_TOKEN}`)
                .send(postPayload);
            postID = res.body.data.id;
            expect(res.body.code).to.be.eq(201);
        })


        it('should validate /POSTS/:id', async () => {
            await request.get(`posts/${postID}`).set("Authorization", `Bearer ${API_TOKEN}`).expect(200);
        })
    })

    describe('Validate GOREST Posts APIs Negative scenarios', () => {

        it('should validate 401 Error code', async () => {
            const postPayload = {
                user_id: userID,
                title: fakerAPI.lorem.sentence(),
                body: fakerAPI.lorem.paragraph()
            }

            const res = await request
                .post('posts')
                .set('Authorization', 'Bearer INVALID TOKEN')
                .send(postPayload);
            expect(res.body.code).to.be.eq(401);
            expect(res.body.data.message).to.be.eq('Authentication failed');
        })

        it('should validate 422 Error code', async () => {
            const postPayload = {
                user_id: userID,
                title: fakerAPI.lorem.sentence()
            }

            const res = await request
                .post('posts')
                .set('Authorization', `Bearer ${API_TOKEN}`)
                .send(postPayload);
            expect(res.body.code).to.be.eq(422);
            expect(res.body.data[0].message).to.be.eq("can't be blank");
        })

    })
})