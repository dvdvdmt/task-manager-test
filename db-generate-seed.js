const fs = require('fs');
const faker = require('faker');

const seedBase = {
  users: [
    {
      id: 1,
      fullName: 'Service User',
      name: 'robot',
      password: 'password',
      avatarUrl: 'http://lorempixel.com/200/200/people/6/',
    },
  ],
  sessions: [],
};
const userIds = [2, 3, 4, 5, 6];
const users = userIds.map((id) => ({
  id,
  fullName: faker.fake('{{name.firstName}} {{name.lastName}}'),
  name: faker.internet.userName(),
  password: faker.internet.password(),
  avatarUrl: faker.internet.avatar(),
}));
const tasks = Array.from(new Array(25), (_, i) => ({
  id: i + 1,
  summary: faker.random.word(),
  description: faker.lorem.paragraph(),
  dueDate: faker.date.future(),
  authorId: userIds[Math.floor(Math.random() * userIds.length)],
}));
seedBase.users.push(...users);
const result = {...seedBase, tasks};
fs.writeFileSync('./db-seed.json', JSON.stringify(result, null, 2));
console.log(result);
