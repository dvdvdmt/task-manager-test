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
  tasks: [
    {
      id: 1,
      summary: 'Task summary',
      description: 'Task description',
      dueDate: '2019-11-15T12:11:46.332Z',
      authorId: 5,
    },
    {
      id: 2,
      summary: 'program',
      description: 'Voluptas neque distinctio quod qui voluptates omnis quibusdam aperiam beatae. Consequatur quas at velit similique corrupti in. Sed cum ut molestiae soluta perspiciatis a. Totam facere quibusdam et nulla vitae eos. Libero dolorem consequuntur dolor magni modi atque ut. Hic earum eligendi tempore omnis sint eligendi.',
      dueDate: '2020-01-16T11:07:51.501Z',
      authorId: 2,
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
  id: i + 3,
  summary: faker.random.word(),
  description: faker.lorem.paragraph(),
  dueDate: faker.date.future(),
  authorId: userIds[Math.floor(Math.random() * userIds.length)],
}));
seedBase.users.push(...users);
seedBase.tasks.push(...tasks);
const result = JSON.stringify(seedBase, null, 2);
fs.writeFileSync('./db-seed.json', result);
console.log(result);
