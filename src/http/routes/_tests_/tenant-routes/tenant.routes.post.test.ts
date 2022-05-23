import request from 'supertest';
import faker from 'faker';
import app from '@http/app';
import { RegisterTenantInput } from '@services/register-tenant/register-tenant.service';


const makeSut = () => {
  const data: RegisterTenantInput = {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    cellphone: `5514882098429`,
    whatsapp:  `5514882098429`,
  };

  const sut = request(app).post('/tenants');

  return { sut, data };
};

describe('POST /tenants', () => {
  beforeAll(()=> {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  })

  it('should return status 400 if name is undefined', async () => {
    const { sut, data } = makeSut();
    const { name, ...rest } = data;
    const response = await sut.send(rest);

    expect(response.statusCode).toBe(400);
  });

  it('should return status 400 if cellphone is undefined', async () => {
    const { sut, data } = makeSut();
    const { cellphone, ...rest } = data;
    const response = await sut.send(rest);

    expect(response.statusCode).toBe(400);
  });

  it('should return status 400 if whatsapp is undefined', async () => {
    const { sut, data } = makeSut();
    const { whatsapp, ...rest } = data;
    const response = await sut.send(rest);

    expect(response.statusCode).toBe(400);
  });
});
