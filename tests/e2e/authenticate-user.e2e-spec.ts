import { FastifyInstance } from 'fastify';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { PrismaClient } from '../../src/generated/prisma';
import buildApp from '../../src/infra/http/app';

let app: FastifyInstance;
let prisma: PrismaClient;

describe('Authentication Flow (E2E)', () => {
  beforeAll(async () => {
    app = await buildApp();
    await app.ready();
    
    prisma = new PrismaClient();
  });

  afterAll(async () => {
    await app.close();
    await prisma.$disconnect();
  });

  describe('Authenticate User (POST /sessions)', () => {
    it('should be able to authenticate a user', async () => {
      await request(app.server).post('/users').send({
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
      });

      const response = await request(app.server).post('/sessions').send({
        email: 'john.doe@example.com',
        password: 'password123',
      });

      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual({
        token: expect.any(String),
      });
    });

    it('should not be able to authenticate with wrong password', async () => {
      await request(app.server).post('/users').send({
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        password: 'correct-password',
      });

      const response = await request(app.server).post('/sessions').send({
        email: 'jane.doe@example.com',
        password: 'wrong-password',
      });

      expect(response.statusCode).toEqual(401);
    });
  });

  describe('Get User Data (GET /users/me)', () => {
    it('should be able to get user data', async () => {
      await request(app.server).post('/users').send({
        name: 'Profile User',
        email: 'profile@example.com',
        password: 'password123',
      });

      const authResponse = await request(app.server).post('/sessions').send({
        email: 'profile@example.com',
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
          email: 'profile@example.com',
        }),
      );
    });

    it('should not be able to get user data without a token', async () => {
      const profileResponse = await request(app.server).get('/users/me');

      expect(profileResponse.statusCode).toEqual(401);
    });
  });
});