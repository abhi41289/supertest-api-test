import { faker } from '@faker-js/faker';

export const fakerAPI = faker;

export const createUserPayload = {
    email: faker.internet.email(),
    name: faker.person.firstName(),
    gender: 'male',
    status: 'active'
};

export const randomUserPayload = {
    email: faker.internet.email(),
    name: faker.person.firstName(),
    gender: 'male',
    status: 'active'
};

export const updateUserPayload = {
    name: faker.person.firstName(),
    email: faker.internet.email(),
}

export const validPostPayload = (id: number) => {
    return {
        user_id: id,
        title: fakerAPI.lorem.sentence(),
        body: fakerAPI.lorem.paragraph()
    }
}

export const invalidPostPayload = (id: number) => {
    return {
        user_id: id,
        title: fakerAPI.lorem.sentence()
    }
}