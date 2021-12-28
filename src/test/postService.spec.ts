import { expect } from 'chai'
import { createRandomeUser } from '../helper/createUser'
import { request, API_TOKEN } from '../config/supertest'
import faker from 'faker';

describe('Validate GOREST Posts APIs', () => {
    
    let userID:number, postID:number;

    before(async () => {
        userID = await createRandomeUser();
    })

    it('should validate /POSTS', async () => {
        const postPayload = {
            user_id: userID,
            title: faker.lorem.sentence(),
            body: faker.lorem.paragraph()
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

    describe('Validate GOREST Posts APIs Negative scenarios', () => {

        it('should validate 401 Error code', async () => {
            const postPayload = {
                user_id: userID,
                title: faker.lorem.sentence(),
                body: faker.lorem.paragraph()
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
                title: faker.lorem.sentence()
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