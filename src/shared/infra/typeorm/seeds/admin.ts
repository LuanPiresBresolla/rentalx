import { hash } from 'bcryptjs';
import { v4 as uuid } from 'uuid';

import createConnection from '../index';

async function create() {
  const connection = await createConnection('localhost');

  const id = uuid();
  const password = await hash('admin', 8);
  const query = `insert into users 
    (id, name, email, password, "isAdmin", driver_license)
    values('${id}', 'Admin', 'admin@rentx.com', '${password}', true, 123)`;

  await connection.query(query);

  await connection.close();
}

create().then(() => console.log('User admin created!'));
