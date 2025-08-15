import { FastifyInstance } from 'fastify';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { PrismaClient } from '../../src/generated/prisma';
import buildApp from '../../src/infra/http/app';

let app: FastifyInstance;
let prisma: PrismaClient;

describe('Create User (E2E)', () => {
  beforeAll(async () => {
    app = await buildApp();
    await app.ready();
    
    prisma = new PrismaClient();
  });

  afterAll(async () => {
    await app.close();
    await prisma.$disconnect();
  });

  it('should be able to create a new user', async () => {
    const response = await request(app.server)
      .post('/users')
      .send({
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
      });

    expect(response.statusCode).toEqual(201);

    const userInDatabase = await prisma.user.findUnique({
      where: {
        email: 'john.doe@example.com',
      },
    });

    expect(userInDatabase).not.toBeNull();
  });


  it('should not be able to create a user with an already existing email', async () => {
    await request(app.server)
      .post('/users')
      .send({
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        password: 'password123',
      });

    const response = await request(app.server)
      .post('/users')
      .send({
        name: 'Another Jane',
        email: 'jane.doe@example.com',
        password: 'password456',
      });

    expect(response.statusCode).toEqual(409);
  });
});