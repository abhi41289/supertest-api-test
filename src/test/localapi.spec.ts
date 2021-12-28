import { expect } from 'chai';
import urls from 'src/config/urls';
import supertest from 'supertest';

const request = supertest(urls.localapi);

describe('Validate local APIs', () => {

    it('should validate GET all employee', async () => {
        const response = await request.get('employee');
        expect(response.statusCode).to.equal(200)
        response.body.forEach((emp: any) => {
            expect(emp.company).to.equal('faker api')
            expect(emp.empid).to.satisfies(Number.isInteger)
            expect(emp.name).to.satisfies(String)
            expect(emp.role).to.satisfies(String)
            expect(emp.company).to.satisfies(String)
        });
    })

    it('should validate GET employee by {empid}', async () => {
        const response = await request.get('employee').query({ 'empid': 100 });
        expect(response.statusCode).to.equal(200)
        expect(response.body[0].name).to.equal('john')
        expect(response.body[0].empid).to.equal(100)
        expect(response.body[0].role).to.equal('manager')
        expect(response.body[0].company).to.equal('faker api')
    })

})