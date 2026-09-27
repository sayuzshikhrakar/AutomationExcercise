import { faker } from '@faker-js/faker';

export function generateRandomUser() {
    const randomFirstName = faker.person.firstName();
    const randomLastName = faker.person.lastName();
    const randomEmail = faker.internet.email()
    return { randomFirstName, randomLastName, randomEmail };
}
