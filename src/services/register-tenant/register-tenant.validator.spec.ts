
import { faker } from '../../core';
import { RegisterTenantInput } from '../register-tenant.service';
import registerTenantValidator from './register-tenant.validator';

const makeSut = () => {
  const sut = registerTenantValidator;

  const data: RegisterTenantInput = {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    cellphone: `5514882098429`,
    whatsapp:  `5514882098429`,
  };

  return { sut, data };
};

describe('register-tenant.validator',() => {
  it('should return success', () => {
    const { sut, data } = makeSut();
    const result = sut(data);
    expect(result.isSuccess()).toBe(true);
  });

  it('should return failure when name is undefined', () => {
    const { sut, data } = makeSut();
    const { name, ...rest } = data;
    const result = sut(rest as any);
    expect(result.isFailure()).toBe(true);
  });

  it('should return failure when email is undefined', () => {
    const { sut, data } = makeSut();
    const { email, ...rest } = data;
    const result = sut(rest as any);
    expect(result.isFailure()).toBe(true);
  });

  it('should return failure when cellphone is undefined', () => {
    const { sut, data } = makeSut();
    const { cellphone, ...rest } = data;
    const result = sut(rest as any);
    expect(result.isFailure()).toBe(true);
  });

  it('should return failure when whatsapp is undefined', () => {
    const { sut, data } = makeSut();
    const { whatsapp, ...rest } = data;
    const result = sut(rest as any);
    expect(result.isFailure()).toBe(true);
  });

  it('should return failure when email is invalid', () => {
    const { sut, data } = makeSut();
    const email = 'invalid';
    const result = sut({
      ...data,
      email,
    });
    expect(result.isFailure()).toBe(true);
  });
});
