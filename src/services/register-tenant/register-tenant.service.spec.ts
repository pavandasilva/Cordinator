import { Tenant, TenantStatus, User } from '@prisma/client';
import * as registerTenantValidator from '@services/register-tenant/register-tenant.validator';
import registerTenantService, { RegisterTenantInput } from '@services/register-tenant/register-tenant.service';
import prisma from '@database/prisma-client';
import { faker } from '@core/faker';
import { failure } from '@core/either';

const mockTenantPersistenceFake: Tenant & { User: User}= {
  User: {
    id: faker.datatype.uuid(),
    tenantId: faker.datatype.uuid(),
    email: faker.internet.email(),
    cellphone: `5514882098429`,
    whatsapp:  `5514882098429`,
    name: faker.name.findName(),
    createdAt: new Date(),
    updatedAt:  new Date(),
  },
  id: faker.datatype.uuid(),
  createdAt: new Date(),
  updatedAt:  new Date(),
  status: TenantStatus.active,
};

jest.mock("../../database/prisma-client", () => ({
  tenant: {
    create: jest.fn(() => (mockTenantPersistenceFake))
  }
}));

const makeSut = () => {
  const sut = registerTenantService;

  const data: RegisterTenantInput = {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    cellphone: `5514882098429`,
    whatsapp:  `5514882098429`,
  };

  return { sut, data };
};

describe('register-tenant.service',() => {
  afterAll(() => {
    jest.resetAllMocks();
  });
  it('should return success', async () => {
    const { sut, data } = makeSut();
    const result = await sut(data);
    expect(result.value).toEqual(mockTenantPersistenceFake);
    expect(result.isSuccess()).toBe(true);
  });

  it('should call prisma.cliente with correct params', async () => {
    const { sut, data } = makeSut();
    await sut(data);
    const spyOn = jest.spyOn(prisma.tenant, 'create');
    
    expect(spyOn).toHaveBeenCalled();
    
    expect(spyOn).toHaveBeenCalledWith({
      data: {
        status: TenantStatus.active,
        User: {
          create: {
            name: data.name,
            whatsapp: data.whatsapp,
            cellphone: data.cellphone,
            email: data.email,
          }
        }
      },
    });
  });

  it('should call registerTenantValidator with correct params', async () => {
    const { sut, data } = makeSut();
    const spyOn = jest.spyOn(registerTenantValidator, 'default').mockReturnValueOnce(failure(new Error()));
    await sut(data);
    
    expect(spyOn).toBeCalled();
    expect(spyOn).toBeCalledWith(data);
  });

  it('should throw an error when registerTenantValidator throws an error', async () => {
    const { sut, data } = makeSut();

    jest.spyOn(registerTenantValidator, 'default').mockImplementationOnce(() => {
      throw new Error();
    });

    try {
      await sut(data);
      fail();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});
