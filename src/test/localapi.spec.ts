import { expect } from 'chai';
import { requestLocal } from 'src/config/supertest';
import { Employee } from 'src/types/custome';

describe('Validate local APIs', () => {

    it('should validate GET all employee', async () => {
        const response = await requestLocal.get('employee');
        expect(response.statusCode).to.equal(200)

        const responseBody: Employee[] = response.body;

        responseBody.forEach((employee: Employee) => {
            const { company, empid, name, role } = employee;
            expect(company).to.equal('faker api')
            expect(empid).to.satisfies(Number.isInteger)
            expect(name).to.satisfies(String)
            expect(role).to.satisfies(String)
            expect(company).to.satisfies(String)
        });
    })

    it('should validate GET employee by {empid}', async () => {
        const response = await requestLocal.get('employee').query({ 'empid': 100 });
        expect(response.statusCode).to.equal(200);

        const responseBody: Employee[] = response.body;
        const { name, empid, role, company } = responseBody[0];

        expect(name).to.equal('john');
        expect(empid).to.equal(100);
        expect(role).to.equal('manager');
        expect(company).to.equal('faker api');
    })

})