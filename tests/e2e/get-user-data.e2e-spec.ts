import { FastifyInstance } from 'fastify';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { PrismaClient } from '../../src/generated/prisma';
import buildApp from '../../src/infra/http/app';

let app: FastifyInstance;
let prisma: PrismaClient;

describe('Get User Data (E2E)', () => {
  beforeAll(async () => {
    app = await buildApp();
    await app.ready();
    
    prisma = new PrismaClient();
  });

  afterAll(async () => {
    await app.close();
    await prisma.$disconnect();
  });

  it('should be able to get user data', async () => {
    await request(app.server).post('/users').send({
      name: 'Profile User',
      email: 'profile.user@example.com',
      password: 'password123',
    });

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'profile.user@example.com',
      password: 'password123',
    });

    const { token } = authResponse.body;

    const profileResponse = await request(app.server)
      .get('/users/me')
      .set('Authorization', `Bearer ${token}`);

    expect(profileResponse.statusCode).toEqual(200);
    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({
        name: 'Profile User',
        email: 'profile.user@example.com',
      }),
    );
  });

  it('should not be able to get user data without a valid token', async () => {
    const profileResponse = await request(app.server).get('/users/me');

    expect(profileResponse.statusCode).toEqual(401);
  });
});