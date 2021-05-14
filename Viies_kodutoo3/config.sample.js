const config = {
  port: 3000,
  saltRounds: 10,
  jwtSecret: 'ksljdhfglihefginLIHpiuhdeihwf',
  db: {
    host: 'localhost',
    user: 'root',
    password: 'my-secret-pw',
    database: 'courses',
  },
};

module.exports = config;
