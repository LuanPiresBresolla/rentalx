import { app } from '@shared/infra/http/app';
import request from 'supertest';
import { v4 as uuid } from 'uuid';

import createConnection from '@shared/infra/typeorm';
import { Connection } from 'typeorm';
import { hash } from 'bcryptjs';

let connection: Connection;

describe('List Categories Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuid();
    const password = await hash('admin', 8);
    const query = `insert into users 
    (id, name, email, password, "isAdmin", driver_license)
    values('${id}', 'Admin', 'admin@rentx.com', '${password}', true, 123)`;

    await connection.query(query);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to list all categories', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentx.com',
      password: 'admin',
    });

    const { token } = responseToken.body;

    await request(app)
      .post('/categories')
      .send({
        name: 'Category superTest',
        description: 'Categoria de carros esportivos',
      })
      .set({ Authorization: `Bearer ${token}` });

    const response = await request(app).get('/categories');

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0].name).toBe('Category superTest');
    expect(response.body[0].description).toBe('Categoria de carros esportivos');
  });
});
