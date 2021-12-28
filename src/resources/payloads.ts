import faker from 'faker';

export const createUserPayload = {
    email: faker.internet.email(),
    name: faker.name.firstName(),
    gender: 'male',
    status: 'active'
};

export const randomUserPayload = {
    email: faker.internet.email(),
    name: faker.name.firstName(),
    gender: 'male',
    status: 'active'
};

export const updateUserPayload = {
    name: faker.name.firstName(),
    email: faker.internet.email(),
}