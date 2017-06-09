import Sequelize from 'sequelize';
import _ from 'lodash';
import Faker from 'faker';



const Conn = new Sequelize('test', 'root', '159951', {
  host: '192.168.1.200',
  port: '3036',
  dialect: 'mariadb',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});

const Person = Conn.import("Person");

const Post = Conn.import("Post");

Person.hasMany(Post);
Post.belongsTo(Person);

Conn.sync({
  force: true
}).then(() => {
  _.times(10, () => {
    return Person.create({
      firstName: Faker.name.firstName(),
      lastName: Faker.name.lastName(),
      email: Faker.internet.email(),
    }).then(person => {
      return person.createPost({
        title: `Sample title by ${person.firstName}`,
        content: 'This is a sample article'
      });
    });
  });

}).then(post => {
  console.log('done!');
});

export default Conn;
